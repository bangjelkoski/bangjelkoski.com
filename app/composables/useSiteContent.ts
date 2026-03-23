export interface SitePrinciple {
  label: string;
  text: string;
}

export interface SiteSnapshot {
  label: string;
  value: string;
  detail: string;
}

export interface SiteProject {
  name: string;
  tag: string;
  summary: string;
  detail: string;
  href?: string;
}

export interface SiteHighlight {
  label: string;
  items: string[];
}

export interface SiteContactLink {
  label: string;
  href: string;
  note: string;
}

export interface SiteExperienceEntry {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export const useSiteContent = () => {
  const principles: SitePrinciple[] = [
    {
      label: "Leadership",
      text: "Build teams with clear ownership, calm execution, and engineering standards that scale with the business.",
    },
    {
      label: "Systems",
      text: "Design product, platform, and frontend systems that stay legible as scope, traffic, and team size increase.",
    },
    {
      label: "Delivery",
      text: "Move from architecture to shipped product without losing technical judgment along the way.",
    },
  ];

  const snapshots: SiteSnapshot[] = [
    {
      label: "Current role",
      value: "Director of Engineering at Injective Labs",
      detail:
        "Founding engineer. Built the frontend engineering function from the ground up into a product and platform capability.",
    },
    {
      label: "Focus",
      value: "Product systems, team scaling, technical judgment",
      detail:
        "I care about architecture that survives real use and teams that can keep shipping well under pressure.",
    },
    {
      label: "Base",
      value: "Skopje, North Macedonia",
      detail:
        "Working globally, leading with a calm, systems-oriented approach.",
    },
  ];

  const projects: SiteProject[] = [
    {
      name: "Injective Hub",
      tag: "Product System",
      summary:
        "Governance, staking, portfolio, bridge, and account operations for the broader Injective ecosystem.",
      detail:
        "A large operational surface where product clarity, frontend reliability, and protocol-aware UX all had to meet.",
      href: "https://hub.injective.network",
    },
    {
      name: "Helix",
      tag: "Exchange",
      summary:
        "Spot and derivatives trading experience built on Injective’s on-chain orderbook model.",
      detail:
        "A high-stakes product where execution quality, performance, and interface discipline directly affect trust.",
      href: "https://helixapp.com",
    },
    {
      name: "Injective TypeScript SDK",
      tag: "Developer Platform",
      summary:
        "Core TypeScript SDK used across Injective applications and by external teams building on the ecosystem.",
      detail:
        "A shared technical foundation that connects protocol complexity to practical product delivery.",
      href: "https://github.com/InjectiveLabs/injective-ts",
    },
  ];

  const experience: SiteExperienceEntry[] = [
    {
      role: "Director of Engineering",
      company: "Injective Labs",
      period: "2020–Present",
      summary:
        "Built the frontend engineering team, shipped the core ecosystem applications, and shaped the systems that support ongoing product delivery.",
    },
    {
      role: "Full Stack Developer",
      company: "World Trade Organization",
      period: "2019–2020",
      summary:
        "Developed internal tools and web applications in an environment where clarity, reliability, and institutional context mattered.",
    },
    {
      role: "Full Stack Developer",
      company: "Nulisec",
      period: "2017–2019",
      summary:
        "Worked across product surfaces and backend services, building the practical foundations of full-stack delivery.",
    },
    {
      role: "Full Stack Developer",
      company: "NG Solutions",
      period: "2015–2017",
      summary:
        "Started my professional engineering career by building web applications and internal systems for real operational use.",
    },
  ];

  const education = [
    {
      degree: "MSc in Software Engineering",
      institution: "University of Belgrade",
      period: "2019–2021",
    },
    {
      degree: "BSc in Computer Science",
      institution: "University of Belgrade",
      period: "2015–2019",
    },
  ];

  const personal = [
    {
      label: "Personal",
      value: `Aged ${new Date().getFullYear() - 1994} · Macedonia 🇲🇰`,
    },
    { label: "Resume", value: "resume.pdf", href: "/resume.pdf" },
  ];

  const highlights: SiteHighlight[] = [
    {
      label: "Injective",
      items: [
        "Helped shape engineering from the ground up, building the team, the culture, and the processes behind a unicorn with over $76B in cumulative trading volume.",
        "Defined the technical architecture across distributed systems, on-chain infrastructure, developer SDKs, and frontend platform foundations.",
        "Created the developer infrastructure that opened Injective to external builders, with open-source SDKs and tooling collectively reaching 30,000+ weekly downloads across the ecosystem.",
      ],
    },
    {
      label: "WTO",
      items: [
        "Took ownership of architecture, performance, and system modernization across legacy platforms at the World Trade Organization, improving tools relied on by trade delegations from 164 member nations.",
      ],
    },
    {
      label: "Nulisec",
      items: [
        "Built the B2B wholesale marketplace platform at Nulisec from the ground up, connecting 2,000+ FMCG suppliers and retailers across Central European markets.",
      ],
    },
  ];

  const about = [
    "I work at the intersection of engineering leadership, product execution, and systems design. My role is not only to make software work, but to shape the conditions that let teams ship well repeatedly.",
    "At Injective Labs, I joined early and built the frontend engineering team from the ground up. Since then I have helped deliver the exchange, wallet, hub, bridge, and the shared TypeScript foundations that support the ecosystem.",
    "My background spans TypeScript, Vue, React, platform architecture, blockchain-adjacent systems, and the practical decisions that turn technical complexity into usable products.",
    "I am drawn to work that requires judgment: making the system clearer, the team stronger, and the product easier to trust.",
  ];

  const contactLinks: SiteContactLink[] = [
    {
      label: "Email",
      href: "mailto:hello@abojan.me",
      note: "Best for direct conversations.",
    },
    {
      label: "GitHub",
      href: "https://github.com/bangjelkoski",
      note: "Code, experiments, and open source work.",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/bangjelkoski",
      note: "Professional background and network.",
    },
    {
      label: "X",
      href: "https://x.com/bangjelkoski",
      note: "Occasional thoughts and links.",
    },
  ];

  return {
    hero: {
      eyebrow: "Director of Engineering",
      title: "Building teams, systems, and products with calm technical depth.",
      intro:
        "A personal website about engineering leadership, product execution, and the architecture decisions that make complex software feel clear.",
      availability:
        "Open to thoughtful conversations about product systems, engineering leadership, and technically ambitious work.",
    },
    highlights,
    principles,
    snapshots,
    projects,
    experience,
    education,
    personal,
    about,
    contactLinks,
  };
};
