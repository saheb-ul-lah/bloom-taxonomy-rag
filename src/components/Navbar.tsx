// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { useAuth } from '@clerk/clerk-react'; // MODIFIED: Import useAuth
import UserDropdown from '@/components/UserDropdown'; // MODIFIED: Import UserDropdown

const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth(); // MODIFIED: Get authentication status

  return (
    <header className="py-4 px-6 glass-morphism backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent animate-fade-in cursor-pointer" 
            onClick={() => navigate('/')}
          >
            QuestionGenius
          </h1>
          <span className="text-xs text-white/80">Dibrugarh University</span>
        </div>
        
        <div className="hidden md:block ml-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10">Features</NavigationMenuTrigger>
                <NavigationMenuContent className="glass-morphism">
                  {/* ... (content unchanged) ... */}
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-secondary/50 to-theme-tertiary/50 p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            QuestionGenius AI
                          </div>
                          <p className="text-sm leading-tight text-white/70">
                            Our AI-powered platform generates perfect question papers tailored to your needs
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Multiple Choice</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Generate objective questions with perfect distribution
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Custom Subjects</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Questions for any subject from Physics to Computer Science
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Smart Distribution</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Set your preferred marks distribution across question types
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} href="#">
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              {isSignedIn && ( // MODIFIED: Only show Dashboard if signed in
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} 
                    onClick={() => navigate('/dashboard')}
                    style={{ cursor: 'pointer' }}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isSignedIn ? ( // MODIFIED: Show UserDropdown if signed in
          <UserDropdown />
        ) : (
          <>
            <Button 
              variant="outline" 
              className="hidden md:flex text-white border-white hover:bg-white/20 animate-fade-in transition-all duration-300" 
              onClick={() => navigate('/sign-in')} // MODIFIED: Navigate to /sign-in
            >
              Login
            </Button>
            <Button 
              className="hidden md:flex bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:bg-yellow-400 animate-fade-in transition-all duration-300" 
              onClick={() => navigate('/sign-up')} // MODIFIED: Navigate to /sign-up
            >
              Get Started
            </Button>
          </>
        )}
        
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
          <Menu /> {/* TODO: Implement mobile menu toggle and links */}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;