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

const initialNewPaperState = {
  subject: '',
  year: new Date().getFullYear().toString(),
  examType: '',
  classLevel: '',
  board: '', // e.g., University Name, Board Name
  institution: '', // Optional: e.g., UG, PG, School
  department: '',  // Optional: e.g., Computer Science
  courseCode: '',  // Optional
  // No filename here, it comes from the selectedFile object
};

const QuestionPapers = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaperData, setNewPaperData] = useState(initialNewPaperState);
  const [selectedFile, setSelectedFile] = useState(null);

  const { data: papers, isLoading: isLoadingPapers, error: papersError } = useQuery({
    queryKey: ['teacherUploadedQuestionPapers', userId], // More specific queryKey
    queryFn: async () => {
      if (!userId) return [];
      // MODIFIED: Using 'category' for filtering as discussed
      const rawPapers = await apiRequest(
        `/teacher/uploaded-files?clerkId=${userId}&category=question_paper`, 
        {}, 
        getToken
      );
      return (rawPapers || []).map(p => ({
        id: p.id,
        filename: p.fileName,
        uploadDate: new Date(p.createdAt).toLocaleDateString(),
        subject: p.subject || 'N/A',
        // Use optional chaining for potentially missing fields from backend if not all are set
        year: p.year?.toString() || new Date(p.createdAt).getFullYear().toString(), 
        examType: p.examType || 'N/A',
        classLevel: p.classLevel || 'N/A',
        board: p.board || 'N/A', // Assuming board might be stored directly on UploadedFile
      }));
    },
    enabled: !!userId,
  });

  const uploadPaperMutation = useMutation({
    mutationFn: async ({ file, metadata }) => {
      if (!userId) throw new Error("User not authenticated");
      if (!file) throw new Error("No file selected for upload");

      const formData = new FormData();
      formData.append('file', file);
      formData.append('clerkId', userId);
      
      // Append all metadata
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });
      formData.append('category', 'question_paper'); // Explicitly set category

      return apiRequest('/teacher/upload-material', {
        method: 'POST',
        body: formData,
        isFormData: true,
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherUploadedQuestionPapers', userId] });
      toast.success(data.message || "Question paper uploaded and is processing.");
      setShowAddForm(false);
      setNewPaperData(initialNewPaperState);
      setSelectedFile(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload question paper.");
    }
  });

  const deletePaperMutation = useMutation({
    mutationFn: async (fileId) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest(`/teacher/uploaded-files/${fileId}`, { // Ensure this backend route exists
        method: 'DELETE',
        body: JSON.stringify({ clerkId: userId }),
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherUploadedQuestionPapers', userId] });
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
      toast.error("Please select a file and fill in required fields: Subject, Class Level, and Board/University.");
    }
  };
  
  const handleDeletePaper = (id) => {
    if (window.confirm("Are you sure you want to delete this question paper? This action cannot be undone and will remove it from the RAG system.")) {
        deletePaperMutation.mutate(id);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaperData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoadingPapers) return <div className="flex justify-center items-center h-40"><Loader2 className="h-10 w-10 animate-spin text-theme-primary" /> <span className="ml-3 text-lg">Loading Papers...</span></div>;
  
  // Display error only if it's not a 404 (which might mean no papers yet)
  if (papersError && papersError.status !== 404) {
      return <div className="text-red-400 p-4 bg-red-900/30 rounded-lg border border-red-700">Error loading papers: {papersError.message}</div>;
  }


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          Uploaded Question Papers
        </h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80 text-white shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto"
        >
          <FilePlus className="mr-2 h-5 w-5" />
          {showAddForm ? 'Cancel Upload' : 'Upload New Paper'}
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/30 shadow-xl animate-fade-in">
          <CardHeader><CardTitle className="text-xl text-white/90">Upload New Question Paper</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-white/80 block mb-1.5">Subject*</label>
                <Input id="subject" name="subject" value={newPaperData.subject} onChange={handleInputChange} placeholder="e.g. Advanced Calculus" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="year" className="text-sm font-medium text-white/80 block mb-1.5">Year</label>
                <Input id="year" name="year" value={newPaperData.year} onChange={handleInputChange} type="number" placeholder={new Date().getFullYear().toString()} className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="examType" className="text-sm font-medium text-white/80 block mb-1.5">Exam Type</label>
                <Input id="examType" name="examType" value={newPaperData.examType} onChange={handleInputChange} placeholder="e.g. Mid Term, Final, Entrance" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="classLevel" className="text-sm font-medium text-white/80 block mb-1.5">Class Level / Semester*</label>
                <Input id="classLevel" name="classLevel" value={newPaperData.classLevel} onChange={handleInputChange} placeholder="e.g., 10th Grade, BSc Sem II" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="board" className="text-sm font-medium text-white/80 block mb-1.5">Board / University*</label>
                <Input id="board" name="board" value={newPaperData.board} onChange={handleInputChange} placeholder="e.g., CBSE, Dibrugarh University" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
               <div>
                <label htmlFor="institution" className="text-sm font-medium text-white/80 block mb-1.5">Institution Type (Optional)</label>
                <Input id="institution" name="institution" value={newPaperData.institution} onChange={handleInputChange} placeholder="e.g., School, UG, PG" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
               <div>
                <label htmlFor="department" className="text-sm font-medium text-white/80 block mb-1.5">Department (Optional)</label>
                <Input id="department" name="department" value={newPaperData.department} onChange={handleInputChange} placeholder="e.g., Computer Science" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
               <div>
                <label htmlFor="courseCode" className="text-sm font-medium text-white/80 block mb-1.5">Course Code (Optional)</label>
                <Input id="courseCode" name="courseCode" value={newPaperData.courseCode} onChange={handleInputChange} placeholder="e.g., CS-201" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
            </div>
            <div>
              <label htmlFor="fileUpload" className="text-sm font-medium text-white/80 block mb-1.5">Upload File* (.pdf, .docx, .txt)</label>
              <Input 
                id="fileUpload" type="file" ref={fileInputRef} onChange={handleFileChange}
                className="w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-theme-primary/80 file:text-white hover:file:bg-theme-primary cursor-pointer bg-theme-secondary/30 border-theme-tertiary/40"
                accept=".pdf,.doc,.docx,.txt"
              />
               {selectedFile && <p className="text-xs text-green-400 mt-2">Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 pt-6 border-t border-white/10">
            <Button variant="outline" onClick={() => { setShowAddForm(false); setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; setNewPaperData(initialNewPaperState); }} className="border-white/30 text-white/80 hover:bg-white/10">Cancel</Button>
            <Button onClick={handleAddPaperSubmit} className="bg-theme-primary hover:bg-theme-primary/90 text-white shadow-md hover:shadow-lg" disabled={!selectedFile || uploadPaperMutation.isPending}>
              {uploadPaperMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
              Upload & Process Paper
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <Card className="glass-morphism border-theme-tertiary/20 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-theme-secondary/40">
                <TableRow className="border-b-theme-tertiary/40">
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Filename</TableHead>
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Subject</TableHead>
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Class/Sem</TableHead>
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Year</TableHead>
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Uploaded</TableHead>
                  <TableHead className="text-right text-white/90 font-semibold px-4 py-3">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(papers && papers.length > 0) ? papers.map((paper) => (
                  <TableRow key={paper.id} className="border-b-theme-tertiary/20 hover:bg-theme-secondary/20 transition-colors">
                    <TableCell className="font-medium text-white/90 px-4 py-3 truncate max-w-xs" title={paper.filename}>{paper.filename}</TableCell>
                    <TableCell className="text-white/80 px-4 py-3">{paper.subject}</TableCell>
                    <TableCell className="text-white/80 px-4 py-3">{paper.classLevel}</TableCell>
                    <TableCell className="text-white/80 px-4 py-3">{paper.year}</TableCell>
                    <TableCell className="text-white/80 px-4 py-3">{paper.uploadDate}</TableCell>
                    <TableCell className="text-right px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20" title="Download (placeholder)" onClick={() => toast.info("Download functionality to be implemented. File URL: " + paper.fileUrl)}>
                          <Download size={18} />
                        </Button>
                        <Button 
                          variant="ghost" size="icon" 
                          onClick={() => handleDeletePaper(paper.id)}
                          disabled={deletePaperMutation.isPending && deletePaperMutation.variables === paper.id}
                          className="h-9 w-9 text-red-500/70 hover:text-red-400 hover:bg-red-500/20"
                          title="Delete Paper"
                        >
                          {deletePaperMutation.isPending && deletePaperMutation.variables === paper.id ? <Loader2 className="h-5 w-5 animate-spin"/> : <Trash2 size={18} />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  !isLoadingPapers && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-white/60 py-10 text-lg">
                            No question papers uploaded yet. Click "Upload New Paper" to begin.
                        </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPapers;