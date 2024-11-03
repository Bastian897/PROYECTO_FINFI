import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                <span className="text-xs text-gray-500">Teacher</span>
              </div>
              <img
                className="h-8 w-8 rounded-full"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'T')}&background=6366f1&color=fff`}
                alt={user?.name}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}