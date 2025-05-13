// src/pages/Landing
import type React from "react"

import Navbar from "@/components/Navbar"
import HeroSection from "@/components/hero"
import Footer from "@/components/Footer"

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#511849] via-[#900C3F] to-[#C70039]">
      <Navbar />
      <div className="mt-[-42px]"> {/* Adjust margin to reduce spacing */}
        <HeroSection />
      </div>

      <Footer />
    </div>
  )
}

export default LandingPage
