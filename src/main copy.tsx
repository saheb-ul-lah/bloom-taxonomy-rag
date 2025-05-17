// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // Make sure this is .jsx
import './index.css';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) { throw new Error("Missing Publishable Key") }

// This is less ideal because ClerkProvider's navigate prop won't work as easily
// if BrowserRouter is inside App. Clerk needs to be able to control navigation.
// The setup below assumes Clerk's default navigation or component-level redirects will mostly handle it.
// If you need fine-grained control via Clerk's navigate prop, the structure with
// BrowserRouter -> ClerkProvider -> App (where App doesn't have BrowserRouter) is better.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      // signInFallbackRedirectUrl="/sign-in" // Optional: if user hits protected route
      // signUpFallbackRedirectUrl="/sign-up" // Optional
      // afterSignInUrl="/dashboard" // Central place for after sign-in
      // afterSignUpUrl="/dashboard" // Central place for after sign-up
    >
      <App /> {/* App.jsx contains BrowserRouter */}
    </ClerkProvider>
  </React.StrictMode>,
)