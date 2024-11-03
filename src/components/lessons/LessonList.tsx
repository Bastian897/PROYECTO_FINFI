import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { Lesson } from '../../types/lesson';

interface LessonListProps {
  lessons: Lesson[];
}

export default function LessonList({ lessons }: LessonListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <ul className="divide-y divide-gray-200">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link to={`/lessons/${lesson.id}`} className="block p-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-20 w-32 relative group">
                  <img
                    src={lesson.thumbnailUrl}
                    alt={lesson.title}
                    className="h-20 w-32 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600">
                      {lesson.subject}
                    </p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lesson.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lesson.status}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {lesson.title}
                  </p>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {lesson.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {lesson.lastModified}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}