import Badge from "#/components/Badge";
import { CourseQueryOptions } from "#/features/course-list/queries/courseQueries";
import { AttempsByCourseQueryOptions, AttempsQueryOptions } from "#/features/tests/queries/testQueries";
import { Route } from "#/routes/_app/course/$courseId";
import { useUserStore } from "#/stores/userStore";
import { useQueries, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, FileText, Video, MessageSquare, ClipboardList, CheckCircle2, Circle, LayoutDashboard, Edit } from "lucide-react";
import { ReactNode, useMemo } from "react";

function CoursePage() {
  const { courseId } = Route.useParams();
  const { userId, userRole } = useUserStore();
  const { data: course } = useSuspenseQuery(CourseQueryOptions(courseId));
  const { data: taken_tests } = useQuery(AttempsByCourseQueryOptions(String(userId), courseId));


  const testAttemptsMap = useMemo(() => {
    if (!taken_tests) return new Map();
    return new Map(taken_tests.map((attempt) => [attempt.test_id, attempt]));
  }, [taken_tests]);

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
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      video: "secondary",
      assignment: "default",
      quiz: "outline",
      resource: "secondary",
      forum: "outline",
    };
    return variants[type] || "default";
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-end gap-2 mb-2">
        {userRole > 1 && (
          <Link
            to="/course/$courseId/panel"
            params={{ courseId }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors shadow-sm border border-indigo-200"
          >
            <LayoutDashboard size={18} />
            <span className="font-medium">Панель преподавателя</span>
          </Link>
        )}
        {userRole > 2 && (
          <Link
            to="/course/$courseId/redact"
            params={{ courseId }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-300"
          >
            <Edit size={18} />
            <span className="font-medium">Редактировать</span>
          </Link>
        )}
      </div>


      <Link to="/my_courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ChevronLeft size={20} />
        Back to Dashboard
      </Link>


      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="relative h-48">
          <img
            src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80"
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="inline-block bg-blue-500 px-3 py-1 rounded-full text-sm mb-2">{course.id}</div>
            <h1 className="text-3xl font-semibold mb-1">{course.name}</h1>
            <p className="text-gray-200">{course.instructor}</p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-4">{course.description}</p>
        </div>
      </div>


      <div className="space-y-4">
        {course.sections?.map((module) => {

          const allActivities = [
            ...(module.pages?.map((item) => ({ ...item, type: item.type ?? "assignment" })) || []),
            ...(module.tests?.map((item) => ({ ...item, type: item.type ?? "quiz" })) || []),
            ...(module.videos?.map((item) => ({ ...item, type: item.type ?? "video" })) || []),
            ...(module.resources?.map((item) => ({ ...item, type: item.type ?? "resource" })) || []),
          ];

          return (
            <div key={module.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold text-lg">{module.title}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {allActivities.map((activity, index) => {

                  const activityContent = (
                    <>
                      <div className="mt-1">
                        {activity.type === "quiz" ? (
                          (() => {
                            const attempt = testAttemptsMap.get(activity.id);
                            const isCompleted = !!attempt;
                            return isCompleted ? (
                              <CheckCircle2 size={20} className="text-green-600" />
                            ) : (
                              <Circle size={20} className="text-gray-400" />
                            );
                          })()
                        ) : activity.completed ? (
                          <CheckCircle2 size={20} className="text-green-600" />
                        ) : (
                          <Circle size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getActivityIcon(activity.type)}
                          <span className="font-medium hover:text-blue-600">{activity.title}</span>
                          <Badge variant={getActivityTypeBadge(activity.type)}>{activity.type}</Badge>
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
                        {activity.type === "quiz" && (() => {
                          const attempt = testAttemptsMap.get(activity.id);
                          const grade = attempt?.score;
                          return grade !== undefined ? (
                            <p className="text-sm text-green-600 mt-1">Оценка: {grade}%</p>
                          ) : null;
                        })()}
                        {activity.type !== "quiz" && activity.grade !== undefined && (
                          <p className="text-sm text-green-600 mt-1">Grade: {activity.grade}%</p>
                        )}
                      </div>
                    </>
                  );

                  let linkElement: ReactNode;
                  if (activity.type === "assignment") {
                    linkElement = (
                      <Link
                        to="/course/$courseId/assignment/$assignmentId"
                        params={{ courseId, assignmentId: activity.id }}
                        className="flex items-start gap-4"
                        key={index}
                      >
                        {activityContent}
                      </Link>
                    );
                  } else if (activity.type === "video") {
                    linkElement = (
                      <Link
                        to="/course/$courseId/video/$videoId"
                        params={{ courseId, videoId: activity.id }}
                        className="flex items-start gap-4"
                      >
                        {activityContent}
                      </Link>
                    );
                  } else if (activity.type === "resource") {
                    linkElement = (
                      <Link
                        to="/course/$courseId/resource/$resourceId"
                        params={{ courseId, resourceId: activity.id }}
                        className="flex items-start gap-4"
                      >
                        {activityContent}
                      </Link>
                    );
                  } else if (activity.type === "quiz") {
                    linkElement = (
                      <Link
                        to="/course/$courseId/test/$testId"
                        params={{ courseId, testId: activity.id }}
                        className="flex items-start gap-4"
                      >
                        {activityContent}
                      </Link>
                    );
                  } else {
                    linkElement = <div className="flex items-start gap-4">{activityContent}</div>;
                  }

                  return (
                    <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      {linkElement}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoursePage;