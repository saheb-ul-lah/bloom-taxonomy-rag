//src/components/dashboard/TeachersInfo.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCircle, Edit2, Save } from "lucide-react";

interface TeacherInfoData {
  name: string;
  department: string;
  semester: string;
  email: string;
}

const TeacherInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState<TeacherInfoData>({
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    semester: "Fall 2025",
    email: "sarahjohnson@university.edu"
  });
  
  const [editForm, setEditForm] = useState<TeacherInfoData>({...teacherInfo});
  
  const handleSave = () => {
    setTeacherInfo(editForm);
    setIsEditing(false);
  };
  
  return (
    <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-white">Teacher Information</CardTitle>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="h-8 w-8 text-white/70 hover:text-white"
        >
          {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex justify-center items-center">
            <div className="bg-theme-secondary/30 rounded-full p-8 border-2 border-theme-tertiary/30">
              <UserCircle className="w-16 h-16 text-white/80" />
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Name</label>
                  <Input 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Department</label>
                  <Input 
                    value={editForm.department} 
                    onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Semester</label>
                  <Input 
                    value={editForm.semester} 
                    onChange={(e) => setEditForm({...editForm, semester: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <Input 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-white/70">Name</p>
                  <p className="font-semibold text-white">{teacherInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Department</p>
                  <p className="font-semibold text-white">{teacherInfo.department}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Semester</p>
                  <p className="font-semibold text-white">{teacherInfo.semester}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-semibold text-white">{teacherInfo.email}</p>
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