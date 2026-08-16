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
              <img src="images/owner.png" alt="Owner, Taste on Wheels" onError={e=>e.target.style.display='none'} />
            </Reveal>
            <Reveal delay={1}>
              <span className="eyebrow">A Message From CEO &amp; Founder</span>
              <h2 className="about-owner-name">Furrukh Jamil</h2>
              <p className="story-p">What started as a passion for great food and a dream of bringing people together has grown into something I'm incredibly proud of. Taste On Wheels - Food Truck is more than just a place to grab a meal — it's a way for us to connect with our community, share food we love, and create memorable experiences wherever we go.</p>
              <p className="story-p">We believe great food should be fresh, flavorful, and made with care. Every dish we serve represents our commitment to quality and our appreciation for the customers who continue to support us.</p>
              <p className="story-p">As we grow, our mission remains simple: serve delicious food, treat people like family, and bring a little more joy to every stop we make.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
