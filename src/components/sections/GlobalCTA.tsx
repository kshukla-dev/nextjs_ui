import Link from 'next/link'

interface Props {
  title: string
}

export default function GlobalCTA({ title }: Props) {
  return (
    <>
      <style>{`
        .eor-container{max-width:1440px;margin:0 auto;padding-inline:clamp(32px,8vw,96px)}
        .eor-container2{max-width:1200px;margin:0 auto}
        .cta-banner{color:var(--ink,#061639);text-align:center;padding:72px 30px 42px;border-radius:28px;margin:80px auto 64px;border:1px solid rgba(20,51,105,0.24);box-shadow:0 28px 90px rgba(20,51,105,0.14);position:relative;overflow:hidden}
        .eor-cta-section{padding-top:30px}
        .cta-top-copy{max-width:840px;margin:0 auto 42px}
        .cta-banner h2{color:var(--ink,#061639);font-family:var(--serif);font-size:clamp(26px,4vw,44px);margin-bottom:16px;letter-spacing:-0.03em}
        .cta-banner p{color:var(--gh-on-surface-variant,#4a4d57);font-size:18px;margin:0;line-height:1.75}
        .cta-eyebrow-wrapper{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:20px}
        .cta-eyebrow-line{height:1px;flex:1;background:#e5e7eb;max-width:80px;min-width:30px}
        .cta-eyebrow-text{font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:0.18em;color:#143369;text-transform:uppercase}
        .cta-top-copy p span.gold-text{color:#143369;font-weight:700}
        .cta-feature-grid-redesigned{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin:48px auto;max-width:1180px}
        .cta-card-new{background:#ffffff87;border:1px solid rgba(20,51,105,0.12);border-radius:16px;padding:36px 24px;display:flex;flex-direction:column;align-items:center;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.015);transition:transform 0.3s ease,box-shadow 0.3s ease}
        .cta-card-new:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(20,51,105,0.08)}
        .cta-icon-circle{width:52px;height:52px;border-radius:50%;background:var(--accent-soft);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:#143369;margin-bottom:20px;flex-shrink:0}
        .cta-card-new h3{font-family:var(--serif);font-size:28px;color:#061639;font-weight:500;margin:0 0 6px 0 !important;line-height:1.1}
        .cta-card-subtitle{font-family:var(--sans);font-size:11px;text-transform:uppercase;color:#143369;letter-spacing:0.08em}
        .cta-card-divider{width:30px;height:1.5px;background:#e5e7eb;margin:16px auto}
        .cta-card-new p{font-family:var(--sans);font-size:13.5px;color:#666;line-height:1.5;margin:0}
        .cta-actions-redesigned{display:flex;justify-content:center;gap:16px}
        .btn-cta-gold{display:inline-flex;align-items:center;gap:10px;background:#143369;color:#fff;border-radius:99px;padding:15px 32px;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.2s ease;box-shadow:0 8px 20px rgba(20,51,105,0.25)}
        .btn-cta-gold:hover{background:#0c2145;transform:translateY(-1px);box-shadow:0 10px 24px rgba(20,51,105,0.35)}
        .btn-cta-outline{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #e5e7eb;color:#143369;border-radius:99px;padding:13.5px 32px;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.2s ease}
        .btn-cta-outline:hover{background:var(--accent-soft);border-color:#143369;transform:translateY(-1px)}
        .cta-lock-footer{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:13px;color:#777;margin-top:36px}
        .cta-lock-footer .lock-icon{color:#143369}
        @media(max-width:1024px){.cta-feature-grid-redesigned{grid-template-columns:repeat(2,1fr);gap:20px}}
        @media(max-width:640px){.cta-banner{padding:40px 16px 30px}.cta-banner h2{font-size:clamp(22px,4vw,32px)}.cta-feature-grid-redesigned{grid-template-columns:1fr 1fr;gap:12px}.cta-card-new{padding:16px 12px}.cta-icon-circle{width:36px;height:36px;margin-bottom:10px}.cta-card-new h3{font-size:20px}.cta-card-new p{font-size:12px}.cta-card-divider{margin:8px auto}.cta-actions-redesigned{flex-direction:column;gap:12px;align-items:center}.btn-cta-gold,.btn-cta-outline{width:100%;justify-content:center;max-width:320px}}
      `}</style>
      <section className="eor-container eor-cta-section">
        <div className="cta-banner eor-container2 cta-hiring-panel">
          <div className="cta-top-copy">
            <div className="cta-eyebrow-wrapper">
              <span className="cta-eyebrow-line"></span>
              <span className="cta-eyebrow-text">READY TO EXPAND GLOBALLY?</span>
              <span className="cta-eyebrow-line"></span>
            </div>
            <h2>{title}</h2>
            <p>700+ companies use us for international payroll and employment compliance. <br />Most first hires go live in <span className="gold-text">48–72 hours.</span></p>
          </div>
          <div className="cta-feature-grid-redesigned">
            {/* Card 1 */}
            <div className="cta-card-new">
              <div className="cta-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3>48–72h</h3>
              <span className="cta-card-subtitle">Go Live</span>
              <span className="cta-card-divider"></span>
              <p>Average time to onboard and go live.</p>
            </div>
            {/* Card 2 */}
            <div className="cta-card-new">
              <div className="cta-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h3>80+</h3>
              <span className="cta-card-subtitle">Countries</span>
              <span className="cta-card-divider"></span>
              <p>Hire anywhere in the world without setting up entities.</p>
            </div>
            {/* Card 3 */}
            <div className="cta-card-new">
              <div className="cta-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3>99.5%</h3>
              <span className="cta-card-subtitle">Compliance</span>
              <span className="cta-card-divider"></span>
              <p>Stay compliant with local laws and regulations.</p>
            </div>
            {/* Card 4 */}
            <div className="cta-card-new">
              <div className="cta-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3>1,000+</h3>
              <span className="cta-card-subtitle">Employees Managed</span>
              <span className="cta-card-divider"></span>
              <p>Trusted by growing businesses worldwide.</p>
            </div>
          </div>
          <div className="cta-actions-redesigned">
            <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-cta-gold">Book a Call <span className="arrow">→</span></a>
            <Link href="/contact" className="btn-cta-outline">Start Hiring in Days <span className="arrow">→</span></Link>
          </div>
          <div className="cta-lock-footer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lock-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Your information is secure and confidential.</span>
          </div>
        </div>
      </section>
    </>
  )
}
