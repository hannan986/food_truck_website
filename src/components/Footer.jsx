import { Link } from 'react-router-dom'
import './Footer.css'

const Logo = () => (
  <div className="footer-logo-inner">
    <svg className="footer-hex" viewBox="0 0 38 44" fill="none">
      <path d="M19 0L38 10.97V33.03L19 44L0 33.03V10.97L19 0Z" fill="#F5C107"/>
      <path d="M19 5L33.5 13.5V30.5L19 39L4.5 30.5V13.5L19 5Z" fill="#111111"/>
      <text x="19" y="28" textAnchor="middle" fill="#F5C107" fontFamily="Impact,sans-serif" fontSize="17">T</text>
    </svg>
    <div>
      <div className="footer-logo-taste">TASTE</div>
      <div className="footer-logo-sub">ON WHEELS</div>
    </div>
  </div>
)

export default function Footer() {
  return (
    <>
      <div className="flame-strip" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fg" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#C0392B" stopOpacity="1"/>
              <stop offset="100%" stopColor="#C0392B" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,60 L0,36 Q180,4 360,28 Q540,50 720,20 Q900,0 1080,30 Q1260,54 1440,22 L1440,60 Z" fill="url(#fg)" opacity="0.9"/>
        </svg>
      </div>
      <footer className="footer">
        <div className="container-wide">
          <div className="footer-grid">
            <div className="footer-brand">
              <Logo />
              <p className="footer-tagline">Fast · Fresh · Flavorful<br/>Made Fresh. Made to Satisfy.</p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="TikTok">🎵</a>
              </div>
            </div>
            <div>
              <span className="footer-col-title">Quick Links</span>
              <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/order">Order Online</Link>
                <Link to="/byob">BYOB</Link>
                <Link to="/find-us">Find Us</Link>
                <Link to="/about">About</Link>
              </div>
            </div>
            <div>
              <span className="footer-col-title">Hours</span>
              <div className="footer-hours">
                <div className="footer-hour-row"><strong>Mon – Fri</strong><span>11:00 AM – 9:00 PM</span></div>
                <div className="footer-hour-row"><strong>Sat – Sun</strong><span>10:00 AM – 10:00 PM</span></div>
              </div>
            </div>
            <div>
              <span className="footer-col-title">Contact</span>
              <div className="footer-contact-item"><span>📍</span><span>Check Instagram for today's spot!</span></div>
              <div className="footer-contact-item"><span>📞</span><a href="tel:+10000000000">[YOUR PHONE]</a></div>
              <div className="footer-contact-item"><span>✉</span><a href="mailto:hello@tasteonwheels.com">hello@tasteonwheels.com</a></div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2025 Taste on Wheels. All Rights Reserved.</p>
            <div className="footer-payment">
              <span className="payment-label">We Accept:</span>
              {['VISA','MASTERCARD','APPLE PAY','CASH'].map(p => <span key={p} className="payment-item">{p}</span>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
