export interface SiteHighlight {
  label: string;
  items: string[];
}

export interface SiteContactLink {
  id: string;
  label: string;
  href: string;
  note: string;
}

export interface SiteExperienceEntry {
  role: string;
  company: string;
  period: string;
}

export interface SiteEducationEntry {
  degree: string;
  institution: string;
  period: string;
}

export interface SitePersonalEntry {
  label: string;
  value: string;
  href?: string;
}
