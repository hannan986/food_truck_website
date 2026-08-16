import { Reveal } from '../components/useReveal'
import Footer from '../components/Footer'
import './About.css'

export default function About() {
  return (
    <main>
      {/* HERO */}
      <section className="about-hero" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/Food_Truck_Website.jpeg)` }}>
        <div className="container">
          <div className="about-hero-grid">
            <Reveal className="about-hero-text">
              <h1 className="about-hero-title">OUR<br/><span className="red">STORY</span></h1>
              <p className="about-hero-lead">Taste on Wheels started with one simple belief: street food should be extraordinary. Not fast-food throwaway — but genuinely great food made with care, served with pride, right from a food truck.</p>
            </Reveal>
            <Reveal delay={1} className="about-hero-img">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM.jpeg" alt="Taste on Wheels" onError={e=>e.target.style.display='none'} />
              <div className="about-hero-badge">EST. 2026</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OWNER */}
      <section className="section" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="about-owner-grid">
            <Reveal className="about-owner-img">
              <img src="images/owner.jpg" alt="Owner, Taste on Wheels" onError={e=>e.target.style.display='none'} />
            </Reveal>
            <Reveal delay={1}>
              <span className="eyebrow">Meet The Owner</span>
              <h2 className="about-owner-name">Furrukh Jamil</h2>
              <p className="story-quote">Determination. Success. Perseverance.</p>
              <p className="story-p">Taste on Wheels is built on hard work, patience and a genuine love for great food — proudly serving our community one plate at a time.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
