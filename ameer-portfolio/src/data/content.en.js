import {
  sharedProfile,
  toolsList,
  techStack,
  softwareTiles,
  sharedProjectsMeta,
  sharedAchievementsMeta,
} from "./content.shared.js";

export { toolsList, techStack, softwareTiles };

export const profile = {
  ...sharedProfile,
  name: "Ameer Saqer",
  brand: "AMEER",
  role: "UI/UX & FRONT-END DEVELOPER",
  tagline: "Crafting Digital Experiences",
  status: "Available for freelance",
  bio: "I design interfaces in Figma and build them myself in React and Tailwind, so what gets approved is what ships. Arabic and RTL interfaces are my default, not an afterthought.",
  about: "I'm Ameer Saqer, a UI/UX designer and front-end developer from Gaza and a final-year Software Development student at the Islamic University of Gaza. I work on both sides of the gap between the Figma file and the browser: I design the interface, then build it in React and Tailwind. I founded Kafeeli, a sponsorship platform for orphans, and I co-mentor 40 trainees in TAQAT's CodeMap front-end program.",
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
    tag: "WEB APPS / 2026",
    description: "Founded and designed a platform that connects sponsors with orphans and tracks every payment. 80-screen Figma flow, built in React with full Arabic RTL. Presented at CodeMap Innovation Hackathon 2026.",
    ...sharedProjectsMeta["01"],
  },
  {
    id: "02",
    title: "KAFEELI — SPONSOR DASHBOARD",
    category: "Web Apps",
    tag: "WEB APPS / 2026",
    description: "Responsive RTL dashboard for sponsors: profile, account settings and side navigation.",
    ...sharedProjectsMeta["02"],
  },
  {
    id: "03",
    title: "RAMADAN CHALLENGE",
    category: "Web Apps",
    tag: "WEB APPS / 2026",
    description: "30-day Arabic challenge app: a new challenge every day, with points, levels, streaks and progress tracking.",
    ...sharedProjectsMeta["03"],
  },
  {
    id: "04",
    title: "OCEAN — IT SERVICES COMPANY",
    category: "Websites",
    tag: "WEBSITES / 2024",
    description: "Turned a company's UI/UX file into an 8-page responsive website: services, projects, blog, contact and a custom 404.",
    ...sharedProjectsMeta["04"],
  },
  {
    id: "05",
    title: "AUTOVERSE — CAR RENTAL",
    category: "Websites",
    tag: "WEBSITES / 2025",
    description: "Car rental landing page with services, fleet gallery, reviews and map sections.",
    ...sharedProjectsMeta["05"],
  },
  {
    id: "06",
    title: "BAKERY — \"FRESHLY BAKED\"",
    category: "Websites",
    tag: "WEBSITES / 2026",
    description: "Warm, appetising bakery site with menu, gallery and visit section.",
    ...sharedProjectsMeta["06"],
  },
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

export const achievements = [
  { id: "01", title: "Building with the Claude API", sub: "Anthropic", ...sharedAchievementsMeta["01"] },
  { id: "02", title: "Claude Code 101", sub: "Anthropic", ...sharedAchievementsMeta["02"] },
  { id: "03", title: "AI Fluency: Framework & Foundations", sub: "Anthropic", ...sharedAchievementsMeta["03"] },
  { id: "04", title: "Claude 101", sub: "Anthropic", ...sharedAchievementsMeta["04"] },
  { id: "05", title: "Web Development", sub: "Sprints", ...sharedAchievementsMeta["05"] },
  { id: "06", title: "Full JavaScript", sub: "Satr Educational Platform", ...sharedAchievementsMeta["06"] },
  { id: "07", title: "Front-End Development", sub: "Canadian Board of Training", ...sharedAchievementsMeta["07"] },
  { id: "08", title: "ICDL", sub: "Canadian Board of Training", ...sharedAchievementsMeta["08"] },
  { id: "09", title: "Graphic Design", sub: "Tech Box", ...sharedAchievementsMeta["09"] },
];

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

export const currentFocus = [
  { label: "CURRENTLY LEARNING", value: "TypeScript & Next.js" },
  { label: "OPEN TO", value: "Remote roles & freelance projects" },
  { label: "BASED IN", value: "Gaza, Palestine · GMT+2" },
];

export const lightboxTitles = [
  "01 / For Organizations (إدارة الكفالات في نظام واحد)",
  "02 / How It Works (كيف تعمل كفيلي؟)",
  "03 / About Us (من نحن)",
  "04 / Contact Us (تواصل معنا)",
];
