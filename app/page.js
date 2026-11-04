import Image from 'next/image';
import { getSiteContent } from '../lib/site-content';

export default async function HomePage() {
  const content = await getSiteContent();
  const { hero, stats, programs, engagements, leadership, insights, cta, contact } = content;

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <div className="brand-block">
            <div className="brand-mark">A</div>
            <div className="brand-copy">
              <span className="brand-name">AFRICSIS</span>
              <span className="brand-tag">SCIENCE FOR PEACE</span>
            </div>
          </div>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#impact">Impact</a>
            <a href="#insights">Insights</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-cta">
            <a href="#contact" className="btn btn-secondary">Partner</a>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.title}</h1>
            <p className="lead">{hero.lead}</p>

            <div className="hero-actions">
              <a href="#programs" className="btn btn-primary">Explore programs</a>
              <a href="#about" className="btn btn-secondary">Learn more</a>
            </div>

            <div className="stats-row">
              {stats.map((item) => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-panel">
              <p className="panel-tag">Strategic focus</p>
              <h2>Trusted science for safer futures</h2>
              <ul>
                <li>Security governance</li>
                <li>Nonproliferation and disarmament</li>
                <li>Public trust and awareness</li>
                <li>Regional capacity building</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section intro-section">
        <div className="container intro-grid">
          <div>
            <p className="section-kicker">About us</p>
            <h2>Advancing science and security for sustainable development.</h2>
          </div>
          <div>
            <p>
              AFRICSIS is a multidisciplinary platform working at the intersection of science, policy, public safety, and security. We connect research with action to improve governance, resilience, and public confidence.
            </p>
            <p>
              Our work reflects a clear conviction: societies become stronger when scientific knowledge, ethical leadership, and policy engagement reinforce one another.
            </p>
          </div>
        </div>
      </section>

      <section className="section value-section">
        <div className="container">
          <div className="section-heading center">
            <p className="section-kicker">Our values</p>
            <h2>What guides our mission</h2>
          </div>

          <div className="value-grid">
            <article className="value-card">
              <div className="value-index">01</div>
              <h3>Evidence-led action</h3>
              <p>We ground decisions in rigorous analysis, expert knowledge, and practical field realities.</p>
            </article>
            <article className="value-card">
              <div className="value-index">02</div>
              <h3>Regional relevance</h3>
              <p>We connect global frameworks to African priorities, challenges, and opportunities for progress.</p>
            </article>
            <article className="value-card">
              <div className="value-index">03</div>
              <h3>Trust and transparency</h3>
              <p>We believe informed public engagement is essential to resilient institutions and lasting security.</p>
            </article>
            <article className="value-card">
              <div className="value-index">04</div>
              <h3>Collaborative leadership</h3>
              <p>We work across governments, communities, researchers, and institutions to strengthen collective action.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="programs" className="section program-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Programs</p>
            <h2>Building practical pathways for security and progress.</h2>
          </div>

          <div className="program-grid">
            {programs.map((item) => (
              <article key={item.label} className="program-card">
                <span className="program-tag">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#contact">Learn more</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="section impact-section">
        <div className="container impact-grid">
          <div className="impact-copy">
            <p className="section-kicker">Impact</p>
            <h2>Where science meets action.</h2>
            <p>
              AFRICSIS translates complex knowledge into practical strategies that help institutions act responsibly and confidently in fast-changing environments.
            </p>
            <ul>
              {engagements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="impact-steps">
            <div className="step-box">
              <span>01</span>
              <div>
                <h3>Assess</h3>
                <p>Identify challenges, technical gaps, and strategic priorities.</p>
              </div>
            </div>
            <div className="step-box">
              <span>02</span>
              <div>
                <h3>Engage</h3>
                <p>Bring together institutions, communities, and expert networks.</p>
              </div>
            </div>
            <div className="step-box">
              <span>03</span>
              <div>
                <h3>Translate</h3>
                <p>Convert complex information into clear, actionable guidance.</p>
              </div>
            </div>
            <div className="step-box">
              <span>04</span>
              <div>
                <h3>Strengthen</h3>
                <p>Support institutional resilience and sustainable public progress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section leadership-section">
        <div className="container">
          <div className="section-heading center">
            <p className="section-kicker">Leadership</p>
            <h2>People driving the mission</h2>
          </div>

          <div className="leadership-grid">
            {leadership.map((member) => (
              <article key={member.name} className="leader-card">
                <div className="leader-photo-wrap">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="leader-photo"
                  />
                </div>
                <div className="leader-info">
                  <h3>{member.name}</h3>
                  <p className="leader-role">{member.title}</p>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="insights" className="section insights-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Insights</p>
            <h2>Recent perspectives and updates</h2>
          </div>

          <div className="insights-grid">
            {insights.map((story) => (
              <article key={story.title} className="story-card">
                <div className="story-image-wrap">
                  <Image src={story.image} alt={story.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="story-copy">
                  <span>{story.category}</span>
                  <h3>{story.title}</h3>
                  <p>{story.summary}</p>
                  <a href="#contact">Read more</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="cta-section">
        <div className="container cta-box">
          <div>
            <p className="section-kicker light">Support the mission</p>
            <h2>{cta.title}</h2>
          </div>
          <a href="#contact" className="btn btn-light">{cta.button}</a>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="section-kicker">Contact</p>
            <h2>{contact.heading}</h2>
            <p>
              Whether you are a government agency, donor, research institution, or partner organization, AFRICSIS welcomes conversations that advance peace, security, and sustainable development.
            </p>
            <ul>
              {contact.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <form className="contact-form">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" placeholder="How can we help?" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Tell us about your inquiry"></textarea>
            </div>
            <button type="submit" className="btn btn-primary full-width">Send inquiry</button>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div className="brand-block footer-brand">
            <div className="brand-mark">A</div>
            <div className="brand-copy">
              <span className="brand-name">AFRICSIS</span>
              <span className="brand-tag">SCIENCE FOR PEACE</span>
            </div>
          </div>

          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#impact">Impact</a>
            <a href="#contact">Contact</a>
          </div>

          <p>© 2026 AFRICSIS</p>
        </div>
      </footer>
    </main>
  );
}
