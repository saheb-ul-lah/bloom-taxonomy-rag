import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCircle, Edit3, Save, Loader2, Mail, Building, BookUser, Image as ImageIcon } from "lucide-react"; // Updated Icons
import { toast } from '@/components/ui/sonner';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Component-specific styles
const TeacherInfoStyles = () => (
  <style>{`
    .info-card {
      background-color: hsl(var(--background)); /* Slightly different from main card bg for depth */
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-xl);
      padding: 2rem; /* p-8 */
      box-shadow: var(--shadow-medium);
      transition: all 0.3s ease-in-out;
    }
    .info-card:hover {
      box-shadow: 0 10px 25px hsl(var(--primary) / 0.15);
    }
    
    .profile-avatar-large {
      width: 120px; /* w-30 */
      height: 120px; /* h-30 */
      border-radius: var(--radius-full); /* rounded-full */
      border: 4px solid hsl(var(--primary));
      box-shadow: 0 0 15px hsl(var(--primary) / 0.3);
    }
    .profile-avatar-large .avatar-fallback-large {
      font-size: 2.5rem; /* text-4xl */
      font-family: var(--font-heading);
    }

    .info-field {
      margin-bottom: 1.5rem; /* space-y-6 in spirit */
    }
    .info-field label {
      display: block;
      font-size: 0.875rem; /* text-sm */
      font-weight: 500;
      color: hsl(var(--muted-foreground));
      margin-bottom: 0.375rem; /* mb-1.5 */
      font-family: var(--font-sans);
    }
    .info-field .value, .info-field input {
      font-size: 1rem; /* text-base */
      color: hsl(var(--foreground));
      font-family: var(--font-sans);
    }
    .info-field .value {
      font-weight: 500;
    }
    .info-field input {
      background-color: hsl(var(--input));
      border-color: hsl(var(--border));
      border-radius: var(--radius-lg);
      padding: 0.75rem 1rem; /* py-3 px-4 */
    }
    .info-field input:focus {
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
    }
    .edit-button-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 1.5rem; /* mt-6 */
    }
  `}</style>
);

const initialTeacherInfo = {
  name: "",
  department: "",
  institution: "",
  email: "",
  // imageUrl: "" // If you plan to allow custom image uploads
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
        if (error.status === 404) return null;
        throw error;
      }
    },
    enabled: !!userId,
    onSuccess: (data) => {
      const baseInfo = {
        name: clerkUser?.fullName || '',
        email: clerkUser?.primaryEmailAddress?.emailAddress || '',
        department: '',
        institution: '',
        // imageUrl: clerkUser?.imageUrl || '', // Use clerk image by default
      };
      if (data) {
        setEditForm({ ...baseInfo, ...data });
      } else {
        setEditForm(baseInfo);
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
  
  // Fallback to clerkUser data if teacherInfo is loading or not yet fetched
  const displayInfo = teacherInfo || editForm;

  if (isLoadingInfo && !clerkUser) {
    return <div className="flex justify-center items-center p-10"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;
  }
  if (infoError && !clerkUser) {
    return <div className="p-6 text-destructive bg-destructive/10 rounded-lg">Error: {infoError.message}</div>;
  }

  return (
    <>
      <TeacherInfoStyles />
      <div className="info-card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-8 pb-8 border-b border-border">
          <div className="relative group">
            <Avatar className="profile-avatar-large">
              <AvatarImage src={clerkUser?.imageUrl || displayInfo.imageUrl} alt={displayInfo.name || 'User'} />
              <AvatarFallback className="avatar-fallback-large bg-primary/20 text-primary">
                {displayInfo.name ? displayInfo.name.split(' ').map(n => n[0]).join('').toUpperCase() : <UserCircle size={60} />}
              </AvatarFallback>
            </Avatar>
            {/* Placeholder for image upload button if you implement it */}
            {/* <Button variant="outline" size="icon" className="absolute bottom-2 right-2 bg-card p-1.5 rounded-full shadow-md group-hover:opacity-100 opacity-0 transition-opacity">
              <ImageIcon size={16} />
            </Button> */}
          </div>

          <div className="text-center sm:text-left flex-grow">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-1">
              {isEditing ? editForm.name : displayInfo.name || 'Your Name'}
            </h2>
            <p className="text-md text-muted-foreground flex items-center justify-center sm:justify-start">
              <Mail size={16} className="mr-2 opacity-70" />
              {isEditing ? editForm.email : displayInfo.email || 'your.email@example.com'}
            </p>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="mt-4 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary group"
              >
                <Edit3 size={16} className="mr-2 transition-transform duration-300 group-hover:rotate-[-15deg]" /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <div className="info-field">
                <label htmlFor="name">Full Name</label>
                <Input id="name" name="name" value={editForm.name} onChange={handleInputChange} placeholder="Enter your full name" />
              </div>
              <div className="info-field">
                <label htmlFor="email">Email Address</label>
                <Input id="email" name="email" type="email" value={editForm.email} onChange={handleInputChange} placeholder="Enter your email" />
              </div>
              <div className="info-field">
                <label htmlFor="department">Department</label>
                <Input id="department" name="department" value={editForm.department} onChange={handleInputChange} placeholder="e.g., Computer Science" />
              </div>
              <div className="info-field">
                <label htmlFor="institution">Institution</label>
                <Input id="institution" name="institution" value={editForm.institution} onChange={handleInputChange} placeholder="e.g., Dibrugarh University" />
              </div>
            </div>
            <div className="edit-button-container gap-3">
              <Button variant="outline" onClick={() => { setIsEditing(false); setEditForm(teacherInfo || initialTeacherInfo);}} className="border-muted text-muted-foreground hover:border-foreground">
                Cancel
              </Button>
              <Button type="submit" className="btn-glow-primary" disabled={saveProfileMutation.isPending}>
                {saveProfileMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save size={16} className="mr-2" />}
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="info-field">
              <label>Department</label>
              <p className="value flex items-center gap-2">
                <BookUser size={18} className="opacity-60" />
                {displayInfo.department || <span className="italic text-muted-foreground/70">Not Set</span>}
              </p>
            </div>
            <div className="info-field">
              <label>Institution</label>
              <p className="value flex items-center gap-2">
                <Building size={18} className="opacity-60" />
                {displayInfo.institution || <span className="italic text-muted-foreground/70">Not Set</span>}
              </p>
            </div>
            {/* Add more read-only fields here if needed */}
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherInfo;