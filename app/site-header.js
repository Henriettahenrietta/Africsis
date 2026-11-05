'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Impact', href: '/#impact' },
  { label: 'Insights', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <Link href="/" className="brand-block" onClick={closeMenu}>
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

        <button
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="site-navigation" className={`nav-content${menuOpen ? ' is-open' : ''}`}>
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.label} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="nav-cta">
            <Link href="/contact" className="btn btn-secondary" onClick={closeMenu}>Partner</Link>
            <Link href="/donate" className="btn btn-primary" onClick={closeMenu}>Donate</Link>
          </div>
        </div>
      </div>
    </header>
  );
}