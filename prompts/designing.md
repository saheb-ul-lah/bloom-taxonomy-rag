now except for landing page , the other components have now lost their ui design, the color schemes is now lost i csee white bg and whitetext fo i cant see the texts. 

let me share the css file 

this is index.css


@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;

    --sidebar-background: 0 0% 98%;

    --sidebar-foreground: 240 5.3% 26.1%;

    --sidebar-primary: 240 5.9% 10%;

    --sidebar-primary-foreground: 0 0% 98%;

    --sidebar-accent: 240 4.8% 95.9%;

    --sidebar-accent-foreground: 240 5.9% 10%;

    --sidebar-border: 220 13% 91%;

    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 240 10% 7%; /* Darker background */
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .glass-morphism {
    @apply bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl;
  }
  
  .animated-gradient {
    background: linear-gradient(270deg, #C70039, #511849, #900C3F);
    background-size: 600% 600%;
    animation: gradientShift 15s ease infinite;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  .hover-scale {
    @apply transition-all duration-300 hover:scale-105;
  }

  .hover-lift {
    @apply transition-all duration-300 hover:-translate-y-1;
  }
}


thhis is app.css

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}


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




// src/components/dashboard/QuestionPapers.jsx
import React, { useState, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { FilePlus, Trash2, Download, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Default empty state for the form
const initialNewPaperState = {
  subject: '',
  year: new Date().getFullYear().toString(),
  examType: '', // e.g., Mid Term, Final
  classLevel: '', // e.g., 2nd Year Undergraduate
  board: '', // e.g., Dibrugarh University
  institution: '', // e.g., UG
  department: '', // e.g., BCA
  courseCode: '', // e.g., CS201
  // Add other relevant fields for QuestionPaper type UploadedFile
};


const QuestionPapers = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaperData, setNewPaperData] = useState(initialNewPaperState);
  const [selectedFile, setSelectedFile] = useState(null);

  // --- Fetch Uploaded Question Papers ---
  const { data: papers, isLoading: isLoadingPapers, error: papersError } = useQuery({
    queryKey: ['teacherUploadedPapers', userId],
    queryFn: async () => {
      if (!userId) return [];
      // This endpoint needs to be created on the backend.
      // It should fetch from UploadedFile, perhaps filtered by a 'type' field or specific metadata.
      // For now, let's assume a generic /teacher/uploaded-files endpoint.
      const rawPapers = await apiRequest(`/teacher/uploaded-files?clerkId=${userId}&type=question_paper`, {}, getToken);
      return rawPapers.map(p => ({
        ...p,
        id: p.id,
        filename: p.fileName,
        uploadDate: new Date(p.createdAt).toLocaleDateString(),
        // Map other fields if names differ or need formatting
        subject: p.subject || 'N/A',
        year: p.year || new Date(p.createdAt).getFullYear().toString(), // Fallback for year
        examType: p.examType || 'N/A', // You might need to add examType to UploadedFile schema
        totalMarks: p.totalMarks || 0, // You might need to add totalMarks to UploadedFile schema
      }));
    },
    enabled: !!userId,
  });

  // --- Upload Question Paper Mutation ---
  const uploadPaperMutation = useMutation({
    mutationFn: async ({ file, metadata }) => {
      if (!userId) throw new Error("User not authenticated");
      if (!file) throw new Error("No file selected for upload");

      const formData = new FormData();
      formData.append('file', file);
      formData.append('clerkId', userId);
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== null && value !== undefined) { // Only append if value is present
          formData.append(key, value);
        }
      });
      // Add a type or category to distinguish this as a question paper
      formData.append('category', 'question_paper');


      return apiRequest('/teacher/upload-material', { // Uses the generic upload endpoint
        method: 'POST',
        body: formData,
        isFormData: true,
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherUploadedPapers', userId] });
      toast.success(data.message || "Question paper uploaded successfully. Processing...");
      setShowAddForm(false);
      setNewPaperData(initialNewPaperState);
      setSelectedFile(null);
      if(fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload question paper.");
    }
  });

  // --- Delete Question Paper Mutation ---
  const deletePaperMutation = useMutation({
    mutationFn: async (fileId) => {
      if (!userId) throw new Error("User not authenticated");
      // This endpoint needs to be created on the backend for deleting UploadedFile records
      // and potentially their Qdrant vectors.
      return apiRequest(`/teacher/uploaded-files/${fileId}`, {
        method: 'DELETE',
        body: JSON.stringify({ clerkId: userId }), // For backend authorization
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherUploadedPapers', userId] });
      toast.success("Question paper deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete question paper.");
    }
  });

  const handleAddPaperSubmit = () => {
    if (selectedFile && newPaperData.subject && newPaperData.classLevel && newPaperData.board) {
      uploadPaperMutation.mutate({ file: selectedFile, metadata: newPaperData });
    } else {
      toast.error("Please select a file and fill in all required fields (Subject, Class Level, Board/University).");
    }
  };
  
  const handleDeletePaper = (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this question paper? This action cannot be undone.")) {
        deletePaperMutation.mutate(id);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaperData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoadingPapers) return <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin text-theme-primary" /> <span className="ml-2">Loading question papers...</span></div>;
  if (papersError) return <div className="text-red-500 p-4 bg-red-900/20 rounded-md">Error loading papers: {papersError.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Uploaded Question Papers</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Upload Paper
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/20 animate-fade-in">
          <CardHeader><CardTitle className="text-lg">Upload New Question Paper</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="subject" className="text-sm text-white/70">Subject*</label>
                <Input id="subject" name="subject" value={newPaperData.subject} onChange={handleInputChange} placeholder="e.g. Mathematics" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              <div>
                <label htmlFor="year" className="text-sm text-white/70">Year</label>
                <Input id="year" name="year" value={newPaperData.year} onChange={handleInputChange} type="number" placeholder={new Date().getFullYear().toString()} className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              <div>
                <label htmlFor="examType" className="text-sm text-white/70">Exam Type</label>
                <Input id="examType" name="examType" value={newPaperData.examType} onChange={handleInputChange} placeholder="e.g. Mid Term, Final" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              <div>
                <label htmlFor="classLevel" className="text-sm text-white/70">Class Level*</label>
                <Input id="classLevel" name="classLevel" value={newPaperData.classLevel} onChange={handleInputChange} placeholder="e.g., 10th Grade, BSc Sem II" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              <div>
                <label htmlFor="board" className="text-sm text-white/70">Board/University*</label>
                <Input id="board" name="board" value={newPaperData.board} onChange={handleInputChange} placeholder="e.g., CBSE, Dibrugarh University" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              {/* Add institution, department, courseCode if relevant for filtering */}
            </div>
            <div>
              <label htmlFor="fileUpload" className="text-sm text-white/70">Upload File*</label>
              <Input 
                id="fileUpload"
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="bg-theme-secondary/20 border-theme-tertiary/30 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-theme-primary/20 file:text-theme-primary hover:file:bg-theme-primary/30"
                accept=".pdf,.doc,.docx,.txt"
              />
               {selectedFile && <p className="text-xs text-white/60 mt-1">Selected: {selectedFile.name}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => { setShowAddForm(false); setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; }} className="border-white/20 text-white">Cancel</Button>
            <Button onClick={handleAddPaperSubmit} className="bg-theme-primary hover:bg-theme-primary/80" disabled={!selectedFile || uploadPaperMutation.isPending}>
              {uploadPaperMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
              Upload Paper
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <Card className="glass-morphism border-theme-tertiary/20">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-theme-secondary/30">
              <TableRow className="border-b-theme-tertiary/30">
                <TableHead className="text-white">Filename</TableHead>
                <TableHead className="text-white">Subject</TableHead>
                <TableHead className="text-white">Class</TableHead>
                <TableHead className="text-white">Year</TableHead>
                <TableHead className="text-white">Uploaded</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(papers || []).map((paper) => (
                <TableRow key={paper.id} className="border-b-theme-tertiary/20 hover:bg-theme-secondary/10">
                  <TableCell className="font-medium">{paper.filename}</TableCell>
                  <TableCell>{paper.subject}</TableCell>
                  <TableCell>{paper.classLevel || 'N/A'}</TableCell>
                  <TableCell>{paper.year}</TableCell>
                  <TableCell>{paper.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-theme-tertiary/20" title="Download (placeholder)" onClick={() => toast.info("Download functionality not yet implemented.")}>
                        <Download size={16} />
                      </Button>
                      <Button 
                        variant="ghost" size="icon" 
                        onClick={() => handleDeletePaper(paper.id)}
                        disabled={deletePaperMutation.isPending && deletePaperMutation.variables === paper.id}
                        className="h-8 w-8 text-white/50 hover:text-red-500 hover:bg-red-700/20"
                        title="Delete Paper"
                      >
                        {deletePaperMutation.isPending && deletePaperMutation.variables === paper.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 size={16} />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {papers && papers.length === 0 && !isLoadingPapers && (
            <p className="text-center text-white/70 py-8">No question papers uploaded yet.</p>
        )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPapers;




// src/components/dashboard/SubjectNotes.jsx
import React, { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from '@/lib/api';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Trash2, FileText, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const SubjectNotes = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newNoteData, setNewNoteData] = useState({
    subject: '',
    title: '',
    content: '',
    classLevel: '',
    chapter: '',
    board: '',
    language: 'en',
    institution: '',
    department: '',
    courseCode: '',
  });

  const { data: notes, isLoading: isLoadingNotes, error: notesError } = useQuery({
    queryKey: ['teacherNotes', userId],
    queryFn: async () => {
      if (!userId) return [];
      const rawNotes = await apiRequest(`/teacher/notes?clerkId=${userId}`, {}, getToken);
      return rawNotes.map(n => ({ ...n, date: new Date(n.createdAt).toLocaleDateString() }));
    },
    enabled: !!userId,
  });

  const addNoteMutation = useMutation({
    mutationFn: async (noteData) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest('/teacher/notes', {
        method: 'POST',
        body: JSON.stringify({ ...noteData, clerkId: userId }),
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherNotes', userId] });
      toast.success("Note added successfully!");
      setShowAddForm(false);
      setNewNoteData({ subject: '', title: '', content: '', classLevel: '', chapter: '', board: '', language: 'en', institution: '', department: '', courseCode: '' });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add note.");
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest(`/teacher/notes/${noteId}`, {
        method: 'DELETE',
        body: JSON.stringify({ clerkId: userId }), // Pass clerkId for backend authorization
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherNotes', userId] });
      toast.success("Note deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete note.");
    }
  });

  const handleAddNoteSubmit = () => {
    const { title, subject, classLevel, chapter, board } = newNoteData;
    if (title && subject && classLevel && chapter && board) {
      addNoteMutation.mutate(newNoteData);
    } else {
      toast.error("Please fill in all required fields: Title, Subject, Class Level, Chapter, and Board/University.");
    }
  };

  const handleDeleteNote = (id) => {
    deleteNoteMutation.mutate(id);
  };

  if (isLoadingNotes) return <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin text-theme-primary" /> <span className="ml-2">Loading notes...</span></div>;
  if (notesError) return <div className="text-red-500 p-4 bg-red-900/20 rounded-md">Error loading notes: {notesError.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Subject Notes</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Add New Note
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/20 animate-fade-in">
          <CardHeader><CardTitle className="text-lg">Add New Note</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Title*</label>
                <Input value={newNoteData.title} onChange={(e) => setNewNoteData({...newNoteData, title: e.target.value})} placeholder="e.g. Calculus Fundamentals" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              <div>
                <label className="text-sm text-white/70">Subject*</label>
                <Input value={newNoteData.subject} onChange={(e) => setNewNoteData({...newNoteData, subject: e.target.value})} placeholder="e.g. Mathematics" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              <div>
                <label className="text-sm text-white/70">Class Level*</label>
                <Input value={newNoteData.classLevel} onChange={(e) => setNewNoteData({...newNoteData, classLevel: e.target.value})} placeholder="e.g. 2nd Year Undergraduate" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Chapter*</label>
                <Input value={newNoteData.chapter} onChange={(e) => setNewNoteData({...newNoteData, chapter: e.target.value})} placeholder="e.g. Chapter 3" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Board/University*</label>
                <Input value={newNoteData.board} onChange={(e) => setNewNoteData({...newNoteData, board: e.target.value})} placeholder="e.g. Dibrugarh University" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Language</label>
                <Input value={newNoteData.language} onChange={(e) => setNewNoteData({...newNoteData, language: e.target.value})} placeholder="e.g. en" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               {/* Optional fields */}
               <div>
                <label className="text-sm text-white/70">Institution (Optional)</label>
                <Input value={newNoteData.institution} onChange={(e) => setNewNoteData({...newNoteData, institution: e.target.value})} placeholder="e.g. UG" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Department (Optional)</label>
                <Input value={newNoteData.department} onChange={(e) => setNewNoteData({...newNoteData, department: e.target.value})} placeholder="e.g. BCA" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Course Code (Optional)</label>
                <Input value={newNoteData.courseCode} onChange={(e) => setNewNoteData({...newNoteData, courseCode: e.target.value})} placeholder="e.g. CS101" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Content (Optional)</label>
              <Textarea value={newNoteData.content} onChange={(e) => setNewNoteData({...newNoteData, content: e.target.value})} placeholder="Enter your note content here..." className="h-32 bg-theme-secondary/20 border-theme-tertiary/30" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)} className="border-white/20 text-white">Cancel</Button>
            <Button onClick={handleAddNoteSubmit} className="bg-theme-primary hover:bg-theme-primary/80" disabled={addNoteMutation.isPending}>
              {addNoteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Note
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(notes || []).map((note) => (
          <Card key={note.id} className="glass-morphism border-theme-tertiary/20 hover:border-theme-tertiary/40 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex-1 overflow-hidden pr-2"> {/* Added for title ellipsis */}
                  <p className="text-xs text-theme-tertiary/70 truncate">{note.subject} - {note.classLevel}</p>
                  <CardTitle className="text-lg truncate" title={note.title}>{note.title}</CardTitle>
                </div>
                <Button
                  variant="ghost" size="icon"
                  onClick={() => handleDeleteNote(note.id)}
                  disabled={deleteNoteMutation.isPending && deleteNoteMutation.variables === note.id}
                  className="h-8 w-8 text-white/50 hover:text-white hover:bg-theme-tertiary/20 shrink-0"
                >
                  {(deleteNoteMutation.isPending && deleteNoteMutation.variables === note.id) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 line-clamp-4">{note.content || "This note might be file-based or have no text content."}</p>
            </CardContent>
            <CardFooter className="pt-2 border-t border-white/10 flex justify-between">
              <p className="text-xs text-white/50">{note.date}</p>
              <div className="flex items-center text-xs text-white/50">
                <FileText size={12} className="mr-1" /> Note
              </div>
            </CardFooter>
          </Card>
        ))}
         {notes && notes.length === 0 && !isLoadingNotes && (
            <p className="col-span-full text-center text-white/70 py-8">No notes found. Add your first note to get started!</p>
        )}
      </div>
    </div>
  );
};

export default SubjectNotes;






// src/components/dashboard/TeachersInfo.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCircle, Edit2, Save, Loader2 } from "lucide-react";
import { toast } from '@/components/ui/sonner';

// MODIFICATION: Add these imports
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; 

const initialTeacherInfo = {
  name: "",
  department: "",
  institution: "",
  email: "",
};

const TeacherInfo = () => {
  const { userId, getToken, user: clerkUser } = useAuth();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(initialTeacherInfo);

  const { data: teacherInfo, isLoading: isLoadingInfo, error: infoError } = useQuery({
    queryKey: ['teacherProfile', userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        return await apiRequest(`/teacher/profile?clerkId=${userId}`, {}, getToken);
      } catch (error) {
        if (error.status === 404) {
          console.log("No teacher profile found, using Clerk data as default.");
          return null; 
        }
        console.error("Error fetching teacher profile:", error);
        throw error;
      }
    },
    enabled: !!userId,
    onSuccess: (data) => {
      if (data) {
        setEditForm({
          name: data.name || clerkUser?.fullName || '',
          department: data.department || '',
          institution: data.institution || '',
          email: data.email || clerkUser?.primaryEmailAddress?.emailAddress || '',
        });
      } else if (clerkUser) {
        setEditForm({
          name: clerkUser.fullName || '',
          department: '',
          institution: '',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
        });
      }
    }
  });

  const saveProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest('/teacher/profile', {
        method: 'POST',
        body: JSON.stringify({ clerkId: userId, ...profileData }),
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherProfile', userId] });
      toast.success(data.message || "Profile updated successfully!");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile.");
    }
  });

  const handleSave = () => {
    saveProfileMutation.mutate(editForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!teacherInfo && clerkUser && !isEditing) {
        setEditForm({
            name: clerkUser.fullName || '',
            email: clerkUser.primaryEmailAddress?.emailAddress || '',
            department: '',
            institution: '',
        });
    }
  }, [clerkUser, teacherInfo, isEditing]);

  const displayInfo = isEditing ? editForm : (teacherInfo || editForm); 

  if (isLoadingInfo && !clerkUser) { 
    return <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20 p-6 flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin text-theme-primary" /> <span className="ml-2">Loading teacher info...</span></Card>;
  }

  // Show error only if not editing and no clerkUser data to fall back on as a base
  if (infoError && !isEditing && !clerkUser) { 
    return <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20 p-6 text-red-500">Error loading teacher info: {infoError.message}</Card>;
  }

  return (
    <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-white">Teacher Information</CardTitle>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              // When starting to edit, populate editForm with the most current displayInfo
              setEditForm(displayInfo); 
              setIsEditing(true);
            }
          }}
          disabled={isEditing && saveProfileMutation.isPending}
          className="h-8 w-8 text-white/70 hover:text-white"
        >
          {isEditing ? (saveProfileMutation.isPending ? <Loader2 size={18} className="animate-spin"/> : <Save size={18} />) : <Edit2 size={18} />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex justify-center items-center md:justify-start">
            {/* THIS IS WHERE Avatar IS USED - AROUND LINE 141 or so */}
            <Avatar className="w-24 h-24 text-3xl border-2 border-theme-tertiary/50"> 
              <AvatarImage src={clerkUser?.imageUrl || displayInfo.imageUrl} alt={displayInfo.name || 'User'} /> {/* Added displayInfo.imageUrl as fallback if you store it */}
              <AvatarFallback className="bg-theme-secondary/50">
                {displayInfo.name ? displayInfo.name.split(' ').map(n => n[0]).join('').toUpperCase() : <UserCircle size={40}/>}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm text-white/70">Name</label>
                  <Input id="name" name="name" value={editForm.name} onChange={handleInputChange} className="bg-theme-secondary/20 border-theme-tertiary/30" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-white/70">Email</label>
                  <Input id="email" name="email" type="email" value={editForm.email} onChange={handleInputChange} className="bg-theme-secondary/20 border-theme-tertiary/30" />
                </div>
                <div>
                  <label htmlFor="department" className="text-sm text-white/70">Department</label>
                  <Input id="department" name="department" value={editForm.department} onChange={handleInputChange} placeholder="e.g., Computer Science" className="bg-theme-secondary/20 border-theme-tertiary/30" />
                </div>
                <div>
                  <label htmlFor="institution" className="text-sm text-white/70">Institution</label>
                  <Input id="institution" name="institution" value={editForm.institution} onChange={handleInputChange} placeholder="e.g., Dibrugarh University" className="bg-theme-secondary/20 border-theme-tertiary/30" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-sm text-white/70">Name</p>
                  <p className="font-semibold text-white text-lg">{displayInfo.name || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-semibold text-white">{displayInfo.email || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Department</p>
                  <p className="font-semibold text-white">{displayInfo.department || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Institution</p>
                  <p className="font-semibold text-white">{displayInfo.institution || 'Not Set'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherInfo;




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



// src/components/ChatHistory.jsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, History, PlusCircle } from "lucide-react";

const ChatHistory = ({ 
  histories, 
  activeHistoryId, 
  onSelectHistory,
  onNewChat
}) => {
  return (
    <div className="h-full w-full bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <History size={20} />
          Chat History
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onNewChat}
          className="text-white/70 hover:text-white hover:bg-theme-tertiary/20"
          title="New Chat"
        >
          <PlusCircle size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {histories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No previous chats found.</p>
            <Button 
              onClick={onNewChat}
              className="mt-2 bg-theme-primary hover:bg-theme-primary/80 text-white"
              size="sm"
            >
              Start New Chat
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {histories.map((history) => (
              <button
                key={history.id}
                onClick={() => onSelectHistory(history.id)}
                className={`w-full text-left p-3 rounded-md transition-all duration-300 hover:bg-theme-tertiary/20 group flex items-start gap-3 animate-fade-in hover-lift ${
                  activeHistoryId === history.id ? 'bg-theme-tertiary/30 border border-theme-tertiary/50' : 'bg-gray-800/50'
                }`}
              >
                <FileText size={18} className="text-gray-400 group-hover:text-theme-primary transition-colors mt-1 shrink-0" />
                <div className="overflow-hidden"> {/* Added for text ellipsis */}
                  <h3 className="font-medium text-white group-hover:text-theme-primary transition-colors text-sm truncate">
                    {history.title}
                  </h3>
                  <p className="text-xs text-gray-500">{history.date}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;



// src/components/ChatInput.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
interface ChatInputProps {
  onSendMessage: (text: string) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSending(true);

      // Simulate sending delay for animation
      setTimeout(() => {
        onSendMessage(message);
        setMessage('');
        setIsSending(false);
      }, 300);
    }
  };
  return <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
      <input type="text" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} disabled={isSending} className="flex-1 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-theme-primary bg-gray-800 text-white transition-all duration-300 text-base rounded-xl" />
      <Button type="submit" disabled={!message.trim() || isSending} className={`bg-theme-primary hover:bg-theme-tertiary transition-all duration-300 ${message.trim() && !isSending ? 'animate-pulse-scale' : ''} rounded-md px-4`}>
        <Send className={`h-5 w-5 ${isSending ? 'animate-pulse opacity-50' : ''}`} />
        <span className="sr-only">Send</span>
      </Button>
    </form>;
};
export default ChatInput;


// src/components/ChatMessages.jsx
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bot, User, DownloadCloud, ExternalLink } from "lucide-react"; // Added ExternalLink

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(new Date(date));
  };

  const renderAIResponse = (responseData) => {
    if (typeof responseData === 'string') {
      // Basic Markdown-like link detection: [text](url)
      const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(responseData)) !== null) {
        if (match.index > lastIndex) {
          parts.push(responseData.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline inline-flex items-center"
          >
            {match[1]} <ExternalLink size={12} className="ml-1" />
          </a>
        );
        lastIndex = linkRegex.lastIndex;
      }
      if (lastIndex < responseData.length) {
        parts.push(responseData.substring(lastIndex));
      }

      return <p className="whitespace-pre-wrap">{parts.length > 0 ? parts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : responseData}</p>;
    }

    if (Array.isArray(responseData)) {
      return (
        <div className="space-y-3 mt-2">
          {responseData.map((q, index) => (
            <div key={index} className="p-3 rounded-md bg-black/20 border border-gray-600/50">
              <p className="font-semibold text-sm">Question {index + 1}: <span className="font-normal">{q.question}</span></p>
              <p className="text-xs text-gray-300 mt-1">Bloom's Level: <span className="font-medium text-yellow-400">{q.bloomLevel}</span></p>
              <p className="text-xs text-gray-400 mt-0.5">Justification: <span className="italic">{q.justification}</span></p>
            </div>
          ))}
        </div>
      );
    }
    return <p className="whitespace-pre-wrap">Received complex data. Display not fully implemented for this structure.</p>;
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className={`flex items-start gap-3 ${message.user === 'me' ? 'flex-row-reverse' : ''} animate-fade-in`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <Avatar className={`h-9 w-9 ring-1 shrink-0 ${
            message.user === 'me' ? 'ring-theme-primary' : 'ring-theme-tertiary'
          }`}>
            <AvatarImage src={undefined} /> {/* No default images */}
            <AvatarFallback className={
              message.user === 'me' ? 'bg-theme-primary text-white' : 'bg-theme-tertiary text-white'
            }>
              {message.user === 'me' ? <User size={18} /> : <Bot size={18} />}
            </AvatarFallback>
          </Avatar>

          <div className={`space-y-1 max-w-[85%] md:max-w-[75%]`}>
            <div 
              className={`px-4 py-3 rounded-xl shadow-md break-words ${
                message.user === 'me' 
                  ? 'bg-theme-primary text-white rounded-tr-none' 
                  : (message.user === 'system' ? 'bg-gray-600 text-gray-200 rounded-tl-none text-center w-full max-w-full text-sm' : 'bg-gray-700 text-white rounded-tl-none') 
              }`}
            >
              {message.isGenerating ? (
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-0"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200"></div>
                  <span>{typeof message.text === 'string' ? message.text : "Processing..."}</span>
                </div>
              ) : message.user === 'assistant' ? (
                renderAIResponse(message.text)
              ) : (
                <p className="whitespace-pre-wrap">{message.text}</p>
              )}
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map(attachment => (
                    <div key={attachment.id} className="flex items-center gap-2 p-2 rounded bg-black/20 border border-gray-600/50">
                       <div className="h-8 w-8 bg-gray-600 rounded flex items-center justify-center text-xs text-white shrink-0">
                        {attachment.type?.split('/')[1]?.substring(0,3).toUpperCase() || 'FILE'}
                      </div>
                      <div className="flex-1 truncate text-sm text-gray-300">
                        {attachment.name}
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-theme-primary" asChild>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer"><DownloadCloud size={16}/></a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
               {message.user === 'assistant' && message.usedSources && message.usedSources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-600/50">
                  <p className="text-xs text-gray-400">Sources:</p>
                  <ul className="list-disc list-inside pl-2 text-xs text-gray-500">
                    {message.usedSources.map((source, i) => <li key={i} className="truncate">{source}</li>)}
                  </ul>
                </div>
              )}
            </div>
            
            {message.timestamp && !message.isGenerating && (
                <div className={`text-xs text-gray-500 ${message.user === 'me' ? 'text-right pr-1' : 'text-left pl-1'}`}>
                {formatTime(message.timestamp)}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;



// src/components/Footer.tsx
"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin, Mail, ArrowUp, FileText } from "lucide-react"

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-black/80 backdrop-blur-md border-t border-white/10 text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#511849]/20 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#C70039]/20 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-6 py-12">
        {/* Top section with logo and back to top */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#511849] to-[#C70039] flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">QuestionPaperAI</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ArrowUp className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-white/70 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-white/70 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-white/70 hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-white/70 hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-white/70 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white/70 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-white/70 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#900C3F] text-white"
              />
              <button className="bg-gradient-to-r from-[#900C3F] to-[#C70039] px-4 py-2 rounded-r-lg text-white hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-white/10 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#511849]/30 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Multiple Choice Questions</h4>
              <p className="text-white/60 text-sm">Create objective questions with perfect distribution</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#900C3F]/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Custom Subject Streams</h4>
              <p className="text-white/60 text-sm">Generate questions for any subject</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C70039]/30 flex items-center justify-center flex-shrink-0">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Smart Marks Distribution</h4>
              <p className="text-white/60 text-sm">Set your preferred marks distribution</p>
            </div>
          </div>
        </div> */}

        {/* Bottom section with social links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} QuestionPaperAI. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 mt-6 text-sm text-white/50">
          <Link to="/terms" className="hover:text-white/80 transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-white/80 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/cookies" className="hover:text-white/80 transition-colors">
            Cookie Policy
          </Link>
          <Link to="/accessibility" className="hover:text-white/80 transition-colors">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer


// src/components/hero.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, Search } from "lucide-react"
import { FlipWords } from "@/components/ui/flip-words";


export default function HeroSection() {
    const words = ["better", "perfect", "fast", "modern"];
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Gradient Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#511849] via-[#900C3F] to-[#C70039] z-0"

                aria-hidden="true"
            />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-10 md:py-24 lg:py-24">
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-10 lg:p-16 min-w-7xl mx-auto">
                    {/* Hero Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Generate   <FlipWords words={words} /> <br />
                            <span className="text-yellow-300">Question Papers</span> With Ease
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl mb-8">
                            Access a comprehensive library of question papers from various examinations, universities, and educational
                            boards. Study smarter, not harder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-[#C70039] hover:bg-[#900C3F] text-white rounded-xl" >
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" className="bg-[#23010C] hover:bg-white hover:text-black text-white rounded-xl" >
                                Learn More 
                            </Button>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <FeatureCard
                            icon={<Search className="h-8 w-8" />}
                            title="Smart Search"
                            description="Find exactly what you need with our intelligent search system that understands academic context."
                        />
                        <FeatureCard
                            icon={<FileText className="h-8 w-8" />}
                            title="Vast Collection"
                            description="Access thousands of question papers from various universities, boards, and competitive exams."
                        />
                        <FeatureCard
                            icon={<BookOpen className="h-8 w-8" />}
                            title="Study Resources"
                            description="Get complementary study materials and resources to help you prepare effectively."
                        />
                    </div>

                    {/* Call to Action */}
                    {/* <div className="mt-16 text-center">
                        <Link
                            className="inline-flex items-center text-yellow-300 hover:text-yellow-200 text-lg font-medium"
                            to="/question-papers"
                        >
                            Browse All Question Papers <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div> */}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#511849]/30 blur-3xl" aria-hidden="true"></div>
            <div
                className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#C70039]/30 blur-3xl"
                aria-hidden="true"
            ></div>
        </section>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-white mb-4">{icon}</div>
            <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
            <p className="text-white/70">{description}</p>
        </div>
    )
}


// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { useAuth } from '@clerk/clerk-react'; // MODIFIED: Import useAuth
import UserDropdown from '@/components/UserDropdown'; // MODIFIED: Import UserDropdown

const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth(); // MODIFIED: Get authentication status

  return (
    <header className="py-4 px-6 glass-morphism backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent animate-fade-in cursor-pointer" 
            onClick={() => navigate('/')}
          >
            QuestionGenius
          </h1>
          <span className="text-xs text-white/80">Dibrugarh University</span>
        </div>
        
        <div className="hidden md:block ml-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10">Features</NavigationMenuTrigger>
                <NavigationMenuContent className="glass-morphism">
                  {/* ... (content unchanged) ... */}
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-secondary/50 to-theme-tertiary/50 p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            QuestionGenius AI
                          </div>
                          <p className="text-sm leading-tight text-white/70">
                            Our AI-powered platform generates perfect question papers tailored to your needs
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Multiple Choice</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Generate objective questions with perfect distribution
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Custom Subjects</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Questions for any subject from Physics to Computer Science
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Smart Distribution</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Set your preferred marks distribution across question types
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} href="#">
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              {isSignedIn && ( // MODIFIED: Only show Dashboard if signed in
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} 
                    onClick={() => navigate('/dashboard')}
                    style={{ cursor: 'pointer' }}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isSignedIn ? ( // MODIFIED: Show UserDropdown if signed in
          <UserDropdown />
        ) : (
          <>
            <Button 
              variant="outline" 
              className="hidden md:flex text-white border-white hover:bg-white/20 animate-fade-in transition-all duration-300" 
              onClick={() => navigate('/sign-in')} // MODIFIED: Navigate to /sign-in
            >
              Login
            </Button>
            <Button 
              className="hidden md:flex bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:bg-yellow-400 animate-fade-in transition-all duration-300" 
              onClick={() => navigate('/sign-up')} // MODIFIED: Navigate to /sign-up
            >
              Get Started
            </Button>
          </>
        )}
        
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
          <Menu /> {/* TODO: Implement mobile menu toggle and links */}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;



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


// src/components/UserDropdown.jsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from '@clerk/clerk-react'; // MODIFIED: Import useClerk and useUser
import { useNavigate } from 'react-router-dom'; // MODIFIED: For navigation

const UserDropdown = () => {
  const { signOut } = useClerk(); // MODIFIED: Get signOut function
  const { user } = useUser(); // MODIFIED: Get user information
  const navigate = useNavigate(); // MODIFIED

  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Redirect to home page after sign out
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} /> {/* MODIFIED: Use Clerk user data */}
          <AvatarFallback>{user?.firstName?.charAt(0) || ''}{user?.lastName?.charAt(0) || 'U'}</AvatarFallback> {/* MODIFIED */}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-white"> {/* MODIFIED: Style consistency */}
        <DropdownMenuLabel className="text-gray-300">
            {user?.fullName || user?.primaryEmailAddress?.emailAddress || 'My Account'} {/* MODIFIED */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700"/>
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={() => navigate('/dashboard')}>Profile / Dashboard</DropdownMenuItem> {/* MODIFIED */}
        {/* Add other items like Settings if needed */}
        {/* <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Settings</DropdownMenuItem> */}
        <DropdownMenuSeparator className="bg-gray-700"/>
        <DropdownMenuItem 
            className="cursor-pointer text-red-400 hover:bg-red-700/50 hover:text-red-300"  // MODIFIED: Style consistency
            onClick={handleSignOut} // MODIFIED: Call handleSignOut
        >
            Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;



// src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Upload, ChevronLeft, ChevronRight, Send } from "lucide-react"; // Added Send
import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';
import UserDropdown from '@/components/UserDropdown';
import ChatHistory from '@/components/ChatHistory';
import { toast } from "@/components/ui/sonner";
import QuestionPreferences from '@/components/QuestionPreferences';
// No longer import QuestionPreferencesType, rely on structure.
import apiRequest from '@/lib/api';

const ChatPage = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [showSidebar, setShowSidebar] = useState(true);
  const [activeChatHistoryId, setActiveChatHistoryId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const [questionPreferences, setQuestionPreferences] = useState({
    pattern: 'mixed',
    stream: 'computer-science',
    marksDistribution: 'predefined',
    customMarks: { mcq: 40, shortAnswer: 30, longAnswer: 20, practical: 10 }
  });
  const [customPromptText, setCustomPromptText] = useState('');

  // --- TanStack Query for Chat History ---
  const { data: chatHistoriesData, isLoading: isLoadingHistories } = useQuery({
    queryKey: ['chatHistories', userId],
    queryFn: async () => {
      if (!userId) return [];
      // Using fetch directly here for simplicity in queryFn, ensure getToken is available
      const token = await getToken(); 
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/teacher/chat-history?clerkId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch chat histories');
      const rawHistories = await response.json();
      return rawHistories.map((h) => ({
          id: h.id,
          title: `Chat: ${h.subject || 'General'} - ${new Date(h.updatedAt).toLocaleDateString()}`,
          date: new Date(h.updatedAt).toLocaleString(),
          subject: h.subject,
          classLevel: h.class, // class is a reserved keyword
          updatedAt: h.updatedAt,
      }));
    },
    enabled: !!userId,
  });

  // --- TanStack Query for fetching a specific chat's messages ---
  const { isLoading: isLoadingActiveChatMessages } = useQuery({
    queryKey: ['chatMessages', activeChatHistoryId, userId],
    queryFn: async () => {
        if (!activeChatHistoryId || !userId) return [];
        const token = await getToken();
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/teacher/chat-history/${activeChatHistoryId}?clerkId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch chat messages');
        const chat = await response.json();
        // Ensure messages are in the correct format for ChatMessages component
        return (chat.messages || []).map((msg) => ({ 
            id: msg.id || crypto.randomUUID(), // Prefer ID from DB, fallback to UUID
            text: msg.role === 'assistant' ? msg.content : (msg.content?.text || msg.content), // Assistant content might be JSON
            user: msg.role === 'user' ? 'me' : 'assistant',
            timestamp: new Date(msg.timestamp || chat.updatedAt),
            attachments: msg.attachments || undefined,
            usedSources: msg.role === 'assistant' ? (msg.content?.usedSources || chat.usedDocuments?.sources) : undefined,
        }));
    },
    enabled: !!activeChatHistoryId && !!userId,
    onSuccess: (data) => {
        if (data) setMessages(data);
        else setMessages([]); // Clear messages if no data (e.g., history deleted)
    }
  });

  // --- TanStack Mutation for sending a message / generating questions ---
  const sendMessageMutation = useMutation({
    mutationFn: async ({ userQuery }) => { // Removed file from here, handle file uploads separately
      if (!userId) throw new Error("User not authenticated");
      
      const payload = {
          clerkId: userId,
          userQuery,
          questionPreferences,
          customPromptText,
          chatHistoryId: activeChatHistoryId,
      };
      console.log("Frontend: Sending payload to /api/chat/generate-questions:", payload);
      // Pass getToken to apiRequest
      return apiRequest('/chat/generate-questions', {
        method: 'POST',
        body: JSON.stringify(payload),
      }, getToken);
    },
    onMutate: ({ userQuery }) => {
      const userMessage = {
        id: crypto.randomUUID(),
        text: userQuery,
        user: 'me',
        timestamp: new Date(),
      };
      const assistantPlaceholder = {
        id: crypto.randomUUID(),
        text: 'Generating questions...',
        user: 'assistant',
        timestamp: new Date(),
        isGenerating: true,
      };
      setMessages(prev => [...prev, userMessage, assistantPlaceholder]);
      setIsLoadingResponse(true);
    },
    onSuccess: (data) => {
      setMessages(prev => {
        const newMessages = [...prev.filter(m => !m.isGenerating)];
        const aiResponse = {
          id: crypto.randomUUID(),
          text: data.answer,
          user: 'assistant',
          timestamp: new Date(),
          usedSources: data.usedSources,
        };
        return [...newMessages, aiResponse];
      });
      if (data.chatHistoryId && (!activeChatHistoryId || activeChatHistoryId !== data.chatHistoryId)) {
          setActiveChatHistoryId(data.chatHistoryId);
      }
      queryClient.invalidateQueries({ queryKey: ['chatHistories', userId] });
      queryClient.invalidateQueries({ queryKey: ['chatMessages', data.chatHistoryId, userId]});
    },
    onError: (error) => {
      toast.error(error.message || "Failed to get response from AI.");
      setMessages(prev => prev.filter(m => !m.isGenerating));
    },
    onSettled: () => {
      setIsLoadingResponse(false);
    }
  });

  const uploadMaterialMutation = useMutation({
      mutationFn: async ({ file, metadata }) => {
          if (!userId) throw new Error("User not authenticated for file upload.");
          
          const formData = new FormData();
          formData.append('file', file);
          formData.append('clerkId', userId);
          Object.keys(metadata).forEach(key => formData.append(key, metadata[key]));
          
          return apiRequest('/teacher/upload-material', {
              method: 'POST',
              body: formData,
              isFormData: true,
          }, getToken);
      },
      onSuccess: (data) => {
          toast.success(data.message || `${data.file.name} uploaded and processing.`);
          // Optionally, automatically send a message to chat about the uploaded file
          sendMessageMutation.mutate({ userQuery: `I have uploaded ${data.file.name}. Please consider this for generating questions.` });
      },
      onError: (error) => {
          toast.error(error.message || "File upload failed.");
      }
  });

  const handleSendMessage = (text) => {
    if (!userId) {
      toast.error("Please log in to chat.");
      return;
    }
    sendMessageMutation.mutate({ userQuery: text });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && userId) {
      const metadata = {
        subject: questionPreferences.stream || 'General',
        classLevel: 'General', // Or get from preferences/form
        chapter: 'General', // Or get from preferences/form
      };
      uploadMaterialMutation.mutate({ file, metadata });
      event.target.value = null; // Reset file input
    } else if (!userId) {
      toast.error("Please log in to upload files.");
    }
  };
  
  const handleSelectHistory = (historyId) => {
    if (activeChatHistoryId === historyId) return; // Avoid reloading same chat
    setActiveChatHistoryId(historyId);
    setMessages([]); // Clear current messages, new ones will load via useQuery
    const selectedHistory = chatHistoriesData?.find(h => h.id === historyId);
    toast.info(`Loading chat: ${selectedHistory?.title || 'Chat'}`);
  };

  const handleNewChat = () => {
    setActiveChatHistoryId(null);
    setMessages([
      { id: 'welcome_new', text: 'New chat started. How can I help you generate questions today?', user: 'system', timestamp: new Date() }
    ]);
    toast.success("New chat started!");
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setQuestionPreferences(updatedPreferences);
    toast.info("Question preferences updated for this session.");
  };

  useEffect(() => {
    // Example: Load custom prompt from localStorage or a settings API
    const savedPrompt = localStorage.getItem('customAIPrompt_teacher_' + userId);
    if (savedPrompt) {
      setCustomPromptText(savedPrompt);
    }
  }, [userId]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="bg-gray-900 shadow-md border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSidebar(!showSidebar)} 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-theme-tertiary/30"
          >
            {showSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
          <h1 className="text-xl font-bold text-white bg-gradient-to-r from-theme-primary via-theme-tertiary to-theme-secondary bg-clip-text text-transparent">
            QuestionGenius AI
          </h1>
        </div>
        <UserDropdown />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div 
          className={`bg-gray-950 border-r border-gray-800 transition-all duration-300 ease-in-out ${
            showSidebar ? 'w-72' : 'w-0'
          } overflow-hidden`}
        >
          {showSidebar && (
            <ChatHistory 
              histories={chatHistoriesData || []} 
              activeHistoryId={activeChatHistoryId} 
              onSelectHistory={handleSelectHistory} 
              onNewChat={handleNewChat}
            />
          )}
        </div>

        <div className="flex-1 flex flex-col bg-gray-850 relative">
          {/* Main chat area */}
          <div className="flex-1 overflow-y-auto p-6 pb-4"> {/* Reduced bottom padding */}
            {isLoadingActiveChatMessages && messages.length === 0 && <p className="text-center text-gray-400 py-10">Loading messages...</p>}
            {!isLoadingActiveChatMessages && messages.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Send size={48} className="mb-4 opacity-50"/>
                    <p>Start a conversation or select one from history.</p>
                    <p className="text-sm">Upload materials using the button below.</p>
                 </div>
            )}
            <ChatMessages messages={messages} />
          </div>

          {/* Chat input and controls area */}
          <div className="bg-gray-900 border-t border-gray-800 p-4 flex flex-col"> {/* Removed rounded-t-xl */}
            <QuestionPreferences onUpdatePreferences={handleUpdatePreferences} />
            <div className="flex items-end gap-2">
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  accept=".pdf,.doc,.docx,.txt"
                />
                <Button variant="outline" size="icon" type="button" className="h-12 w-12 border-gray-700 hover:bg-theme-tertiary/30 hover:border-theme-tertiary transition-colors rounded-xl">
                  <Upload className="h-5 w-5" />
                </Button>
              </label>
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;


// src/pages/Index.tsx
// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;



// src/pages/Landing
import type React from "react"

import Navbar from "@/components/Navbar"
import HeroSection from "@/components/hero"
import Footer from "@/components/Footer"

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#511849] via-[#900C3F] to-[#C70039]">
      <Navbar />
      <div className="mt-[-42px]"> {/* Adjust margin to reduce spacing */}
        <HeroSection />
      </div>

      <Footer />
    </div>
  )
}

export default LandingPage




import React from "react";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const signIn = () => {
  return (
    <div
    className="flex justify-center items-center min-h-screen p-4"
    style={{
      backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    }}
  >
        <SignIn signUpUrl="/sign-up" />     
    </div>
  );
};

export default signIn;



import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;





import React from "react";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen p-4"
      style={{
        backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
      }}
    >
        <SignUp 
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"

        />
    </div>
  );
};

export default Signup;


// src/pages/TeachersDashboard.jsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeacherInfo from '@/components/dashboard/TeachersInfo';
import SubjectNotes from '@/components/dashboard/SubjectNotes';
import QuestionPapers from '@/components/dashboard/QuestionPapers';
import CustomPromptEditor from '@/components/dashboard/CustomPromptEditor';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const TeachersDashboard = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#221F26] via-[#2a233a] to-[#3a2740] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mr-4"></div>
        <span className="text-lg font-semibold">Loading Dashboard...</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#221F26] via-[#2a233a] to-[#3a2740] text-white">
      <Navbar />

      <main className="flex-1 px-4 py-8 md:px-10 max-w-6xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            Teacher Dashboard
          </h1>
          <p className="text-white/80 text-base md:text-lg">
            Manage your teaching resources and AI preferences.
          </p>
        </div>

        <div className="mb-10">
          <TeacherInfo />
        </div>

        <div className="bg-white/5 rounded-2xl shadow-xl p-4 md:p-8 backdrop-blur-md border border-white/10">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-8 bg-gradient-to-r from-theme-secondary/30 to-theme-primary/10 p-2 rounded-xl shadow-md">
              <TabsTrigger
                value="notes"
                className="flex-1 data-[state=active]:bg-theme-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2 px-4 transition-all duration-200 text-base font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16" /><path d="M4 4h16" /></svg>
                  Subject Notes
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="papers"
                className="flex-1 data-[state=active]:bg-theme-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2 px-4 transition-all duration-200 text-base font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
                  Question Papers
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="prompt"
                className="flex-1 data-[state=active]:bg-theme-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2 px-4 transition-all duration-200 text-base font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16" /><path d="M4 4h16" /></svg>
                  AI Prompt Editor
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="mt-0">
              <SubjectNotes />
            </TabsContent>
            <TabsContent value="papers" className="mt-0">
              <QuestionPapers />
            </TabsContent>
            <TabsContent value="prompt" className="mt-0">
              <CustomPromptEditor />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeachersDashboard;


// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"; 
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import TeachersDashboard from "./pages/TeachersDashboard.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in/*" element={<Login />} />
            <Route path="/sign-up/*" element={<Signup />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/dashboard" element={<TeachersDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


// this is tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Custom theme colors based on provided palette
        theme: {
          primary: '#C70039',
          secondary: '#511849',
          tertiary: '#900C3F',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(10px)' }
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        'bounce-light': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-right': 'slide-right 0.5s ease-out infinite',
        'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
        'bounce-light': 'bounce-light 2s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;



i want to update the design of all of the components
i want complete end to end code with very cool deisgns i want a very cool landing page and a very very lengthy scrollable landing page with make many things like a very cool animated sections like faqs, multitab toggling cards , testimonials, contact us, hero section and with animated cool animations, i want really cool and ultra modern designs and colorful designs witbh consistent color scheme, with resposnsive designs, cool gradients bgs , and what not, and similarly all othertr components ust look very cool and colorful and modern, and very animated, and keep the css or tailwind of each component in its file itself. so that each components keeps all of its designs

use cool fonts like poppins and montserrat and cool animate icons erywhere from fontawesome. also darkmode and light mode and system theme. iw ant complete functionality as well. 