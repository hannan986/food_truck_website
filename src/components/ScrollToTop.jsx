import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't reset scroll position on navigation by default, so
// clicking a nav tab (About, Menu, etc.) would land wherever the previous
// page had been scrolled to. Force it back to the top on every route change
// — unless the new URL carries a #section hash (e.g. /menu#bowls), in which
// case the destination page's own hash-scroll logic handles it instead.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
