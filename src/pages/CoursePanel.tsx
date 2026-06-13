import Badge from "#/components/Badge";
import { COURSE_QUERY_KEYS } from "#/features/course-list/queries/queryKeys";
import courseService from "#/features/course-list/services/courseService";
import { Route } from "#/routes/_app/course/$courseId/panel";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Users,
  User,
  CheckCircle2,
  Circle,
  FileText,
  Video,
  ClipboardList,
  MessageSquare,
  Download,
} from "lucide-react";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";


const getStudentKey = (student: any): string => {
  const groupPart = student.group?.id ?? student.group?.name ?? '';
  return `${student.first_name}_${student.last_name}_${groupPart}`.toLowerCase().replace(/\s/g, '_');
};


const getGroupId = (group: any): string => {
  if (!group) return "";
  if (typeof group === "string") return group;
  if (typeof group === "object" && group.id) return String(group.id);
  return "";
};

const getGroupName = (group: any): string => {
  if (!group) return "";
  if (typeof group === "string") return group;
  if (typeof group === "object" && group.name) return group.name;
  return String(group);
};


const getStudentProgress = (course: any, studentId: string) => {
  const activities: any[] = [];
  for (const section of course.sections || []) {
    for (const page of section.pages || []) {
      activities.push({
        id: page.id,
        title: page.title,
        type: "assignment",
        completed: false,
        grade: undefined,
      });
    }
    for (const test of section.tests || []) {
      activities.push({
        id: test.id,
        title: test.title,
        type: "quiz",
        completed: false,
        grade: undefined,
      });
    }
    for (const video of section.videos || []) {
      activities.push({
        id: video.id,
        title: video.title,
        type: "video",
        completed: true,
        grade: undefined,
      });
    }
    for (const resource of section.resources || []) {
      activities.push({
        id: resource.id,
        title: resource.title,
        type: "resource",
        completed: true,
        grade: undefined,
      });
    }
  }
  return { studentId, activities };
};

function CoursePanel() {
  const { courseId } = Route.useParams();
  const search = Route.useSearch({ from: Route });
  const navigate = useNavigate();
  const [exporting, setExporting] = useState(false);

  const currentGroupId = search.group ?? "";
  const currentStudentId = search.studentId ?? "";

  const { data: course } = useSuspenseQuery({
    queryKey: COURSE_QUERY_KEYS.course(courseId),
    queryFn: () => courseService.fetchCourse(courseId),
  });


  const groups = useMemo(() => {
    const groupMap = new Map<string, { id: string; name: string }>();
    (course.students ?? []).forEach((student) => {
      const groupId = getGroupId(student.group);
      if (groupId && !groupMap.has(groupId)) {
        groupMap.set(groupId, {
          id: groupId,
          name: getGroupName(student.group),
        });
      }
    });
    return Array.from(groupMap.values());
  }, [course.students]);


  const filteredStudents = useMemo(() => {
    const allStudents = course.students ?? [];
    const filtered = currentGroupId
      ? allStudents.filter((student) => getGroupId(student.group) === currentGroupId)
      : allStudents;
    return filtered.map((student) => ({
      ...student,
      uniqueId: getStudentKey(student),
    }));
  }, [course.students, currentGroupId]);


  const { data: studentProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["studentProgress", courseId, currentStudentId],
    queryFn: () => Promise.resolve(getStudentProgress(course, currentStudentId)),
    enabled: !!currentStudentId,
  });


  const allAssignments = useMemo(() => {
    const items: { id: string; title: string; sectionTitle: string; type: string }[] = [];
    for (const section of course.sections || []) {
      const assignments = [
        ...(section.pages || []).map((a: any) => ({ ...a, type: "assignment" })),
        ...(section.tests || []).map((t: any) => ({ ...t, type: "quiz" })),
      ];
      for (const a of assignments) {
        items.push({
          id: a.id,
          title: a.title,
          sectionTitle: section.title,
          type: a.type,
        });
      }
    }
    return items;
  }, [course]);


  const handleGroupChange = (groupId: string) => {
    navigate({
      to: "/course/$courseId/panel",
      params: { courseId },
      search: (prev) => ({
        ...prev,
        group: groupId || undefined,
        studentId: undefined,
      }),
      replace: true,
    });
  };

  // Экспорт в Excel
  const exportToExcel = async () => {
    setExporting(true);
    try {
      if (filteredStudents.length === 0) {
        alert("Нет студентов для экспорта");
        return;
      }

      const studentsProgress = filteredStudents.map((student) => ({
        student,
        progress: getStudentProgress(course, student.uniqueId),
      }));

      const headers = ["Студент", ...allAssignments.map((a) => `${a.sectionTitle}: ${a.title}`)];
      const rows = studentsProgress.map(({ student, progress }) => {
        const row: any = { Студент: `${student.first_name} ${student.last_name}` };
        for (const assignment of allAssignments) {
          const activity = progress.activities.find((a) => a.id === assignment.id);
          let value = "";
          if (activity) {
            if (assignment.type === "quiz" || assignment.type === "assignment") {
              value = activity.grade !== undefined ? `${activity.grade}%` : activity.completed ? "Выполнено" : "Не выполнено";
            } else {
              value = activity.completed ? "Выполнено" : "Не выполнено";
            }
          } else {
            value = "Нет данных";
          }
          row[`${assignment.sectionTitle}: ${assignment.title}`] = value;
        }
        return row;
      });

      const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Успеваемость");
      const groupSuffix = currentGroupId ? `_${currentGroupId}` : "";
      XLSX.writeFile(workbook, `course_${courseId}${groupSuffix}_grades.xlsx`);
    } catch (error) {
      console.error(error);
      alert("Ошибка экспорта");
    } finally {
      setExporting(false);
    }
  };


  const getActivityIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video size={18} className="text-purple-600" />;
      case "assignment":
        return <ClipboardList size={18} className="text-blue-600" />;
      case "quiz":
        return <ClipboardList size={18} className="text-green-600" />;
      case "resource":
        return <FileText size={18} className="text-gray-600" />;
      case "forum":
        return <MessageSquare size={18} className="text-orange-600" />;
      default:
        return <FileText size={18} />;
    }
  };

  const getActivityTypeBadge = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<string, any> = {
      video: "secondary",
      assignment: "default",
      quiz: "outline",
      resource: "secondary",
      forum: "outline",
    };
    return variants[type] || "default";
  };

  const getStatusIcon = (completed: boolean, grade?: number) => {
    if (completed || (grade !== undefined && grade >= 60)) {
      return <CheckCircle2 size={20} className="text-green-600" />;
    }
    return <Circle size={20} className="text-gray-400" />;
  };


  const renderStudentDetails = () => {
    const selectedStudent = filteredStudents.find((s) => s.uniqueId === currentStudentId);

    if (!currentStudentId) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
          <Users size={48} className="mx-auto mb-3 text-gray-300" />
          <p>Выберите студента из списка слева, чтобы увидеть его успеваемость</p>
        </div>
      );
    }

    if (progressLoading) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="animate-pulse">Загрузка прогресса...</div>
        </div>
      );
    }

    if (!studentProgress || studentProgress.activities.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
          <p>У этого студента пока нет активностей</p>
        </div>
      );
    }

    const sections = course.sections || [];

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <User size={20} />
            Прогресс студента
            {selectedStudent && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                {selectedStudent.first_name} {selectedStudent.last_name}
              </span>
            )}
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sections.map((section: any) => {
            const sectionActivities = [
              ...(section.pages?.map((a: any) => ({ ...a, type: a.type ?? "assignment" })) || []),
              ...(section.tests?.map((a: any) => ({ ...a, type: a.type ?? "quiz" })) || []),
              ...(section.videos?.map((a: any) => ({ ...a, type: a.type ?? "video" })) || []),
              ...(section.resources?.map((a: any) => ({ ...a, type: a.type ?? "resource" })) || []),
            ];

            const activitiesWithProgress = sectionActivities.map((activity) => {
              const progress = studentProgress.activities.find((a) => a.id === activity.id);
              return {
                ...activity,
                completed: progress?.completed || false,
                grade: progress?.grade,
              };
            });

            if (activitiesWithProgress.length === 0) return null;

            return (
              <div key={section.id}>
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h3 className="font-medium text-md">{section.title}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {activitiesWithProgress.map((activity) => (
                    <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{getStatusIcon(activity.completed, activity.grade)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getActivityIcon(activity.type)}
                            <span className="font-medium">{activity.title}</span>
                            <Badge variant={getActivityTypeBadge(activity.type)}>
                              {activity.type}
                            </Badge>
                          </div>
                          {activity.due_date && (
                            <p className="text-sm text-gray-500">
                              До:{" "}
                              {new Date(activity.due_date).toLocaleDateString("ru-RU", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          )}
                          {(activity.type === "quiz" || activity.type === "assignment") &&
                            activity.grade !== undefined && (
                              <p className="text-sm text-green-600 mt-1">
                                Оценка: {activity.grade}%
                              </p>
                            )}
                          {activity.type !== "quiz" && activity.type !== "assignment" && activity.completed && (
                            <p className="text-sm text-green-600 mt-1">Выполнено</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <Link to="/course/$courseId" params={{ courseId }} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ChevronLeft size={20} />
          Назад к курсу
        </Link>
        <button
          onClick={exportToExcel}
          disabled={exporting || filteredStudents.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
        >
          <Download size={18} />
          {exporting ? "Экспорт..." : "Экспорт в Excel"}
        </button>
      </div>


      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-2xl font-semibold mb-1">{course.name}</h1>
            <p className="text-gray-200 text-sm">Панель преподавателя</p>
          </div>
        </div>
        <div className="p-4 border-b border-gray-100">
          <p className="text-gray-700">{course.description}</p>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Фильтр по группе</label>
            <select
              value={currentGroupId}
              onChange={(e) => handleGroupChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Все группы</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-semibold flex items-center gap-2">
                <Users size={18} />
                Студенты {filteredStudents.length > 0 && `(${filteredStudents.length})`}
              </h2>
            </div>
            {filteredStudents.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Нет студентов</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredStudents.map((student) => {
                  const isActive = currentStudentId === student.uniqueId;
                  return (
                    <li key={student.uniqueId}>
                      <Link
                        to="/course/$courseId/panel"
                        params={{ courseId }}
                        search={(prev) => ({
                          ...prev,
                          group: currentGroupId || undefined,
                          studentId: student.uniqueId,
                        })}
                        className={`block px-4 py-3 hover:bg-gray-50 transition-colors ${
                          isActive ? "bg-blue-50 border-l-4 border-blue-500" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{student.first_name} {student.last_name}</p>
                            <p className="text-sm text-gray-500">{getGroupName(student.group)}</p>
                          </div>
                          {isActive && <CheckCircle2 size={16} className="text-blue-500" />}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">{renderStudentDetails()}</div>
      </div>
    </div>
  );
}

export default CoursePanel;