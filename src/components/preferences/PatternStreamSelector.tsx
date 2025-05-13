// src/components/preferences/PatternStreamSelector.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patterns, streams, QuestionPreferencesType } from '@/types/questionPreferences';

interface PatternStreamSelectorProps {
  preferences: QuestionPreferencesType;
  onPreferenceChange: (key: keyof QuestionPreferencesType, value: any) => void;
}

const PatternStreamSelector: React.FC<PatternStreamSelectorProps> = ({
  preferences,
  onPreferenceChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm text-gray-300">Question Pattern</Label>
        <Select 
          value={preferences.pattern}
          onValueChange={(value) => onPreferenceChange('pattern', value)}
        >
          <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
            <SelectValue placeholder="Select pattern" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {patterns.map(pattern => (
              <SelectItem key={pattern.value} value={pattern.value}>
                {pattern.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-gray-300">Subject Stream</Label>
        <Select 
          value={preferences.stream}
          onValueChange={(value) => onPreferenceChange('stream', value)}
        >
          <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
            <SelectValue placeholder="Select stream" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {streams.map(stream => (
              <SelectItem key={stream.value} value={stream.value}>
                {stream.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PatternStreamSelector;
