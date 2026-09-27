// ─── PORTFOLIO DATA ──────────────────────────────────────────────
// Centralised data file — edit content here, UI in page.tsx

export const BIO = `I’m an Economics postgraduate with a strong interest in data analytics, financial research and evidence based decision-making.\n\nMy experience spans research analysis, financial analysis, marketing and project management. Through these roles, I’ve worked with data, researched businesses and markets and turned complex information into clear insights that support better decisions.\n\nI enjoy working with data to understand what’s happening behind the numbers, identify patterns, and solve business problems. My current work as a Research Analyst has further strengthened my ability to work with large datasets, validate information and analyze companies, markets, and industries.`;

export const SKILL_GROUPS = [
  {
    label: "Programming & Querying",
    skills: ["SQL", "Python"],
  },
  {
    label: "Data Visualization",
    skills: ["Advanced MS Excel", "Power BI", "Tableau"],
  },
  {
    label: "Analytical Abilities",
    skills: ["Data Cleaning", "Exploratory Data Analysis (EDA)", "Insight Generation", "Descriptive Statistics", "Econometrics"],
  },
  {
    label: "Certifications",
    skills: ["Python: Beginner to Advanced", "MySQL Intermediate", "MS Excel Basics to Advance"],
  },
  {
    label: "Core Skills",
    skills: ["Event Organization", "Editorial Planning", "Communication", "Financial Market Strategy", "Macro Forecasting"],
  },
];

export const EXP_METRICS = [
  { metric: "12",    label: "RBI SPF reports",     desc: "Macro forecasting model" },
  { metric: "30K+",  label: "records analyzed",    desc: "Credit risk prediction" },
  { metric: "MSc.",  label: "Economics",           desc: "Gokhale Institute, Pune" },
  { metric: "400K+", label: "transactions processing", desc: "Retail Business Analytics" },
];

export const EXP_BULLETS = [
  {
    title: "Research Analyst — Robin & Berry",
    text: "Research and analyze company, market, and industry information to support ongoing business projects. Work with large amounts of data from different sources — checking, cleaning, and validating information before analysis. Identify trends, patterns, and key insights from financial and market data to help answer business questions. Use Excel and other analytical tools. Handle research projects independently while maintaining accuracy. (Jul 2026 – Present)",
  },
  {
    title: "Research Intern — IIT Patna",
    text: "Project 1: Monetary Policy & Financial Market Strategy. Reviewed 6+ years of central bank communications to measure their effect on investor expectations and short-term yield volatility. Policy signaling was found to drive a 10% shift in yield volatility.\nProject 2: RBI Macro Forecasting & Econometrics. Built a macroeconomic forecast model using time-series data from 12 RBI SPF reports; achieved R²~0.75 and reduced forecast error by 15%. (Jun 2025 – Aug 2025)",
  },
  {
    title: "Financial Analyst — ICICI Prudential Life Insurance",
    text: "Selected through on-campus placement. Gained hands-on exposure to financial analysis and reporting. The experience heavily strengthened my interest in economics and motivated me to pursue a Master's degree in the field. (Jun 2023)",
  },
  {
    title: "Marketing & Finance Intern — Insplore Consultants",
    text: "Began with marketing — gaining experience in market analysis, lead generation, and managing client relationships. Later transitioned into finance, working on financial statement analysis, ratio analysis, portfolio management, and financial market research to inform advisory decisions. (Jan 2023 – Apr 2023)",
  },
  {
    title: "Project Management Intern — Aam Aadmi Party",
    text: "Played a key role in keeping projects organized by handling administrative tasks — creating project plans, tracking issues and risks, managing budgets, and maintaining thorough documentation. Collected data for monitoring, evaluation, and learning activities. (Sep 2022 – Dec 2022)",
  },
  {
    title: "Communication Coordinator — Alumni Committee (GIPE)",
    text: "Led content creation and editorial planning for TEDxGIPE and Alumni Convention, coordinating external communication and webinar outreach strategies that improved participant engagement across multiple events. (Sep 2024 – Present)",
  },
  {
    title: "General Secretary — Women Development Cell (ARSD)",
    text: "Directed 15+ volunteers and managed annual activity budget to run gender awareness campaigns, successfully reaching 1,000+ students on campus through structured programs and resource planning. (Sep 2021 – Apr 2023)",
  },
];

export const PROJECTS = [
  {
    name: "Credit Card Default Prediction & Credit Risk Analysis",
    tag: "Python · Machine Learning · Risk Analysis",
    url: "https://github.com/09AnushkaSingh/credit-card-default-prediction",
    bullets: [
      "Found that recent repayment behavior (PAY_0, PAY_2) predicts default better than credit limit or demographics",
      "Models trained on 30,000 records confirmed this with ~82% accuracy",
      "Result can be directly used to flag high-risk borrowers early, making it useful for NPA management in real banking scenarios"
    ],
    highlight: true,
  },
  {
    name: "Retail Business Analytics using SQL",
    tag: "SQL · Pattern Recognition",
    url: "https://github.com/09AnushkaSingh/sql-retail-analytics-project",
    bullets: [
      "Found that top 10 customers were driving most of the revenue across 400K+ transactions – a clear concentration risk",
      "Seasonal patterns in MoM revenue data showed when the business peaks and dips, giving a factual base for demand planning instead of assumptions"
    ],
    highlight: true,
  },
  {
    name: "Bank Loan Portfolio Analysis",
    tag: "Power BI · Dashboard",
    url: "https://github.com/09AnushkaSingh/bank-loan-powerbi-analysis",
    bullets: [
      "Found a 13.8% charged-off loan rate and geographic concentration risk across a $435.7M portfolio",
      "MTD/MoM tracking gave a running view of portfolio health, making it easier for decision-makers to spot stress signals before they escalate"
    ],
    highlight: true,
  },
  {
    name: "Hospitality Operational Performance Dashboard",
    tag: "Data Visualization · Efficiency",
    url: "https://github.com/09AnushkaSingh/hospitality-analytics-project",
    bullets: [
      "Traced revenue leakage and low-performing segments across 50,000+ records, giving management a clear picture of where resources were being wasted",
      "Recommendations built from the analysis projected a 20% gain in operational efficiency"
    ],
    highlight: true,
  },
];
