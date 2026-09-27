"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "[ ETH_NET_PROTOCOL — LUMI SYSTEMS — BOOT SEQUENCE INITIATION ]", type: "gold", delay: 0 },
  { text: "Loading cybernetic registry........... NODE: ROOT_SERVER", type: "normal", delay: 200 },
  { text: "Authenticating access codes........... CLEARANCE: ADMIN", type: "normal", delay: 380 },
  { text: "Syncing secure archives............... OK", type: "ok", delay: 560 },
  { text: "Initialising Distributed Data Nets.... OK", type: "ok", delay: 720 },
  { text: "Mounting Shadow Proxies............... OK", type: "ok", delay: 880 },
  { text: "Calibrating Trace Analytics........... OK", type: "ok", delay: 1020 },
  { text: "Loading target profile — ANUSHKA SINGH....... OK", type: "ok", delay: 1150 },
  { text: "Injecting GIPE & ARSD certificates...... OK", type: "ok", delay: 1260 },
  { text: "Loading skills: Econometrics · SQL · Python.... OK", type: "ok", delay: 1360 },
  { text: "Awakening LUMI AI core..............", type: "fire", delay: 1520 },
  { text: "LUMI: Systems optimal. Awaiting commands, Admin.", type: "gold", delay: 1800 },
  { text: "[ LUMI INTERFACE v9.1 — READY ]", type: "gold", delay: 2050 },
];

interface BootSequenceProps { onComplete: () => void; }

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(prev => [...prev, i]), line.delay));
    });
    timers.push(setTimeout(() => { setDone(true); setTimeout(onComplete, 600); }, 2700));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center"
          style={{ background: "#020402" }}
        >
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 25%, rgba(2,4,2,0.95) 100%)" }} />

          {/* Tech decorative top */}
          <div className="absolute top-8 flex items-center gap-4 opacity-40">
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "1.2rem", color: "#FF00FF" }}>[HNT]</div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", fontWeight: "bold", color: "#FF00FF" }}>
              LUMI OS INITIALIZATION
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "1.2rem", color: "#FF00FF" }}>[SYS]</div>
          </div>

          {/* Terminal box */}
          <div className="relative w-full max-w-2xl px-8 py-7 mx-4"
            style={{
              border: "1px solid rgba(255,0,255,0.25)",
              background: "rgba(4,10,6,0.65)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 40px rgba(255,0,255,0.1), inset 0 0 20px rgba(255,0,255,0.05)",
            }}
          >
            {/* Top bar */}
            <div className="flex items-center gap-2 mb-6" style={{ borderBottom: "1px solid rgba(255,0,255,0.2)", paddingBottom: "12px" }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF00FF", boxShadow: "0 0 6px #FF00FF" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#00FFFF", opacity: 0.6 }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFFFFF", opacity: 0.6 }} />
              <span className="ml-4 font-mono-hud"
                style={{ fontSize: "0.65rem", color: "rgba(255,0,255,0.6)", letterSpacing: "0.15em" }}>
                LUMI.AI — ROOT TERMINAL — SECURE CONNECTION
              </span>
            </div>

            {/* Boot lines */}
            <div className="space-y-0 min-h-[290px]">
              {BOOT_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {visibleLines.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`boot-text ${line.type}`}
                    >
                      {line.text}
                      {i === visibleLines[visibleLines.length - 1] && !visibleLines.includes(BOOT_LINES.length - 1) && (
                        <span className="blink-cursor" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6" style={{ borderTop: "1px solid rgba(255,0,255,0.15)", paddingTop: "14px" }}>
              <div className="h-[2px] rounded-full" style={{ background: "rgba(255,0,255,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #FF00FF, #00FFFF, #FFFFFF)", boxShadow: "0 0 10px #FF00FF" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom tag */}
          <div className="absolute bottom-8 font-mono-hud opacity-30"
            style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#FF00FF" }}>
            HNT · LUMI PROTOTYPE SYSTEM · SYS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
