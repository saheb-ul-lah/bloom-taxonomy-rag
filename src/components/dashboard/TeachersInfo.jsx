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


