import React from 'react';

interface LessonFiltersProps {
  className?: string;
}

export default function LessonFilters({ className = '' }: LessonFiltersProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
        <option value="">All Subjects</option>
        <option value="mathematics">Mathematics</option>
        <option value="science">Science</option>
        <option value="english">English</option>
        <option value="art">Art</option>
        <option value="music">Music</option>
      </select>

      <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
        <option value="">All Grades</option>
        <option value="1">1st Grade</option>
        <option value="2">2nd Grade</option>
        <option value="3">3rd Grade</option>
        <option value="4">4th Grade</option>
        <option value="5">5th Grade</option>
      </select>

      <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
        <option value="">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>

      <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
        <option value="">Sort By</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}