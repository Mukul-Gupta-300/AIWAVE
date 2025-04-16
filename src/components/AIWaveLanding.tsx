import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

type SectionRef = React.RefObject<HTMLElement | null>;

export default function AIWaveLanding() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const headerRef = useRef<HTMLElement>(null);
  const sectionOneRef = useRef<HTMLElement>(null);
  const sectionTwoRef = useRef<HTMLElement>(null);
  const techStackRef = useRef<HTMLElement>(null); // New ref for tech stack section
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to next section
  const scrollToNext = (ref: SectionRef) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Animation helpers
  const isInView = (ref: SectionRef, offset = 100) => {
    const elementPosition = ref.current?.offsetTop;
    if (typeof elementPosition === 'undefined') return false;
    return scrollPosition > elementPosition - window.innerHeight + offset;
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      >
        {/* Top Horizontal Lines (3 sets) */}
        <div className="absolute top-8 w-full">
          <div className="w-full h-px bg-blue-500 animate-slideRight"></div>
        </div>
        <div className="absolute top-12 w-full">
          <div className="w-3/4 h-px bg-blue-500 animate-slideRight" style={{animationDelay: '0.1s'}}></div>
        </div>
        <div className="absolute top-16 w-full">
          <div className="w-1/2 h-px bg-blue-500 animate-slideRight" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <div className="absolute top-20 left-10 right-20 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-sm md:text-base text-white">AIWAVE</div> {/* Using text-white for visibility */}
          <div className="flex space-x-6">
            <a href="/about" className="text-sm md:text-base text-gray-400 hover:text-blue-400">About</a>
            <a href="/services" className="text-sm md:text-base text-gray-400 hover:text-blue-400">Services</a>
            <a href="/contact" className="text-sm md:text-base text-gray-400 hover:text-blue-400">Contact</a>
          </div>
        </div>
      </div>
        {/* Vertical Lines at Right Corner (3 lines with varying heights) */}
        <div className="absolute right-8 top-0 h-full w-px bg-blue-500 animate-slideDown"></div>
        <div className="absolute right-12 top-0 h-4/5 w-px bg-blue-500 animate-slideDown" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute right-16 top-0 h-3/5 w-px bg-blue-500 animate-slideDown" style={{animationDelay: '0.4s'}}></div>
        
        {/* Main Header Content */}
        <div className="container mx-auto px-6 z-10 mt-20 flex justify-center">
        <div className="text-left w-full md:w-3/4 lg:w-1/2 ml-17"> {/* Added ml-8 */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Surf the <span className="text-orange-500">future</span>
              <br /> with <span className="text-blue-400">Elite AI</span> talent
            </h1>
            
            <div className="mt-10 space-y-2">
              <p className="text-xl">Looking for an AI game-changer? <a href="/hire" className="text-orange-500 hover:underline">Hire Top Talent</a></p>
              <p className="text-xl">Are you that expert? <a href="/apply" className="text-blue-400 hover:underline">Join the Network</a></p>
            </div>
          </div>
        </div>   
        {/* Bottom Horizontal Lines (3 lines with varying widths) */}
        <div className="absolute bottom-16 w-full">
          <div className="w-full h-px bg-blue-500 animate-slideRight" style={{animationDelay: '0.3s'}}></div>
        </div>
        <div className="absolute bottom-12 w-full">
          <div className="w-2/3 h-px bg-blue-500 animate-slideRight" style={{animationDelay: '0.4s'}}></div>
        </div>
        <div className="absolute bottom-8 w-full">
          <div className="w-1/3 h-px bg-blue-500 animate-slideRight" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToNext(techStackRef)} // Updated to scroll to tech stack first
        >
          <ChevronDown size={32} className="text-blue-500" />
        </div>
      </section>

      {/* NEW SECTION: Tech Stack Showcase with Bi-directional Infinite Scroll */}
      <section
        ref={techStackRef}
        className="min-h-screen flex flex-col justify-center relative py-16 bg-gradient-to-br from-black to-purple-900 overflow-hidden ml-4"
      >
        <div className="container mx-auto px-6 z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            {/* Left side heading */}
            <div className="md:w-2/5 mb-12 md:mb-0">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Whatever your <br />
              stack, <span className="text-purple-400">AIWave</span> connects you <br />
              to the experts who build with it.
            </h2>
              <p className="text-xl mt-6 text-gray-300">
              From TensorFlow to Transformers, our experts master every layer of the AI stack, delivering production-grade ML, NLP, and LLM solutions built to scale.
              </p>
            </div>
          </div>
          
          {/* Infinitely scrolling tech logos */}
          <div className="mt-12 relative overflow-hidden py-8">
            {/* Top row - Left to Right */}
            <div className="tech-scroll-container mb-6">
              <div className="tech-scroll-track tech-scroll-right flex">
                {/* First set */}
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl font-bold">TF</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl font-bold">PT</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-xl font-bold">GO</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl font-bold">R</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🐘</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">⚛️</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-xl font-bold">🔄</span>
                  </div>
                </div>
                
                {/* Duplicate set for continuous loop */}
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl font-bold">TF</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl font-bold">PT</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-xl font-bold">GO</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl font-bold">R</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🐘</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">⚛️</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-xl font-bold">🔄</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom row - Right to Left */}
            <div className="tech-scroll-container">
              <div className="tech-scroll-track tech-scroll-left flex">
                {/* First set */}
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">💎</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl font-bold">JS</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🐍</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🐋</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-xl font-bold">PHP</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🔥</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🌐</span>
                  </div>
                </div>
                
                {/* Duplicate set for continuous loop */}
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">💎</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl font-bold">JS</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🐍</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🐋</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-xl font-bold">PHP</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🔥</span>
                  </div>
                </div>
                <div className="tech-logo-item mx-3">
                  <div className="bg-purple-600 rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                    <span className="text-2xl">🌐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="tech-grid-bg"></div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToNext(sectionOneRef)}
        >
          <ChevronDown size={32} className="text-blue-500" />
        </div>
      </section>
      
      {/* Features Section - Dynamic Grid Layout as shown in Image 2 */}
      <section 
        ref={sectionOneRef}
        className="min-h-screen flex flex-col justify-center relative py-16 ml-4"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            A Curated Marketplace for the Best in <span className="text-blue-400">AI</span> 


          </h2>
          
          {/* Dynamic Grid Layout Like Image 2 */}
          <div className="grid grid-cols-6 gap-4 max-w-6xl mx-auto">
            {/* Top row */}
            <div className={`col-span-3 border border-blue-500 p-12 transition-all duration-1000 ${isInView(sectionOneRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} text-left`}>
              <p className="text-2xl">In the ever-expanding ocean of AI innovation, we connect you with top-tier, vetted talent. The kind that drives real-world impact, not just demos.</p>
            </div>
            
            <div className={`col-span-3 border border-blue-500 p-12 transition-all duration-1000 delay-200 ${isInView(sectionOneRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} text-left`}>
              <p className="text-2xl">Seamlessly embed AI into your systems with seasoned professionals who understand both the tech and your business goals, no guesswork, just execution.</p>
            </div>
            
            {/* Bottom row - varying sizes */}
            <div className={`col-span-4 border border-blue-500 p-12 transition-all duration-1000 delay-400 ${isInView(sectionOneRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} text-left`}>
              <p className="text-2xl">Work with AI specialists who’ve been rigorously screened and bring deep, hands-on experience from industry-leading deployments.</p>
            </div>
            
            <div className={`col-span-2 border border-blue-500 p-12 transition-all duration-1000 delay-600 ${isInView(sectionOneRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} text-left`}>
              <p className="text-2xl">Scale your AI ambitions efficiently, tap into elite expertise without the overhead of traditional hiring.</p>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToNext(sectionTwoRef)}
        >
          <ChevronDown size={32} className="text-blue-500" />
        </div>
      </section>
      
      {/* Steps Section */}
      <section 
        ref={sectionTwoRef}
        className="min-h-screen flex flex-col justify-center relative pb-20 ml-4"
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold mb-16 transition-all duration-1000 ${isInView(sectionTwoRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
            Find your talent in just 3 easy steps
          </h2>
          
          {/* Modified grid structure with bolder content boxes */}
          <div className="relative max-w-3xl mx-auto">
            {/* Grid container - removed gap */}
            <div className="grid grid-cols-3 gap-0">
              {/* Cell 0,0 (Top-Left) - CONTENT BOX - MAKE BOLDER */}
              <div className={`border-2 border-blue-500 bg-blue-900 bg-opacity-30 shadow-lg shadow-blue-500/30 aspect-square flex items-center justify-center transition-all duration-1000 ${isInView(sectionTwoRef) ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-10'}`}>
                <p className="text-lg text-left font-semibold px-4">Share your project goals with our AI talent advisor, we’ll help you define the right scope and skills needed.</p>
              </div>
              
              {/* Cell 0,1 (Top-Middle) - EMPTY */}
              <div className="border border-blue-500 border-opacity-50 aspect-square flex items-center justify-center">
                <div className="opacity-0">Empty</div>
              </div>
              
              {/* Cell 0,2 (Top-Right) - Missing */}
              <div className="border-0 aspect-square flex items-center justify-center">
              </div>
              
              {/* Cell 1,0 (Middle-Left) - EMPTY */}
              <div className="border border-blue-500 border-opacity-50 aspect-square flex items-center justify-center">
                <div className="opacity-0">Empty</div>
              </div>
              
              {/* Cell 1,1 (Middle-Middle) - CONTENT BOX - MAKE BOLDER */}
              <div className={`border-2 border-blue-500 bg-blue-900 bg-opacity-30 shadow-lg shadow-blue-500/30 aspect-square flex items-center justify-center transition-all duration-1000 delay-300 ${isInView(sectionTwoRef) ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}>
                <p className="text-lg text-left font-semibold px-4">Receive a tailored shortlist of highly skilled freelancers, handpicked to match your domain, stack, and vision.</p>
              </div>
              
              {/* Cell 1,2 (Middle-Right) - EMPTY */}
              <div className="border border-blue-500 border-opacity-50 aspect-square flex items-center justify-center">
                <div className="opacity-0">Empty</div>
              </div>
              
              {/* Cell 2,0 (Bottom-Left) - Missing */}
              <div className="border-0 aspect-square flex items-center justify-center">
              </div>

              {/* Cell 2,1 (Bottom-Middle) - EMPTY */}
              <div className="border border-blue-500 border-opacity-50 aspect-square flex items-center justify-center">
                <div className="opacity-0">Empty</div>
              </div>
              
              {/* Cell 2,2 (Bottom-Right) - CONTENT BOX - MAKE BOLDER */}
              <div className={`border-2 border-blue-500 bg-blue-900 bg-opacity-30 shadow-lg shadow-blue-500/30 aspect-square flex items-center justify-center transition-all duration-1000 delay-600 ${isInView(sectionTwoRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-x-10'}`}>
                <p className="text-lg text-left font-semibold px-4">Pick a plan that fits your timeline and budget, then get started with the expert of your choice, no delays, no hassle.</p>
              </div>
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="mt-20 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="absolute bottom-0 w-full py-4 bg-black">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 AIWave. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/terms" className="text-gray-400 hover:text-blue-500">Terms</a>
              <a href="/privacy" className="text-gray-400 hover:text-blue-500">Privacy</a>
              <a href="/contact" className="text-gray-400 hover:text-blue-500">Contact</a>
            </div>
          </div>
        </footer>
      </section>
      
      <style>
        {`
          @keyframes slideRight {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          
          @keyframes slideDown {
            from { transform: scaleY(0); transform-origin: top; }
            to { transform: scaleY(1); transform-origin: top; }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Tech stack scroll animations */
          @keyframes scrollRight {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          @keyframes scrollLeft {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          
          .animate-slideRight {
            animation: slideRight 1.5s ease-out forwards;
          }
          
          .animate-slideDown {
            animation: slideDown 1.8s ease-out forwards;
          }
          
          /* Custom Tailwind class for right-22 spacing */
          .right-22 {
            right: 5.5rem;
          }

          /* Tech Stack Scroll Container */
          .tech-scroll-container {
            width: 100%;
            overflow: hidden;
          }
          
          .tech-scroll-track {
            display: flex;
            width: fit-content;
          }
          
          .tech-scroll-right {
            animation: scrollRight 30s linear infinite;
          }
          
          .tech-scroll-left {
            animation: scrollLeft 30s linear infinite;
          }
          
          .tech-logo-item {
            flex-shrink: 0;
          }

          /* Animated background grid */
          .tech-grid-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: 0;
          }
          
          /* Pause animations on hover */
          .tech-scroll-container:hover .tech-scroll-track {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
}