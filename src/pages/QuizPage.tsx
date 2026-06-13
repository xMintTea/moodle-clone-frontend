import { useParams, Link } from "@tanstack/react-router";
import { ChevronLeft, Clock, CheckCircle2, XCircle, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { useState, useEffect, useMemo, useRef } from "react";
import { useQuery, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { CourseQueryOptions } from "#/features/course-list/queries/courseQueries";
import { AttempsQueryOptions, TestQueryOptions } from "#/features/tests/queries/testQueries";
import { useUserStore } from "#/stores/userStore";
import testService from "../features/tests/services/quizService";

type QuizState = 'intro' | 'active' | 'review';

interface Answers {
  [questionId: string]: string | string[] | Record<string, string>;
}


function ensureUniqueQuestionIds(questions: any[]) {
  const idCount = new Map<string, number>();
  return questions.map((q, idx) => {
    const originalId = q.id;
    let newId = originalId;
    if (idCount.has(originalId)) {
      const count = idCount.get(originalId)! + 1;
      idCount.set(originalId, count);
      newId = `${originalId}_${count}`;
    } else {
      idCount.set(originalId, 0);
    }
    return { ...q, id: newId, originalId };
  });
}

export function QuizPage() {
  const { courseId, testId } = useParams({ from: "/_app/course/$courseId/test/$testId/" });
  const { data: rawQuiz } = useSuspenseQuery(TestQueryOptions(testId));
  const course = useQuery(CourseQueryOptions(courseId));
  const { userId } = useUserStore();


  const { data: attempts, isLoading: attemptsLoading } = useQuery({
    ...AttempsQueryOptions(testId, String(userId)),
    enabled: !!userId,
  });

  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [resultData, setResultData] = useState<any>(null);
  const startTimeRef = useRef<string | null>(null);

  const quiz = useMemo(() => {
    if (!rawQuiz) return null;
    return {
      ...rawQuiz,
      content: ensureUniqueQuestionIds(rawQuiz.content || [])
    };
  }, [rawQuiz]);


  const { mutate: submitQuiz, isLoading: isSubmitting } = useMutation({
    mutationFn: (payload: any) => testService.submitAttempt(testId, payload),
    onSuccess: (data) => {
      setResultData(data);
      let earned = 0;
      let total = 0;


      if (data.score !== undefined && data.max_score !== undefined) {
        earned = data.score;
        total = data.max_score;
      } else {

        earned = 0;
        total = quiz?.content.reduce((s, q) => s + q.scoring.points, 0) || 0;
      }

      setScore(earned);
      setTotalPoints(total);
      setQuizState('review');
    },
    onError: (error) => {
      console.error("Ошибка отправки ответов:", error);
      alert("Не удалось отправить ответы. Попробуйте ещё раз.");
    }
  });

  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);


  useEffect(() => {
    if (quizState !== 'active' || !quiz) return;
    setTimeLeft(30 * 60);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizState]);


  useEffect(() => {
    if (!quiz) return;
    const initialAnswers: Answers = {};
    quiz.content.forEach((q) => {
      if (q.type === 'select_multiple') initialAnswers[q.id] = [];
      else if (q.type === 'match_answers') initialAnswers[q.id] = {};
      else initialAnswers[q.id] = '';
    });
    setAnswers(initialAnswers);
  }, [quiz]);

  if (!quiz || !course.data) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Quiz not found</h2>
        <Link to="/course/$courseId" params={{ courseId }} className="text-blue-600 hover:underline">
          Return to Course
        </Link>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };


  const handleSingleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleMultipleAnswer = (questionId: string, option: string) => {
    setAnswers(prev => {
      const current = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option];
      return { ...prev, [questionId]: updated };
    });
  };

  const handleMatchingAnswer = (questionId: string, left: string, right: string) => {
    setAnswers(prev => {
      const current = (prev[questionId] as Record<string, string>) || {};
      return { ...prev, [questionId]: { ...current, [left]: right } };
    });
  };

  const handleTextAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };


  const handleSubmit = () => {
    if (!userId) {
      alert("Пользователь не авторизован");
      return;
    }
    const endTime = new Date().toISOString();
    const startTime = startTimeRef.current || new Date().toISOString();

    const formattedAnswers = quiz.content.map((question, idx) => {
      const userAnswer = answers[question.id];
      const baseEntry = {
        title: question.text,
        type: question.type,
      };

      switch (question.type) {
        case "select_one":
          return {
            ...baseEntry,
            options: question.options,
            answer: userAnswer || "",
          };
        case "select_multiple":
          return {
            ...baseEntry,
            options: question.options,
            answer: userAnswer || [],
          };
        case "write_answer":
          return {
            ...baseEntry,
            answer: userAnswer || "",
          };
        case "match_answers":
          return {
            ...baseEntry,
            left_column: question.left_column,
            right_column: question.right_column,
            answer: userAnswer || {},
          };
        default:
          return baseEntry;
      }
    });

    const payload = {
      user_id: userId,
      start_time: startTime,
      end_time: endTime,
      answers: formattedAnswers,
    };

    submitQuiz(payload);
  };

  const percentage = totalPoints ? Math.round((score / totalPoints) * 100) : 0;


  if (quizState === 'intro') {

    if (attempts && attempts.length >= quiz.max_attempts) {
      return (
        <div className="max-w-2xl mx-auto">
          <Link
            to="/course/$courseId"
            params={{ courseId }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronLeft size={20} />
            Back to {course.data.title}
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle size={32} className="text-red-600" />
            </div>
            <h1 className="text-3xl font-semibold mb-2">No Attempts Left</h1>
            <p className="text-gray-600 mb-6">
              You have used all {quiz.max_attempts} attempt{quiz.max_attempts > 1 ? 's' : ''} for this quiz.
            </p>
            <Link to="/course/$courseId" params={{ courseId }}>
              <Button variant="outline" className="gap-2">
                <ChevronLeft size={16} />
                Back to Course
              </Button>
            </Link>
          </div>
        </div>
      );
    }


    return (
      <div className="max-w-2xl mx-auto">
        <Link
          to="/course/$courseId"
          params={{ courseId }}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft size={20} />
          Back to {course.data.title}
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-semibold mb-2">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Clock size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold">30</p>
              <p className="text-sm text-gray-500">minutes</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <AlertCircle size={24} className="text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold">{quiz.content.length}</p>
              <p className="text-sm text-gray-500">questions</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <CheckCircle2 size={24} className="text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold">{quiz.content.reduce((s, q) => s + q.scoring.points, 0)}</p>
              <p className="text-sm text-gray-500">total points</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-yellow-800 mb-2">Before you start:</h3>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>You have 30 minutes to complete this quiz</li>
              <li>You have {quiz.max_attempts} attempt{quiz.max_attempts > 1 ? 's' : ''} for this quiz</li>
              <li>Once started, the timer cannot be paused</li>
              <li>Make sure you have a stable internet connection</li>
            </ul>
          </div>

          <Button 
            onClick={() => {
              startTimeRef.current = new Date().toISOString();
              setQuizState('active');
            }} 
            size="lg" 
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={attemptsLoading || !attempts}
          >
            {attemptsLoading ? 'Checking...' : 'Start Quiz'}
          </Button>
        </div>
      </div>
    );
  }


  if (quizState === 'review') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="text-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {percentage >= 80 ? (
                <CheckCircle2 size={40} className="text-green-600" />
              ) : (
                <XCircle size={40} className={percentage >= 60 ? 'text-yellow-600' : 'text-red-600'} />
              )}
            </div>
            <h1 className="text-3xl font-semibold mb-2">Quiz Complete!</h1>
            <p className="text-gray-600">{quiz.title}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-semibold text-blue-600">{score}</p>
              <p className="text-sm text-gray-500">Points Earned</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-semibold text-blue-600">{totalPoints}</p>
              <p className="text-sm text-gray-500">Total Points</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className={`text-3xl font-semibold ${
                percentage >= 90 ? 'text-green-600' : percentage >= 70 ? 'text-blue-600' : 'text-red-600'
              }`}>{percentage}%</p>
              <p className="text-sm text-gray-500">Final Score</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/course/$courseId" params={{ courseId }} className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <ChevronLeft size={16} />
                Back to Course
              </Button>
            </Link>
            <Button
              className="flex-1 gap-2"
              onClick={() => {
                setAnswers({});
                setScore(0);
                setTotalPoints(0);
                setResultData(null);
                startTimeRef.current = null;
                setQuizState('intro');
              }}
            >
              <RotateCcw size={16} />
              Retake Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }


  const timePct = (timeLeft / (30 * 60)) * 100;
  const timeWarning = timePct < 20;

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 sticky top-[57px] z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">{quiz.title}</h2>
          <div className={`flex items-center gap-2 font-mono text-lg font-semibold ${timeWarning ? 'text-red-600' : 'text-gray-700'}`}>
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${timeWarning ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{ width: `${timePct}%` }}
          />
        </div>
      </div>


      <div className="space-y-6">
        {quiz.content.map((question, idx) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-500 text-sm">Question {idx + 1} of {quiz.content.length}</h3>
              <span className="text-sm text-gray-500">{question.scoring.points} pts</span>
            </div>
            <p className="text-gray-800 mb-5">{question.text}</p>


            {question.type === 'select_one' && (
              <div className="space-y-3">
                {question.options.map(opt => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      answers[question.id] === opt
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={opt}
                      checked={answers[question.id] === opt}
                      onChange={() => handleSingleAnswer(question.id, opt)}
                      className="text-blue-600"
                    />
                    <span className={answers[question.id] === opt ? 'text-blue-700' : 'text-gray-700'}>
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            )}


            {question.type === 'select_multiple' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
                {question.options.map(opt => {
                  const selected = Array.isArray(answers[question.id]) 
                    ? answers[question.id].includes(opt) 
                    : false;
                  return (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={opt}
                        checked={selected}
                        onChange={() => handleMultipleAnswer(question.id, opt)}
                        className="text-blue-600"
                      />
                      <span className={selected ? 'text-blue-700' : 'text-gray-700'}>{opt}</span>
                    </label>
                  );
                })}
              </div>
            )}


            {question.type === 'match_answers' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500 mb-3">Match each item on the left with the correct item on the right</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    {question.left_column.map(leftItem => (
                      <div key={leftItem} className="bg-gray-100 rounded-lg px-4 py-3 text-sm font-medium text-gray-700">
                        {leftItem}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {question.left_column.map(leftItem => {
                      const userPairs = (answers[question.id] as Record<string, string>) || {};
                      const rightOptions = question.right_column;
                      return (
                        <select
                          key={leftItem}
                          value={userPairs[leftItem] || ''}
                          onChange={e => handleMatchingAnswer(question.id, leftItem, e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select match...</option>
                          {rightOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}


            {question.type === 'write_answer' && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Write your answer below</p>
                <Textarea
                  value={(answers[question.id] as string) || ''}
                  onChange={e => handleTextAnswer(question.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="h-40 resize-y"
                />
              </div>
            )}
          </div>
        ))}
      </div>


      <div className="mt-6 mb-8 flex gap-3">
        <Button onClick={handleSubmit} size="lg" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Quiz"}
        </Button>
        <Link to="/course/$courseId" params={{ courseId }}>
          <Button variant="outline" size="lg">Cancel</Button>
        </Link>
      </div>
    </div>
  );
}