// src/components/dashboard/CustomPromptEditor.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";

const promptPlaceholder = `I teach Computer Science to 2nd year undergraduates. 
When creating question papers, I prefer:
- 40% easy questions, 40% medium difficulty, and 20% challenging questions
- Mix of theoretical and practical questions
- Include at least two programming problems for each paper
- Focus on fundamental concepts rather than memorization`;

const CustomPromptEditor: React.FC = () => {
  const [promptText, setPromptText] = useState<string>(promptPlaceholder);
  const [preferences, setPreferences] = useState({
    includeObjective: true,
    includeSubjective: true,
    includePractical: true,
    balancedDifficulty: true,
    focusOnConcepts: true,
    includeRealWorld: false,
    includeDiagrams: false
  });
  
  const handleSavePrompt = () => {
    // In a real application, this would save to a backend
    console.log("Saved prompt:", promptText);
    console.log("Preferences:", preferences);
    // Show success message or toast
  };
  
  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">AI Prompt Preferences</h2>
        <p className="text-white/70">
          Customize your preferences for AI-generated question papers. This information helps the AI understand your teaching style and requirements.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card className="glass-morphism border-theme-tertiary/20 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Custom AI Prompt</CardTitle>
              <p className="text-sm text-white/70">
                Describe your question paper style, preferences, and requirements in detail
              </p>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={promptText} 
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe your question paper preferences here..."
                className="h-80 bg-theme-secondary/20 border-theme-tertiary/30 text-white"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-theme-primary hover:bg-theme-primary/80"
                onClick={handleSavePrompt}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card className="glass-morphism border-theme-tertiary/20 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Quick Preferences</CardTitle>
              <p className="text-sm text-white/70">
                Select common preferences to incorporate
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="objective" 
                  checked={preferences.includeObjective}
                  onCheckedChange={() => togglePreference('includeObjective')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="objective"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Objective Questions
                  </label>
                  <p className="text-xs text-white/50">
                    MCQs, true/false, fill in the blanks
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="subjective" 
                  checked={preferences.includeSubjective}
                  onCheckedChange={() => togglePreference('includeSubjective')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="subjective"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Subjective Questions
                  </label>
                  <p className="text-xs text-white/50">
                    Short answer, essay questions
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="practical" 
                  checked={preferences.includePractical}
                  onCheckedChange={() => togglePreference('includePractical')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="practical"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Practical Problems
                  </label>
                  <p className="text-xs text-white/50">
                    Implementation, coding challenges
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="balanced" 
                  checked={preferences.balancedDifficulty}
                  onCheckedChange={() => togglePreference('balancedDifficulty')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="balanced"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Balanced Difficulty Level
                  </label>
                  <p className="text-xs text-white/50">
                    Mix of easy, medium, and challenging
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="concepts" 
                  checked={preferences.focusOnConcepts}
                  onCheckedChange={() => togglePreference('focusOnConcepts')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="concepts"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Focus on Concepts
                  </label>
                  <p className="text-xs text-white/50">
                    Testing understanding over memorization
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="realworld" 
                  checked={preferences.includeRealWorld}
                  onCheckedChange={() => togglePreference('includeRealWorld')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="realworld"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Real-World Applications
                  </label>
                  <p className="text-xs text-white/50">
                    Scenario-based questions with practical applications
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="diagrams" 
                  checked={preferences.includeDiagrams}
                  onCheckedChange={() => togglePreference('includeDiagrams')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="diagrams"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Diagrams/Visual Elements
                  </label>
                  <p className="text-xs text-white/50">
                    Questions requiring diagrams or visual interpretation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomPromptEditor;