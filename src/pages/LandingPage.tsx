import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle, Zap, Brain, Users, Lightbulb, ShieldCheck, FileText, BarChart3, ChevronDown, MessageSquareQuote, Star,
  BookOpen, Settings, Target, Layers, Search, Palette, Code, Clock, TrendingUp, Award, HelpCircle, Maximize, Minimize, MoveRight, SlidersHorizontal, Edit3, Loader2
} from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // For pricing features
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // For a potential interactive demo section

// Helper for scroll animations
const useScrollAnimation = (animationClass = 'animate-fade-in-up', threshold = 0.1) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass, 'opacity-100');
            entry.target.classList.remove('opacity-0');
            // Optional: unobserve after animation to save resources
            // observer.unobserve(entry.target); 
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      el.classList.add('opacity-0'); // Initially hide
      observer.observe(el);
    });

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [animationClass, threshold]);
};

// Parallax effect hook (simple version)
const useParallax = (speed = 0.1) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { transform: `translateY(${offsetY * speed}px)` };
};


// Component-specific styles (This will be very long)
const LandingPageStyles = () => (
  <style>{`
    /* General Section Styling */
    .landing-section {
      padding-top: 5rem; /* 80px */
      padding-bottom: 5rem; /* 80px */
      position: relative;
      overflow: hidden; 
    }
    @media (min-width: 768px) {
      .landing-section {
        padding-top: 7rem; /* 112px */
        padding-bottom: 7rem; /* 112px */
      }
    }
    .landing-section-sm {
      padding-top: 3rem; padding-bottom: 3rem;
    }
     @media (min-width: 768px) {
      .landing-section-sm {
        padding-top: 5rem; padding-bottom: 5rem;
      }
    }
    .section-bg-subtle {
      background-color: hsl(var(--muted) / 0.15);
    }
    .dark .section-bg-subtle {
      background-color: hsl(var(--muted) / 0.05);
    }
    .section-bg-gradient {
      background-image: linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.1) 50%, hsl(var(--background)) 100%);
    }
    .dark .section-bg-gradient {
      background-image: linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.03) 50%, hsl(var(--background)) 100%);
    }

    /* Typography */
    .section-supertitle {
      display: inline-block;
      font-size: 0.875rem; /* text-sm */
      font-weight: 600;
      font-family: var(--font-heading);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      margin-bottom: 1rem;
      background-image: linear-gradient(to right, hsl(var(--primary)/0.1), hsl(var(--accent)/0.15));
      color: hsl(var(--primary));
      border: 1px solid hsl(var(--primary)/0.2);
    }
    .section-title {
      font-size: 2.25rem; /* text-3xl */
      font-weight: 800; /* extrabold */
      font-family: var(--font-heading);
      line-height: 1.2;
      color: hsl(var(--foreground));
    }
     @media (min-width: 768px) { /* md */
      .section-title { font-size: 3rem; /* text-5xl */ }
    }
    .section-description {
      font-size: 1.125rem; /* text-lg */
      color: hsl(var(--muted-foreground));
      margin-top: 1rem;
      max-width: 700px; /* Limit width for readability */
      margin-left: auto;
      margin-right: auto;
    }

    /* Gradient Text */
    .gradient-text-brand {
      background-image: linear-gradient(to right, hsl(var(--brand-primary)), hsl(var(--brand-accent)));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .gradient-text-primary-accent {
      background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    /* Decorative Blob Elements */
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px); /* Increased blur */
      opacity: 0.15;
      z-index: -1;
      animation: blob-float 20s infinite ease-in-out alternate;
    }
    .dark .blob { opacity: 0.1; }
    @keyframes blob-float {
      0% { transform: translateY(0px) translateX(0px) scale(1); }
      100% { transform: translateY(-30px) translateX(20px) scale(1.05); }
    }

    /* Hero Section Specifics */
    .hero-section { min-height: 90vh; display: flex; align-items: center; }
    .hero-image-container {
      perspective: 1000px;
    }
    .hero-image {
      border-radius: var(--radius-2xl);
      box-shadow: 0 25px 50px -12px hsl(var(--primary) / 0.25), 0 0 30px hsl(var(--accent) / 0.15);
      transform: rotateY(-5deg) rotateX(3deg);
      transition: transform 0.5s ease-out;
    }
    .hero-image-container:hover .hero-image {
      transform: rotateY(0deg) rotateX(0deg) scale(1.03);
    }
    
    /* Feature Card Styling */
    .feature-card-landing {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border) / 0.5); /* Softer border */
      border-radius: var(--radius-xl);
      padding: 1.75rem; /* p-7 */
      transition: all 0.3s ease-in-out;
      box-shadow: 0 4px 6px -1px hsl(var(--foreground) / 0.03), 0 2px 4px -2px hsl(var(--foreground) / 0.03);
      height: 100%; /* For equal height cards in grid */
      display: flex;
      flex-direction: column;
    }
    .feature-card-landing:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 25px -5px hsl(var(--primary) / 0.1), 0 8px 10px -6px hsl(var(--primary) / 0.1);
      border-color: hsl(var(--primary) / 0.4);
    }
    .feature-icon-landing {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.875rem; /* p-3.5 */
      border-radius: var(--radius-lg);
      margin-bottom: 1.25rem; /* mb-5 */
      background-image: linear-gradient(to br, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15));
      color: hsl(var(--primary));
      box-shadow: 0 2px 4px hsl(var(--primary)/0.1);
    }
    .dark .feature-icon-landing {
      background-image: linear-gradient(to br, hsl(var(--primary) / 0.25), hsl(var(--accent) / 0.25));
    }
    .feature-card-title {
      font-size: 1.25rem; /* text-xl */
      font-weight: 700;
      font-family: var(--font-heading);
      color: hsl(var(--foreground));
      margin-bottom: 0.5rem;
    }
    .feature-card-description {
      font-size: 0.95rem; /* Slightly larger than text-sm */
      color: hsl(var(--muted-foreground));
      line-height: 1.6;
      flex-grow: 1; /* Pushes actions to bottom if any */
    }

    /* How It Works Section */
    .how-it-works-step {
      position: relative;
      padding: 1.5rem;
      background-color: hsl(var(--card));
      border-radius: var(--radius-xl);
      border: 1px solid hsl(var(--border)/0.5);
      box-shadow: var(--shadow-soft);
      margin-bottom: 2rem;
    }
    .how-it-works-step-number {
      position: absolute;
      top: -1.25rem;
      left: 1.5rem;
      width: 2.5rem; /* w-10 */
      height: 2.5rem; /* h-10 */
      border-radius: 9999px; /* rounded-full */
      background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--tertiary)));
      color: hsl(var(--primary-foreground));
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.125rem;
      font-family: var(--font-heading);
      box-shadow: 0 4px 10px hsl(var(--primary)/0.3);
    }
    .how-it-works-icon { margin-bottom: 1rem; }
    
    /* Testimonial Card Styling */
    .testimonial-card {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-xl); /* More rounded */
      padding: 2rem; /* Increased padding */
      box-shadow: var(--shadow-medium); /* Softer shadow */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .testimonial-avatar {
      width: 60px; /* w-15 */
      height: 60px; /* h-15 */
      border-radius: 9999px;
      border: 3px solid hsl(var(--primary)); /* Thicker border */
      box-shadow: 0 0 10px hsl(var(--primary)/0.2);
    }
    .testimonial-quote {
      font-size: 1.05rem; /* Slightly larger */
      font-style: italic;
      color: hsl(var(--foreground));
      line-height: 1.7;
      margin-bottom: 1.5rem; /* More space */
      flex-grow: 1;
    }
    .testimonial-quote .lucide { margin-right: 0.5rem; opacity: 0.5; }
    .testimonial-name {
      font-weight: 600;
      font-family: var(--font-heading);
      color: hsl(var(--foreground));
    }
    .testimonial-title {
      font-size: 0.875rem;
      color: hsl(var(--muted-foreground));
    }
    .testimonial-stars { margin-top: 0.75rem; }

    /* FAQ Accordion Styling */
    .faq-accordion-item {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border)/0.7) !important;
      border-radius: var(--radius-lg);
      transition: box-shadow 0.3s ease;
    }
    .faq-accordion-item:hover {
      box-shadow: var(--shadow-medium);
    }
    .faq-accordion-trigger {
      color: hsl(var(--foreground)) !important;
      font-weight: 600; /* Bolder */
      font-family: var(--font-heading);
      padding: 1.25rem 1.5rem !important; /* More padding */
      font-size: 1.125rem; /* text-lg */
      text-align: left;
    }
    .faq-accordion-trigger:hover {
      color: hsl(var(--primary)) !important;
      background-color: transparent !important;
    }
    .faq-accordion-trigger[data-state="open"] {
      color: hsl(var(--primary)) !important;
    }
    .faq-accordion-content {
      color: hsl(var(--muted-foreground)) !important;
      padding: 0 1.5rem 1.25rem 1.5rem !important; /* Adjust padding */
      font-size: 1rem;
      line-height: 1.7;
    }

    /* Pricing Section */
    .pricing-card {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: var(--shadow-medium);
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: all 0.3s ease;
    }
    .pricing-card.featured {
      border-color: hsl(var(--primary));
      box-shadow: 0 0 30px hsl(var(--primary)/0.2), var(--shadow-lg);
      transform: scale(1.03); /* Slightly pop featured card */
    }
    .pricing-card:hover:not(.featured) {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px hsl(var(--foreground) / 0.05);
    }
    .pricing-card-title {
      font-size: 1.5rem; font-weight: 700; font-family: var(--font-heading); color: hsl(var(--primary));
    }
    .pricing-card-price {
      font-size: 2.5rem; font-weight: 800; font-family: var(--font-heading); color: hsl(var(--foreground)); margin: 0.5rem 0;
    }
    .pricing-card-price span { font-size: 1rem; font-weight: 500; color: hsl(var(--muted-foreground));}
    .pricing-card-description { font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-bottom: 1.5rem;}
    .pricing-feature-list { list-style: none; padding: 0; margin: 0 0 2rem 0; flex-grow: 1; }
    .pricing-feature-list li { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; color: hsl(var(--foreground)); font-size: 0.95rem; }
    .pricing-feature-list .lucide-check-circle { color: hsl(var(--brand-primary));}
    .pricing-feature-list .lucide-x-circle { color: hsl(var(--muted-foreground)); opacity: 0.7;}
    .pricing-card .btn-glow-primary, .pricing-card .btn-outline-cool { width: 100%; padding-top: 0.75rem; padding-bottom: 0.75rem; font-size: 1rem;}

    /* CTA Section */
    .cta-section-landing {
      background-image: linear-gradient(135deg, hsl(var(--gradient-start)/0.9) 0%, hsl(var(--gradient-middle)/0.9) 50%, hsl(var(--gradient-end)/0.9) 100%);
      border-radius: var(--radius-2xl);
      color: white; /* Ensure readability on gradient */
      padding: 3rem 2rem;
    }
    .dark .cta-section-landing {
       background-image: linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-middle)) 50%, hsl(var(--gradient-end)) 100%);
    }
    .cta-section-landing h2 { color: white !important; }
    .cta-section-landing p { color: hsl(0 0% 100% / 0.85) !important; }

    /* Interactive Demo Section */
    .demo-tabs-list {
      background-color: hsl(var(--muted) / 0.3) !important;
      border-radius: var(--radius-lg) !important;
      padding: 0.375rem !important; /* p-1.5 */
    }
    .demo-tabs-trigger {
      color: hsl(var(--muted-foreground)) !important;
      font-weight: 500;
      border-radius: var(--radius-md) !important;
      padding: 0.5rem 1rem !important;
      transition: all 0.3s ease;
    }
    .demo-tabs-trigger[data-state="active"] {
      background-color: hsl(var(--primary)) !important;
      color: hsl(var(--primary-foreground)) !important;
      box-shadow: var(--shadow-medium);
    }
    .demo-content-area {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      margin-top: 1rem;
      min-height: 300px;
    }

    /* Additional utility for subtle borders on containers */
    .container-bordered {
      border: 1px solid hsl(var(--border)/0.3);
      border-radius: var(--radius-xl);
      padding: 2rem;
      background-color: hsl(var(--card)/0.5);
    }

    /* General Button Styles for Landing Page Actions */
    .lp-button-primary {
      @apply btn-glow-primary text-base px-8 py-3 rounded-xl group;
      /* Ensure it uses the class from index.css or define similar here */
      /* Example: background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--tertiary))); ... */
    }
    .lp-button-secondary {
      @apply border-2 border-primary/70 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary group;
      font-weight: 500;
      padding: 0.625rem 1.875rem; /* Equivalent to py-2.5 px-7.5 */
      border-radius: var(--radius-xl);
      font-size: 1rem; /* text-base */
      transition: all 0.3s ease;
    }
  `}</style>
);

const LandingPage: React.FC = () => {
  useScrollAnimation();
  const parallaxHeroImage = useParallax(0.15);
  const parallaxBgPattern = useParallax(-0.05);
  const navigate = useNavigate();

  const heroWords = ["smarter", "faster", "impactful", "targeted"];
  
  const coreFeatures = [
    {
      icon: Brain, title: "AI-Powered Generation",
      description: "Harness advanced AI to instantly create diverse, relevant questions across all cognitive levels defined by Bloom's Taxonomy.",
    },
    {
      icon: BarChart3, title: "Bloom's Taxonomy Mastery",
      description: "Precisely align assessments with Remember, Understand, Apply, Analyze, Evaluate, and Create levels for effective learning outcomes.",
    },
    {
      icon: Layers, title: "RAG-Powered Context",
      description: "Upload your own notes, textbooks, and past papers. Our AI generates questions grounded in YOUR specific curriculum and materials.",
    },
    {
      icon: SlidersHorizontal, title: "Deep Customization",
      description: "Fine-tune question types, difficulty, topics, mark distribution, and paper structure with intuitive controls. Adapt to any need.",
    },
    {
      icon: Clock, title: "Save Precious Time",
      description: "Drastically reduce the hours spent on manual question creation. Focus on teaching, not tedious paperwork.",
    },
    {
      icon: ShieldCheck, title: "Secure & Teacher-Centric",
      description: "Your uploaded materials and generated content are private and secure, designed with educators' needs at the core.",
    },
  ];

  const howItWorksSteps = [
    { icon: FileText, title: "1. Upload Your Content", description: "Securely add PDF, DOCX, or TXT files – lecture notes, textbook chapters, or even plain text notes." },
    { icon: Edit3, title: "2. Define Your Needs", description: "Specify target Bloom's levels, question types, difficulty, marks, and custom AI instructions." },
    { icon: Zap, title: "3. AI Generates Magically", description: "Our intelligent system analyzes your content and crafts tailored questions in moments." },
    { icon: CheckCircle, title: "4. Review & Perfect", description: "Easily review, edit, and assemble your ideal question paper, ready for your students." },
  ];

  const useCases = [
    {
      icon: Award, title: "Summative Assessments",
      description: "Create comprehensive final exams, mid-terms, or standardized tests covering broad curriculum areas with balanced cognitive skills.",
      link: "#"
    },
    {
      icon: Lightbulb, title: "Formative Quizzes",
      description: "Quickly generate targeted quizzes to check understanding, identify learning gaps, and provide timely feedback during instruction.",
      link: "#"
    },
    {
      icon: Users, title: "Differentiated Learning",
      description: "Develop varied question sets for different student groups, catering to diverse learning paces and cognitive abilities.",
      link: "#"
    },
    {
      icon: BookOpen, title: "Study Material Creation",
      description: "Generate practice questions, revision guides, and topic summaries based on your lecture notes or textbook chapters.",
      link: "#"
    },
    {
      icon: TrendingUp, title: "Curriculum Development",
      description: "Analyze existing assessments for Bloom's coverage or generate new item banks aligned with curriculum standards.",
      link: "#"
    },
    {
      icon: Palette, title: "Creative Pedagogy",
      description: "Experiment with novel question types and higher-order thinking challenges to foster deeper student engagement.",
      link: "#"
    },
  ];

  const testimonials = [
    {
      quote: "QuestionGenius AI is a true game-changer. The Bloom's Taxonomy integration and RAG capabilities save me countless hours. My assessments are now more targeted and effective than ever before!",
      name: "Dr. Eleanor Vance",
      title: "University Professor, Educational Technology",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg" 
    },
    {
      quote: "I was skeptical about AI in question generation, but QuestionGenius AI won me over. The quality of questions, especially when using my own uploaded notes, is outstanding. It's like having a brilliant teaching assistant.",
      name: "Mr. Samuel Green",
      title: "AP History Teacher, Northwood High",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The customization options are fantastic. I can set exact mark distributions and tailor the AI's style with custom prompts. It's incredibly flexible and powerful. Highly recommended for any serious educator.",
      name: "Ms. Aisha Khan",
      title: "Curriculum Designer & Assessment Specialist",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg"
    },
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$0",
      frequency: "/month",
      description: "Perfect for trying out core features.",
      features: [
        { text: "5 AI Question Generation runs/month", included: true },
        { text: "Basic Bloom's Taxonomy targeting", included: true },
        { text: "Upload up to 3 documents (RAG)", included: true },
        { text: "Limited customization options", included: true },
        { text: "Community support", included: true },
        { text: "Advanced RAG context", included: false },
        { text: "Unlimited AI runs", included: false },
      ],
      cta: "Start for Free",
      primary: false,
    },
    {
      name: "Pro Educator",
      price: "$19",
      frequency: "/month",
      description: "For individual teachers wanting full power.",
      features: [
        { text: "100 AI Question Generation runs/month", included: true },
        { text: "Full Bloom's Taxonomy control", included: true },
        { text: "Upload up to 50 documents (RAG)", included: true },
        { text: "Advanced customization & AI prompts", included: true },
        { text: "Priority email support", included: true },
        { text: "Advanced RAG context linking", included: true },
        { text: "Detailed analytics (soon)", included: true },
      ],
      cta: "Choose Pro",
      primary: true,
    },
    {
      name: "Institution",
      price: "Custom",
      frequency: "",
      description: "Tailored solutions for schools & districts.",
      features: [
        { text: "Unlimited AI Question Generation runs", included: true },
        { text: "All Pro features included", included: true },
        { text: "Admin dashboard & user management", included: true },
        { text: "Custom RAG knowledge base setup", included: true },
        { text: "Dedicated support & onboarding", included: true },
        { text: "Volume discounts & custom SLAs", included: true },
        { text: "LMS Integration (soon)", included: true },
      ],
      cta: "Contact Sales",
      primary: false,
    },
  ];

  const faqs = [
    { question: "What is QuestionGenius AI?", answer: "QuestionGenius AI is an intelligent platform designed to help educators create high-quality, customized question papers and learning materials using advanced AI, with a special focus on Bloom's Taxonomy and Retrieval Augmented Generation (RAG) from your own content." },
    { question: "How does the RAG system work?", answer: "You can upload your own subject notes, textbooks, or past papers (PDF, DOCX, TXT). Our AI then uses this specific knowledge base to generate questions that are highly relevant to your curriculum and teaching style, rather than relying solely on general knowledge." },
    { question: "Can I really customize questions to specific Bloom's Taxonomy levels?", answer: "Yes! This is a core feature. You can explicitly target different cognitive skills from Remembering and Understanding to Analyzing, Evaluating, and Creating, ensuring your assessments are comprehensive and effective." },
    { question: "What kind of customization options are available?", answer: "Beyond Bloom's levels, you can customize question types (MCQ, short answer, long answer), difficulty, specific topics within your uploaded content, mark distribution, and even provide custom instructions to guide the AI's generation style." },
    { question: "Is my uploaded data secure and private?", answer: "Absolutely. We prioritize data security and privacy. Your uploaded materials are used solely for generating questions for your account. They are not shared with other users or used to train general AI models. Refer to our Privacy Policy for more details." },
    { question: "What file types are supported for RAG uploads?", answer: "Currently, we support PDF, DOCX, and TXT files. We are continuously working to expand support for other common educational file formats." },
    { question: "Are there any limits on the free plan?", answer: "The free Basic plan offers a limited number of AI generation runs per month and document uploads to allow you to experience the core functionality. Our paid plans offer significantly higher limits and access to all advanced features." },
  ];

  // For Interactive Demo Section
  const [demoInput, setDemoInput] = useState("Generate 3 MCQs on 'Photosynthesis' for Bloom's 'Apply' level.");
  const [demoOutput, setDemoOutput] = useState([
    { question: "A plant is kept in a dark room for 48 hours. If a bright light is then shone on one leaf for 2 hours, which substance would be found in greater quantity in that leaf compared to a leaf still in the dark?", options: ["Starch", "Oxygen", "Carbon Dioxide", "Water"], answer: "Starch", bloomLevel: "Apply", justification: "Requires applying knowledge of photosynthesis products and conditions." },
    { question: "If a farmer wants to increase the rate of photosynthesis in their greenhouse crops during winter, which of these actions would be LEAST effective?", options: ["Increasing CO2 levels", "Using artificial lighting", "Watering the plants more frequently", "Raising the temperature slightly"], answer: "Watering the plants more frequently", bloomLevel: "Apply", justification: "Requires applying understanding of limiting factors in photosynthesis; water is less likely a limiting factor in a greenhouse than light or CO2 in winter." },
    { question: "A scientist blocks the stomata of a plant leaf. How would this directly impact the process of photosynthesis?", options: ["Reduce water absorption by roots", "Prevent chlorophyll from capturing light", "Limit CO2 uptake from the atmosphere", "Stop the release of glucose"], answer: "Limit CO2 uptake from the atmosphere", bloomLevel: "Apply", justification: "Tests application of knowledge about stomata function in gas exchange for photosynthesis." }
  ]);
  const [isDemoGenerating, setIsDemoGenerating] = useState(false);
  
  const handleDemoGenerate = () => {
    if (!demoInput.trim()) return;
    setIsDemoGenerating(true);
    // Simulate API call
    setTimeout(() => {
      // This is a mock output. In a real scenario, you'd make an API call.
      const newOutput = [
        { question: `Generated: If a green plant is exposed to light with only wavelength 700nm, how would its rate of sugar production compare to exposure with full spectrum light? Explain using your knowledge of photosynthetic pigments.`, options: [], answer: "", bloomLevel: "Apply", justification: "Requires application of pigment absorption spectra to predict photosynthetic outcome." },
        { question: `Generated: Design a simple experiment a student could perform to demonstrate that light intensity affects the rate of photosynthesis in an aquatic plant like Elodea. What would be the independent and dependent variables?`, options: [], answer: "", bloomLevel: "Create", justification: "Requires designing an experimental procedure, indicating a higher-order application of knowledge." },
      ];
      // Prepend or replace based on preference
      setDemoOutput(prev => [...newOutput, ...prev.slice(0,1)]);
      setIsDemoGenerating(false);
    }, 1500);
  };

  return (
    <>
      <LandingPageStyles />
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">

          {/* Hero Section */}
          <section className="landing-section hero-section relative isolate">
            <div className="blob w-[600px] h-[600px] bg-primary/80 top-[-10%] left-[-15%]" style={parallaxBgPattern}></div>
            <div className="blob w-[500px] h-[500px] bg-accent/70 bottom-[-15%] right-[-10%]" style={parallaxBgPattern}></div>
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="text-center mr-11 lg:text-left">
                <h1 className="whitespace-nowrap text-3xl font-extrabold tracking-tight font-heading sm:text-5xl md:text-6xl xl:text-7xl animate-fade-in-down">
                  Craft <FlipWords words={heroWords} className="text-primary" />
                  <br />
                </h1>
                <h1 className="text-3xl font-extrabold tracking-tight font-heading sm:text-5xl md:text-6xl xl:text-7xl animate-fade-in-down">
                  <span className="gradient-text-primary-accent">Question Papers</span> with AI
                </h1>
                <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground sm:text-xl md:text-2xl animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
                  Welcome to QuestionGenius AI – your ultimate partner in creating tailored, high-quality assessments aligned with Bloom's Taxonomy. Leverage the power of RAG and deep customization to save time and elevate your teaching.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <Button size="lg" className="lp-button-primary w-full sm:w-auto" onClick={() => navigate('/sign-up')}>
                    Start Generating Free <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" size="lg" className="lp-button-secondary w-full sm:w-auto" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                    How It Works <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                  </Button>
                </div>
              </div>
                <div className="hidden lg:block hero-image-container scroll-animate" style={{ animationDelay: '0.3s' }}>
                <img
                  src="/assets/illustration_1.svg"
                  alt="AI powered question generation interface"
                  className="hero-image"
                  style={parallaxHeroImage}
                />
                </div>
            </div>
          </section>

          {/* Core Features Section */}
          <section className="landing-section section-bg-subtle" id="features">
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <span className="section-supertitle">Core Capabilities</span>
                <h2 className="section-title">The <span className="gradient-text-primary-accent">Genius</span> Behind Your Questions</h2>
                <p className="section-description">
                  QuestionGenius AI is packed with features designed to streamline your workflow and enhance assessment quality.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreFeatures.map((feature, idx) => (
                  <div key={idx} className="feature-card-landing scroll-animate" style={{ animationDelay: `${idx * 0.08}s`}}>
                    <div className="feature-icon-landing">
                      <feature.icon size={28} />
                    </div>
                    <h3 className="feature-card-title">{feature.title}</h3>
                    <p className="feature-card-description">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="landing-section section-bg-gradient" id="how-it-works">
            <div className="container mx-auto">
              <div className="text-center mb-20 scroll-animate">
                <span className="section-supertitle">Simple & Effective</span>
                <h2 className="section-title">Transform Your Process in 4 Easy Steps</h2>
                <p className="section-description">
                  Go from raw materials to polished question papers with an intuitive and AI-assisted workflow.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorksSteps.map((step, idx) => (
                  <div key={idx} className="how-it-works-step scroll-animate text-center md:text-left" style={{ animationDelay: `${idx * 0.1}s`}}>
                    <div className="how-it-works-step-number">{step.icon ? <step.icon size={20}/> : idx + 1}</div>
                    {/* <step.icon size={40} className="text-primary how-it-works-icon mx-auto md:mx-0" /> */}
                    <h3 className="text-xl font-heading font-semibold mt-10 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="landing-section section-bg-subtle" id="use-cases">
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <span className="section-supertitle">Versatile Applications</span>
                <h2 className="section-title">For Every Educational Need</h2>
                <p className="section-description">
                  Whether you're preparing for final exams, formative quizzes, or developing new curriculum, QuestionGenius AI adapts to your context.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {useCases.map((useCase, idx) => (
                  <Card key={idx} className="feature-card-landing scroll-animate bg-card hover:border-brand-primary/50" style={{ padding: '1.5rem', animationDelay: `${idx * 0.08}s`}}>
                     <div className="feature-icon-landing bg-brand-primary/10 text-brand-primary">
                       <useCase.icon size={26}/>
                     </div>
                     <CardTitle className="feature-card-title text-lg mb-2">{useCase.title}</CardTitle>
                     <CardDescription className="feature-card-description text-sm mb-4">{useCase.description}</CardDescription>
                     <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-dark mt-auto self-start group">
                       Learn More <MoveRight size={16} className="ml-1 transition-transform duration-200 group-hover:translate-x-1"/>
                     </Button>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Demo Section */}
          <section className="landing-section" id="demo">
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <span className="section-supertitle">Experience it Live</span>
                <h2 className="section-title">See QuestionGenius AI in Action</h2>
                <p className="section-description">
                  Try our interactive demo. Type a prompt (or use our example) and see how the AI responds.
                </p>
              </div>
              <div className="max-w-3xl mx-auto scroll-animate container-bordered">
                <Tabs defaultValue="demo" className="w-full">
                  <TabsList className="grid w-full grid-cols-1 demo-tabs-list mb-4">
                    <TabsTrigger value="demo" className="demo-tabs-trigger">Interactive Demo</TabsTrigger>
                  </TabsList>
                  <TabsContent value="demo" className="demo-content-area">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="demo-input" className="block text-sm font-medium text-muted-foreground mb-1">Your Prompt to the AI:</label>
                        <textarea
                          id="demo-input"
                          value={demoInput}
                          onChange={(e) => setDemoInput(e.target.value)}
                          rows={3}
                          className="w-full p-3 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                          placeholder="e.g., Generate 2 analytical questions about the water cycle for 5th graders."
                        />
                      </div>
                      <Button onClick={handleDemoGenerate} disabled={isDemoGenerating} className="lp-button-primary w-full sm:w-auto group">
                        {isDemoGenerating ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <Zap className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        )}
                        Generate Example
                      </Button>
                      <div className="mt-6 space-y-3">
                        <h4 className="text-lg font-semibold font-heading text-foreground">AI Generated Output:</h4>
                        {isDemoGenerating && demoOutput.length === 0 && <p className="text-muted-foreground italic">AI is thinking...</p>}
                        {demoOutput.map((item, idx) => (
                          <Card key={idx} className="bg-background p-3 border-border/70 animate-fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
                            <p className="font-medium text-foreground text-sm">{item.question}</p>
                            <div className="text-xs mt-1 flex items-center gap-2">
                              <Badge variant="outline" className="border-accent/50 text-accent bg-accent/10">{item.bloomLevel}</Badge>
                              <p className="text-muted-foreground italic truncate" title={item.justification}>{item.justification}</p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="landing-section section-bg-subtle" id="testimonials">
             <div className="blob w-[500px] h-[500px] bg-secondary/50 top-[5%] right-[70%]" style={{animationDelay: '2s'}}></div>
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <span className="section-supertitle">Trusted by Educators</span>
                <h2 className="section-title">Voices of Our Community</h2>
                <p className="section-description">
                  Hear what fellow teachers, professors, and curriculum developers are saying about their experience with QuestionGenius AI.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, idx) => (
                  <Card key={idx} className="testimonial-card scroll-animate" style={{ animationDelay: `${idx * 0.1}s`}}>
                    <CardContent className="pt-0"> {/* Adjusted padding */}
                      <div className="flex text-yellow-400 mb-4 testimonial-stars">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                      </div>
                      <p className="testimonial-quote">
                        <MessageSquareQuote className="inline-block h-6 w-6 mr-2 text-primary/40 transform -translate-y-1" />
                        {testimonial.quote}
                      </p>
                    </CardContent>
                    <CardHeader className="pt-4 mt-auto border-t border-border/50">
                      <div className="flex items-center">
                        <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar mr-4" />
                        <div>
                          <h4 className="testimonial-name">{testimonial.name}</h4>
                          <p className="testimonial-title">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="landing-section section-bg-gradient" id="pricing">
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <span className="section-supertitle">Simple & Transparent</span>
                <h2 className="section-title">Find the Perfect Plan for You</h2>
                <p className="section-description">
                  Choose a plan that fits your needs, from individual educators to entire institutions. Start for free!
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {pricingPlans.map((plan, idx) => (
                  <div key={idx} className={`pricing-card scroll-animate ${plan.primary ? 'featured' : ''}`} style={{ animationDelay: `${idx * 0.1}s`}}>
                    {plan.primary && <Badge variant="default" className="absolute top-0 right-0 -mt-3 -mr-3 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full shadow-lg">Most Popular</Badge>}
                    <h3 className="pricing-card-title">{plan.name}</h3>
                    <p className="pricing-card-price">{plan.price}<span>{plan.frequency}</span></p>
                    <p className="pricing-card-description">{plan.description}</p>
                    <ul className="pricing-feature-list">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className={!feature.included ? 'opacity-50' : ''}>
                          {feature.included ? <CheckCircle size={18} className="text-brand-primary shrink-0" /> : <HelpCircle size={18} className="text-muted-foreground shrink-0"/>}
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                    <Button size="lg" className={plan.primary ? 'lp-button-primary mt-auto' : 'lp-button-secondary mt-auto w-full'}>
                      {plan.cta}
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-center mt-12 text-muted-foreground text-sm scroll-animate">
                Need a custom solution for your entire institution? <a href="#contact" className="text-primary font-semibold hover:underline">Contact our sales team</a> for a personalized quote.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="landing-section section-bg-subtle" id="faq">
            <div className="container mx-auto max-w-4xl"> {/* Wider for FAQ */}
              <div className="text-center mb-16 scroll-animate">
                <span className="section-supertitle">Got Questions?</span>
                <h2 className="section-title">We've Got Answers</h2>
                 <p className="section-description">
                    Find answers to common queries about QuestionGenius AI, its features, and how it can help you.
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4 scroll-animate"> {/* Increased space-y */}
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="faq-accordion-item">
                    <AccordionTrigger className="faq-accordion-trigger">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="faq-accordion-content">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
               <p className="text-center mt-12 text-muted-foreground scroll-animate">
                Can't find what you're looking for? <Link to="/contact" className="text-primary font-semibold hover:underline">Contact our support team</Link>.
              </p>
            </div>
          </section>

          {/* Final Call to Action Section */}
          <section className="landing-section-sm">
            <div className="container mx-auto">
              <div className="cta-section-landing text-center scroll-animate">
                <Brain className="h-16 w-16 text-white/80 mx-auto mb-6 animate-bounce-light"/>
                <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl mb-6 font-heading">
                  Ready to Elevate Your Teaching?
                </h2>
                <p className="max-w-2xl mx-auto text-lg opacity-90 mb-10">
                  Stop spending hours on manual work. Start creating smarter, more effective assessments with QuestionGenius AI.
                  Join our community of forward-thinking educators today!
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group font-semibold"
                  onClick={() => navigate('/sign-up')}
                >
                  Sign Up Free & Unleash Your Genius <Zap className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:animate-pulse-scale" />
                </Button>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;