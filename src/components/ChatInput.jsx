import { useState } from 'react'

const PLACEHOLDERS = {
  deals: 'e.g. "I need a laptop for college under $700"',
  campus: 'e.g. "I go to CSI CUNY — are there tutoring programs?"',
  resources: 'e.g. "I need help affording groceries this week"',
}

export default function ChatInput({ onSend, isLoading, mode }) {
  const [value, setValue] = useState('')
  const submit = () => { if (!value.trim() || isLoading) return; onSend(value); setValue('') }
  return (
    <form className="chat-input" onSubmit={(e) => { e.preventDefault(); submit() }}>
      <label htmlFor="chat-message" className="sr-only">Type your message</label>
      <textarea
        id="chat-message" rows={1}
        placeholder={PLACEHOLDERS[mode] || PLACEHOLDERS.resources}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
        disabled={isLoading}
      />
      <button type="submit" className="btn btn--primary" disabled={isLoading || !value.trim()}>Send</button>
    </form>
  )
}
