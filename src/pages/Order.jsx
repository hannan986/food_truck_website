import { useState } from 'react'
import Footer from '../components/Footer'
import './Order.css'

// ← paste your Clover link here when you have it
const CLOVER_URL = '#'

const MENU = [
  {
    cat: 'Rice Bowls', icon: '🍚',
    items: [
      { name: 'Lamb Over Rice', price: 10.99 },
      { name: 'Chicken Over Rice', price: 10.99 },
      { name: 'Lamb & Chicken Over Rice', price: 12.99 },
      { name: 'Falafel Over Rice', price: 9.99 },
    ],
  },
  {
    cat: 'Wraps', icon: '🌯',
    items: [
      { name: 'Chicken Gyro Wrap', price: 9.99 },
      { name: 'Lamb Gyro Wrap', price: 9.99 },
      { name: 'Falafel Wrap', price: 8.99 },
      { name: 'Fried Chicken Wrap', price: 9.99 },
    ],
  },
  {
    cat: 'Burgers', icon: '🍔',
    items: [
      { name: 'Hamburger', price: 7.99 },
      { name: 'Cheeseburger', price: 8.99 },
      { name: 'Chicken Sandwich', price: 9.99 },
      { name: 'Double Cheeseburger', price: 11.99 },
    ],
  },
  {
    cat: 'Steak & Cheese', icon: '🥩',
    items: [
      { name: 'Original Steak or Chicken', price: 11.99 },
      { name: 'Supreme Steak or Chicken', price: 13.99 },
    ],
  },
  {
    cat: 'Sides', icon: '🍟',
    items: [
      { name: 'French Fries', price: 3.99 },
      { name: 'Cheese Fries', price: 4.99 },
      { name: 'Chilli Cheese Fries', price: 5.99 },
      { name: 'Fried Pickles', price: 4.99 },
      { name: 'Mozzarella Sticks', price: 4.99 },
    ],
  },
  {
    cat: 'Snacks', icon: '🍗',
    items: [
      { name: 'Chicken Tenders', price: 7.99 },
      { name: 'Chicken Wings', price: 8.99 },
      { name: 'Chicken Nuggets', price: 5.99 },
      { name: 'Hot Dogs', price: 3.99 },
      { name: 'Corn Dogs', price: 3.99 },
      { name: 'Nachos', price: 5.99 },
    ],
  },
]

export default function Order() {
  const [open, setOpen] = useState(false)

  return (
    <main>
      <div className="page-hero">
        <p className="page-hero-eyebrow">Fresh. Fast. Halal.</p>
        <h1 className="page-hero-title">ORDER <span className="gold">ONLINE</span></h1>
        <p className="page-hero-sub">Browse our full menu, then tap the button below to place your order through our secure Clover page.</p>
        <button className="btn btn-gold btn-lg order-hero-btn" onClick={() => setOpen(true)}>
          ORDER NOW →
        </button>
      </div>

      {/* MENU DISPLAY */}
      <section className="order-menu-section">
        <div className="container">
          {MENU.map(cat => (
            <div key={cat.cat} className="order-cat">
              <div className="order-cat-head">
                <span className="order-cat-icon">{cat.icon}</span>
                <span className="order-cat-name">{cat.cat}</span>
              </div>
              <div className="order-items-grid">
                {cat.items.map(item => (
                  <div key={item.name} className="order-item-card">
                    <span className="oi-name">{item.name}</span>
                    <div className="oi-right">
                      <span className="oi-price">${item.price.toFixed(2)}</span>
                      <button className="btn btn-gold btn-sm" onClick={() => setOpen(true)}>
                        ORDER →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STICKY ORDER BAR */}
      <div className="order-sticky-bar">
        <span className="osb-text">Ready to eat? Place your order in seconds.</span>
        <button className="btn btn-gold btn-lg" onClick={() => setOpen(true)}>
          ORDER NOW →
        </button>
      </div>

      <Footer />

      {/* CLOVER MODAL */}
      {open && (
        <div className="clover-overlay" onClick={() => setOpen(false)}>
          <div className="clover-modal" onClick={e => e.stopPropagation()}>
            <button className="clover-close" onClick={() => setOpen(false)}>×</button>
            <div className="clover-icon">🛒</div>
            <h2 className="clover-title">ORDER VIA CLOVER</h2>
            <p className="clover-desc">
              We process all online orders through <strong>Clover</strong> — a secure ordering platform. Click below to go to our Clover page and place your order.
            </p>
            <a
              href={CLOVER_URL}
              className="btn btn-gold btn-lg clover-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GO TO CLOVER →
            </a>
            <p className="clover-note">You'll be taken to our secure Clover ordering page.</p>
            <button className="clover-cancel" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  )
}
