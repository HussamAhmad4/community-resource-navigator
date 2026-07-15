# Community Resource Navigator

**AI-powered student toolkit** — find deals, campus programs, CUNY opportunities, internships, scholarships, and public benefits through plain-English conversation.

**Live demo:** _coming soon_ · Built with React 19, Vite, and the Claude API.

## What it does

**💰 Benefit Checkup** — answer 8 questions, get an estimated dollar amount of benefits you may be missing (Pell, TAP, Excelsior, SNAP, Fair Fares, and more), each with an official link. Powered by a deterministic rules engine — the AI never decides eligibility, so results are grounded and testable (`npm run test:checkup`).

Plus five AI-powered chat tools:

| Tool | What it finds |
|------|--------------|
| 🛍️ **Deal Finder** | Student discounts at Best Buy, Apple, Adobe, Spotify, GitHub, Amazon, and more — filterable by category |
| 🎓 **Campus Finder** | Tutoring, scholarships, food pantries, career services, and clubs at your specific school |
| 🏫 **CUNY Guide** | ASAP, SEEK, TAP, Excelsior, Single Stop, CUNY Start, Reconnect, and programs across all CUNY campuses |
| 🚀 **Student Opportunities** | Paid internships, research programs (NSF REU, NIH), fellowships, scholarships, AmeriCorps, SYEP |
| 🧭 **Resource Guide** | FAFSA, SNAP, Medicaid, PSLF, mental health lines, legal aid — 40+ real programs |

Ask anything in plain English. The AI returns structured, actionable results with direct links and student pricing.

## How it works

- **Frontend:** React 19 + Vite — component-based chat UI with a glassmorphism dark theme
- **AI:** Claude API with structured JSON output — raw `fetch`, no SDK
- **Grounding:** Recommendations are anchored to a curated catalog of 40+ verified programs, so links are real rather than hallucinated
- **Eligibility engine:** Benefit Checkup matches answers against rules-as-data (`src/checkup/rules.js`) with a pure, unit-tested evaluator — deterministic dollars, AI only for follow-up questions
- **Backend:** Vercel serverless function (`api/chat.js`) proxies the API key; Express server mirrors it for local dev
- **Rate limiting:** In-memory, 10 requests/min per IP
- **Storage:** `localStorage` for bookmarks; no accounts, no data leaves the browser

## Local setup

```bash
git clone https://github.com/HussamAhmad4/community-resource-navigator.git
cd community-resource-navigator
npm install

cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY=sk-ant-...

npm run dev:all
# Frontend: http://localhost:5173
# API:      http://localhost:8787
```

## Deploy (Vercel)

```bash
npm install -g vercel
vercel
```

Then set `ANTHROPIC_API_KEY` in the Vercel dashboard → Project → Settings → Environment Variables. The chat backend runs as a serverless function, so the API key is never exposed to the browser.

> **Note:** the GitHub Pages workflow deploys the static frontend only — chat requires the Vercel deployment (Pages has no backend for `/api/chat`).

## Project structure

```
├── api/chat.js              # Vercel serverless function (API proxy + rate limiter)
├── server/index.js          # Express dev server (mirrors api/chat.js)
├── lib/
│   ├── chatHandler.js       # Claude API caller + JSON output parser (5 modes)
│   ├── systemPrompts.js     # Mode-specific system prompts
│   └── resourcesHelper.js   # Resource ID → object lookup
├── src/
│   ├── data/
│   │   ├── resources.js     # Curated catalog: 40+ verified programs
│   │   └── featuredDeals.js # Featured deals + CUNY schools directory
│   ├── checkup/             # Eligibility engine: rules-as-data + pure evaluator
│   ├── hooks/               # useChat, useBookmarks
│   └── components/          # Chat UI, result cards, filters, bookmarks
└── .env.example
```

## Security

The Anthropic API key never reaches the browser: all Claude requests are proxied through the serverless function or Express server, `.env` is gitignored, and the API validates mode and message size before forwarding.

## License

MIT
