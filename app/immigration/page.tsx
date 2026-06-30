'use client'

import { useState } from 'react'
import Link from 'next/link'
import GlobalCTA from '@/components/sections/GlobalCTA'
import immigration from '@/data/immigration.json'

export default function ImmigrationPage() {
  const [openFaq, setOpenFaq] = useState(0)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  const trustAvatars = [
    '/testimonials/lina.jpg',
    '/testimonials/Anya.jpg',
    '/testimonials/priya.jpg',
  ]

  return (
    <>
      <style>{`
@import '@/styles/service-page.css';

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}
.service-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 34px 30px;
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.08);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 50px rgba(9, 64, 123, 0.12);
}
.service-card-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  margin-bottom: 22px;
}
.service-card h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 14px;
  color: var(--ink);
}
.service-card p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.75;
  margin-bottom: 20px;
}
.service-card ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 20px;
  border-top: 1px solid rgba(9, 64, 123, 0.12);
  padding-top: 18px;
  margin-top: 18px;
}
.service-card li {
  font-size: 13px;
  color: var(--ink-soft);
  position: relative;
  padding-left: 22px;
}
.service-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 2px;
  color: var(--accent);
  font-weight: 700;
}

.how-grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.how-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(9, 64, 123, 0.14);
  border-radius: var(--radius-lg);
  padding: 34px 32px;
  box-shadow: 0 18px 40px rgba(9, 64, 123, 0.08);
  position: relative;
  overflow: hidden;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.how-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.12);
}
.how-card::before {
  content: '';
  position: absolute;
  inset: 0;
  left: auto;
  width: 6px;
  background: linear-gradient(180deg, var(--accent), #7FCDEE);
  border-radius: 999px;
}
.how-card-num {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg);
  color: var(--accent);
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  margin-bottom: 18px;
}
.how-card h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 12px;
  color: var(--ink);
  position: relative;
  z-index: 1;
}
.how-card p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.75;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}
.how-card ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
  position: relative;
  z-index: 1;
}
.how-card li {
  font-size: 13px;
  color: var(--ink-soft);
  position: relative;
  padding-left: 20px;
}
.how-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 3px;
  color: var(--accent);
  font-size: 18px;
}

/* EOR bridge */
.eor-bridge {
  color: var(--ink);
  padding: 120px 0;
}
.eor-bridge .section-head {
  max-width: 720px;
  margin-bottom: 42px;
}
.eor-bridge .tag {
  color: var(--accent-warm);
}
.eor-bridge .section-title {
  color: var(--ink);
}
.eor-bridge .section-title em {
  color: var(--accent);
}
.eor-bridge .section-lead {
  color: var(--ink-soft);
  line-height: 1.75;
  max-width: 680px;
}
.eor-bridge-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  margin-bottom: 52px;
}
.eor-bridge-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(9, 64, 123, 0.14);
  border-radius: var(--radius-lg);
  padding: 34px;
  box-shadow: 0 22px 55px rgba(9, 64, 123, 0.08);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.eor-bridge-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 65px rgba(9, 64, 123, 0.12);
}
.eor-bridge-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  color: var(--bg);
  background: var(--accent);
  margin-bottom: 18px;
}
.eor-bridge-card h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 14px;
  color: var(--ink);
}
.eor-bridge-card p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.75;
}
.eor-bridge-cta {
  text-align: center;
}
.eor-bridge-cta .btn-primary {
  background: var(--accent-warm);
  color: var(--bg);
  border: 1px solid transparent;
}
.eor-bridge-cta .btn-primary:hover {
  background: #e07d10;
  color: var(--bg);
}
.eor-bridge-cta .btn-secondary {
  margin-left: 12px;
  border-color: rgba(26, 26, 26, 0.16);
  color: var(--ink);
}
.eor-bridge-cta .btn-secondary:hover {
  background: rgba(26, 26, 26, 0.04);
  color: var(--ink);
}

.immigration-premium-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 88px 0 96px;
  display: block;
  background-color: #0E0F3B;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(20 19 58 / 77%) 40%, rgb(14 15 59 / 39%) 70%, #0000001a 100%), url(/case-study/immigration.png);
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: 700px;
  overflow: hidden;
  margin-bottom: 40px;
}

.immigration-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.immigration-premium-hero > * {
  position: relative;
  z-index: 1;
}

.immigration-premium-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding-inline: clamp(32px, 8vw, 96px);
}

.immigration-premium-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.immigration-premium-hero .tag {
  color: var(--accent-sky, #7FCDEE);
  background: rgba(127, 205, 238, 0.1);
  border: 1px solid rgba(127, 205, 238, 0.2);
  margin-bottom: 24px;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.immigration-premium-hero h1 {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 24px;
  color: #ffffff;
}

.immigration-premium-hero h1 em {
  font-style: italic;
  color: var(--accent-warm, #F7931E);
}

.immigration-premium-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.immigration-premium-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.immigration-premium-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.immigration-premium-hero .hero-feature-check,
.immigration-premium-hero .hero-feature-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(9, 64, 123, 0.15);
  border: 1px solid rgba(9, 64, 123, 0.4);
  color: var(--accent-sky, #7FCDEE);
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.immigration-premium-hero .hero-feature-check::after,
.immigration-premium-hero .hero-feature-dot::after {
  content: '✓';
}

.immigration-premium-hero .cta-row {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.immigration-premium-hero .btn-primary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: var(--accent-warm, #F7931E);
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.35);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.immigration-premium-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.immigration-premium-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.immigration-premium-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

.immigration-premium-hero .trust-row {
  margin-top: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.immigration-premium-hero .avatars {
  display: flex;
}

.immigration-premium-hero .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-size: cover;
  background-position: center;
  margin-left: -8px;
}

.immigration-premium-hero .avatar:first-child {
  margin-left: 0;
}

.immigration-premium-hero .trust-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

@media (max-width: 960px) {
  .immigration-premium-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url(/services/service-page/immigration.webp);
  }
}

@media (max-width: 640px) {
  .immigration-premium-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .immigration-premium-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/immigration.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .immigration-premium-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .immigration-premium-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .immigration-premium-hero .btn-primary,
  .immigration-premium-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 960px) {
  .how-grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .services-grid,
  .eor-bridge-grid,
  .how-grid-4,
  .service-card ul {
    grid-template-columns: 1fr;
  }
  .service-card {
    padding: 24px;
  }
  .how-card {
    padding: 24px;
  }
  .eor-bridge-card {
    padding: 24px;
  }
}
`}</style>

      <header className="service-hero immigration-premium-hero">
        <div className="immigration-premium-hero-inner">
          <div className="service-hero-copy">
            <h1>
              Navigate <em>global immigration</em> with experts
            </h1>
            <p className="service-hero-lede">
              Support your workforce wherever they are with the right visas and work permits to work legally.
            </p>
            <ul className="service-hero-features">
              <li className="hero-feature">
                <span className="hero-feature-check"></span> Fast setup
              </li>
              <li className="hero-feature">
                <span className="hero-feature-check"></span> Global compliance
              </li>
              <li className="hero-feature">
                <span className="hero-feature-check"></span> Local expertise
              </li>
            </ul>
            <div className="cta-row">
              <Link href="/contact?reason=immigration_services" className="btn-primary">
                Start your application <span className="arrow">→</span>
              </Link>
              <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Speak to expert
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </a>
            </div>
            <div className="trust-row">
              <div className="avatars">
                {trustAvatars.map((src: string, i: number) => (
                  <div
                    key={i}
                    className="avatar"
                    style={{ backgroundImage: `url('${src}')` }}
                  />
                ))}
              </div>
              <span className="trust-text">
                <strong>99.5%</strong> visa approval rate across 80+ countries
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="section container">
        <div className="definition-block">
          <div>
            <h2 className="section-title">{immigration.mainDescription.title}</h2>
          </div>
          <div className="definition-text">
            <p>{immigration.mainDescription.description}</p>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-strip-inner">
          {immigration.definition.trustSignals.stats.map((s: any, i: number) => (
            <div key={i} className="stat-item">
              <strong>{s.value}</strong>
              {s.label && <span className="stat-label">{s.label}</span>}
              <span className="stat-desc">{s.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="section-title">{immigration.services.title}</h2>
          {immigration.services.description && (
            <p className="section-lead">
              {immigration.services.description}
            </p>
          )}
        </div>
        <div className="services-grid">
          {immigration.services.items.map((svc: any, i: number) => (
            <div key={i} className="service-card">
              <span className="service-card-num">0{i + 1}</span>
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
              <ul>
                {svc.features.map((f: string) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="section-title">{immigration.process.title}</h2>
          {immigration.process.description && (
            <p className="section-lead">
              {immigration.process.description}
            </p>
          )}
        </div>
        <div className="how-grid how-grid-4">
          {immigration.process.steps.map((step: any) => (
            <div key={step.number} className="how-card">
              <span className="how-card-num">0{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul>
                {step.details.map((d: string) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="eor-bridge">
        <div className="container">
          <div className="section-head">
            <span className="tag">{immigration.eorBridge.subtitle}</span>
            <h2 className="section-title">{immigration.eorBridge.title}</h2>
            <p className="section-lead">{immigration.eorBridge.description}</p>
          </div>
          <div className="eor-bridge-grid">
            {immigration.eorBridge.benefits.map((b: any, i: number) => (
              <div key={i} className="eor-bridge-card">
                <span className="eor-bridge-mark">
                  {b.icon === 'Zap' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>}
                  {b.icon === 'Clock' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                  {b.icon === 'Shield' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
                  {b.icon === 'DollarSign' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                  {b.icon !== 'Zap' && b.icon !== 'Clock' && b.icon !== 'Shield' && b.icon !== 'DollarSign' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>}
                </span>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
          <div className="eor-bridge-cta">
            <Link href={immigration.eorBridge.ctaHref} className="btn-primary">
              {immigration.eorBridge.ctaText} <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="faq-block">
          <div className="faq-head">
            <h2 className="section-title">{immigration.faqs.title}</h2>
          </div>
          <div className="faq-list">
            {immigration.faqs.items.map((item: any, i: number) => (
              <button
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => toggleFaq(i)}
                aria-expanded={openFaq === i}
              >
                <span className="faq-q">{item.question}</span>
                <span className="faq-toggle" aria-hidden>{openFaq === i ? '−' : '+'}</span>
                <p style={{ display: openFaq === i ? 'block' : 'none' }} className="faq-a">{item.answer}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <GlobalCTA title="Ready to streamline your immigration process?" />
    </>
  )
}
