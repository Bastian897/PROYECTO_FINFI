import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  BookOpen,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-indigo-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">EduFinfi</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`
                }
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </NavLink>
              <NavLink
                to="/lessons"
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`
                }
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Lessons
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`
                }
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </NavLink>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
            <button
              onClick={logout}
              className="flex-shrink-0 w-full group block text-indigo-100 hover:bg-indigo-600 rounded-md px-2 py-2"
            >
              <div className="flex items-center">
                <LogOut className="mr-3 h-5 w-5" />
                <span className="text-sm font-medium">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}