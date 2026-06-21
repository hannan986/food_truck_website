import { Reveal } from '../components/useReveal'
import Footer from '../components/Footer'
import './About.css'

const VALUES = [
  { icon:'❤️', num:'01', title:'Made With Love', desc:"We put real care into every dish. From the marinade to the plate, every step is done with the intention of making something truly delicious." },
  { icon:'🌱', num:'02', title:'Fresh Every Day', desc:"No reheating. No cutting corners. Our meat is seasoned fresh daily, our falafel is ground and fried to order, and our sauces are made in-house." },
  { icon:'⭐', num:'03', title:'Halal, Always', desc:"Our entire menu is 100% Halal certified. That's not just a label for us — it's a standard we hold ourselves to with every order, every day." },
]

const TEAM = [
  { name:'The Founder', role:'Head Chef & Owner', desc:"Started Taste on Wheels with a family recipe and a dream. Handles everything from sourcing our halal meats to designing the menu.", img:'WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM.jpeg' },
  { name:'The Kitchen', role:'Food Prep & Line Cook', desc:"The engine behind the operation. Preps fresh daily, runs the grill during service and ensures every plate meets our quality standards.", img:'menu_images/lamb_over_rice.jpg' },
  { name:'The Face',    role:'Front of House & Social Media', desc:"The smiling face at the window. Also the person behind all our Instagram posts, reels and daily location drops.", img:'WhatsApp%20Image%202026-06-07%20at%208.55.42%20PM.jpeg' },
]

const STATS = [
  { num:'2+', label:'Years on the Road' },
  { num:'100%', label:'Halal Certified' },
  { num:'1000+', label:'Happy Customers' },
  { num:'♥', label:'Made with Love' },
]

export default function About() {
  return (
    <main>
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-grid">
            <Reveal className="about-hero-text">
              <span className="about-badge">🚚 Our Story</span>
              <h1 className="about-hero-title">OUR<br/><span className="gold">STORY</span></h1>
              <p className="about-hero-lead">Taste on Wheels started with one simple belief: street food should be extraordinary. Not fast-food throwaway — but genuinely great food made with care, served with pride, right from a truck.</p>
              <a href="#story" className="btn btn-gold btn-lg">READ OUR STORY ↓</a>
            </Reveal>
            <Reveal delay={1} className="about-hero-img">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM.jpeg" alt="Taste on Wheels" onError={e=>e.target.style.display='none'} />
              <div className="about-hero-badge">EST. 2023</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="section" style={{ background:'var(--black)' }}>
        <div className="container">
          <div className="story-grid">
            <Reveal className="story-img-wrap">
              <img src="images/WhatsApp%20Image%202026-06-07%20at%208.56.19%20PM%20%281%29.jpeg" alt="Food truck" onError={e=>e.target.style.display='none'} />
              <div className="story-stat-bar">
                <div className="story-stat"><span className="sn">100%</span><span className="sl">Halal</span></div>
                <div className="story-stat"><span className="sn">Fresh</span><span className="sl">Daily</span></div>
                <div className="story-stat"><span className="sn">★ 5</span><span className="sl">Flavor</span></div>
              </div>
            </Reveal>
            <Reveal delay={1} className="story-content">
              <div className="story-quote">"Great food should be accessible to everyone — on every corner, every day."</div>
              <p className="story-p">It started with a dream and a passion for food. We grew up eating incredible halal food at home — rich with spices, layered flavors and cooked with love. We couldn't understand why those flavors never made it to the streets.</p>
              <p className="story-p">So we built Taste on Wheels. We took everything we loved about great Middle Eastern and street food cooking and brought it to where people actually are.</p>
              <p className="story-p">Today we serve hundreds of people every week. We've kept one promise the entire time: every plate that leaves our window is made fresh, made with care, and made to satisfy.</p>
              <div className="story-highlight">
                <p>Every item on our menu is <strong style={{color:'#e3bc32'}}>100% Halal certified</strong>. Our meat is sourced locally, halal-certified and prepared fresh daily. No shortcuts, no compromise.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="section-sm" style={{ background:'var(--dark)' }}>
        <div className="container">
          <div className="stats-strip">
            {STATS.map((s,i) => (
              <Reveal key={s.label} delay={i} className="stat-block">
                <span className="stat-num" style={s.num==='♥'?{color:'#C0392B'}:{}}>{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" style={{ background:'var(--black)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:48 }}>
          <span className="eyebrow">What We Stand For</span>
          <h2 className="section-title">OUR <span className="gold">VALUES</span></h2>
          <div className="divider divider-center" />
        </div>
        <div className="container">
          <div className="values-grid">
            {VALUES.map((v,i) => (
              <Reveal key={v.title} delay={i} className="value-card-wrap">
                <div className="value-card" data-num={v.num}>
                  <span className="value-icon">{v.icon}</span>
                  <div className="value-title">{v.title}</div>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section" style={{ background:'var(--dark)' }}>
        <div className="container" style={{ textAlign:'center', marginBottom:48 }}>
          <span className="eyebrow">The People Behind the Food</span>
          <h2 className="section-title">MEET THE <span className="gold">TEAM</span></h2>
          <div className="divider divider-center" />
          <p className="section-sub" style={{ margin:'0 auto', textAlign:'center' }}>We're a tight-knit team that works hard, laughs often and takes immense pride in every dish.</p>
        </div>
        <div className="container">
          <div className="team-grid">
            {TEAM.map((m,i) => (
              <Reveal key={m.name} delay={i} className="team-card-wrap">
                <div className="team-card">
                  <div className="team-photo">
                    <img src={`images/${m.img}`} alt={m.name} onError={e=>e.target.style.display='none'} />
                  </div>
                  <div className="team-info">
                    <div className="team-name">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                    <p className="team-desc">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background:'var(--black)', textAlign:'center', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <h2 className="section-title">COME <span className="gold">TASTE</span><br/>THE DIFFERENCE</h2>
          <p className="section-sub" style={{ margin:'14px auto 28px', textAlign:'center' }}>Our story is still being written — and we're inviting you to be a part of it.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="/order" className="btn btn-gold btn-lg">ORDER ONLINE →</a>
            <a href="/find-us" className="btn btn-outline-white btn-lg">FIND US →</a>
            <a href="/menu" className="btn btn-outline-gold btn-lg">VIEW MENU →</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
