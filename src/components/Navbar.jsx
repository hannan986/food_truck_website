import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const Logo = () => (
  <img src="images/logo.png" alt="Taste on Wheels" className="nav-logo-img" />
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
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

  const links = [
    { label: 'Home',    type: 'route',    to: '/' },
    { label: 'Menu',    type: 'external', href: '#/menu' },
    { label: 'Find Us', type: 'route',    to: '/find-us' },
    { label: 'About',   type: 'route',    to: '/about' },
  ]

  const linkClass = (link) => {
    if (link.type === 'external') return ''
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
          <div className="nav-left">
            <img src="images/food_truck_logo.png" alt="" className="nav-badge" />
            <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}><Logo /></NavLink>
            <div className="nav-social">
              <a href="https://www.facebook.com/share/1FjrAx5iYa/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="nav-social-link">
                <img src="images/facebook_icon_image.jpeg" alt="" />
              </a>
              <a href="https://www.tiktok.com/@tasteonwheels" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="nav-social-link">
                <img src="images/tiktok_image.jpg" alt="" />
              </a>
            </div>
          </div>

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
