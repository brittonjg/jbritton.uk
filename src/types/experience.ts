export interface Company {
  name: string;
  url?: string;
  logo?: string;
}

export interface Role {
  title: string;
  company: Company;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  highlights?: string[];
  tags?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location?: string;
}

export interface ExperienceData {
  roles: Role[];
  education: Education[];
}
