// src/components/QuestionPreferences.jsx
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
  PlusCircle,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // For UDL suggestions
import { Slider } from "@/components/ui/slider";     // For DOK rigor or Bloom's distribution
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // For UDL principles or similar choices
import { Badge } from "@/components/ui/badge"; // For displaying tags or levels

// --- Detailed Preference UI Components ---

const BloomsPreferencesUI = ({ settings, onChange }) => {
  const bloomLevels = ["remember", "understand", "apply", "analyze", "evaluate", "create"];
  const questionTypes = ["mcq", "short_answer", "essay", "problem_solving"];

  const handleLevelToggle = (level) => {
    const newLevels = (settings.targetLevels || []).includes(level)
      ? (settings.targetLevels || []).filter(l => l !== level)
      : [...(settings.targetLevels || []), level];
    onChange({ ...settings, targetLevels: newLevels });
  };

  const handleTypeToggle = (type) => {
    const newTypes = { ...(settings.questionTypes || {}), [type]: !settings.questionTypes?.[type] };
    onChange({ ...settings, questionTypes: newTypes });
  };

  return (
    <div className="space-y-4 p-3 border border-dashed border-blue-400/50 rounded-md bg-blue-500/5">
      <h5 className="prefs-subtitle">Bloom's Architect Settings</h5>
      
      <div>
        <Label className="prefs-label-inline">Target Bloom's Levels:</Label>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {bloomLevels.map((level) => (
            <Button
              key={level}
              variant={(settings.targetLevels || []).includes(level) ? "default" : "outline"}
              size="sm"
              onClick={() => handleLevelToggle(level)}
              className={`capitalize text-xs h-7 px-2.5 border-blue-500/50 ${(settings.targetLevels || []).includes(level) ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-500/10'}`}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="numQuestionsBloom" className="prefs-label-inline">Number of Questions:</Label>
        <Input
          type="number" id="numQuestionsBloom" min="1" max="20"
          value={settings.numQuestions === undefined ? 3 : settings.numQuestions}
          onChange={(e) => onChange({ ...settings, numQuestions: parseInt(e.target.value, 10) || 1 })}
          className="prefs-input mt-1" placeholder="e.g., 5"
        />
      </div>

      <div>
        <Label className="prefs-label-inline">Preferred Question Types:</Label>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1.5">
          {questionTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`bloom-qtype-${type}`}
                checked={!!settings.questionTypes?.[type]}
                onCheckedChange={() => handleTypeToggle(type)}
                className="accent-blue-500"
              />
              <Label htmlFor={`bloom-qtype-${type}`} className="text-sm font-normal text-foreground capitalize cursor-pointer">
                {type.replace('_', ' ')}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {settings.difficultyDistribution && ( // Example for more advanced settings
        <div>
          <Label className="prefs-label-inline">Difficulty Distribution (Optional %):</Label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            <Input type="number" placeholder="Easy" value={settings.difficultyDistribution.easy || ''} onChange={e => onChange({...settings, difficultyDistribution: {...settings.difficultyDistribution, easy: parseInt(e.target.value)}})} className="prefs-input" />
            <Input type="number" placeholder="Medium" value={settings.difficultyDistribution.medium || ''} onChange={e => onChange({...settings, difficultyDistribution: {...settings.difficultyDistribution, medium: parseInt(e.target.value)}})} className="prefs-input" />
            <Input type="number" placeholder="Hard" value={settings.difficultyDistribution.hard || ''} onChange={e => onChange({...settings, difficultyDistribution: {...settings.difficultyDistribution, hard: parseInt(e.target.value)}})} className="prefs-input" />
          </div>
        </div>
      )}
    </div>
  );
};

const DOKPreferencesUI = ({ settings, onChange }) => {
  return (
    <div className="space-y-4 p-3 border border-dashed border-green-400/50 rounded-md bg-green-500/5">
      <h5 className="prefs-subtitle">DOK Navigator Settings</h5>
      <div>
        <Label htmlFor="targetDOK" className="prefs-label-inline">Target DOK Level (1-4):</Label>
        <Slider
          id="targetDOK"
          min={1} max={4} step={1}
          value={[settings.targetDOK === undefined ? 2 : settings.targetDOK]}
          onValueChange={([val]) => onChange({ ...settings, targetDOK: val })}
          className="mt-2 [&>span:first-child]:h-1.5 [&>span:first-child_span]:bg-green-500"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>DOK 1</span><span>DOK 2</span><span>DOK 3</span><span>DOK 4</span>
        </div>
      </div>
       <div>
        <Label htmlFor="dokNumItems" className="prefs-label-inline">Number of Items/Activities:</Label>
        <Input
          type="number" id="dokNumItems" min="1" max="10"
          value={settings.numItems === undefined ? 3 : settings.numItems}
          onChange={(e) => onChange({ ...settings, numItems: parseInt(e.target.value, 10) || 1 })}
          className="prefs-input mt-1" placeholder="e.g., 3"
        />
      </div>
      <div>
        <Label className="prefs-label-inline">Cognitive Rigor Focus:</Label>
        <RadioGroup
            value={settings.rigorFocus || "balanced"}
            onValueChange={(value) => onChange({ ...settings, rigorFocus: value })}
            className="mt-1.5 flex gap-4"
        >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="skill_recall" id="dok-skill" className="border-green-500 text-green-500"/>
                <Label htmlFor="dok-skill" className="text-sm font-normal text-foreground">Skill/Recall</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="strategic_thinking" id="dok-strategic" className="border-green-500 text-green-500"/>
                <Label htmlFor="dok-strategic" className="text-sm font-normal text-foreground">Strategic Thinking</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="extended_thinking" id="dok-extended" className="border-green-500 text-green-500"/>
                <Label htmlFor="dok-extended" className="text-sm font-normal text-foreground">Extended Thinking</Label>
            </div>
        </RadioGroup>
      </div>
    </div>
  );
};

const UDLPreferencesUI = ({ settings, onChange }) => {
  const udlPrinciples = ["representation", "action_expression", "engagement"];
  
  const handlePrincipleToggle = (principle) => {
    const currentActive = settings.activePrinciples || [];
    const newActive = currentActive.includes(principle)
        ? currentActive.filter(p => p !== principle)
        : [...currentActive, principle];
    onChange({ ...settings, activePrinciples: newActive });
  };

  return (
    <div className="space-y-4 p-3 border border-dashed border-purple-400/50 rounded-md bg-purple-500/5">
      <h5 className="prefs-subtitle">UDL Enhancer Settings</h5>
      <div>
        <Label className="prefs-label-inline">Focus UDL Principles:</Label>
         <div className="flex flex-wrap gap-2 mt-1.5">
          {udlPrinciples.map((principle) => (
            <Button
              key={principle}
              variant={(settings.activePrinciples || []).includes(principle) ? "default" : "outline"}
              size="sm"
              onClick={() => handlePrincipleToggle(principle)}
              className={`capitalize text-xs h-7 px-2.5 border-purple-500/50 ${(settings.activePrinciples || []).includes(principle) ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'text-purple-600 hover:bg-purple-500/10'}`}
            >
              {principle.replace('_', ' & ')}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="udlSuggestionsCount" className="prefs-label-inline">Number of UDL Suggestions per Checkpoint:</Label>
        <Input
          type="number" id="udlSuggestionsCount" min="1" max="5"
          value={settings.suggestionsCount === undefined ? 2 : settings.suggestionsCount}
          onChange={(e) => onChange({ ...settings, suggestionsCount: parseInt(e.target.value, 10) || 1 })}
          className="prefs-input mt-1" placeholder="e.g., 2"
        />
      </div>
       <div>
        <Label htmlFor="udlContext" className="prefs-label-inline">Specific Context for UDL Analysis (Optional):</Label>
        <Textarea
            id="udlContext"
            value={settings.analysisContext || ""}
            onChange={(e) => onChange({ ...settings, analysisContext: e.target.value })}
            className="prefs-input mt-1 h-20 bg-background"
            placeholder="e.g., 'For a lecture on photosynthesis to 9th graders', 'A lab activity on titration'"
        />
      </div>
    </div>
  );
};

const ConstructivistPreferencesUI = ({ settings, onChange }) => {
  const inquiryTypes = ["5e_model", "problem_based_learning", "project_based_learning", "discovery_learning"];
  return (
    <div className="space-y-4 p-3 border border-dashed border-orange-400/50 rounded-md bg-orange-500/5">
      <h5 className="prefs-subtitle">Constructivist Spark Settings</h5>
      <div>
        <Label htmlFor="inquiryType" className="prefs-label-inline">Preferred Inquiry Model:</Label>
        <Select value={settings.inquiryModel || inquiryTypes[0]} onValueChange={(value) => onChange({...settings, inquiryModel: value})}>
            <SelectTrigger className="prefs-input mt-1 capitalize">
                <SelectValue placeholder="Select inquiry model..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-popover-foreground">
                {inquiryTypes.map(type => (
                    <SelectItem key={type} value={type} className="capitalize focus:bg-orange-500/10">{type.replace(/_/g, ' ')}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="prefs-label-inline">Scaffolding Level:</Label>
        <RadioGroup
            value={settings.scaffoldingLevel || "medium"}
            onValueChange={(value) => onChange({ ...settings, scaffoldingLevel: value })}
            className="mt-1.5 flex gap-x-4 gap-y-1 flex-wrap"
        >
            {["minimal", "medium", "high"].map(level => (
                 <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level} id={`construct-${level}`} className="border-orange-500 text-orange-500"/>
                    <Label htmlFor={`construct-${level}`} className="text-sm font-normal text-foreground capitalize">{level}</Label>
                </div>
            ))}
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="constructivistKeywords" className="prefs-label-inline">Keywords for Sparking Ideas (comma-separated):</Label>
        <Input
            id="constructivistKeywords"
            value={settings.keywords?.join(', ') || ""}
            onChange={(e) => onChange({ ...settings, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
            className="prefs-input mt-1"
            placeholder="e.g., collaboration, real-world, student-led"
        />
      </div>
    </div>
  );
};

const CombineConquerPreferencesUI = ({ settings, onChange }) => {
  // Example: Primary and Secondary Frameworks selection
  const allFrameworks = pedagogicalFrameworksConfig.filter(f => f.id !== 'combine_conquer'); // Exclude self

  return (
    <div className="space-y-4 p-3 border border-dashed border-gray-400/50 rounded-md bg-gray-500/5">
      <h5 className="prefs-subtitle">Combine & Conquer Settings</h5>
      <div>
        <Label htmlFor="primaryFramework" className="prefs-label-inline">Primary Framework:</Label>
        <Select value={settings.primaryFrameworkId || ''} onValueChange={(value) => onChange({...settings, primaryFrameworkId: value})}>
            <SelectTrigger className="prefs-input mt-1">
                <SelectValue placeholder="Select primary framework..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-popover-foreground">
                {allFrameworks.map(fw => (
                    <SelectItem key={fw.id} value={fw.id} className="focus:bg-gray-500/10">{fw.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="secondaryFramework" className="prefs-label-inline">Secondary Framework (Optional):</Label>
         <Select value={settings.secondaryFrameworkId || ''} onValueChange={(value) => onChange({...settings, secondaryFrameworkId: value})}>
            <SelectTrigger className="prefs-input mt-1">
                <SelectValue placeholder="Select secondary framework..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-popover-foreground">
                <SelectItem value="" className="focus:bg-gray-500/10">None</SelectItem>
                {allFrameworks
                    .filter(fw => fw.id !== settings.primaryFrameworkId) // Don't allow same as primary
                    .map(fw => (
                    <SelectItem key={fw.id} value={fw.id} className="focus:bg-gray-500/10">{fw.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="integrationNotes" className="prefs-label-inline">Integration Notes/Strategy:</Label>
        <Textarea
            id="integrationNotes"
            value={settings.integrationNotes || ""}
            onChange={(e) => onChange({ ...settings, integrationNotes: e.target.value })}
            className="prefs-input mt-1 h-20 bg-background"
            placeholder="e.g., 'Use Bloom's for question levels, DOK for activity depth.'"
        />
      </div>
    </div>
  );
};

// --- Main QuestionPreferences Component ---

const pedagogicalFrameworksConfig = [
    { id: 'blooms_architect', label: "Bloom's Architect" },
    { id: 'dok_navigator', label: "DOK Navigator" },
    { id: 'udl_enhancer', label: "UDL Enhancer" },
    { id: 'constructivist_spark', label: "Constructivist Spark" },
    { id: 'combine_conquer', label: "Combine & Conquer" },
];

const QuestionPreferences = ({
  activeFrameworkId,
  currentAiTask,
  onSetAiTask,
  initialPreferences,
  onUpdatePreferences,
  allAiTasksConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFrameworkTaskPrefs, setCurrentFrameworkTaskPrefs] = useState({});

  const getDefaultForTaskAndFramework = useCallback(() => {
    if (activeFrameworkId === "blooms_architect") {
        if (currentAiTask === "generate_questions") return { targetLevels: ["apply"], numQuestions: 5, questionTypes: { mcq: true, short_answer: true } };
        if (currentAiTask === "analyze_blooms_coverage") return { analysisScope: "provided_text", detailLevel: "summary" };
    }
    if (activeFrameworkId === "dok_navigator") {
        if (currentAiTask === "generate_questions" || currentAiTask === "suggest_activities") return { targetDOK: 2, numItems: 3, rigorFocus: "strategic_thinking" };
        if (currentAiTask === "analyze_dok_level") return { analysisDepth: "checkpoint_level" };
    }
    if (activeFrameworkId === "udl_enhancer") {
        if (currentAiTask.startsWith("check_udl_")) return { activePrinciples: [currentAiTask.split('_')[2] || "representation"], suggestionsCount: 2, analysisContext: "" };
    }
    if (activeFrameworkId === "constructivist_spark") {
        if (currentAiTask === "suggest_activities") return { inquiryModel: "5e_model", scaffoldingLevel: "medium", keywords: [] };
    }
    if (activeFrameworkId === "combine_conquer") {
        return { primaryFrameworkId: "", secondaryFrameworkId: "", integrationNotes: "" };
    }
    // Common tasks defaults if not framework specific
    if (currentAiTask === "refine_objectives") return { objectiveCount: 3, format: "smart" };
    if (currentAiTask === "summarize_content") return { summaryLength: "medium", keyPoints: 3 };
    
    return { genericSetting: "default_value" };
  }, [activeFrameworkId, currentAiTask]);

  useEffect(() => {
    const frameworkPrefsFromGlobal = initialPreferences?.[activeFrameworkId] || {};
    const taskSpecificPrefs = frameworkPrefsFromGlobal[currentAiTask] || getDefaultForTaskAndFramework();
    setCurrentFrameworkTaskPrefs(taskSpecificPrefs);
  }, [activeFrameworkId, currentAiTask, initialPreferences, getDefaultForTaskAndFramework]);

  const handleLocalPreferenceChange = (newSpecificPrefsForTask) => {
    setCurrentFrameworkTaskPrefs(newSpecificPrefsForTask);
    onUpdatePreferences(prevGlobalPrefs => ({
      ...prevGlobalPrefs,
      [activeFrameworkId]: {
        ...(prevGlobalPrefs[activeFrameworkId] || {}),
        [currentAiTask]: newSpecificPrefsForTask,
      },
    }));
  };
  
  const renderActiveFrameworkPreferencesUI = () => {
    // Common tasks can have generic UIs or specialized ones if needed.
    // Here, we prioritize framework-specific UI if it exists, then task-specific, then generic.
    if (activeFrameworkId === "blooms_architect") return <BloomsPreferencesUI settings={currentFrameworkTaskPrefs} onChange={handleLocalPreferenceChange} />;
    if (activeFrameworkId === "dok_navigator") return <DOKPreferencesUI settings={currentFrameworkTaskPrefs} onChange={handleLocalPreferenceChange} />;
    if (activeFrameworkId === "udl_enhancer") return <UDLPreferencesUI settings={currentFrameworkTaskPrefs} onChange={handleLocalPreferenceChange} />;
    if (activeFrameworkId === "constructivist_spark") return <ConstructivistPreferencesUI settings={currentFrameworkTaskPrefs} onChange={handleLocalPreferenceChange} />;
    if (activeFrameworkId === "combine_conquer") return <CombineConquerPreferencesUI settings={currentFrameworkTaskPrefs} onChange={handleLocalPreferenceChange} />;
    
    // Fallback for common tasks or if no specific UI is defined for the framework
    switch (currentAiTask) {
        case 'generate_questions': // Generic question generation prefs
            return <BloomsPreferencesUI settings={currentFrameworkTaskPrefs} onChange={handleLocalPreferenceChange} />; // Example: reuse Bloom's as generic
        case 'suggest_activities': // Generic activity suggestion prefs
             return <DOKPreferencesUI settings={currentFrameworkTaskPrefs} onChange={handleLocalPreferenceChange} />; // Example: reuse DOK's
        // Add more generic UIs for other common tasks like 'refine_objectives', 'summarize_content'
        default:
            return (
            <div className="text-xs text-muted-foreground p-3 text-center bg-muted/20 rounded-md">
                <p className="font-semibold">General AI Settings</p>
                <p>This task uses general AI capabilities. Specific preferences for this combination will be added soon.</p>
                {Object.keys(currentFrameworkTaskPrefs).length > 0 && (
                    <pre className="mt-2 text-left text-xs bg-background p-2 rounded overflow-auto max-h-24">
                        {JSON.stringify(currentFrameworkTaskPrefs, null, 2)}
                    </pre>
                )}
            </div>
            );
    }
  };

  const currentFrameworkDetails = pedagogicalFrameworksConfig.find(f => f.id === activeFrameworkId) || { label: "Framework" };
  
  const availableTasksForCurrentFramework = [
    ...(allAiTasksConfig?.common || []),
    ...(allAiTasksConfig?.[activeFrameworkId] || []),
  ].filter((task, index, self) => 
    index === self.findIndex((t) => t.id === task.id)
  );

  const currentTaskDetails = availableTasksForCurrentFramework.find(t => t.id === currentAiTask) || { label: "Task" };

  return (
    <div className="prefs-collapsible-container border border-border rounded-lg bg-card/50 my-3 shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="prefs-trigger-button w-full flex justify-between items-center p-3 hover:bg-muted/30 focus:bg-muted/30">
            <div className="flex items-center gap-2 truncate text-left">
              <SlidersHorizontal size={16} className="prefs-trigger-icon shrink-0 text-primary" />
              <span className="truncate text-sm font-medium text-foreground">
                AI Settings for:{" "}
                <span className="font-semibold text-primary">{currentTaskDetails.label}</span>
                <span className="text-muted-foreground/80 mx-1.5 text-xs">using</span>
                <span className="font-semibold text-primary">{currentFrameworkDetails.label}</span>
              </span>
            </div>
            <ChevronDown
              className={`lucide-chevron-down h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="prefs-content p-3 md:p-4 border-t border-border bg-background/30">
          <div className="space-y-4">
             <div>
              <Label className="prefs-main-label">Selected AI Task</Label>
              <Select value={currentAiTask} onValueChange={onSetAiTask}>
                <SelectTrigger className="w-full prefs-select-trigger">
                  <SelectValue placeholder="Select AI Task..." />
                </SelectTrigger>
                <SelectContent className="prefs-select-content">
                  {availableTasksForCurrentFramework.length > 0 ? (
                    availableTasksForCurrentFramework.map((task) => (
                      <SelectItem
                        key={task.id} value={task.id}
                        className="prefs-select-item"
                      >
                        <div className="flex items-center gap-2">
                          {task.icon && React.createElement(task.icon, { size: 16, className: "opacity-70" })}
                          {task.label}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground text-center">No tasks for this framework.</div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="prefs-section mt-3">
              <Label className="prefs-main-label">
                {currentFrameworkDetails.label} Settings for "{currentTaskDetails.label}"
              </Label>
              {renderActiveFrameworkPreferencesUI()}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <style>{`
        .prefs-main-label { display: block; font-size: 0.8rem; font-weight: 600; color: hsl(var(--muted-foreground)); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        .prefs-subtitle { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.75rem; }
        .prefs-label-inline { display: block; font-size: 0.8rem; font-weight: 500; color: hsl(var(--muted-foreground)); margin-bottom: 0.25rem; }
        .prefs-input { width: 100%; background-color: hsl(var(--input)); border: 1px solid hsl(var(--border)); color: hsl(var(--foreground)); padding: 0.5rem 0.75rem; border-radius: var(--radius-md); font-size:0.875rem; }
        .prefs-input:focus { border-color: hsl(var(--primary)); box-shadow: 0 0 0 1.5px hsl(var(--primary) / 0.7); outline: none; }
        .prefs-select-trigger { font-size:0.875rem; background-color: hsl(var(--input)); border: 1px solid hsl(var(--border)); color: hsl(var(--foreground)); }
        .prefs-select-content { z-index: 50; background-color: hsl(var(--popover)); border: 1px solid hsl(var(--border)); color: hsl(var(--popover-foreground));}
        .prefs-select-item { font-size:0.875rem; cursor:pointer; }
        .prefs-select-item:focus { background-color: hsl(var(--accent) / 0.7); }
      `}</style>
    </div>
  );
};

export default QuestionPreferences;