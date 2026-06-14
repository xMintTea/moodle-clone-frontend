import { useState, useMemo } from "react";
import { scheduleEntries, lessonSlots, weekDays, studentGroups, teacherNames } from "../data/mockData";
import type { ScheduleEntry } from "../data/mockData";
import { Search, MapPin, Clock, Users, BookOpen, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";

// ─── Color per course code ────────────────────────────────────────────────────
const courseColors: Record<string, string> = {
  "CS 101":   "bg-blue-100 border-blue-300 text-blue-800",
  "MATH 201": "bg-green-100 border-green-300 text-green-800",
  "ENG 150":  "bg-purple-100 border-purple-300 text-purple-800",
  "PHYS 101": "bg-orange-100 border-orange-300 text-orange-800",
  "CHEM 101": "bg-teal-100 border-teal-300 text-teal-800",
  "HIST 101": "bg-amber-100 border-amber-300 text-amber-800",
};
const fallbackColor = "bg-gray-100 border-gray-300 text-gray-800";

const typeLabel: Record<ScheduleEntry["type"], string> = {
  lecture: "Лекция",
  seminar: "Семинар",
  lab: "Лабораторная",
  practice: "Практика",
};

const typeDot: Record<ScheduleEntry["type"], string> = {
  lecture: "bg-blue-500",
  seminar: "bg-purple-500",
  lab: "bg-orange-500",
  practice: "bg-green-500",
};

// Get week dates (Mon–Sat) for a given offset from "current" week
function getWeekDates(offsetWeeks: number) {
  const today = new Date(2026, 0, 19); // anchor: Mon Jan 19 2026
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + offsetWeeks * 7);
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
}

function LessonCell({ entry }: { entry: ScheduleEntry }) {
  const color = courseColors[entry.courseCode] || fallbackColor;
  return (
    <div className={`rounded border ${color} px-2 py-1.5 text-xs h-full flex flex-col gap-0.5`}>
      <div className="flex items-center justify-between gap-1">
        <span className="font-semibold truncate">{entry.courseCode}</span>
        <span className={`shrink-0 w-2 h-2 rounded-full ${typeDot[entry.type]}`} title={typeLabel[entry.type]} />
      </div>
      <p className="truncate opacity-80 leading-tight">{entry.courseName}</p>
      <div className="flex items-center gap-0.5 opacity-70 mt-auto">
        <MapPin size={10} />
        <span>{entry.auditory}</span>
      </div>
      {entry.teacherName && (
        <p className="opacity-60 truncate">{entry.teacherName.split(" ").slice(-1)[0]}</p>
      )}
    </div>
  );
}

export function SchedulePage() {
  const [mode, setMode] = useState<"group" | "teacher">("group");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showSlotInfo, setShowSlotInfo] = useState(false);

  const weekDates = getWeekDates(weekOffset);

  const groupSuggestions = studentGroups.filter(g =>
    !searchQuery || g.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const teacherSuggestions = teacherNames.filter(t =>
    !searchQuery || t.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTarget = mode === "group" ? selectedGroup : selectedTeacher;

  const filteredEntries = useMemo(() => {
    if (!activeTarget) return [];
    if (mode === "group") return scheduleEntries.filter(e => e.group === activeTarget);
    return scheduleEntries.filter(e => e.teacherName === activeTarget);
  }, [activeTarget, mode]);

  // Build lookup: day -> slot -> entry[]
  const cellMap: Record<number, Record<number, ScheduleEntry[]>> = {};
  for (const entry of filteredEntries) {
    if (!cellMap[entry.dayOfWeek]) cellMap[entry.dayOfWeek] = {};
    if (!cellMap[entry.dayOfWeek][entry.slot]) cellMap[entry.dayOfWeek][entry.slot] = [];
    cellMap[entry.dayOfWeek][entry.slot].push(entry);
  }

  const totalWeekLessons = filteredEntries.length;
  const uniqueCourses = [...new Set(filteredEntries.map(e => e.courseCode))];

  const handleSelect = (value: string) => {
    setSearchQuery(value);
    if (mode === "group") {
      setSelectedGroup(value);
    } else {
      setSelectedTeacher(value);
    }
  };

  const handleModeChange = (m: "group" | "teacher") => {
    setMode(m);
    setSearchQuery("");
    setSelectedGroup(null);
    setSelectedTeacher(null);
  };

  const suggestions = mode === "group" ? groupSuggestions : teacherSuggestions;
  const showDropdown = searchQuery.length > 0 && !activeTarget;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-1">Расписание</h1>
        <p className="text-gray-500">Просмотр еженедельного расписания по группам или преподавателям</p>
      </div>

      {/* Search card */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
        {/* Mode toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleModeChange("group")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "group" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Users size={15} /> Группы
          </button>
          <button
            onClick={() => handleModeChange("teacher")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "teacher" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <GraduationCap size={15} /> Преподаватели
          </button>
        </div>

        {/* Search input */}
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setSelectedGroup(null); setSelectedTeacher(null); }}
            placeholder={mode === "group" ? "Искать группу…" : "Искать преподавателя…"}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          />

          {/* Dropdown suggestions */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleSelect(s)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          {showDropdown && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 px-4 py-3 text-sm text-gray-400">
              No results found
            </div>
          )}
        </div>

        {/* Quick select chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(mode === "group" ? studentGroups : teacherNames).map(v => (
            <button
              key={v}
              onClick={() => handleSelect(v)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeTarget === v
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {!activeTarget ? (
        <div className="bg-white rounded-lg shadow-sm flex flex-col items-center py-20 text-gray-400">
          <BookOpen size={52} className="mb-4 opacity-25" />
          <p className="text-lg">Select a {mode === "group" ? "group" : "teacher"} to view their schedule</p>
        </div>
      ) : (
        <>
          {/* Week navigation + stats */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setWeekOffset(o => o - 1)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="text-sm font-medium">
                {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                {" – "}
                {weekDates[5].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                {weekOffset === 0 && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Current week</span>}
              </div>
              <button
                onClick={() => setWeekOffset(o => o + 1)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              {weekOffset !== 0 && (
                <button onClick={() => setWeekOffset(0)} className="text-xs text-blue-600 hover:underline">Today</button>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium text-gray-900">{activeTarget}</span>
              <span>{totalWeekLessons} Пара/неделя</span>
              <span>{uniqueCourses.length} курсы</span>
              <button
                onClick={() => setShowSlotInfo(!showSlotInfo)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <Clock size={14} /> Время занятий
              </button>
            </div>
          </div>

          {/* Lesson times info panel */}
          {showSlotInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {lessonSlots.map(s => (
                <div key={s.slot} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center shrink-0 font-medium">
                    {s.slot}
                  </span>
                  <span className="text-blue-800">{s.start} – {s.end}</span>
                </div>
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-4">
            {Object.entries(typeDot).map(([type, dot]) => (
              <div key={type} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                {typeLabel[type as ScheduleEntry["type"]]}
              </div>
            ))}
          </div>

          {/* Timetable grid */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse" style={{ minWidth: "700px" }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {/* Slot header */}
                    <th className="w-28 px-3 py-3 text-left border-r border-gray-200">
                      <span className="text-xs font-medium text-gray-500">Занятие / День</span>
                    </th>
                    {weekDays.map((day, i) => {
                      const date = weekDates[i];
                      const isToday = weekOffset === 0 && i === 0; // simplification: Mon = today
                      return (
                        <th
                          key={day}
                          className={`px-3 py-3 text-center border-r border-gray-100 last:border-0 ${
                            isToday ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className={`text-xs font-medium ${isToday ? "text-blue-700" : "text-gray-600"}`}>{day}</p>
                          <p className={`text-sm font-semibold ${isToday ? "text-blue-900" : "text-gray-800"}`}>
                            {date.getDate()}
                          </p>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {lessonSlots.map(slot => {
                    const hasAnyEntry = weekDays.some((_, dayIdx) => {
                      const dayNum = dayIdx + 1;
                      return cellMap[dayNum]?.[slot.slot]?.length > 0;
                    });

                    return (
                      <tr key={slot.slot} className={`border-b border-gray-100 ${!hasAnyEntry ? "opacity-50" : ""}`}>
                        {/* Slot label */}
                        <td className="border-r border-gray-200 px-3 py-2 align-top w-28">
                          <div className="flex items-start gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center shrink-0 font-medium mt-0.5">
                              {slot.slot}
                            </span>
                            <div>
                              <p className="text-xs font-medium text-gray-700">{slot.start}</p>
                              <p className="text-xs text-gray-400">{slot.end}</p>
                            </div>
                          </div>
                        </td>

                        {weekDays.map((_, dayIdx) => {
                          const dayNum = dayIdx + 1;
                          const entries = cellMap[dayNum]?.[slot.slot] || [];
                          return (
                            <td
                              key={dayIdx}
                              className="border-r border-gray-100 last:border-0 px-2 py-2 align-top"
                              style={{ minHeight: "72px", height: "72px", verticalAlign: "top" }}
                            >
                              {entries.length > 0 ? (
                                <div className="flex flex-col gap-1 h-full">
                                  {entries.map(e => <LessonCell key={e.id} entry={e} />)}
                                </div>
                              ) : (
                                <div className="h-full min-h-[64px] flex items-center justify-center">
                                  <span className="text-gray-200 text-xs">—</span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary by day */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-5">
            {weekDays.map((day, i) => {
              const dayNum = i + 1;
              const dayEntries = filteredEntries.filter(e => e.dayOfWeek === dayNum);
              return (
                <div key={day} className="bg-white rounded-lg shadow-sm p-3 text-center">
                  <p className="text-xs text-gray-500 font-medium">{day.slice(0, 3)}</p>
                  <p className="text-xl font-semibold text-gray-800 mt-1">{dayEntries.length}</p>
                  <p className="text-xs text-gray-400">занятий</p>
                  {dayEntries.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {dayEntries.map(e => (
                        <span
                          key={e.id}
                          className={`text-xs px-1.5 py-0.5 rounded border ${courseColors[e.courseCode] || fallbackColor}`}
                        >
                          {e.auditory}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
