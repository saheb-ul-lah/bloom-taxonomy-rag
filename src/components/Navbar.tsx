// src/components/Navbar.tsx

import React, { useContext } from 'react'; // Added useContext
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
import { Menu, Sun, Moon, LogIn, UserPlus, LayoutDashboard, Home, Sparkles } from "lucide-react"; // Added more icons
import { useAuth } from '@clerk/clerk-react';
import UserDropdown from '@/components/UserDropdown';
import { ThemeContext } from '@/App'; // Import ThemeContext

// Component-specific styles
const NavbarStyles = () => (
  <style>{`
    .navbar-link {
      font-family: var(--font-sans); /* Poppins */
      position: relative;
      transition: color 0.3s ease;
      padding: 0.5rem 0.75rem;
    }
    .navbar-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      background-color: hsl(var(--primary));
      transition: width 0.3s ease;
    }
    .navbar-link:hover::after,
    .navbar-link-active::after { /* For active state if needed */
      width: 70%;
    }
    .navbar-link:hover {
      color: hsl(var(--primary));
    }

    .nav-menu-content {
      background-color: hsl(var(--popover)) !important;
      border-color: hsl(var(--border)) !important;
      box-shadow: var(--shadow-medium);
    }
    .nav-menu-content .nav-menu-item-link {
      color: hsl(var(--foreground));
      background-color: transparent;
    }
    .nav-menu-content .nav-menu-item-link:hover {
      background-color: hsl(var(--accent) / 0.1) !important;
      color: hsl(var(--primary));
    }
    .nav-menu-content .nav-menu-item-title {
      color: hsl(var(--foreground));
      font-weight: 500;
    }
    .nav-menu-content .nav-menu-item-description {
      color: hsl(var(--muted-foreground));
    }
    .nav-menu-highlight-link { /* For the featured link in dropdown */
      background-image: linear-gradient(to right, hsl(var(--gradient-start)/0.8), hsl(var(--gradient-end)/0.8));
    }
    .dark .nav-menu-highlight-link {
      background-image: linear-gradient(to right, hsl(var(--gradient-start)/0.6), hsl(var(--gradient-end)/0.6));
    }
    .nav-menu-highlight-link .nav-menu-item-title,
    .nav-menu-highlight-link .nav-menu-item-description {
      color: hsl(var(--primary-foreground)) !important; /* Ensure text is readable on gradient */
    }
  `}</style>
);


const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext); // Use theme context

  return (
    <>
      <NavbarStyles />
      <header className="py-3 px-4 md:px-6 sticky top-0 z-50 w-full glass-pane animate-fade-in-down"
              style={{ animationDuration: '0.7s' }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <Sparkles className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-[360deg] group-hover:scale-110" />
              <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gradient-animated">
                QuestionGenius
              </h1>
            </div>
            {/* <span className="text-xs text-muted-foreground hidden sm:block">by Dibrugarh University</span> */}
          </div>

          <div className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#" // Replace with actual path or onClick
                    className={`${navigationMenuTriggerStyle()} navbar-link bg-transparent hover:bg-transparent focus:bg-transparent text-foreground`}
                  >
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#" // Replace with actual path or onClick
                    className={`${navigationMenuTriggerStyle()} navbar-link bg-transparent hover:bg-transparent focus:bg-transparent text-foreground`}
                  >
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Example of a dropdown - keep if useful, or remove if only direct links */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} navbar-link bg-transparent hover:bg-transparent focus:bg-transparent text-foreground`}>
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="nav-menu-content">
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] lg:w-[500px] md:grid-cols-2">
                      <ListItem href="/docs" title="Documentation" className="nav-menu-item-link">
                        <span className="nav-menu-item-description">Comprehensive guides and API specs.</span>
                      </ListItem>
                      <ListItem href="/blog" title="Blog" className="nav-menu-item-link">
                        <span className="nav-menu-item-description">Latest articles and insights.</span>
                      </ListItem>
                      <ListItem href="/faq" title="FAQ" className="nav-menu-item-link">
                       <span className="nav-menu-item-description">Answers to common questions.</span>
                      </ListItem>
                      <ListItem href="/support" title="Support" className="nav-menu-item-link">
                        <span className="nav-menu-item-description">Get help from our team.</span>
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {isSignedIn && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => navigate('/dashboard')}
                      className={`${navigationMenuTriggerStyle()} navbar-link bg-transparent hover:bg-transparent focus:bg-transparent text-foreground cursor-pointer`}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {isSignedIn ? (
              <UserDropdown />
            ) : (
              <>
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary rounded-lg transition-all duration-300 group"
                  onClick={() => navigate('/sign-in')}
                >
                  <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  Login
                </Button>
                <Button
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-tertiary text-primary-foreground hover:opacity-90 shadow-soft hover:shadow-medium rounded-lg transition-all duration-300 group btn-glow-primary"
                  onClick={() => navigate('/sign-up')}
                >
                  Get Started
                  <UserPlus className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </Button>
              </>
            )}

            <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:bg-muted/50">
              <Menu className="h-6 w-6"/> {/* TODO: Implement mobile menu toggle and links */}
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

// Helper component for NavigationMenu items (if using complex dropdowns)
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 focus:bg-accent/10 ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none nav-menu-item-title">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug nav-menu-item-description">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export default Navbar;