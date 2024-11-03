import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import LessonList from '../components/lessons/LessonList';
import LessonFilters from '../components/lessons/LessonFilters';
import CreateLessonModal from '../components/lessons/CreateLessonModal';
import { Lesson } from '../types/lesson';

const sampleLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Multiplication',
    subject: 'Mathematics',
    grade: '2nd Grade',
    description: 'Learn multiplication through fun visual examples and interactive exercises.',
    duration: '12:45',
    status: 'published',
    lastModified: '2024-03-15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: 1234
  },
  {
    id: '2',
    title: 'Solar System Adventure',
    subject: 'Science',
    grade: '3rd Grade',
    description: 'Explore the planets and stars in our solar system with Finfi as your guide.',
    duration: '15:20',
    status: 'draft',
    lastModified: '2024-03-14',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: 2345
  },
  {
    id: '3',
    title: 'Story Elements',
    subject: 'English',
    grade: '4th Grade',
    description: 'Discover the key elements that make up a great story with interactive examples.',
    duration: '18:30',
    status: 'published',
    lastModified: '2024-03-13',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: 3456
  },
];

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>(sampleLessons);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons;

    const query = searchQuery.toLowerCase().trim();
    return lessons.filter((lesson) => {
      const searchableText = `
        ${lesson.title}
        ${lesson.subject}
        ${lesson.description}
      `.toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery, lessons]);

  const handleCreateLesson = (newLesson: Omit<Lesson, 'id' | 'lastModified'>) => {
    const lesson: Lesson = {
      ...newLesson,
      id: (lessons.length + 1).toString(),
      lastModified: new Date().toISOString().split('T')[0],
    };
    setLessons([lesson, ...lessons]);
  };

  const handlePlayVideo = (videoUrl: string) => {
    setActiveVideo(videoUrl);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                src={activeVideo}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Lessons</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Lesson
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {showFilters && <LessonFilters className="mb-6" />}

      {filteredLessons.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No lessons found matching your search criteria.</p>
        </div>
      ) : (
        <LessonList lessons={filteredLessons} onPlay={handlePlayVideo} />
      )}

      <CreateLessonModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateLesson}
      />
    </div>
  );
}