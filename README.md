# 🖥️ Anushka Singh — Cyber HUD Portfolio

> **Live:** [https://hud-portfolio.vercel.app](https://hud-portfolio.vercel.app)

A JARVIS-style, hacker-aesthetic portfolio built for Backend & AI Engineers. Features a live AI assistant powered by GPT-4o-mini, a 3D interactive arc reactor, dual dark/light theme engine, and full mobile responsiveness.

---

## ✨ Features

- **LUMI AI Assistant** — Conversational AI (GPT-4o-mini via OpenRouter) with full portfolio context, Markdown rendering, suggestion chips, and mobile-optimized terminal UI
- **Dual Theme Engine** — Cyberpunk dark mode (default) + Corporate-Cyberpunk light mode, toggled via CSS variable override system with no JS re-renders
- **3D Arc Reactor** — Interactive Three.js WebGL background with mouse-tracking orbital rings, dynamically loaded (SSR-disabled)
- **Boot Sequence Animation** — Cinematic terminal boot sequence on first load via Framer Motion
- **Sticky Fixed Navbar** — Always-visible header with smooth section anchors, AI Assistant toggle, and light/dark mode switcher
- **Keyboard Shortcuts** — `Escape` closes the AI chat; `AI ASSISTANT` header button toggles open/close
- **Mobile Back-Button Support** — HTML5 History API intercepts the mobile back gesture to close the chat modal instead of leaving the page
- **Responsive Design** — Adaptive 3-column CSS grid (desktop) → 2-column (tablet) → 1-column (mobile)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3.6 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS v4 + Vanilla CSS Variables |
| Animations | Framer Motion |
| 3D Graphics | Three.js + @react-three/fiber + @react-three/drei |
| AI Chat | Vercel AI SDK v7 + OpenRouter (GPT-4o-mini) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/09AnushkaSingh/hud-portfolio.git
cd hud-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your OPENROUTER_API_KEY

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `OPENROUTER_API_KEY` | API key from [openrouter.ai](https://openrouter.ai) |

---

## 📁 Project Structure

```
hud-portfolio/
├── app/
│   ├── api/chat/        # AI chat API route (OpenRouter)
│   ├── globals.css      # CSS variable theme engine (dark + light)
│   ├── layout.tsx       # Root layout with SEO metadata
│   ├── page.tsx         # Main UI — navbar, grid, panels
│   └── sitemap.ts       # Auto-generated sitemap for SEO
├── components/
│   ├── ArcReactor.tsx   # Three.js 3D interactive background
│   ├── BootSequence.tsx # Terminal boot animation
│   └── LUMIChat.tsx   # AI chat assistant component
├── lib/
│   └── data.ts          # Centralised portfolio content & data
└── public/
    ├── Resume.pdf        # Downloadable CV
    └── robots.txt        # SEO crawler config
```

---

## 👤 Author

**Anushka Singh** — Economics Postgraduate & Analyst, GIPE (Pune)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/anushka09singh)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/09AnushkaSingh)
