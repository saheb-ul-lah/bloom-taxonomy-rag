// src/components/hero.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, Search } from "lucide-react"
import { FlipWords } from "@/components/ui/flip-words";


export default function HeroSection() {
    const words = ["better", "perfect", "fast", "modern"];
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Gradient Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#511849] via-[#900C3F] to-[#C70039] z-0"

                aria-hidden="true"
            />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-10 md:py-24 lg:py-24">
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-10 lg:p-16 min-w-7xl mx-auto">
                    {/* Hero Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Generate   <FlipWords words={words} /> <br />
                            <span className="text-yellow-300">Question Papers</span> With Ease
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl mb-8">
                            Access a comprehensive library of question papers from various examinations, universities, and educational
                            boards. Study smarter, not harder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-[#C70039] hover:bg-[#900C3F] text-white rounded-xl" >
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" className="bg-[#23010C] hover:bg-white hover:text-black text-white rounded-xl" >
                                Learn More 
                            </Button>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <FeatureCard
                            icon={<Search className="h-8 w-8" />}
                            title="Smart Search"
                            description="Find exactly what you need with our intelligent search system that understands academic context."
                        />
                        <FeatureCard
                            icon={<FileText className="h-8 w-8" />}
                            title="Vast Collection"
                            description="Access thousands of question papers from various universities, boards, and competitive exams."
                        />
                        <FeatureCard
                            icon={<BookOpen className="h-8 w-8" />}
                            title="Study Resources"
                            description="Get complementary study materials and resources to help you prepare effectively."
                        />
                    </div>

                    {/* Call to Action */}
                    {/* <div className="mt-16 text-center">
                        <Link
                            className="inline-flex items-center text-yellow-300 hover:text-yellow-200 text-lg font-medium"
                            to="/question-papers"
                        >
                            Browse All Question Papers <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div> */}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#511849]/30 blur-3xl" aria-hidden="true"></div>
            <div
                className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#C70039]/30 blur-3xl"
                aria-hidden="true"
            ></div>
        </section>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-white mb-4">{icon}</div>
            <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
            <p className="text-white/70">{description}</p>
        </div>
    )
}
