// ─────────────────────────────────────────────────────────────────────────
//  Single source of truth — generated from Harshul Nanda's CV (June 2026)
// ─────────────────────────────────────────────────────────────────────────

export type LinkType = "github" | "video" | "drive" | "web" | "publication";

export interface ResourceLink {
  label: string;
  url: string;
  type: LinkType;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  mode: "On-site" | "Remote" | "Hybrid";
  period: string;
  start: string; // ISO-ish for ordering
  current?: boolean;
  summary: string;
  bullets: string[];
  links?: ResourceLink[];
  accent: string;
  graphic: GraphicKey;
}

export interface Project {
  id: string;
  title: string;
  short: string;
  period: string;
  tags: string[];
  bullets: string[];
  metric?: { value: string; label: string };
  links?: ResourceLink[];
  published?: string;
  accent: string;
  graphic: GraphicKey;
}

export type GraphicKey =
  | "energy"
  | "battery"
  | "timeseries"
  | "mobile"
  | "video-class"
  | "writing"
  | "ble"
  | "robot"
  | "health"
  | "cctv"
  | "nlp"
  | "sentiment";

export const profile = {
  name: "Harshul Nanda",
  firstName: "Harshul",
  lastName: "Nanda",
  roles: [
    "M.Sc. Computer Science @ KIT",
    "Machine Learning & Data Engineer",
    "Reinforcement Learning Researcher",
    "Builder of complete data pipelines",
  ],
  status: "Currently at KIT, researching energy markets with RL",
  tagline:
    "I build practical, data-driven systems. My work ranges from automated measurement pipelines to reinforcement learning agents for energy market simulations.",
  summary:
    "I am a Computer Science master's student who enjoys turning messy data and difficult research questions into working systems. Most of my work combines Python, data engineering and reinforcement learning. I currently contribute to an energy market simulation project at KIT.",
  location: "Karlsruhe, Germany",
  email: "harshulnanda0@gmail.com",
  phones: ["+49 1521 4302080", "+91 95824 55996"],
  dob: "18 October 2003",
  resumeUrl: "/Harshul_Nanda_CV.pdf",
  socials: {
    github: "https://github.com/Harshul-18",
    linkedin: "https://www.linkedin.com/in/harshulnanda/",
    youtube: "https://www.youtube.com/@CocoGlare",
    twitter: "https://x.com/daylightCrawler",
    email: "mailto:harshulnanda0@gmail.com",
  },
  languages: [
    { name: "Hindi", level: "Native", pct: 100 },
    { name: "English", level: "C2", pct: 95 },
    { name: "German", level: "B1", pct: 55 },
  ],
};

export const stats = [
  { value: 9.35, suffix: "", label: "B.Tech CGPA", hint: "approximately 1.3 to 1.5 German GPA" },
  { value: 6, suffix: "", label: "Roles & internships", hint: "4 countries" },
  { value: 5, suffix: "", label: "Research projects", hint: "Springer-published" },
  { value: 98, suffix: "%", label: "Peak model accuracy", hint: "Fine-tuned BERT" },
];

export const experiences: Experience[] = [
  {
    id: "kit",
    role: "Student Research Assistant",
    company: "Karlsruhe Institute of Technology",
    companyUrl: "https://www.kit.edu",
    location: "Karlsruhe, Germany",
    mode: "On-site",
    period: "Jan 2026 to present",
    start: "2026-01",
    current: true,
    summary:
      "Researching reinforcement learning for energy market simulations within the open source ASSUME framework.",
    bullets: [
      "Developing and integrating a Multi-Agent Proximal Policy Optimization algorithm in ASSUME to model complex energy market behaviour.",
      "Developing and integrating parameter sharing functionality for reinforcement learning algorithms within the ASSUME framework.",
    ],
    accent: "#34d399",
    graphic: "energy",
  },
  {
    id: "meatec",
    role: "Battery Data Engineer",
    company: "MEAtec",
    companyUrl: "https://www.mea-tec.com",
    location: "Turkey",
    mode: "Remote",
    period: "Jun 2024 to Jul 2025",
    start: "2024-06",
    summary:
      "Developed machine learning pipelines for industrial battery analytics and enabled a small team to deliver models consistently.",
    bullets: [
      "Built Python pipelines for cell level SOC, SOH, RUL and anomaly detection. Shipped each model as a reusable package with automated GitHub Actions workflows.",
      "Produced synthetic battery data with Equivalent Circuit Model simulations and built the supporting cleaning, feature engineering and validation steps.",
      "Designed a Streamlit dashboard for responsive cell metric analysis and documented the full system with clear UML diagrams.",
      "Introduced shared templates for documentation, reports and GitHub packages to keep the growing team's work traceable.",
    ],
    links: [
      {
        label: "Internship Completion Certificate",
        url: "https://drive.google.com/file/d/1DOtECTda3pAH0nPg1PKWBIrCOYQ2s-HT/view?usp=sharing",
        type: "drive",
      },
    ],
    accent: "#fbbf24",
    graphic: "battery",
  },
  {
    id: "havells",
    role: "Machine Learning Intern",
    company: "Havells Pvt. Ltd.",
    companyUrl: "https://havells.com",
    location: "Noida, India",
    mode: "On-site",
    period: "Jun 2023 to Aug 2023",
    start: "2023-06",
    summary:
      "Forecast sales across several product lines using statistical models and neural networks.",
    bullets: [
      "Applied time-series forecasting with 10+ statistical models (ARIMA family) and LSTM neural networks to predict future sales across diverse product lines.",
      "Contributed to a 45%+ improvement in error rate compared to traditional predictive models.",
    ],
    accent: "#38bdf8",
    graphic: "timeseries",
  },
  {
    id: "paras",
    role: "Software Engineer",
    company: "Paras Labs",
    companyUrl: "https://www.paraslabs.com",
    location: "India",
    mode: "Remote",
    period: "Jan 2023 to May 2023",
    start: "2023-01",
    summary: "Developed a secure and approachable iOS banking application.",
    bullets: [
      "Helped develop a secure digital-banking iOS application using UIKit and SwiftUI.",
      "Built user-friendly interfaces with intricate designs and logic.",
    ],
    accent: "#a78bfa",
    graphic: "mobile",
  },
  {
    id: "beyondexams",
    role: "Machine Learning Intern",
    company: "BeyondExams",
    companyUrl: "https://beyondexams.org",
    location: "India",
    mode: "Remote",
    period: "Jun 2022 to Nov 2022",
    start: "2022-06",
    summary:
      "Collected a large YouTube dataset and trained a classifier for educational content.",
    bullets: [
      "Scraped 10,000+ YouTube videos into channel-specific and video-specific intensive datasets.",
      "Built an innovative model architecture for categorical classification of YouTube videos (educational vs. non-educational).",
    ],
    links: [
      {
        label: "Video Explanation",
        url: "https://www.youtube.com/watch?v=1l_yfh6nHic",
        type: "video",
      },
      {
        label: "Project Files",
        url: "https://github.com/Harshul-18/harmML",
        type: "github",
      },
    ],
    accent: "#fb7185",
    graphic: "video-class",
  },
  {
    id: "opengenus",
    role: "Computer Science Technical Writer",
    company: "OpenGenus",
    companyUrl: "https://iq.opengenus.org",
    location: "Tokyo (Remote)",
    mode: "Remote",
    period: "Apr 2022 to Jun 2022",
    start: "2022-04",
    summary: "Wrote practical, detailed articles about algorithms and data structures.",
    bullets: [
      "Published articles explaining algorithms and data structures with practical implementation, diverse methods and mathematical rigor.",
    ],
    links: [
      {
        label: "Author Page",
        url: "https://iq.opengenus.org/author/harshul/",
        type: "web",
      },
    ],
    accent: "#22d3ee",
    graphic: "writing",
  },
];

export const projects: Project[] = [
  {
    id: "sentiment",
    title: "Sentiment Analysis for Digital Marketing",
    short:
      "A RoBERTa sentiment pipeline that examines Ryanair Flex Plus customer comments.",
    period: "May 2026",
    tags: ["NLP", "RoBERTa", "R", "Hugging Face", "Marketing Analytics"],
    bullets: [
      "Built an R-based sentiment-analysis pipeline for Ryanair Flex Plus customer comments using a RoBERTa transformer model through Python integration.",
      "Conducted visual analysis across sentiment-distribution charts, word clouds, n-gram analysis, engagement comparisons and aspect-based sentiment trends.",
    ],
    links: [
      {
        label: "Project Files",
        url: "https://github.com/Harshul-18/ryanair-sentiment-analysis",
        type: "github",
      },
    ],
    accent: "#34d399",
    graphic: "sentiment",
  },
  {
    id: "ble-ids",
    title: "Smart Intrusion Detection with BLE",
    short:
      "A portable intrusion detector with password protection and multi-factor BLE verification.",
    period: "Jan 2026 to Feb 2026",
    tags: ["Embedded Systems", "Arduino", "BLE", "Sensor Fusion", "IoT"],
    bullets: [
      "Designed a portable, password-protected intrusion-detection system on a Seeed XIAO nRF52840, fusing an IR flame sensor (light-change detection) with an LSM6DS3 IMU (tamper / movement detection).",
      "Combined BLE proximity, live authentication through custom GATT characteristics and a dynamic password with a secure reset flow.",
      "Built a firmware architecture with distinct audible feedback patterns for authentication, intrusion and error states.",
    ],
    links: [
      {
        label: "Project Files",
        url: "https://github.com/Harshul-18/smart-privacy-guard",
        type: "github",
      },
    ],
    accent: "#fbbf24",
    graphic: "ble",
  },
  {
    id: "robotics",
    title: "Autonomous Trajectory Tracking in Mobile Robotics",
    short:
      "Fractional PID control and obstacle avoidance on a TurtleBot 3, tested in simulation and on real hardware.",
    period: "Dec 2024 to Jun 2025",
    tags: ["ROS", "TurtleBot-3", "Arduino", "Raspberry Pi", "Control Theory"],
    bullets: [
      "Compared standard, fractional, adaptive fractional and nonlinear fractional PID controllers for trajectory tracking.",
      "Proposed a general PID control mechanism, validated both in simulation and on a physical TurtleBot-3.",
      "Implemented and improved four pathfinding algorithms (PSO-Heuristic A*, Dijkstra, BFS, Greedy Best-First), integrating them with PID for static obstacle avoidance.",
    ],
    links: [
      {
        label: "Test-Case Videos",
        url: "https://drive.google.com/drive/folders/19NmaVzL3rgsMnF779ZSCIrVMcLdlQtky?usp=sharing",
        type: "drive",
      },
      {
        label: "Project Files",
        url: "https://github.com/Harshul-18/robot-trajectory-manipulation",
        type: "github",
      },
    ],
    accent: "#22d3ee",
    graphic: "robot",
  },
  {
    id: "readmission",
    title: "Predictive Health Management System",
    short:
      "Patient & admin dashboards predicting hospital-readmission risk in real time.",
    period: "Nov 2024 to Dec 2024",
    tags: ["Web Development", "Dashboards", "Random Forests", "Gaussian Processes"],
    bullets: [
      "Developed integrated patient and admin dashboards for real-time readmission-risk tracking.",
      "Implemented predictive models (Random Forests, Gaussian Process Classification) with an easy re-training platform for adaptive risk estimation.",
    ],
    links: [
      {
        label: "Project Files",
        url: "https://github.com/Harshul-18/recura-hytra",
        type: "github",
      },
    ],
    accent: "#fb7185",
    graphic: "health",
  },
  {
    id: "video-unethical",
    title: "Predicting Unethical Activity in Videos",
    short:
      "Deep-learning video classification separating criminal from safe content.",
    period: "Nov 2023 to Dec 2023",
    tags: ["Video Classification", "Deep Learning", "OpenCV"],
    bullets: [
      "Curated a dataset of CCTV footage and videos containing unethical activity, then analysed four video-classification model architectures.",
      "Achieved over 94% accuracy classifying criminal vs. safe content.",
    ],
    metric: { value: "94%", label: "classification accuracy" },
    links: [
      {
        label: "Project Files",
        url: "https://github.com/Harshul-18/crime-watch-project",
        type: "github",
      },
      {
        label: "Springer Publication",
        url: "https://link.springer.com/chapter/10.1007/978-981-97-9132-3_11",
        type: "publication",
      },
    ],
    published:
      "Published in the Springer proceedings of the International Conference on Generative AI, Cryptography and Predictive Analytics.",
    accent: "#a78bfa",
    graphic: "cctv",
  },
  {
    id: "crime-nlp",
    title: "Crime Prediction in Conversations",
    short:
      "A fine-tuned BERT model flagging unethical intent across everyday dialogue.",
    period: "Feb 2023 to Apr 2023",
    tags: ["NLP", "BERT", "Data Science"],
    bullets: [
      "Built a dataset of 1,000+ daily life conversations with 7 to 10 exchanges each, annotated across six categories from unethical to neutral.",
      "Studied and compared 50+ crime-predicting text-classification architectures.",
      "Proposed a state-of-the-art fine-tuned BERT architecture for public-safety NLP, reaching 98% accuracy on the created dataset.",
    ],
    metric: { value: "98%", label: "BERT accuracy" },
    links: [
      {
        label: "Video Explanation",
        url: "https://drive.google.com/file/d/1stmzkmcMO6zBVvZkSiEwg504OaFKH-I_/view?usp=sharing",
        type: "drive",
      },
      {
        label: "Project Files",
        url: "https://github.com/Harshul-18/crime-conversation-analysis/",
        type: "github",
      },
    ],
    accent: "#818cf8",
    graphic: "nlp",
  },
];

export interface SkillGroup {
  title: string;
  accent: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    accent: "#22d3ee",
    skills: ["Python", "Rust", "C / C++", "JavaScript", "MATLAB", "HTML", "CSS", "MySQL"],
  },
  {
    title: "ML & Data",
    accent: "#a78bfa",
    skills: [
      "Machine Learning",
      "Reinforcement Learning",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "NLP",
      "ARIMA / LSTM",
      "NumPy",
      "Pandas",
      "OpenCV",
      "Matplotlib",
      "Seaborn",
      "LangChain",
    ],
  },
  {
    title: "Web & UI",
    accent: "#fb7185",
    skills: ["Streamlit", "Flask", "ReactJS", "Figma", "SwiftUI", "UIKit"],
  },
  {
    title: "Tools & Systems",
    accent: "#34d399",
    skills: [
      "Git",
      "CI/CD · GitHub Actions",
      "Docker",
      "ROS",
      "Blender",
    ],
  },
  {
    title: "CS Foundations",
    accent: "#fbbf24",
    skills: [
      "Data Structures & Algorithms",
      "Numerical Methods",
      "Linear Algebra",
      "Object-Oriented Programming",
    ],
  },
];

export interface EducationItem {
  school: string;
  url?: string;
  degree: string;
  detail?: string;
  period: string;
  current?: boolean;
}

export const education: EducationItem[] = [
  {
    school: "Karlsruhe Institute of Technology",
    url: "https://www.kit.edu",
    degree: "M.Sc. in Computer Science",
    detail: "Karlsruhe, Germany",
    period: "Oct 2025 to present",
    current: true,
  },
  {
    school: "Cluster Innovation Centre, University of Delhi",
    url: "https://cic.du.ac.in",
    degree: "B.Tech. in Information Technology & Mathematical Innovation",
    detail: "Final grade: 9.35 CGPA, approximately 1.3 to 1.5 in the German system",
    period: "Nov 2021 to Jun 2025",
  },
  {
    school: "Adarsh Public School",
    url: "http://www.aps.ac.in",
    degree: "Higher Secondary (Class XII)",
    detail: "Final grade: 91.2%",
    period: "Apr 2020 to Jun 2021",
  },
];

export type CertIcon =
  | "target"
  | "binary"
  | "braincircuit"
  | "barchart"
  | "brain"
  | "cpu"
  | "smartphone"
  | "database"
  | "sigma"
  | "flame"
  | "clipboard";

export interface Certification {
  title: string;
  issuer: string;
  short: string; // tiny label for the medal face
  date: string;
  icon: CertIcon;
  accent: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    title: "SupaBase with Python",
    issuer: "Udemy",
    short: "Supabase",
    date: "Apr 2026",
    icon: "database",
    accent: "#3ecf8e",
    url: "https://www.udemy.com/certificate/UC-f3a7eb59-6c68-4a2d-a5c5-38f0366f319b/",
  },
  {
    title: "R for Statistics and Data Science",
    issuer: "Udemy",
    short: "R",
    date: "Apr 2026",
    icon: "sigma",
    accent: "#276dc3",
    url: "https://www.udemy.com/certificate/UC-371e2601-6367-49a0-a78e-88729b5b76e3/",
  },
  {
    title: "Reinforcement Learning Specialization",
    issuer: "University of Alberta & Amii · Coursera",
    short: "RL",
    date: "Dec 2025",
    icon: "target",
    accent: "#6d8cff",
    url: "https://www.coursera.org/account/accomplishments/specialization/L4I5QNSOZ1CM",
  },
  {
    title: "Practical Deep Learning with PyTorch",
    issuer: "Udemy",
    short: "PyTorch",
    date: "Nov 2025",
    icon: "flame",
    accent: "#ee4c2c",
    url: "https://www.udemy.com/certificate/UC-635b426c-0e46-42fe-add1-eeed4d300690/",
  },
  {
    title: "Asana Project Management",
    issuer: "Udemy",
    short: "Asana",
    date: "Oct 2025",
    icon: "clipboard",
    accent: "#f06a6a",
    url: "https://ude.my/UC-15b5c8a4-9b07-4238-8029-e303fab6e76e",
  },
  {
    title: "Getting Started with TensorFlow 2",
    issuer: "Imperial College London · Coursera",
    short: "TF2",
    date: "Jun 2023",
    icon: "braincircuit",
    accent: "#ff8a3d",
  },
  {
    title: "Analyse Data (CertNexus)",
    issuer: "CertNexus · Coursera",
    short: "Data",
    date: "Jun 2023",
    icon: "barchart",
    accent: "#22d3ee",
  },
  {
    title: "Machine Learning Algorithms: Supervised Learning",
    issuer: "Amii (Alberta) · Coursera",
    short: "ML",
    date: "Jun 2023",
    icon: "brain",
    accent: "#34d399",
  },
  {
    title: "Machine Learning Algorithms",
    issuer: "Sungkyunkwan University · Coursera",
    short: "Algo",
    date: "Jun 2023",
    icon: "cpu",
    accent: "#a78bfa",
  },
  {
    title: "Introduction to iOS Mobile Application Development",
    issuer: "Meta · Coursera",
    short: "iOS",
    date: "Jun 2023",
    icon: "smartphone",
    accent: "#38bdf8",
  },
  {
    title: "100 Data Structures & Algorithms Problems",
    issuer: "AlgoExpert",
    short: "DSA",
    date: "Nov 2022",
    icon: "binary",
    accent: "#fb7185",
  },
];

export type AchievementIcon = "code" | "sigma" | "trophy" | "boxes" | "zap";

export interface Achievement {
  title: string;
  org: string;
  date: string;
  year: string;
  tag: string;
  note: string;
  icon: AchievementIcon;
  accent: string;
  highlight?: boolean;
}

// Ordered oldest → newest to read as a journey.
export const achievements: Achievement[] = [
  {
    title: "Indian Computing Olympiad, Zonal Round",
    org: "IARCS",
    date: "Dec 2020",
    year: "2020",
    tag: "Olympiad",
    note: "Competed in the Zonal Informatics Olympiad 2021 (Indian Association for Research in Computing Science).",
    icon: "code",
    accent: "#818cf8",
  },
  {
    title: "International Mathematics Olympiad",
    org: "Science Olympiad Foundation",
    date: "Apr 2021",
    year: "2021",
    tag: "Olympiad",
    note: "Participated in the International Mathematics Olympiad conducted by SOF.",
    icon: "sigma",
    accent: "#a78bfa",
  },
  {
    title: "Hackathon Winner at Think Beyond Exams",
    org: "BeyondExams",
    date: "Nov 2022",
    year: "2022",
    tag: "1st Place",
    note: "Led my team to 1st place, turning educational-classification models into a web app that predicts a YouTube video or playlist's educational percentage from just a URL.",
    icon: "trophy",
    accent: "#fbbf24",
    highlight: true,
  },
  {
    title: "Facilitator for the Faculty Development Program",
    org: "Cluster Innovation Centre",
    date: "Nov 2023",
    year: "2023",
    tag: "Workshop",
    note: "Hosted a two-day Blender 3D workshop, animating scientific phenomena (electron transmission, wave propagation) to help teachers communicate complex science.",
    icon: "boxes",
    accent: "#22d3ee",
  },
  {
    title: "EV Technology & Public Charging Station Workshop",
    org: "NIELIT",
    date: "Aug 2025",
    year: "2025",
    tag: "Workshop",
    note: "A five day workshop on EV technology covering battery dynamics, motors, power electronics and charging.",
    icon: "zap",
    accent: "#34d399",
  },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
