import { Reveal } from '../components/useReveal'
import Footer from '../components/Footer'
import './FindUs.css'

const CONTACTS = [
  { icon:'📞', title:'Call Us', value:'[YOUR PHONE]', link:'tel:+10000000000', btn:'CALL NOW' },
  { icon:'✉️', title:'Email Us', value:'hello@tasteonwheels.com', link:'mailto:hello@tasteonwheels.com', btn:'SEND EMAIL' },
  { icon:'📷', title:'Instagram', value:'@tasteonwheels', link:'#', btn:'FOLLOW US' },
  { icon:'🎵', title:'TikTok', value:'@tasteonwheels', link:'#', btn:'WATCH REELS' },
]

const HOURS = [
  ['Monday','11:00 AM – 9:00 PM'],['Tuesday','11:00 AM – 9:00 PM'],['Wednesday','11:00 AM – 9:00 PM'],
  ['Thursday','11:00 AM – 9:00 PM'],['Friday','11:00 AM – 10:00 PM'],
  ['Saturday','10:00 AM – 10:00 PM'],['Sunday','10:00 AM – 9:00 PM'],
]

const PAYMENTS = [
  { icon:'💳', label:'Visa' },{ icon:'💳', label:'Mastercard' },
  { icon:'🍎', label:'Apple Pay' },{ icon:'📱', label:'Google Pay' },{ icon:'💵', label:'Cash' },
]

export default function FindUs() {
  return (
    <main>
      <div className="page-hero">
        <p className="page-hero-eyebrow">We're on the move</p>
        <h1 className="page-hero-title">FIND <span className="gold">US</span></h1>
        <p className="page-hero-sub">We're a food truck — we move! Check our Instagram for today's location and hours before heading out.</p>
      </div>

      {/* LOCATION */}
      <section className="section" style={{ background:'var(--black)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:48 }}>
          <span className="eyebrow">Our Location</span>
          <h2 className="section-title">WHERE TO <span className="gold">FIND US</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <div className="location-grid">
            <Reveal className="location-img">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM%20%281%29.jpeg" alt="Food truck" onError={e=>e.target.style.display='none'} />
              <div className="location-img-overlay">
                <span>📍 CHECK INSTAGRAM FOR LIVE LOCATION</span>
                <a href="#" className="btn btn-gold btn-sm">📷 Follow Us</a>
              </div>
            </Reveal>
            <Reveal delay={1} className="location-details">
              {[
                { icon:'📍', label:'Home Base', val:'Greater Toronto Area, Ontario\nWe post daily location updates on Instagram!' },
                { icon:'🕐', label:'Typical Hours', val:'Mon – Fri: 11:00 AM – 9:00 PM\nSat – Sun: 10:00 AM – 10:00 PM' },
                { icon:'📷', label:'Live Updates', val:'Follow us on Instagram for real-time location, daily specials and truck schedule updates.' },
                { icon:'☕', label:'Catering & Events', val:'We do private events, weddings and corporate catering!\nhello@tasteonwheels.com' },
              ].map(d => (
                <div key={d.label} className="ld-row">
                  <span className="ld-icon">{d.icon}</span>
                  <div>
                    <div className="ld-label">{d.label}</div>
                    <div className="ld-val">{d.val.split('\n').map((l,i)=><span key={i}>{l}{i<1&&<br/>}</span>)}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="section" style={{ background:'var(--dark)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:48 }}>
          <span className="eyebrow">Get In Touch</span>
          <h2 className="section-title">CONTACT <span className="gold">US</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <div className="contact-grid">
            {CONTACTS.map((c,i) => (
              <Reveal key={c.title} delay={i % 4}>
                <div className="contact-card">
                  <span className="contact-icon">{c.icon}</span>
                  <div className="contact-title">{c.title}</div>
                  <div className="contact-val"><a href={c.link}>{c.value}</a></div>
                  <a href={c.link} className="btn btn-dark btn-sm">{c.btn}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALL AHEAD */}
      <section className="call-ahead-section">
        <div className="container">
          <div className="call-ahead-inner">
            <div>
              <span className="ca-badge">★ PRO TIP</span>
              <h2 className="ca-title">CALL AHEAD &<br/>SKIP THE WAIT</h2>
              <p className="ca-desc">Heading over? Call ahead and your order will be ready when you arrive. Call at least 15 minutes before you arrive, especially during peak hours.</p>
            </div>
            <Reveal className="ca-phone-block">
              <div className="ca-num">[YOUR #]</div>
              <div className="ca-note">CALL AHEAD TO PRE-ORDER</div>
              <a href="tel:+10000000000" className="btn btn-sm ca-btn">CALL NOW →</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOURS */}
      <section className="section" style={{ background:'var(--black)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:48 }}>
          <span className="eyebrow">When We're Open</span>
          <h2 className="section-title">OUR <span className="gold">HOURS</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <div className="hours-grid">
            <Reveal>
              <table className="hours-table">
                <tbody>
                  {HOURS.map(([day,time]) => (
                    <tr key={day}><td>{day}</td><td>{time}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="hours-note">Hours may vary on holidays. Always check Instagram for up-to-date schedule and location info before visiting.</p>
            </Reveal>
            <Reveal delay={1} className="hours-img">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM.jpeg" alt="Food truck" onError={e=>e.target.style.display='none'} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section className="section" style={{ background:'var(--dark)', textAlign:'center' }}>
        <div className="container">
          <span className="eyebrow">How To Pay</span>
          <h2 className="section-title">WE ACCEPT <span className="gold">ALL MAJOR PAYMENTS</span></h2>
          <div className="divider divider-center" />
          <div className="payment-cards-row">
            {PAYMENTS.map((p,i) => (
              <Reveal key={p.label} delay={i % 4}>
                <div className="payment-card">
                  <span className="payment-card-icon">{p.icon}</span>
                  <span className="payment-card-label">{p.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
