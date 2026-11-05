// Single source of truth for portfolio content

export const profile = {
  name: "Ameer Saqer",
  brand: "AMEER",
  role: "UI/UX & FRONT-END DEVELOPER",
  tagline: "Crafting Digital Experiences",
  email: "ameer.saqer05@gmail.com",
  phone: "+972 59 216 1058",
  whatsapp: "https://wa.me/972592161058",
  status: "Available for freelance",
  bio: "I design interfaces in Figma and build them myself in React and Tailwind, so what gets approved is what ships. Arabic and RTL interfaces are my default, not an afterthought.",
  about: "I'm Ameer Saqer, a UI/UX designer and front-end developer from Gaza and a final-year Software Development student at the Islamic University of Gaza. I work on both sides of the gap between the Figma file and the browser: I design the interface, then build it in React and Tailwind. I founded Kafeeli, a sponsorship platform for orphans, and I co-mentor 40 trainees in TAQAT's CodeMap front-end program.",
  socials: {
    github: "https://github.com/Ameer-Saqer",
    linkedin: "https://www.linkedin.com/in/ameer-saqer",
    instagram: "https://instagram.com/ameer_saqer_",
    instagramHandle: "@ameer_saqer_",
    facebook: "https://www.facebook.com/ameer.saqer.16/",
    whatsapp: "https://wa.me/972592161058",
  },
  cv: "/Ameer-Saqer-CV.pdf",
};

export const contactActionCard = {
  titleLine1: "BUILD IT.",
  titleLine2: "SHIP IT.",
  status: "AVAILABLE FOR FREELANCE",
  replyTime: "Usually replies within 24 hours",
  cta: "CHAT ON WHATSAPP",
};

export const stats = [
  { value: 2, suffix: "+", label: "Years of experience" },
  { value: 10, suffix: "+", label: "Projects built" },
  { value: 40, suffix: "", label: "Trainees mentored" },
];

export const projectCategories = ["All", "Web Apps", "Websites"];

export const projects = [
  {
    id: "01",
    title: "KAFEELI — SPONSORSHIP PLATFORM",
    category: "Web Apps",
    year: "2026",
    tag: "WEB APPS / 2026",
    description: "Founded and designed a platform that connects sponsors with orphans and tracks every payment. 80-screen Figma flow, built in React with full Arabic RTL. Presented at CodeMap Innovation Hackathon 2026.",
    image: "/projects/kafeeli-orgs.webp",
    techStack: ["Figma", "React", "Tailwind CSS"],
    gallery: [
      "/projects/kafeeli-orgs.webp",
      "/projects/kafeeli-how.webp",
      "/projects/kafeeli-about.webp",
      "/projects/kafeeli-contact.webp",
    ],
    live: "https://kafeeli-frontend.vercel.app/landing-page",
    repo: "",
    isTall: true,
    hasLightbox: true,
    galleryCount: 4,
  },
  {
    id: "02",
    title: "KAFEELI — SPONSOR DASHBOARD",
    category: "Web Apps",
    year: "2026",
    tag: "WEB APPS / 2026",
    description: "Responsive RTL dashboard for sponsors: profile, account settings and side navigation.",
    image: "/projects/kafeeli-dashboard.webp",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    live: "https://kafeeli-frontend.vercel.app",
    repo: "",
    isTall: false,
    hasLightbox: false,
  },
  {
    id: "03",
    title: "RAMADAN CHALLENGE",
    category: "Web Apps",
    year: "2026",
    tag: "WEB APPS / 2026",
    description: "30-day Arabic challenge app: a new challenge every day, with points, levels, streaks and progress tracking.",
    image: "/projects/ramadan.webp",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    live: "https://ameer-saqer.github.io/Ramadan-Challenge/",
    repo: "https://github.com/Ameer-Saqer/Ramadan-Challenge",
    isTall: true,
    hasLightbox: false,
  },
  {
    id: "04",
    title: "OCEAN — IT SERVICES COMPANY",
    category: "Websites",
    year: "2024",
    tag: "WEBSITES / 2024",
    description: "Turned a company's UI/UX file into an 8-page responsive website: services, projects, blog, contact and a custom 404.",
    image: "/projects/ocean.webp",
    techStack: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    gallery: ["/projects/ocean.webp", "/projects/ocean-404.webp"],
    live: "https://ameer-saqer.github.io/Ocean/",
    repo: "https://github.com/Ameer-Saqer/Ocean",
    isTall: false,
    isMockup: true,
    hasLightbox: false,
  },
  {
    id: "05",
    title: "AUTOVERSE — CAR RENTAL",
    category: "Websites",
    year: "2025",
    tag: "WEBSITES / 2025",
    description: "Car rental landing page with services, fleet gallery, reviews and map sections.",
    image: "/projects/auto.webp",
    techStack: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    live: "https://ameer-saqer.github.io/AutoVerse/",
    repo: "https://github.com/Ameer-Saqer/AutoVerse",
    isTall: false,
    isMockup: true,
    hasLightbox: false,
  },
  {
    id: "06",
    title: "BAKERY — \"FRESHLY BAKED\"",
    category: "Websites",
    year: "2026",
    tag: "WEBSITES / 2026",
    description: "Warm, appetising bakery site with menu, gallery and visit section.",
    image: "/projects/bakery.webp",
    techStack: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    // TODO: add live and repo links once Bakery is uploaded
    live: "",
    repo: "",
    isTall: true,
    hasLightbox: false,
  },
  // TODO: Currency Converter (USD ⇄ ILS) — add once uploaded, with /projects/converter.webp
];

// Honest stack based on user skills
export const toolsList = [
  "Figma",
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "Git",
  "GitHub",
];

export const techStack = [
  "Figma",
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "Git",
  "GitHub",
];

// 6 software tiles for About column
export const softwareTiles = [
  { name: "HTML5", icon: "SiHtml5" },
  { name: "CSS3", icon: "SiCss3" },
  { name: "JavaScript", icon: "SiJavascript" },
  { name: "React", icon: "SiReact" },
  { name: "Tailwind CSS", icon: "SiTailwindcss" },
  { name: "GitHub", icon: "SiGithub" },
];

export const creativeToolkitPills = [
  "Figma → React",
  "Arabic RTL Interfaces",
  "HTML & CSS",
  "JavaScript (ES6+)",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "Responsive Design",
  "Git & GitHub",
];

// Education & training
export const educationItems = [
  {
    title: "B.Sc. Software Development",
    sub: "Islamic University of Gaza",
    year: "2022 — 2027",
  },
  {
    title: "UI/UX & Front-End Track",
    sub: "TAQAT",
    year: "2026",
  },
  {
    title: "Web Development Training",
    sub: "Sprints",
    year: "2026",
  },
];

// Certificates (url = public verification link)
export const achievements = [
  { id: "01", title: "Building with the Claude API", sub: "Anthropic", year: "2026", url: "https://verify.skilljar.com/c/qvg2a4gqk9br" },
  { id: "02", title: "Claude Code 101", sub: "Anthropic", year: "2026", url: "https://verify.skilljar.com/c/bs84n2iqcke7" },
  { id: "03", title: "AI Fluency: Framework & Foundations", sub: "Anthropic", year: "2026", url: "https://verify.skilljar.com/c/8w97k45zvmrj" },
  { id: "04", title: "Claude 101", sub: "Anthropic", year: "2026", url: "https://verify.skilljar.com/c/7i7n4nud2e5b" },
  { id: "05", title: "Web Development", sub: "Sprints", year: "2026" },
  { id: "06", title: "Full JavaScript", sub: "Satr Educational Platform", year: "2025" },
  { id: "07", title: "Front-End Development", sub: "Canadian Board of Training", year: "2025" },
  { id: "08", title: "ICDL", sub: "Canadian Board of Training", year: "2024" },
  { id: "09", title: "Graphic Design", sub: "Tech Box", year: "2023" },
];

// Process Timeline (5 steps)
export const processSteps = [
  {
    index: "01",
    title: "THE IDEA",
    desc: "Understand the core goals, user journeys, and the emotional narrative the digital product must communicate.",
  },
  {
    index: "02",
    title: "THE PLAN",
    desc: "Structure information architecture, component contracts, and design token foundations with strict consistency.",
  },
  {
    index: "03",
    title: "THE CRAFT",
    desc: "Build clean, reusable React components with scalable modular logic styled precisely with Tailwind.",
  },
  {
    index: "04",
    title: "THE POLISH",
    desc: "Craft micro-interactions, responsive fluid typography, accessibility compliance, and sub-second performance.",
  },
  {
    index: "05",
    title: "THE FINAL PIXEL",
    desc: "Rigorous cross-browser testing, production build optimization, deployment, and seamless user delivery.",
  },
];

// The Journey items
export const journeyItems = [
  {
    period: "SEP 2026 — NOW",
    role: "Co-Mentor",
    subtitle: "TAQAT · CodeMap Front-End Program",
    description: "Supporting 40 trainees through weekly tasks, code reviews and one-on-one follow-up, and helping them ship a first working product.",
  },
  {
    period: "MAY 2026 — NOW",
    role: "Founder · UI/UX & Front-End",
    subtitle: "Kafeeli",
    description: "Designed the full sponsor journey in Figma (80 screens) and building the front-end in React with full Arabic RTL. Presented at CodeMap Innovation Hackathon 2026.",
  },
  {
    period: "APR — JUN 2026",
    role: "UI/UX & Front-End Intern",
    subtitle: "TAQAT",
    description: "Designed and prototyped interfaces in Figma, then built them as responsive React pages alongside developers.",
  },
  {
    period: "2025",
    role: "Front-End Intern",
    subtitle: "Shifra",
    description: "Built and improved front-end pages with HTML, CSS and JavaScript as part of a development team.",
  },
  {
    period: "2024",
    role: "Front-End Developer",
    subtitle: "Ocean",
    description: "Took the company's UI/UX file and turned it into a responsive 8-page website, tested across browsers.",
  },
];

// Milestones right column
export const milestones = [
  { title: "First company website shipped (Ocean)", year: "2024" },
  { title: "Founded Kafeeli", year: "2026" },
  { title: "Presented at CodeMap Innovation Hackathon", year: "2026" },
  { title: "4 Anthropic AI certifications", year: "2026" },
];
