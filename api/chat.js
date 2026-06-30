import { getChatResponse, lookupResources } from '../lib/chatHandler.js'

// In-memory rate limiter: 10 requests per minute per IP
const rateLimits = new Map()
const LIMIT = 10
const WINDOW_MS = 60_000

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimits.get(ip)
  if (!entry || now - entry.start > WINDOW_MS) {
    rateLimits.set(ip, { count: 1, start: now })
    return true
  }
  if (entry.count >= LIMIT) return false
  entry.count++
  return true
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, e] of rateLimits.entries()) {
    if (now - e.start > WINDOW_MS) rateLimits.delete(ip)
  }
}, 5 * 60_000)

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return }

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' }); return
  }

  try {
    const { messages, mode = 'resources' } = req.body ?? {}
    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: '"messages" must be a non-empty array.' }); return
    }
    const result = await getChatResponse(messages, mode)
    res.status(200).json({
      reply:     result.reply,
      followUp:  result.followUp,
      resources: mode === 'resources' ? lookupResources(result.resourceIds) : [],
      products:  result.products  || [],
      programs:  result.programs  || [],
    })
  } catch (error) {
    console.error('chat handler error:', error)
    res.status(500).json({ error: error.message || 'Something went wrong.' })
  }
}
