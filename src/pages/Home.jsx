import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/useReveal'
import './Home.css'
import Footer from '../components/Footer'

const CLOVER_URL = 'https://www.clover.com/online-ordering/taste-on-wheels'

const CATEGORIES = [
  { to: '/menu#bowls',   label: 'Bowls',           img: 'combo_over_rice.avif' },
  { to: '/menu#wraps',   label: 'Wraps',           img: 'Fried Chicken Wrap.jpg' },
  { to: '/menu#burgers', label: 'Burgers',         img: 'double_cheese_burger.jpeg' },
  { to: '/menu#steak',   label: 'Steak & Cheese', img: 'supreme_steak_and_chease.jpeg' },
  { to: '/menu#chicken', label: 'Chicken',         img: '8_pieces_wings.jpg' },
  { to: '/menu#snacks',  label: 'Snacks',          img: 'hot_dog_01.png' },
  { to: '/byob',         label: 'BYOB',            img: 'dorritos_loaded.png' },
  { to: '/menu#sides',   label: 'Fries & Sides',   img: 'French Fries.jpg' },
]

const MENU_ITEMS = [
  { name:'Lamb Over Rice',          price:10.99, img:'lam_over_rice.jpg' },
  { name:'Chicken Over Rice',       price: 9.99, img:'chicken_over_rice_01.png' },
  { name:'Lamb & Chicken Over Rice',price:12.99, img:'combo_over_rice.avif' },
  { name:'Chicken Wrap',            price: 9.99, img:'Grilled Chicken Wrap.jpg' },
  { name:'Lamb Wrap',               price:10.99, img:'Steak & Cheese Wrap.jpg' },
  { name:'Hamburger',               price: 4.99, img:'hamburger.jpeg' },
  { name:'Cheeseburger',            price: 5.99, img:'cheese_burger.jpeg' },
  { name:'Double Cheeseburger',     price: 6.99, img:'double_cheese_burger.jpeg' },
  { name:'Original Steak & Cheese', price: 9.99, img:'original_steak_and_chease.jpeg' },
  { name:'Chicken Wings (5pc)',     price:10.99, img:'8_pieces_wings.jpg' },
]

export default function Home() {
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>
      {/* HERO */}
      <section className="hero-section">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="ember" style={{ left: `${10 + i * 11}%`, animationDuration: `${3.5 + i * 0.5}s`, animationDelay: `${i * 0.4}s` }} />
        ))}
        <div className="hero-inner">
          <div className="hero-text">
            <h1 className="hero-h1">
              <span>FAST.</span>
              <span className="hero-h1-red">FRESH.</span>
              <span className="hero-h1-gold">FLAVORFUL.</span>
            </h1>
            <div className="hero-btns">
              <a href={CLOVER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">🛒 ORDER NOW →</a>
              <Link to="/find-us" className="btn btn-red btn-lg">FIND US →</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-plate">
              <img src="images/Food_Truck_Website.jpeg" alt="Taste on Wheels" className="hero-plate-img" onError={e => e.target.style.display='none'} />
              <div className="hero-plate-glow" />
              <div className="hero-ring" />
              <div className="hero-ring-outer" />
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
            <Link to={c.to} key={c.label} className="cat-card">
              <img className="cat-bg" src={`images/menu_images/${c.img}`} alt="" onError={e => e.target.style.display='none'} />
              <span className="cat-name">{c.label}</span>
              <div className="cat-overlay"><span>VIEW ALL →</span></div>
            </Link>
          ))}
        </div>
      </section>

      

      

      {/* BYOB TEASER */}
      <section id="byob" className="byob-section section">
        <div className="container">
          <div className="byob-inner byob-desktop-only">
            <Reveal className="byob-img-wrap">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM%20%284%29.jpeg" alt="BYOB" onError={e => e.target.style.display='none'} />
            </Reveal>
            <Reveal delay={1} className="byob-text">
              <span className="byob-badge">★ NEW</span>
              <h2 className="byob-title">BRING YOUR OWN<br/><span className="gold">BAG OF CHIPS</span></h2>
              <p className="byob-desc">Bring any bag of chips and we'll fill it with seasoned meat, cheese, and all our signature fixings. It's the most unique street food experience you'll find.</p>
              <div className="chip-pills">
                {['DORITOS','LAY\'S','TAKIS','CHEETOS','ANY BRAND'].map(b => <span key={b} className="chip-pill">{b}</span>)}
              </div>
              <Link to="/byob" className="btn btn-gold">LEARN MORE →</Link>
            </Reveal>
          </div>

          <Reveal className="byob-single byob-mobile-only">
            <Link to="/byob" className="byob-single-link">
              <img src="images/bring-your-own-bag-of-chips-01-transparent.png" alt="Introducing Bring Your Own Bag of Chips" className="byob-single-img" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* MENU ITEMS */}
      <section className="home-menu-section section" style={{ background:'var(--black)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:36 }}>
          <h2 className="section-title home-menu-title" style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 0.95 }}>
  OUR <span className="red">MENU</span>
</h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <div className="hm-item-list">
            {MENU_ITEMS.map((item, i) => (
              <Reveal key={item.name} delay={i % 3} className="hm-item-wrap">
                <div className="hm-item-card">
                  <div className="hm-item-img">
                    <img src={`images/menu_images/${item.img}`} alt={item.name} onError={e => e.target.style.opacity='0'} />
                  </div>
                  <div className="hm-item-name">{item.name}</div>
                  <div className="hm-item-footer">
                    <span className="hm-item-price">${item.price.toFixed(2)}</span>
                    <a href={CLOVER_URL} target="_blank" rel="noopener noreferrer" className="hm-order-btn">ORDER →</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:28 }}>
            <a href="#/menu" target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold">VIEW FULL MENU →</a>
          </div>
        </div>
      </section>
      <Footer />

      {/* STICKY ORDER BAR */}
      <div className={`home-order-bar${showBar ? ' visible' : ''}`}>
        <div className="home-ob-left">
          <span className="home-ob-icon">🍽️</span>
          <div>
            <div className="home-ob-title">Ready to order?</div>
            <div className="home-ob-sub">Order online via Clover — fast & easy</div>
          </div>
        </div>
        <a href={CLOVER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold home-ob-btn">
          ORDER NOW →
        </a>
      </div>
    </main>
  )
}
