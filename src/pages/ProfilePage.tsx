import { userProfile, courses, grades } from "../data/mockData";
import { Mail, GraduationCap, Award, BookOpen } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { useUserStore } from "#/stores/userStore";

export default function ProfilePage() {
  const totalCourses = courses.length;
  const completedActivities = 24;
  const totalActivities = 48;
  const activityProgress = (completedActivities / totalActivities) * 100;

  const {userId,userName, email} = useUserStore()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Профиль</h1>
        <p className="text-gray-600">Управляйте данными своего аккаунта и следите за успеваемостью</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <img
                src={userProfile.avatarUrl}
                alt={userName}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-2xl font-semibold mb-1">{userName}</h2>
              <p className="text-gray-600">{userProfile.major}</p>
              <p className="text-sm text-gray-500">{userProfile.year}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail size={18} className="text-gray-400" />
                <span className="text-sm">{email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <GraduationCap size={18} className="text-gray-400" />
                <span className="text-sm">Номер студента: {userId}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Award size={18} className="text-gray-400" />
                <span className="text-sm">Средний балл: {userProfile.gpa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Stats */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Общая академическая успеваемость</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="text-blue-600" size={24} />
                  <span className="text-sm text-gray-600">Количество изучаемых курсов</span>
                </div>
                <p className="text-3xl font-semibold text-blue-700">{totalCourses}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-green-600" size={24} />
                  <span className="text-sm text-gray-600">Текущий средний балл</span>
                </div>
                <p className="text-3xl font-semibold text-green-700">{userProfile.gpa}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Activity Completion</span>
                <span className="font-medium">{completedActivities}/{totalActivities}</span>
              </div>
              <Progress value={activityProgress} className="h-3" />
              <p className="text-sm text-gray-500 mt-1">{activityProgress.toFixed(0)}% завершено</p>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Прогресс курсов</h3>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{course.code} - {course.name}</span>
                    <span className="text-gray-600">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Grades */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="font-semibold text-lg mb-4">Recent Grades</h3>
            <div className="space-y-3">
              {grades.map((courseGrade) => (
                <div key={courseGrade.courseId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{courseGrade.courseName}</p>
                    <p className="text-sm text-gray-500">
                      {courseGrade.assignments.length} задания оценено
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-blue-600">
                      {courseGrade.finalGrade.toFixed(1)}%
                    </p>
                    <p className="text-lg text-black">
                      {courseGrade.finalGrade >= 90 ? '5' : courseGrade.finalGrade >= 80 ? '4' : courseGrade.finalGrade >= 70 ? '3' : '2'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
