import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Calendar, Play, Pause, Volume2, VolumeX, Settings } from 'lucide-react';
import QuizSection from '../components/quiz/QuizSection';

const sampleLessons = [
  {
    id: '1',
    title: 'Introduction to Multiplication',
    subject: 'Mathematics',
    grade: '2nd Grade',
    description: 'Learn multiplication through fun visual examples and interactive exercises.',
    duration: '12:45',
    lastModified: '2024-03-15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
];

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function LessonDetails() {
  const { id } = useParams();
  const lesson = sampleLessons.find(l => l.id === id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);

  if (!lesson) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Lesson not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative bg-black aspect-video"
             onMouseEnter={() => setShowControls(true)}
             onMouseLeave={() => setShowControls(false)}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`${lesson.videoUrl}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&playbackRate=${playbackSpeed}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Video Controls Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
              {/* Progress Bar */}
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div className="bg-indigo-500 h-1 rounded-full w-1/3"></div>
              </div>
              
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:bg-white/20 p-2 rounded-full transition-colors"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 accent-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <button className="flex items-center space-x-1 hover:bg-white/20 px-2 py-1 rounded transition-colors">
                      <Settings className="h-4 w-4" />
                      <span className="text-sm">{playbackSpeed}x</span>
                    </button>
                    <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                      <div className="bg-black/90 rounded-lg py-2">
                        {playbackSpeeds.map(speed => (
                          <button
                            key={speed}
                            onClick={() => setPlaybackSpeed(speed)}
                            className={`block w-full px-4 py-1 text-sm text-left hover:bg-white/10 ${
                              speed === playbackSpeed ? 'text-indigo-400' : 'text-white'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {lesson.subject}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {lesson.grade}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{lesson.description}</p>
          <div className="flex items-center space-x-6 text-gray-500">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Last modified: {lesson.lastModified}</span>
            </div>
          </div>
        </div>
      </div>

      <QuizSection lessonId={lesson.id} />
    </div>
  );
}