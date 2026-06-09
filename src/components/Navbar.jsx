import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Logo = () => (
  <div className="nav-logo-inner">
    <svg className="hex-logo" viewBox="0 0 38 44" fill="none">
      <path d="M19 0L38 10.97V33.03L19 44L0 33.03V10.97L19 0Z" fill="#F5C107"/>
      <path d="M19 5L33.5 13.5V30.5L19 39L4.5 30.5V13.5L19 5Z" fill="#111111"/>
      <text x="19" y="28" textAnchor="middle" fill="#F5C107" fontFamily="Impact,sans-serif" fontSize="17">T</text>
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/order', label: 'Order' },
    { to: '/byob', label: 'BYOB' },
    { to: '/find-us', label: 'Find Us' },
    { to: '/about', label: 'About' },
  ]

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner container-wide">
          <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}><Logo /></NavLink>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <NavLink to="/order" className="btn btn-gold btn-sm nav-order-btn">ORDER NOW</NavLink>
          </div>

          <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay${open ? ' open' : ''}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}
            className={({ isActive }) => isActive ? 'active' : ''}>
            {l.label}
          </NavLink>
        ))}
        <NavLink to="/order" className="btn btn-gold" onClick={() => setOpen(false)}>ORDER NOW</NavLink>
      </div>
    </>
  )
}
