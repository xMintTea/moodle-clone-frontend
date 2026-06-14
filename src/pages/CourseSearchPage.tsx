import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { catalogCourses, courseCategories } from "../data/mockData";
import type { CatalogCourse } from "../data/mockData";
import { Search, Users, Star, BookOpen, CheckCircle2, Clock, ChevronRight, X, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}>★</span>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function CourseCard({ course, onEnroll }: { course: CatalogCourse; onEnroll: (id: string) => void }) {
  const capacityPct = Math.round((course.enrolled / course.capacity) * 100);
  const isFull = capacityPct >= 100;

  const typeColors: Record<string, string> = {
    "Computer Science": "bg-blue-500",
    "Mathematics": "bg-green-500",
    "Physics": "bg-orange-500",
    "English": "bg-purple-500",
    "Biology": "bg-emerald-500",
    "History": "bg-amber-600",
    "Chemistry": "bg-teal-500",
    "Psychology": "bg-pink-500",
  };
  const badgeColor = typeColors[course.category] || "bg-gray-500";

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="relative h-36 overflow-hidden">
        <img src={course.imageUrl} alt={course.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-3 left-3 ${badgeColor} text-white text-xs px-2 py-1 rounded-full`}>
          {course.code}
        </span>
        {course.alreadyEnrolled && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} /> Зачислен
          </span>
        )}
        {isFull && !course.alreadyEnrolled && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">Full</span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{course.instructor}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">{course.description}</p>

        <StarRating rating={course.rating} />

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1"><Users size={12} /> {course.enrolled}/{course.capacity} зачислено</span>
            <span className="flex items-center gap-1"><BookOpen size={12} /> {course.credits} credits</span>
          </div>
          <Progress value={capacityPct} className={`h-1.5 ${capacityPct > 80 ? '[&>div]:bg-orange-400' : '[&>div]:bg-blue-400'}`} />
        </div>

        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <Clock size={12} />
          <span>{course.schedule}</span>
        </div>

        {course.prerequisites.length > 0 && (
          <p className="text-xs text-gray-400 mt-1.5">
            {course.prerequisites.join(", ")}
          </p>
        )}

        <div className="mt-4 flex gap-2">
          {course.alreadyEnrolled ? (
            <Link
              to="/course/$courseId"
              params={{ courseId: "1" }}
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full gap-1">
                Открыть курс <ChevronRight size={14} />
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              className="flex-1"
              disabled={isFull}
              onClick={() => onEnroll(course.id)}
            >
              {isFull ? "Курс полон" : "Зачислиться"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CourseSearchPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "enrolled">("rating");
  const [showAvailable, setShowAvailable] = useState(false);
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(
    new Set(catalogCourses.filter(c => c.alreadyEnrolled).map(c => c.id))
  );
  const [enrolledToast, setEnrolledToast] = useState<string | null>(null);

  const handleEnroll = (courseId: string) => {
    setEnrolledIds(prev => new Set([...prev, courseId]));
    const course = catalogCourses.find(c => c.id === courseId);
    setEnrolledToast(course?.name ?? "Course");
    setTimeout(() => setEnrolledToast(null), 3000);
  };

  const filtered = useMemo(() => {
    let list = catalogCourses.map(c => ({
      ...c,
      alreadyEnrolled: enrolledIds.has(c.id)
    }));

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.tags.some(t => t.includes(q)) ||
        c.description.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== "all") {
      list = list.filter(c => c.category === selectedCategory);
    }
    if (showAvailable) {
      list = list.filter(c => !c.alreadyEnrolled && c.enrolled < c.capacity);
    }

    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "enrolled") return b.enrolled - a.enrolled;
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [search, selectedCategory, sortBy, showAvailable, enrolledIds]);

  const enrolledCount = enrolledIds.size;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-1">Каталог курсов</h1>
        <p className="text-gray-500">Просмотрите список курсов и запишитесь на них на весну 2026 года</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg"><BookOpen size={20} className="text-blue-600" /></div>
          <div><p className="text-xl font-semibold">{catalogCourses.length}</p><p className="text-xs text-gray-500">Всего курсов</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg"><CheckCircle2 size={20} className="text-green-600" /></div>
          <div><p className="text-xl font-semibold">{enrolledCount}</p><p className="text-xs text-gray-500">Зачислен</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg"><Star size={20} className="text-purple-600" /></div>
          <div><p className="text-xl font-semibold">{catalogCourses.length - enrolledCount}</p><p className="text-xs text-gray-500">Доступно</p></div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Искать курсы, учителей, задания…"
              className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-400"
            >
              <option value="rating">Сортировка: Рейтинг</option>
              <option value="enrolled">Сортировка: Популярность</option>
              <option value="name">Сортировка: А–Я</option>
            </select>
          </div>

          {/* Available only toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 whitespace-nowrap">
            <input
              type="checkbox"
              checked={showAvailable}
              onChange={e => setShowAvailable(e.target.checked)}
              className="rounded"
            />
            Только доступные
          </label>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Все категории
          </button>
          {courseCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {filtered.length} курсов найдено
        {selectedCategory !== "all" && <span> in <strong>{selectedCategory}</strong></span>}
      </p>

      {/* Course grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm flex flex-col items-center py-20 text-gray-400">
          <Search size={48} className="mb-4 opacity-30" />
          <p className="text-lg">Ни один курс не соответствует вашему запросу</p>
          <button onClick={() => { setSearch(""); setSelectedCategory("all"); setShowAvailable(false); }}
            className="mt-3 text-blue-600 text-sm hover:underline">Очистить фильтры</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(course => (
            <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
          ))}
        </div>
      )}

      {/* Toast */}
      {enrolledToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-bottom-4">
          <CheckCircle2 size={18} />
          <span>Успешно зачислен в <strong>{enrolledToast}</strong>!</span>
        </div>
      )}
    </div>
  );
}