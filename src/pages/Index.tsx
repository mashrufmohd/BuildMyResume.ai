import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Download, Plus, Trash2, Check, Mail, Phone, MapPin, Linkedin, Globe, Sparkles } from "lucide-react";
import { toast } from "sonner";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Types
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary?: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

type FormStep = 'personal' | 'education' | 'skills' | 'experience' | 'projects' | 'preview';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [layout, setLayout] = useState<'modern' | 'minimal' | 'professional'>('modern');
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '', email: '', phone: '', location: '', linkedin: '', website: '', summary: ''
  });
  
  const [education, setEducation] = useState<Education[]>([{
    id: '1', institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: ''
  }]);
  
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'technical' as Skill['category'] });
  
  const [experience, setExperience] = useState<Experience[]>([{
    id: '1', company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: ''
  }]);
  
  const [projects, setProjects] = useState<Project[]>([]);

  const steps: FormStep[] = ['personal', 'education', 'skills', 'experience', 'projects', 'preview'];

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('resume-preview');
      if (!element) return;
      
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${personalInfo.fullName || 'resume'}.pdf`);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download resume');
    }
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { id: Date.now().toString(), name: newSkill.name.trim(), category: newSkill.category }]);
      setNewSkill({ name: '', category: 'technical' });
    }
  };

  // Render Resume Layout
  const renderResume = () => {
    const ModernLayout = () => (
      <div className="bg-white text-gray-900 shadow-xl p-8" id="resume-preview">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 -m-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-3 text-sm">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-2">SUMMARY</h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && experience[0].company && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-2">EXPERIENCE</h2>
            {experience.map(exp => exp.company && (
              <div key={exp.id} className="mb-3">
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-500">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && education[0].institution && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-2">EDUCATION</h2>
            {education.map(edu => edu.institution && (
              <div key={edu.id} className="mb-2">
                <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-2">PROJECTS</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <h3 className="font-bold">{proj.name}</h3>
                <p className="text-gray-700">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-sm text-gray-600">Tech: {proj.technologies.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );

    return <ModernLayout />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
          <p className="text-muted-foreground mt-1">Create your professional resume in minutes</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex justify-between">
              {steps.map((step, idx) => (
                <div key={step} className="flex-1 flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep === step ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {idx + 1}
                  </div>
                  {idx < steps.length - 1 && <div className="flex-1 h-0.5 bg-border mx-2" />}
                </div>
              ))}
            </div>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 capitalize">{currentStep}</h2>

              {/* Personal Info Form */}
              {currentStep === 'personal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Full Name *</Label><Input value={personalInfo.fullName} onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})} /></div>
                    <div><Label>Email *</Label><Input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})} /></div>
                    <div><Label>Phone *</Label><Input value={personalInfo.phone} onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})} /></div>
                    <div><Label>Location *</Label><Input value={personalInfo.location} onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})} /></div>
                    <div><Label>LinkedIn</Label><Input value={personalInfo.linkedin || ''} onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})} /></div>
                    <div><Label>Website</Label><Input value={personalInfo.website || ''} onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})} /></div>
                  </div>
                  <div><Label>Summary</Label><Textarea value={personalInfo.summary || ''} onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})} rows={3} /></div>
                </div>
              )}

              {/* Education Form */}
              {currentStep === 'education' && (
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between"><h3 className="font-semibold">Education {idx + 1}</h3>
                        {education.length > 1 && <Button variant="ghost" size="sm" onClick={() => setEducation(education.filter(e => e.id !== edu.id))}><Trash2 className="w-4 h-4" /></Button>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label>Institution</Label><Input value={edu.institution} onChange={(ev) => setEducation(education.map(e => e.id === edu.id ? {...e, institution: ev.target.value} : e))} /></div>
                        <div><Label>Degree</Label><Input value={edu.degree} onChange={(ev) => setEducation(education.map(e => e.id === edu.id ? {...e, degree: ev.target.value} : e))} /></div>
                        <div><Label>Field</Label><Input value={edu.field} onChange={(ev) => setEducation(education.map(e => e.id === edu.id ? {...e, field: ev.target.value} : e))} /></div>
                        <div><Label>GPA</Label><Input value={edu.gpa || ''} onChange={(ev) => setEducation(education.map(e => e.id === edu.id ? {...e, gpa: ev.target.value} : e))} /></div>
                        <div><Label>Start Date</Label><Input type="month" value={edu.startDate} onChange={(ev) => setEducation(education.map(e => e.id === edu.id ? {...e, startDate: ev.target.value} : e))} /></div>
                        <div><Label>End Date</Label><Input type="month" value={edu.endDate} onChange={(ev) => setEducation(education.map(e => e.id === edu.id ? {...e, endDate: ev.target.value} : e))} /></div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => setEducation([...education, { id: Date.now().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }])} className="w-full"><Plus className="w-4 h-4 mr-2" />Add Education</Button>
                </div>
              )}

              {/* Skills Form */}
              {currentStep === 'skills' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Skill name" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} onKeyPress={(e) => e.key === 'Enter' && addSkill()} />
                    <Select value={newSkill.category} onValueChange={(v) => setNewSkill({...newSkill, category: v as Skill['category']})}>
                      <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="technical">Technical</SelectItem><SelectItem value="soft">Soft</SelectItem><SelectItem value="language">Language</SelectItem></SelectContent>
                    </Select>
                    <Button onClick={addSkill}><Plus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge key={skill.id} variant="secondary" className="pl-3 pr-1">
                        {skill.name}
                        <button onClick={() => setSkills(skills.filter(s => s.id !== skill.id))} className="ml-2 hover:bg-destructive/20 rounded-full p-0.5">×</button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Form */}
              {currentStep === 'experience' && (
                <div className="space-y-4">
                  {experience.map((exp, idx) => (
                    <div key={exp.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between"><h3 className="font-semibold">Experience {idx + 1}</h3>
                        {experience.length > 1 && <Button variant="ghost" size="sm" onClick={() => setExperience(experience.filter(e => e.id !== exp.id))}><Trash2 className="w-4 h-4" /></Button>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label>Company</Label><Input value={exp.company} onChange={(ev) => setExperience(experience.map(e => e.id === exp.id ? {...e, company: ev.target.value} : e))} /></div>
                        <div><Label>Position</Label><Input value={exp.position} onChange={(ev) => setExperience(experience.map(e => e.id === exp.id ? {...e, position: ev.target.value} : e))} /></div>
                        <div><Label>Location</Label><Input value={exp.location} onChange={(ev) => setExperience(experience.map(e => e.id === exp.id ? {...e, location: ev.target.value} : e))} /></div>
                        <div className="flex items-center space-x-2 pt-7"><Checkbox checked={exp.current} onCheckedChange={(c) => setExperience(experience.map(e => e.id === exp.id ? {...e, current: !!c} : e))} /><Label>Current</Label></div>
                        <div><Label>Start Date</Label><Input type="month" value={exp.startDate} onChange={(ev) => setExperience(experience.map(e => e.id === exp.id ? {...e, startDate: ev.target.value} : e))} /></div>
                        <div><Label>End Date</Label><Input type="month" value={exp.endDate} onChange={(ev) => setExperience(experience.map(e => e.id === exp.id ? {...e, endDate: ev.target.value} : e))} disabled={exp.current} /></div>
                      </div>
                      <div><Label>Description</Label><Textarea value={exp.description} onChange={(ev) => setExperience(experience.map(e => e.id === exp.id ? {...e, description: ev.target.value} : e))} rows={2} /></div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => setExperience([...experience, { id: Date.now().toString(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }])} className="w-full"><Plus className="w-4 h-4 mr-2" />Add Experience</Button>
                </div>
              )}

              {/* Projects Form */}
              {currentStep === 'projects' && (
                <div className="space-y-4">
                  {projects.map((proj, idx) => (
                    <div key={proj.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between"><h3 className="font-semibold">Project {idx + 1}</h3>
                        <Button variant="ghost" size="sm" onClick={() => setProjects(projects.filter(p => p.id !== proj.id))}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                      <div><Label>Project Name</Label><Input value={proj.name} onChange={(event) => setProjects(projects.map(p => p.id === proj.id ? {...p, name: event.target.value} : p))} /></div>
                      <div><Label>Description</Label><Textarea value={proj.description} onChange={(event) => setProjects(projects.map(p => p.id === proj.id ? {...p, description: event.target.value} : p))} rows={2} /></div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => setProjects([...projects, { id: Date.now().toString(), name: '', description: '', technologies: [], link: '' }])} className="w-full"><Plus className="w-4 h-4 mr-2" />Add Project</Button>
                </div>
              )}

              {/* Preview */}
              {currentStep === 'preview' && (
                <div>
                  <Button onClick={handleDownloadPDF} size="lg" className="w-full gradient-primary mb-4">
                    <Download className="w-4 h-4 mr-2" />Download PDF
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setCurrentStep(steps[Math.max(0, steps.indexOf(currentStep) - 1)])} disabled={currentStep === 'personal'}>
                  <ChevronLeft className="w-4 h-4 mr-2" />Previous
                </Button>
                <Button onClick={() => setCurrentStep(steps[Math.min(steps.length - 1, steps.indexOf(currentStep) + 1)])} disabled={currentStep === 'preview'} className="gradient-primary">
                  {currentStep === 'projects' ? 'Preview' : 'Next'}<ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="hidden lg:block">
            <Card className="p-4 sticky top-8">
              <h3 className="font-semibold mb-3">Live Preview</h3>
              <div className="border rounded overflow-hidden" style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166%' }}>
                {renderResume()}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
