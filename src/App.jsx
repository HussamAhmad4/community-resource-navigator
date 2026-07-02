import { useEffect, useState } from 'react'
import ToolSelector from './components/ToolSelector.jsx'
import Header from './components/Header.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import ChatInput from './components/ChatInput.jsx'
import Footer from './components/Footer.jsx'
import BookmarksPanel from './components/BookmarksPanel.jsx'
import { useChat } from './hooks/useChat.js'
import { useBookmarks } from './hooks/useBookmarks.js'

const MODE_TITLES = {
  deals:     'Deal Finder — Community Navi',
  campus:    'Campus Finder — Community Navi',
  resources: 'Resource Guide — Community Navi',
    cuny:          'CUNY Guide — Community Navi',
    opportunities: 'Student Opportunities — Community Navi',
}

export default function App() {
  const [view, setView]               = useState('home')
  const [mode, setMode]               = useState('resources')
  const [bookmarksOpen, setBookmarksOpen] = useState(false)

  const { messages, isLoading, error, sendMessage, reset } = useChat(mode)
  const bm = useBookmarks()

  useEffect(() => {
    document.title = view === 'chat' ? (MODE_TITLES[mode] || 'Community Navi') : 'Community Resource Navigator'
  }, [view, mode])

  const handleSelectTool = (selectedMode) => {
    setMode(selectedMode)
    setView('chat')
  }

  if (view === 'home') {
    return (
      <div className="app-shell app-shell--home">
        <ToolSelector onSelect={handleSelectTool} />
        <Footer minimal />
      </div>
    )
  }

  const bookmarkHandlers = {
    bookmarks: bm.bookmarks,
    add: bm.add,
    remove: bm.remove,
    isBookmarked: bm.isBookmarked,
  }

  return (
    <div className="app-shell">
      <Header
        mode={mode}
        onBack={() => setView('home')}
        onReset={reset}
        hasConversation={messages.length > 1}
        bookmarkCount={bm.bookmarks.length}
        onBookmarksToggle={() => setBookmarksOpen((o) => !o)}
      />
      <main className="chat-panel">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={sendMessage}
          mode={mode}
          bookmarkHandlers={bookmarkHandlers}
        />
        <ChatInput onSend={sendMessage} isLoading={isLoading} mode={mode} />
      </main>
      <Footer />
      {bookmarksOpen && (
        <BookmarksPanel
          bookmarks={bm.bookmarks}
          onRemove={bm.remove}
          onClose={() => setBookmarksOpen(false)}
        />
      )}
    </div>
      )
}
