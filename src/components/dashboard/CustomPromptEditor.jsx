// src/components/dashboard/CustomPromptEditor.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const defaultPromptPlaceholder = `I teach Computer Science to 2nd year undergraduates. 
When creating question papers, I prefer:
- 40% easy questions, 40% medium difficulty, and 20% challenging questions
- Mix of theoretical and practical questions
- Include at least two programming problems for each paper
- Focus on fundamental concepts rather than memorization`;

const defaultQuickPreferences = {
  includeObjective: true,
  includeSubjective: true,
  includePractical: true,
  balancedDifficulty: true,
  focusOnConcepts: true,
  includeRealWorld: false,
  includeDiagrams: false
};

const CustomPromptEditor = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [promptText, setPromptText] = useState(defaultPromptPlaceholder);
  const [quickPreferences, setQuickPreferences] = useState(defaultQuickPreferences);

  const { data: existingPrefs, isLoading: isLoadingPrefs, error: prefsError } = useQuery({
    queryKey: ['teacherCustomPrompt', userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        // This endpoint was added in backend/server.js
        return await apiRequest(`/teacher/preferences/custom-prompt?clerkId=${userId}`, {}, getToken);
      } catch (error) {
        if (error.status === 404) {
          console.log("No custom prompt preferences found for user, using defaults.");
          return null; 
        }
        console.error("Error fetching custom prompt preferences:", error);
        throw error; // Re-throw other errors to be caught by react-query
      }
    },
    enabled: !!userId,
    onSuccess: (data) => {
      if (data) {
        setPromptText(data.promptText || defaultPromptPlaceholder);
        setQuickPreferences(data.quickPreferences || defaultQuickPreferences);
      } else {
        // If no data (404), ensure defaults are set
        setPromptText(defaultPromptPlaceholder);
        setQuickPreferences(defaultQuickPreferences);
      }
    },
    // Consider staleTime or cacheTime if these preferences don't change often
  });

  const savePromptMutation = useMutation({
    mutationFn: async (prefsToSave) => {
      if (!userId) throw new Error("User not authenticated");
      // This endpoint was added in backend/server.js
      return apiRequest('/teacher/preferences/custom-prompt', {
        method: 'POST',
        body: JSON.stringify({ clerkId: userId, ...prefsToSave }),
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherCustomPrompt', userId] });
      toast.success(data.message || "AI Prompt Preferences saved!");
      // For ChatPage.jsx to pick up the latest prompt without needing a global state manager immediately
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
    return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin text-theme-primary" /> <span className="ml-2">Loading preferences...</span></div>;
  }
  if (prefsError) {
    return <div className="text-red-500 p-4 bg-red-900/20 rounded-md">Error loading preferences: {prefsError.message}</div>;
  }
  
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
          <Card className="glass-morphism border-theme-tertiary/20 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Custom AI Prompt</CardTitle>
              <p className="text-sm text-white/70">
                Describe your question paper style, preferences, and requirements in detail. This will be used by the AI.
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <Textarea 
                value={promptText} 
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe your question paper preferences here..."
                className="h-full min-h-[200px] bg-theme-secondary/20 border-theme-tertiary/30 text-white" // Ensure textarea can grow
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-theme-primary hover:bg-theme-primary/80"
                onClick={handleSavePrompt}
                disabled={savePromptMutation.isPending}
              >
                {savePromptMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
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
                Select common preferences to incorporate. These can supplement your custom prompt.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.keys(quickPreferences).map(key => (
                <div className="flex items-start space-x-3" key={key}> {/* Increased space */}
                  <Checkbox 
                    id={key}
                    checked={!!quickPreferences[key]} // Ensure boolean for controlled component
                    onCheckedChange={() => toggleQuickPreference(key)}
                    className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary mt-1" // Adjusted margin
                  />
                  <div className="grid gap-0.5 leading-none"> {/* Reduced gap */}
                    <label
                      htmlFor={key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      {key.replace(/([A-Z_])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    {/* You can add descriptions for quick preferences here if needed */}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomPromptEditor;

