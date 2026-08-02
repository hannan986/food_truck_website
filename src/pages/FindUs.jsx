import { Reveal } from '../components/useReveal'
import Footer from '../components/Footer'
import './FindUs.css'

const HOURS = [
  ['Monday',    '11:00 AM – 9:00 PM'],
  ['Tuesday',   '11:00 AM – 9:00 PM'],
  ['Wednesday', '11:00 AM – 9:00 PM'],
  ['Thursday',  '11:00 AM – 9:00 PM'],
  ['Friday',    '11:00 AM – 10:00 PM'],
  ['Saturday',  '10:00 AM – 10:00 PM'],
  ['Sunday',    '10:00 AM – 9:00 PM'],
]

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

export default function FindUs() {
  return (
    <main>
      {/* HERO */}
      <div className="page-hero finduS-hero">
        <p className="page-hero-eyebrow">📍 Hagerstown, Maryland</p>
        <h1 className="page-hero-title">FIND <span className="gold">US</span></h1>
        <p className="page-hero-sub">Come taste the difference. We're ready for you.</p>
      </div>

      {/* BIG CONTACT CARDS */}
      <section className="fu-cards-section">
        <div className="container">
          <div className="fu-cards-grid">

            <Reveal delay={0} className="fu-card fu-card--phone">
              <div className="fu-card-icon">📞</div>
              <div className="fu-card-label">Call Us</div>
              <div className="fu-card-value">(240) 698-8849</div>
              <a href="tel:+12406988849" className="fu-card-btn fu-btn-gold">
                CALL NOW →
              </a>
            </Reveal>

            <Reveal delay={1} className="fu-card fu-card--address">
              <div className="fu-card-icon">📍</div>
              <div className="fu-card-label">Our Location</div>
              <div className="fu-card-value">802 Salem Ave<br/>Hagerstown, MD 21740</div>
              <a
                href="https://maps.google.com/?q=802+Salem+Ave,+Hagerstown,+MD+21740"
                target="_blank" rel="noopener noreferrer"
                className="fu-card-btn fu-btn-white"
              >
                GET DIRECTIONS →
              </a>
            </Reveal>

            <Reveal delay={2} className="fu-card fu-card--facebook">
              <div className="fu-card-icon">👍</div>
              <div className="fu-card-label">Facebook</div>
              <div className="fu-card-value">Taste on Wheels</div>
              <a
                href="https://www.facebook.com/tasteonwheels"
                target="_blank" rel="noopener noreferrer"
                className="fu-card-btn fu-btn-blue"
              >
                VISIT PAGE →
              </a>
            </Reveal>

            <Reveal delay={3} className="fu-card fu-card--insta">
              <div className="fu-card-icon">📷</div>
              <div className="fu-card-label">Instagram</div>
              <div className="fu-card-value">@tasteonwheels</div>
              <a
                href="https://www.instagram.com/tasteonwheels"
                target="_blank" rel="noopener noreferrer"
                className="fu-card-btn fu-btn-insta"
              >
                FOLLOW US →
              </a>
            </Reveal>

          </div>
        </div>
      </section>

      {/* CALL AHEAD BANNER */}
      <section className="fu-call-banner">
        <div className="container fu-call-inner">
          <div className="fu-call-left">
            <span className="fu-call-badge">★ PRO TIP</span>
            <h2 className="fu-call-title">CALL AHEAD &<br/>SKIP THE WAIT</h2>
            <p className="fu-call-desc">Heading over? Give us a call and your order will be hot and ready when you arrive.</p>
          </div>
          <Reveal delay={1} className="fu-call-right">
            <div className="fu-call-num">(240) 698-8849</div>
            <div className="fu-call-note">TAP TO CALL · WE'LL HAVE IT READY</div>
            <a href="tel:+12406988849" className="fu-call-btn">📞 CALL NOW →</a>
          </Reveal>
        </div>
      </section>

      {/* MAP */}
      <section className="fu-map-section">
        <div className="fu-map-header">
          <span className="eyebrow">802 Salem Ave, Hagerstown MD 21740</span>
          <h2 className="section-title">WE'RE RIGHT <span className="gold">HERE</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="fu-map-wrap">
          <iframe
            title="Taste on Wheels Location"
            src="https://maps.google.com/maps?q=802+Salem+Ave,+Hagerstown,+MD+21740&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://maps.google.com/?q=802+Salem+Ave,+Hagerstown,+MD+21740"
            target="_blank" rel="noopener noreferrer"
            className="fu-map-overlay-btn"
          >
            📍 Open in Google Maps →
          </a>
        </div>
      </section>

      {/* HOURS */}
      <section className="section fu-hours-section" style={{ background:'var(--black)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:40 }}>
          <span className="eyebrow">When We're Open</span>
          <h2 className="section-title">OUR <span className="gold">HOURS</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <Reveal className="fu-hours-card">
            {HOURS.map(([day, time]) => (
              <div key={day} className={`fu-hour-row${day === today ? ' today' : ''}`}>
                <span className="fu-hour-day">
                  {day === today && <span className="fu-today-dot" />}
                  {day}
                </span>
                <span className="fu-hour-time">{time}</span>
              </div>
            ))}
            <p className="fu-hours-note">Hours may vary on holidays. Check our Instagram for live updates.</p>
          </Reveal>
        </div>
      </section>

      {/* PAYMENTS */}
      <section className="section" style={{ background:'var(--dark)', textAlign:'center' }}>
        <div className="container">
          <span className="eyebrow">How To Pay</span>
          <h2 className="section-title">WE ACCEPT <span className="gold">ALL MAJOR PAYMENTS</span></h2>
          <div className="divider divider-center" />
          <div className="fu-pay-row">
            {['💳 VISA','💳 MASTERCARD','🍎 APPLE PAY','📱 GOOGLE PAY','💵 CASH','🔍 DISCOVER'].map((p, i) => (
              <Reveal key={p} delay={i % 4} className="fu-pay-pill">{p}</Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
