import Link from 'next/link';

const programs = [
  {
    title: 'Nuclear Security Program (NSP)',
    text: 'Strengthening institutional, technical, and policy capacity related to the protection of nuclear and radiological materials, and broader systems that shape public and national security.',
  },
  {
    title: 'Nonproliferation and Disarmament Program (NDP)',
    text: 'Promoting regional understanding of global nuclear governance, strategic restraint, and the ways in which disarmament and nonproliferation support peace and development.',
  },
  {
    title: 'Safeguards and Verification',
    text: 'Supporting the development of safeguards, verification frameworks, and confidence-building tools that strengthen transparency and accountability.',
  },
  {
    title: 'Policy and Leadership',
    text: 'Translating scientific knowledge into actionable policy and practical leadership for governments, institutions, and strategic decision-makers.',
  },
  {
    title: 'Capacity Building',
    text: 'Empowering professionals, young leaders, and institutions through training, research exchange, and sustained engagement.',
  },
  {
    title: 'Public Engagement',
    text: 'Creating spaces for informed discussion and public trust by making science and security more understandable and relevant to daily life.',
  },
];

export default function ProgramsPage() {
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
          <p className="section-kicker light">Our programs</p>
          <h1>Solutions built for resilience, security and progress.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container program-grid multi-page-grid">
          {programs.map((program) => (
            <article key={program.title} className="program-card">
              <span className="program-tag">Program</span>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section intro-section">
        <div className="container two-col">
          <div>
            <p className="section-kicker">Why it matters</p>
            <h2>Security and development are interconnected.</h2>
          </div>
          <div>
            <p>
              Effective policy and strategic planning require technical understanding, social trust, and long-term institutional capacity. AFRICSIS helps build the knowledge and relationships needed to move from risk to resilience.
            </p>
          </div>
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
