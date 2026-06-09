import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'
import './Order.css'

const COMBO_PRICE = 4.99
const MENU_ITEMS = {
  bowls:   [['Lamb Over Rice',10.99],['Chicken Over Rice',10.99],['Lamb & Chicken Over Rice',12.99],['Falafel Over Rice',9.99]],
  wraps:   [['Chicken Gyro Wrap',9.99],['Lamb Gyro Wrap',9.99],['Falafel Wrap',8.99],['Fried Chicken Wrap',9.99]],
  burgers: [['Hamburger',7.99],['Cheeseburger',8.99],['Chicken Sandwich',9.99],['Double Cheeseburger',11.99]],
  steak:   [['Original Steak or Chicken',11.99],['Supreme Steak or Chicken',13.99]],
  sides:   [['French Fries',3.99],['Cheese Fries',4.99],['Chilli Cheese Fries',5.99],['Mozzarella Sticks',4.99]],
  snacks:  [['Chicken Tenders',7.99],['Chicken Wings',8.99],['Chicken Nuggets',5.99],['Nachos',5.99]],
}
const TABS = [['bowls','🍚 Bowls'],['wraps','🌯 Wraps'],['burgers','🍔 Burgers'],['steak','🥩 Steak'],['sides','🍟 Sides'],['snacks','🍗 Snacks']]

function buildTimes() {
  const times = []
  const now = new Date(); now.setMinutes(now.getMinutes()+15)
  for (let i=0;i<20;i++) {
    const t = new Date(now.getTime()+i*15*60000)
    const h=t.getHours(), m=t.getMinutes()
    const ap=h>=12?'PM':'AM'; const h12=h%12||12; const ms=m<10?'0'+m:m
    times.push(`${h12}:${ms} ${ap}${i===0?' (ASAP)':''}`)
  }
  return times
}

export default function Order() {
  const { cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal } = useCart()
  const [activeTab, setActiveTab] = useState('bowls')
  const [combo, setCombo] = useState(false)
  const [form, setForm] = useState({ name:'', phone:'', email:'', pickup:'', notes:'' })
  const [success, setSuccess] = useState(null)
  const [err, setErr] = useState('')
  const times = buildTimes()
  const total = cartTotal + (combo ? COMBO_PRICE : 0)

  const handleSubmit = e => {
    e.preventDefault(); setErr('')
    if (!cart.length && !combo) { setErr('Please add items to your order first.'); return }
    if (!form.name.trim()) { setErr('Please enter your name.'); return }
    if (!form.phone.trim()) { setErr('Please enter your phone number.'); return }
    if (!form.pickup) { setErr('Please select a pickup time.'); return }
    const snapshot = { ...form, combo, items: [...cart], total }
    clearCart(); setCombo(false); setForm({ name:'', phone:'', email:'', pickup:'', notes:'' })
    setSuccess(snapshot)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (success) return (
    <main>
      <div className="success-wrap">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2 className="success-title">ORDER PLACED!</h2>
          <p className="success-sub">Thanks, <strong>{success.name}</strong>! We'll have your order ready at <strong>{success.pickup}</strong>. We'll text you at <strong>{success.phone}</strong> when it's ready.</p>
          <div className="success-items">
            {success.items.map(i => <div key={i.id} className="success-row"><span>{i.qty}× {i.name}</span><span>${(i.price*i.qty).toFixed(2)}</span></div>)}
            {success.combo && <div className="success-row"><span>Combo Add-on</span><span>${COMBO_PRICE.toFixed(2)}</span></div>}
            <div className="success-row success-total"><span>TOTAL</span><span>${success.total.toFixed(2)}</span></div>
          </div>
          <p className="success-fire">🔥 MADE FRESH. MADE TO SATISFY. 🔥</p>
        </div>
      </div>
      <Footer />
    </main>
  )

  return (
    <main>
      <div className="page-hero">
        <p className="page-hero-eyebrow">Skip the wait</p>
        <h1 className="page-hero-title">ORDER <span className="gold">ONLINE</span></h1>
        <p className="page-hero-sub">Build your order, choose your pickup time, and it'll be ready when you arrive.</p>
      </div>

      <div className="order-layout container-wide">
        {/* LEFT — steps */}
        <div className="order-steps">
          {/* step 1 */}
          <div className="step-block">
            <div className="step-head"><span className="step-num">01</span><span className="step-label">SELECT ITEMS</span></div>
            <div className="otabs">
              {TABS.map(([k,l])=>(
                <button key={k} className={`otab${activeTab===k?' active':''}`} onClick={()=>setActiveTab(k)}>{l}</button>
              ))}
            </div>
            <div className="omenu-panel">
              {MENU_ITEMS[activeTab].map(([name,price])=>(
                <div key={name} className="omenu-item">
                  <div><div className="omenu-name">{name}</div></div>
                  <div className="omenu-right">
                    <span className="omenu-price">${price.toFixed(2)}</span>
                    <button className="btn btn-red btn-sm" onClick={()=>addToCart(name,price)}>+ ADD</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* step 2 */}
          <div className="step-block">
            <div className="step-head"><span className="step-num">02</span><span className="step-label">CUSTOMIZE</span></div>
            <label className="combo-check-label">
              <input type="checkbox" checked={combo} onChange={e=>setCombo(e.target.checked)} />
              <span>Add Combo — Fries + Drink <strong>+${COMBO_PRICE.toFixed(2)}</strong></span>
            </label>
            <textarea className="notes-input" placeholder="Special instructions (allergies, sauces, no onions...)" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} rows={3} />
          </div>

          {/* step 3 */}
          <div className="step-block">
            <div className="step-head"><span className="step-num">03</span><span className="step-label">YOUR INFO</span></div>
            <form id="orderForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="John Smith" />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="(555) 000-0000" type="tel" />
                </div>
              </div>
              <div className="form-group">
                <label>Email (optional)</label>
                <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="you@email.com" type="email" />
              </div>
              <div className="form-group">
                <label>Pickup Time *</label>
                <select value={form.pickup} onChange={e=>setForm(f=>({...f,pickup:e.target.value}))}>
                  <option value="">— Select pickup time —</option>
                  {times.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </form>
          </div>

          {/* step 4 */}
          <div className="step-block">
            <div className="step-head"><span className="step-num">04</span><span className="step-label">REVIEW & PAY</span></div>
            <div className="review-items">
              {cart.length===0 && !combo && <p className="review-empty">No items added yet.</p>}
              {cart.map(i=>(
                <div key={i.id} className="review-row">
                  <span>{i.qty}× {i.name}</span>
                  <span>${(i.price*i.qty).toFixed(2)}</span>
                </div>
              ))}
              {combo && <div className="review-row"><span>Combo Add-on</span><span>+${COMBO_PRICE.toFixed(2)}</span></div>}
              {(cart.length>0||combo) && <div className="review-row review-total"><span>TOTAL</span><span>${total.toFixed(2)}</span></div>}
            </div>
            <p className="pay-note">💳 Pay at pickup — VISA, Mastercard, Apple Pay, Cash</p>
            {err && <div className="form-error">{err}</div>}
            <button form="orderForm" type="submit" className="btn btn-gold btn-full btn-lg">PLACE ORDER 🔥</button>
          </div>
        </div>

        {/* RIGHT — cart sidebar */}
        <aside className="order-sidebar">
          <div className="sidebar-head">🛒 Your Order</div>
          {cart.length===0 && !combo
            ? <div className="sidebar-empty"><div style={{fontSize:'2rem',marginBottom:8}}>🛒</div><p>Your cart is empty.<br/>Add items to get started!</p></div>
            : <>
                <div className="sidebar-items">
                  {cart.map(i=>(
                    <div key={i.id} className="sb-item">
                      <div className="sb-qty-controls">
                        <button className="sb-qty-btn" onClick={()=>updateQty(i.id,i.qty-1)}>−</button>
                        <span className="sb-qty">{i.qty}</span>
                        <button className="sb-qty-btn" onClick={()=>updateQty(i.id,i.qty+1)}>+</button>
                      </div>
                      <span className="sb-name">{i.name}</span>
                      <div className="sb-right">
                        <span className="sb-price">${(i.price*i.qty).toFixed(2)}</span>
                        <button className="sb-remove" onClick={()=>removeFromCart(i.id)}>×</button>
                      </div>
                    </div>
                  ))}
                  {combo && <div className="sb-item sb-combo"><span className="sb-name">Combo — Fries + Drink</span><div className="sb-right"><span className="sb-price">${COMBO_PRICE.toFixed(2)}</span></div></div>}
                </div>
                <div className="sb-total"><span>ORDER TOTAL</span><span>${total.toFixed(2)}</span></div>
              </>
          }
        </aside>
      </div>
      <Footer />
    </main>
  )
}
