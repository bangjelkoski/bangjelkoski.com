export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  impact: string;
}

export const useExperience = (): ExperienceItem[] => [
  {
    role: "Director of Engineering",
    company: "Injective Labs",
    period: "2020–Present",
    impact:
      "First employee. Built the frontend engineering team from zero. Shipped the exchange, wallet, hub, and developer tooling across the Injective ecosystem.",
  },
  {
    role: "Full Stack Developer",
    company: "World Trade Organization",
    period: "2019–2020",
    impact:
      "Built internal tools and web applications for one of the world's foremost international organizations.",
  },
  {
    role: "Full Stack Developer",
    company: "Nulisec",
    period: "2017–2019",
    impact:
      "Developed client-facing applications and backend services across the full stack.",
  },
  {
    role: "Full Stack Developer",
    company: "NG Solutions",
    period: "2015–2017",
    impact:
      "Built web applications and internal tools. First professional engineering role.",
  },
];
