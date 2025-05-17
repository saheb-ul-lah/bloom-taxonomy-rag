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


