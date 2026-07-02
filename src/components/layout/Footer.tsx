'use client'
import Link from 'next/link'

const company = [
  { name: 'About us', href: '/about-us' },
  { name: 'Services', href: '/employer-of-record' },
  { name: 'Career', href: '/career' },
]
const services = [
  { name: 'Employer of record', href: '/employer-of-record' },
  { name: 'Immigration', href: '/immigration' },
  { name: 'Payroll', href: '/payroll' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'Contractor', href: '/contractor' },
]
const resources = [
  { name: 'Blog', href: '/blog' },
  { name: 'Success stories', href: '/case-studies' },
  { name: 'Global hiring guide', href: '/global-hiring-guide' },
  { name: 'Press release', href: '/resources/events/china-europe-2026' },
  { name: 'FAQs', href: '/faq' },
]
const year = new Date().getFullYear()

export default function Footer() {
  return (
    <>
      <style>{`
        /* ============================================================
           FOOTER BASE
           ============================================================ */
        .jf-footer {
          background-color: #0E0F3B;
          color: rgba(255, 255, 255, 0.8);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 56px 0 24px;
          font-family: var(--sans, 'DM Sans', sans-serif);
          margin-top: 60px;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: clamp(32px, 8vw, 96px);
        }

        .footer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 32px 0;
        }

        /* ============================================================
           TOP SECTION
           ============================================================ */
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          flex-wrap: wrap;
        }

        .footer-brand-section {
          flex: 1;
          min-width: 300px;
          max-width: 460px;
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          margin-bottom: 24px;
          text-decoration: none;
        }

        .footer-logo-img {
          height: 38px;
          width: auto;
          display: block;
          filter: brightness(0) invert(1);
        }

        .footer-desc {
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .footer-checks {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-checks li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .footer-checks svg.check-icon {
          width: 20px;
          height: 20px;
          color: #e8eef9;
          flex-shrink: 0;
        }

        /* ============================================================
           NEWSLETTER
           ============================================================ */
        .footer-newsletter {
          flex: 0 1 400px;
          background: var(--accent-soft);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .footer-newsletter h3 {
          font-family: var(--serif, serif);
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 12px;
        }

        .footer-newsletter p {
          font-size: 14px;
          color: var(--ink-muted);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .input-wrap {
          position: relative;
          margin-bottom: 16px;
        }

        .input-wrap input {
          width: 100%;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 14px 16px;
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: all 0.2s;
        }

        .input-wrap input:focus {
          border-color: var(--accent);
          background: var(--bg);
        }

        .input-wrap .mail-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: var(--ink-muted);
        }

        .btn-subscribe {
          width: 100%;
          background: var(--accent);
          color: var(--btn-text);
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-subscribe:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .btn-subscribe svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }

        .btn-subscribe:hover svg {
          transform: translateX(4px);
        }

        /* ============================================================
           LINKS GRID
           ============================================================ */
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .fl-col {
          display: flex;
          flex-direction: column;
        }

        .fl-col h4 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .fl-col a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 13px;
          margin-bottom: 12px;
          transition: color 0.2s;
        }

        .fl-col a:hover {
          color: #7FCDEE;
        }

        /* ============================================================
           CONTACT COLUMN
           ============================================================ */
        .contact-col {
          gap: 0;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 13px;
          margin-bottom: 16px;
          transition: color 0.2s;
        }

        .contact-link:hover {
          color: #7FCDEE;
        }

        .contact-link svg {
          width: 16px;
          height: 16px;
          color: #7FCDEE;
          flex-shrink: 0;
        }

        .contact-link.location {
          align-items: flex-start;
          line-height: 1.5;
        }

        /* ============================================================
           TRUST SECTION
           ============================================================ */
        .footer-trust {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 40px;
          margin-top: 1rem;
        }

        .trust-companies {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding-right: 40px;
        }

        .trust-certs {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .trust-title {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .trust-logos {
          display: flex;
          align-items: center;
          gap: 25px;
          flex-wrap: wrap;
        }

        .mock-logo {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
          font-family: var(--sans);
          letter-spacing: -0.5px;
          transition: color 0.2s;
        }

        .mock-logo:hover {
          color: #7FCDEE;
        }

        .mock-logo svg {
          color: inherit;
        }

        .mock-cert {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.2s;
        }

        .mock-cert:hover {
          color: #7FCDEE;
        }

        /* ============================================================
           BOTTOM BAR
           ============================================================ */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--ink-muted);
          flex-wrap: wrap;
          gap: 20px;
        }

        .fb-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .fb-right a {
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .fb-right a:hover {
          color: var(--accent);
        }

        .fb-sep {
          color: var(--border);
        }

        .fb-social {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: 16px;
        }

        .fb-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          transition: all 0.2s;
        }

        .fb-social a:hover {
          background: var(--accent);
          color: white;
          transform: translateY(-2px);
          opacity: 0.85;
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 1200px) {
          .footer-newsletter {
            flex: 1;
            min-width: 260px;
          }
        }

        @media (max-width: 992px) {
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .contact-col {
            grid-column: 1 / -1;
            margin-top: 20px;
          }
          .trust-companies {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--border);
            padding-bottom: 28px;
          }
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            gap: 28px;
          }
          .footer-newsletter {
            width: 100%;
            padding: 20px;
          }
          .footer-links-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .footer-trust {
            flex-direction: column;
            gap: 24px;
            padding: 24px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .fb-right {
            flex-wrap: wrap;
            width: 100%;
          }
          .fb-social {
            margin-left: 0;
          }
        }

        @media (max-width: 480px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .footer-container {
            padding: 0 16px;
          }
          .footer-logo {
            gap: 10px;
          }
          .footer-desc {
            margin-bottom: 24px;
          }
          .footer-newsletter {
            padding: 18px;
          }
          .trust-logos {
            gap: 14px;
          }
          .mock-logo {
            font-size: 15px;
          }
          .footer-checks {
            gap: 12px;
          }
          .footer-divider {
            margin: 24px 0;
          }
          .fl-col h4 {
            margin-bottom: 12px;
            font-size: 14px;
          }
          .fl-col a {
            margin-bottom: 8px;
            font-size: 13px;
          }
        }
      `}</style>
      <footer className="jf-footer">
        <div className="container footer-container">

          {/* TOP SECTION */}
          <div className="footer-top">
            <div className="footer-brand-section">
              <Link href="/" className="footer-logo" aria-label="Jackson & Frank home">
                <img src="/logo-dark.svg" alt="Jackson & Frank" className="footer-logo-img" />
              </Link>
              <p className="footer-desc">
                Jackson & Frank simplifies global workforce management with compliant, scalable solutions across 160+ countries.
              </p>
              <ul className="footer-checks">
                <li>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="check-icon" stroke="none"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4" stroke="var(--dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"></path></svg>
                  Global Coverage in 160+ countries
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="check-icon" stroke="none"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4" stroke="var(--dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"></path></svg>
                  Compliant with Local Laws
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="check-icon" stroke="none"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4" stroke="var(--dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"></path></svg>
                  Secure &amp; Reliable Platform
                </li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h3>Stay updated</h3>
              <p>Get the latest HR insights, compliance updates, and global hiring trends.</p>
              <div className="newsletter-form">
                <div className="input-wrap">
                  <input type="email" placeholder="Enter your email" />
                  <svg className="mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <button className="btn-subscribe">
                  Subscribe
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          {/* LINKS SECTION */}
          <div className="footer-links-grid">
            <div className="fl-col">
              <h4>Services</h4>
              {services.map(link => <Link key={link.name} href={link.href}>{link.name}</Link>)}
            </div>
            <div className="fl-col">
              <h4>Company</h4>
              {company.map(link => <Link key={link.name} href={link.href}>{link.name}</Link>)}
            </div>

            <div className="fl-col">
              <h4>Resources</h4>
              {resources.map(link => <Link key={link.name} href={link.href}>{link.name}</Link>)}
            </div>
            <div className="fl-col contact-col">
              <h4>Contact Us</h4>
              <a href="mailto:info@jacksonandfrank.com" className="contact-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                info@jacksonandfrank.com
              </a>
              <a href="tel:+31267440024" className="contact-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +31 26 74 40 024
              </a>
              <div className="contact-link location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>Jackson & Frank, Nieuwe Stationsstraat 10,<br />6811 KS Arnhem, The Netherlands</span>
              </div>
            </div>
          </div>

          {/* TRUST SECTION */}
          <div className="footer-trust">
            <div className="trust-companies">
              <span className="trust-title">Trusted by 700+ companies worldwide</span>
              <div className="trust-logos">
                <span className="mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg> Payoneer</span>
                <span className="mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z"></path></svg> airbnb</span>
                <span className="mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Shopify</span>
                <span className="mock-logo">docusign</span>
                <span className="mock-logo"><b>DHL</b></span>
                <span className="mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c2.5-1 6-1 8 0M8 15c2.5-1 6-1 8 0M9 8c2-1 4-1 6 0"></path></svg> Spotify</span>
                <span className="mock-logo"><i>Canva</i></span>
              </div>
            </div>
            <div className="trust-certs">
              <span className="trust-title">Certifications &amp; Compliance</span>
              <div className="trust-logos certs">
                <span className="mock-cert"><svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg> ISO 27001</span>
                <span className="mock-cert"><svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> GDPR</span>
                <span className="mock-cert"><svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> SOC 2</span>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          {/* BOTTOM SECTION */}
          <div className="footer-bottom">
            <div className="fb-left">
              &copy; {year} Jackson &amp; Frank. All rights reserved.
            </div>
            <div className="fb-right">
              <span className="fb-v">v2.0.0</span>
              <span className="fb-sep">|</span>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span className="fb-sep">|</span>
              <Link href="/sitemaps">Sitemap</Link>
              <div className="fb-social">
                <a href="https://www.linkedin.com/company/jacksonandfrank/" target="_blank" rel="noopener noreferrer" aria-label="Jackson & Frank on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="16"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Jackson & Frank on Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="16"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a href="https://www.youtube.com/@JacksonAndFrank" target="_blank" rel="noopener noreferrer" aria-label="Jackson & Frank on YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="16"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}
