import { Link } from 'react-router-dom'
import { Reveal } from '../components/useReveal'
import Footer from '../components/Footer'
import './Byob.css'

const STEPS = [
  { icon:'🛍️', num:'01', title:'BRING YOUR BAG', desc:"Grab your favourite bag of chips — Doritos, Lay's, Takis, Cheetos, or any other brand. Sealed bags preferred." },
  { icon:'🥩', num:'02', title:'CHOOSE YOUR PROTEIN', desc:'Pick from our seasoned chicken, beef, lamb, gyro meat or crispy falafel. All halal, all made fresh to order.' },
  { icon:'🧀', num:'03', title:'WE FILL IT UP', desc:"We open the bag and fill it with your chosen protein, melted cheese, jalapeños and all our special fixings. Then we seal it and hand it back!" },
]

const PROTEINS = [
  { emoji:'🍗', name:'Chicken / Beef', desc:'Juicy seasoned chicken or halal beef — savory, smoky and satisfying.', price:8.99, img:'Chicken Gyro Wrap.jpg' },
  { emoji:'🍖', name:'Lamb / Gyro',    desc:'Signature seasoned lamb or authentic gyro meat — bold, rich and full of flavor.', price:9.99, img:'Lamb Gyro Wrap.jpg' },
  { emoji:'🧆', name:'Falafel',        desc:'Crispy golden falafel made fresh daily — hearty, flavorful and fully vegetarian.', price:8.49, img:'Falafel Wrap.jpg' },
]

const CHIPS = ['DORITOS','LAY\'S','TAKIS','CHEETOS','PRINGLES','ANY BRAND']

export default function Byob() {
  return (
    <main>
      {/* HERO */}
      <section className="byob-hero">
        <div className="container byob-hero-inner">
          <span className="byob-badge">★ NEW AT TASTE ON WHEELS</span>
          <h1 className="byob-hero-title">BYOB</h1>
          <p className="byob-hero-sub">Bring Your Own Bag of Chips</p>
          <p className="byob-hero-desc">Bring any bag of your favourite chips and we'll fill it with your choice of seasoned meat, melted cheese and all our signature fixings.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background:'var(--black)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:48 }}>
          <span className="eyebrow">The Process</span>
          <h2 className="section-title">HOW IT <span className="gold">WORKS</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <div className="how-grid">
            {STEPS.map((s,i) => (
              <Reveal key={s.num} delay={i} className="how-card-wrap">
                <div className="how-card" data-num={s.num}>
                  <span className="how-icon">{s.icon}</span>
                  <div className="how-num">{s.num}</div>
                  <div className="how-title">{s.title}</div>
                  <p className="how-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROTEINS */}
      <section className="section" style={{ background:'var(--dark)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:48 }}>
          <span className="eyebrow">Pick Your Protein</span>
          <h2 className="section-title">CHOOSE YOUR <span className="gold">FILLING</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <div className="protein-grid">
            {PROTEINS.map((p,i) => (
              <Reveal key={p.name} delay={i} className="protein-card-wrap">
                <div className="protein-card">
                  <div className="protein-img-wrap">
                    <img src={`images/menu_images/${p.img}`} alt={p.name} onError={e=>e.target.style.display='none'} />
                  </div>
                  <div className="protein-body">
                    <div className="protein-name">{p.name}</div>
                    <p className="protein-desc">{p.desc}</p>
                    <div className="protein-footer">
                      <span className="protein-price">${p.price.toFixed(2)}</span>
                      <Link to="/order" className="btn btn-outline-gold btn-sm">ORDER →</Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHIP BRANDS */}
      <section className="section" style={{ background:'var(--black)', textAlign:'center' }}>
        <div className="container">
          <span className="eyebrow">Works With Your Favourites</span>
          <h2 className="section-title">WORKS WITH <span className="gold">ANY CHIPS</span></h2>
          <div className="divider divider-center" />
          <div className="chips-row">
            {CHIPS.map((c,i) => <Reveal key={c} delay={i % 4} className={`chip-tag${i<2?' chip-featured':''}`}>{c}</Reveal>)}
          </div>
          <p style={{ color:'#333', fontSize:'.75rem', marginTop:16 }}>Bring a larger (party size) bag for the full experience!</p>
        </div>
      </section>

      {/* VISUALS */}
      <section className="section-sm" style={{ background:'var(--dark)' }}>
        <div className="container">
          <div className="byob-vis-grid">
            <Reveal className="byob-vis">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM%20%284%29.jpeg" alt="BYOB" onError={e=>e.target.style.display='none'} />
            </Reveal>
            <Reveal delay={1} className="byob-vis">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.55.42%20PM.jpeg" alt="Food truck" onError={e=>e.target.style.display='none'} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background:'var(--dark-2)', textAlign:'center', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <h2 className="section-title">READY TO TRY <span className="gold">BYOB</span>?</h2>
          <p className="section-sub" style={{ margin:'14px auto 28px', textAlign:'center' }}>Come find us, bring your bag, and experience the most unique food truck item around.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="/order" className="btn btn-gold btn-lg">ORDER NOW →</a>
            <a href="/find-us" className="btn btn-outline-white btn-lg">FIND US →</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
