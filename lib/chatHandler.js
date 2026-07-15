import { buildResourcesPrompt, buildDealFinderPrompt, buildCampusFinderPrompt, buildCunyPrompt, buildStudentOpportunitiesPrompt } from './systemPrompts.js'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'
const DEFAULT_MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 2048

function getSystemPrompt(mode) {
    if (mode === 'deals') return buildDealFinderPrompt()
    if (mode === 'campus') return buildCampusFinderPrompt()
    if (mode === 'cuny') return buildCunyPrompt()
  if (mode === 'opportunities') return buildStudentOpportunitiesPrompt()
    return buildResourcesPrompt()
}

export async function getChatResponse(messages, mode = 'resources') {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('Missing ANTHROPIC_API_KEY. Add it to your .env file.')

  const model = process.env.CLAUDE_MODEL || DEFAULT_MODEL
  const systemPrompt = getSystemPrompt(mode)

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model, max_tokens: MAX_TOKENS, system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  })

  if (!response.ok) {
    const err = await response.text().catch(() => '')
    throw new Error(`Claude API error (${response.status}): ${err || response.statusText}`)
  }

  const data = await response.json()
  const textBlock = Array.isArray(data.content) ? data.content.find((b) => b.type === 'text') : null
  const rawText = textBlock?.text?.trim() || ''
  return parseOutput(rawText, mode)
}

function parseOutput(rawText, mode) {
  // Try the whole text first, then try to extract a JSON block from anywhere in the output
  const candidates = [
    rawText.replace(/^```(json)?\s*/i, '').replace(/\s*```$/, '').trim(),
    (() => { const m = rawText.match(/\{[\s\S]*\}/); return m ? m[0] : null })(),
  ].filter(Boolean)

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate)
      if (typeof parsed !== 'object' || !parsed.reply) continue
      const base = {
        reply: typeof parsed.reply === 'string' ? parsed.reply : rawText || "Sorry, I had trouble responding. Try again?",
        followUp: typeof parsed.followUp === 'string' ? parsed.followUp : null,
      }
      if (mode === 'deals') return { ...base, products: Array.isArray(parsed.products) ? parsed.products : [] }
      if (mode === 'campus') return { ...base, programs: Array.isArray(parsed.programs) ? parsed.programs : [] }
      return { ...base, resourceIds: Array.isArray(parsed.resourceIds) ? parsed.resourceIds : [] }
    } catch { /* try next */ }
  }
  return { reply: rawText || "Sorry, I had trouble responding. Try again?", resourceIds: [], products: [], programs: [], followUp: null }
}

export { lookupResources } from './resourcesHelper.js'
