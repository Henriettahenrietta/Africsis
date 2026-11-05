import Link from 'next/link';
import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';

export default function DonatePage() {
  return (
    <main className="site-page">
      <SiteHeader />

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

      <SiteFooter />
    </main>
  );
}
