import Link from 'next/link';
import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';

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
      <SiteHeader />

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

      <SiteFooter />
    </main>
  );
}
