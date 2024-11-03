export interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  duration: string;
  status: 'published' | 'draft';
  lastModified: string;
  thumbnailUrl: string;
  videoUrl: string;
}