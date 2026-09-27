"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Database, Server, Brain, Code2, ExternalLink, TerminalSquare } from "lucide-react";

import BootSequence from "@/components/BootSequence";
import LUMIChat from "@/components/LUMIChat";
import { BIO, SKILL_GROUPS, EXP_METRICS, EXP_BULLETS, PROJECTS } from "@/lib/data";

const ArcReactor = dynamic(() => import("@/components/ArcReactor"), { ssr: false });

// ─── EFFECTS ───────────────────────────────────────────────────
function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 mix-blend-screen transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 0, 255, 0.045), transparent 60%)`
      }}
    />
  );
}

// ─── INLINE BRAND ICONS ─────────────────────────────────────────
const GithubIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedinIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);



const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

function Corners() {
  return (
    <>
      <div className="corner tl" /><div className="corner tr" />
      <div className="corner bl" /><div className="corner br" />
    </>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────
export default function Page() {
  const [bootDone, setBootDone] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const handleBootComplete = useCallback(() => setBootDone(true), []);

  useEffect(() => {
    if (isLightMode) document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
  }, [isLightMode]);

  return (
    <main className="relative w-full min-h-screen font-jetbrains" style={{ background: "var(--void)", transition: "background 0.3s ease" }}>
      <div className="scanlines" />
      <div className="noise-overlay" />
      <CursorGlow />
      <BootSequence onComplete={handleBootComplete} />

      {/* 3D Core */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <ArcReactor />
      </div>

      <AnimatePresence>
        {bootDone && (
          <motion.div key="main"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            {/* ── UTILITY NAVBAR ─────────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 fixed top-0 w-full z-[100]"
              style={{ borderBottom: "1px solid var(--border-main)", background: "rgba(var(--void-rgb, 13,17,23), 0.92)", backdropFilter: "blur(12px)" }}>

              {/* Left */}
              <div className="flex items-center gap-3">
                <div style={{
                  width: "16px", height: "16px", border: "1.5px solid rgba(255,0,255,0.8)", borderRadius: "2px",
                  display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 6px rgba(255,0,255,0.4)"
                }}>
                  <div style={{ width: "6px", height: "6px", background: "#FF00FF" }} />
                </div>
                <span className="font-jetbrains font-bold text-[#FF00FF] tracking-widest text-xs hidden sm:inline">
                  LUMI CYBERNETICS // SYSTEM ACTIVE
                </span>
              </div>

              {/* Center - Scrollable Nav for all devices */}
              <div className="flex overflow-x-auto w-full md:w-auto hidescrollbar items-center gap-6 font-jetbrains text-[#A0A5B5] text-[0.7rem] uppercase tracking-widest mt-3 md:mt-0 pb-2 md:pb-0 px-2">
                <a href="#projects" className="whitespace-nowrap hover:text-[#FF00FF] hover:underline underline-offset-4 decoration-[#FF00FF]/50 transition-all">Projects</a>
                <a href="#skills" className="whitespace-nowrap hover:text-[#FF00FF] hover:underline underline-offset-4 decoration-[#FF00FF]/50 transition-all">Skills</a>
                <a href="#experience" className="whitespace-nowrap hover:text-[#FF00FF] hover:underline underline-offset-4 decoration-[#FF00FF]/50 transition-all">Experience</a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('toggle-lumi-chat'))}
                  className="whitespace-nowrap hover:text-[#FF00FF] hover:underline underline-offset-4 decoration-[#FF00FF]/50 transition-all cursor-pointer uppercase"
                >
                  AI Assistant
                </button>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 text-[#A0A5B5] text-[0.65rem] font-jetbrains tracking-wide uppercase mt-4 md:mt-0">
                <button onClick={() => setIsLightMode(!isLightMode)} className="cursor-pointer hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="hidden md:inline">Light Mode</span> {isLightMode ? '🌙' : '☀️'}
                </button>
                <a href="/Resume.pdf" download="Anushka_Singh_Resume.pdf" className="border border-[#A0A5B5]/40 px-2 py-1 rounded hover:text-[#FF00FF] hover:border-[#FF00FF]/60 transition-colors">
                  Download CV 📄
                </a>
                <div className="hidden xl:flex items-center gap-4 border-l border-[#A0A5B5]/30 pl-4">
                  <span className="cursor-pointer hover:text-white">Accessibility: HIGH 👁</span>
                  <span className="flex items-center gap-1.5 cursor-help" title="LUMI Edge APIs">
                    API Status: ONLINE <span className="w-2 h-2 rounded-full bg-[#FF00FF] shadow-[0_0_5px_#FF00FF]" />
                  </span>
                </div>
              </div>
            </div>

            {/* ── FULL SCREEN CONTENT (3-COLUMN CSS GRID) ────────────── */}
            <div className="flex-1 w-full px-4 md:px-6 xl:px-8 pb-6 pointer-events-auto overflow-hidden pt-[140px] md:pt-[100px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto w-full max-w-[2000px]">

                {/* ── LEFT COLUMN: Identity & Sys Log ── */}
                <div className="flex flex-col gap-6">

                  {/* IDENTITY */}
                  <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="panel p-6 relative">
                    <Corners />
                    <div className="flex items-center gap-3 mb-4 font-jetbrains font-bold text-[#FF00FF] text-[0.7rem] tracking-widest uppercase">
                      <Zap size={14} /> <span>ROOT IDENTITY</span>
                    </div>

                    <h1 className="font-jetbrains font-bold text-[#FF00FF] text-3xl sm:text-4xl tracking-tight leading-none filter drop-shadow-[0_0_8px_rgba(255,0,255,0.4)]">
                      ANUSHKA SINGH
                    </h1>
                    <div className="font-jetbrains text-[#A0A5B5] mt-2 text-[0.8rem] tracking-wider uppercase">
                      ANALYST | DATA VISUALIZATION | ECONOMETRICS <br />
                      <span className="text-[#FF00FF]/70">MSc Economics @ GIPE | BA Economics @ ARSD (DU)</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-5">
                      <a href="https://linkedin.com/in/anushka09singh" target="_blank" className="font-jetbrains text-[0.7rem] px-3 py-1.5 border border-[#A0A5B5]/40 rounded hover:border-[#FF00FF] hover:text-[#FF00FF] text-[#A0A5B5] transition-colors flex items-center gap-1">
                        in LinkedIn
                      </a>
                      <a href="https://github.com/09AnushkaSingh" target="_blank" className="font-jetbrains text-[0.7rem] px-3 py-1.5 border border-[#A0A5B5]/40 rounded hover:border-[#FF00FF] hover:text-[#FF00FF] text-[#A0A5B5] transition-colors flex items-center gap-1">
                        <GithubIcon size={12} /> GitHub
                      </a>
                      <a href="mailto:anushka.singh.9120@gmail.com" target="_blank" rel="noopener noreferrer" className="font-jetbrains text-[0.7rem] px-3 py-1.5 border border-[#A0A5B5]/40 rounded hover:border-[#FF00FF] hover:text-[#FF00FF] text-[#A0A5B5] transition-colors flex items-center gap-1">
                        ✉ Email
                      </a>
                    </div>

                    <div className="separator my-5" />

                    <div className="mb-6 space-y-3">
                      <div className="flex items-start gap-2 text-[#E2E8F0]">
                        <span className="text-[#FF00FF] mt-0.5">{'>'}</span>
                        <p className="font-jetbrains text-[0.82rem] leading-relaxed">
                          Economics postgraduate with hands-on experience in analyzing large datasets, building dashboards, and generating actionable business insights.
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-[#E2E8F0]">
                        <span className="text-[#FF00FF] mt-0.5">{'>'}</span>
                        <p className="font-jetbrains text-[0.82rem] leading-relaxed">
                          Proficient in <strong className="text-[#FF00FF] font-bold">Python, SQL, Power BI, and Excel</strong> with exposure to real-world data across finance, retail, and banking domains.
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-[#E2E8F0]">
                        <span className="text-[#FF00FF] mt-0.5">{'>'}</span>
                        <p className="font-jetbrains text-[0.82rem] leading-relaxed">
                          Skilled at transforming raw data into clear, decision-ready reports that drive measurable business strategy and operational efficiency.
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#FF00FF]/5 border-l-2 border-[#FF00FF]/30 p-3 rounded-r mb-2">
                      <h3 className="font-jetbrains text-[#FF00FF] font-bold text-[0.7rem] uppercase tracking-wider mb-2">ABOUT ME</h3>
                      <p className="bio-text text-[0.78rem] whitespace-pre-line opacity-90">{BIO}</p>
                    </div>
                  </motion.div>

                  {/* SYS LOG / EXPERIENCE */}
                  <motion.div id="experience" variants={fadeUp} custom={1} initial="hidden" animate="visible" className="panel p-6 relative">
                    <Corners />
                    <div className="flex items-center gap-3 mb-6 font-jetbrains font-bold text-[#FF00FF] text-[0.7rem] tracking-widest uppercase">
                      <TerminalSquare size={14} /> <span>SYS LOG / RECENT WORK</span>
                    </div>

                    <div className="mb-6">
                      <div className="font-jetbrains text-[#E2E8F0] font-bold text-xl tracking-tight">RESEARCH & ANALYST EXPERIENCE</div>
                      <div className="font-jetbrains mt-1 text-[0.75rem] text-[#FF00FF] uppercase">IIT PATNA • ROBIN & BERRY • ICICI PRUDENTIAL • INSPLORE • AAP</div>
                      <div className="font-jetbrains mt-1 text-[0.65rem] text-[#A0A5B5] uppercase">ECONOMETRICS • FINANCIAL RESEARCH • DATA ANALYTICS</div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      {EXP_METRICS.map(e => (
                        <div key={e.metric} className="bg-[#FF00FF]/5 border border-[#FF00FF]/20 rounded p-2 text-center hover:border-[#FF00FF]/50 transition-colors">
                          <div className="font-jetbrains text-[#E2E8F0] font-bold text-lg">{e.metric}</div>
                          <div className="font-jetbrains mt-1 text-[0.55rem] text-[#FF00FF] tracking-widest uppercase">{e.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {EXP_BULLETS.map((b, i) => (
                        <div key={i}>
                          <div className="font-jetbrains font-bold text-[0.75rem] text-[#E2E8F0] mb-1">
                            {'>'} {b.title}
                          </div>
                          <p className="bio-text text-[0.8rem] opacity-80 pl-3 border-l-2 border-[#FF00FF]/20">{b.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* ── CENTER COLUMN: Technical Arsenal ── */}
                <div id="skills" className="flex flex-col gap-6">
                  <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="panel p-6 relative h-full">
                    <Corners />
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3 font-jetbrains font-bold text-[#FF00FF] text-[0.7rem] tracking-widest uppercase">
                        <Code2 size={14} /> <span>TECHNICAL ARSENAL // SKILLS</span>
                      </div>
                      <span className="font-jetbrains text-[0.6rem] text-[#A0A5B5] italic">capsules</span>
                    </div>

                    <div className="space-y-8">
                      {SKILL_GROUPS.map(group => (
                        <div key={group.label} className="flex flex-col gap-3">
                          <div className="font-jetbrains font-bold text-[#A0A5B5] text-[0.75rem] uppercase tracking-wider">
                            {group.label}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {group.skills.map(s =>
                              <span key={s} className="font-jetbrains text-[0.75rem] px-2.5 py-1 bg-[#FF00FF]/5 border border-[#FF00FF]/20 text-[#E2E8F0] rounded-[2px] transition-colors hover:bg-[#FF00FF]/20 hover:border-[#FF00FF] hover:text-[#FF00FF] cursor-default">
                                {s}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* ── RIGHT COLUMN: Active Projects ── */}
                <div id="projects" className="flex flex-col gap-6">
                  <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="panel p-6 relative h-full">
                    <Corners />
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 font-jetbrains font-bold text-[#FF00FF] text-[0.7rem] tracking-widest uppercase">
                        <Database size={14} /> <span>ACTIVE PROJECTS</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {PROJECTS.map((proj, i) => (
                        <a key={proj.name} href={proj.url} target="_blank" rel="noopener noreferrer"
                          className={`block p-4 rounded bg-[#0D1117]/80 border ${proj.highlight ? 'border-[#FF00FF]/40 shadow-[0_0_15px_rgba(255,0,255,0.1)]' : 'border-[#A0A5B5]/20'} hover:border-[#FF00FF] transition-colors group`}
                        >
                          <div className="font-jetbrains font-bold text-[0.95rem] text-[#E2E8F0] group-hover:text-[#FF00FF] transition-colors mb-2 leading-tight">
                            {proj.name}
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {proj.tag.split(" · ").map(t => (
                              <span key={t} className="font-jetbrains text-[0.6rem] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[#A0A5B5]">
                                {t}
                              </span>
                            ))}
                          </div>

                          <ul className="space-y-1.5">
                            {proj.bullets.map((b, bi) => (
                              <li key={bi} className="font-inter text-[0.8rem] text-[#E2E8F0]/70 leading-snug flex items-start gap-1.5">
                                <span className="text-[#FF00FF] font-bold mt-0.5 text-[0.6rem]">▪</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <div id="chat">
        {bootDone && <LUMIChat />}
      </div>
    </main>
  );
}
