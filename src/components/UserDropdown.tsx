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
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem> {/* MODIFIED */}
        {/* Add other items like Settings if needed */}
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={() => navigate('/chat')}>Chat</DropdownMenuItem>
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