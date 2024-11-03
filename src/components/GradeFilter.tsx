import React from 'react';

interface GradeFilterProps {
  grades: string[];
  selected: string;
  onChange: (grade: string) => void;
}

export default function GradeFilter({ grades, selected, onChange }: GradeFilterProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
    >
      <option value="all">All Grades</option>
      {grades.map((grade) => (
        <option key={grade} value={grade}>
          {grade}
        </option>
      ))}
    </select>
  );
}