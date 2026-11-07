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
  name: "أمير صقر",
  brand: "أمير",
  role: "مصمم UI/UX ومطوّر Front-End",
  tagline: "أصنع تجارب رقمية",
  status: "متاح لمشاريع العمل الحر",
  bio: "أصمم الواجهات عبر Figma وأبنيها بنفسي باستخدام React و Tailwind، ليطابق ما يتم اعتماده المنتج الفعلي تمامًا. الواجهات العربية ودعم RTL هما الأساس في عملي، وليس مجرد إضافة لاحقة.",
  about: "أنا أمير صقر، مصمم UI/UX ومطوّر Front-End من غزة، وطالب في السنة النهائية في تخصص تطوير البرمجيات بالجامعة الإسلامية بغزة. أعمل على سد الفجوة بين ملف Figma والمتصفح: أصمم الواجهة ثم أبنيها بدقة عبر React و Tailwind. أسست منصة كفيلي لرعاية الأيتام، وأشارك في إرشاد 40 متدربًا في برنامج CodeMap للواجهات الأمامية ضمن مبادرة طاقات (TAQAT).",
};

export const stats = [
  { value: 2, suffix: "+", label: "سنوات خبرة" },
  { value: 10, suffix: "+", label: "مشاريع منجزة" },
  { value: 40, suffix: "", label: "متدرب أشرفت عليهم" },
];

export const projectCategories = ["الكل", "تطبيقات الويب", "مواقع إلكترونية"];

export const projects = [
  {
    id: "01",
    title: "كفيلي — منصة رعاية الأيتام",
    category: "تطبيقات الويب",
    tag: "تطبيقات الويب / 2026",
    description: "أسست وصممت منصة تربط الكفلاء بالأيتام وتتبع المدفوعات بدقة. مسار كامل في Figma من 80 شاشة، مبني عبر React بدعم كامل للغة العربية والـ RTL. قُدّم المشروع في هاكاثون الابتكار CodeMap 2026.",
    ...sharedProjectsMeta["01"],
  },
  {
    id: "02",
    title: "كفيلي — لوحة تحكم الكافل",
    category: "تطبيقات الويب",
    tag: "تطبيقات الويب / 2026",
    description: "لوحة تحكم متجاوبة تدعم RTL للكفلاء: الملف الشخصي، إعدادات الحساب وقائمة التنقل الجانبية.",
    ...sharedProjectsMeta["02"],
  },
  {
    id: "03",
    title: "تحدي رمضان",
    category: "تطبيقات الويب",
    tag: "تطبيقات الويب / 2026",
    description: "تطبيق تحديات يومية طوال شهر رمضان باللغة العربية: تحدٍ جديد كل يوم مع احتساب النقاط والمستويات وتتبع التقدم المستمر.",
    ...sharedProjectsMeta["03"],
  },
  {
    id: "04",
    title: "أوشن — شركة خدمات تقنية",
    category: "مواقع إلكترونية",
    tag: "مواقع إلكترونية / 2024",
    description: "تحويل ملف التصميم UI/UX الخاص بالشركة إلى موقع متجاوب مكوّن من 8 صفحات: الخدمات، المشاريع، المدونة، التواصل وصفحة 404 مخصصة.",
    ...sharedProjectsMeta["04"],
  },
  {
    id: "05",
    title: "أوتوفيرس — تأجير سيارات",
    category: "مواقع إلكترونية",
    tag: "مواقع إلكترونية / 2025",
    description: "صفحة هبوط لتأجير السيارات تضم الخدمات، معرض أسطول السيارات، آراء العملاء وقسم الخريطة التفاعلية.",
    ...sharedProjectsMeta["05"],
  },
  {
    id: "06",
    title: "مخبز — \"طازج ولذيذ\"",
    category: "مواقع إلكترونية",
    tag: "مواقع إلكترونية / 2026",
    description: "موقع إلكتروني دافئ وجذاب لمخبز يضم قائمة المنتجات، معرض الصور وقسم مواعيد الزيارة والموقع.",
    ...sharedProjectsMeta["06"],
  },
];

export const creativeToolkitPills = [
  "من Figma إلى React",
  "واجهات عربية RTL",
  "HTML & CSS",
  "JavaScript (ES6+)",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "تصميم متجاوب",
  "Git & GitHub",
];

export const educationItems = [
  {
    title: "بكالوريوس تطوير البرمجيات",
    sub: "الجامعة الإسلامية بغزة",
    year: "2022 — 2027",
  },
  {
    title: "مسار UI/UX و Front-End",
    sub: "طاقات (TAQAT)",
    year: "2026",
  },
  {
    title: "تدريب تطوير الويب",
    sub: "سبرنتس (Sprints)",
    year: "2026",
  },
];

export const achievements = [
  { id: "01", title: "Building with the Claude API", sub: "Anthropic", ...sharedAchievementsMeta["01"] },
  { id: "02", title: "Claude Code 101", sub: "Anthropic", ...sharedAchievementsMeta["02"] },
  { id: "03", title: "AI Fluency: Framework & Foundations", sub: "Anthropic", ...sharedAchievementsMeta["03"] },
  { id: "04", title: "Claude 101", sub: "Anthropic", ...sharedAchievementsMeta["04"] },
  { id: "05", title: "تطوير الويب", sub: "سبرنتس (Sprints)", ...sharedAchievementsMeta["05"] },
  { id: "06", title: "مسار جافاسكريبت الكامل", sub: "منصة سطر التعليمية", ...sharedAchievementsMeta["06"] },
  { id: "07", title: "تطوير الواجهات الأمامية", sub: "البورد الكندي للتدريب", ...sharedAchievementsMeta["07"] },
  { id: "08", title: "رخصة قيادة الحاسوب الدولية (ICDL)", sub: "البورد الكندي للتدريب", ...sharedAchievementsMeta["08"] },
  { id: "09", title: "التصميم الجرافيكي", sub: "تيك بوكس (Tech Box)", ...sharedAchievementsMeta["09"] },
];

export const processSteps = [
  {
    index: "01",
    title: "الفكرة",
    desc: "فهم الأهداف الجوهرية، مسارات المستخدمين، والرؤية البصرية والتجريبية التي يجب أن يقدمها المنتج الرقمي.",
  },
  {
    index: "02",
    title: "التخطيط",
    desc: "هيكلة بنية المعلومات، عقود المكونات، وتأسيس قواعد التصميم (Design Tokens) بصرامة واتساق.",
  },
  {
    index: "03",
    title: "البناء",
    desc: "بناء مكونات React نظيفة وقابلة لإعادة الاستخدام، مع منطق برمجي معياري وتنسيق دقيق عبر Tailwind CSS.",
  },
  {
    index: "04",
    title: "الصقل والتحسين",
    desc: "صناعة التفاعلات الدقيقة، والطباعة المتجاوبة، ومعايير إمكانية الوصول، والأداء الفائق بأقل من ثانية.",
  },
  {
    index: "05",
    title: "الإطلاق النهائي",
    desc: "اختبار شامل عبر المتصفحات، وتحسين حزم الإنتاج، والنشر والتسليم السلس للمستخدمين.",
  },
];

export const journeyItems = [
  {
    period: "سبتمبر 2026 — الآن",
    role: "مرشد مساعد",
    subtitle: "برنامج CodeMap للواجهات الأمامية · طاقات",
    description: "دعم 40 متدربًا من خلال المهام الأسبوعية ومراجعة الأكواد والمتابعة الفردية، ومساعدتهم على إطلاق أول منتج عملي لهم.",
  },
  {
    period: "مايو 2026 — الآن",
    role: "المؤسس · مصمم UI/UX ومطوّر Front-End",
    subtitle: "كفيلي",
    description: "صممت رحلة الكافل بالكامل في Figma (80 شاشة)، وأبني الواجهة الأمامية عبر React بدعم كامل للغة العربية والـ RTL. قُدّم المشروع في هاكاثون CodeMap للابتكار 2026.",
  },
  {
    period: "أبريل — يونيو 2026",
    role: "متدرب UI/UX و Front-End",
    subtitle: "طاقات",
    description: "تصميم ونمذجة الواجهات عبر Figma، ثم بناؤها كصفحات React تفاعلية ومتجاوبة بالتعاون مع فريق المطورين.",
  },
  {
    period: "2025",
    role: "متدرب Front-End",
    subtitle: "شفرة",
    description: "بناء وتطوير صفحات الواجهة الأمامية باستخدام HTML و CSS و JavaScript كجزء من فريق التطوير.",
  },
  {
    period: "2024",
    role: "مطوّر Front-End",
    subtitle: "أوشن",
    description: "استلام ملف UI/UX الخاص بالشركة وتحويله إلى موقع متجاوب مكوّن من 8 صفحات، مع الاختبار عبر مختلف المتصفحات.",
  },
];

export const currentFocus = [
  { label: "أتعلم حاليًا", value: "TypeScript و Next.js" },
  { label: "متاح لـ", value: "فرص العمل عن بعد ومشاريع العمل الحر" },
  { label: "الموقع", value: "غزة، فلسطين · توقيت غرينتش+2" },
];

export const lightboxTitles = [
  "01 / للمؤسسات (إدارة الكفالات في نظام واحد)",
  "02 / كيف تعمل كفيلي؟",
  "03 / من نحن",
  "04 / تواصل معنا",
];
