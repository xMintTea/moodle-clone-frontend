import { useState } from "react";
import { announcements } from "../data/mockData";
import type { Announcement } from "../data/mockData";
import { Pin, Bell, Calendar, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { Badge } from "../components/ui/badge";

const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  academic: { label: "Учёба",    color: "text-blue-700",   bg: "bg-blue-50 border-blue-200" },
  event:    { label: "События",       color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  admin:    { label: "Администрация",       color: "text-gray-700",   bg: "bg-gray-50 border-gray-200" },
  alert:    { label: "⚠️ внимание",    color: "text-red-700",    bg: "bg-red-50 border-red-200" },
  sports:   { label: "Спорт",      color: "text-green-700",  bg: "bg-green-50 border-green-200" },
};

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}д назад`;
  if (h > 0) return `${h}ч назад`;
  return `${m}м назад`;
}

function AnnouncementCard({ ann }: { ann: Announcement }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = categoryConfig[ann.category] || categoryConfig.admin;

  return (
    <article className={`bg-white rounded-lg shadow-sm overflow-hidden border-l-4 ${
      ann.category === 'alert' ? 'border-red-400' :
      ann.category === 'academic' ? 'border-blue-400' :
      ann.category === 'event' ? 'border-purple-400' :
      ann.category === 'sports' ? 'border-green-400' :
      'border-gray-300'
    }`}>
      {ann.imageUrl && (
        <div className="h-44 overflow-hidden">
          <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5">
        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {ann.pinned && (
            <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full font-medium">
              <Pin size={11} /> Закреплено
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.bg} ${cfg.color}`}>
            {cfg.label}
          </span>
          <span className="text-xs text-gray-400 ml-auto">{timeAgo(ann.publishedAt)}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">{ann.title}</h2>

        {/* Summary */}
        <p className="text-sm text-gray-600 mb-3">{ann.summary}</p>

        {/* Author */}
        <div className="flex items-center gap-2 mb-4">
          <img src={ann.authorAvatar} alt={ann.author} className="w-7 h-7 rounded-full object-cover" />
          <span className="text-xs text-gray-500">{ann.author} · <span className="text-gray-400">{ann.authorRole}</span></span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {ann.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Expandable content */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {expanded ? <><ChevronUp size={16} /> Hide details</> : <><ChevronDown size={16} /> Читать далее</>}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-700 leading-relaxed space-y-2">
              {ann.content.split("\n\n").map((para, i) => {
                if (para.startsWith("**") && para.endsWith("**")) {
                  return <p key={i} className="font-semibold text-gray-900">{para.replace(/\*\*/g, "")}</p>;
                }
                if (para.startsWith("- ") || para.includes("\n- ")) {
                  const items = para.split("\n").filter(l => l.startsWith("- "));
                  const rest = para.split("\n").filter(l => !l.startsWith("- ")).join("\n");
                  return (
                    <div key={i}>
                      {rest && <p>{rest}</p>}
                      <ul className="list-disc list-inside space-y-0.5 mt-1">
                        {items.map((item, j) => <li key={j}>{item.replace(/^- /, "")}</li>)}
                      </ul>
                    </div>
                  );
                }
                return <p key={i}>{para}</p>;
              })}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <Calendar size={13} />
              {new Date(ann.publishedAt).toLocaleDateString("en-US", {
                weekday: "long", year: "numeric", month: "long", day: "numeric"
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function AnnouncementsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = announcements.filter(a => {
    if (activeCategory !== "all" && a.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.tags.some(t => t.includes(q));
    }
    return true;
  }).sort((a, b) => {
    // Pinned first, then by date
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const pinned = filtered.filter(a => a.pinned);
  const regular = filtered.filter(a => !a.pinned);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Объявления</h1>
          <p className="text-gray-500">Новости университета, события и важные объявления</p>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
          <Bell size={15} />
          <span>{announcements.filter(a => a.pinned).length} закреплено</span>
        </div>
      </div>

      {/* Search + category filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Искать объявления…"
            className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Все
          </button>
          {Object.entries(categoryConfig).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cfg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Pin size={14} /> Закреплено
          </h2>
          <div className="space-y-4">
            {pinned.map(a => <AnnouncementCard key={a.id} ann={a} />)}
          </div>
        </div>
      )}

      {/* Recent */}
      {regular.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent</h2>
          <div className="space-y-4">
            {regular.map(a => <AnnouncementCard key={a.id} ann={a} />)}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm flex flex-col items-center py-20 text-gray-400">
          <Bell size={48} className="mb-4 opacity-30" />
          <p>Ни одно объявление не соответствует вашему запросу</p>
        </div>
      )}
    </div>
  );
}
