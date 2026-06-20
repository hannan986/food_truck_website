import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Reveal } from '../components/useReveal'
import Footer from '../components/Footer'
import './Menu.css'

const MENU = {
  bowls: {
    label: 'Bowls', emoji: '🍚', num: '01',
    items: [
      { name: 'Lamb Over Rice',          price: 10.99, desc: 'Savory seasoned lamb over fluffy rice with fresh veggies and our signature white and hot sauce.', note: '✓ Halal · ✓ Rice Base', img: 'lamb_over_rice.jpg' },
      { name: 'Chicken Over Rice',        price: 10.99, desc: 'Juicy marinated chicken over fluffy rice with fresh veggies and signature sauces.', note: '✓ Halal · ✓ Rice Base', img: 'Grilled Chicken Salad.jpg' },
      { name: 'Lamb & Chicken Over Rice', price: 12.99, desc: 'Best of both worlds — seasoned lamb & chicken over rice with fresh veggies and signature sauces.', note: '✓ Halal · ✓ Best Seller', img: 'Chef Salad.jpg' },
      { name: 'Falafel Over Rice',        price:  9.99, desc: 'Crispy golden falafel over fluffy rice with fresh veggies and our tahini signature sauce.', note: '✓ Vegetarian · ✓ Tahini', img: 'Garden Salad.jpg' },
    ]
  },
  wraps: {
    label: 'Wraps', emoji: '🌯', num: '02',
    items: [
      { name: 'Chicken Gyro Wrap', price: 9.99, desc: 'Marinated chicken, lettuce, tomatoes, onions and signature sauce in warm pita.', note: '✓ Halal · ✓ Pita', img: 'Grilled Chicken Wrap.jpg' },
      { name: 'Lamb Gyro Wrap',    price: 9.99, desc: 'Savory seasoned lamb, lettuce, tomatoes, onions and signature sauce in warm pita.', note: '✓ Halal · ✓ Pita', img: 'Steak & Cheese Wrap.jpg' },
      { name: 'Falafel Wrap',      price: 8.99, desc: 'Crispy falafel, fresh lettuce, tomatoes, onions and tahini sauce in warm pita.', note: '✓ Vegetarian · ✓ Tahini', img: 'Veggie Wrap.jpg' },
      { name: 'Fried Chicken Wrap',price: 9.99, desc: 'Crispy fried chicken, lettuce, tomatoes, pickles and signature sauce in warm tortilla.', note: '✓ Halal · ✓ Tortilla', img: 'Fried Chicken Wrap.jpg' },
    ]
  },
  burgers: {
    label: 'Burgers', emoji: '🍔', num: '03',
    items: [
      { name: 'Hamburger',          price:  7.99, desc: 'Classic juicy beef patty with lettuce, tomato, onion, pickles and signature sauce.', note: '✓ Halal Beef', img: 'hamburger_sub.jpg' },
      { name: 'Cheeseburger',       price:  8.99, desc: 'Juicy beef patty with melted cheese, fresh veggies, pickles and signature sauce.', note: '✓ Halal Beef · ✓ Cheddar', img: 'cheese_burger_sub.avif' },
      { name: 'Chicken Sandwich',   price:  9.99, desc: 'Grilled or crispy chicken with lettuce, tomato and signature sauce on toasted bun.', note: '✓ Halal Chicken', img: 'Fried_chicken_sub.jpg' },
      { name: 'Veggie Burger',      price:  8.99, desc: 'Flavorful veggie patty with lettuce, tomato, onion and signature sauce.', note: '✓ Vegetarian', img: 'Veggie_sub.avif' },
      { name: 'Double Cheeseburger',price: 11.99, desc: 'Double the beef, double the cheese, double the satisfaction — stacked and loaded.', note: '✓ Halal Beef · ✓ Best Seller', img: 'combo_sub.avif' },
    ]
  },
  steak: {
    label: 'Steak & Cheese', emoji: '🥩', num: '04',
    items: [
      { name: 'Original Steak or Chicken', price: 11.99, desc: 'Thinly sliced steak or chicken on a toasted hoagie with melted cheese and special sauce.', note: '✓ Halal · ✓ Hoagie Roll', img: 'Grilled_chicken_sub.jpg' },
      { name: 'Supreme Steak or Chicken',  price: 13.99, desc: 'Loaded with sautéed peppers, onions, mushrooms, melted cheese and premium sauce.', note: '✓ Halal · ✓ Loaded', img: 'Steak & Cheese Wrap.jpg' },
    ]
  },
  sides: {
    label: 'Sides', emoji: '🍟', num: '05',
    items: [
      { name: 'French Fries',       price: 3.99, desc: 'Crispy golden fries, perfectly seasoned.', note: '✓ Vegan', img: 'French Fries.jpg' },
      { name: 'Cheese Fries',       price: 4.99, desc: 'Crispy fries topped with warm melted cheese sauce.', note: '✓ Vegetarian', img: 'French Fries.jpg' },
      { name: 'Chilli Cheese Fries',price: 5.99, desc: 'Crispy fries loaded with chilli and melted cheese.', note: '✓ Loaded', img: 'Homemade Chili.jpg' },
      { name: 'Fried Pickles',      price: 3.99, desc: 'Golden crispy fried pickles with a satisfying crunch.', note: '✓ Vegetarian', img: 'Fried Pickles.jpg' },
      { name: 'Mozzarella Sticks',  price: 4.99, desc: 'Crispy mozzarella sticks with marinara sauce.', note: '✓ Vegetarian', img: 'Cheese Sticks.jpg' },
      { name: 'Onion Rings',        price: 3.99, desc: 'Golden battered onion rings — crispy outside, sweet inside.', note: '✓ Vegetarian', img: 'Onion_rings.jpg' },
    ]
  },
  snacks: {
    label: 'Snacks', emoji: '🍗', num: '06',
    items: [
      { name: 'Chicken Tenders', price: 7.99, desc: 'Golden crispy chicken tenders with choice of dipping sauce.', note: '✓ Halal', img: 'Chicken Tenders.jpg' },
      { name: 'Chicken Wings',   price: 8.99, desc: 'Juicy wings — classic, buffalo or honey garlic.', note: '✓ Halal', img: '8_pieces_wings.jpg' },
      { name: 'Chicken Nuggets', price: 5.99, desc: 'Classic crispy chicken nuggets, crowd pleaser every time.', note: '✓ Halal', img: 'Chicken Tenders.jpg' },
      { name: 'Hot Dogs',        price: 3.99, desc: 'Classic halal hot dog in toasted bun with your choice of toppings.', note: '✓ Halal', img: 'Hot_dog.jpg' },
      { name: 'Nachos',          price: 5.99, desc: 'Loaded tortilla chips with cheese, jalapeños and sour cream.', note: '✓ Vegetarian', img: 'Funnel Cake Fries.jpg' },
    ]
  },
}

const KEYS = Object.keys(MENU)

function ItemCard({ item, delay }) {
  return (
    <Reveal delay={delay} className="item-card-wrap">
      <div className="item-card">
        <div className="item-visual">
          <img src={`${import.meta.env.BASE_URL}images/menu_images/${item.img}`} alt={item.name} onError={e => { e.target.style.opacity='0' }} />
        </div>
        <div className="item-body">
          <div className="item-name">{item.name}</div>
          <p className="item-desc">{item.desc}</p>
          <div className="item-note">{item.note}</div>
        </div>
        <div className="item-footer">
          <span className="item-price">${item.price.toFixed(2)}</span>
          <Link to="/order" className="btn-add-item">ORDER →</Link>
        </div>
      </div>
    </Reveal>
  )
}

export default function Menu() {
  const location = useLocation()
  const [active, setActive] = useState(KEYS[0])
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
      <div className="page-hero">
        <p className="page-hero-eyebrow">Taste on Wheels</p>
        <h1 className="page-hero-title">OUR <span className="gold">MENU</span></h1>
        <p className="page-hero-sub">Fresh ingredients. Bold flavors. Made to order every single time.</p>
      </div>

      <div className="combo-banner-sm">
        <div className="container-wide">
          <div className="combo-inner">
            <div><div className="combo-title">MAKE IT A COMBO</div><div className="combo-desc">Any Main + Fries + Drink — <strong>Only $4.99 extra</strong></div></div>
          </div>
        </div>
      </div>

      <div className="menu-tab-bar">
        <div className="menu-tab-inner">
          {KEYS.map(k => (
            <button key={k} className={`tab-btn${active===k?' active':''}`}
              onClick={() => sectionRefs.current[k]?.scrollIntoView({ behavior:'smooth', block:'start' })}>
              {MENU[k].emoji} {MENU[k].label}
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
                  <span>MAKE IT A COMBO FOR JUST <strong style={{color:'#e3bc32'}}>$4.99</strong> — ADD FRIES + DRINK</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="payment-bar">
        <div className="container-wide">
          <div className="payment-bar-inner">
            <span className="payment-label">We Accept:</span>
            {['VISA','MASTERCARD','DISCOVER','APPLE PAY','CASH'].map(p=><span key={p} className="payment-item">{p}</span>)}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
