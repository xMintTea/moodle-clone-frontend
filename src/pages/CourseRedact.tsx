import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "#/components/ui/dialog";
import { Plus, Edit, Save, X, FileText, Video, ClipboardList, Link2, ChevronLeft } from "lucide-react";
import { CourseQueryOptions } from "#/features/course-list/queries/courseQueries";
import courseRedactService from "#/features/course-redact/services/courseRedactService";
import { Link } from "@tanstack/react-router";


const sectionSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  order: z.number().int().min(0),
  visibility: z.number().int().min(1).max(2),
});

const pageSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  comment: z.string().optional(),
  order: z.number().int().min(0),
  visibility: z.number().int().min(1).max(2),
  due_date: z.string().datetime(),
});

const testSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  due_date: z.string().datetime(),
  order: z.number().int().min(0),
  visibility: z.number().int().min(1).max(2),
  max_attempts: z.number().int().min(0),
  content: z.array(z.any()).default([]),
});

const videoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().min(0),
  visibility: z.number().int().min(1).max(2),
  video_url: z.string().url("Некорректный URL"),
});

const resourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().min(0),
  visibility: z.number().int().min(1).max(2),
  file_id: z.number().int().positive(),
});


function SectionForm({ section, courseId, onSuccess }: { section?: any; courseId: string; onSuccess: () => void }) {
  const queryClient = useQueryClient();
  const isEdit = !!section?.id;
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? courseRedactService.updateSection(section.id, { ...data, course_id: Number(courseId) })
        : courseRedactService.createSection({ ...data, course_id: Number(courseId) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CourseQueryOptions(courseId).queryKey });
      onSuccess();
    },
  });

  const form = useForm({
    defaultValues: {
      title: section?.title || "",
      description: section?.description || "",
      order: section?.order ?? 0,
      visibility: section?.visibility ?? 1,
    },
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="title">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Название секции</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors && (
              <p className="text-red-500 text-sm mt-1">{field.state.meta.errors.join(", ")}</p>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="order">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Порядок</label>
            <Input
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="visibility">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Видимость (1 – черновик, 2 – опубликовано)</label>
            <Input
              type="number"
              min={1}
              max={2}
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
            />
          </div>
        )}
      </form.Field>
      <Button type="submit" disabled={isPending} className="w-full">
        {isEdit ? "Сохранить изменения" : "Создать секцию"}
      </Button>
    </form>
  );
}


function PageForm({ page, sectionId, courseId, onSuccess }: { page?: any; sectionId: number; courseId: string; onSuccess: () => void }) {
  const queryClient = useQueryClient();
  const isEdit = !!page?.id;
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? courseRedactService.updatePage(page.id, { ...data, section_id: sectionId })
        : courseRedactService.createPage({ ...data, section_id: sectionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CourseQueryOptions(courseId).queryKey });
      onSuccess();
    },
  });

  const form = useForm({
    defaultValues: {
      title: page?.title || "",
      description: page?.description || "",
      comment: page?.comment || "",
      order: page?.order ?? 0,
      visibility: page?.visibility ?? 1,
      due_date: page?.due_date || new Date().toISOString(),
    },
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="title">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Название страницы</label>
            <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
            {field.state.meta.errors && <p className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</p>}
          </div>
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <Textarea value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
          </div>
        )}
      </form.Field>
      <form.Field name="comment">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Комментарий</label>
            <Textarea value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
          </div>
        )}
      </form.Field>
      <form.Field name="order">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Порядок</label>
            <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
          </div>
        )}
      </form.Field>
      <form.Field name="due_date">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Срок сдачи</label>
            <Input type="datetime-local" value={field.state.value.slice(0, 16)} onChange={(e) => field.handleChange(new Date(e.target.value).toISOString())} />
          </div>
        )}
      </form.Field>
      <Button type="submit" disabled={isPending}>{isEdit ? "Сохранить" : "Создать"}</Button>
    </form>
  );
}


function getDefaultQuestion(type: string) {
  const base = {
    text: "",
    review_mode: "auto",
    scoring: {
      method: "exact",
      points: 0,
      min_points: 0,
      max_points: 0,
      points_per_right: 0,
      penalty_per_wrong: 0,
    },
  };
  switch (type) {
    case "select_one":
      return { ...base, type: "select_one", options: [], answers: [] };
    case "select_multiple":
      return { ...base, type: "select_multiple", options: [], answers: [] };
    case "write_answer":
      return { ...base, type: "write_answer", answer: "" };
    case "match_answers":
      return { ...base, type: "match_answers", left_column: [], right_column: [], answers: {} };
    default:
      return { ...base, type: "select_one", options: [], answers: [] };
  }
}


function QuestionEditor({ question, index, onChange, onRemove }: {
  question: any;
  index: number;
  onChange: (q: any) => void;
  onRemove: () => void;
}) {
  const [text, setText] = useState(question.text || "");
  const [reviewMode, setReviewMode] = useState(question.review_mode || "auto");
  const [scoring, setScoring] = useState(question.scoring || {
    method: "exact",
    points: 0,
    min_points: 0,
    max_points: 0,
    points_per_right: 0,
    penalty_per_wrong: 0,
  });
  const [options, setOptions] = useState<string[]>(question.options || []);
  const [answers, setAnswers] = useState<string[]>(question.answers || []);
  const [answer, setAnswer] = useState(question.answer || "");
  const [pairs, setPairs] = useState<{ left: string; right: string }[]>(
    question.type === "match_answers" && question.answers
      ? Object.entries(question.answers).map(([left, right]) => ({ left, right: right as string }))
      : []
  );

  useEffect(() => {
    const base = { type: question.type, text, review_mode: reviewMode, scoring };
    if (question.type === "select_one" || question.type === "select_multiple") {
      onChange({ ...base, options, answers });
    } else if (question.type === "write_answer") {
      onChange({ ...base, answer });
    } else if (question.type === "match_answers") {
      const left_column = pairs.map(p => p.left);
      const right_column = pairs.map(p => p.right);
      const answersObj = Object.fromEntries(pairs.map(p => [p.left, p.right]));
      onChange({ ...base, left_column, right_column, answers: answersObj });
    }
  }, [text, reviewMode, scoring, options, answers, answer, pairs]);

  const updateScoringField = (field: string, value: any) => {
    setScoring(prev => ({ ...prev, [field]: value }));
  };

  const addOption = () => setOptions([...options, ""]);
  const updateOption = (idx: number, val: string) => {
    const newOpts = [...options];
    newOpts[idx] = val;
    setOptions(newOpts);
  };
  const removeOption = (idx: number) => setOptions(options.filter((_, i) => i !== idx));

  const addAnswer = () => setAnswers([...answers, ""]);
  const updateAnswer = (idx: number, val: string) => {
    const newAns = [...answers];
    newAns[idx] = val;
    setAnswers(newAns);
  };
  const removeAnswer = (idx: number) => setAnswers(answers.filter((_, i) => i !== idx));

  const addPair = () => setPairs([...pairs, { left: "", right: "" }]);
  const updatePair = (idx: number, side: "left" | "right", val: string) => {
    const newPairs = [...pairs];
    newPairs[idx][side] = val;
    setPairs(newPairs);
  };
  const removePair = (idx: number) => setPairs(pairs.filter((_, i) => i !== idx));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Вопрос {index + 1} ({question.type})</CardTitle>
        <Button variant="ghost" size="icon" onClick={onRemove}><X className="h-4 w-4" /></Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium">Текст вопроса</label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm font-medium">Режим проверки</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={reviewMode}
              onChange={(e) => setReviewMode(e.target.value)}
            >
              <option value="auto">Авто</option>
              <option value="manual">Ручная</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">Метод оценки</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={scoring.method}
              onChange={(e) => updateScoringField("method", e.target.value)}
            >
              <option value="exact">Точное совпадение</option>
              <option value="partial">Частичное</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium">Баллы</label>
            <Input type="number" value={scoring.points} onChange={(e) => updateScoringField("points", Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm font-medium">Мин. баллы</label>
            <Input type="number" value={scoring.min_points} onChange={(e) => updateScoringField("min_points", Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm font-medium">Макс. баллы</label>
            <Input type="number" value={scoring.max_points} onChange={(e) => updateScoringField("max_points", Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm font-medium">Баллов за верный</label>
            <Input type="number" value={scoring.points_per_right} onChange={(e) => updateScoringField("points_per_right", Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm font-medium">Штраф за неверный</label>
            <Input type="number" value={scoring.penalty_per_wrong} onChange={(e) => updateScoringField("penalty_per_wrong", Number(e.target.value))} />
          </div>
        </div>

        {(question.type === "select_one" || question.type === "select_multiple") && (
          <>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Варианты ответов</label>
                <Button variant="outline" size="sm" onClick={addOption}><Plus className="h-3 w-3 mr-1" /> Добавить</Button>
              </div>
              <div className="space-y-1 mt-1">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input value={opt} onChange={(e) => updateOption(idx, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeOption(idx)}><X className="h-3 w-3" /></Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Правильные ответы</label>
                <Button variant="outline" size="sm" onClick={addAnswer}><Plus className="h-3 w-3 mr-1" /> Добавить</Button>
              </div>
              <div className="space-y-1 mt-1">
                {answers.map((ans, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input value={ans} onChange={(e) => updateAnswer(idx, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeAnswer(idx)}><X className="h-3 w-3" /></Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {question.type === "write_answer" && (
          <div>
            <label className="text-sm font-medium">Правильный ответ</label>
            <Input value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </div>
        )}

        {question.type === "match_answers" && (
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Пары соответствий</label>
              <Button variant="outline" size="sm" onClick={addPair}><Plus className="h-3 w-3 mr-1" /> Добавить пару</Button>
            </div>
            <div className="space-y-1 mt-1">
              {pairs.map((pair, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input placeholder="Левая часть" value={pair.left} onChange={(e) => updatePair(idx, "left", e.target.value)} />
                  <span className="text-muted-foreground">→</span>
                  <Input placeholder="Правая часть" value={pair.right} onChange={(e) => updatePair(idx, "right", e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removePair(idx)}><X className="h-3 w-3" /></Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


function TestForm({ test, sectionId, courseId, onSuccess }: { test?: any; sectionId: number; courseId: string; onSuccess: () => void }) {
  const queryClient = useQueryClient();
  const isEdit = !!test?.id;
  const [questions, setQuestions] = useState<any[]>(test?.content || []);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? courseRedactService.updateTest(test.id, { ...data, section_id: sectionId })
        : courseRedactService.createTest({ ...data, section_id: sectionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CourseQueryOptions(courseId).queryKey });
      onSuccess();
    },
  });

  const form = useForm({
    defaultValues: {
      title: test?.title || "",
      description: test?.description || "",
      due_date: test?.due_date || new Date().toISOString(),
      order: test?.order ?? 0,
      visibility: test?.visibility ?? 1,
      max_attempts: test?.max_attempts ?? 1,
    },
    onSubmit: ({ value }) => {
      mutate({ ...value, content: questions });
    },
  });

  const addQuestion = (type: string) => {
    setQuestions([...questions, getDefaultQuestion(type)]);
  };

  const updateQuestion = (index: number, updated: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = updated;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <form.Field name="title">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Название теста</label>
            <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
            {field.state.meta.errors && <p className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</p>}
          </div>
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <Textarea value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
          </div>
        )}
      </form.Field>
      <div className="grid grid-cols-2 gap-3">
        <form.Field name="due_date">
          {(field) => (
            <div>
              <label className="block text-sm font-medium mb-1">Срок сдачи</label>
              <Input type="datetime-local" value={field.state.value.slice(0, 16)} onChange={(e) => field.handleChange(new Date(e.target.value).toISOString())} />
            </div>
          )}
        </form.Field>
        <form.Field name="order">
          {(field) => (
            <div>
              <label className="block text-sm font-medium mb-1">Порядок</label>
              <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
            </div>
          )}
        </form.Field>
        <form.Field name="visibility">
          {(field) => (
            <div>
              <label className="block text-sm font-medium mb-1">Видимость (1/2)</label>
              <Input type="number" min={1} max={2} value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
            </div>
          )}
        </form.Field>
        <form.Field name="max_attempts">
          {(field) => (
            <div>
              <label className="block text-sm font-medium mb-1">Макс. попыток</label>
              <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Вопросы</h4>
          <select
            className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                addQuestion(e.target.value);
                e.target.value = "";
              }
            }}
          >
            <option value="" disabled>Добавить вопрос...</option>
            <option value="select_one">Один выбор</option>
            <option value="select_multiple">Множественный выбор</option>
            <option value="write_answer">Свободный ответ</option>
            <option value="match_answers">Сопоставление</option>
          </select>
        </div>
        {questions.length === 0 ? (
          <p className="text-muted-foreground text-sm py-2">Нет вопросов. Добавьте первый вопрос.</p>
        ) : (
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <QuestionEditor
                key={idx}
                question={q}
                index={idx}
                onChange={(updated) => updateQuestion(idx, updated)}
                onRemove={() => removeQuestion(idx)}
              />
            ))}
          </div>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isEdit ? "Сохранить изменения" : "Создать тест"}
      </Button>
    </form>
  );
}


function VideoForm({ video, sectionId, courseId, onSuccess }: any) {
  const queryClient = useQueryClient();
  const isEdit = !!video?.id;
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? courseRedactService.updateVideo(video.id, { ...data, section_id: sectionId })
        : courseRedactService.createVideo({ ...data, section_id: sectionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CourseQueryOptions(courseId).queryKey });
      onSuccess();
    },
  });
  const form = useForm({
    defaultValues: {
      title: video?.title || "",
      description: video?.description || "",
      order: video?.order ?? 0,
      visibility: video?.visibility ?? 1,
      video_url: video?.video_url || "",
    },
    onSubmit: ({ value }) => mutate(value),
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-4">
      <form.Field name="title">{(field) => (<div><label className="block text-sm font-medium mb-1">Название видео</label><Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} /></div>)}</form.Field>
      <form.Field name="video_url">{(field) => (<div><label className="block text-sm font-medium mb-1">URL видео</label><Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} /></div>)}</form.Field>
      <Button type="submit" disabled={isPending}>{isEdit ? "Сохранить" : "Создать"}</Button>
    </form>
  );
}

function ResourceForm({ resource, sectionId, courseId, onSuccess }: any) {
  const queryClient = useQueryClient();
  const isEdit = !!resource?.id;
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? courseRedactService.updateResource(resource.id, { ...data, section_id: sectionId })
        : courseRedactService.createResource({ ...data, section_id: sectionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CourseQueryOptions(courseId).queryKey });
      onSuccess();
    },
  });
  const form = useForm({
    defaultValues: {
      title: resource?.title || "",
      description: resource?.description || "",
      order: resource?.order ?? 0,
      visibility: resource?.visibility ?? 1,
      file_id: resource?.file?.id || 0,
    },
    onSubmit: ({ value }) => mutate(value),
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-4">
      <form.Field name="title">{(field) => (<div><label className="block text-sm font-medium mb-1">Название ресурса</label><Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} /></div>)}</form.Field>
      <form.Field name="file_id">{(field) => (<div><label className="block text-sm font-medium mb-1">ID файла</label><Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} /></div>)}</form.Field>
      <Button type="submit" disabled={isPending}>{isEdit ? "Сохранить" : "Создать"}</Button>
    </form>
  );
}


export default function CourseRedact() {
  const { courseId } = useParams({ from: "/_app/course/$courseId/redact/" });
  const { data: course } = useSuspenseQuery(CourseQueryOptions(courseId));
  const [activeTab, setActiveTab] = useState<string>("");
  const [sectionDialog, setSectionDialog] = useState<{ open: boolean; editingSection: any }>({ open: false, editingSection: null });
  const [pageDialog, setPageDialog] = useState<{ open: boolean; sectionId: number | null; editingPage: any }>({ open: false, sectionId: null, editingPage: null });
  const [testDialog, setTestDialog] = useState<{ open: boolean; sectionId: number | null; editingTest: any }>({ open: false, sectionId: null, editingTest: null });
  const [videoDialog, setVideoDialog] = useState<{ open: boolean; sectionId: number | null; editingVideo: any }>({ open: false, sectionId: null, editingVideo: null });
  const [resourceDialog, setResourceDialog] = useState<{ open: boolean; sectionId: number | null; editingResource: any }>({ open: false, sectionId: null, editingResource: null });

  const sections = course.sections || [];
  if (sections.length > 0 && !activeTab) setActiveTab(sections[0].id.toString());

  return (
    <>
    <Link to="/course/$courseId" params={{courseId}} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
        <ChevronLeft size={20} />
        Назад к курсу
    </Link>
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Редактирование курса: {course.name}</h1>
        <Dialog open={sectionDialog.open} onOpenChange={(open) => setSectionDialog({ open, editingSection: null })}>
          <DialogTrigger asChild>
            <Button onClick={() => setSectionDialog({ open: true, editingSection: null })}>
              <Plus className="mr-2 h-4 w-4" /> Добавить секцию
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{sectionDialog.editingSection ? "Редактировать секцию" : "Новая секция"}</DialogTitle>
            </DialogHeader>
            <SectionForm
              section={sectionDialog.editingSection}
              courseId={courseId}
              onSuccess={() => setSectionDialog({ open: false, editingSection: null })}
            />
          </DialogContent>
        </Dialog>
      </div>

      {sections.length === 0 ? (
        <p>Нет секций. Нажмите «Добавить секцию».</p>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap">
            {sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id.toString()} className="flex items-center gap-2">
                {section.title}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSectionDialog({ open: true, editingSection: section });
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id.toString()} className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Страницы</h3>
                  <Button size="sm" onClick={() => setPageDialog({ open: true, sectionId: section.id, editingPage: null })}>
                    <Plus className="h-4 w-4 mr-1" /> Добавить
                  </Button>
                </div>
                <div className="space-y-2">
                  {section.pages?.map((page: any) => (
                    <Card key={page.id}>
                      <CardContent className="flex justify-between items-center p-3">
                        <div>
                          <p className="font-medium">{page.title}</p>
                          <p className="text-sm text-muted-foreground">{page.description}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setPageDialog({ open: true, sectionId: section.id, editingPage: page })}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>


              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Тесты</h3>
                  <Button size="sm" onClick={() => setTestDialog({ open: true, sectionId: section.id, editingTest: null })}>
                    <ClipboardList className="h-4 w-4 mr-1" /> Добавить тест
                  </Button>
                </div>
                <div className="space-y-2">
                  {section.tests?.map((test: any) => (
                    <Card key={test.id}>
                      <CardContent className="flex justify-between items-center p-3">
                        <div>
                          <p className="font-medium">{test.title}</p>
                          <p className="text-sm text-muted-foreground">{test.description}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setTestDialog({ open: true, sectionId: section.id, editingTest: test })}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>


              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Видео</h3>
                  <Button size="sm" onClick={() => setVideoDialog({ open: true, sectionId: section.id, editingVideo: null })}>
                    <Video className="h-4 w-4 mr-1" /> Добавить видео
                  </Button>
                </div>
                <div className="space-y-2">
                  {section.videos?.map((video: any) => (
                    <Card key={video.id}>
                      <CardContent className="flex justify-between items-center p-3">
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-muted-foreground">{video.video_url}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setVideoDialog({ open: true, sectionId: section.id, editingVideo: video })}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>


              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Ресурсы</h3>
                  <Button size="sm" onClick={() => setResourceDialog({ open: true, sectionId: section.id, editingResource: null })}>
                    <FileText className="h-4 w-4 mr-1" /> Добавить ресурс
                  </Button>
                </div>
                <div className="space-y-2">
                  {section.resources?.map((resource: any) => (
                    <Card key={resource.id}>
                      <CardContent className="flex justify-between items-center p-3">
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">{resource.file?.file_name}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setResourceDialog({ open: true, sectionId: section.id, editingResource: resource })}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}


      <Dialog open={pageDialog.open} onOpenChange={(open) => setPageDialog({ open, sectionId: null, editingPage: null })}>
        <DialogContent>
          <DialogHeader><DialogTitle>{pageDialog.editingPage ? "Редактировать страницу" : "Новая страница"}</DialogTitle></DialogHeader>
          {pageDialog.sectionId && (
            <PageForm
              page={pageDialog.editingPage}
              sectionId={pageDialog.sectionId}
              courseId={courseId}
              onSuccess={() => setPageDialog({ open: false, sectionId: null, editingPage: null })}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={testDialog.open} onOpenChange={(open) => setTestDialog({ open, sectionId: null, editingTest: null })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{testDialog.editingTest ? "Редактировать тест" : "Новый тест"}</DialogTitle></DialogHeader>
          {testDialog.sectionId && (
            <TestForm
              test={testDialog.editingTest}
              sectionId={testDialog.sectionId}
              courseId={courseId}
              onSuccess={() => setTestDialog({ open: false, sectionId: null, editingTest: null })}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={videoDialog.open} onOpenChange={(open) => setVideoDialog({ open, sectionId: null, editingVideo: null })}>
        <DialogContent>
          <DialogHeader><DialogTitle>{videoDialog.editingVideo ? "Редактировать видео" : "Новое видео"}</DialogTitle></DialogHeader>
          {videoDialog.sectionId && (
            <VideoForm
              video={videoDialog.editingVideo}
              sectionId={videoDialog.sectionId}
              courseId={courseId}
              onSuccess={() => setVideoDialog({ open: false, sectionId: null, editingVideo: null })}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={resourceDialog.open} onOpenChange={(open) => setResourceDialog({ open, sectionId: null, editingResource: null })}>
        <DialogContent>
          <DialogHeader><DialogTitle>{resourceDialog.editingResource ? "Редактировать ресурс" : "Новый ресурс"}</DialogTitle></DialogHeader>
          {resourceDialog.sectionId && (
            <ResourceForm
              resource={resourceDialog.editingResource}
              sectionId={resourceDialog.sectionId}
              courseId={courseId}
              onSuccess={() => setResourceDialog({ open: false, sectionId: null, editingResource: null })}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}