import Link from 'next/link';
import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';

export default function AboutPage() {
  return (
    <main className="site-page">
      <SiteHeader />

      <section className="page-hero dark-hero">
        <div className="container narrow">
          <p className="section-kicker light">About us</p>
          <h1>Advancing science, security and sustainable development.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <p className="section-kicker">Who we are</p>
            <h2>AFRICSIS is a platform for evidence, dialogue, and institutional trust.</h2>
          </div>
          <div>
            <p>
              AFRICSIS works at the intersection of science, international security, public policy, and development. We bring together research, strategic engagement, and practical leadership to help governments, institutions, and communities make informed decisions.
            </p>
            <p>
              Our approach is grounded in the belief that peace, resilience, and sustainable progress are strengthened when technical expertise, public trust, and policy action work together.
            </p>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container value-grid">
          <article className="value-card">
            <div className="value-index">01</div>
            <h3>Research</h3>
            <p>We produce analysis that helps institutions understand technical, strategic, and policy challenges.</p>
          </article>
          <article className="value-card">
            <div className="value-index">02</div>
            <h3>Dialogue</h3>
            <p>We bring together policymakers, professionals, researchers, and communities to build understanding.</p>
          </article>
          <article className="value-card">
            <div className="value-index">03</div>
            <h3>Leadership</h3>
            <p>We support better decisions through strategic guidance and informed public engagement.</p>
          </article>
          <article className="value-card">
            <div className="value-index">04</div>
            <h3>Action</h3>
            <p>We translate knowledge into practical steps that strengthen resilience and progress.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container center-text">
          <p className="section-kicker">Our mission</p>
          <h2>To help build safer, more informed, and more resilient futures.</h2>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
