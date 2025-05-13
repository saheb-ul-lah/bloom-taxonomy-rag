// src/components/QuestionPreferences.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import PatternStreamSelector from './preferences/PatternStreamSelector';
import MarksDistributionSelector from './preferences/MarksDistributionSelector';
import { QuestionPreferencesType } from '@/types/questionPreferences';
interface QuestionPreferencesProps {
  onUpdatePreferences: (preferences: QuestionPreferencesType) => void;
}
const QuestionPreferences: React.FC<QuestionPreferencesProps> = ({
  onUpdatePreferences
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<QuestionPreferencesType>({
    pattern: 'mixed',
    stream: 'computer-science',
    marksDistribution: 'predefined',
    customMarks: {
      mcq: 40,
      shortAnswer: 30,
      longAnswer: 20,
      practical: 10
    }
  });
  const handlePreferenceChange = (key: keyof QuestionPreferencesType, value: any) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        [key]: value
      };
      onUpdatePreferences(updated);
      return updated;
    });
  };
  const handleCustomMarksChange = (type: keyof typeof preferences.customMarks, value: number) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        customMarks: {
          ...prev.customMarks,
          [type]: value
        }
      };
      onUpdatePreferences(updated);
      return updated;
    });
  };
  return <div className="w-full bg-gray-800 border border-gray-700 rounded-md mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex justify-between items-center py-2 text-gray-300 hover:text-white rounded-xl">
            Question Preferences
            <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 space-y-4">
          <PatternStreamSelector preferences={preferences} onPreferenceChange={handlePreferenceChange} />
          
          <MarksDistributionSelector preferences={preferences} onPreferenceChange={handlePreferenceChange} onCustomMarksChange={handleCustomMarksChange} />
        </CollapsibleContent>
      </Collapsible>
    </div>;
};
export default QuestionPreferences;