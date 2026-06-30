# Community Resource Navigator

A full-stack AI chat tool that helps students navigate 28+ real programs and discounts (financial aid, healthcare, GitHub/Adobe/Spotify deals, and more) through plain-English conversation, keeping the API key secure via a serverless backend proxy.

**Stack:** React + Vite (frontend), Node/Express + Vercel serverless (backend), Claude API (conversation).

## How it works

1. The user describes their situation in plain English (e.g. *"I can't afford food this week"* or *"I just turned 26 and lost my insurance"*).
2. The request goes to `/api/chat` — a backend endpoint that keeps the Anthropic API key server-side only. It never touches the browser.
3. The backend calls Claude with a system prompt that includes a curated catalog of real programs (`src/data/resources.js`) and instructs it to respond like a knowledgeable, non-judgmental friend — asking one clarifying question at a time when needed, then recommending the most relevant programs by ID.
4. The frontend renders Claude's reply as a chat bubble and displays matched programs as resource cards with a description, who it's for, and a direct link or phone number to apply.

```
React UI  →  /api/chat  →  Claude API
                  ↓
     src/data/resources.js (resource catalog)
```

## What's in the resource catalog

28 real programs and resources across 8 categories:

- **Financial Aid** — FAFSA, Pell Grant, emergency student aid
- **Student Loan Help** — Income-Driven Repayment, PSLF
- **Food Assistance** — campus pantries, SNAP (student rules), Feeding America, WIC
- **Health Coverage** — Medicaid, healthcare.gov marketplace
- **Mental Health** — 988 Lifeline, Crisis Text Line, NAMI HelpLine
- **Student Discounts** — GitHub Student Pack, Microsoft 365 (free), Adobe CC, UNiDAYS, Amazon Prime Student, Spotify+Hulu
- **Money & Taxes** — free VITA tax prep, EITC, Unemployment Insurance
- **Jobs, Housing & More** — Job Corps, free legal aid, 211 Helpline, youth housing programs, Lifeline phone/internet discount

## Project structure

```
src/
  components/      Chat UI: header, message bubbles, resource cards, input, footer
  hooks/useChat.js  Chat state + fetch to /api/chat
  data/resources.js Curated catalog of programs (Claude's knowledge base)
  App.jsx, main.jsx React entry points
lib/
  chatHandler.js    Calls Claude API, parses structured JSON response
  systemPrompt.js   Builds system prompt + embeds resource catalog
api/chat.js         Vercel serverless function (production)
server/index.js     Express server for local development
```

`api/chat.js` and `server/index.js` both import the same `lib/chatHandler.js` — the logic lives in one place.

## Getting started

### 1. Install

```bash
npm install
```

### 2. Add your Anthropic API key

```bash
cp .env.example .env
```

Edit `.env` and paste your key from [console.anthropic.com](https://console.anthropic.com/settings/keys). Never commit this file.

### 3. Run locally

```bash
npm run dev:all
```

Starts both the Vite frontend and the Express API server. The frontend proxies `/api/*` to the backend automatically. Open the URL Vite prints (usually `http://localhost:5173`).

## Deploy to Vercel (free)

1. Push this repo to GitHub.
2. Import it at [vercel.com](https://vercel.com).
3. Add `ANTHROPIC_API_KEY` in the project's Environment Variables.
4. Deploy. Vercel auto-builds the Vite frontend and promotes `api/chat.js` to a serverless function.

## Notes

- Program data is accurate as of 2025 but rules and links change. The app always tells users to verify with the official source.
- This is informational only — not legal, financial, or medical advice.

## License

MIT — see [LICENSE](LICENSE).
