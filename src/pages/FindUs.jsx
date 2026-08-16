import { Reveal } from '../components/useReveal'
import Footer from '../components/Footer'
import './FindUs.css'

const HOURS = [
  ['Monday',    '11:30 AM – 10:30 PM'],
  ['Tuesday',   '11:30 AM – 10:30 PM'],
  ['Wednesday', '11:30 AM – 10:30 PM'],
  ['Thursday',  '11:30 AM – 10:30 PM'],
  ['Friday',    '11:30 AM – 10:30 PM'],
  ['Saturday',  '11:30 AM – 10:30 PM'],
  ['Sunday',    '11:30 AM – 10:30 PM'],
]

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

export default function FindUs() {
  return (
    <main>
      {/* HERO */}
      <div className="page-hero finduS-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.78) 100%), url(${import.meta.env.BASE_URL}images/Food_Truck_Website.jpeg)` }}>
        <h1 className="page-hero-title">FIND <span className="gold">US</span></h1>
      </div>

      {/* BIG CONTACT CARDS */}
      <section className="fu-cards-section">
        <div className="container">
          <div className="fu-cards-grid">

            <Reveal delay={0} className="fu-card fu-card--address">
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

            <Reveal delay={1} className="fu-card fu-card--facebook">
              <div className="fu-card-icon"><img src="images/facebook_icon_image.jpeg" alt="" /></div>
              <div className="fu-card-label">Facebook</div>
              <div className="fu-card-value">Taste on Wheels</div>
              <a
                href="https://www.facebook.com/share/1FjrAx5iYa/?mibextid=wwXIfr"
                target="_blank" rel="noopener noreferrer"
                className="fu-card-btn fu-btn-blue"
              >
                VISIT PAGE →
              </a>
            </Reveal>

            <Reveal delay={2} className="fu-card fu-card--tiktok">
              <div className="fu-card-icon"><img src="images/tiktok_image.jpg" alt="" /></div>
              <div className="fu-card-label">TikTok</div>
              <div className="fu-card-value">@tasteonwheels</div>
              <a
                href="https://www.tiktok.com/t/ZP8Wk8R88/"
                target="_blank" rel="noopener noreferrer"
                className="fu-card-btn fu-btn-tiktok"
              >
                FOLLOW US →
              </a>
            </Reveal>

            <Reveal delay={3} className="fu-card fu-card--phone">
              <div className="fu-card-icon">📞</div>
              <div className="fu-card-label">Call Us</div>
              <div className="fu-card-value">(240) 698-8849</div>
              <a href="tel:+12406988849" className="fu-card-btn fu-btn-gold">
                CALL NOW →
              </a>
            </Reveal>

          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="fu-map-section">
        <div className="fu-map-header">
          <span className="eyebrow">802 Salem Ave, Hagerstown MD 21740</span>
          <h2 className="section-title">WE'RE RIGHT <span className="red">HERE</span></h2>
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
          <h2 className="section-title">OUR <span className="red">HOURS</span></h2>
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
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
