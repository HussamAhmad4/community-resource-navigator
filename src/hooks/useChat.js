import { useCallback, useEffect, useRef, useState } from 'react'

const WELCOME = {
  resources: "Hey, I'm Sprindl! I help students find benefits, financial aid, food assistance, health coverage, and more. What's going on?",
  deals: "Hey! I'm Sprindl, your student deal finder \u{1F6CD}\u{FE0F} Tell me what you're looking for \u2014 like \"I need a laptop for college under $700\" \u2014 and I'll find you the best options with student discounts.",
  campus: "Hey! I'm Sprindl, your campus guide \u{1F393} Tell me what school you go to and what you're looking for \u2014 tutoring, scholarships, clubs, career programs, food pantries, anything.",
  cuny: "Hey! I'm Sprindl, your CUNY guide \u{1F3EB} Ask me about ASAP, SEEK, TAP, Excelsior, Single Stop, food pantries \u2014 anything at any CUNY campus. Which school do you go to?",
  opportunities: "Hey! I'm Sprindl \u{1F680} I help students find paid internships, research programs, fellowships, and scholarships. Tell me your year and major and I'll point you somewhere real.",
}

let idCounter = 0
const nextId = () => `msg-${Date.now()}-${idCounter++}`
const makeWelcome = (mode) => ({
  id: 'welcome',
  role: 'assistant',
  content: WELCOME[mode] || WELCOME.resources,
  resources: [],
  products: [],
  programs: [],
})

export function useChat(mode = 'resources') {
  const [messages, setMessages] = useState([makeWelcome(mode)])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const historyRef = useRef([])

  useEffect(() => {
    historyRef.current = []
    setMessages([makeWelcome(mode)])
    setError(null)
  }, [mode])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    setError(null)
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', content: trimmed }])
    historyRef.current = [...historyRef.current, { role: 'user', content: trimmed }]
    setIsLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyRef.current, mode }),
      })
      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('The chat service is not available. This demo requires a backend server.')
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Something went wrong.')
      historyRef.current = [...historyRef.current, { role: 'assistant', content: data.reply }]
      setMessages((prev) => [...prev, {
        id: nextId(), role: 'assistant', content: data.reply,
        resources: data.resources || [], products: data.products || [],
        programs: data.programs || [], followUp: data.followUp || null,
      }])
    } catch (err) {
      // Roll back the failed user turn so a retry doesn't send it twice
      historyRef.current = historyRef.current.slice(0, -1)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, mode])

  const reset = useCallback(() => {
    historyRef.current = []
    setMessages([makeWelcome(mode)])
    setError(null)
  }, [mode])

  return { messages, isLoading, error, sendMessage, reset }
}
