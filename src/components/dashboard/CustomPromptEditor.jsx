//  components/dashboard/CustomPromptEditor.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Loader2, Sparkles, Info, ListChecks } from "lucide-react"; // Updated icons
import { toast } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // For info tooltips

// Component-specific styles
const PromptEditorStyles = () => (
  <style>{`
    .prompt-card {
      background-color: hsl(var(--background)); /* Slightly different from main card bg */
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-xl);
      padding: 1.5rem; /* p-6 */
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      height: 100%; /* Ensure cards in grid take full height */
    }
    .dark .prompt-card {
       /* background-color: hsl(var(--card) / 0.7); */
    }

    .prompt-card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem; /* gap-3 */
      margin-bottom: 0.5rem; /* mb-2 */
    }
    .prompt-card-title {
      font-family: var(--font-heading);
      font-size: 1.25rem; /* text-xl */
      font-weight: 700;
      color: hsl(var(--foreground));
    }
    .prompt-card-description {
      font-size: 0.875rem; /* text-sm */
      color: hsl(var(--muted-foreground));
      margin-bottom: 1.5rem; /* mb-6 */
    }

    .prompt-textarea {
      background-color: hsl(var(--input));
      border-color: hsl(var(--border));
      color: hsl(var(--foreground));
      border-radius: var(--radius-lg);
      min-height: 250px; /* Increased min-height */
      font-family: var(--font-sans);
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }
    .prompt-textarea:focus {
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 2px hsl(var(--primary) / 0.3), 0 0 15px hsl(var(--primary) / 0.1); /* Added glow */
    }

    .quick-pref-item {
      display: flex;
      align-items: flex-start; /* Align checkbox with top of label */
      gap: 0.75rem; /* gap-3 */
      padding: 0.75rem; /* p-3 */
      border-radius: var(--radius-lg);
      transition: background-color 0.2s ease;
      cursor: pointer;
    }
    .quick-pref-item:hover {
      background-color: hsl(var(--muted) / 0.5);
    }
    .quick-pref-checkbox { /* Custom class for styling checkbox */
      /* Ensure shadcn checkbox variables are targeted if needed */
      /* For radix: */
      --checkbox-size: 20px;
      width: var(--checkbox-size);
      height: var(--checkbox-size);
      margin-top: 0.125rem; /* Align with text */
    }
    .quick-pref-checkbox[data-state="checked"] {
      background-color: hsl(var(--primary));
      border-color: hsl(var(--primary));
    }
    .quick-pref-label {
      font-size: 0.9rem; /* text-sm */
      font-weight: 500;
      color: hsl(var(--foreground));
      line-height: 1.4;
    }
    .quick-pref-description {
      font-size: 0.8rem;
      color: hsl(var(--muted-foreground));
    }
    .save-button-container {
      margin-top: auto; /* Pushes button to bottom in flex column */
      padding-top: 1.5rem; /* pt-6 */
      display: flex;
      justify-content: flex-end;
    }
  `}</style>
);

const defaultPromptPlaceholder = `As an AI assistant specializing in Bloom's Taxonomy, your primary role is to generate high-quality educational questions.

My Teaching Context:
- Subject: [e.g., Advanced Computer Networks]
- Student Level: [e.g., 3rd Year University Undergraduates, Computer Science Majors]
- Typical Class Size: [e.g., 30-40 students]
- Key Learning Objectives for this course: [e.g., Understanding OSI model, Network Security principles, Routing algorithms]

My Question Paper Preferences:
- Overall Difficulty: Aim for a mix - 30% Easy (Remember/Understand), 50% Medium (Apply/Analyze), 20% Hard (Evaluate/Create).
- Question Types: Include a variety - MCQs, short answer, problem-solving, and one or two design-based questions.
- Real-world Scenarios: Where possible, frame questions around practical, real-world examples or case studies relevant to the subject.
- Clarity and Conciseness: Ensure questions are unambiguous and clearly worded.
- Avoid: [e.g., Pure memorization questions, overly niche topics not covered in standard curriculum]

When I ask for questions on a specific topic, please refer to these general guidelines unless I provide overriding instructions for that specific request.
The final output should always be in the requested JSON format.
Focus on stimulating critical thinking and application of knowledge.`;

const quickPreferenceOptions = {
  includeObjective: { label: "Include Objective (MCQ, T/F)", description: "Ensure a mix of multiple-choice or true/false questions." },
  includeSubjective: { label: "Include Subjective (Short/Long Answer)", description: "Prioritize questions requiring written explanations." },
  includePractical: { label: "Include Practical/Problem-Solving", description: "Focus on application-based problems or scenarios." },
  balancedDifficulty: { label: "Balanced Difficulty Levels", description: "Aim for a good spread from easy to challenging." },
  focusOnConcepts: { label: "Focus on Core Concepts", description: "Prioritize fundamental understanding over niche details." },
  includeRealWorld: { label: "Link to Real-World Examples", description: "Incorporate practical scenarios where applicable." },
  encourageCriticalThinking: { label: "Encourage Critical Thinking", description: "Favor questions that require analysis and evaluation." },
  strictBloomAdherence: { label: "Strict Bloom's Taxonomy Adherence", description: "Ensure every question clearly maps to a specified Bloom's level." },
};

const defaultQuickPreferences = Object.keys(quickPreferenceOptions).reduce((acc, key) => {
  acc[key] = false; // Default all to false, or set some to true based on common needs
  return acc;
}, {});
// Example: default some to true
defaultQuickPreferences.balancedDifficulty = true;
defaultQuickPreferences.focusOnConcepts = true;


const CustomPromptEditor = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [promptText, setPromptText] = useState(''); // Initialize empty, will be filled by query
  const [quickPreferences, setQuickPreferences] = useState(defaultQuickPreferences);

  const { data: existingPrefs, isLoading: isLoadingPrefs, error: prefsError } = useQuery({
    queryKey: ['teacherCustomPrompt', userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        return await apiRequest(`/teacher/preferences/custom-prompt?clerkId=${userId}`, {}, getToken);
      } catch (error) {
        if (error.status === 404) return null;
        throw error;
      }
    },
    enabled: !!userId,
    onSuccess: (data) => {
      setPromptText(data?.promptText || defaultPromptPlaceholder);
      // Merge existing quick prefs with defaults to ensure all options are present
      setQuickPreferences(prev => ({ ...defaultQuickPreferences, ...(data?.quickPreferences || {}) }));
    },
    onError: () => {
        // On error (e.g. network), still set default placeholder for textarea
        setPromptText(defaultPromptPlaceholder);
        setQuickPreferences(defaultQuickPreferences);
    }
  });

  const savePromptMutation = useMutation({
    mutationFn: async (prefsToSave) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest('/teacher/preferences/custom-prompt', {
        method: 'POST',
        body: JSON.stringify({ clerkId: userId, ...prefsToSave }),
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherCustomPrompt', userId] });
      toast.success(data.message || "AI Prompt Preferences saved!", {
        icon: <Sparkles className="text-yellow-400" size={20}/>,
      });
      if (data.preference?.promptText) {
        localStorage.setItem('customAIPrompt_teacher_' + userId, data.preference.promptText);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save preferences.");
    }
  });

  const handleSavePrompt = () => {
    const prefsToSave = { promptText, quickPreferences };
    savePromptMutation.mutate(prefsToSave);
  };
  
  const toggleQuickPreference = (key) => {
    setQuickPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (isLoadingPrefs) {
    return <div className="flex justify-center items-center p-10"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;
  }
  if (prefsError && !existingPrefs) { // Show error if loading failed and no stale data
    return <div className="p-6 text-destructive bg-destructive/10 rounded-lg">Error: {prefsError.message}</div>;
  }
  
  return (
    <>
      <PromptEditorStyles />
      <TooltipProvider>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gradient-animated">AI Instruction Hub</h2>
              <p className="text-muted-foreground mt-1 max-w-2xl">
                Guide the AI by providing detailed instructions and selecting quick preferences. This helps generate questions perfectly tailored to your needs.
              </p>
            </div>
            <Button
              className="btn-glow-primary w-full sm:w-auto mt-4 sm:mt-0"
              onClick={handleSavePrompt}
              disabled={savePromptMutation.isPending}
            >
              {savePromptMutation.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Save All Preferences
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"> {/* items-start for variable height cards */}
            <div className="lg:col-span-2">
              <div className="prompt-card">
                <div className="prompt-card-header">
                  <Sparkles size={24} className="text-yellow-400" />
                  <h3 className="prompt-card-title">Your Custom AI Instructions</h3>
                </div>
                <p className="prompt-card-description">
                  Provide detailed instructions for the AI. The more specific you are, the better the results.
                  Consider your teaching style, student level, common pitfalls to avoid, and desired output format.
                </p>
                <Textarea 
                  value={promptText} 
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder={defaultPromptPlaceholder}
                  className="prompt-textarea flex-grow" // flex-grow to take available space
                />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="prompt-card">
                <div className="prompt-card-header">
                  <ListChecks size={24} className="text-blue-400" />
                  <h3 className="prompt-card-title">Quick Preferences</h3>
                </div>
                <p className="prompt-card-description">
                  Toggle common settings to quickly refine AI behavior. These supplement your custom instructions.
                </p>
                <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2"> {/* Scrollable for many options */}
                  {Object.entries(quickPreferenceOptions).map(([key, {label, description}]) => (
                    <div
                      key={key}
                      className="quick-pref-item"
                      onClick={() => toggleQuickPreference(key)} // Make whole item clickable
                    >
                      <Checkbox
                        id={key}
                        checked={!!quickPreferences[key]}
                        onCheckedChange={() => toggleQuickPreference(key)} // Already handled by div click, but good for accessibility
                        className="quick-pref-checkbox"
                        aria-labelledby={`${key}-label`}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={key}
                          id={`${key}-label`}
                          className="quick-pref-label"
                        >
                          {label}
                        </label>
                        <p className="quick-pref-description">{description}</p>
                      </div>
                       <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Info size={16} className="text-muted-foreground opacity-50 hover:opacity-100 shrink-0"/>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-popover text-popover-foreground border-border shadow-lg">
                          <p className="text-sm"><strong>{label}:</strong> {description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default CustomPromptEditor;