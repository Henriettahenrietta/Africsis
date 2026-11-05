import Link from 'next/link';
import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-identity">
            <Link href="/" className="brand-block footer-brand">
              <Image
                src="/images/africsis-logo.png"
                alt=""
                width={48}
                height={48}
                className="brand-mark"
              />
              <span className="brand-copy">
                <span className="brand-name">AFRICSIS</span>
                <span className="brand-tag">SCIENCE FOR PEACE</span>
              </span>
            </Link>
            <p>Research, dialogue, and leadership for peace, security, and sustainable development.</p>
          </div>
          <div className="footer-nav-groups">
            <nav className="footer-links" aria-label="Footer navigation">
              <Link href="/about">About</Link>
              <Link href="/programs">Programs</Link>
              <Link href="/news">Insights</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <nav className="footer-socials" aria-label="Social media">
              <span className="footer-social-label">Connect</span>
              <a href="https://www.facebook.com/AFRICSIS" target="_blank" rel="noreferrer">Facebook</a>
              <a href="mailto:africsis.org@gmail.com">Email</a>
              <a href="https://www.linkedin.com/africsis" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://www.stumbleupon.com/login" target="_blank" rel="noreferrer">StumbleUpon</a>
              <a href="https://twitter.com/africsis" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AFRICSIS</span>
          <span>Science for Peace</span>
        </div>
      </div>
    </footer>
  );
}