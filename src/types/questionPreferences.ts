
export interface QuestionPreferencesType {
  pattern: string;
  stream: string;
  marksDistribution: 'predefined' | 'custom';
  customMarks: {
    mcq: number;
    shortAnswer: number;
    longAnswer: number;
    practical: number;
  }
}

export const streams = [
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'statistics', label: 'Statistics' },
  { value: 'physics', label: 'Physics' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'chemistry', label: 'Chemistry' },
];

export const patterns = [
  { value: 'multiple-choice', label: 'Multiple Choice Questions' },
  { value: 'short-answer', label: 'Short Answer Questions' },
  { value: 'mixed', label: 'Mixed Format' },
  { value: 'practical', label: 'Practical Exam' },
];

export const predefinedMarks = [
  { value: 'standard', label: 'Standard (40% MCQ, 30% Short, 30% Long)' },
  { value: 'mcq-heavy', label: 'MCQ Heavy (70% MCQ, 20% Short, 10% Long)' },
  { value: 'theory-heavy', label: 'Theory Heavy (20% MCQ, 30% Short, 50% Long)' },
];
