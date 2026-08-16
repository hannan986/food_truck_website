import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from '../components/useReveal'
import Footer from '../components/Footer'
import './Menu.css'

const CLOVER_URL = 'https://www.doordash.com/store/taste-on-wheels-hagerstown-51037422/116956550/?event_type=autocomplete&pickup=false'

const MENU = {
  bowls: {
    label: 'Bowls', emoji: '🍚', num: '01',
    items: [
      { name: 'Chicken Over Rice',        price:  9.99, desc: 'Juicy marinated chicken over fluffy rice with fresh veggies and signature sauces.', note: '✓ Rice Base', img: 'chicken_over_rice_01.png' },
      { name: 'Lamb Over Rice',           price: 10.99, desc: 'Savory seasoned lamb over fluffy rice with fresh veggies and our signature white and hot sauce.', note: '✓ Rice Base', img: 'lam_over_rice.jpg' },
      { name: 'Lamb & Chicken Over Rice', price: 12.99, desc: 'Best of both worlds — seasoned lamb & chicken over rice with fresh veggies and signature sauces.', note: '✓ Best Seller', img: 'combo_over_rice.avif' },
    ]
  },
  wraps: {
    label: 'Wraps', emoji: '🌯', num: '02',
    items: [
      { name: 'Chicken Wrap',       price:  9.99, desc: 'Marinated chicken, lettuce, tomatoes, onions and signature sauce in warm pita.', note: '✓ Pita', img: 'Grilled Chicken Wrap.jpg' },
      { name: 'Lamb Wrap',          price: 10.99, desc: 'Savory seasoned lamb, lettuce, tomatoes, onions and signature sauce in warm pita.', note: '✓ Pita', img: 'Steak & Cheese Wrap.jpg' },
      { name: 'Fried Chicken Wrap', price:  9.99, desc: 'Crispy fried chicken, lettuce, tomatoes, pickles and signature sauce in warm tortilla.', note: '✓ Tortilla', img: 'Fried Chicken Wrap.jpg' },
    ]
  },
  burgers: {
    label: 'Burgers', emoji: '🍔', num: '03',
    items: [
      { name: 'Hamburger',          price: 4.99, desc: 'Classic juicy beef patty with lettuce, tomato, onion, pickles and signature sauce.', note: '✓ Beef', img: 'hamburger01.png' },
      { name: 'Cheeseburger',       price: 5.99, desc: 'Juicy beef patty with melted cheese, fresh veggies, pickles and signature sauce.', note: '✓ Cheddar', img: 'cheese_burger.jpeg' },
      { name: 'Double Cheeseburger',price: 6.99, desc: 'Double the beef, double the cheese, double the satisfaction — stacked and loaded.', note: '✓ Best Seller', img: 'double_cheese_burger.jpeg' },
      { name: 'Chicken Sandwich',   price: 5.99, desc: 'Grilled or crispy chicken with lettuce, tomato and signature sauce on toasted bun.', note: '✓ Chicken', img: 'Fried_chicken_sub.jpg' },
      { name: 'Veggie Burger',      price: 5.99, desc: 'Flavorful veggie patty with lettuce, tomato, onion and signature sauce.', note: '✓ Vegetarian', img: 'veggie_sub_01.png' },
    ]
  },
  steak: {
    label: 'Steak & Cheese', emoji: '🥩', num: '04',
    items: [
      { name: 'Original Steak & Cheese', price:  9.99, desc: 'Thinly sliced steak on a toasted hoagie with melted cheese and special sauce.', note: '✓ Hoagie Roll', img: 'original_steak_and_chease.jpeg' },
      { name: 'Supreme Steak & Cheese',  price: 11.99, desc: 'Loaded with sautéed peppers, onions, mushrooms, melted cheese and premium sauce.', note: '✓ Loaded', img: 'supreme_steak_and_chease.jpeg' },
    ]
  },
  chicken: {
    label: 'Chicken', emoji: '🍗', num: '05',
    items: [
      { name: 'Chicken Tenders (3pc)',  price:  6.99, desc: 'Golden crispy chicken tenders with choice of dipping sauce.', note: '✓ Fresh', img: 'Chicken Tenders.webp' },
      { name: 'Chicken Tenders (5pc)',  price: 10.99, desc: 'Golden crispy chicken tenders with choice of dipping sauce.', note: '✓ Fresh', img: 'Chicken Tenders.webp' },
      { name: 'Chicken Nuggets (6pc)',  price:  4.99, desc: 'Classic crispy chicken nuggets, crowd pleaser every time.', note: '✓ Fresh', img: 'Chicken Nuggets.jpg' },
      { name: 'Chicken Nuggets (10pc)', price:  6.99, desc: 'Classic crispy chicken nuggets, crowd pleaser every time.', note: '✓ Fresh', img: 'Chicken Nuggets.jpg' },
      { name: 'Chicken Wings (5pc)',    price: 10.99, desc: 'Juicy wings — classic, buffalo or honey garlic.', note: '✓ Fresh', img: '8_pieces_wings.jpg' },
    ]
  },
  byob: {
    label: 'BYOB', emoji: '🥡', num: '06',
    items: [
      { name: 'Bring Your Own Bag of Chips', price: 10.99, desc: "Bring any bag of your favourite chips or buy from us, and we'll fill it with your choice of seasoned meat and all our signature fixings.", note: '✓ Build Your Own', img: 'dorritos_loaded.png' },
    ]
  },
  snacks: {
    label: 'Snacks', emoji: '🌭', num: '07',
    items: [
      { name: 'Hot Dog', price: 1.99, desc: 'Classic hot dog in toasted bun with your choice of toppings.', note: '✓ Fresh', img: 'hot_dog_01.png' },
      { name: 'Nachos',  price: 9.99, desc: 'Loaded tortilla chips with cheese, jalapeños and sour cream.', note: '✓ Vegetarian', img: 'nachos_01.webp' },
    ]
  },
  sides: {
    label: 'Fries & Sides', emoji: '🍟', num: '08',
    items: [
      { name: 'French Fries',       price: 3.99, desc: 'Crispy golden fries, perfectly seasoned.', note: '✓ Vegan', img: 'French Fries.jpg' },
      { name: 'Cheese Fries',       price: 5.99, desc: 'Crispy fries topped with warm melted cheese sauce.', note: '✓ Vegetarian', img: 'cheese_fries.jpeg' },
      { name: 'Chili Cheese Fries', price: 7.99, desc: 'Crispy fries loaded with chili and melted cheese.', note: '✓ Loaded', img: 'chili_cheese_fries.jpeg' },
    ]
  },
  drinks: {
    label: 'Drinks', emoji: '🥤', num: '09',
    items: [
      { name: 'Can Soda',     price: 1.99, desc: 'Ice-cold canned soda — grab your favorite flavor.', note: '✓ Chilled', img: 'can_soda.webp' },
      { name: 'Bottled Soda', price: 2.99, desc: 'Ice-cold bottled soda — grab your favorite flavor.', note: '✓ Chilled', img: 'bottle_soda.jpg' },
    ]
  },
}

const KEYS = Object.keys(MENU)

function ItemCard({ item, delay }) {
  return (
    <Reveal delay={delay} className="item-card-wrap">
      <div className="item-card">
        <div className="item-visual">
          {item.img ? (
            <img src={`${import.meta.env.BASE_URL}images/menu_images/${item.img}`} alt={item.name} onError={e => { e.target.style.opacity='0' }} />
          ) : (
            <span className="item-emoji" aria-hidden="true">{item.emoji}</span>
          )}
        </div>
        <div className="item-body">
          <div className="item-name">{item.name}</div>
        </div>
        <div className="item-footer">
          {item.price != null && <span className="item-price">${item.price.toFixed(2)}</span>}
          {item.link ? (
            <Link to={item.link} className="btn-order-item">VIEW →</Link>
          ) : (
            <a href={CLOVER_URL} target="_blank" rel="noopener noreferrer" className="btn-order-item">
              ORDER →
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default function Menu() {
  const location = useLocation()
  const [active, setActive] = useState(KEYS[0])
  const [showBar, setShowBar] = useState(false)
  const sectionRefs = useRef({})

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash && MENU[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }
  }, [location.hash])

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 120
      setShowBar(window.scrollY > 300)
      for (const key of KEYS) {
        const el = sectionRefs.current[key]
        if (el && el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
          setActive(key)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>
      <div className="page-hero menu-page-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.78) 100%), url(${import.meta.env.BASE_URL}images/Food_Truck_Website.jpeg)` }}>
        <h1 className="page-hero-title">OUR <span style={{ color: 'var(--white)' }}>MENU</span></h1>
        <a href={CLOVER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg menu-hero-order-btn">
          ORDER NOW →
        </a>
      </div>

     

      <div className="menu-tab-bar">
        <div className="menu-tab-inner">
          {KEYS.map(k => (
            <button key={k} className={`tab-btn${active===k?' active':''}`}
              onClick={() => sectionRefs.current[k]?.scrollIntoView({ behavior:'smooth', block:'start' })}>
              <span className="tab-emoji">{MENU[k].emoji}</span> {MENU[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-layout">
        {/* menu body */}
        <div className="menu-body">
          {KEYS.map((key, ki) => (
            <div key={key}>
              <section className="menu-cat" id={key} ref={el => sectionRefs.current[key] = el}>
                <div className="cat-header">
                  <span className="cat-num">No. {MENU[key].num}</span>
                  <h2 className="cat-title">{MENU[key].label.toUpperCase()}</h2>
                  <div className="cat-rule" />
                </div>
                <div className="item-grid">
                  {MENU[key].items.map((item, i) => (
                    <ItemCard key={item.name} item={item} delay={i % 3} />
                  ))}
                </div>
              </section>
              {ki < KEYS.length - 1 && (
                <div className="combo-upsell">
                  MAKE IT A COMBO FOR JUST <strong style={{color:'var(--red)'}}>$4.99</strong>
                  <span className="combo-upsell-sub">REGULAR FRIES + DRINK</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* STICKY ORDER BAR */}
      <div className={`sticky-order-bar${showBar ? ' visible' : ''}`}>
        <div className="sob-left">
          <span className="sob-icon">🍽️</span>
          <div>
            <div className="sob-title">Ready to order?</div>
            <div className="sob-sub">Tap below — orders through Clover</div>
          </div>
        </div>
        <a href={CLOVER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold sob-btn">
          ORDER NOW →
        </a>
      </div>
    </main>
  )
}
