import { Link } from 'react-router-dom'
import { Reveal } from '../components/useReveal'
import './Home.css'

const IMG = (name) => new URL(`../assets/images/${name}`, import.meta.url).href

const CATEGORIES = [
  { to: '/menu#steak',   emoji: '🥩', label: 'Steak & Cheese', img: 'combo_sub.avif' },
  { to: '/menu#burgers', emoji: '🍔', label: 'Burgers',         img: 'cheese_burger_sub.avif' },
  { to: '/menu#wraps',   emoji: '🌯', label: 'Wraps',           img: 'Fried_Chicken_Wrap.jpg' },
  { to: '/menu#bowls',   emoji: '🍚', label: 'Bowls',           img: 'lamb_over_rice.jpg' },
  { to: '/menu#sides',   emoji: '🍟', label: 'Fries & Sides',   img: 'French_Fries.jpg' },
  { to: '/byob',         emoji: '🥔', label: 'BYOB',            img: 'Large_Chip_Bag.jpg' },
]

const WHY = [
  { icon: '⚡', title: 'Blazing Fast', desc: 'Fresh to order in minutes. We move fast without ever cutting corners on quality.' },
  { icon: '🌿', title: '100% Halal', desc: 'Every item on our menu is fully halal certified. No compromises, ever.' },
  { icon: '🔥', title: 'Bold Flavors', desc: 'Made with real spices and real care. Every bite is crafted to satisfy.' },
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero-section">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="ember" style={{ left: `${10 + i * 11}%`, animationDuration: `${3.5 + i * 0.5}s`, animationDelay: `${i * 0.4}s` }} />
        ))}
        <div className="container hero-inner">
          <div className="hero-text">
            <div className="hero-kicker">
              <span className="hero-kicker-dot" />
              <span>HALAL · FRESH · BOLD</span>
            </div>
            <h1 className="hero-h1">
              <span>FAST.</span>
              <span>FRESH.</span>
              <span className="hero-h1-gold">FLAVORFUL.</span>
            </h1>
            <p className="hero-sub">Bold halal flavors made fresh to order, every single time. Always quality. Always fast.</p>
            <div className="hero-btns">
              <Link to="/menu" className="btn btn-gold btn-lg">EXPLORE MENU →</Link>
              <Link to="/order" className="btn btn-red btn-lg">ORDER NOW →</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-plate">
              <img src="images/menu_images/lamb_over_rice.jpg" alt="Lamb Over Rice" className="hero-plate-img" onError={e => e.target.style.display='none'} />
              <div className="hero-plate-glow" />
              <div className="hero-ring" />
              <span className="hero-plate-label">Lamb Over Rice</span>
            </div>
          </div>
        </div>
        <div className="hero-flame" aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hfg" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#C0392B" stopOpacity="1"/>
                <stop offset="55%" stopColor="#e67e22" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#f39c12" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,70 L0,44 Q120,8 240,32 Q360,56 480,22 Q600,0 720,30 Q840,58 960,20 Q1080,0 1200,32 Q1320,58 1440,28 L1440,70 Z" fill="url(#hfg)"/>
          </svg>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="categories-section">
        <div className="cat-grid">
          {CATEGORIES.map((c, i) => (
            <Link to={c.to} key={c.label} className={`cat-card reveal reveal-d${i}`}>
              <img className="cat-bg" src={`images/menu_images/${c.img}`} alt="" onError={e => e.target.style.display='none'} />
              <span className="cat-emoji">{c.emoji}</span>
              <span className="cat-name">{c.label}</span>
              <div className="cat-overlay"><span>VIEW ALL →</span></div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMBO BANNER */}
      <div className="combo-banner">
        <div className="container-wide">
          <div className="combo-inner">
            <div>
              <div className="combo-title">MAKE IT A COMBO</div>
              <div className="combo-desc">Any Main + Regular Fries + Drink — <strong>Only $4.99 extra</strong></div>
            </div>
            <div className="combo-price">$4.99</div>
            <Link to="/order" className="btn btn-outline-white btn-sm">ADD A COMBO →</Link>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <section className="why-section section">
        <div className="container" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="section-title">WHY <span className="gold">TASTE ON WHEELS</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <div className="why-grid">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i}>
                <div className="why-card">
                  <span className="why-icon">{w.icon}</span>
                  <div className="why-title">{w.title}</div>
                  <p className="why-desc">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BYOB TEASER */}
      <section className="byob-section section">
        <div className="container">
          <div className="byob-inner">
            <Reveal className="byob-img-wrap">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM%20%284%29.jpeg" alt="BYOB" onError={e => e.target.style.display='none'} />
            </Reveal>
            <Reveal delay={1} className="byob-text">
              <span className="byob-badge">★ NEW</span>
              <h2 className="byob-title">BRING YOUR OWN<br/><span className="gold">BAG OF CHIPS</span></h2>
              <p className="byob-desc">Bring any bag of chips and we'll fill it with seasoned halal meat, cheese, and all our signature fixings. It's the most unique street food experience you'll find.</p>
              <div className="chip-pills">
                {['DORITOS','LAY\'S','TAKIS','CHEETOS','ANY BRAND'].map(b => <span key={b} className="chip-pill">{b}</span>)}
              </div>
              <Link to="/byob" className="btn btn-gold">LEARN MORE →</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="social-section section">
        <div className="container" style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="eyebrow">Follow the Truck</span>
          <h2 className="section-title">FIND US ON <span className="gold">INSTAGRAM</span></h2>
          <div className="divider divider-center" />
          <p className="social-handle">@tasteonwheels</p>
        </div>
        <div className="container">
          <div className="social-grid">
            {[
              'images/WhatsApp%20Image%202026-06-07%20at%208.55.42%20PM.jpeg',
              'images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM%20%287%29.jpeg',
              'images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM.jpeg',
            ].map((src, i) => (
              <Reveal key={i} delay={i} className="social-img-wrap">
                <div className="social-img">
                  <img src={src} alt="Taste on Wheels" onError={e => e.target.style.display='none'} />
                  <div className="social-ov">📷</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="#" className="btn btn-outline-gold">FOLLOW ON INSTAGRAM 📷</a>
          </div>
        </div>
      </section>
    </main>
  )
}
