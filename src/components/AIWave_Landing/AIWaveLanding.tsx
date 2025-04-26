import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import './styles.css';

type SectionRef = React.RefObject<HTMLElement | null>;

export default function AIWaveLanding() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [theme, setTheme] = useState<string>('dark');
  const headerRef = useRef<HTMLElement>(null);
  const sectionOneRef = useRef<HTMLElement>(null);
  const sectionTwoRef = useRef<HTMLElement>(null);
  const techStackRef = useRef<HTMLElement>(null);
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
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
    <div className="theme-bg-primary theme-text-primary min-h-screen font-sans">
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      >
        {/* Top Horizontal Lines (3 sets) */}
        <div className="absolute top-8 w-full">
          <div className="w-full h-px bg-blue-500 theme-border animate-slideRight"></div>
        </div>
        <div className="absolute top-12 w-full">
          <div className="w-3/4 h-px bg-blue-500 theme-border animate-slideRight" style={{animationDelay: '0.1s'}}></div>
        </div>
        <div className="absolute top-16 w-full">
          <div className="w-1/2 h-px bg-blue-500 theme-border animate-slideRight" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <div className="absolute top-20 left-10 right-20 z-10">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-sm md:text-base theme-text-primary">AIWAVE</div>
            <div className="flex space-x-6">
              <a href="/about" className="text-sm md:text-base theme-text-secondary hover:theme-accent-primary">About</a>
              <a href="/services" className="text-sm md:text-base theme-text-secondary hover:theme-accent-primary">Services</a>
              <a href="/contact" className="text-sm md:text-base theme-text-secondary hover:theme-accent-primary">Contact</a>
            </div>
          </div>
        </div>
        
        {/* Vertical Lines at Right Corner (3 lines with varying heights) */}
        <div className="absolute right-8 top-0 h-full w-px bg-blue-500 theme-border animate-slideDown"></div>
        <div className="absolute right-12 top-0 h-4/5 w-px bg-blue-500 theme-border animate-slideDown" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute right-16 top-0 h-3/5 w-px bg-blue-500 theme-border animate-slideDown" style={{animationDelay: '0.4s'}}></div>
        
        {/* Main Header Content */}
        <div className="container mx-auto px-6 z-10 mt-20 flex justify-center">
          <div className="text-left w-full md:w-3/4 lg:w-1/2 ml-17">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Your Access Point to <span className="text-orange-500">World-Class</span>
              <br /> <span className="theme-accent-primary">AI</span> Expertise
            </h1>
            
            <div className="mt-10 space-y-2">
              <p className="text-xl">Are you an expert? <a href="/apply" className="text-orange-500 hover:underline">Your legacy begins here.</a></p>
              <p className="text-xl">Looking for an AI game-changer? <a href="/hire" className="theme-accent-primary hover:underline">Discover your catalysts.</a></p>
            </div>
          </div>
        </div>
        
        {/* Bottom Horizontal Lines (3 lines with varying widths) */}
        <div className="absolute bottom-16 w-full">
          <div className="w-full h-px bg-blue-500 theme-border animate-slideRight" style={{animationDelay: '0.3s'}}></div>
        </div>
        <div className="absolute bottom-12 w-full">
          <div className="w-2/3 h-px bg-blue-500 theme-border animate-slideRight" style={{animationDelay: '0.4s'}}></div>
        </div>
        <div className="absolute bottom-8 w-full">
          <div className="w-1/3 h-px bg-blue-500 theme-border animate-slideRight" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToNext(techStackRef)}
        >
          <ChevronDown size={32} className="theme-accent-primary" />
        </div>
      </section>

      {/* Tech Stack Showcase with Bi-directional Infinite Scroll */}
      <section
        ref={techStackRef}
        className="min-h-screen flex flex-col justify-center relative py-16 bg-gradient-to-br from-black to-purple-900 dark:from-black dark:to-purple-900 light:from-white light:to-purple-100 overflow-hidden ml-4"
        style={{ 
          background: theme === 'dark' 
            ? 'linear-gradient(to bottom right, #000000, #4c1d95)' 
            : 'linear-gradient(to bottom right, #ffffff, #ede9fe)'
        }}
      >
        <div className="container mx-auto px-6 z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            {/* Left side heading */}
            <div className="md:w-2/5 mb-12 md:mb-0">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                From Frameworks <br />
                to <span className="theme-accent-secondary">Frontiers</span> — <br />
                We've Got AI Covered
              </h2>
              <p className="text-xl mt-6 theme-text-secondary">
                From TensorFlow, PyTorch, to sophisticated Transformers, our virtuosos command every layer of the AI ecosystem.
                Whether it's ML pipelines, NLP engines, or scalable LLM architectures — we deliver production-grade intelligence, tailored to your vision with finesse.
              </p>
            </div>
          </div>
          
          {/* Infinitely scrolling tech logos */}
          <div className="mt-12 relative overflow-hidden py-8">
            {/* Top row - Left to Right */}
            <div className="tech-scroll-container mb-6">
              <div className="tech-scroll-track tech-scroll-right flex">
                {/* First set */}
                {[
                  { text: "TF", bold: true },
                  { text: "PT", bold: true },
                  { text: "GO", bold: true },
                  { text: "R", bold: true },
                  { text: "🐘", bold: false },
                  { text: "⚛️", bold: false },
                  { text: "🔄", bold: true }
                ].map((item, index) => (
                  <>
                    <div key={`first-${index}`} className="tech-logo-item mx-3">
                      <div className="theme-box rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                        <span className={`text-${item.bold ? 'xl font-bold' : '2xl'}`}>{item.text}</span>
                      </div>
                    </div>
                    {index === 6 && [
                      { text: "TF", bold: true },
                      { text: "PT", bold: true },
                      { text: "GO", bold: true },
                      { text: "R", bold: true },
                      { text: "🐘", bold: false },
                      { text: "⚛️", bold: false },
                      { text: "🔄", bold: true }
                    ].map((duplicateItem, dupIndex) => (
                      <div key={`duplicate-first-${dupIndex}`} className="tech-logo-item mx-3">
                        <div className="theme-box rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                          <span className={`text-${duplicateItem.bold ? 'xl font-bold' : '2xl'}`}>{duplicateItem.text}</span>
                        </div>
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
            
            {/* Bottom row - Right to Left */}
            <div className="tech-scroll-container">
              <div className="tech-scroll-track tech-scroll-left flex">
                {/* First set */}
                {[
                  { text: "💎", bold: false },
                  { text: "JS", bold: true },
                  { text: "🐍", bold: false },
                  { text: "🐋", bold: false },
                  { text: "PHP", bold: true },
                  { text: "🔥", bold: false },
                  { text: "🌐", bold: false }
                ].map((item, index) => (
                  <>
                    <div key={`second-${index}`} className="tech-logo-item mx-3">
                      <div className="theme-box rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                        <span className={`text-${item.bold ? 'xl font-bold' : '2xl'}`}>{item.text}</span>
                      </div>
                    </div>
                    {index === 6 && [
                      { text: "💎", bold: false },
                      { text: "JS", bold: true },
                      { text: "🐍", bold: false },
                      { text: "🐋", bold: false },
                      { text: "PHP", bold: true },
                      { text: "🔥", bold: false },
                      { text: "🌐", bold: false }
                    ].map((duplicateItem, dupIndex) => (
                      <div key={`duplicate-second-${dupIndex}`} className="tech-logo-item mx-3">
                        <div className="theme-box rounded-lg p-4 h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transform hover:scale-110 transition-all">
                          <span className={`text-${duplicateItem.bold ? 'xl font-bold' : '2xl'}`}>{duplicateItem.text}</span>
                        </div>
                      </div>
                    ))}
                  </>
                ))}
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
          <ChevronDown size={32} className="theme-accent-primary" />
        </div>
      </section>
      
      {/* Features Section - Dynamic Grid Layout */}
      <section 
        ref={sectionOneRef}
        className="min-h-screen flex flex-col justify-center relative py-16 ml-4"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Where Your <span className="theme-accent-primary">AI</span> Vision Meets World-Class Execution
          </h2>
          
          {/* Dynamic Grid Layout */}
          <div className="grid grid-cols-6 gap-4 max-w-6xl mx-auto">
            {/* Top row */}
            <div className={`col-span-3 border theme-border p-12 transition-all duration-1000 ${isInView(sectionOneRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} text-left`}>
              <p className="text-2xl">Talent That Transcends the Trend</p>
              <p className="mt-4 theme-text-secondary">In the vast expanse of AI innovation, we bring you the rare few who deliver substance over spectacle — architects of solutions that move the needle.</p>
            </div>
            
            <div className={`col-span-3 border theme-border p-12 transition-all duration-1000 delay-200 ${isInView(sectionOneRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} text-left`}>
              <p className="text-2xl">AI That Fits, Flawlessly</p>
              <p className="mt-4 theme-text-secondary">Architects of seamless implementation who navigate both technological complexity and business imperatives with sophisticated clarity. Your vision, expertly realized.</p>
            </div>
            
            {/* Bottom row - varying sizes */}
            <div className={`col-span-4 border theme-border p-12 transition-all duration-1000 delay-400 ${isInView(sectionOneRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} text-left`}>
              <p className="text-2xl">Elite Minds, Proven Mastery</p>
              <p className="mt-4 theme-text-secondary">Work with specialists who've been meticulously screened and bring hands-on expertise from industry-leading AI deployments.</p>
            </div>
            
            <div className={`col-span-2 border theme-border p-12 transition-all duration-1000 delay-600 ${isInView(sectionOneRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} text-left`}>
              <p className="text-2xl">Scale Smart, Hire Smarter</p>
              <p className="mt-4 theme-text-secondary">Accelerate your AI vision with on-demand access to top-tier talent, minus the complexity and cost of traditional hiring.</p>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToNext(sectionTwoRef)}
        >
          <ChevronDown size={32} className="theme-accent-primary" />
        </div>
      </section>
      
      {/* Steps Section */}
      <section 
        ref={sectionTwoRef}
        className="min-h-screen flex flex-col justify-center relative pb-20 ml-4"
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold mb-16 transition-all duration-1000 ${isInView(sectionTwoRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
            Effortless Hiring. Exceptional Talent. Just Three Steps.
          </h2>
          
          {/* Modified grid structure with content boxes */}
          <div className="relative max-w-3xl mx-auto">
            {/* Grid container */}
            <div className="grid grid-cols-3 gap-0">
              {/* Cell 0,0 (Top-Left) - CONTENT BOX */}
              <div className={`border-2 theme-border theme-box shadow-lg shadow-blue-500/30 aspect-square flex items-center justify-center transition-all duration-1000 ${isInView(sectionTwoRef) ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-10'}`}>
                <div className="px-4">
                  <p className="text-lg font-semibold mb-2">Articulate Your Vision</p>
                  <p className="text-base theme-text-secondary">Engage with our discerning talent advisor to crystallize your ambitions. Together, we'll distill precise requirements that attract only the most relevant expertise for your unique challenge.</p>
                </div>
              </div>
              
              {/* Cell 0,1 (Top-Middle) - EMPTY */}
              <div className="border theme-border border-opacity-50 aspect-square flex items-center justify-center">
                <div className="opacity-0">Empty</div>
              </div>
              
              {/* Cell 0,2 (Top-Right) - Missing */}
              <div className="border-0 aspect-square flex items-center justify-center">
              </div>
              
              {/* Cell 1,0 (Middle-Left) - EMPTY */}
              <div className="border theme-border border-opacity-50 aspect-square flex items-center justify-center">
                <div className="opacity-0">Empty</div>
              </div>
              
              {/* Cell 1,1 (Middle-Middle) - CONTENT BOX */}
              <div className={`border-2 theme-border theme-box shadow-lg shadow-blue-500/30 aspect-square flex items-center justify-center transition-all duration-1000 delay-300 ${isInView(sectionTwoRef) ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}>
                <div className="px-4">
                  <p className="text-lg font-semibold mb-2">Get a Curated Match</p>
                  <p className="text-base theme-text-secondary">Receive a bespoke selection of distinguished specialists—each meticulously evaluated against your specific domain requirements, vision and technological landscape. Quality over quantity, always!</p>
                </div>
              </div>
              
              {/* Cell 1,2 (Middle-Right) - EMPTY */}
              <div className="border theme-border border-opacity-50 aspect-square flex items-center justify-center">
                <div className="opacity-0">Empty</div>
              </div>
              
              {/* Cell 2,0 (Bottom-Left) - Missing */}
              <div className="border-0 aspect-square flex items-center justify-center">
              </div>

              {/* Cell 2,1 (Bottom-Middle) - EMPTY */}
              <div className="border theme-border border-opacity-50 aspect-square flex items-center justify-center">
                <div className="opacity-0">Empty</div>
              </div>
              
              {/* Cell 2,2 (Bottom-Right) - CONTENT BOX */}
              <div className={`border-2 theme-border theme-box shadow-lg shadow-blue-500/30 aspect-square flex items-center justify-center transition-all duration-1000 delay-600 ${isInView(sectionTwoRef) ? 'opacity-100 transform-none' : 'opacity-0 translate-x-10'}`}>
                <div className="px-4">
                  <p className="text-lg font-semibold mb-2">Seamless Commencement</p>
                  <p className="text-base theme-text-secondary">Select your optimal engagement framework and initiate your collaboration with consummate ease. Onboard seamlessly and start building — no friction, no delays, just expert execution.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="mt-20 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded transition-all duration-300 transform hover:scale-105">
             Get Started Today
          </button>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="absolute bottom-0 w-full py-4 theme-bg-primary">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 AIWave. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/terms" className="theme-text-secondary hover:theme-accent-primary">Terms</a>
              <a href="/privacy" className="theme-text-secondary hover:theme-accent-primary">Privacy</a>
              <a href="/contact" className="theme-text-secondary hover:theme-accent-primary">Contact</a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}