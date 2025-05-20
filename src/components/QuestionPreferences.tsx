// src/components/QuestionPreferences.tsx
// (Will be written as JS-compatible React for this response, rename to .jsx if preferred)
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SlidersHorizontal,
  ChevronDown,
  BarChart3,
  Layers,
  Users,
  Lightbulb,
  Puzzle,
  MessageSquare,
  Activity,
  Target,
  BookCopy,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // For AI Task selection within preferences

// --- Import or define placeholder sub-preference components ---
// These would be actual components with specific UI controls (sliders, checkboxes, inputs)

const BloomsPreferencesUI = ({ settings, onChange }) => {
  // Example: settings = { targetLevels: ['apply'], numQuestions: 3, types: { mcq: true } }
  const handleLevelChange = (level, checked) => {
    const newLevels = checked
      ? [...(settings.targetLevels || []), level]
      : (settings.targetLevels || []).filter((l) => l !== level);
    onChange({ ...settings, targetLevels: newLevels });
  };
  return (
    <div className="space-y-3 p-3 border border-dashed border-blue-400 rounded-md bg-blue-500/5">
      <h5 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
        Bloom's Architect Settings
      </h5>
      <div>
        <label className="text-xs text-muted-foreground">
          Target Bloom's Levels:
        </label>
        {[
          "Remember",
          "Understand",
          "Apply",
          "Analyze",
          "Evaluate",
          "Create",
        ].map((level) => (
          <div key={level} className="flex items-center gap-2 mt-1">
            <Checkbox
              id={`bloom-${level}`}
              checked={(settings.targetLevels || []).includes(
                level.toLowerCase()
              )}
              onCheckedChange={(checked) =>
                handleLevelChange(level.toLowerCase(), checked)
              }
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <label
              htmlFor={`bloom-${level}`}
              className="text-sm text-foreground cursor-pointer"
            >
              {level}
            </label>
          </div>
        ))}
      </div>
      <div>
        <label
          htmlFor="numQuestionsBloom"
          className="text-xs text-muted-foreground"
        >
          Number of Questions:
        </label>
        <Input
          type="number"
          id="numQuestionsBloom"
          min="1"
          max="10"
          value={settings.numQuestions || 3}
          onChange={(e) =>
            onChange({ ...settings, numQuestions: parseInt(e.target.value) })
          }
          className="prefs-input mt-1" // General class for inputs in prefs
          placeholder="Enter number of questions"
        />
      </div>
      {/* Add more Bloom's specific controls: question types, marks, etc. */}
      <p className="text-xs text-muted-foreground italic">
        Further Bloom's controls for MCQs, Short Ans, difficulty distribution
        etc. would go here.
      </p>
    </div>
  );
};

const DOKPreferencesUI = ({ settings, onChange }) => {
  // Example: settings = { targetDOK: 2, rigor: "medium" }
  return (
    <div className="space-y-3 p-3 border border-dashed border-green-400 rounded-md bg-green-500/5">
      <h5 className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
        DOK Navigator Settings
      </h5>
      <div>
        <label htmlFor="targetDOK" className="text-xs text-muted-foreground">
          Target DOK Level (1-4):
        </label>
        <Input
          type="number"
          id="targetDOK"
          min="1"
          max="4"
          value={settings.targetDOK || 2}
          onChange={(e) =>
            onChange({ ...settings, targetDOK: parseInt(e.target.value) })
          }
          className="prefs-input mt-1"
          placeholder="Enter DOK level"
        />
      </div>
      {/* Add more DOK specific controls */}
      <p className="text-xs text-muted-foreground italic">
        Controls for task complexity, evidence requirements etc. for DOK.
      </p>
    </div>
  );
};

const UDLPreferencesUI = ({ settings, onChange }) => {
  // Example: settings = { representationOptions: ['visual', 'auditory'], engagementStrategies: ['choice'] }
  return (
    <div className="space-y-3 p-3 border border-dashed border-purple-400 rounded-md bg-purple-500/5">
      <h5 className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
        UDL Enhancer Settings
      </h5>
      <p className="text-xs text-muted-foreground italic">
        Checkboxes for UDL principles (Representation, Action & Expression,
        Engagement), specific checkpoint toggles, etc.
      </p>
    </div>
  );
};

const ConstructivistPreferencesUI = ({ settings, onChange }) => {
  return (
    <div className="space-y-3 p-3 border border-dashed border-orange-400 rounded-md bg-orange-500/5">
      <h5 className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
        Constructivist Spark Settings
      </h5>
      <p className="text-xs text-muted-foreground italic">
        Preferences for inquiry type (5E, PBL), scaffolding levels,
        collaboration prompts, etc.
      </p>
    </div>
  );
};

const CombineConquerPreferencesUI = ({
  settings,
  onChange,
  activeFrameworks,
}) => {
  // This would be more complex, potentially showing sections for each selected primary/secondary framework
  // For now, a placeholder.
  return (
    <div className="space-y-3 p-3 border border-dashed border-gray-400 rounded-md bg-gray-500/5">
      <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
        Combine & Conquer Settings
      </h5>
      <p className="text-xs text-muted-foreground italic">
        Settings for integrating multiple frameworks. Active frameworks:{" "}
        {activeFrameworks?.join(", ")}
      </p>
    </div>
  );
};

// --- Main QuestionPreferences Component ---
// Helper to get default task for a framework
const getDefaultTaskForFramework = (frameworkId, allTasks) => {
  const frameworkTasks = allTasks[frameworkId] || [];
  const commonTasks = allTasks.common || [];
  // Prioritize framework-specific tasks if any, else common, else first common
  if (frameworkTasks.length > 0) return frameworkTasks[0].id;
  if (commonTasks.length > 0) return commonTasks[0].id;
  return "generate_questions"; // Fallback
};

const QuestionPreferences = ({
  activeFrameworkId, // e.g., 'blooms_architect'
  currentAiTask, // e.g., 'generate_questions' (controlled by parent ChatPage)
  onSetAiTask, // function to update currentAiTask in parent
  initialPreferences, // Object: { blooms_architect: {...}, dok_navigator: {...} }
  onUpdatePreferences, // function to update the full preferences object in parent
  allAiTasksConfig, // The full aiTasks constant from ChatPage
}) => {
  const [isOpen, setIsOpen] = useState(false); // Keep collapsible state local

  // Local state for the *specific settings of the currently active framework and task*
  // This will be derived from initialPreferences or defaults
  const [currentFrameworkTaskPrefs, setCurrentFrameworkTaskPrefs] = useState(
    {}
  );

  // Memoized function to get default preferences for the current framework & task
  const getDefaultPrefs = useCallback(() => {
    // This function needs to be more sophisticated.
    // It should return the default structure expected by the specific UI for the framework/task.
    // For example:
    if (
      activeFrameworkId === "blooms_architect" &&
      currentAiTask === "generate_questions"
    ) {
      return {
        targetLevels: ["apply"],
        numQuestions: 3,
        types: { mcq: true, short: false },
      };
    }
    if (
      activeFrameworkId === "dok_navigator" &&
      currentAiTask === "suggest_activities"
    ) {
      return { targetDOK: 2, activityType: "group_project" };
    }
    // ... and so on for all combinations
    return {}; // Generic fallback
  }, [activeFrameworkId, currentAiTask]);

  // Initialize or update local preferences when props change
  useEffect(() => {
    // Get the slice of preferences for the current active framework from the global `initialPreferences`
    const frameworkSpecificGlobalPrefs =
      initialPreferences?.[activeFrameworkId] || {};
    // Then, get the slice for the current task within that framework, or use defaults
    const taskSpecificPrefs =
      frameworkSpecificGlobalPrefs[currentAiTask] || getDefaultPrefs();
    setCurrentFrameworkTaskPrefs(taskSpecificPrefs);
  }, [activeFrameworkId, currentAiTask, initialPreferences, getDefaultPrefs]);

  const handleLocalPreferenceChange = (newSpecificPrefs) => {
    setCurrentFrameworkTaskPrefs(newSpecificPrefs);
    // Update the global preferences object in ChatPage
    onUpdatePreferences((prevGlobalPrefs) => ({
      ...prevGlobalPrefs,
      [activeFrameworkId]: {
        ...(prevGlobalPrefs[activeFrameworkId] || {}),
        [currentAiTask]: newSpecificPrefs, // Store prefs nested under framework AND task
      },
    }));
  };

  const renderActiveFrameworkPreferencesUI = () => {
    // Pass currentFrameworkTaskPrefs and handleLocalPreferenceChange to sub-components
    switch (activeFrameworkId) {
      case "blooms_architect":
        return (
          <BloomsPreferencesUI
            settings={currentFrameworkTaskPrefs}
            onChange={handleLocalPreferenceChange}
          />
        );
      case "dok_navigator":
        return (
          <DOKPreferencesUI
            settings={currentFrameworkTaskPrefs}
            onChange={handleLocalPreferenceChange}
          />
        );
      case "udl_enhancer":
        return (
          <UDLPreferencesUI
            settings={currentFrameworkTaskPrefs}
            onChange={handleLocalPreferenceChange}
          />
        );
      case "constructivist_spark":
        return (
          <ConstructivistPreferencesUI
            settings={currentFrameworkTaskPrefs}
            onChange={handleLocalPreferenceChange}
          />
        );
      case "combine_conquer":
        return (
          <CombineConquerPreferencesUI
            settings={currentFrameworkTaskPrefs}
            onChange={handleLocalPreferenceChange}
            activeFrameworks={["blooms_architect", "dok_navigator"]}
          />
        ); // Example
      default:
        return (
          <p className="text-xs text-muted-foreground p-3 text-center">
            No specific preferences defined for this framework/task combination
            yet. Using general AI settings.
          </p>
        );
    }
  };

  // Define pedagogicalFrameworks if not imported from elsewhere
  const pedagogicalFrameworks = [
    { id: "blooms_architect", label: "Bloom's Architect" },
    { id: "dok_navigator", label: "DOK Navigator" },
    { id: "udl_enhancer", label: "UDL Enhancer" },
    { id: "constructivist_spark", label: "Constructivist Spark" },
    { id: "combine_conquer", label: "Combine & Conquer" },
  ];
  const currentFrameworkDetails = pedagogicalFrameworks.find(
    (f) => f.id === activeFrameworkId
  ) || { id: "", label: "" };
  const currentTaskDetails =
    allAiTasksConfig?.common?.find((t) => t.id === currentAiTask) ||
    (allAiTasksConfig?.[activeFrameworkId] || []).find(
      (t) => t.id === currentAiTask
    ) ||
    {};

  const availableTasksForCurrentFramework = [
    ...(allAiTasksConfig?.common || []),
    ...(allAiTasksConfig?.[activeFrameworkId] || []),
  ];

  return (
    <>
      {/* Assuming QuestionPreferencesStyles is imported or defined in ChatPageStyles */}
      {/* If not, copy the .prefs-* styles from previous response here */}
      <div className="prefs-collapsible-container">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="prefs-trigger-button">
              <div className="flex items-center gap-2 truncate">
                <SlidersHorizontal
                  size={16}
                  className="prefs-trigger-icon shrink-0"
                />
                <span className="truncate">
                  AI Settings for:{" "}
                  <span className="font-semibold text-primary">
                    {currentTaskDetails.label || "Task"}
                  </span>
                  <span className="text-muted-foreground/80 mx-1">using</span>
                  <span className="font-semibold text-primary">
                    {currentFrameworkDetails.label || "Framework"}
                  </span>
                </span>
              </div>
              <ChevronDown
                className={`lucide-chevron-down h-5 w-5 shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="prefs-content">
            <div className="space-y-4">
              {/* AI Task Selector (moved from ChatPage header for better context) */}
              <div>
                <label className="prefs-label">Current AI Task</label>
                <Select value={currentAiTask} onValueChange={onSetAiTask}>
                  <SelectTrigger className="w-full prefs-select-trigger">
                    <SelectValue placeholder="Select AI Task..." />
                  </SelectTrigger>
                  <SelectContent className="prefs-select-content">
                    {availableTasksForCurrentFramework.length > 0 ? (
                      availableTasksForCurrentFramework.map((task) => (
                        <SelectItem
                          key={task.id}
                          value={task.id}
                          className="prefs-select-item"
                        >
                          <div className="flex items-center gap-2">
                            {task.icon &&
                              React.createElement(task.icon, {
                                size: 16,
                                className: "opacity-70",
                              })}
                            {task.label}
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        No tasks for this framework
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic Preferences UI based on Framework & Task */}
              <div className="prefs-section">
                <h4 className="prefs-label">
                  {currentFrameworkDetails.label || "Framework"} Specific
                  Settings for "{currentTaskDetails.label || "Selected Task"}"
                </h4>
                {renderActiveFrameworkPreferencesUI()}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};

// --- Helper components (Checkbox, Input) should be imported from '@/components/ui' ---
// For this example, if not available, here are ultra-basic stubs:
const Checkbox = ({ id, checked, onCheckedChange, className }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className={className}
  />
);
const Input = ({
  type,
  id,
  min,
  max,
  value,
  onChange,
  className,
  placeholder,
}) => (
  <input
    type={type}
    id={id}
    min={min}
    max={max}
    value={value}
    onChange={onChange}
    className={className}
    placeholder={placeholder}
  />
);
// Ensure you have proper Shadcn UI Checkbox and Input components setup in your project.

export default QuestionPreferences;
