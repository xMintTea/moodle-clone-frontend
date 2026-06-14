import { useState, useMemo } from "react";
import { students, courses, studentGroups } from "../data/mockData";
import type { Student } from "../data/mockData";
import {
  Users, BookOpen, ChevronRight, ChevronLeft, Award, CheckCircle2,
  Circle, Clock, FileText, Video, ClipboardList, MessageSquare,
  TrendingUp, AlertCircle, Search, X, Filter
} from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";

type View = 'overview' | 'student';

const gradeColor = (pct: number) =>
  pct >= 90 ? 'text-green-600' : pct >= 80 ? 'text-blue-600' : pct >= 70 ? 'text-orange-600' : 'text-red-600';

const gradeBg = (pct: number) =>
  pct >= 90 ? 'bg-green-50 text-green-700' : pct >= 80 ? 'bg-blue-50 text-blue-700' : pct >= 70 ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700';

const letterGrade = (pct: number) =>
  pct >= 90 ? '5' : pct >= 80 ? '4' : pct >= 70 ? '3' : pct >= 60 ? '3' : '2';

const activityIcon = (type: string) => {
  switch (type) {
    case 'video': return <Video size={14} className="text-purple-600" />;
    case 'assignment': return <ClipboardList size={14} className="text-blue-600" />;
    case 'quiz': return <ClipboardList size={14} className="text-green-600" />;
    case 'resource': return <FileText size={14} className="text-gray-500" />;
    case 'forum': return <MessageSquare size={14} className="text-orange-500" />;
    default: return <FileText size={14} />;
  }
};

function studentAvgGrade(student: Student, courseId?: string) {
  const graded = student.grades.filter(
    g => g.grade !== null && (!courseId || g.courseId === courseId)
  );
  if (!graded.length) return null;
  const total = graded.reduce((s, g) => s + (g.grade! / g.maxPoints) * 100, 0);
  return Math.round(total / graded.length);
}

function completionRate(student: Student, courseId?: string) {
  const acts = courseId
    ? student.activities.filter(a => a.courseId === courseId)
    : student.activities;
  if (!acts.length) return 0;
  return Math.round((acts.filter(a => a.completed).length / acts.length) * 100);
}

// ─── Student detail panel ─────────────────────────────────────────────────────

function StudentDetail({ student, onBack }: { student: Student; onBack: () => void }) {
  const [activeCourse, setActiveCourse] = useState<string | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'grades' | 'activities'>('grades');

  const enrolledCoursesList = courses.filter(c => student.enrolledCourses.includes(c.id));

  const filteredGrades = activeCourse === 'all'
    ? student.grades
    : student.grades.filter(g => g.courseId === activeCourse);

  const filteredActivities = activeCourse === 'all'
    ? student.activities
    : student.activities.filter(a => a.courseId === activeCourse);

  const overallAvg = studentAvgGrade(student);
  const overallCompletion = completionRate(student);
  const submittedCount = student.grades.filter(g => g.submitted).length;
  const ungradedCount = student.grades.filter(g => g.submitted && g.grade === null).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft size={20} />
        Обратно к студентам
      </button>

      {/* Student header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start gap-5 flex-wrap">
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-20 h-20 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl font-semibold">{student.name}</h1>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-sm">{student.group}</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-sm">{student.year}</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">{student.email} · {student.major}</p>
            <div className="flex flex-wrap gap-2">
              {enrolledCoursesList.map(c => (
                <span key={c.id} className={`${c.color} text-white px-3 py-1 rounded-full text-xs`}>
                  {c.code}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-semibold text-blue-600">{student.gpa}</p>
            <p className="text-sm text-gray-500">Средний балл</p>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className={`text-2xl font-semibold ${overallAvg !== null ? gradeColor(overallAvg) : 'text-gray-400'}`}>
              {overallAvg !== null ? `${overallAvg}%` : '—'}
            </p>
            <p className="text-xs text-gray-500">Процент</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-purple-600">{overallCompletion}%</p>
            <p className="text-xs text-gray-500">Заданий завершено</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-700">{submittedCount}</p>
            <p className="text-xs text-gray-500">Ответы</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-semibold ${ungradedCount > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
              {ungradedCount}
            </p>
            <p className="text-xs text-gray-500">Ожидающий оценки</p>
          </div>
        </div>
      </div>

      {/* Course filter tabs */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setActiveCourse('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCourse === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
          }`}
        >
          Все курсы
        </button>
        {enrolledCoursesList.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCourse(c.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCourse === c.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
            }`}
          >
            {c.code}
          </button>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-lg shadow-sm overflow-hidden">
        {(['grades', 'activities'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab === 'grades' ? 'Оценки и Ответы' : 'Завершённые задания'}
          </button>
        ))}
      </div>

      {/* Grades tab */}
      {activeTab === 'grades' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredGrades.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <ClipboardList size={40} className="mx-auto mb-3 opacity-40" />
              <p>Нет ответов для этого курса</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Задание</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Курс</th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Статус</th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Сдано</th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Оценка</th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Процент</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredGrades.map(g => {
                    const course = courses.find(c => c.id === g.courseId);
                    const pct = g.grade !== null ? Math.round((g.grade / g.maxPoints) * 100) : null;
                    return (
                      <tr key={g.assignmentId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {g.type === 'quiz'
                              ? <ClipboardList size={16} className="text-green-600 shrink-0" />
                              : <FileText size={16} className="text-blue-600 shrink-0" />
                            }
                            <div>
                              <p className="font-medium text-gray-800">{g.assignmentTitle}</p>
                              {g.feedback && (
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">💬 {g.feedback}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {course && (
                            <span className={`${course.color} text-white px-2 py-0.5 rounded-full text-xs`}>
                              {course.code}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {!g.submitted ? (
                            <Badge variant="outline" className="text-gray-500">Not submitted</Badge>
                          ) : g.grade === null ? (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200">Needs grading</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700 border-green-200">Graded</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-500">
                          {g.submittedAt
                            ? new Date(g.submittedAt).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })
                            : '—'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {pct !== null ? (
                            <span className={`font-semibold ${gradeColor(pct)}`}>
                              {g.grade}/{g.maxPoints}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {pct !== null ? (
                            <div className="flex items-center gap-2 justify-center">
                              <div className="w-20">
                                <Progress value={pct} className="h-1.5" />
                              </div>
                              <span className={`text-sm font-medium min-w-[2.5rem] ${gradeColor(pct)}`}>
                                {pct}%
                              </span>
                              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${gradeBg(pct)}`}>
                                {letterGrade(pct)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-center block">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Activities tab */}
      {activeTab === 'activities' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <CheckCircle2 size={40} className="mx-auto mb-3 opacity-40" />
              <p>No activities for this course</p>
            </div>
          ) : (
            <>
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {filteredActivities.filter(a => a.completed).length} / {filteredActivities.length} завершено
                </span>
                <div className="w-40">
                  <Progress
                    value={completionRate(student, activeCourse === 'all' ? undefined : activeCourse)}
                    className="h-2"
                  />
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredActivities.map(act => {
                  const course = courses.find(c => c.id === act.courseId);
                  return (
                    <div key={act.activityId} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                      <div className="shrink-0">
                        {act.completed
                          ? <CheckCircle2 size={20} className="text-green-600" />
                          : <Circle size={20} className="text-gray-300" />
                        }
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {activityIcon(act.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${act.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                          {act.title}
                        </p>
                      </div>
                      {course && (
                        <span className={`${course.color} text-white px-2 py-0.5 rounded-full text-xs shrink-0`}>
                          {course.code}
                        </span>
                      )}
                      <div className="text-right shrink-0 w-28">
                        {act.completed && act.completedAt ? (
                          <p className="text-xs text-gray-400">
                            {new Date(act.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        ) : !act.completed ? (
                          <span className="text-xs text-gray-400">Not done</span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Students overview table ──────────────────────────────────────────────────

function StudentsOverview({
  filtered,
  onSelect,
  activeCourseFilter,
}: {
  filtered: Student[];
  onSelect: (s: Student) => void;
  activeCourseFilter: string;
}) {
  if (filtered.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm flex flex-col items-center justify-center py-20 text-gray-400">
        <Users size={48} className="mb-4 opacity-30" />
        <p className="text-lg">No students match the current filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Студент</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Группа</th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Курсы</th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Процент</th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Завершение</th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Ожидающие</th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Средний балл</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(student => {
              const courseId = activeCourseFilter === 'all' ? undefined : activeCourseFilter;
              const avg = studentAvgGrade(student, courseId);
              const completion = completionRate(student, courseId);
              const pending = student.grades.filter(g => g.submitted && g.grade === null && (!courseId || g.courseId === courseId)).length;
              const enrolledCoursesList = courses.filter(c => student.enrolledCourses.includes(c.id));

              return (
                <tr
                  key={student.id}
                  className="hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => onSelect(student)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatarUrl} alt={student.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">{student.group}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {enrolledCoursesList.map(c => (
                        <span key={c.id} className={`${c.color} text-white px-2 py-0.5 rounded-full text-xs`}>{c.code}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {avg !== null ? (
                      <span className={`font-semibold ${gradeColor(avg)}`}>{avg}%</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Progress value={completion} className="h-1.5" />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{completion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {pending > 0 ? (
                      <span className="inline-flex items-center gap-1 text-orange-600 text-sm">
                        <AlertCircle size={14} />
                        {pending}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-medium text-gray-700">{student.gpa}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ChevronRight size={18} className="text-gray-400 inline" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main TeacherPage ─────────────────────────────────────────────────────────

export function TeacherPage() {
  const [view, setView] = useState<View>('overview');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filters
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return students.filter(s => {
      if (groupFilter !== 'all' && s.group !== groupFilter) return false;
      if (courseFilter !== 'all' && !s.enrolledCourses.includes(courseFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.email.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [groupFilter, courseFilter, search]);

  // Aggregates for stat cards
  const totalStudents = filtered.length;
  const avgGrade = useMemo(() => {
    const avgs = filtered.map(s => studentAvgGrade(s)).filter(v => v !== null) as number[];
    return avgs.length ? Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length) : null;
  }, [filtered]);
  const totalPending = useMemo(() =>
    filtered.reduce((sum, s) => sum + s.grades.filter(g => g.submitted && g.grade === null).length, 0),
    [filtered]
  );
  const avgCompletion = useMemo(() => {
    if (!filtered.length) return 0;
    return Math.round(filtered.reduce((s, st) => s + completionRate(st), 0) / filtered.length);
  }, [filtered]);

  const openStudent = (s: Student) => {
    setSelectedStudent(s);
    setView('student');
  };

  const backToOverview = () => {
    setView('overview');
    setSelectedStudent(null);
  };

  if (view === 'student' && selectedStudent) {
    return (
      <div className="max-w-7xl mx-auto">
        <StudentDetail student={selectedStudent} onBack={backToOverview} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-1">Общая успеваемость</h1>
        <p className="text-gray-500">Следите за успеваемостью, оценками и выполнением заданий учащихся</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg shrink-0">
            <Users className="text-blue-600" size={22} />
          </div>
          <div>
            <p className="text-2xl font-semibold">{totalStudents}</p>
            <p className="text-sm text-gray-500">Студентов</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg shrink-0">
            <Award className="text-green-600" size={22} />
          </div>
          <div>
            <p className={`text-2xl font-semibold ${avgGrade !== null ? gradeColor(avgGrade) : 'text-gray-400'}`}>
              {avgGrade !== null ? `${avgGrade}%` : '—'}
            </p>
            <p className="text-sm text-gray-500">Средний балл</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-5 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-lg shrink-0">
            <AlertCircle className="text-orange-500" size={22} />
          </div>
          <div>
            <p className={`text-2xl font-semibold ${totalPending > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
              {totalPending}
            </p>
            <p className="text-sm text-gray-500">Требует оценки</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-5 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg shrink-0">
            <TrendingUp className="text-purple-600" size={22} />
          </div>
          <div>
            <p className="text-2xl font-semibold text-purple-600">{avgCompletion}%</p>
            <p className="text-sm text-gray-500">Среднее завершение</p>
          </div>
        </div>
      </div>

      {/* Filters row */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-5 flex flex-wrap items-center gap-3">
        <Filter size={18} className="text-gray-400 shrink-0" />

        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Искать по имени или почте…"
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Group filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 shrink-0">Группа:</span>
          {['all', ...studentGroups].map(g => (
            <button
              key={g}
              onClick={() => setGroupFilter(g)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                groupFilter === g
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {g === 'all' ? 'Все группы' : g}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 hidden sm:block" />

        {/* Course filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 shrink-0">Курс:</span>
          <button
            onClick={() => setCourseFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              courseFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {courses.map(c => (
            <button
              key={c.id}
              onClick={() => setCourseFilter(c.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                courseFilter === c.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-3">
        Показано {filtered.length} of {students.length} студентов
        {groupFilter !== 'all' && <span className="ml-1">in <strong>{groupFilter}</strong></span>}
        {courseFilter !== 'all' && <span className="ml-1">enrolled in <strong>{courses.find(c => c.id === courseFilter)?.code}</strong></span>}
      </p>

      {/* Students table */}
      <StudentsOverview
        filtered={filtered}
        onSelect={openStudent}
        activeCourseFilter={courseFilter}
      />
    </div>
  );
}
