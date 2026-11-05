import SiteHeader from '../site-header';
import SiteFooter from '../site-footer';
import ContactOpportunities from '../contact-opportunities';

export default function ContactPage() {
  return (
    <main className="site-page">
      <SiteHeader />

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
            <ContactOpportunities
              items={[
                'Research collaboration',
                'Institutional partnerships',
                'Capacity building',
                'Strategic advising',
              ]}
            />
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

      <SiteFooter />
    </main>
  );
}
