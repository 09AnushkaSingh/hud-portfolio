"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Send, Cpu, ChevronDown, Minus, X } from "lucide-react";

const SUGGESTIONS = [
  "How to Contact?",
  "Describe research experience",
  "View certifications"
];

export default function LUMIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-lumi-chat', handleToggle);
    return () => window.removeEventListener('toggle-lumi-chat', handleToggle);
  }, []);

  useEffect(() => {
    let handleEscape: (e: KeyboardEvent) => void;

    const handlePopState = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      window.history.pushState({ lumiChatOpen: true }, "");
      window.addEventListener('popstate', handlePopState);

      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEscape);
    } else {
      if (window.history.state?.lumiChatOpen) {
        window.history.back();
      }

      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (handleEscape) window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue.trim() });
    setInputValue("");
  }

  function handleSuggestionClick(text: string) {
    if (isLoading) return;
    setInputValue(text);
    sendMessage({ text });
    setInputValue("");
  }

  function getTextContent(msg: typeof messages[number]): string {
    return msg.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map(p => p.text)
      .join("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-[8000] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="panel flex flex-col overflow-hidden"
            style={{ width: "min(480px, calc(100vw - 48px))", height: "min(560px, calc(100dvh - 120px))", background: "#0D1117", borderColor: "#FF00FF" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b border-[#FF00FF]/30 bg-[#FF00FF]/10">
              <div className="font-jetbrains font-bold text-neon" style={{ fontSize: "0.95rem" }}>
                LUMI // AI ASSISTANT
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="p-1 rounded transition-colors hover:bg-[#FF00FF]/20 text-[#FF00FF]">
                  <Minus size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded transition-colors hover:bg-red-500/20 text-[#FF00FF] hover:text-red-400">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 chat-scroll font-jetbrains">
              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="w-full flex justify-center py-2 relative">
                  <div className="font-jetbrains text-[#FF00FF]/60 text-[0.75rem] tracking-widest uppercase">
                    [ LUMI_AI // POWERED BY OPENROUTER ]
                  </div>
                </motion.div>
              )}
              {messages.length === 0 && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#FF00FF]/20 border border-[#FF00FF]/50 flex items-center justify-center text-[#FF00FF] font-bold shrink-0 shadow-[0_0_8px_rgba(255,0,255,0.4)]">
                    H
                  </div>
                  <div className="text-[#E2E8F0] text-[0.82rem] leading-relaxed max-w-[85%] mt-1 whitespace-pre-wrap font-jetbrains">
                    LUMI: Welcome. I am Anushka's AI Assistant.<br/>Ask me anything about her experience, skills, or certifications.
                  </div>
                </div>
              )}

              {messages.map(m => {
                const text = getTextContent(m);
                if (!text) return null;
                const isAssistant = m.role === "assistant";
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}>

                    {isAssistant && (
                      <div className="w-8 h-8 rounded-full bg-[#FF00FF]/20 border border-[#FF00FF]/50 flex items-center justify-center text-[#FF00FF] font-bold shrink-0 shadow-[0_0_8px_rgba(255,0,255,0.4)]">
                        H
                      </div>
                    )}

                    <div style={{
                      maxWidth: "85%", fontSize: "0.82rem", lineHeight: 1.6,
                      background: isAssistant ? "transparent" : "rgba(255,0,255,0.08)",
                      padding: isAssistant ? "4px 0 0 0" : "8px 12px",
                      borderRadius: isAssistant ? "0" : "6px",
                      border: isAssistant ? "none" : "1px solid rgba(255,0,255,0.25)",
                      color: isAssistant ? "#E2E8F0" : "#FF00FF",
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>
                      {isAssistant ? (
                        <ReactMarkdown components={{
                          p: ({ children }) => <p className="mb-2 text-[#E2E8F0] tracking-tight">{children}</p>,
                          ul: ({ children }) => <ul className="mb-2 pl-4 list-disc marker:text-[#FF00FF]">{children}</ul>,
                          li: ({ children }) => <li className="text-[#E2E8F0] mb-1">{children}</li>,
                          strong: ({ children }) => <strong className="text-[#FF00FF] font-bold">{children}</strong>,
                          code: ({ children }) => <code className="bg-[#FF00FF]/10 text-[#FF00FF] px-1.5 py-0.5 rounded border border-[#FF00FF]/20 text-[0.75rem]">{children}</code>,
                        }}>
                          {text}
                        </ReactMarkdown>
                      ) : text}
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#FF00FF]/20 border border-[#FF00FF]/50 flex items-center justify-center text-[#FF00FF] font-bold shrink-0 shadow-[0_0_8px_rgba(255,0,255,0.4)]">
                    H
                  </div>
                  <div className="text-[#FF00FF] text-[0.82rem] mt-1 font-jetbrains animate-pulse">
                    PROCESSING_REQUEST...<span className="blink-cursor"></span>
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="text-center font-jetbrains text-[0.7rem] text-red-500 mt-4 border border-red-500/30 bg-red-500/10 p-2 rounded">
                  [ SYS_ERR ] — API CONNECTION FAILED
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Actions & Input */}
            <div className="flex flex-col bg-[#0D1117] border-t border-[#FF00FF]/30 pb-2">
              {/* Chips */}
              <div className="flex flex-wrap gap-2 px-4 pt-3 pb-2">
                {SUGGESTIONS.map(sugg => (
                  <button
                    key={sugg}
                    disabled={isLoading}
                    onClick={() => handleSuggestionClick(sugg)}
                    className="font-jetbrains text-[0.68rem] px-2 py-1 rounded border border-[#FF00FF]/40 text-[#A0A5B5] hover:text-[#FF00FF] hover:border-[#FF00FF] hover:bg-[#FF00FF]/10 transition-colors disabled:opacity-50"
                  >
                    [ {sugg} ]
                  </button>
                ))}
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleSubmit} className="px-4 py-2 flex items-center gap-2">
                <span className="font-jetbrains text-[0.75rem] text-[#FF00FF]">guest@system:~$</span>
                <input
                  value={inputValue} onChange={e => setInputValue(e.target.value)}
                  placeholder="ask lumi..." disabled={isLoading}
                  className="flex-1 bg-transparent border-none outline-none font-jetbrains text-[0.8rem] text-[#E2E8F0] placeholder-[#E2E8F0]/40"
                  style={{ caretColor: "#FF00FF" }}
                />
                <button type="submit" disabled={isLoading || !inputValue.trim()} className="p-2 ml-1 rounded transition-colors text-[#FF00FF] disabled:opacity-40 hover:bg-[#FF00FF]/15">
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button and Label Wrapper */}
      <div className="relative flex items-center gap-4">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center px-4 py-2 rounded border border-[#FF00FF]/40 shadow-[0_0_12px_rgba(255,0,255,0.2)]"
            style={{ background: "rgba(13, 17, 23, 0.9)", backdropFilter: "blur(8px)" }}
          >
            <span className="font-jetbrains font-bold text-[#FF00FF] text-[0.75rem] tracking-widest uppercase">
              LUMI AI ASSISTANT
            </span>
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsOpen(v => !v)}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: "radial-gradient(circle, rgba(255,0,255,0.2) 0%, rgba(13,17,23,0.9) 70%)",
            border: "1px solid rgba(255,0,255,0.5)",
            boxShadow: "0 0 20px rgba(255,0,255,0.3), inset 0 0 10px rgba(255,0,255,0.1)",
            cursor: "pointer",
          }}
          aria-label="Toggle LUMI AI"
        >
          <div className="tech-ring" style={{ animationDelay: "0s", borderColor: "#FF00FF" }} />
          <div className="tech-ring" style={{ animationDelay: "1.1s", borderColor: "#FF00FF" }} />
          <Cpu size={22} color="#FF00FF" style={{ filter: "drop-shadow(0 0 8px #FF00FF)" }} />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF00FF] shadow-[0_0_8px_#FF00FF]" />
        </motion.button>
      </div>
    </div>
  );
}
