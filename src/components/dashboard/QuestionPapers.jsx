import React, { useState, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { FileUp, Trash2, DownloadCloud, Loader2, Search, AlertTriangle, CheckCircle, UploadCloud, X } from "lucide-react"; // Updated Icons
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge"; // For status indicators
import { Progress } from "@/components/ui/progress"; // For upload progress (conceptual)
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// Component-specific styles
const QuestionPapersStyles = () => (
  <style>{`
    .papers-table-container {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-soft);
      overflow: hidden; /* For rounded corners on table */
    }
    .papers-table .table-header-cell {
      font-family: var(--font-heading);
      font-weight: 600;
      color: hsl(var(--muted-foreground));
      background-color: hsl(var(--background)); /* Slightly different from card for header */
      border-bottom: 1px solid hsl(var(--border));
      padding: 0.75rem 1rem; /* py-3 px-4 */
      text-transform: uppercase;
      font-size: 0.75rem; /* text-xs */
    }
    .dark .papers-table .table-header-cell {
      background-color: hsl(var(--muted) / 0.1);
    }
    .papers-table .table-body-row:hover {
      background-color: hsl(var(--muted) / 0.3);
    }
    .papers-table .table-cell {
      color: hsl(var(--foreground));
      padding: 0.875rem 1rem; /* py-3.5 px-4 */
      border-bottom: 1px solid hsl(var(--border) / 0.7);
    }
    .papers-table .table-body-row:last-child .table-cell {
      border-bottom: none;
    }
    .paper-action-button {
      color: hsl(var(--muted-foreground));
      padding: 0.375rem; /* p-1.5 */
    }
    .paper-action-button:hover {
      color: hsl(var(--primary));
      background-color: hsl(var(--primary) / 0.1);
    }
    .paper-action-button.delete:hover {
      color: hsl(var(--destructive));
      background-color: hsl(var(--destructive) / 0.1);
    }

    .upload-dialog-content {
      background-color: hsl(var(--popover)) !important;
      border-color: hsl(var(--border)) !important;
      color: hsl(var(--foreground)) !important;
    }
    .upload-form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem 1.5rem; /* row-gap col-gap */
    }
    .upload-input-label {
      font-size: 0.875rem; /* text-sm */
      font-weight: 500;
      color: hsl(var(--muted-foreground));
      margin-bottom: 0.375rem; /* mb-1.5 */
    }
    .upload-input {
      background-color: hsl(var(--input));
      border-color: hsl(var(--border));
      color: hsl(var(--foreground));
    }
    .upload-input:focus {
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
    }
    .file-drop-area {
      border: 2px dashed hsl(var(--border));
      border-radius: var(--radius-lg);
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: hsl(var(--muted) / 0.2);
    }
    .file-drop-area:hover, .file-drop-area.dragging {
      border-color: hsl(var(--primary));
      background-color: hsl(var(--primary) / 0.05);
    }
    .file-drop-area .lucide {
      width: 3rem; /* w-12 */
      height: 3rem; /* h-12 */
      color: hsl(var(--primary));
      margin: 0 auto 0.75rem; /* mb-3 */
    }
    .file-drop-area p {
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
    }
    .file-drop-area span {
      color: hsl(var(--primary));
      font-weight: 500;
    }
    .selected-file-info {
      background-color: hsl(var(--muted) / 0.3);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
    .empty-papers-placeholder { /* Similar to notes placeholder */
      border: 2px dashed hsl(var(--border));
      border-radius: var(--radius-xl);
      padding: 3rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      color: hsl(var(--muted-foreground));
    }
    .empty-papers-placeholder .lucide {
      width: 3rem; height: 3rem; margin-bottom: 1rem; opacity: 0.5;
    }
  `}</style>
);

const initialNewPaperState = {
  subject: '',
  year: new Date().getFullYear().toString(),
  examType: '',
  classLevel: '',
  board: '', // University/Board
  institution: '',
  department: '',
  courseCode: '',
};

const QuestionPapers = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPaperData, setNewPaperData] = useState(initialNewPaperState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // For drag and drop UI
  const [searchTerm, setSearchTerm] = useState("");

  const { data: papers, isLoading: isLoadingPapers, error: papersError } = useQuery({
    queryKey: ['teacherUploadedQuestionPapers', userId],
    queryFn: async () => {
      if (!userId) return [];
      const rawPapers = await apiRequest(
        `/teacher/uploaded-files?clerkId=${userId}&category=question_paper`, {}, getToken
      );
      return (rawPapers || []).map(p => ({
        id: p.id,
        filename: p.fileName,
        uploadDate: new Date(p.createdAt).toLocaleDateString(),
        subject: p.subject || 'N/A',
        year: p.year?.toString() || 'N/A',
        examType: p.examType || 'N/A',
        classLevel: p.classLevel || 'N/A',
        isVectorized: p.isVectorized,
        processed: p.processed,
        notes: p.notes, // For error messages from backend
        fileUrl: p.fileUrl, // For download
      }));
    },
    enabled: !!userId,
  });

  const filteredPapers = papers?.filter(paper => 
    paper.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.classLevel.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const uploadPaperMutation = useMutation({
    mutationFn: async ({ file, metadata }) => {
      if (!userId) throw new Error("User not authenticated");
      if (!file) throw new Error("No file selected for upload");

      const formData = new FormData();
      formData.append('file', file);
      formData.append('clerkId', userId);
      Object.entries(metadata).forEach(([key, value]) => {
        if (value || typeof value === 'number') formData.append(key, value);
      });
      formData.append('category', 'question_paper');

      return apiRequest('/teacher/upload-material', {
        method: 'POST', body: formData, isFormData: true,
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherUploadedQuestionPapers', userId] });
      toast.success(data.message || "Question paper uploaded successfully. Processing will begin shortly.", {
        icon: <CheckCircle className="text-green-500" size={20}/>,
      });
      setIsModalOpen(false);
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
      return apiRequest(`/teacher/uploaded-files/${fileId}`, {
        method: 'DELETE', body: JSON.stringify({ clerkId: userId }),
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherUploadedQuestionPapers', userId] });
      toast.success("Question paper deleted successfully.", {
         icon: <Trash2 className="text-red-500" size={20}/>,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete question paper.");
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaperData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error("File is too large. Maximum size is 50MB.");
        return;
      }
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload PDF, DOCX, or TXT files.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e) => handleFileSelect(e.target.files?.[0]);
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };


  const handleSubmitPaper = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    if (!newPaperData.subject || !newPaperData.classLevel || !newPaperData.board) {
      toast.error("Please fill in required fields: Subject, Class Level, and Board/University.");
      return;
    }
    uploadPaperMutation.mutate({ file: selectedFile, metadata: newPaperData });
  };
  
  const handleDeletePaper = (id) => {
    if (window.confirm("Are you sure you want to delete this paper? This will remove its vector data from the AI system.")) {
        deletePaperMutation.mutate(id);
    }
  };

  const formatFileSize = (bytes) => { // Helper for selected file display
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  return (
    <>
      <QuestionPapersStyles />
      <TooltipProvider>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
             <div>
              <h2 className="text-2xl font-bold font-heading text-gradient-animated">My Question Papers</h2>
              <p className="text-muted-foreground mt-1">
                Manage your uploaded question papers. These are used by the AI for context.
              </p>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="btn-glow-primary w-full sm:w-auto"
            >
              <FileUp className="mr-2 h-5 w-5" />
              Upload New Paper
            </Button>
          </div>

           {/* Search Bar */}
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search papers by filename, subject, class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="upload-input pl-10" 
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          
          {isLoadingPapers && <div className="flex justify-center items-center p-10"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}
          {papersError && <div className="p-6 text-destructive bg-destructive/10 rounded-lg">Error: {papersError.message}</div>}

          {!isLoadingPapers && !papersError && (
            filteredPapers.length > 0 ? (
              <div className="papers-table-container">
                <Table className="papers-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="table-header-cell">Filename</TableHead>
                      <TableHead className="table-header-cell">Subject</TableHead>
                      <TableHead className="table-header-cell hidden md:table-cell">Class/Sem</TableHead>
                      <TableHead className="table-header-cell hidden lg:table-cell">Status</TableHead>
                      <TableHead className="table-header-cell text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPapers.map((paper) => (
                      <TableRow key={paper.id} className="table-body-row animate-fade-in" style={{animationDelay: `${Math.random() * 0.3}s`}}>
                        <TableCell className="table-cell font-medium max-w-xs truncate" title={paper.filename}>
                          {paper.filename}
                          <p className="text-xs text-muted-foreground">{paper.uploadDate}</p>
                        </TableCell>
                        <TableCell className="table-cell">{paper.subject}</TableCell>
                        <TableCell className="table-cell hidden md:table-cell">{paper.classLevel}</TableCell>
                        <TableCell className="table-cell hidden lg:table-cell">
                          {paper.processed ? (
                            paper.isVectorized ? (
                              <Badge variant="default" className="bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-500/30">
                                <CheckCircle size={14} className="mr-1.5" /> Processed
                              </Badge>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="destructive" className="bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-500/30 cursor-help">
                                    <AlertTriangle size={14} className="mr-1.5" /> Error
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent className="bg-popover text-popover-foreground border-border shadow-lg max-w-xs">
                                  <p className="text-sm font-semibold">Processing Error</p>
                                  <p className="text-xs">{paper.notes || "An unknown error occurred during vectorization."}</p>
                                </TooltipContent>
                              </Tooltip>
                            )
                          ) : (
                            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-500/30">
                              <Loader2 size={14} className="mr-1.5 animate-spin" /> Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="table-cell text-right">
                          <div className="flex justify-end gap-1 sm:gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="paper-action-button" onClick={() => toast.info("Download: " + paper.filename + ". URL (dev only): " + paper.fileUrl)}>
                                  <DownloadCloud size={18} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-popover text-popover-foreground border-border"><p>Download Paper</p></TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="paper-action-button delete" onClick={() => handleDeletePaper(paper.id)} disabled={deletePaperMutation.isPending && deletePaperMutation.variables === paper.id}>
                                  {(deletePaperMutation.isPending && deletePaperMutation.variables === paper.id) ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-popover text-popover-foreground border-border"><p>Delete Paper</p></TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="empty-papers-placeholder">
                <FileUp />
                <h3 className="text-xl font-semibold font-heading mt-4">No Question Papers Found</h3>
                <p className="mt-1 text-sm">
                  {searchTerm ? "Try adjusting your search terms." : "Upload your first question paper to get started!"}
                </p>
                {!searchTerm && 
                  <Button className="mt-6 btn-glow-primary" onClick={() => setIsModalOpen(true)}>
                    <FileUp className="mr-2 h-4 w-4"/> Upload First Paper
                  </Button>
                }
              </div>
            )
          )}
        </div>

        {/* Upload Paper Modal Dialog */}
        <Dialog open={isModalOpen} onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) { // Reset form on close
            setNewPaperData(initialNewPaperState);
            setSelectedFile(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
          }
        }}>
          <DialogContent className="upload-dialog-content sm:max-w-3xl"> {/* Wider modal */}
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">Upload New Question Paper</DialogTitle>
              <DialogDescription>
                Provide metadata and select a file (PDF, DOCX, TXT). This paper will be processed and added to your AI's knowledge base.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitPaper} className="space-y-6 py-2 max-h-[70vh] overflow-y-auto pr-2">
              
              {/* File Drop Area */}
              <div 
                className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <UploadCloud />
                <p><span>Click to browse</span> or drag and drop your file here.</p>
                <p className="text-xs mt-1">PDF, DOCX, TXT accepted (Max 50MB)</p>
              </div>

              {selectedFile && (
                <div className="selected-file-info animate-fade-in">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                  <Button variant="ghost" size="icon" onClick={() => {setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = "";}} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                    <X size={16}/>
                  </Button>
                </div>
              )}

              {/* Metadata Form */}
              <div className="upload-form-grid">
                <div>
                  <label htmlFor="subject" className="upload-input-label">Subject*</label>
                  <Input id="subject" name="subject" value={newPaperData.subject} onChange={handleInputChange} placeholder="e.g., Quantum Physics" className="upload-input mt-1" />
                </div>
                <div>
                  <label htmlFor="classLevel" className="upload-input-label">Class Level / Semester*</label>
                  <Input id="classLevel" name="classLevel" value={newPaperData.classLevel} onChange={handleInputChange} placeholder="e.g., MSc Sem II" className="upload-input mt-1" />
                </div>
                <div>
                  <label htmlFor="board" className="upload-input-label">Board / University*</label>
                  <Input id="board" name="board" value={newPaperData.board} onChange={handleInputChange} placeholder="e.g., IIT Bombay" className="upload-input mt-1" />
                </div>
                 <div>
                  <label htmlFor="year" className="upload-input-label">Year of Paper</label>
                  <Input id="year" name="year" type="number" value={newPaperData.year} onChange={handleInputChange} placeholder={new Date().getFullYear().toString()} className="upload-input mt-1" />
                </div>
                <div>
                  <label htmlFor="examType" className="upload-input-label">Exam Type (Optional)</label>
                  <Input id="examType" name="examType" value={newPaperData.examType} onChange={handleInputChange} placeholder="e.g., End Term, Sessional" className="upload-input mt-1" />
                </div>
                <div>
                  <label htmlFor="institution" className="upload-input-label">Institution Type (Optional)</label>
                  <Input id="institution" name="institution" value={newPaperData.institution} onChange={handleInputChange} placeholder="e.g., UG, PG, School" className="upload-input mt-1" />
                </div>
                <div>
                  <label htmlFor="department" className="upload-input-label">Department (Optional)</label>
                  <Input id="department" name="department" value={newPaperData.department} onChange={handleInputChange} placeholder="e.g., Physics Department" className="upload-input mt-1" />
                </div>
                <div>
                  <label htmlFor="courseCode" className="upload-input-label">Course Code (Optional)</label>
                  <Input id="courseCode" name="courseCode" value={newPaperData.courseCode} onChange={handleInputChange} placeholder="e.g., PHY501" className="upload-input mt-1" />
                </div>
              </div>
              
              <DialogFooter className="pt-6">
                <DialogClose asChild>
                   <Button type="button" variant="outline" className="border-muted text-muted-foreground hover:border-foreground">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="btn-glow-primary" disabled={!selectedFile || uploadPaperMutation.isPending}>
                  {uploadPaperMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4"/> }
                  Upload & Process
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </>
  );
};

export default QuestionPapers;