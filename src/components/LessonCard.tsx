import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface LessonCardProps {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
}

export default function LessonCard({
  id,
  title,
  subject,
  grade,
  description,
  duration,
  thumbnailUrl,
}: LessonCardProps) {
  return (
    <Link to={`/lessons/${id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48 group">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
            {subject}
          </div>
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600">
            {grade}
          </div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 px-3 py-1 rounded-full text-sm font-medium text-white">
            {duration}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}