import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Download, Plus, Trash2, Save, Sparkles } from "lucide-react";
import { ResumeData, FormStep, PersonalInfo, Education, Skill, Experience, Project, Certification } from "@/types/resume";
import { ModernLayout } from "@/components/resume/ModernLayout";
import { MinimalLayout } from "@/components/resume/MinimalLayout";
import { ProfessionalLayout } from "@/components/resume/ProfessionalLayout";
import { TestLayout } from "@/components/resume/TestLayout";
import { ResumeService } from "@/lib/resumeService";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Builder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    title: 'My Resume',
    personalInfo: { 
      fullName: 'Your Name', 
      email: 'your.email@example.com', 
      phone: '+1 (555) 123-4567', 
      location: 'City, State', 
      linkedin: '', 
      website: '', 
      summary: 'Professional summary goes here...' 
    },
    education: [{ id: '1', institution: 'University Name', degree: 'Degree', field: 'Field of Study', startDate: '2020-01', endDate: '2024-05', gpa: '' }],
    skills: [
      { id: '1', name: 'Skill 1', category: 'technical' },
      { id: '2', name: 'Skill 2', category: 'technical' },
      { id: '3', name: 'Skill 3', category: 'technical' }
    ],
    experience: [{ id: '1', company: 'Company Name', position: 'Job Title', location: 'Location', startDate: '2022-01', endDate: '', current: true, description: 'Job description and achievements...' }],
    projects: [],
    certifications: [],
    templateLayout: 'modern'
  });

  const [newSkill, setNewSkill] = useState({ name: '', category: 'technical' as Skill['category'] });
  const steps: FormStep[] = ['personal', 'education', 'skills', 'experience', 'projects', 'certifications', 'preview'];

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in to use the resume builder");
      navigate("/signin");
      return;
    }

    setUserId(session.user.id);

    const id = searchParams.get('id');
    const template = searchParams.get('template');
    
    if (template) {
      setResumeData(prev => ({ ...prev, templateLayout: template as any }));
    }

    if (id) {
      loadResume(id, session.user.id);
    }
  };

  const loadResume = async (id: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setResumeId(id);
        
        // Check if using new resume_data JSONB field or old individual columns
        let resumeDataFromDB;
        
        if ((data as any).resume_data) {
          // New schema with JSONB field
          resumeDataFromDB = (data as any).resume_data;
        } else {
          // Old schema with individual columns - reconstruct the data
          resumeDataFromDB = {
            personalInfo: data.personal_info || {},
            education: data.education || [],
            skills: data.skills || [],
            experience: data.experience || [],
            projects: data.projects || [],
            certifications: data.certifications || []
          };
        }
        
        setResumeData({
          id: data.id,
          title: data.title,
          personalInfo: resumeDataFromDB.personalInfo || { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '', summary: '' },
          education: resumeDataFromDB.education || [{ id: '1', institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }],
          skills: resumeDataFromDB.skills || [],
          experience: resumeDataFromDB.experience || [{ id: '1', company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }],
          projects: resumeDataFromDB.projects || [],
          certifications: resumeDataFromDB.certifications || [],
          templateLayout: data.template_layout as any || 'modern'
        });
        console.log('Loaded resume with template:', data.template_layout);
        console.log('Loaded resume data:', resumeDataFromDB);
      }
    } catch (error: any) {
      toast.error("Failed to load resume");
    }
  };

  const saveResume = async () => {
    if (!userId) {
      toast.error("Please sign in to save");
      throw new Error("User not authenticated");
    }

    try {
      const resumePayload = {
        user_id: userId,
        title: resumeData.title || 'Untitled Resume',
        template_layout: resumeData.templateLayout,
        resume_data: resumeData,
        status: 'draft'
      };

      if (resumeId) {
        const { error } = await supabase
          .from('resumes')
          .update(resumePayload)
          .eq('id', resumeId);
        
        if (error) throw error;
        toast.success("Resume updated successfully!");
        return resumeId;
      } else {
        const { data, error } = await supabase
          .from('resumes')
          .insert([resumePayload])
          .select()
          .single();

        if (error) throw error;
        setResumeId(data.id);
        toast.success("Resume saved successfully!");
        return data.id;
      }
    } catch (error: any) {
      console.error("Save resume error:", error);
      toast.error("Failed to save resume: " + (error.message || "Unknown error"));
      throw error;
    }
  };

  const handleDownloadPDF = async () => {
    try {
      let currentResumeId = resumeId;
      
      // First save the resume if not already saved
      if (!currentResumeId) {
        toast.info("Saving resume first...");
        
        // Use the returned ID from saveResume
        currentResumeId = await saveResume();
        
        if (!currentResumeId) {
          toast.error("Failed to save resume. Please try again.");
          return;
        }
        
        console.log("Resume saved with ID:", currentResumeId);
      }

      toast.info("Generating PDF...");
      
      const { data, error } = await ResumeService.generateAndSavePDF(
        currentResumeId, 
        'resume-preview', 
        resumeData.title || 'resume'
      );

      if (error) {
        console.error('PDF generation error:', error);
        throw new Error(error.message);
      }

      console.log('PDF generation result:', data);
      
      if (!data?.pdf_file_name) {
        throw new Error('PDF generation succeeded but no file name returned');
      }

      toast.success("PDF generated! Starting download...");
      
      // Download the PDF immediately after saving
      await ResumeService.downloadPDF(currentResumeId, data.pdf_file_name);
      
      toast.success("PDF downloaded successfully!");
      
    } catch (error: any) {
      console.error('PDF generation failed:', error);
      toast.error("Failed to generate PDF: " + (error.message || "Unknown error"));
    }
  };



  const addSkill = () => {
    if (newSkill.name.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, { id: Date.now().toString(), ...newSkill, name: newSkill.name.trim() }]
      }));
      setNewSkill({ name: '', category: 'technical' });
    }
  };

  const renderResumePreview = () => {
    const props = { data: resumeData };
    console.log('Rendering template:', resumeData.templateLayout, 'Data:', resumeData);
    console.log('Personal info:', resumeData.personalInfo);
    console.log('Experience:', resumeData.experience);
    console.log('Education:', resumeData.education);
    console.log('Skills:', resumeData.skills);
    
    switch (resumeData.templateLayout) {
      case 'minimal': 
        console.log('Using MinimalLayout');
        return <MinimalLayout {...props} />;
      case 'professional': 
        console.log('Using ProfessionalLayout');
        return <ProfessionalLayout {...props} />;
      case 'test':
        console.log('Using TestLayout');
        return <TestLayout {...props} />;
      default: 
        console.log('Using ModernLayout (default)');
        return <ModernLayout {...props} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Step Indicator */}
              <div className="flex justify-between overflow-x-auto pb-2">
                {steps.map((step, idx) => (
                  <div key={step} className="flex items-center flex-1">
                    <button
                      onClick={() => setCurrentStep(step)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${
                        currentStep === step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {idx + 1}
                    </button>
                    {idx < steps.length - 1 && <div className="flex-1 h-0.5 bg-border mx-1" />}
                  </div>
                ))}
              </div>

              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold capitalize">{currentStep}</h2>
                  <div className="flex items-center gap-3">
                    {/* Template Selector - Always Visible */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Template:</span>
                      <select 
                        value={resumeData.templateLayout} 
                        onChange={(e) => {
                          console.log('Template changed to:', e.target.value);
                          setResumeData(prev => ({...prev, templateLayout: e.target.value as any}));
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="modern">Modern</option>
                        <option value="minimal">Minimal</option>
                        <option value="professional">Professional</option>
                        <option value="test">Test</option>
                      </select>
                    </div>
                    <Button onClick={saveResume} variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>

                {/* Personal Info Form */}
                {currentStep === 'personal' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Resume Title</Label>
                      <Input value={resumeData.title} onChange={(e) => setResumeData(prev => ({...prev, title: e.target.value}))} placeholder="e.g., Software Engineer Resume" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Full Name *</Label><Input value={resumeData.personalInfo.fullName} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, fullName: e.target.value}}))} /></div>
                      <div><Label>Email *</Label><Input type="email" value={resumeData.personalInfo.email} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, email: e.target.value}}))} /></div>
                      <div><Label>Phone *</Label><Input value={resumeData.personalInfo.phone} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, phone: e.target.value}}))} /></div>
                      <div><Label>Location *</Label><Input value={resumeData.personalInfo.location} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, location: e.target.value}}))} /></div>
                      <div><Label>LinkedIn</Label><Input value={resumeData.personalInfo.linkedin || ''} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, linkedin: e.target.value}}))} /></div>
                      <div><Label>Website</Label><Input value={resumeData.personalInfo.website || ''} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, website: e.target.value}}))} /></div>
                    </div>
                    <div><Label>Professional Summary</Label><Textarea value={resumeData.personalInfo.summary || ''} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, summary: e.target.value}}))} rows={4} placeholder="Brief overview of your professional background" /></div>
                  </div>
                )}

                {currentStep === 'experience' && (
                  <div className="space-y-4">
                    {resumeData.experience.map((exp, idx) => (
                      <div key={exp.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">Experience {idx + 1}</h3>
                          {resumeData.experience.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== exp.id) }))}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><Label>Company</Label><Input value={exp.company} onChange={(event) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, company: event.target.value } : e) }))} /></div>
                          <div><Label>Position</Label><Input value={exp.position} onChange={(event) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, position: event.target.value } : e) }))} /></div>
                          <div><Label>Location</Label><Input value={exp.location} onChange={(event) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, location: event.target.value } : e) }))} /></div>
                          <div>
                            <Label>Current</Label>
                            <Checkbox
                              checked={exp.current}
                              onCheckedChange={(checked) => setResumeData(prev => ({
                                ...prev,
                                experience: prev.experience.map(e => e.id === exp.id ? { ...e, current: !!checked } : e)
                              }))}
                            />
                          </div>
                          <div><Label>Start Date</Label><Input type="month" value={exp.startDate} onChange={(event) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, startDate: event.target.value } : e) }))} /></div>
                          <div><Label>End Date</Label><Input type="month" value={exp.endDate} onChange={(event) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, endDate: event.target.value } : e) }))} /></div>
                        </div>
                        <div><Label>Description</Label><Textarea value={exp.description} onChange={(event) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, description: event.target.value } : e) }))} rows={4} placeholder="Describe your responsibilities and achievements" /></div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setResumeData(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now().toString(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }] }))} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />Add Experience
                    </Button>
                  </div>
                )}

                {currentStep === 'projects' && (
                  <div className="space-y-4">
                    {resumeData.projects.map((project, idx) => (
                      <div key={project.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">Project {idx + 1}</h3>
                          {resumeData.projects.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => setResumeData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== project.id) }))}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div><Label>Name</Label><Input value={project.name} onChange={(event) => setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === project.id ? { ...p, name: event.target.value } : p) }))} /></div>
                        <div><Label>Description</Label><Textarea value={project.description} onChange={(event) => setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === project.id ? { ...p, description: event.target.value } : p) }))} rows={4} placeholder="Describe the project and your role" /></div>
                        <div><Label>Technologies</Label><Input value={project.technologies.join(', ')} onChange={(event) => setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === project.id ? { ...p, technologies: event.target.value.split(',').map(t => t.trim()) } : p) }))} placeholder="e.g., React, Node.js, PostgreSQL" /></div>
                        <div><Label>Link</Label><Input type="url" value={project.link || ''} onChange={(event) => setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === project.id ? { ...p, link: event.target.value } : p) }))} placeholder="e.g., https://github.com/your-project" /></div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setResumeData(prev => ({ ...prev, projects: [...prev.projects, { id: Date.now().toString(), name: '', description: '', technologies: [], link: '' }] }))} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />Add Project
                    </Button>
                  </div>
                )}

                {currentStep === 'certifications' && (
                  <div className="space-y-4">
                    {resumeData.certifications.map((cert, idx) => (
                      <div key={cert.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">Certification {idx + 1}</h3>
                          {resumeData.certifications.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== cert.id) }))}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div><Label>Name</Label><Input value={cert.name} onChange={(event) => setResumeData(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, name: event.target.value } : c) }))} /></div>
                        <div><Label>Issuer</Label><Input value={cert.issuer} onChange={(event) => setResumeData(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, issuer: event.target.value } : c) }))} /></div>
                        <div><Label>Date</Label><Input type="month" value={cert.date} onChange={(event) => setResumeData(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, date: event.target.value } : c) }))} /></div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, { id: Date.now().toString(), name: '', issuer: '', date: '' }] }))} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />Add Certification
                    </Button>
                  </div>
                )}

                {/* Education Form */}
                {currentStep === 'education' && (
                  <div className="space-y-4">
                    {resumeData.education.map((edu, idx) => (
                      <div key={edu.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">Education {idx + 1}</h3>
                          {resumeData.education.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter(e => e.id !== edu.id)}))}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><Label>Institution</Label><Input value={edu.institution} onChange={(event) => setResumeData(prev => ({...prev, education: prev.education.map(ed => ed.id === edu.id ? {...ed, institution: event.target.value} : ed)}))} /></div>
                          <div><Label>Degree</Label><Input value={edu.degree} onChange={(event) => setResumeData(prev => ({...prev, education: prev.education.map(ed => ed.id === edu.id ? {...ed, degree: event.target.value} : ed)}))} /></div>
                          <div><Label>Field</Label><Input value={edu.field} onChange={(event) => setResumeData(prev => ({...prev, education: prev.education.map(ed => ed.id === edu.id ? {...ed, field: event.target.value} : ed)}))} /></div>
                          <div><Label>GPA</Label><Input value={edu.gpa || ''} onChange={(event) => setResumeData(prev => ({...prev, education: prev.education.map(ed => ed.id === edu.id ? {...ed, gpa: event.target.value} : ed)}))} /></div>
                          <div><Label>Start Date</Label><Input type="month" value={edu.startDate} onChange={(event) => setResumeData(prev => ({...prev, education: prev.education.map(ed => ed.id === edu.id ? {...ed, startDate: event.target.value} : ed)}))} /></div>
                          <div><Label>End Date</Label><Input type="month" value={edu.endDate} onChange={(event) => setResumeData(prev => ({...prev, education: prev.education.map(ed => ed.id === edu.id ? {...ed, endDate: event.target.value} : ed)}))} /></div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setResumeData(prev => ({...prev, education: [...prev.education, { id: Date.now().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }]}))} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />Add Education
                    </Button>
                  </div>
                )}

                {/* Skills Form */}
                {currentStep === 'skills' && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Skill name" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} onKeyPress={(e) => e.key === 'Enter' && addSkill()} />
                      <Select value={newSkill.category} onValueChange={(v) => setNewSkill({...newSkill, category: v as Skill['category']})}>
                        <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="soft">Soft</SelectItem>
                          <SelectItem value="language">Language</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={addSkill}><Plus className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map(skill => (
                        <Badge key={skill.id} variant="secondary" className="pl-3 pr-1">
                          {skill.name}
                          <button onClick={() => setResumeData(prev => ({...prev, skills: prev.skills.filter(s => s.id !== skill.id)}))} className="ml-2 hover:bg-destructive/20 rounded-full p-0.5">×</button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience, Projects, Certifications - Similar pattern */}
                {/* Navigation would continue here... */}

                {/* Preview & Template Selection */}
                {currentStep === 'preview' && (
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-3 block text-lg font-semibold">Choose Your Template</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'modern', name: 'Modern', desc: 'Creative & Tech' },
                          { id: 'minimal', name: 'Minimal', desc: 'Corporate' },
                          { id: 'professional', name: 'Professional', desc: 'Executive' },
                          { id: 'test', name: 'Test', desc: 'Debug Template' }
                        ].map(template => (
                          <button
                            key={template.id}
                            onClick={() => {
                              console.log('Preview template changed to:', template.id);
                              setResumeData(prev => ({...prev, templateLayout: template.id as any}));
                            }}
                            className={`p-4 border-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                              resumeData.templateLayout === template.id 
                                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md' 
                                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                            }`}
                          >
                            <div className="font-semibold">{template.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{template.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {/* Replace CheckCircle2 with a standard check icon from lucide-react */}
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-semibold text-green-800">Template Selected</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Your resume will be formatted using the <strong>{resumeData.templateLayout}</strong> template.
                      </p>
                    </div>
                    
                    <Button onClick={handleDownloadPDF} size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Download className="w-4 h-4 mr-2" />Download PDF
                    </Button>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-6 pt-6 border-t">
                  <Button variant="outline" onClick={() => setCurrentStep(steps[Math.max(0, steps.indexOf(currentStep) - 1)])} disabled={currentStep === 'personal'}>
                    <ChevronLeft className="w-4 h-4 mr-2" />Previous
                  </Button>
                  <Button onClick={() => setCurrentStep(steps[Math.min(steps.length - 1, steps.indexOf(currentStep) + 1)])} disabled={currentStep === 'preview'}>
                    {currentStep === 'certifications' ? 'Preview' : 'Next'}<ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Live Preview */}
            <div className="hidden lg:block">
              <Card className="p-4 sticky top-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Live Preview</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {resumeData.templateLayout.charAt(0).toUpperCase() + resumeData.templateLayout.slice(1)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Template: {resumeData.templateLayout}
                    </span>
                  </div>
                </div>
                <div className="border rounded bg-gray-50 overflow-hidden">
                  <div id="resume-preview" style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%' }}>
                    {renderResumePreview()}
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Preview scaled to 60% - Download will be full size
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
