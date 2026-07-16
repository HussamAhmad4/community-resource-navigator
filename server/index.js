import 'dotenv/config'
import express from 'express'
import { getChatResponse, lookupResources } from '../lib/chatHandler.js'

const app = express()
app.use(express.json())

// In-memory rate limiter: 10 req/min per IP
const rateLimits = new Map()
const LIMIT = 10, WINDOW_MS = 60_000
function checkRateLimit(ip) {
  const now = Date.now()
  const e = rateLimits.get(ip)
  if (!e || now - e.start > WINDOW_MS) { rateLimits.set(ip, { count: 1, start: now }); return true }
  if (e.count >= LIMIT) return false
  e.count++; return true
}

app.post('/api/chat', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip || 'unknown'
  if (!checkRateLimit(ip)) return res.status(429).json({ error: 'Too many requests. Please wait a minute.' })
  try {
    const { messages, mode = 'resources', profile = null } = req.body ?? {}
    const VALID_MODES = ['resources', 'deals', 'campus', 'cuny', 'opportunities']
    if (!VALID_MODES.includes(mode)) {
      res.status(400).json({ error: 'Invalid mode.' }); return
    }
    if (Array.isArray(messages) && messages.some((m) => typeof m.content !== 'string' || m.content.length > 4000)) {
      res.status(400).json({ error: 'Messages must be strings under 4000 characters.' }); return
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: '"messages" must be a non-empty array.' })
    }
    const safeProfile = typeof profile === 'string' && profile.length <= 600 ? profile : null
    const result = await getChatResponse(messages, mode, safeProfile)
    res.json({
      reply:     result.reply,
      followUp:  result.followUp,
      resources: mode === 'resources' ? lookupResources(result.resourceIds) : [],
      products:  result.products  || [],
      programs:  result.programs  || [],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message || 'Something went wrong.' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))
const port = process.env.PORT || 8787
app.listen(port, () => console.log(`API running at http://localhost:${port}`))
