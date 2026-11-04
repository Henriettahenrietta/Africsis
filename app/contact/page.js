import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="site-page">
      <header className="topbar">
        <div className="container nav-wrap">
          <Link href="/" className="brand-block">
            <div className="brand-mark">A</div>
            <div className="brand-copy">
              <span className="brand-name">AFRICSIS</span>
              <span className="brand-tag">SCIENCE FOR PEACE</span>
            </div>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <Link href="/about">About</Link>
            <Link href="/programs">Programs</Link>
            <Link href="/news">Insights</Link>
            <Link href="/donate">Donate</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="nav-cta">
            <Link href="/contact" className="btn btn-secondary">Partner</Link>
            <Link href="/donate" className="btn btn-primary">Donate</Link>
          </div>
        </div>
      </header>

      <section className="page-hero dark-hero">
        <div className="container narrow">
          <p className="section-kicker light">Contact</p>
          <h1>Let’s work together for meaningful impact.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p>
              AFRICSIS welcomes partnerships with governments, researchers, donors, academic institutions, and civil society organizations that share our commitment to peace, security, and sustainable development.
            </p>
            <ul>
              <li>Research collaboration</li>
              <li>Institutional partnerships</li>
              <li>Capacity building</li>
              <li>Strategic advising</li>
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
            <Link href="/about">About</Link>
            <Link href="/programs">Programs</Link>
            <Link href="/news">News</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <p>© 2026 AFRICSIS</p>
        </div>
      </footer>
    </main>
  );
}
