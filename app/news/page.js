import Link from 'next/link';

const news = [
  {
    title: 'Advancing nuclear security and energy resilience in Africa',
    category: 'Nuclear Security',
    summary: 'Examining how resilient, secure energy systems can support diversification, development, and long-term stability.',
  },
  {
    title: 'Building trust in nuclear energy through stakeholder engagement',
    category: 'Stakeholder Engagement',
    summary: 'Why trust, transparency and meaningful public dialogue remain essential for secure and sustainable energy decisions.',
  },
  {
    title: 'What the World Bank nuclear funding decision means for Africa',
    category: 'Policy',
    summary: 'Assessing the strategic implications of financing pathways and how they can shape future energy and development choices.',
  },
  {
    title: 'The future of the Chemical Weapons Convention and civil society',
    category: 'Global Security',
    summary: 'A look at how advocacy, verification, and public accountability remain crucial for responsible governance.',
  },
];

export default function NewsPage() {
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
          <p className="section-kicker light">Insights</p>
          <h1>Latest perspectives and updates from AFRICSIS.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container article-list">
          {news.map((story) => (
            <article key={story.title} className="article-card">
              <span className="article-tag">{story.category}</span>
              <h3>{story.title}</h3>
              <p>{story.summary}</p>
              <Link href="/contact">Read more</Link>
            </article>
          ))}
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
