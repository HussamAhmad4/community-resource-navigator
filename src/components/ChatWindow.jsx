import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'

const STARTERS = {
  deals: [
    "What student discounts does Best Buy offer?",
    "What free or discounted software can I get as a student?",
    "What subscriptions have student pricing?",
    "What tech discounts should every college student know about?",
  ],
  campus: [
    "I go to CSI CUNY — what tutoring is available?",
    "Are there scholarships specific to my campus?",
    "How do I find internships through my school?",
    "Does my campus have a food pantry?",
  ],
  cuny: [
    "I go to CSI \u2014 am I eligible for ASAP or SEEK?",
    "How do I apply for TAP and the Excelsior Scholarship?",
    "What is Single Stop and what can it do for me?",
    "Does my CUNY campus have a food pantry?",
  ],
  opportunities: [
    "I'm a junior CS major looking for a paid summer internship.",
    "What research programs pay undergrads?",
    "What scholarships can I still apply for this year?",
    "What tech programs help underrepresented students break in?",
  ],
  resources: [
    "I can't afford food this week.",
    "I need help paying for college or managing my loans.",
    "I just turned 26 and lost my health insurance.",
    "I'm stressed and need mental health support.",
  ],
}

export default function ChatWindow({ messages, isLoading, error, onSend, mode, bookmarkHandlers }) {
  const scrollRef = useRef(null)
  const showStarters = messages.length === 1
  const starters = STARTERS[mode] || STARTERS.resources

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="chat-window" ref={scrollRef}>
      <div className="chat-window__messages">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} bookmarkHandlers={bookmarkHandlers} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className="message message--assistant">
            <div className="message__avatar" aria-hidden="true">!</div>
            <div className="bubble bubble--error">{error}</div>
          </div>
        )}
        {showStarters && !isLoading && (
          <div className="starter-prompts">
            {starters.map((prompt) => (
              <button key={prompt} type="button" className="starter-chip" onClick={() => onSend(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
