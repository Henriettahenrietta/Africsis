import Link from 'next/link';

export default function DonatePage() {
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
          <p className="section-kicker light">Support our mission</p>
          <h1>Help build a safer and more secure future.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <p className="section-kicker">Why support us</p>
            <h2>Your support strengthens research, trust and long-term resilience.</h2>
          </div>
          <div>
            <p>
              Contributions help AFRICSIS support strategic research, public engagement, capacity building, and practical initiatives that improve security, governance and development outcomes.
            </p>
            <p>
              Every contribution helps create spaces for evidence-based action and stronger institutions across the continent and beyond.
            </p>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container donation-box">
          <h3>How you can contribute</h3>
          <ul>
            <li>Fund research and policy analysis</li>
            <li>Support public engagement and outreach</li>
            <li>Enable training and capacity projects</li>
            <li>Power strategic partnerships and institutional dialogue</li>
          </ul>
          <Link href="/contact" className="btn btn-primary">Become a donor</Link>
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
