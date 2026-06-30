# Community Resource Navigator

> **AI-powered student toolkit** — Find deals, campus programs, and public benefits through plain-English conversation.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000?style=for-the-badge&logo=vercel)](https://community-resource-navigator.vercel.app)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Claude API](https://img.shields.io/badge/Claude-claude--sonnet--4--6-cc785c?style=flat-square)](https://www.anthropic.com)

---

## What it does

Three AI-powered tools for college students and young adults:

| Tool | What it finds |
|------|--------------|
| 🛍️ **Deal Finder** | Student discounts at Best Buy, Apple, Adobe, Spotify, GitHub, Amazon, UNiDAYS, and more |
| 🎓 **Campus Finder** | Tutoring, scholarships, food pantries, career services, clubs at your specific school |
| 🧭 **Resource Guide** | FAFSA, SNAP, Medicaid, PSLF, mental health lines, legal aid — 28+ real programs |

Ask anything in plain English. The AI returns structured, actionable results with direct links and student pricing.

---

## Demo

**Deal Finder** — "What student discounts does Best Buy offer?"

![Deal Finder screenshot](docs/demo-deals.png)

**Campus Finder** — "I go to CSI CUNY — what tutoring is available?"

![Campus Finder screenshot](docs/demo-campus.png)

**Resource Guide** — "I can't afford food this week."

![Resource Guide screenshot](docs/demo-resources.png)

---

## Stack

- **Frontend:** React 19 + Vite — component-based chat UI with glassmorphism dark theme
- **AI:** Claude API (`claude-sonnet-4-6`) via structured JSON output — no SDK, raw fetch
- **Backend:** Vercel serverless function (`api/chat.js`) proxies the API key; Express local dev server
- **Storage:** `localStorage` for bookmarks and conversation history
- **Rate limiting:** In-memory Map, 10 req/min per IP

---

## Resume blurb

> Designed and built a full-stack AI chat tool that helps students navigate 28+ real programs and discounts (financial aid, healthcare, GitHub/Adobe/Spotify deals, and more) through plain-English conversation, keeping the API key secure via a serverless backend proxy.

---

## Local setup

```bash
# 1. Clone
git clone https://github.com/HussamAhmad4/community-resource-navigator.git
cd community-resource-navigator

# 2. Install
npm install

# 3. Set your API key
cp .env.example .env
# → Edit .env and set ANTHROPIC_API_KEY=sk-ant-...

# 4. Run (frontend + backend in parallel)
npm run dev:all
# Frontend: http://localhost:5173
# API:      http://localhost:8787
```

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
# Set ANTHROPIC_API_KEY in Vercel dashboard → Project → Settings → Environment Variables
```

---

## Project structure

```
├── api/
│   └── chat.js            # Vercel serverless function (API proxy + rate limiter)
├── server/
│   └── index.js           # Express dev server
├── lib/
│   ├── chatHandler.js     # Claude API caller + JSON parser
│   ├── systemPrompts.js   # Three mode-specific system prompts
│   └── resourcesHelper.js # Resource ID → object lookup
├── src/
│   ├── data/
│   │   ├── resources.js   # 28 real US programs
│   │   └── featuredDeals.js
│   ├── hooks/
│   │   ├── useChat.js
│   │   └── useBookmarks.js
│   └── components/        # Chat UI, cards, filters, bookmarks panel
└── .env.example
```

---

## Security note

The Anthropic API key is **never** exposed to the browser. All Claude requests are proxied through the serverless function / Express server. The `.env` file is gitignored.
