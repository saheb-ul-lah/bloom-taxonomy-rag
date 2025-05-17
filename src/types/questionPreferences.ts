// src/types/questionPreferences.ts

export const patterns = [
  { value: 'mcq-only', label: 'Multiple Choice Only' },
  { value: 'subjective-only', label: 'Subjective Only' },
  { value: 'mixed', label: 'Mixed (MCQ + Subjective)' },
  { value: 'practical-focused', label: 'Practical Focused' }
];

export const streams = [
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'biology', label: 'Biology' },
  { value: 'history', label: 'History' },
  { value: 'literature', label: 'Literature' }
];

export const predefinedMarks = [
  { value: 'standard', label: 'Standard (40% MCQ, 30% Short, 30% Long)' },
  { value: 'theory-heavy', label: 'Theory Heavy (20% MCQ, 40% Short, 40% Long)' },
  { value: 'objective-heavy', label: 'Objective Heavy (60% MCQ, 20% Short, 20% Long)' }
];

export interface QuestionPreferencesType {
  pattern: string;
  stream: string;
  marksDistribution: 'predefined' | 'custom';
  customMarks: {
    mcq: number;
    shortAnswer: number;
    longAnswer: number;
    practical: number;
  };
}