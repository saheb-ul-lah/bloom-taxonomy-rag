//src/components/dashboard/SubjectNotes.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Trash2, FileText } from "lucide-react";

interface Note {
  id: string;
  subject: string;
  title: string;
  content: string;
  date: string;
}

const SubjectNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Calculus Fundamentals',
      content: 'Key concepts in differential calculus including limits, derivatives and their applications.',
      date: '2025-05-02'
    },
    {
      id: '2',
      subject: 'Physics',
      title: 'Quantum Mechanics',
      content: 'An introduction to wave functions, Schrödinger equation and quantum states.',
      date: '2025-05-04'
    },
    {
      id: '3',
      subject: 'Computer Science',
      title: 'Data Structures',
      content: 'Overview of arrays, linked lists, stacks, queues, trees and graphs.',
      date: '2025-05-08'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState<Omit<Note, 'id' | 'date'>>({
    subject: '',
    title: '',
    content: ''
  });
  
  const handleAddNote = () => {
    if (newNote.subject && newNote.title && newNote.content) {
      const newId = Date.now().toString();
      const currentDate = new Date().toISOString().split('T')[0];
      
      setNotes([...notes, {
        id: newId,
        ...newNote,
        date: currentDate
      }]);
      
      setNewNote({
        subject: '',
        title: '',
        content: ''
      });
      
      setShowAddForm(false);
    }
  };
  
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
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
          <CardHeader>
            <CardTitle className="text-lg">Add New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Subject</label>
                <Input 
                  value={newNote.subject} 
                  onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
                  placeholder="e.g. Mathematics"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Title</label>
                <Input 
                  value={newNote.title} 
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  placeholder="e.g. Calculus Fundamentals"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Content</label>
              <Textarea 
                value={newNote.content} 
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                placeholder="Enter your note content here..."
                className="h-32 bg-theme-secondary/20 border-theme-tertiary/30"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
              className="border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddNote}
              className="bg-theme-primary hover:bg-theme-primary/80"
            >
              Save Note
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="glass-morphism border-theme-tertiary/20 hover:border-theme-tertiary/40 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-theme-tertiary/70">{note.subject}</p>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteNote(note.id)}
                  className="h-8 w-8 text-white/50 hover:text-white hover:bg-theme-tertiary/20"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 line-clamp-4">{note.content}</p>
            </CardContent>
            <CardFooter className="pt-2 border-t border-white/10 flex justify-between">
              <p className="text-xs text-white/50">{note.date}</p>
              <div className="flex items-center text-xs text-white/50">
                <FileText size={12} className="mr-1" />
                Note
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectNotes;