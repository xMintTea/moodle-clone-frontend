import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Card from "#/components/Card";
import MatchAllQuestion from "./QuestionTypes/MatchAllQuestion";
import SelectMultipleQuestion from "./QuestionTypes/SelectMultipleQuestion";
import SelectOneQuestion from "./QuestionTypes/SelectOneQuestion";
import WriteAnswerQuestion from "./QuestionTypes/WriteAnswerQuestion";
import testService from "../services/quizService"; 
import { useNavigate, useParams } from "@tanstack/react-router";
import { Route } from "#/routes/_app/course/test/$testId/attempt";
import { useUserStore } from "#/stores/userStore";
import { AttempsQueryOptions } from "../queries/testQueries";

function AttempQuestionBlock({ questions }) {
    const {userId} = useUserStore()
    const {testId} = Route.useParams()
    const navigate = useNavigate();
    const [answersMap, setAnswersMap] = useState({});
    const startTimeRef = useRef(new Date().toISOString());
    const queryClient = useQueryClient();


  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (payload) => testService.submitAttempt(testId, payload),
    onSuccess: () => {
        queryClient.invalidateQueries(AttempsQueryOptions(testId, String(userId)))
        navigate({to:"/course/test/$testId", params: {testId}});
    },
    onError: (error) => {
      console.error("Ошибка отправки ответов:", error);
      alert("Не удалось отправить ответы. Попробуйте ещё раз.");
    }
  });

  const handleAnswerChange = (qNumber, answer) => {
    setAnswersMap(prev => ({ ...prev, [qNumber]: answer }));
  };

  const handleSubmit = () => {
    const endTime = new Date().toISOString();
    
    const formattedAnswers = questions.map((question, idx) => {
      const qNumber = idx + 1;
      const userAnswer = answersMap[qNumber];
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
        start_time: startTimeRef.current,
        end_time: endTime,
        answers: formattedAnswers,
    };

    submit(payload);
  };

  return (
    <Card className="flex flex-col gap-1">
      {questions.map((question, index) => {
        const qNumber = index + 1;
        if (question.type === "match_answers") {
          return (
            <MatchAllQuestion
              key={index}
              qNumber={qNumber}
              right={question.right_column}
              left={question.left_column}
              questionText={question.text}
              onAnswerChange={handleAnswerChange}
            />
          );
        } else if (question.type === "select_one") {
          return (
            <SelectOneQuestion
              key={index}
              qNumber={qNumber}
              options={question.options}
              questionText={question.text}
              onAnswerChange={handleAnswerChange}
            />
          );
        } else if (question.type === "select_multiple") {
          return (
            <SelectMultipleQuestion
              key={index}
              options={question.options}
              qNumber={qNumber}
              questionText={question.text}
              onAnswerChange={handleAnswerChange}
            />
          );
        } else if (question.type === "write_answer") {
          return (
            <WriteAnswerQuestion
              key={index}
              qNumber={qNumber}
              questionText={question.text}
              onAnswerChange={handleAnswerChange}
            />
          );
        }
        return null;
      })}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Отправка..." : "Завершить"}
      </button>
    </Card>
  );
}

export default AttempQuestionBlock;