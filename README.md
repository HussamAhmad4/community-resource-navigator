# Community Resource Navigator

**AI-powered student toolkit** — Find deals, campus programs, CUNY opportunities, student internships/scholarships, and public benefits through plain-English conversation.

## What it does

Five AI-powered tools for college students and young adults:

| Tool | What it finds |
|------|--------------|
| 🛍️ **Deal Finder** | Student discounts at Best Buy, Apple, Adobe, Spotify, GitHub, Amazon, Canva, Figma, NordVPN, Chegg, and 10+ more — filterable by category |
| 🎓 **Campus Finder** | Tutoring, scholarships, food pantries, career services, clubs at your specific school |
| 🏫 **CUNY Guide** | ASAP, SEEK, TAP, Excelsior, Single Stop, CUNY Start, Reconnect & all 18 CUNY campus programs |
| 🚀 **Student Opportunities** | Paid internships, research programs (NSF REU, NIH), fellowships, scholarships, AmeriCorps, SYEP |
| 🧭 **Resource Guide** | FAFSA, SNAP, Medicaid, PSLF, mental health lines, legal aid — 40+ real programs |

Ask anything in plain English. The AI returns structured, actionable results with direct links and student pricing.

## New in v2

- **CUNY Guide mode** — Deep knowledge of all 18+ CUNY schools, ASAP, SEEK, Single Stop, TAP, Excelsior Scholarship, Macaulay Honors, CUNY libraries, CUNYfirst, and more
- - **Student Opportunities mode** — Paid internships, research (NSF REU, NIH, NASA), fellowships (Fulbright, Watson, Rhodes), AmeriCorps, SYEP, tech programs (Google STEP, Microsoft Explore), and more
  - - **Deal category filter** — Filter featured deals by Free / CUNY / price tag
    - - **CUNY school browser** — Browse and link to all 18 CUNY campuses directly from the home screen
      - - **Expanded resource catalog** — Added NY TAP, Excelsior Scholarship, Federal Work-Study, Handshake, GitHub Student Pack, AmeriCorps, NSF REU, and more
        - - **12+ new student deals** — Microsoft 365, Canva Pro, Figma, NordVPN, Chegg, Apple Music, LastPass
          - - **Increased AI response depth** — MAX_TOKENS bumped to 2048 for richer, more detailed results
           
            - ## Demo
           
            - **CUNY Guide** — "I go to BMCC, what free programs can help me afford school?"
           
            - **Student Opportunities** — "I'm a sophomore computer science student looking for a summer internship"
           
            - **Deal Finder** — "What student discounts does Adobe offer?"
           
            - **Campus Finder** — "I go to CSI CUNY — what tutoring is available?"
           
            - **Resource Guide** — "I can't afford food this week."
           
            - ## Stack
           
            - - **Frontend:** React 19 + Vite — component-based chat UI with glassmorphism dark theme
              - - **AI:** Claude API (`claude-sonnet-4-6`) via structured JSON output — no SDK, raw fetch
                - - **Backend:** Vercel serverless function (`api/chat.js`) proxies the API key; Express local dev server
                  - - **Storage:** `localStorage` for bookmarks and conversation history
                    - - **Rate limiting:** In-memory Map, 10 req/min per IP
                     
                      - ## CUNY Resources Covered
                     
                      - | Program | Who it's for |
                      - |---------|-------------|
                      - | CUNY ASAP | Community college students — free tuition gap, MetroCard, textbooks |
                      - | CUNY SEEK / College Discovery | Income-eligible students — tutoring, counseling, financial supplements |
                      - | CUNY Start | Students who need developmental math/English — free, no financial aid used |
                      - | CUNY Reconnect | Adults 24+ returning to complete their degree |
                      - | CUNY Single Stop | All CUNY students — benefits access, legal aid, financial counseling, tax prep |
                      - | CUNY Transfer Explorer | Students transferring between CUNY campuses |
                      - | NY TAP Grant | NY residents — up to $5,665/year in free grant money |
                      - | Excelsior Scholarship | NY residents under $125k household income — free tuition at CUNY/SUNY |
                      - | Macaulay Honors College | High-achieving students — full tuition + laptop + $7,500 fund |
                      - | CUNY Counseling Centers | All students — free/low-cost mental health on every campus |
                      - | CUNY Career Services | All students — internships, jobs, resume help, Handshake |
                      - | CUNY Food Pantries | All students — free groceries on every campus |
                     
                      - ## Resume blurb
                     
                      - Designed and built a full-stack AI chat tool (5 modes) helping CUNY and college students navigate 40+ real programs, student discounts, internships, research opportunities, and public benefits through plain-English conversation — securing the API key via a serverless backend proxy and keeping all data client-side with localStorage.
                     
                      - ## Local setup
                     
                      - ```bash
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
                        # API: http://localhost:8787
                        ```

                        ## Deploy to Vercel

                        ```bash
                        npm install -g vercel
                        vercel
                        # Set ANTHROPIC_API_KEY in Vercel dashboard → Project → Settings → Environment Variables
                        ```

                        ## Project structure

                        ```
                        ├── api/
                        │   └── chat.js              # Vercel serverless function (API proxy + rate limiter)
                        ├── server/
                        │   └── index.js             # Express dev server
                        ├── lib/
                        │   ├── chatHandler.js       # Claude API caller + JSON parser — now supports 5 modes
                        │   ├── systemPrompts.js     # Five mode-specific system prompts (resources, deals, campus, cuny, opportunities)
                        │   └── resourcesHelper.js   # Resource ID → object lookup
                        ├── src/
                        │   ├── data/
                        │   │   ├── resources.js     # 40+ real US programs (+ CUNY Programs + Student Opportunities categories)
                        │   │   └── featuredDeals.js # Featured deals + CUNY_SCHOOLS directory
                        │   ├── hooks/
                        │   │   ├── useChat.js
                        │   │   └── useBookmarks.js
                        │   └── components/          # Chat UI, cards, filters, bookmarks panel, tool selector
                        └── .env.example
                        ```

                        ## Security note

                        The Anthropic API key is never exposed to the browser. All Claude requests are proxied through the serverless function / Express server. The `.env` file is gitignored.
