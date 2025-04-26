import React, { useState } from 'react';
import { ArrowLeft, Briefcase, X, ChevronDown, ChevronUp, Search, Filter, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

// Job listing type definition
type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  description: string;
  skills: string[];
  salary: string;
  postedDate: string;
};

// Application form type definition
type ApplicationForm = {
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
  resume: File | null;
  coverLetter: string;
  yearsOfExperience: string;
  relevantProjects: string;
  availability: string;
  hearAboutUs: string;
};

export default function TalentApply() {
  // Theme state (integrating with your existing theme functionality)
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'dark');
  
  // States for filtering and searching
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [isRemoteOnly, setIsRemoteOnly] = useState<boolean>(false);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  
  // Application states
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState<boolean>(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  
  // Application form state
  const [applicationForm, setApplicationForm] = useState<ApplicationForm>({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    resume: null,
    coverLetter: '',
    yearsOfExperience: '',
    relevantProjects: '',
    availability: '',
    hearAboutUs: '',
  });
  
  // Navigation hook (for returning to main page)
  const navigate = useNavigate();
  
  // Toggle theme function (reusing from your existing code)
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Sample job listings data
  const jobListings: JobListing[] = [
    {
      id: 'job1',
      title: 'Senior ML Engineer - LLM Specialist',
      company: 'Quantum AI Solutions',
      location: 'San Francisco, CA',
      remote: true,
      type: 'Full-time',
      description: 'Seeking a specialist in large language models with experience in fine-tuning and deploying transformer-based architectures at scale. You will work on cutting-edge NLP applications, optimizing models for production environments and collaborating with cross-functional teams.',
      skills: ['PyTorch', 'Transformers', 'RLHF', 'MLOps', 'Python', 'Docker'],
      salary: '$150,000 - $210,000',
      postedDate: '2d ago',
    },
    {
      id: 'job2',
      title: 'Computer Vision Expert',
      company: 'Visionary Tech',
      location: 'Boston, MA',
      remote: true,
      type: 'Contract',
      description: 'Join our team to develop next-generation computer vision solutions for retail analytics. You will design and implement algorithms for object detection, segmentation, and tracking in complex environments.',
      skills: ['TensorFlow', 'OpenCV', 'YOLO', 'Python', 'C++'],
      salary: '$120/hr',
      postedDate: '1w ago',
    },
    {
      id: 'job3',
      title: 'AI Research Scientist',
      company: 'DeepMind Research Labs',
      location: 'London, UK',
      remote: false,
      type: 'Full-time',
      description: 'Conduct fundamental research in reinforcement learning and multi-agent systems. Publish cutting-edge papers and develop novel algorithms that push the boundaries of AI capabilities.',
      skills: ['Reinforcement Learning', 'Game Theory', 'PyTorch', 'TensorFlow', 'PhD in AI/ML'],
      salary: '£110,000 - £160,000',
      postedDate: '3d ago',
    },
    {
      id: 'job4',
      title: 'NLP Engineer - Conversational AI',
      company: 'ChatWorks Inc.',
      location: 'Remote',
      remote: true,
      type: 'Freelance',
      description: 'Develop and optimize conversational AI systems for customer service applications. Improve intent recognition, context handling, and natural language generation for more human-like interactions.',
      skills: ['BERT', 'GPT', 'Rasa', 'Python', 'FastAPI'],
      salary: '$90-120/hr',
      postedDate: '5d ago',
    },
    {
      id: 'job5',
      title: 'AI Ethics Researcher',
      company: 'Ethical AI Institute',
      location: 'Berlin, Germany',
      remote: true,
      type: 'Part-time',
      description: 'Join our multidisciplinary team working on frameworks for ethical AI deployment. Research fairness metrics, develop bias detection tools, and create guidelines for responsible AI use.',
      skills: ['Fairness in ML', 'Causal Inference', 'Python', 'Social Science', 'Ethics'],
      salary: '€60,000 - €80,000 (pro-rated)',
      postedDate: '2w ago',
    },
    {
      id: 'job6',
      title: 'MLOps Engineer',
      company: 'ScaleAI Systems',
      location: 'Toronto, Canada',
      remote: true,
      type: 'Full-time',
      description: 'Build and maintain infrastructure for machine learning operations at scale. Design CI/CD pipelines for ML models, monitoring systems, and automated deployment workflows.',
      skills: ['Kubernetes', 'TensorFlow Serving', 'MLflow', 'Docker', 'Python'],
      salary: 'CAD 130,000 - 170,000',
      postedDate: '3d ago',
    },
  ];
  
  // Filter jobs based on search term and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type);
    const matchesRemote = !isRemoteOnly || job.remote;
    
    return matchesSearch && matchesJobType && matchesRemote;
  });
  
  // Handle job type filter selection
  const toggleJobTypeFilter = (jobType: string) => {
    if (selectedJobTypes.includes(jobType)) {
      setSelectedJobTypes(selectedJobTypes.filter(type => type !== jobType));
    } else {
      setSelectedJobTypes([...selectedJobTypes, jobType]);
    }
  };
  
  // Handle job selection
  const handleJobSelect = (job: JobListing) => {
    setSelectedJob(job);
    window.scrollTo(0, 0);
  };
  
  // Handle application form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicationForm({
      ...applicationForm,
      [name]: value,
    });
  };
  
  // Handle file upload for resume
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationForm({
        ...applicationForm,
        resume: e.target.files[0],
      });
    }
  };
  
  // Submit application form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Application submitted:", applicationForm);
    console.log("For job:", selectedJob);
    
    // Show success message
    setApplicationSubmitted(true);
    
    // Reset form after submission (in a real app, you might redirect instead)
    setTimeout(() => {
      setApplicationSubmitted(false);
      setShowApplicationForm(false);
    }, 3000);
  };
  
  return (
    <div className="theme-bg-primary theme-text-primary min-h-screen font-sans">
      {/* Theme Toggle Button */}
      <button 
        className="fixed top-4 right-4 z-50 p-2 rounded-full theme-box"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      {/* Header */}
      <header className="theme-box shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center theme-text-secondary hover:theme-accent-primary"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </button>
            <div className="text-xl font-bold theme-text-primary ml-4">AIWAVE</div>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <a href="/about" className="theme-text-secondary hover:theme-accent-primary">About</a>
            <a href="/services" className="theme-text-secondary hover:theme-accent-primary">Services</a>
            <a href="/contact" className="theme-text-secondary hover:theme-accent-primary">Contact</a>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="theme-accent-primary">AI Legacy</span> Begins Here
          </h1>
          <p className="text-xl mb-6 max-w-3xl mx-auto theme-text-secondary">
            Join the elite ranks of AI specialists making an impact on tomorrow's technology landscape. 
            Browse our curated opportunities and find the perfect match for your expertise.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by skill, title, or company..."
              className="w-full py-3 pl-12 pr-4 theme-box theme-border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>
        
        {/* Job Listings Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Panel */}
          <div className="col-span-1 mb-8 lg:mb-0">
            <div className="theme-box theme-border p-6 rounded-lg sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filters
                </h2>
                <button 
                  onClick={() => setFiltersExpanded(!filtersExpanded)}
                  className="theme-text-secondary lg:hidden"
                >
                  {filtersExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div className={`${filtersExpanded ? 'block' : 'hidden lg:block'} space-y-6`}>
                {/* Job Type Filter */}
                <div>
                  <h3 className="font-medium mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(jobType => (
                      <div key={jobType} className="flex items-center">
                        <input
                          type="checkbox"
                          id={jobType}
                          checked={selectedJobTypes.includes(jobType)}
                          onChange={() => toggleJobTypeFilter(jobType)}
                          className="mr-2"
                        />
                        <label htmlFor={jobType} className="theme-text-secondary">{jobType}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Remote Only Filter */}
                <div>
                  <h3 className="font-medium mb-3">Location</h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remote"
                      checked={isRemoteOnly}
                      onChange={() => setIsRemoteOnly(!isRemoteOnly)}
                      className="mr-2"
                    />
                    <label htmlFor="remote" className="theme-text-secondary">Remote Only</label>
                  </div>
                </div>
                
                {/* Clear Filters Button */}
                <button 
                  onClick={() => {
                    setSelectedJobTypes([]);
                    setIsRemoteOnly(false);
                    setSearchTerm('');
                  }}
                  className="theme-accent-primary hover:underline text-sm"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Job List and Details */}
          <div className="col-span-1 lg:col-span-2">
            {selectedJob && !showApplicationForm ? (
              /* Job Details View */
              <div className="theme-box theme-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <button 
                    onClick={() => setSelectedJob(null)} 
                    className="theme-text-secondary hover:theme-accent-primary flex items-center"
                  >
                    <ArrowLeft size={18} className="mr-1" />
                    Back to listings
                  </button>
                  <span className="text-sm px-3 py-1 rounded-full theme-border">
                    {selectedJob.postedDate}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                <div className="flex items-center text-lg mb-4">
                  <span className="theme-accent-primary font-medium">{selectedJob.company}</span>
                  <span className="mx-2">•</span>
                  <span className="theme-text-secondary">{selectedJob.location}</span>
                  {selectedJob.remote && (
                    <span className="ml-2 text-sm px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Remote
                    </span>
                  )}
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Briefcase size={18} className="mr-2 theme-text-secondary" />
                    <span>{selectedJob.type}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedJob.salary}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                  <p className="theme-text-secondary mb-4">{selectedJob.description}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 rounded-full theme-border text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-all duration-300"
                >
                  Apply for this position
                </button>
              </div>
            ) : showApplicationForm && selectedJob ? (
              /* Application Form View */
              <div className="theme-box theme-border rounded-lg p-6">
                {applicationSubmitted ? (
                  <div className="text-center py-12">
                    <div className="mb-4 text-green-500 dark:text-green-400">
                      <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                    <p className="theme-text-secondary mb-8">
                      Thank you for applying to {selectedJob.title} at {selectedJob.company}.
                      We'll review your application and get back to you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <button 
                        onClick={() => setShowApplicationForm(false)} 
                        className="theme-text-secondary hover:theme-accent-primary flex items-center"
                      >
                        <ArrowLeft size={18} className="mr-1" />
                        Back to job details
                      </button>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2">Apply for {selectedJob.title}</h2>
                    <p className="theme-text-secondary mb-6">
                      Please fill out the form below to apply for this position at {selectedJob.company}.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        
                        <div>
                          <label htmlFor="fullName" className="block mb-1">Full Name *</label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={applicationForm.fullName}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 theme-box theme-border rounded-lg"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block mb-1">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={applicationForm.email}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 theme-box theme-border rounded-lg"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block mb-1">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={applicationForm.phone}
                            onChange={handleFormChange}
                            className="w-full p-3 theme-box theme-border rounded-lg"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="portfolio" className="block mb-1">Portfolio/GitHub URL</label>
                          <input
                            type="url"
                            id="portfolio"
                            name="portfolio"
                            value={applicationForm.portfolio}
                            onChange={handleFormChange}
                            className="w-full p-3 theme-box theme-border rounded-lg"
                            placeholder="https://"
                          />
                        </div>
                      </div>
                      
                      {/* Resume and Cover Letter */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Resume & Cover Letter</h3>
                        
                        <div>
                          <label htmlFor="resume" className="block mb-1">Resume/CV (PDF) *</label>
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            required
                            className="w-full p-3 theme-box theme-border rounded-lg"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="coverLetter" className="block mb-1">Cover Letter</label>
                          <textarea
                            id="coverLetter"
                            name="coverLetter"
                            value={applicationForm.coverLetter}
                            onChange={handleFormChange}
                            rows={5}
                            className="w-full p-3 theme-box theme-border rounded-lg resize-none"
                            placeholder="Tell us why you're interested in this position and what makes you a great fit."
                          />
                        </div>
                      </div>
                      
                      {/* Experience and Availability */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Experience & Availability</h3>
                        
                        <div>
                          <label htmlFor="yearsOfExperience" className="block mb-1">Years of Experience *</label>
                          <select
                            id="yearsOfExperience"
                            name="yearsOfExperience"
                            value={applicationForm.yearsOfExperience}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 theme-box theme-border rounded-lg"
                          >
                            <option value="">Select experience level</option>
                            <option value="0-1">Less than 1 year</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5-7">5-7 years</option>
                            <option value="7-10">7-10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="relevantProjects" className="block mb-1">Relevant Projects/Experience *</label>
                          <textarea
                            id="relevantProjects"
                            name="relevantProjects"
                            value={applicationForm.relevantProjects}
                            onChange={handleFormChange}
                            required
                            rows={5}
                            className="w-full p-3 theme-box theme-border rounded-lg resize-none"
                            placeholder="Describe 2-3 relevant projects or experiences that demonstrate your expertise in this area."
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="availability" className="block mb-1">Earliest Start Date *</label>
                          <input
                            type="text"
                            id="availability"
                            name="availability"
                            value={applicationForm.availability}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 theme-box theme-border rounded-lg"
                            placeholder="e.g., Immediately, 2 weeks notice, MM/DD/YYYY"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="hearAboutUs" className="block mb-1">How did you hear about us?</label>
                          <select
                            id="hearAboutUs"
                            name="hearAboutUs"
                            value={applicationForm.hearAboutUs}
                            onChange={handleFormChange}
                            className="w-full p-3 theme-box theme-border rounded-lg"
                          >
                            <option value="">Select an option</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="github">GitHub</option>
                            <option value="twitter">Twitter</option>
                            <option value="referral">Referral</option>
                            <option value="job-board">Job Board</option>
                            <option value="conference">Conference/Event</option>
                            <option value="search">Search Engine</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-all duration-300"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            ) : (
              /* Job Listings View */
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'} Available
                  </h2>
                  
                  <div className="text-sm theme-text-secondary">
                    Sorted by latest
                  </div>
                </div>
                
                {filteredJobs.length === 0 ? (
                  <div className="theme-box theme-border rounded-lg p-8 text-center">
                    <p className="theme-text-secondary text-lg mb-4">No positions match your search criteria</p>
                    <button 
                      onClick={() => {
                        setSelectedJobTypes([]);
                        setIsRemoteOnly(false);
                        setSearchTerm('');
                      }}
                      className="theme-accent-primary hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredJobs.map(job => (
                      <div 
                        key={job.id}
                        className="theme-box theme-border rounded-lg p-6 transition-all duration-200 hover:shadow-lg cursor-pointer"
                        onClick={() => handleJobSelect(job)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold">
                            {job.title}
                          </h3>
                          <span className="text-sm px-3 py-1 rounded-full theme-border">
                            {job.postedDate}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <span className="theme-accent-primary font-medium">{job.company}</span>
                          <span className="mx-2">•</span>
                          <span className="theme-text-secondary">{job.location}</span>
                          {job.remote && (
                            <span className="ml-2 text-sm px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Remote
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <Briefcase size={16} className="mr-2 theme-text-secondary" />
                          <span>{job.type}</span>
                          <span className="mx-2">•</span>
                          <span>{job.salary}</span>
                        </div>
                        
                        <p className="theme-text-secondary mb-4 line-clamp-2">
                          {job.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 4).map(skill => (
                            <span 
                              key={skill} 
                              className="px-3 py-1 rounded-full theme-border text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="px-3 py-1 rounded-full theme-border text-sm">
                              +{job.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="theme-bg-primary py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 AIWave. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="/terms" className="theme-text-secondary hover:theme-accent-primary">Terms</a>
              <a href="/privacy" className="theme-text-secondary hover:theme-accent-primary">Privacy</a>
              <a href="/contact" className="theme-text-secondary hover:theme-accent-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

