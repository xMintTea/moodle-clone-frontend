import { Home, BookOpen, Award, User, Menu, X, GraduationCap, Bell, Calendar, Search } from "lucide-react";
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useState } from 'react';
import { useUserStore } from '#/stores/userStore';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  ssr: false
})

function RouteComponent() {
  const { location } = useRouterState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userName, userRole = 1 } = useUserStore(); // роль по умолчанию 1 (студент)

  const navGroups = [
    {
      label: "Основное",
      items: [
        { path: "/my_courses", icon: Home, label: "Мои курсы", role: 1 },
        { path: "/courses", icon: Search, label: "Курсы", role: 1 },
        { path: "/announcements", icon: Bell, label: "Объявления", role: 1 },
        { path: "/schedule", icon: Calendar, label: "Расписание", role: 1 },
        { path: "/grades", icon: Award, label: "Оценки", role: 1 },
        { path: "/profile", icon: User, label: "Профиль", role: 1 },
        { path: "/teacher", icon: GraduationCap, label: "Общая успеваемость", role: 2 },
      ]
    }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/my_courses" className="flex items-center gap-2">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <span className="font-semibold text-xl">Mints</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">Здравствуйте, {userName}!</span>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] bg-white border-r border-gray-200
            w-64 transform transition-transform duration-200 ease-in-out z-30
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-4 overflow-y-auto h-full pb-8">
            {navGroups.map(group => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-1">{group.label}</p>
                <div className="space-y-1">
                  {group.items
                    .filter(item => userRole >= item.role) // ← фильтрация по роли
                    .map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm
                          ${isActive(item.path)
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}