import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Brain, Users, Lightbulb, ShieldCheck, FileText, BarChart3, ChevronDown, MessageSquareQuote, Star } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words"; // Assuming this is from your existing ui folder
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Shadcn UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Shadcn UI

// Helper for scroll animations (can be expanded)
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up', 'opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      el.classList.add('opacity-0'); // Initially hide
      observer.observe(el);
    });

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};


// Component-specific styles
const LandingPageStyles = () => (
  <style>{`
    .landing-section {
      padding-top: 6rem; /* 96px */
      padding-bottom: 6rem; /* 96px */
      position: relative;
      overflow: hidden; /* For pseudo-elements */
    }
    .landing-section-sm {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
    
    .dark .section-bg-subtle {
      background-color: hsl(var(--background) / 0.5); /* Slightly different from main bg */
    }
    .light .section-bg-subtle {
      background-color: hsl(var(--muted) / 0.3);
    }

    .gradient-text-brand {
      background-image: linear-gradient(to right, hsl(var(--brand-primary)), hsl(var(--brand-accent)));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .feature-card-landing {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border) / 0.7);
      border-radius: var(--radius-xl);
      padding: 2rem;
      transition: all 0.3s ease-in-out;
      box-shadow: var(--shadow-soft);
    }
    .feature-card-landing:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 10px 20px hsl(var(--primary) / 0.1), 0 0 15px hsl(var(--accent) / 0.1);
      border-color: hsl(var(--primary) / 0.5);
    }
    .feature-icon-landing {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem; /* p-3 */
      border-radius: var(--radius-lg);
      margin-bottom: 1rem; /* mb-4 */
      background-image: linear-gradient(to right, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1));
      color: hsl(var(--primary));
    }
    .dark .feature-icon-landing {
      background-image: linear-gradient(to right, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2));
    }

    .how-it-works-step {
      position: relative;
      padding-left: 2.5rem; /* Space for number and line */
    }
    .how-it-works-step::before { /* Circle for number */
      content: attr(data-step);
      position: absolute;
      left: 0;
      top: 0;
      width: 2rem; /* w-8 */
      height: 2rem; /* h-8 */
      border-radius: 9999px; /* rounded-full */
      background-color: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-family: var(--font-heading);
    }
    .how-it-works-step:not(:last-child)::after { /* Connecting line */
      content: '';
      position: absolute;
      left: 0.9375rem; /* calc( (2rem - 2px) / 2) where 2rem is width of circle, 2px is width of line */
      top: 2.5rem; /* below circle */
      bottom: -1.5rem; /* extend to next step's top padding */
      width: 2px;
      background-color: hsl(var(--border));
    }

    .testimonial-card {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-soft);
    }
    .testimonial-avatar {
      width: 48px; /* w-12 */
      height: 48px; /* h-12 */
      border-radius: 9999px;
      border: 2px solid hsl(var(--primary));
    }

    .faq-accordion-item {
      border-color: hsl(var(--border) / 0.7) !important;
    }
    .faq-accordion-trigger {
      color: hsl(var(--foreground)) !important;
      font-weight: 500;
      font-family: var(--font-heading);
    }
    .faq-accordion-trigger:hover {
      color: hsl(var(--primary)) !important;
      background-color: transparent !important; /* Override shadcn default */
    }
    .faq-accordion-content {
      color: hsl(var(--muted-foreground)) !important;
      padding-top: 0.5rem;
      padding-bottom: 1rem;
    }
    .cta-section {
      background-image: linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-middle)) 50%, hsl(var(--gradient-end)) 100%);
      border-radius: var(--radius-2xl);
      color: hsl(var(--primary-foreground)); /* Ensure text is readable */
    }
  `}</style>
);

const LandingPage: React.FC = () => {
  useScrollAnimation(); // Initialize scroll animations

  const heroWords = ["smarter", "faster", "impactful", "targeted"];
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Question Generation",
      description: "Leverage advanced AI to create diverse and relevant questions across various cognitive levels. Say goodbye to manual question setting.",
      color: "text-blue-400", // Example color
      bgColor: "bg-blue-500/10",
    },
    {
      icon: BarChart3,
      title: "Bloom's Taxonomy Integration",
      description: "Align questions precisely with Bloom's Taxonomy levels (Remember, Understand, Apply, Analyze, Evaluate, Create) for effective learning assessment.",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Zap,
      title: "Rapid Customization & Control",
      description: "Fine-tune question types, difficulty, topics, and paper structure with intuitive controls. Adapt to any curriculum instantly.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: FileText,
      title: "Personalized Knowledge Base (RAG)",
      description: "Upload your own notes, textbooks, and materials. Our RAG system generates questions grounded in your specific content.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private for Educators",
      description: "Your uploaded materials and generated content are kept private and secure, respecting your intellectual property.",
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
    },
    {
      icon: Users,
      title: "Teacher-Centric Dashboard",
      description: "Manage your subjects, notes, preferences, and question paper history all in one organized and easy-to-use dashboard.",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
    },
  ];

  const howItWorksSteps = [
    { title: "Upload Your Materials", description: "Securely upload lecture notes, textbook chapters, or existing papers (PDF, DOCX, TXT)." },
    { title: "Set Your Preferences", description: "Specify Bloom's levels, question types, difficulty, and custom instructions for the AI." },
    { title: "AI Generates Questions", description: "Our AI analyzes your content and preferences to generate tailored questions in moments." },
    { title: "Review & Assemble", description: "Review the AI-generated questions, make edits, and assemble your perfect question paper." },
  ];

  const testimonials = [
    {
      quote: "QuestionGenius has revolutionized how I prepare for exams. The Bloom's Taxonomy alignment is a game-changer!",
      name: "Dr. Anya Sharma",
      title: "Professor of Computer Science",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg" // Replace with actual or placeholder
    },
    {
      quote: "The ability to use my own notes for question generation is incredible. It saves me hours of work each week.",
      name: "Mr. Ben Carter",
      title: "High School Physics Teacher",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      quote: "Creating varied and challenging question papers used to be a chore. Now, it's an exciting and efficient process with QuestionGenius.",
      name: "Ms. Chloe Davis",
      title: "Curriculum Developer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
  ];

  const faqs = [
    {
      question: "What file types can I upload?",
      answer: "You can upload PDF, DOCX, and TXT files. We are continuously working to support more formats."
    },
    {
      question: "How does the AI ensure questions are relevant to my content?",
      answer: "Our AI uses a Retrieval-Augmented Generation (RAG) system. It first retrieves the most relevant sections from your uploaded documents based on your query and then generates questions grounded in that specific information."
    },
    {
      question: "Can I customize the difficulty and Bloom's Taxonomy levels?",
      answer: "Yes! You have fine-grained control over specifying desired Bloom's Taxonomy levels, overall difficulty, and even custom instructions for the AI to follow for question style and focus."
    },
    {
      question: "Is my uploaded data secure?",
      answer: "Absolutely. We prioritize your data security and privacy. Your uploaded materials are used solely for generating questions for your account and are not shared or used for training general models."
    },
  ];


  return (
    <>
      <LandingPageStyles />
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="landing-section relative isolate">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-extrabold tracking-tight font-heading sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-down">
                Generate <FlipWords words={heroWords} className="text-primary" />
                <br />
                <span className="gradient-text-brand">Question Papers</span> with AI
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl md:text-2xl animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
                Empower your teaching with QuestionGenius AI. Create tailored, high-quality assessments aligned with Bloom's Taxonomy in minutes, not hours.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Button size="lg" className="w-full sm:w-auto btn-glow-primary text-base px-8 py-6 rounded-xl group">
                  Get Started For Free <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-xl border-2 border-primary/70 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary group">
                  Learn More <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                </Button>
              </div>
            </div>
          </section>

          {/* Problem/Solution Section */}
          <section className="landing-section section-bg-subtle">
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <h2 className="text-3xl font-heading font-bold sm:text-4xl md:text-5xl">Stop Wasting Time, Start Inspiring Minds</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Creating effective question papers is crucial, but it's often time-consuming and repetitive. QuestionGenius AI offers a smarter way.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6 scroll-animate" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-2xl font-heading font-semibold text-destructive">The Challenge: Traditional Pitfalls</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Hours spent manually crafting questions.",
                      "Difficulty ensuring diverse cognitive skill assessment.",
                      "Repetitive content and lack of fresh perspectives.",
                      "Struggles with aligning questions to specific learning outcomes.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-destructive mr-3 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6 scroll-animate" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-2xl font-heading font-semibold text-primary">The Solution: QuestionGenius AI</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Generate papers in minutes, not hours.",
                      "Precisely target Bloom's Taxonomy levels.",
                      "Leverage AI for novel and varied questions.",
                      "Utilize your own materials for context-rich assessments.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="landing-section">
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">Simple & Powerful</span>
                <h2 className="mt-2 text-3xl font-heading font-bold sm:text-4xl md:text-5xl">How QuestionGenius Works</h2>
                <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
                  Transform your materials into insightful assessments in just a few steps.
                </p>
              </div>
              <div className="max-w-3xl mx-auto space-y-12">
                {howItWorksSteps.map((step, idx) => (
                  <div key={idx} className="how-it-works-step scroll-animate" data-step={idx + 1} style={{ animationDelay: `${idx * 0.15}s`}}>
                    <h3 className="text-xl font-heading font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
               <div className="mt-16 text-center scroll-animate">
                 <Button size="lg" className="btn-glow-accent text-base px-8 py-3 rounded-lg group">
                    Explore Features in Detail <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-[360deg]" />
                </Button>
              </div>
            </div>
          </section>

          {/* Key Features Showcase */}
          <section className="landing-section section-bg-subtle">
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <h2 className="text-3xl font-heading font-bold sm:text-4xl md:text-5xl">Unlock a New Era of Assessment</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Discover the powerful features designed to make your life easier and your assessments more effective.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="feature-card-landing scroll-animate" style={{ animationDelay: `${idx * 0.1}s`}}>
                    <div className={`feature-icon-landing ${feature.bgColor}`}>
                      <feature.icon size={28} className={feature.color} />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="landing-section">
            <div className="container mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <h2 className="text-3xl font-heading font-bold sm:text-4xl md:text-5xl">Loved by Educators Like You</h2>
                <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
                  Hear what fellow teachers and curriculum developers are saying about QuestionGenius AI.
                </p>
              </div>
              {/* Basic grid layout for testimonials. For a carousel, you'd use Embla or similar */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, idx) => (
                  <Card key={idx} className="testimonial-card flex flex-col scroll-animate" style={{ animationDelay: `${idx * 0.15}s`}}>
                    <CardContent className="flex-grow pt-6">
                      <MessageSquareQuote className="h-8 w-8 text-primary/70 mb-4" />
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    </CardContent>
                    <CardHeader className="pt-4 mt-auto border-t border-border/50">
                      <div className="flex items-center">
                        <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar mr-4" />
                        <div>
                          <CardTitle className="text-md font-semibold">{testimonial.name}</CardTitle>
                          <CardDescription className="text-sm">{testimonial.title}</CardDescription>
                        </div>
                      </div>
                       <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="landing-section section-bg-subtle">
            <div className="container mx-auto max-w-3xl">
              <div className="text-center mb-12 scroll-animate">
                <h2 className="text-3xl font-heading font-bold sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
                 <p className="mt-4 text-lg text-muted-foreground">
                    Find answers to common queries about QuestionGenius AI.
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3 scroll-animate">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="faq-accordion-item bg-card rounded-lg shadow-sm">
                    <AccordionTrigger className="faq-accordion-trigger px-6 py-4 text-left text-lg hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="faq-accordion-content px-6 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="landing-section-sm">
            <div className="container mx-auto">
              <div className="cta-section p-8 sm:p-12 md:p-16 text-center scroll-animate">
                <Lightbulb className="h-16 w-16 text-yellow-300 mx-auto mb-6 animate-float"/>
                <h2 className="text-3xl font-heading font-extrabold sm:text-4xl md:text-5xl mb-6">
                  Ready to Revolutionize Your Assessments?
                </h2>
                <p className="max-w-xl mx-auto text-lg opacity-90 mb-10">
                  Join thousands of educators transforming their teaching with the power of AI.
                  Sign up today and experience the future of question paper generation.
                </p>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-base px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                  Start Your Free Trial Now <Zap className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:animate-pulse-scale" />
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