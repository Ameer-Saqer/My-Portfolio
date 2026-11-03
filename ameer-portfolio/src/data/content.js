// Single source of truth for portfolio content

export const profile = {
  name: "Ameer Saqer",
  brand: "AMEER",
  role: "UI/UX & FRONT-END DEVELOPER",
  tagline: "Crafting Digital Experiences",
  email: "ameer0599333607@gmail.com",
  phone: "+972 59 216 1058",
  whatsapp: "https://wa.me/972592161058",
  status: "Available for freelance",
  bio: "I build fast, responsive and pixel-perfect interfaces. From clean HTML & CSS to scalable React apps — I turn ideas into products people enjoy using.",
  about: "I'm Ameer Saqer, a passionate front-end developer with over two years of experience building responsive, user-focused web applications. I specialise in HTML, CSS, JavaScript and Bootstrap, and I work extensively with React and Tailwind to create modern, performant interfaces. I'm focused on performance optimisation and front-end architecture, and I love turning ideas into clean, interactive, scalable products.",
  socials: {
    github: "https://github.com/Ameer-Saqer",
    linkedin: "https://www.linkedin.com/in/ameer-saqer-59243b264",
    instagram: "https://instagram.com/ameer_saqer_",
    instagramHandle: "@ameer_saqer_",
    facebook: "https://www.facebook.com/ameer.saqer.16/",
    whatsapp: "https://wa.me/972592161058",
  },
  // TODO: Add your actual CV PDF file into public/Ameer-Saqer-CV.pdf
  cv: "/Ameer-Saqer-CV.pdf",
};

export const stats = [
  { value: 2, suffix: "+", label: "Years of experience" },
  { value: 8, suffix: "+", label: "Projects shipped" },
  { value: 7, suffix: "+", label: "Technologies" },
];

export const projectCategories = [
  "All",
  "Web Apps",
  "Landing Pages",
  "Web Design",
  "UI Concepts",
];

export const projects = [
  {
    id: "01",
    title: "KAFEELI — SPONSORSHIP PLATFORM",
    category: "Web Apps",
    year: "2026",
    tag: "WEB APPS / 2026",
    description: "Arabic RTL platform for managing sponsorships in one system — marketing site built with React.",
    image: "/projects/kafeeli-orgs.webp",
    gallery: [
      "/projects/kafeeli-orgs.webp",
      "/projects/kafeeli-how.webp",
      "/projects/kafeeli-about.webp",
      "/projects/kafeeli-contact.webp",
    ],
    // TODO: Add live URL if deployed
    live: "#",
    repo: "https://github.com/Ameer-Saqer",
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
    description: "Responsive RTL dashboard: sponsor profile, account settings, side navigation.",
    image: "/projects/kafeeli-dashboard.webp",
    live: "https://kafeeli-frontend.vercel.app",
    repo: "https://github.com/Ameer-Saqer",
    isTall: false,
    hasLightbox: false,
  },
  {
    id: "03",
    title: "BAKERY — \"FRESHLY BAKED\"",
    category: "Landing Pages",
    year: "2026",
    tag: "LANDING PAGES / 2026",
    description: "Warm, appetising bakery site with menu, gallery and visit section.",
    image: "/projects/bakery.webp",
    // TODO: Add live URL
    live: "#",
    repo: "https://github.com/Ameer-Saqer",
    isTall: true,
    hasLightbox: false,
  },
  {
    id: "04",
    title: "OCEAN — DIGITAL ART & DESIGN",
    category: "Web Design",
    year: "2025",
    tag: "WEB DESIGN / 2025",
    description: "Dark landing page for a digital-art studio with a services grid.",
    image: "/projects/ocean.webp",
    // TODO: Add live URL
    live: "#",
    repo: "https://github.com/Ameer-Saqer",
    isTall: false,
    isMockup: true,
    hasLightbox: false,
  },
  {
    id: "05",
    title: "AUTO — CAR RENTAL",
    category: "Landing Pages",
    year: "2025",
    tag: "LANDING PAGES / 2025",
    description: "\"Get your dream car at a reasonable price\" rental website with fleet gallery.",
    image: "/projects/auto.webp",
    // TODO: Add live URL
    live: "#",
    repo: "https://github.com/Ameer-Saqer",
    isTall: false,
    isMockup: true,
    hasLightbox: false,
  },
  {
    id: "06",
    title: "BRAND — CREATIVE STUDIO",
    category: "Web Design",
    year: "2025",
    tag: "WEB DESIGN / 2025",
    description: "Light, colourful agency site with a portfolio grid and team section.",
    image: "/projects/brand.webp",
    // TODO: Add live URL
    live: "#",
    repo: "https://github.com/Ameer-Saqer",
    isTall: false,
    isMockup: true,
    hasLightbox: false,
  },
  {
    id: "07",
    title: "HELLO THERE",
    category: "Landing Pages",
    year: "2025",
    tag: "LANDING PAGES / 2025",
    description: "Minimal hero landing with a three-feature section over a mountain photo.",
    image: "/projects/hello-there.webp",
    // TODO: Add live URL
    live: "#",
    repo: "https://github.com/Ameer-Saqer",
    isTall: false,
    isMockup: true,
    hasLightbox: false,
  },
  {
    id: "08",
    title: "OCEAN 404",
    category: "UI Concepts",
    year: "2025",
    tag: "UI CONCEPTS / 2025",
    description: "Playful, branded 404 error page with cinematic layout.",
    image: "/projects/ocean-404.webp",
    // TODO: Add live URL
    live: "#",
    repo: "https://github.com/Ameer-Saqer",
    isTall: false,
    isMockup: true,
    hasLightbox: false,
  },
];

// Honest stack based on user skills
export const techStack = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Bootstrap",
  "React",
  "Tailwind CSS",
  "Git & GitHub",
  "Vite",
  "Responsive Design",
  "Framer Motion",
  "UI Engineering",
  "Performance Tuning",
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
  "HTML & CSS",
  "JavaScript (ES6+)",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "Responsive Design",
  "Performance",
  "Git & GitHub",
];

// Placeholder education items - TODO: replace with real user history if desired
export const educationItems = [
  {
    title: "Computer Science / IT",
    sub: "University / Academic Studies",
    year: "2023 — Present", // TODO: Update with actual institution
  },
  {
    title: "Front-End Development & React",
    sub: "Professional Intensive Courses & Certifications",
    year: "2023 — 2024",
  },
  {
    title: "Self-Driven Software Craft",
    sub: "Performance, Modern Architecture & UI Engineering",
    year: "2024 — 2026",
  },
];

// Achievements / Milestones panel
export const achievements = [
  {
    id: "01",
    title: "Front-End Development Course",
    sub: "Professional Certificate",
    year: "2024", // TODO: Replace with real certificate
  },
  {
    id: "02",
    title: "Responsive Web Design",
    sub: "Certification",
    year: "2024", // TODO: Replace with real certificate
  },
  {
    id: "03",
    title: "JavaScript Algorithms & Data Structures",
    sub: "Certification",
    year: "2024", // TODO: Replace with real certificate
  },
  {
    id: "04",
    title: "React — The Complete Guide",
    sub: "Specialized Course",
    year: "2025", // TODO: Replace with real certificate
  },
  {
    id: "05",
    title: "Performance Optimisation Workshop",
    sub: "Workshop Certification",
    year: "2025", // TODO: Replace with real certificate
  },
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

// The Journey items (4 rows)
export const journeyItems = [
  {
    period: "2025 — NOW",
    role: "Freelance Front-End Developer",
    subtitle: "Websites & Production Web Applications",
    description: "Building responsive, sub-second web platforms for clients using React, Tailwind CSS, and modern web architectures.",
  },
  {
    period: "2024 — 2025",
    role: "Front-End Developer (Projects)",
    subtitle: "React Applications & Client Systems",
    description: "Designing and shipping component-driven user interfaces, complex dashboards, and interactive platforms focusing on performance.",
  },
  {
    period: "2023 — 2024",
    role: "Junior Web Developer",
    subtitle: "HTML · CSS · Modern JavaScript",
    description: "Turning complex wireframes and UI designs into pixel-perfect, fully responsive client interfaces.",
  },
  {
    period: "2023",
    role: "Started the Journey",
    subtitle: "Self-Taught & Relentless Curiosity",
    description: "Wrote the first lines of code, studied core computer science concepts, and deployed the first interactive web projects.",
  },
];

// Milestones right column
export const milestones = [
  { title: "First React project shipped", year: "2024" },
  { title: "Lighthouse performance 95+", year: "2025" },
  { title: "First freelance client delivery", year: "2025" },
  { title: "Open-source & platform contributions", year: "2026" },
];

