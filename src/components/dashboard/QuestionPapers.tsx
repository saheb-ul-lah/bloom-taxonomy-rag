//src/components/dashboard/QuestionPapers.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { FilePlus, Trash2, FileText, Download } from "lucide-react";

interface QuestionPaper {
  id: string;
  subject: string;
  year: string;
  examType: string;
  totalMarks: number;
  filename: string;
  uploadDate: string;
}

const QuestionPapers: React.FC = () => {
  const [papers, setPapers] = useState<QuestionPaper[]>([
    {
      id: '1',
      subject: 'Mathematics',
      year: '2024',
      examType: 'Mid Term',
      totalMarks: 50,
      filename: 'math_midterm_2024.pdf',
      uploadDate: '2025-05-01'
    },
    {
      id: '2',
      subject: 'Physics',
      year: '2024',
      examType: 'Final',
      totalMarks: 100,
      filename: 'physics_final_2024.pdf',
      uploadDate: '2025-05-03'
    },
    {
      id: '3',
      subject: 'Computer Science',
      year: '2024',
      examType: 'Mid Term',
      totalMarks: 60,
      filename: 'cs_midterm_2024.pdf',
      uploadDate: '2025-05-06'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaper, setNewPaper] = useState<Omit<QuestionPaper, 'id' | 'uploadDate'>>({
    subject: '',
    year: new Date().getFullYear().toString(),
    examType: '',
    totalMarks: 100,
    filename: ''
  });
  
  const handleAddPaper = () => {
    if (newPaper.subject && newPaper.examType && newPaper.filename) {
      const newId = Date.now().toString();
      const currentDate = new Date().toISOString().split('T')[0];
      
      setPapers([...papers, {
        id: newId,
        ...newPaper,
        uploadDate: currentDate
      }]);
      
      setNewPaper({
        subject: '',
        year: new Date().getFullYear().toString(),
        examType: '',
        totalMarks: 100,
        filename: ''
      });
      
      setShowAddForm(false);
    }
  };
  
  const handleDeletePaper = (id: string) => {
    setPapers(papers.filter(paper => paper.id !== id));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewPaper({...newPaper, filename: file.name});
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Question Papers</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Upload Question Paper
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Upload Question Paper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Subject</label>
                <Input 
                  value={newPaper.subject} 
                  onChange={(e) => setNewPaper({...newPaper, subject: e.target.value})}
                  placeholder="e.g. Mathematics"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Year</label>
                <Input 
                  value={newPaper.year} 
                  onChange={(e) => setNewPaper({...newPaper, year: e.target.value})}
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Exam Type</label>
                <Input 
                  value={newPaper.examType} 
                  onChange={(e) => setNewPaper({...newPaper, examType: e.target.value})}
                  placeholder="e.g. Mid Term, Final"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Total Marks</label>
                <Input 
                  type="number"
                  value={newPaper.totalMarks} 
                  onChange={(e) => setNewPaper({...newPaper, totalMarks: parseInt(e.target.value)})}
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Upload File</label>
              <Input 
                type="file" 
                onChange={handleFileChange}
                className="bg-theme-secondary/20 border-theme-tertiary/30"
                accept=".pdf,.doc,.docx"
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
              onClick={handleAddPaper}
              className="bg-theme-primary hover:bg-theme-primary/80"
              disabled={!newPaper.filename}
            >
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
                <TableHead className="text-white">Subject</TableHead>
                <TableHead className="text-white">Year</TableHead>
                <TableHead className="text-white">Exam Type</TableHead>
                <TableHead className="text-white">Total Marks</TableHead>
                <TableHead className="text-white">Filename</TableHead>
                <TableHead className="text-white">Upload Date</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper) => (
                <TableRow key={paper.id} className="border-b-theme-tertiary/20">
                  <TableCell>{paper.subject}</TableCell>
                  <TableCell>{paper.year}</TableCell>
                  <TableCell>{paper.examType}</TableCell>
                  <TableCell>{paper.totalMarks}</TableCell>
                  <TableCell>{paper.filename}</TableCell>
                  <TableCell>{paper.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-theme-tertiary/20">
                        <Download size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeletePaper(paper.id)}
                        className="h-8 w-8 text-white/50 hover:text-white hover:bg-theme-tertiary/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPapers;