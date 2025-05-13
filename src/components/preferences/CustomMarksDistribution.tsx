// src/components/preferences/CustomMarksDistribution.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { QuestionPreferencesType } from '@/types/questionPreferences';

interface CustomMarksDistributionProps {
  customMarks: QuestionPreferencesType['customMarks'];
  onCustomMarksChange: (type: keyof QuestionPreferencesType['customMarks'], value: number) => void;
}

const CustomMarksDistribution: React.FC<CustomMarksDistributionProps> = ({
  customMarks,
  onCustomMarksChange
}) => {
  const totalMarks = customMarks.mcq + customMarks.shortAnswer + customMarks.longAnswer + customMarks.practical;
  
  return (
    <div className="space-y-3 mt-2">
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">MCQs: {customMarks.mcq}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.mcq]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('mcq', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Short Answer: {customMarks.shortAnswer}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.shortAnswer]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('shortAnswer', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Long Answer: {customMarks.longAnswer}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.longAnswer]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('longAnswer', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Practical: {customMarks.practical}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.practical]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('practical', value)}
        />
      </div>
      
      <div className="mt-4 py-3 px-4 rounded-lg bg-gray-700/50 border border-gray-600">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">Total:</span>
          <span className={`text-xl font-bold ${totalMarks !== 100 ? 'text-red-400' : 'text-green-400'}`}>
            {totalMarks}%
          </span>
        </div>
        {totalMarks !== 100 && 
          <p className="text-red-400 text-sm mt-1">Must equal 100%</p>
        }
      </div>
    </div>
  );
};

export default CustomMarksDistribution;
