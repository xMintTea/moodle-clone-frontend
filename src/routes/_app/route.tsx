import { Home, BookOpen, Award, User, Menu, X } from "lucide-react";
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
  const {userName: UserName} = useUserStore()

  const navItems = [
    { path: "/my_courses", icon: Home, label: "Мои курсы" },
    { path: "/grades", icon: Award, label: "Оценки" },
    { path: "/profile", icon: User, label: "Профиль" }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };



  return (
        <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <span className="font-semibold text-xl">Mints</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">Здравствуйте, {UserName}!</span>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="flex">

        <aside
          className={`
            fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] bg-white border-r border-gray-200
            w-64 transform transition-transform duration-200 ease-in-out z-30
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>


        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}


        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
