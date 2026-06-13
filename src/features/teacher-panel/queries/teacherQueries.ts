import { queryOptions } from "@tanstack/react-query";

export const StudentsByCourseQueryOptions = (courseId: string, group?: string) =>
  queryOptions({
    queryKey: ["students", courseId, group],
    queryFn: async () => {

      const allStudents = [
        { id: "1", name: "Анна Смирнова", group: "Группа А", email: "anna@example.com" },
        { id: "2", name: "Иван Петров", group: "Группа А", email: "ivan@example.com" },
        { id: "3", name: "Мария Козлова", group: "Группа Б", email: "maria@example.com" },
      ];
      return group ? allStudents.filter((s) => s.group === group) : allStudents;
    },
  });

export const StudentProgressQueryOptions = (courseId: string, studentId?: string) =>
  queryOptions({
    queryKey: ["studentProgress", courseId, studentId],
    queryFn: async () => {

      return {
        studentId,
        activities: [
          { id: "act1", title: "Введение в курс", type: "video", completed: true },
          { id: "act2", title: "Тест: основы", type: "quiz", completed: true, grade: 85 },
          { id: "act3", title: "Практическое задание", type: "assignment", completed: false, grade: undefined },
        ],
      };
    },
    enabled: !!studentId,
  });