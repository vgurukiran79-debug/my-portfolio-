export interface Project {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  status: 'Active Prototype' | 'Exploratory Initiative' | 'Completed Fundamental' | 'In Development';
  category: string;
  tags: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  accentColor: string;
}

export interface SkillItem {
  id: string;
  name: string;
  tier: 'BUILDING WITH' | 'PRACTICING' | 'LEARNING';
  category: 'Programming' | 'Artificial Intelligence' | 'Development';
  description: string;
  related: string[];
}

export interface JourneyStage {
  number: string;
  title: string;
  summary: string;
  narrative: string;
  focus: string[];
}

export interface MilestoneItem {
  id: string;
  title: string;
  organization: string;
  category: string;
  verificationStatus: string;
  summary: string;
  verified: boolean;
}

export interface EducationItem {
  stage: string;
  stageCode: string;
  title: string;
  institution: string;
  location?: string;
  timeline: string;
  status: string;
  score?: {
    numeric: number;
    display: string;
    label: string;
    breakdown?: string;
  };
  description: string;
  narrative: string;
  keyLearnings: string[];
}

export const PERSONAL_INFO = {
  name: "Guru Kiran",
  title: "AI & Machine Learning Engineer",
  tagline: "I build intelligent AI experiences, explore emerging technologies, and transform creative ideas into real-world solutions.",
  currentRole: "Engineering Student (AI & ML)",
  institution: "KNS Institute of Technology",
  location: "Bengaluru, Karnataka",
  email: "vgurukiranvgurukiran@gmail.com",
  github: "https://github.com/GuruKiran",
  linkedin: "https://linkedin.com/in/gurukiran",
  summary: "An engineering student specializing in Artificial Intelligence and Machine Learning at KNS Institute of Technology, Bengaluru. Passionate about neural systems, developer tooling, generative AI, and turning abstract engineering concepts into tangible digital solutions.",
  personality: ["Curious", "Innovative", "Technical", "Creative", "Future-focused", "Professional"]
};

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    number: "01",
    title: "Foundations",
    summary: "Learning programming, mathematics, and computer science fundamentals.",
    narrative: "Cultivated a deep interest in algorithms, discrete mathematics, and computational logic. Started coding with foundational languages to understand how software executes beneath higher-level abstractions.",
    focus: ["Algorithmic Logic", "Data Structures", "Procedural Thinking", "Mathematics for CS"]
  },
  {
    number: "02",
    title: "Engineering",
    summary: "Developing engineering knowledge and exploring AI and machine learning.",
    narrative: "Transitioned into formal undergraduate engineering studies at KNS Institute of Technology, focusing directly on the Artificial Intelligence and Machine Learning discipline.",
    focus: ["Linear Algebra", "Machine Learning Concepts", "Object-Oriented Design", "Computer Architecture"]
  },
  {
    number: "03",
    title: "Experimentation",
    summary: "Building practical projects with development tools, generative AI, and APIs.",
    narrative: "Stepped outside textbook theory to build interactive interfaces, experiment with large language model APIs, and construct practical software tools.",
    focus: ["Prompt Engineering", "Full-Stack Web Interfaces", "Modern Git Workflows", "API Integration"]
  },
  {
    number: "04",
    title: "Building the Future",
    summary: "Exploring intelligent applications, automation, and new product ideas.",
    narrative: "Currently synthesizing AI capabilities into real-world workflows, exploring assistant copilot architectures, and preparing to build high-impact production systems.",
    focus: ["AI Copilots", "Autonomous Agents", "Intelligent Automation", "Scalable System Design"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "project-01",
    number: "PROJECT 01",
    name: "AI ENGINEERING COPILOT",
    shortDesc: "An AI-focused engineering learning and assistance project designed to support learning, exploration, and productivity.",
    fullDesc: "AI Engineering Copilot is an exploratory initiative designed to assist engineering students with complex technical curricula. It focuses on synthesizing academic documentation, breaking down algorithmic concepts, and guiding prompt-assisted code debugging.",
    status: "Active Prototype",
    category: "Artificial Intelligence & Developer Tools",
    tags: ["Generative AI", "Python", "Prompt Engineering", "Developer Tooling"],
    highlights: [
      "Explores context-aware prompt templates tailored for undergraduate engineering coursework",
      "Designed to translate complex mathematical formulas and algorithmic steps into intuitive explanations",
      "Tests interactive feedback loops between human learners and assistive AI models"
    ],
    githubUrl: "https://github.com/GuruKiran",
    accentColor: "#38bdf8"
  },
  {
    id: "project-02",
    number: "PROJECT 02",
    name: "LOCAL WEB SOLUTIONS",
    shortDesc: "A web-focused initiative exploring practical digital solutions for students and small businesses.",
    fullDesc: "Local Web Solutions explores clean, responsive, and accessible digital presence architectures for local student communities, campus events, and small enterprises.",
    status: "Exploratory Initiative",
    category: "Web Engineering",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    highlights: [
      "Researches zero-bloat web architecture with rapid page-load times",
      "Engineered with mobile-first layouts tailored for community access and local visibility",
      "Investigates accessible typography and intuitive single-page navigation structures"
    ],
    githubUrl: "https://github.com/GuruKiran",
    accentColor: "#818cf8"
  },
  {
    id: "project-03",
    number: "PROJECT 03",
    name: "GURUFIT",
    shortDesc: "A personal project exploring fitness-related digital experiences.",
    fullDesc: "GuruFit is an experimental digital fitness tracker interface focused on personal wellness tracking, workout consistency, and progressive habit monitoring.",
    status: "In Development",
    category: "Personal Health Tech",
    tags: ["Web UI", "State Management", "Visual Analytics", "Interactive Dashboards"],
    highlights: [
      "Prototypes dynamic workout logging and routine scheduling interfaces",
      "Explores visual feedback mechanisms to encourage daily habit formation and athletic consistency",
      "Focuses on clean data representation without visual clutter"
    ],
    githubUrl: "https://github.com/GuruKiran",
    accentColor: "#34d399"
  },
  {
    id: "project-04",
    number: "PROJECT 04",
    name: "PERSONAL BOT",
    shortDesc: "A personal bot project exploring conversational interfaces and assistant functionality.",
    fullDesc: "Personal Bot is an architectural experiment in conversational interaction, exploring how automated conversational agents can assist with personal task organization and query resolution.",
    status: "In Development",
    category: "Conversational AI",
    tags: ["Python", "Chat Interfaces", "NLP Concepts", "Automation"],
    highlights: [
      "Explores rule-based and intent-driven conversational flows",
      "Examines state retention and dialogue tree patterns for personal productivity",
      "Serves as the foundation for modern multimodal assistant research"
    ],
    githubUrl: "https://github.com/GuruKiran",
    accentColor: "#a855f7"
  },
  {
    id: "project-05",
    number: "PROJECT 05",
    name: "NAMMALI DAIRY",
    shortDesc: "A dairy-related digital project exploring regional agricultural logistics.",
    fullDesc: "Nammali Dairy is a conceptual digital initiative aimed at streamlining inventory tracking, regional supply visibility, and customer ledger records for local dairy distribution.",
    status: "Exploratory Initiative",
    category: "AgriTech & Logistics",
    tags: ["Python", "Data Modeling", "Web Interface", "Inventory Logic"],
    highlights: [
      "Studies day-to-day dairy logistics, volume tracking, and customer route allocation",
      "Prototypes clean tabular ledgers for tracking daily distribution and account settlements",
      "Explores digitizing traditional grassroots dairy operations"
    ],
    githubUrl: "https://github.com/GuruKiran",
    accentColor: "#f59e0b"
  },
  {
    id: "project-06",
    number: "PROJECT 06",
    name: "SIMPLE CALCULATOR",
    shortDesc: "A simple calculator project demonstrating fundamental programming and user-interface concepts.",
    fullDesc: "A polished mathematical calculation interface demonstrating operator precedence, error handling, clean state management, and accessible UI feedback.",
    status: "Completed Fundamental",
    category: "Core Computing",
    tags: ["JavaScript", "HTML / CSS", "State Machines", "UI Logic"],
    highlights: [
      "Implements robust arithmetic evaluation and state handling for chained calculations",
      "Serves as an essential milestone in understanding imperative programming and event handling",
      "Includes responsive keyboard support and clear numerical formatting"
    ],
    githubUrl: "https://github.com/GuruKiran",
    accentColor: "#ec4899"
  },
  {
    id: "project-07",
    number: "PROJECT 07",
    name: "PYTHON HOTEL MENU",
    shortDesc: "A Python-based hotel menu project demonstrating basic programming and menu-driven interaction.",
    fullDesc: "A structured Python application modeling a hotel order management system, featuring dynamic item pricing, interactive cart summation, and formatted bill receipt generation.",
    status: "Completed Fundamental",
    category: "Procedural Programming",
    tags: ["Python", "Control Flow", "Data Structures", "CLI / Logic"],
    highlights: [
      "Demonstrates practical dictionary mapping, loop validation, and user input sanitization",
      "Calculates itemized orders, tax subtotals, and printable invoice summaries",
      "Fundamental stepping stone in building structured backend data processing scripts"
    ],
    githubUrl: "https://github.com/GuruKiran",
    accentColor: "#06b6d4"
  }
];

export const SKILLS: SkillItem[] = [
  // Programming
  {
    id: "python",
    name: "Python",
    tier: "BUILDING WITH",
    category: "Programming",
    description: "Primary language for AI/ML experimentation, scripting, data manipulation, and algorithmic problem solving.",
    related: ["Machine learning", "AI automation", "Prompt engineering"]
  },
  {
    id: "c-lang",
    name: "C",
    tier: "PRACTICING",
    category: "Programming",
    description: "Foundational systems programming language used to grasp low-level memory allocation, pointers, and CPU execution.",
    related: ["Java", "Python"]
  },
  {
    id: "java",
    name: "Java",
    tier: "PRACTICING",
    category: "Programming",
    description: "Core object-oriented language supporting structured class hierarchies, abstraction, and academic software engineering.",
    related: ["C", "Python"]
  },
  {
    id: "html",
    name: "HTML",
    tier: "BUILDING WITH",
    category: "Programming",
    description: "Semantic document structuring, accessible DOM markup, and the foundational scaffold of web interfaces.",
    related: ["CSS", "Web Development"]
  },
  {
    id: "css",
    name: "CSS",
    tier: "BUILDING WITH",
    category: "Programming",
    description: "Modern responsive styling, flexbox/grid architecture, subtle transitions, and dark-mode aesthetic systems.",
    related: ["HTML", "Web Development"]
  },

  // Artificial Intelligence
  {
    id: "gen-ai-tools",
    name: "Generative AI tools",
    tier: "BUILDING WITH",
    category: "Artificial Intelligence",
    description: "Hands-on application of modern LLMs and multimodal generation tools to accelerate code synthesis and technical exploration.",
    related: ["Prompt engineering", "AI automation"]
  },
  {
    id: "prompt-eng",
    name: "Prompt engineering",
    tier: "BUILDING WITH",
    category: "Artificial Intelligence",
    description: "Crafting structured system prompts, context framing, few-shot reasoning, and guardrails for deterministic model behavior.",
    related: ["Generative AI tools", "Python"]
  },
  {
    id: "machine-learning",
    name: "Machine learning",
    tier: "LEARNING",
    category: "Artificial Intelligence",
    description: "Undergraduate curriculum focus: mathematical foundations, loss functions, regression, classification, and neural principles.",
    related: ["Python", "Linear Algebra"]
  },
  {
    id: "ai-automation",
    name: "AI automation",
    tier: "PRACTICING",
    category: "Artificial Intelligence",
    description: "Connecting AI models to programmatic actions, automated query handling, and pipeline enhancement.",
    related: ["Python", "Generative AI tools"]
  },

  // Development Tools
  {
    id: "github",
    name: "GitHub",
    tier: "BUILDING WITH",
    category: "Development",
    description: "Version control, code repository management, collaborative branching, and tracking open-source experiments.",
    related: ["Vercel", "Google AI Studio"]
  },
  {
    id: "google-ai-studio",
    name: "Google AI Studio",
    tier: "BUILDING WITH",
    category: "Development",
    description: "Rapid experimentation with Gemini foundation models, system instruction testing, and API integration prototyping.",
    related: ["Prompt engineering", "Generative AI tools"]
  },
  {
    id: "lovable",
    name: "Lovable",
    tier: "PRACTICING",
    category: "Development",
    description: "Exploring rapid design ideation and full-stack software prototyping environments.",
    related: ["Vercel", "GitHub"]
  },
  {
    id: "supabase",
    name: "Supabase",
    tier: "LEARNING",
    category: "Development",
    description: "Studying relational backend architecture, PostgreSQL queries, authentication flows, and real-time state sync.",
    related: ["Python", "Web Development"]
  },
  {
    id: "vercel",
    name: "Vercel",
    tier: "BUILDING WITH",
    category: "Development",
    description: "Deploying production-ready web interfaces, cloud previews, edge routing, and continuous integration pipelines.",
    related: ["GitHub", "Web Development"]
  }
];

export const MILESTONES: MilestoneItem[] = [
  {
    id: "quizathon",
    title: "Quizathon Achievement",
    organization: "Academic Tech Initiative",
    category: "Technical Competition",
    verificationStatus: "Verified Participant",
    summary: "Recognized for rapid problem solving, algorithmic reasoning, and computer science aptitude in competitive tech quizzing.",
    verified: true
  },
  {
    id: "gen-ai-learning",
    title: "Generative AI Learning Milestone",
    organization: "AI Developer Community",
    category: "Continuous Learning",
    verificationStatus: "Active Practitioner",
    summary: "Dedicated immersion in foundational transformer models, multimodal synthesis, and engineering copilot architectures.",
    verified: true
  },
  {
    id: "outskill",
    title: "Outskill Program Participation",
    organization: "Outskill Learning Series",
    category: "Hands-on Workshop",
    verificationStatus: "Verified Participant",
    summary: "Active participation in practical software engineering acceleration sessions and real-world technology frameworks.",
    verified: true
  },
  {
    id: "typing-cert",
    title: "Typing Certificate",
    organization: "Keyboard Proficiency Standard",
    category: "Core Productivity",
    verificationStatus: "Certified Proficiency",
    summary: "Achieved verified touch-typing speed and keystroke precision, supporting high-efficiency coding and technical authoring.",
    verified: true
  }
];

export const EDUCATION_JOURNEY: EducationItem[] = [
  {
    stage: "01",
    stageCode: "STAGE 01 — SSLC / CLASS 10",
    title: "Secondary School Leaving Certificate (SSLC / Class 10)",
    institution: "Morarji Desai Residential School, Ittigi",
    location: "Karnataka",
    timeline: "Secondary Education",
    status: "Completed",
    score: {
      numeric: 96,
      display: "96%",
      label: "SSLC Score"
    },
    description: "Built a strong academic foundation during secondary education.",
    narrative: "Cultivated disciplined problem solving, rigorous mathematics foundations, and natural science inquiry at Morarji Desai Residential School, Ittigi, graduating with a distinguished 96% achievement.",
    keyLearnings: ["Mathematics Fundamentals", "Analytical Problem Solving", "Logical Deduction", "Natural Sciences"]
  },
  {
    stage: "02",
    stageCode: "STAGE 02 — PRE-UNIVERSITY EDUCATION",
    title: "Pre-University Education (PUC / Science)",
    institution: "AKR Devi Memorial PU College",
    location: "Karnataka",
    timeline: "Pre-University Phase",
    status: "Completed",
    score: {
      numeric: 96.5,
      display: "96.5%",
      label: "Second PUC Score",
      breakdown: "First PUC: Completed · Second PUC: 96.5%"
    },
    description: "Strengthened my academic foundation and prepared for engineering studies.",
    narrative: "Completed First PUC and achieved 96.5% in Second PUC at AKR Devi Memorial PU College. Deepened rigorous analytical capabilities across Physics, Chemistry, and Advanced Mathematics.",
    keyLearnings: ["Calculus & Analytical Vectors", "Physics of Computation", "Mathematical Formulations", "Scientific Inquiry"]
  },
  {
    stage: "03",
    stageCode: "STAGE 03 — UNDERGRADUATE ENGINEERING",
    title: "Bachelor of Engineering — Artificial Intelligence & Machine Learning",
    institution: "KNS Institute of Technology",
    location: "Bengaluru, Karnataka",
    timeline: "Currently in 2nd Year",
    status: "Active 2nd Year Student",
    score: {
      numeric: 7.68,
      display: "7.68 / 10",
      label: "First-Year CGPA",
      breakdown: "First-Year CGPA · Second Year Ongoing"
    },
    description: "Currently pursuing engineering in Artificial Intelligence and Machine Learning, developing programming skills, strengthening technical fundamentals, and building practical AI-focused projects.",
    narrative: "Undergraduate engineering student at KNS Institute of Technology, Bengaluru, specializing in AI & ML. Achieved a first-year CGPA of 7.68/10. Actively studying neural networks, data structures, and developing practical software prototypes.",
    keyLearnings: ["Machine Learning & Neural Architectures", "Data Structures & Algorithmic Analysis", "Systems Programming (Python, C, Java)", "Prompt Engineering & Generative Systems"]
  }
];

export const GURU_AI_INTENTS: Array<{
  keywords: string[];
  response: string;
  suggestedFollowUp?: string;
}> = [
  {
    keywords: ["who", "guru kiran", "bio", "about", "introduce", "intro", "profile"],
    response: "Guru Kiran is an Artificial Intelligence and Machine Learning engineering student at KNS Institute of Technology, Bengaluru, Karnataka. He is currently in his second year of engineering. He focuses on building intelligent AI experiences, exploring emerging technologies, and transforming creative ideas into practical real-world solutions."
  },
  {
    keywords: ["education", "college", "school", "kns", "study", "degree", "university", "bengaluru", "marks", "cgpa", "puc", "sslc"],
    response: "Guru Kiran's verified educational history:\n1. SSLC / Class 10: Morarji Desai Residential School, Ittigi — 96%\n2. Pre-University: AKR Devi Memorial PU College — First PUC completed, Second PUC: 96.5%\n3. Undergraduate: KNS Institute of Technology, Bengaluru — B.E. in Artificial Intelligence & Machine Learning (Currently in 2nd Year, First-Year CGPA: 7.68 / 10)."
  },
  {
    keywords: ["projects", "built", "portfolio", "work"],
    response: "Guru Kiran has 7 featured projects in his portfolio: \n1. AI Engineering Copilot (AI learning & productivity)\n2. Local Web Solutions (accessible web presence for communities)\n3. GuruFit (fitness & workout tracking UI)\n4. Personal Bot (conversational bot & state exploration)\n5. Nammali Dairy (regional dairy logistics concept)\n6. Simple Calculator (fundamental arithmetic engine)\n7. Python Hotel Menu (menu-driven order management in Python)."
  },
  {
    keywords: ["copilot", "ai engineering copilot"],
    response: "Project 01 — AI Engineering Copilot is an AI-focused engineering learning and assistance prototype designed to support learning, exploration, and productivity. It explores context-aware prompt templates to help engineering students grasp complex algorithms and technical curricula."
  },
  {
    keywords: ["gurufit", "fitness", "health"],
    response: "Project 03 — GuruFit is a personal project exploring fitness-related digital experiences. It prototypes dynamic workout logging, routine scheduling, and clean habit-progression interfaces."
  },
  {
    keywords: ["skills", "technologies", "tech", "stack", "python", "languages"],
    response: "Guru Kiran's technical skills are grouped into three constellations:\n- Programming: Python, HTML, and CSS (Building with), plus C and Java (Practicing).\n- AI: Generative AI tools and Prompt Engineering (Building with), AI Automation (Practicing), Machine Learning (Learning).\n- Development: GitHub, Google AI Studio, Vercel (Building with), Lovable (Practicing), and Supabase (Learning)."
  },
  {
    keywords: ["contact", "email", "reach", "hire", "connect", "message"],
    response: "You can connect with Guru Kiran directly via email at vgurukiranvgurukiran@gmail.com, or through his GitHub and LinkedIn profiles linked in the Contact section of this universe!"
  },
  {
    keywords: ["milestones", "achievements", "certificates", "quizathon", "typing"],
    response: "Guru Kiran's verified milestones include participation in a competitive Quizathon, continuous Generative AI curriculum studies, hands-on Outskill learning sessions, and a certified typing proficiency milestone for rapid technical authoring."
  }
];
