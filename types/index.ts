export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  content: ResumeContent;
  created_at: string;
  updated_at: string;
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  portfolio?: string;
  summary?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string[];
  location?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}
