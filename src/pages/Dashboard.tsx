import React, { useState, useMemo } from 'react';
import { Book, Calculator, Globe, Music, Palette, Search } from 'lucide-react';
import LessonCard from '../components/LessonCard';
import SubjectFilter from '../components/SubjectFilter';
import GradeFilter from '../components/GradeFilter';
import { useAuth } from '../contexts/AuthContext';

const subjects = [
  { id: 'math', name: 'Mathematics', icon: Calculator },
  { id: 'science', name: 'Science', icon: Globe },
  { id: 'english', name: 'English', icon: Book },
  { id: 'art', name: 'Art', icon: Palette },
  { id: 'music', name: 'Music', icon: Music },
];

const grades = ['1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];

const sampleLessons = [
  {
    id: '1',
    title: 'Introduction to Multiplication',
    subject: 'Mathematics',
    grade: '2nd Grade',
    description: 'Learn multiplication through fun visual examples and interactive exercises.',
    duration: '12:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Solar System Adventure',
    subject: 'Science',
    grade: '3rd Grade',
    description: 'Explore the planets and stars in our solar system with Finfi as your guide.',
    duration: '15:20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Story Elements',
    subject: 'English',
    grade: '4th Grade',
    description: 'Discover the key elements that make up a great story with interactive examples.',
    duration: '18:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000'
  },
];

export default function Dashboard() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const filteredLessons = useMemo(() => {
    return sampleLessons.filter(lesson => {
      const matchesSearch = searchQuery === '' || 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubject === 'all' || 
        lesson.subject.toLowerCase() === subjects.find(s => s.id === selectedSubject)?.name.toLowerCase();

      const matchesGrade = selectedGrade === 'all' || 
        lesson.grade === selectedGrade;

      return matchesSearch && matchesSubject && matchesGrade;
    });
  }, [searchQuery, selectedSubject, selectedGrade]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-1 text-gray-500">
          Here are your latest lessons and resources
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <GradeFilter
            grades={grades}
            selected={selectedGrade}
            onChange={setSelectedGrade}
          />
          <SubjectFilter
            subjects={subjects}
            selected={selectedSubject}
            onChange={setSelectedSubject}
          />
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">
            No lessons found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              {...lesson}
            />
          ))}
        </div>
      )}
    </div>
  );
}