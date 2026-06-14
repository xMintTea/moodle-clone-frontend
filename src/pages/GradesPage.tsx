import { grades } from "../data/mockData";
import { Award, TrendingUp } from "lucide-react";
import { Progress } from "../components/ui/progress";

export default function GradesPage() {
  const overallGPA = grades.reduce((sum, g) => sum + g.finalGrade, 0) / grades.length;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Оценки</h1>
        <p className="text-gray-600">Следите за своей успеваемостью по всем предметам</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Award className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Общее среднее</p>
              <p className="text-3xl font-semibold">{overallGPA.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Средний балл</p>
              <p className="text-3xl font-semibold">4.2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grades */}
      <div className="space-y-6">
        {grades.map((courseGrade) => (
          <div key={courseGrade.courseId} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{courseGrade.courseName}</h2>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-blue-600">
                    {courseGrade.finalGrade.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Финальная оценка</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Задание</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Оценка</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Максимальный балл</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Влияние</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Процент</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseGrade.assignments.map((assignment, idx) => {
                      const percentage = (assignment.grade / assignment.maxPoints) * 100;
                      return (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{assignment.name}</td>
                          <td className="text-center py-3 px-4">
                            <span className={`font-medium ${percentage >= 90 ? 'text-green-600' : percentage >= 80 ? 'text-blue-600' : percentage >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                              {assignment.grade}
                            </span>
                          </td>
                          <td className="text-center py-3 px-4 text-gray-600">
                            {assignment.maxPoints}
                          </td>
                          <td className="text-center py-3 px-4 text-gray-600">
                            {assignment.weight}%
                          </td>
                          <td className="text-right py-3 px-4">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-24">
                                <Progress 
                                  value={percentage} 
                                  className={`h-2 ${percentage >= 90 ? '[&>div]:bg-green-500' : percentage >= 80 ? '[&>div]:bg-blue-500' : percentage >= 70 ? '[&>div]:bg-orange-500' : '[&>div]:bg-red-500'}`}
                                />
                              </div>
                              <span className={`font-medium min-w-[3rem] ${percentage >= 90 ? 'text-green-600' : percentage >= 80 ? 'text-blue-600' : percentage >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                                {percentage.toFixed(0)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grade Legend */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h3 className="font-semibold mb-4">Система оценивания</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="font-semibold text-green-700">5</p>
            <p className="text-sm text-gray-600">90-100%</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="font-semibold text-blue-700">5</p>
            <p className="text-sm text-gray-600">80-89%</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <p className="font-semibold text-orange-700">4</p>
            <p className="text-sm text-gray-600">70-79%</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="font-semibold text-red-700">3</p>
            <p className="text-sm text-gray-600">60-69%</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-700">2</p>
            <p className="text-sm text-gray-600">0-59%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
