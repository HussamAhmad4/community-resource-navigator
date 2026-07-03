import { useCallback, useEffect, useRef, useState } from 'react'

const WELCOME = {
  resources: "Hey, I'm Navi! I help students find benefits, financial aid, food assistance, health coverage, and more. What's going on?",
  deals: "Hey! I'm Navi, your student deal finder 🛍️ Tell me what you're looking for — like \"I need a laptop for college under $700\" — and I'll find you the best options with student discounts.",
  campus: "Hey! I'm Navi, your campus guide 🎓 Tell me what school you go to and what you're looking for — tutoring, scholarships, clubs, career programs, food pantries, anything.",
}

let idCounter = 0
const nextId = () => `msg-${Date.now()}-${idCounter++}`
const makeWelcome = (mode) => ({ id: 'welcome', role: 'assistant', content: WELCOME[mode] || WELCOME.resources, resources: [], products: [], programs: [] })

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
