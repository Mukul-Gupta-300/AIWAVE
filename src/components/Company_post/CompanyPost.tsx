import React, { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, X, ChevronDown, ChevronUp, Search, Filter, Plus, Moon, Sun, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

// Job listing type definition (matching the type from TalentApply)
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
  applicants?: number; // Added for company dashboard view
};

// Company information type
type CompanyInfo = {
  name: string;
  email: string;
  website: string;
  industry: string;
  size: string;
  description: string;
  logo: File | null;
};

// New job form type definition
type JobPostForm = {
  title: string;
  location: string;
  remote: boolean;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  description: string;
  skills: string[];
  salary: string;
};

export default function CompanyPost() {
  // Theme state (integrating with your existing theme functionality)
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'dark');
  
  // States for dashboard views
  const [dashboardView, setDashboardView] = useState<'jobs' | 'post' | 'edit' | 'applications' | 'profile'>('jobs');
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [viewingApplications, setViewingApplications] = useState<JobListing | null>(null);
  
  // Company information state
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'Quantum AI Solutions',
    email: 'hr@quantumai.tech',
    website: 'https://quantumai.tech',
    industry: 'Artificial Intelligence',
    size: '50-200',
    description: 'Leading provider of AI solutions specializing in large language models and machine learning infrastructure.',
    logo: null,
  });
  
  // New job form state
  const [newJobForm, setNewJobForm] = useState<JobPostForm>({
    title: '',
    location: '',
    remote: false,
    type: 'Full-time',
    description: '',
    skills: [],
    salary: '',
  });
  
  // Temp state for skill input
  const [skillInput, setSkillInput] = useState<string>('');
  
  // Navigation hook
  const navigate = useNavigate();
  
  // Toggle theme function (reusing from your existing code)
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Sample company's job listings data
  const [companyJobs, setCompanyJobs] = useState<JobListing[]>([
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
      applicants: 12,
    },
    {
      id: 'job6',
      title: 'MLOps Engineer',
      company: 'Quantum AI Solutions',
      location: 'Toronto, Canada',
      remote: true,
      type: 'Full-time',
      description: 'Build and maintain infrastructure for machine learning operations at scale. Design CI/CD pipelines for ML models, monitoring systems, and automated deployment workflows.',
      skills: ['Kubernetes', 'TensorFlow Serving', 'MLflow', 'Docker', 'Python'],
      salary: 'CAD 130,000 - 170,000',
      postedDate: '3d ago',
      applicants: 8,
    },
    {
      id: 'job7',
      title: 'AI Product Manager',
      company: 'Quantum AI Solutions',
      location: 'Remote',
      remote: true,
      type: 'Full-time',
      description: 'Lead the development of AI-powered products from conception to launch. Work with cross-functional teams to define requirements, roadmaps, and go-to-market strategies for our machine learning solutions.',
      skills: ['Product Management', 'AI/ML', 'Agile', 'Technical Communication', 'Market Research'],
      salary: '$120,000 - $160,000',
      postedDate: '1w ago',
      applicants: 15,
    },
  ]);
  
  // Sample applicants data
  const sampleApplicants = [
    {
      id: 'app1',
      jobId: 'job1',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      experience: '5-7',
      appliedDate: '2025-04-20',
      status: 'Under Review',
    },
    {
      id: 'app2',
      jobId: 'job1',
      name: 'Maya Patel',
      email: 'maya.patel@example.com',
      experience: '7-10',
      appliedDate: '2025-04-21',
      status: 'Interview Scheduled',
    },
    {
      id: 'app3',
      jobId: 'job1',
      name: 'Jaime Rodriguez',
      email: 'jaime.r@example.com',
      experience: '3-5',
      appliedDate: '2025-04-22',
      status: 'New',
    },
    {
      id: 'app4',
      jobId: 'job6',
      name: 'Sarah Kim',
      email: 'skim@example.com',
      experience: '5-7',
      appliedDate: '2025-04-23',
      status: 'New',
    },
    {
      id: 'app5',
      jobId: 'job6',
      name: 'Daniel Lee',
      email: 'd.lee@example.com',
      experience: '3-5',
      appliedDate: '2025-04-24',
      status: 'Under Review',
    },
  ];
  
  // Filter applicants for a specific job
  const getJobApplicants = (jobId: string) => {
    return sampleApplicants.filter(app => app.jobId === jobId);
  };
  
  // Handle form changes
  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "remote") {
      setNewJobForm({
        ...newJobForm,
        remote: (e.target as HTMLInputElement).checked,
      });
    } else {
      setNewJobForm({
        ...newJobForm,
        [name]: value,
      });
    }
  };
  
  // Handle company info form changes
  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    });
  };
  
  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyInfo({
        ...companyInfo,
        logo: e.target.files[0],
      });
    }
  };
  
  // Add skill to the list
  const addSkill = () => {
    if (skillInput.trim() !== '' && !newJobForm.skills.includes(skillInput.trim())) {
      setNewJobForm({
        ...newJobForm,
        skills: [...newJobForm.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };
  
  // Remove skill from the list
  const removeSkill = (skillToRemove: string) => {
    setNewJobForm({
      ...newJobForm,
      skills: newJobForm.skills.filter(skill => skill !== skillToRemove),
    });
  };
  
  // Submit new job posting
  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob: JobListing = {
      id: `job${Date.now()}`, // Generate unique ID
      title: newJobForm.title,
      company: companyInfo.name,
      location: newJobForm.location,
      remote: newJobForm.remote,
      type: newJobForm.type,
      description: newJobForm.description,
      skills: newJobForm.skills,
      salary: newJobForm.salary,
      postedDate: 'Just now',
      applicants: 0,
    };
    
    // If editing, update existing job
    if (editingJob) {
      setCompanyJobs(companyJobs.map(job => 
        job.id === editingJob.id ? { ...newJob, id: job.id, postedDate: job.postedDate, applicants: job.applicants } : job
      ));
      setEditingJob(null);
    } else {
      // Add new job to state
      setCompanyJobs([newJob, ...companyJobs]);
    }
    
    // Reset form and return to jobs view
    setNewJobForm({
      title: '',
      location: '',
      remote: false,
      type: 'Full-time',
      description: '',
      skills: [],
      salary: '',
    });
    setDashboardView('jobs');
  };
  
  // Set up form for editing
  const handleEditJob = (job: JobListing) => {
    setEditingJob(job);
    setNewJobForm({
      title: job.title,
      location: job.location,
      remote: job.remote,
      type: job.type,
      description: job.description,
      skills: [...job.skills],
      salary: job.salary,
    });
    setDashboardView('edit');
  };
  
  // Delete job posting
  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setCompanyJobs(companyJobs.filter(job => job.id !== jobId));
    }
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
            <div className="hidden md:block text-sm theme-text-secondary ml-2">| Company Dashboard</div>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <a href="/about" className="theme-text-secondary hover:theme-accent-primary">About</a>
            <a href="/services" className="theme-text-secondary hover:theme-accent-primary">Services</a>
            <a href="/contact" className="theme-text-secondary hover:theme-accent-primary">Contact</a>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        {/* Company Dashboard Section */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-1">
            <div className="theme-box theme-border p-6 rounded-lg sticky top-24">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                  Q
                </div>
                <div>
                  <h2 className="font-semibold">{companyInfo.name}</h2>
                  <p className="text-sm theme-text-secondary">{companyInfo.industry}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button 
                  onClick={() => setDashboardView('jobs')}
                  className={`w-full text-left p-3 rounded transition-colors duration-200 flex items-center ${dashboardView === 'jobs' ? 'bg-blue-600 text-white' : 'hover:theme-bg-hover'}`}
                >
                  <Briefcase size={18} className="mr-3" />
                  My Job Listings
                </button>
                <button 
                  onClick={() => {
                    setNewJobForm({
                      title: '',
                      location: '',
                      remote: false,
                      type: 'Full-time',
                      description: '',
                      skills: [],
                      salary: '',
                    });
                    setDashboardView('post');
                  }}
                  className={`w-full text-left p-3 rounded transition-colors duration-200 flex items-center ${dashboardView === 'post' ? 'bg-blue-600 text-white' : 'hover:theme-bg-hover'}`}
                >
                  <Plus size={18} className="mr-3" />
                  Post New Job
                </button>
                <button 
                  onClick={() => setDashboardView('profile')}
                  className={`w-full text-left p-3 rounded transition-colors duration-200 flex items-center ${dashboardView === 'profile' ? 'bg-blue-600 text-white' : 'hover:theme-bg-hover'}`}
                >
                  <Briefcase size={18} className="mr-3" />
                  Company Profile
                </button>
              </nav>
              
              <div className="mt-12 pt-6 border-t theme-border">
                <a href="/logout" className="text-sm theme-text-secondary hover:theme-accent-primary">
                  Log out
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="col-span-1 lg:col-span-3">
            {dashboardView === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Job Listings</h2>
                  <button 
                    onClick={() => setDashboardView('post')}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all duration-300"
                  >
                    <Plus size={18} className="mr-2" />
                    Post New Job
                  </button>
                </div>
                
                {companyJobs.length === 0 ? (
                  <div className="theme-box theme-border rounded-lg p-8 text-center">
                    <p className="theme-text-secondary text-lg mb-4">You haven't posted any jobs yet</p>
                    <button 
                      onClick={() => setDashboardView('post')}
                      className="theme-accent-primary hover:underline flex items-center justify-center mx-auto"
                    >
                      <Plus size={18} className="mr-2" />
                      Post your first job
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {companyJobs.map(job => (
                      <div 
                        key={job.id}
                        className="theme-box theme-border rounded-lg p-6"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold">
                            {job.title}
                          </h3>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditJob(job)}
                              className="p-2 rounded-full hover:theme-bg-hover"
                              aria-label="Edit job"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-2 rounded-full hover:theme-bg-hover text-red-500"
                              aria-label="Delete job"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <span className="theme-text-secondary">{job.location}</span>
                          {job.remote && (
                            <span className="ml-2 text-sm px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Remote
                            </span>
                          )}
                          <span className="mx-2">•</span>
                          <span>{job.type}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="theme-bg-hover p-4 rounded-lg">
                            <div className="text-sm theme-text-secondary mb-1">Posted</div>
                            <div>{job.postedDate}</div>
                          </div>
                          <div className="theme-bg-hover p-4 rounded-lg">
                            <div className="text-sm theme-text-secondary mb-1">Applicants</div>
                            <div>{job.applicants || 0}</div>
                          </div>
                          <div className="theme-bg-hover p-4 rounded-lg">
                            <div className="text-sm theme-text-secondary mb-1">Salary</div>
                            <div>{job.salary}</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map(skill => (
                            <span 
                              key={skill} 
                              className="px-3 py-1 rounded-full theme-border text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => {
                              setViewingApplications(job);
                              setDashboardView('applications');
                            }}
                            className="theme-accent-primary hover:underline text-sm"
                          >
                            View {job.applicants || 0} applications
                          </button>
                          
                          <span className="text-sm theme-text-secondary">
                            ID: {job.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {(dashboardView === 'post' || dashboardView === 'edit') && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {dashboardView === 'edit' ? 'Edit Job Posting' : 'Post New Job'}
                  </h2>
                  <button 
                    onClick={() => {
                      setDashboardView('jobs');
                      setEditingJob(null);
                    }}
                    className="theme-text-secondary hover:theme-accent-primary flex items-center"
                  >
                    <X size={18} className="mr-2" />
                    Cancel
                  </button>
                </div>
                
                <div className="theme-box theme-border rounded-lg p-6">
                  <form onSubmit={handleSubmitJob} className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block mb-1 font-medium">Job Title *</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newJobForm.title}
                        onChange={handleJobFormChange}
                        required
                        className="w-full p-3 theme-box theme-border rounded-lg"
                        placeholder="e.g. Senior ML Engineer, AI Product Manager"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="location" className="block mb-1 font-medium">Location *</label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={newJobForm.location}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 theme-box theme-border rounded-lg"
                          placeholder="e.g. San Francisco, CA"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="type" className="block mb-1 font-medium">Job Type *</label>
                        <select
                          id="type"
                          name="type"
                          value={newJobForm.type}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 theme-box theme-border rounded-lg"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Freelance">Freelance</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remote"
                        name="remote"
                        checked={newJobForm.remote}
                        onChange={handleJobFormChange}
                        className="mr-2"
                      />
                      <label htmlFor="remote">This position is remote-friendly</label>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block mb-1 font-medium">Job Description *</label>
                      <textarea
                        id="description"
                        name="description"
                        value={newJobForm.description}
                        onChange={handleJobFormChange}
                        required
                        rows={6}
                        className="w-full p-3 theme-box theme-border rounded-lg resize-none"
                        placeholder="Describe the role, responsibilities, and requirements..."
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="skills" className="block mb-1 font-medium">Required Skills *</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {newJobForm.skills.map(skill => (
                          <span 
                            key={skill} 
                            className="px-3 py-1 rounded-full theme-border text-sm flex items-center"
                          >
                            {skill}
                            <button 
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-red-500"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          id="skills"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          className="w-full p-3 theme-box theme-border rounded-l-lg"
                          placeholder="e.g. Python, Machine Learning, TensorFlow"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="salary" className="block mb-1 font-medium">Salary/Compensation *</label>
                      <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={newJobForm.salary}
                        onChange={handleJobFormChange}
                        required
                        className="w-full p-3 theme-box theme-border rounded-lg"
                        placeholder="e.g. $120,000 - $150,000, $50/hr"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-all duration-300"
                      >
                        {dashboardView === 'edit' ? 'Update Job Posting' : 'Post Job'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {dashboardView === 'applications' && viewingApplications && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Applications for {viewingApplications.title}</h2>
                  <button 
                    onClick={() => {
                      setDashboardView('jobs');
                      setViewingApplications(null);
                    }}
                    className="theme-text-secondary hover:theme-accent-primary flex items-center"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Jobs
                  </button>
                </div>
                
                <div className="theme-box theme-border rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm theme-text-secondary">Job ID</div>
                      <div>{viewingApplications.id}</div>
                    </div>
                    <div>
                      <div className="text-sm theme-text-secondary">Posted</div>
                      <div>{viewingApplications.postedDate}</div>
                    </div>
                    <div>
                      <div className="text-sm theme-text-secondary">Total Applicants</div>
                      <div>{viewingApplications.applicants || 0}</div>
                    </div>
                  </div>
                </div>
                
                {getJobApplicants(viewingApplications.id).length === 0 ? (
                  <div className="theme-box theme-border rounded-lg p-8 text-center">
                    <p className="theme-text-secondary text-lg">No applications received yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getJobApplicants(viewingApplications.id).map(applicant => (
                      <div 
                        key={applicant.id}
                        className="theme-box theme-border rounded-lg p-6"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">{applicant.name}</h3>
                            <p className="theme-text-secondary">{applicant.email}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            applicant.status === 'New' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 
                            applicant.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' : 
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          }`}>
                            {applicant.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                          <div>
                            <div className="text-sm theme-text-secondary">Experience Level</div>
                            <div>{applicant.experience} years</div>
                          </div>
                          <div>
                            <div className="text-sm theme-text-secondary">Applied On</div>
                            <div>{applicant.appliedDate}</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-4">
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                            View Application
                          </button>
                          <button className="px-4 py-2 theme-box theme-border hover:theme-bg-hover rounded">
                            Download Resume
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {dashboardView === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Company Profile</h2>
                  <div className="text-sm theme-text-secondary">
                    Last updated: April 12, 2025
                  </div>
                </div>
                
                <div className="theme-box theme-border rounded-lg p-6">
                  <form className="space-y-6">
                    <div className="mb-6">
                      <label className="block mb-1 font-medium">Company Logo</label>
                      <div className="flex items-center">
                        <div className="w-24 h-24 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-3xl mr-6">
                          Q
                        </div>
                        <div>
                          <input
                            type="file"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="mb-2"
                          />
                          <p className="text-sm theme-text-secondary">Recommended size: 400x400px. Max file size: 2MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium">Company Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={companyInfo.name}
                        onChange={handleCompanyInfoChange}
                        required
                        className="w-full p-3 theme-box theme-border rounded-lg"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Contact Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={companyInfo.email}
                          onChange={handleCompanyInfoChange}
                          required
                          className="w-full p-3 theme-box theme-border rounded-lg"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block mb-1 font-medium">Website</label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          value={companyInfo.website}
                          onChange={handleCompanyInfoChange}
                          className="w-full p-3 theme-box theme-border rounded-lg"
                          placeholder="https://"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="industry" className="block mb-1 font-medium">Industry *</label>
                        <select
                          id="industry"
                          name="industry"
                          value={companyInfo.industry}
                          onChange={handleCompanyInfoChange}
                          required
                          className="w-full p-3 theme-box theme-border rounded-lg"
                        >
                          <option value="">Select an industry</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Software Development">Software Development</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Cloud Computing">Cloud Computing</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Fintech">Fintech</option>
                          <option value="Healthcare Tech">Healthcare Tech</option>
                          <option value="Robotics">Robotics</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="size" className="block mb-1 font-medium">Company Size</label>
                        <select
                          id="size"
                          name="size"
                          value={companyInfo.size}
                          onChange={handleCompanyInfoChange}
                          className="w-full p-3 theme-box theme-border rounded-lg"
                        >
                          <option value="">Select size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="50-200">50-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block mb-1 font-medium">Company Description *</label>
                      <textarea
                        id="description"
                        name="description"
                        value={companyInfo.description}
                        onChange={handleCompanyInfoChange}
                        required
                        rows={6}
                        className="w-full p-3 theme-box theme-border rounded-lg resize-none"
                        placeholder="Tell potential applicants about your company, mission, and culture..."
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Social Media Profiles</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="linkedin" className="block mb-1">LinkedIn</label>
                          <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            className="w-full p-3 theme-box theme-border rounded-lg"
                            placeholder="https://linkedin.com/company/..."
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="twitter" className="block mb-1">Twitter/X</label>
                          <input
                            type="url"
                            id="twitter"
                            name="twitter"
                            className="w-full p-3 theme-box theme-border rounded-lg"
                            placeholder="https://twitter.com/..."
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="github" className="block mb-1">GitHub</label>
                          <input
                            type="url"
                            id="github"
                            name="github"
                            className="w-full p-3 theme-box theme-border rounded-lg"
                            placeholder="https://github.com/..."
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="facebook" className="block mb-1">Facebook</label>
                          <input
                            type="url"
                            id="facebook"
                            name="facebook"
                            className="w-full p-3 theme-box theme-border rounded-lg"
                            placeholder="https://facebook.com/..."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end space-x-4">
                      <button
                        type="button"
                        className="px-6 py-3 theme-box theme-border hover:theme-bg-hover font-medium rounded transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-all duration-300"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="theme-box theme-border rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold mb-4">Subscription Plan</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-6">
                    <div>
                      <div className="font-medium">Pro Plan</div>
                      <div className="text-sm theme-text-secondary">5 active job postings, premium placement</div>
                    </div>
                    <div className="font-semibold">$99/month</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="theme-bg-hover p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">3/5</div>
                      <div className="text-sm theme-text-secondary">Active Jobs</div>
                    </div>
                    <div className="theme-bg-hover p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">35</div>
                      <div className="text-sm theme-text-secondary">Total Applicants</div>
                    </div>
                    <div className="theme-bg-hover p-4 rounded-lg text-center">
                      <div className="text-xl font-bold">April 28, 2025</div>
                      <div className="text-sm theme-text-secondary">Next Billing Date</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="text-sm theme-accent-primary hover:underline">
                      Manage subscription
                    </button>
                  </div>
                </div>
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