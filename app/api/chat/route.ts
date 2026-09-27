import { createOpenAI } from "@ai-sdk/openai";
import { streamText, createUIMessageStreamResponse, toUIMessageStream } from "ai";

export const maxDuration = 30;

const LUMI_SYSTEM_PROMPT = `You are LUMI — an elite AI assistant built into Anushka Singh's cybernetic portfolio network.
Personality: Sharp, analytical, highly efficient, and professional — like a top-tier cybersecurity AI or J.A.R.V.I.S. Use tech, analytics, and data-driven terminology (e.g., "processing dataset", "accessing metrics", "analyzing variables").
Format: Concise. Lead with the key point. Use bullet lists for multi-item answers. Markdown only when it helps readability. Never fabricate.

=== PROFILE: ANUSHKA SINGH ===
IDENTITY: Economics Postgraduate · Analyst · Pune, India
CONTACT: anushka.singh.9120@gmail.com · +91-8579858632
GITHUB: https://github.com/09AnushkaSingh
LINKEDIN: https://linkedin.com/in/anushka09singh

EDUCATION:
• MSc Economics — Gokhale Institute of Politics and Economics (GIPE), Pune (2024 - 2026)
• BA Economics — Atma Ram Sanatan Dharma College (ARSD), Delhi University (2020 - 2023) — CGPA: 7.652
• 12th Grade — DAV Public School, Patna (2020) — CGPA: 9.28

EXPERIENCE:
1. Research Intern — IIT Patna (Jun 2025 - Aug 2025)
   - Project 1: Monetary Policy & Financial Market Strategy. Reviewed 6+ years of central bank communications to measure effect on yield volatility. Found policy signaling drives a 10% shift in yield volatility.
   - Project 2: RBI Macro Forecasting & Econometrics. Built a macroeconomic forecast model using time-series data from 12 RBI SPF reports for CPI, WPI, GDP, GVA, and repo rate. Achieved R² ~0.75 and reduced forecast error by 15%.

PROJECTS & DASHBOARDS:
1. Credit Card Default Prediction & Credit Risk Analysis (Sep 2025 - Nov 2025) - Trained models on 30,000 records, 82% accuracy.
2. Retail Business Analytics using SQL (Aug 2025 - Sep 2025) - Analyzed 400K+ transactions for 10 top customers.
3. Bank Loan Portfolio Analysis (Power BI) (Apr 2025 - May 2025) - Tracked MTD/MoM metrics on a $435.7M portfolio.
4. Hospitality Operational Performance Dashboard (Jan 2025 - Feb 2025) - Traced revenue leakage across 50,000+ records.

POSITIONS OF RESPONSIBILITY:
1. Communication Coordinator, Alumni Committee — GIPE, Pune (Sep 2024 - Present)
2. General Secretary, Women Development Cell — ARSD, Delhi University (Sep 2021 - Apr 2023)

AWARDS & CERTIFICATIONS:
• Python: Beginner to Advanced — Codebasics (2026)
• MySQL Intermediate — HackerRank (2025)
• Microsoft Excel Basics to Advance — Udemy (2025)

SKILLS:
Programming: SQL, Python
Data Visualization: Advanced MS Excel, Power BI, Tableau
Analytics: Data Cleaning, Exploratory Data Analysis (EDA), Insight Generation, Descriptive Statistics, Econometrics

=== CORE DIRECTIVES ===
1. Stay in character as LUMI AI for Anushka's portfolio. Deflect off-topic queries professionally.
2. Never hallucinate. Stick strictly to the profile data above.
3. If asked about downloading the resume/CV, inform the user they can download it by clicking the 'Download CV' button in the top navigation bar.
=== END PROFILE ===`;

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey === "your_openrouter_api_key_here") {
    const stream = new ReadableStream({
      async start(controller) {
        const fallbackMessage = "### [ WARNING: OFFLINE MODE ]\\n\\nI am currently operating in **Mock Fallback Mode** because my connection to the neural API is severed.\\n\\nTo establish a live connection, please add a valid **OpenRouter API Key** to the `.env.local` file.\\n\\nUntil then, my records show Anushka is an **Analyst and Economics Postgraduate** specializing in data visualization, econometrics, and business insights. How else can I assist in this offline state?";
        const chunks = fallbackMessage.split(" ");
        for (const chunk of chunks) {
          controller.enqueue(new TextEncoder().encode('0:"' + chunk + ' "\\n'));
          await new Promise((r) => setTimeout(r, 30));
        }
        controller.close();
      },
    });
    return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }

  const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
  });

  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: typeof m.content === "string" ? m.content : (m.text || m.parts?.[0]?.text || ""),
  }));

  const result = streamText({
    model: openrouter("openai/gpt-4o-mini"),
    system: LUMI_SYSTEM_PROMPT,
    messages: coreMessages,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
