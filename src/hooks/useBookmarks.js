import { useCallback, useEffect, useState } from 'react'

const KEY = 'navi_bookmarks'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(bookmarks)) } catch {}
  }, [bookmarks])

  const add = useCallback((type, data) => {
    const id = `${type}-${data.id || data.name}-${Date.now()}`
    setBookmarks((prev) => [{ id, type, data, savedAt: Date.now() }, ...prev])
  }, [])

  const remove = useCallback((id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const isBookmarked = useCallback(
    (name) => bookmarks.some((b) => b.data?.name === name || b.data?.id === name),
    [bookmarks]
  )

  return { bookmarks, add, remove, isBookmarked }
}
