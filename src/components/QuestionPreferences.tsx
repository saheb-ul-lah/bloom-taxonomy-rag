import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Settings2, ChevronDown, SlidersHorizontal } from "lucide-react"; // Updated icons
import PatternStreamSelector from './preferences/PatternStreamSelector';
import MarksDistributionSelector from './preferences/MarksDistributionSelector';
import { QuestionPreferencesType } from '@/types/questionPreferences';

// Component-specific styles for QuestionPreferences
const QuestionPreferencesStyles = () => (
  <style>{`
    .prefs-collapsible-container {
      background-color: hsl(var(--muted) / 0.2); /* Subtle background */
      border: 1px solid hsl(var(--border) / 0.7);
      border-radius: var(--radius-xl);
      margin-bottom: 1rem; /* mb-4 */
      transition: box-shadow 0.3s ease;
    }
    .prefs-collapsible-container:hover {
      box-shadow: 0 0 15px hsl(var(--primary) / 0.1);
    }
    
    .prefs-trigger-button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.25rem; /* py-3 px-5 */
      font-family: var(--font-heading);
      font-weight: 500;
      font-size: 0.95rem;
      color: hsl(var(--muted-foreground));
      border-radius: var(--radius-xl); /* Full radius if not open */
      transition: all 0.3s ease;
    }
    .prefs-trigger-button[data-state="open"] {
      color: hsl(var(--primary));
      background-color: hsl(var(--primary) / 0.05);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .prefs-trigger-button:hover {
      color: hsl(var(--primary));
      background-color: hsl(var(--primary) / 0.05) !important; /* Override default hover */
    }
    .prefs-trigger-button .lucide {
      transition: transform 0.3s ease;
    }
    .prefs-trigger-button[data-state="open"] .lucide-chevron-down {
      transform: rotate(180deg);
    }
    .prefs-trigger-icon {
      color: hsl(var(--primary));
      margin-right: 0.5rem;
    }

    .prefs-content {
      padding: 0 1.25rem 1.25rem 1.25rem; /* px-5 pb-5 */
      border-top: 1px solid hsl(var(--border) / 0.7); /* Separator when open */
      animation: accordion-down 0.3s ease-out; /* Use Tailwind animation */
    }
    .prefs-content .prefs-section {
      margin-top: 1rem; /* space-y-4 equivalent */
    }
    .prefs-content .prefs-label {
      font-size: 0.8rem; /* text-xs */
      font-weight: 500;
      color: hsl(var(--muted-foreground));
      margin-bottom: 0.375rem; /* mb-1.5 */
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .prefs-select-trigger, .prefs-radio-group {
      background-color: hsl(var(--input)) !important;
      border-color: hsl(var(--border)) !important;
      color: hsl(var(--foreground)) !important;
      border-radius: var(--radius-lg) !important;
    }
    .prefs-select-trigger:hover, .prefs-select-trigger[data-state="open"] {
      border-color: hsl(var(--primary)) !important;
    }
    .prefs-select-content {
      background-color: hsl(var(--popover)) !important;
      border-color: hsl(var(--border)) !important;
      color: hsl(var(--foreground)) !important;
      border-radius: var(--radius-lg) !important;
    }
    .prefs-select-item[data-highlighted] {
      background-color: hsl(var(--accent) / 0.1) !important;
      color: hsl(var(--primary)) !important;
    }
    .prefs-radio-item[data-state="checked"] {
      border-color: hsl(var(--primary)) !important;
    }
    .prefs-radio-item[data-state="checked"] span { /* The inner circle */
        background-color: hsl(var(--primary)) !important;
    }
    .prefs-slider-thumb {
      background-color: hsl(var(--primary)) !important;
      border-color: hsl(var(--primary)) !important;
    }
    .prefs-slider-track {
      background-color: hsl(var(--muted)) !important;
    }
    .prefs-slider-range {
      background-color: hsl(var(--primary) / 0.7) !important;
    }
  `}</style>
);


interface QuestionPreferencesProps {
  onUpdatePreferences: (preferences: QuestionPreferencesType) => void;
}

const QuestionPreferences: React.FC<QuestionPreferencesProps> = ({ onUpdatePreferences }) => {
  const [isOpen, setIsOpen] = useState(false); // Default to closed
  const [preferences, setPreferences] = useState<QuestionPreferencesType>({
    pattern: 'mixed',
    stream: 'computer-science',
    marksDistribution: 'predefined',
    customMarks: { mcq: 30, shortAnswer: 40, longAnswer: 30, practical: 0 } // Adjusted defaults
  });

  const handlePreferenceChange = (
    key: keyof QuestionPreferencesType,
    value: QuestionPreferencesType[keyof QuestionPreferencesType]
  ) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      onUpdatePreferences(updated); // Inform parent immediately
      return updated;
    });
  };

  const handleCustomMarksChange = (type: keyof typeof preferences.customMarks, value: number) => {
    setPreferences(prev => {
      const updated = { ...prev, customMarks: { ...prev.customMarks, [type]: value } };
      onUpdatePreferences(updated);
      return updated;
    });
  };

  // Effect to call onUpdatePreferences with initial state on mount
  React.useEffect(() => {
    onUpdatePreferences(preferences);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount


  return (
    <>
      <QuestionPreferencesStyles />
      <div className="prefs-collapsible-container">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="prefs-trigger-button">
              <div className="flex items-center">
                <SlidersHorizontal size={18} className="prefs-trigger-icon" />
                AI Question Preferences
              </div>
              <ChevronDown className="lucide-chevron-down h-5 w-5" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="prefs-content">
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="prefs-section">
                <h4 className="prefs-label">Pattern & Subject</h4>
                <PatternStreamSelector preferences={preferences} onPreferenceChange={handlePreferenceChange} />
              </div>
              <div className="prefs-section">
                <h4 className="prefs-label">Marks Distribution</h4>
                <MarksDistributionSelector 
                    preferences={preferences} 
                    onPreferenceChange={handlePreferenceChange} 
                    onCustomMarksChange={handleCustomMarksChange} 
                />
              </div>
            </div>
            {/* Could add a small "Apply" or "Update" button here if onUpdatePreferences isn't immediate */}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};

export default QuestionPreferences;