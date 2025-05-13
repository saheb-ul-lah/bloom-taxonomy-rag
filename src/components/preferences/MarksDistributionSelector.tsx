// src/components/preferences/MarksDistributionSelector.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { predefinedMarks, QuestionPreferencesType } from '@/types/questionPreferences';
import CustomMarksDistribution from './CustomMarksDistribution';

interface MarksDistributionSelectorProps {
  preferences: QuestionPreferencesType;
  onPreferenceChange: (key: keyof QuestionPreferencesType, value: any) => void;
  onCustomMarksChange: (type: keyof QuestionPreferencesType['customMarks'], value: number) => void;
}

const MarksDistributionSelector: React.FC<MarksDistributionSelectorProps> = ({
  preferences,
  onPreferenceChange,
  onCustomMarksChange
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-gray-300">Marks Distribution</Label>
      <RadioGroup 
        defaultValue="predefined"
        value={preferences.marksDistribution}
        onValueChange={(value: 'predefined' | 'custom') => onPreferenceChange('marksDistribution', value)}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="predefined" id="predefined" />
          <Label htmlFor="predefined" className="text-sm text-gray-300">Predefined Distribution</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom" className="text-sm text-gray-300">Custom Distribution</Label>
        </div>
      </RadioGroup>

      {preferences.marksDistribution === 'predefined' ? (
        <div className="space-y-2">
          <Select defaultValue="standard">
            <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
              <SelectValue placeholder="Select predefined distribution" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {predefinedMarks.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <CustomMarksDistribution 
          customMarks={preferences.customMarks}
          onCustomMarksChange={onCustomMarksChange}
        />
      )}
    </div>
  );
};

export default MarksDistributionSelector;
