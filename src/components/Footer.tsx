// src/components/Footer.tsx
"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin, Mail, ArrowUp, FileText } from "lucide-react"

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-black/80 backdrop-blur-md border-t border-white/10 text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#511849]/20 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#C70039]/20 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-6 py-12">
        {/* Top section with logo and back to top */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#511849] to-[#C70039] flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">QuestionPaperAI</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ArrowUp className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-white/70 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-white/70 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-white/70 hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-white/70 hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-white/70 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white/70 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-white/70 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#900C3F] text-white"
              />
              <button className="bg-gradient-to-r from-[#900C3F] to-[#C70039] px-4 py-2 rounded-r-lg text-white hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-white/10 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#511849]/30 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Multiple Choice Questions</h4>
              <p className="text-white/60 text-sm">Create objective questions with perfect distribution</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#900C3F]/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Custom Subject Streams</h4>
              <p className="text-white/60 text-sm">Generate questions for any subject</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C70039]/30 flex items-center justify-center flex-shrink-0">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Smart Marks Distribution</h4>
              <p className="text-white/60 text-sm">Set your preferred marks distribution</p>
            </div>
          </div>
        </div> */}

        {/* Bottom section with social links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} QuestionPaperAI. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 mt-6 text-sm text-white/50">
          <Link to="/terms" className="hover:text-white/80 transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-white/80 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/cookies" className="hover:text-white/80 transition-colors">
            Cookie Policy
          </Link>
          <Link to="/accessibility" className="hover:text-white/80 transition-colors">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
