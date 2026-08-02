import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Logo = () => (
  <div className="nav-logo-inner">
    <svg className="hex-logo" viewBox="0 0 38 44" fill="none">
      <path d="M19 0L38 10.97V33.03L19 44L0 33.03V10.97L19 0Z" fill="#e3bc32"/>
      <path d="M19 5L33.5 13.5V30.5L19 39L4.5 30.5V13.5L19 5Z" fill="#111111"/>
      <text x="19" y="28" textAnchor="middle" fill="#e3bc32" fontFamily="Impact,sans-serif" fontSize="17">T</text>
    </svg>
    <div className="nav-logo-text">
      <span className="nav-logo-taste">TASTE</span>
      <span className="nav-logo-sub">ON WHEELS</span>
    </div>
  </div>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) { setActiveSection('home'); return }

    const update = () => {
      const offset = window.scrollY + window.innerHeight * 0.35
      const byobEl = document.getElementById('byob')
      if (byobEl && offset >= byobEl.offsetTop) {
        setActiveSection('byob')
      } else {
        setActiveSection('home')
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [isHome, location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleByob = (e) => {
    e.preventDefault()
    setOpen(false)
    if (isHome) {
      document.getElementById('byob')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/byob')
    }
  }

  const links = [
    { label: 'Home',    type: 'route',    to: '/' },
    { label: 'Menu',    type: 'external', href: '#/menu' },
    { label: 'BYOB',    type: 'scroll',   sectionId: 'byob' },
    { label: 'Find Us', type: 'route',    to: '/find-us' },
    { label: 'About',   type: 'route',    to: '/about' },
  ]

  const linkClass = (link) => {
    if (link.type === 'external') return ''
    if (link.type === 'scroll') return isHome && activeSection === 'byob' ? 'active' : ''
    if (link.to === '/') return isHome && activeSection !== 'byob' ? 'active' : ''
    return location.pathname === link.to ? 'active' : ''
  }

  const renderLink = (link, mobileClose = false) => {
    const close = () => mobileClose && setOpen(false)
    if (link.type === 'external') {
      return (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" onClick={close}>
          {link.label}
        </a>
      )
    }
    if (link.type === 'scroll') {
      return (
        <a key={link.label} href="#byob" className={linkClass(link)} onClick={handleByob}>
          {link.label}
        </a>
      )
    }
    return (
      <NavLink key={link.label} to={link.to} end={link.to === '/'} onClick={close}
        className={() => linkClass(link)}>
        {link.label}
      </NavLink>
    )
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner container-wide">
          <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}><Logo /></NavLink>

          <ul className="nav-links">
            {links.map(l => <li key={l.label}>{renderLink(l)}</li>)}
          </ul>

          <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay${open ? ' open' : ''}`}>
        {links.map(l => renderLink(l, true))}
      </div>
    </>
  )
}
