import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface SubjectFilterProps {
  subjects: Subject[];
  selected: string;
  onChange: (subject: string) => void;
}

export default function SubjectFilter({ subjects, selected, onChange }: SubjectFilterProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
    >
      <option value="all">All Subjects</option>
      {subjects.map((subject) => (
        <option key={subject.id} value={subject.id}>
          {subject.name}
        </option>
      ))}
    </select>
  );
}