import React, { useState, useContext } from 'react'; // Added useContext
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer'; // Optional: remove if dashboard doesn't need a full footer
import { useAuth, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Loader2, User, BookOpen, FileText, Brain, Settings2, Menu, X } from 'lucide-react'; // Added Menu, X for mobile
import { ThemeContext } from '@/App'; // Import ThemeContext for theme value if needed (optional here as Navbar handles toggle)

// Child Components
import TeachersInfo from '@/components/dashboard/TeachersInfo';
import SubjectNotes from '@/components/dashboard/SubjectNotes';
import QuestionPapers from '@/components/dashboard/QuestionPapers';
import CustomPromptEditor from '@/components/dashboard/CustomPromptEditor';
import { Button } from '@/components/ui/button'; // For potential mobile toggle

// Component-specific styles for Dashboard
const DashboardStyles = () => (
  <style>{`
    .dashboard-page-wrapper {
      /* The theme (dark/light class) is applied on <html> by App.tsx */
      /* This component just uses the CSS variables defined in index.css */
      background-color: hsl(var(--background));
      color: hsl(var(--foreground));
      transition: background-color 0.3s ease, color 0.3s ease; /* Smooth theme transition */
    }
    .dashboard-container {
      min-height: calc(100vh - var(--navbar-height, 70px) - var(--footer-height, 0px)); /* Adjust if footer is present */
    }
    .dashboard-main-content {
      padding-top: 2rem; /* py-8 */
      padding-bottom: 3rem; /* py-12 */
    }
    .dashboard-header {
      margin-bottom: 2rem; /* mb-8 */
      padding-left: 0.25rem; /* px-1 */
      padding-right: 0.25rem; /* px-1 */
    }
    .dashboard-header-title {
      font-size: 2.25rem; /* text-3xl */
      line-height: 2.5rem;
    }
    @media (min-width: 640px) { /* sm */
      .dashboard-header-title {
        font-size: 2.75rem; /* text-4xl */
        line-height: 1;
      }
    }
    .dashboard-header-subtitle {
      margin-top: 0.5rem; /* mt-2 */
      font-size: 1.125rem; /* text-lg */
      color: hsl(var(--muted-foreground));
    }
    
    .dashboard-tabs-nav {
      display: flex;
      gap: 0.5rem; /* gap-2 */
      margin-bottom: 2rem; /* mb-8 */
      border-bottom: 1px solid hsl(var(--border));
      padding-bottom: 0.5rem;
      overflow-x: auto; /* Allow horizontal scrolling for tabs on small screens */
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    .dashboard-tabs-nav::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari, Opera */
      display: none;
    }

    .dashboard-tab-button {
      font-family: var(--font-heading);
      font-weight: 600;
      padding: 0.75rem 1.25rem; /* py-3 px-5 */
      border-radius: var(--radius-lg) var(--radius-lg) 0 0; /* Rounded top corners */
      color: hsl(var(--muted-foreground));
      background-color: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem; /* gap-2 */
      white-space: nowrap; /* Prevent tab text from wrapping */
      flex-shrink: 0; /* Prevent tabs from shrinking on small screens before scrolling */
    }
    .dashboard-tab-button:hover {
      color: hsl(var(--primary));
      background-color: hsl(var(--primary) / 0.05);
    }
    .dashboard-tab-button-active {
      color: hsl(var(--primary));
      border-bottom-color: hsl(var(--primary));
    }
    .dashboard-tab-button .lucide {
      width: 1.125rem; /* h-4.5 / w-4.5 */
      height: 1.125rem;
    }

    .dashboard-content-area {
      background-color: hsl(var(--card)); 
      border-radius: var(--radius-xl);
      padding: 1.5rem; /* p-6 */
    }
    @media (min-width: 768px) { /* md */
        .dashboard-content-area {
            padding: 2rem; /* p-8 */
        }
    }
  `}</style>
);


const dashboardTabsConfig = [ // Renamed for clarity
  { id: 'profile', label: 'My Profile', icon: User, component: TeachersInfo },
  { id: 'notes', label: 'Subject Notes', icon: BookOpen, component: SubjectNotes },
  { id: 'papers', label: 'Question Papers', icon: FileText, component: QuestionPapers },
  { id: 'ai-prompt', label: 'AI Preferences', icon: Brain, component: CustomPromptEditor },
  // { id: 'settings', label: 'Settings', icon: Settings2, component: YourSettingsComponent },
];

const TeachersDashboard = () => {
  const { isSignedIn, isLoaded } = useAuth(); // isSignedIn from useAuth
  const { theme } = useContext(ThemeContext); // Get current theme if needed for specific logic, though Navbar handles toggle
  const [activeTab, setActiveTab] = useState(dashboardTabsConfig[0].id);

  // The loading spinner in your original code was good. Let's refine it slightly.
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold font-heading">Loading Dashboard...</p>
        <p className="text-sm text-muted-foreground">Please wait a moment.</p>
      </div>
    );
  }

  // RedirectToSignIn from Clerk is more robust than Navigate for auth flows
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const ActiveComponent = dashboardTabsConfig.find(tab => tab.id === activeTab)?.component;

  return (
    <>
      <DashboardStyles />
      {/* The dashboard-page-wrapper will get dark/light class from App.tsx via html element */}
      <div className="min-h-screen flex flex-col dashboard-page-wrapper"> 
        <Navbar /> {/* Navbar has the theme toggle button */}
        <main className="flex-grow dashboard-main-content">
          <div className="container mx-auto">
            <div className="dashboard-header animate-fade-in-down">
              <h1 className="dashboard-header-title font-extrabold font-heading text-gradient-animated">
                Teacher's Dashboard
              </h1>
              <p className="dashboard-header-subtitle">
                Manage your teaching resources, AI preferences, and generate powerful assessments.
              </p>
            </div>

            <div className="dashboard-tabs-nav animate-fade-in" style={{animationDelay: '0.2s'}}>
              {dashboardTabsConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`dashboard-tab-button ${activeTab === tab.id ? 'dashboard-tab-button-active' : ''}`}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="dashboard-content-area animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              {ActiveComponent ? <ActiveComponent /> : <div>Select a tab to view its content.</div>}
            </div>
          </div>
        </main>
        {/* <Footer /> */} {/* Decide if a footer is needed here */}
      </div>
    </>
  );
};

export default TeachersDashboard;