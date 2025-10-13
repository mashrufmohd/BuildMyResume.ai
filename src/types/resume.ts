export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  id?: string;
  title: string;
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  templateLayout: 'modern' | 'minimal' | 'professional' | 'test';
}

export type FormStep = 'personal' | 'education' | 'skills' | 'experience' | 'projects' | 'certifications' | 'preview';
