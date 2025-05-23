// components/dashboard/SubjectNotes.jsx

import React, { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from '@/lib/api';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Trash2, BookText, Loader2, Edit3, XCircle, CheckCircle, Search, Filter } from "lucide-react"; // Updated Icons
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose, // Added for explicit close
} from "@/components/ui/dialog"; // For Add/Edit Note Modal
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// Component-specific styles
const SubjectNotesStyles = () => (
  <style>{`
    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem; /* gap-6 */
    }
    .note-card {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-lg);
      padding: 1.25rem; /* p-5 */
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      position: relative; /* For absolute positioned elements like edit/delete */
    }
    .note-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-medium);
      border-color: hsl(var(--primary) / 0.6);
    }
    .note-card-header {
      margin-bottom: 0.75rem; /* mb-3 */
    }
    .note-card-title {
      font-family: var(--font-heading);
      font-size: 1.125rem; /* text-lg */
      font-weight: 600;
      color: hsl(var(--foreground));
      margin-bottom: 0.25rem; /* mb-1 */
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .note-card-meta {
      font-size: 0.75rem; /* text-xs */
      color: hsl(var(--muted-foreground));
      margin-bottom: 0.75rem; /* mb-3 */
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .note-card-content {
      font-size: 0.875rem; /* text-sm */
      color: hsl(var(--muted-foreground));
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 4; /* Show 4 lines of content */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1; /* Make content take available space */
      margin-bottom: 1rem; /* mb-4 */
    }
    .note-card-footer {
      margin-top: auto; /* Push footer to bottom */
      padding-top: 0.75rem; /* pt-3 */
      border-top: 1px solid hsl(var(--border) / 0.7);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .note-card-actions {
      display: flex;
      gap: 0.5rem; /* gap-2 */
    }
    .note-action-button {
      color: hsl(var(--muted-foreground));
      padding: 0.375rem; /* p-1.5 */
    }
    .note-action-button:hover {
      color: hsl(var(--primary));
      background-color: hsl(var(--primary) / 0.1);
    }
    .note-action-button.delete:hover {
      color: hsl(var(--destructive));
      background-color: hsl(var(--destructive) / 0.1);
    }
    
    .empty-notes-placeholder {
      border: 2px dashed hsl(var(--border));
      border-radius: var(--radius-xl);
      padding: 3rem; /* p-12 */
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      color: hsl(var(--muted-foreground));
    }
    .empty-notes-placeholder .lucide {
      width: 3rem; /* w-12 */
      height: 3rem; /* h-12 */
      margin-bottom: 1rem; /* mb-4 */
      opacity: 0.5;
    }
    .dialog-content-notes {
      background-color: hsl(var(--popover)) !important; /* Ensure correct bg */
      border-color: hsl(var(--border)) !important;
      color: hsl(var(--foreground)) !important;
    }
    .dialog-input {
      background-color: hsl(var(--input));
      border-color: hsl(var(--border));
      color: hsl(var(--foreground));
    }
    .dialog-input:focus {
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
    }
    .dialog-textarea {
      background-color: hsl(var(--input));
      border-color: hsl(var(--border));
      color: hsl(var(--foreground));
      min-height: 120px;
    }
    .dialog-textarea:focus {
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
    }
  `}</style>
);

const initialNoteState = {
  title: '',
  subject: '',
  classLevel: '',
  chapter: '',
  board: '', // University / Board
  language: 'en',
  institution: '', // Optional: UG, PG
  department: '',  // Optional: BCA, Physics
  courseCode: '',  // Optional: CS101
  content: '',
};

const SubjectNotes = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null); // null for new, object for edit
  const [noteData, setNoteData] = useState(initialNoteState);
  const [searchTerm, setSearchTerm] = useState("");


  const { data: notes, isLoading: isLoadingNotes, error: notesError } = useQuery({
    queryKey: ['teacherNotes', userId],
    queryFn: async () => {
      if (!userId) return [];
      const rawNotes = await apiRequest(`/teacher/notes?clerkId=${userId}`, {}, getToken);
      return rawNotes.map(n => ({ ...n, date: new Date(n.createdAt).toLocaleDateString() }));
    },
    enabled: !!userId,
  });

  const filteredNotes = notes?.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const noteMutation = useMutation({
    mutationFn: async ({ data, id }) => { // id is for editing
      if (!userId) throw new Error("User not authenticated");
      const url = id ? `/teacher/notes/${id}` : '/teacher/notes'; // Hypothetical update endpoint
      const method = id ? 'PUT' : 'POST'; // Assuming PUT for update
      
      // If PUT, you might need a different API endpoint or logic in your backend
      // For now, assuming /teacher/notes/:noteId with PUT for update is not implemented
      // So, this part focuses on creation for now. Edit would need backend support.
      // If only create and delete are supported:
      if (id) throw new Error("Editing notes is not fully implemented in this example.");


      return apiRequest(url, {
        method: method,
        body: JSON.stringify({ ...data, clerkId: userId }),
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherNotes', userId] });
      toast.success(`Note ${editingNote ? 'updated' : 'added'} successfully!`, {
        icon: <CheckCircle className="text-green-500" size={20}/>,
      });
      setIsModalOpen(false);
      setEditingNote(null);
      setNoteData(initialNoteState);
    },
    onError: (error) => {
      toast.error(error.message || `Failed to ${editingNote ? 'update' : 'add'} note.`);
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest(`/teacher/notes/${noteId}`, {
        method: 'DELETE',
        body: JSON.stringify({ clerkId: userId }),
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherNotes', userId] });
      toast.success("Note deleted successfully!", {
        icon: <Trash2 className="text-red-500" size={20}/>,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete note.");
    }
  });

  const handleOpenModal = (noteToEdit = null) => {
    if (noteToEdit) {
      // toast.info("Editing notes is a work-in-progress."); // Temporary
      // return; // Prevent editing for now if backend PUT is not ready
      setEditingNote(noteToEdit);
      setNoteData({ ...initialNoteState, ...noteToEdit }); // Populate form with note data
    } else {
      setEditingNote(null);
      setNoteData(initialNoteState);
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();
    const { title, subject, classLevel, chapter, board } = noteData;
    if (!title || !subject || !classLevel || !chapter || !board) {
      toast.error("Please fill in all required fields: Title, Subject, Class Level, Chapter, and Board/University.");
      return;
    }
    // For now, this only handles creation. If editing is implemented on backend:
    // noteMutation.mutate({ data: noteData, id: editingNote?.id });
    if (editingNote) {
         toast.error("Editing functionality is currently under development. Please delete and re-create the note if changes are needed.");
         // Or, if you have a PUT endpoint:
         // noteMutation.mutate({ data: noteData, id: editingNote.id });
    } else {
        noteMutation.mutate({ data: noteData });
    }
  };

  const handleDeleteNote = (id) => {
    // Optional: Add a confirmation dialog here
    if (window.confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
        deleteNoteMutation.mutate(id);
    }
  };


  return (
    <>
      <SubjectNotesStyles />
      <TooltipProvider>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gradient-animated">My Subject Notes</h2>
              <p className="text-muted-foreground mt-1">
                Organize your teaching materials, insights, and key concepts.
              </p>
            </div>
            <Button 
              onClick={() => handleOpenModal()}
              className="btn-glow-primary w-full sm:w-auto"
            >
              <FilePlus className="mr-2 h-5 w-5" />
              Add New Note
            </Button>
          </div>

          {/* Search and Filter Bar - Basic */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-grow">
              <Input 
                type="text"
                placeholder="Search notes by title, subject, content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dialog-input pl-10" 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            {/* <Button variant="outline" className="border-border text-muted-foreground hover:text-primary hover:border-primary">
              <Filter className="mr-2 h-4 w-4"/> Filters
            </Button> */}
          </div>

          {isLoadingNotes && <div className="flex justify-center items-center p-10"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}
          {notesError && <div className="p-6 text-destructive bg-destructive/10 rounded-lg">Error: {notesError.message}</div>}
          
          {!isLoadingNotes && !notesError && (
            filteredNotes.length > 0 ? (
              <div className="notes-grid">
                {filteredNotes.map((note) => (
                  <div key={note.id} className="note-card animate-fade-in-up" style={{animationDelay: `${Math.random() * 0.3}s`}}> {/* Random delay for staggered effect */}
                    <div className="note-card-header">
                      <h3 className="note-card-title" title={note.title}>{note.title}</h3>
                      <p className="note-card-meta" title={`${note.subject} | ${note.classLevel} | ${note.chapter} | ${note.board}`}>
                        {note.subject} • {note.classLevel} • {note.chapter}
                      </p>
                    </div>
                    <p className="note-card-content">
                      {note.content || <span className="italic">No text content for this note.</span>}
                    </p>
                    <div className="note-card-footer">
                      <p className="text-xs text-muted-foreground">{note.date}</p>
                      <div className="note-card-actions">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="note-action-button" onClick={() => handleOpenModal(note)}>
                              <Edit3 size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-popover text-popover-foreground border-border"><p>Edit Note</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="note-action-button delete" onClick={() => handleDeleteNote(note.id)} disabled={deleteNoteMutation.isPending && deleteNoteMutation.variables === note.id}>
                              { (deleteNoteMutation.isPending && deleteNoteMutation.variables === note.id) ? <Loader2 size={16} className="animate-spin"/> : <Trash2 size={16} />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-popover text-popover-foreground border-border"><p>Delete Note</p></TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-notes-placeholder">
                <BookText />
                <h3 className="text-xl font-semibold font-heading mt-4">No Notes Found</h3>
                <p className="mt-1 text-sm">
                  {searchTerm ? "Try adjusting your search or filter terms." : "Get started by adding your first subject note!"}
                </p>
                {!searchTerm && 
                  <Button className="mt-6 btn-glow-primary" onClick={() => handleOpenModal()}>
                    <FilePlus className="mr-2 h-4 w-4"/> Add Your First Note
                  </Button>
                }
              </div>
            )
          )}
        </div>

        {/* Add/Edit Note Modal Dialog */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="dialog-content-notes sm:max-w-2xl"> {/* Wider modal */}
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">
                {editingNote ? 'Edit Subject Note' : 'Add New Subject Note'}
              </DialogTitle>
              <DialogDescription>
                {editingNote ? 'Update the details of your note.' : 'Fill in the details to create a new subject note.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitNote} className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-2"> {/* Scrollable content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium text-muted-foreground">Title*</label>
                  <Input id="title" name="title" value={noteData.title} onChange={handleInputChange} placeholder="e.g., Introduction to Thermodynamics" className="dialog-input mt-1" />
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">Subject*</label>
                  <Input id="subject" name="subject" value={noteData.subject} onChange={handleInputChange} placeholder="e.g., Physics" className="dialog-input mt-1" />
                </div>
                <div>
                  <label htmlFor="classLevel" className="text-sm font-medium text-muted-foreground">Class Level / Semester*</label>
                  <Input id="classLevel" name="classLevel" value={noteData.classLevel} onChange={handleInputChange} placeholder="e.g., 11th Grade, BSc Sem III" className="dialog-input mt-1" />
                </div>
                <div>
                  <label htmlFor="chapter" className="text-sm font-medium text-muted-foreground">Chapter / Unit*</label>
                  <Input id="chapter" name="chapter" value={noteData.chapter} onChange={handleInputChange} placeholder="e.g., Chapter 5: Work and Energy" className="dialog-input mt-1" />
                </div>
                <div>
                  <label htmlFor="board" className="text-sm font-medium text-muted-foreground">Board / University*</label>
                  <Input id="board" name="board" value={noteData.board} onChange={handleInputChange} placeholder="e.g., CBSE, Dibrugarh University" className="dialog-input mt-1" />
                </div>
                 <div>
                  <label htmlFor="language" className="text-sm font-medium text-muted-foreground">Language</label>
                  <Input id="language" name="language" value={noteData.language} onChange={handleInputChange} placeholder="e.g., en, as, hi" className="dialog-input mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="institution" className="text-sm font-medium text-muted-foreground">Institution (Optional)</label>
                  <Input id="institution" name="institution" value={noteData.institution} onChange={handleInputChange} placeholder="e.g., School, UG, PG" className="dialog-input mt-1" />
                </div>
                <div>
                  <label htmlFor="department" className="text-sm font-medium text-muted-foreground">Department (Optional)</label>
                  <Input id="department" name="department" value={noteData.department} onChange={handleInputChange} placeholder="e.g., Science, Arts" className="dialog-input mt-1" />
                </div>
                <div>
                  <label htmlFor="courseCode" className="text-sm font-medium text-muted-foreground">Course Code (Optional)</label>
                  <Input id="courseCode" name="courseCode" value={noteData.courseCode} onChange={handleInputChange} placeholder="e.g., PHY101" className="dialog-input mt-1" />
                </div>
              </div>
              <div>
                <label htmlFor="content" className="text-sm font-medium text-muted-foreground">Content (Optional)</label>
                <Textarea id="content" name="content" value={noteData.content} onChange={handleInputChange} placeholder="Enter your detailed note content here. Supports Markdown for formatting..." className="dialog-textarea mt-1" />
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="border-muted text-muted-foreground hover:border-foreground">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="btn-glow-primary" disabled={noteMutation.isPending}>
                  {noteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (editingNote ? <Save className="mr-2 h-4 w-4"/> : <FilePlus className="mr-2 h-4 w-4"/>) }
                  {editingNote ? 'Save Changes' : 'Create Note'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </>
  );
};

export default SubjectNotes;