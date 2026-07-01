'use client'

import { useState } from 'react'
import Link from 'next/link'
import GlobalCTA from '@/components/sections/GlobalCTA'
import payroll from '@/data/payroll.json'

export default function PayrollPage() {
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

.payroll-hero {
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
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url('/case-study/payroll-hero.webp');
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: 700px;
  overflow: hidden;
  margin-bottom: 40px;
}

.payroll-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.payroll-hero > * {
  position: relative;
  z-index: 1;
}

.payroll-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding-inline: clamp(32px, 8vw, 96px);
}

.payroll-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.payroll-hero .tag {
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

.payroll-hero h1 {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 24px;
  color: #ffffff;
}

.payroll-hero h1 em {
  font-style: italic;
  color: var(--accent-warm, #F7931E);
}

.payroll-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.payroll-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.payroll-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.payroll-hero .hero-feature-check,
.payroll-hero .hero-feature-dot {
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

.payroll-hero .hero-feature-check::after,
.payroll-hero .hero-feature-dot::after {
  content: '✓';
}

.payroll-hero .cta-row {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.payroll-hero .btn-primary {
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

.payroll-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.payroll-hero .btn-secondary {
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

.payroll-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

.payroll-hero .trust-row {
  margin-top: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.payroll-hero .avatars {
  display: flex;
}

.payroll-hero .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-size: cover;
  background-position: center;
  margin-left: -8px;
}

.payroll-hero .avatar:first-child {
  margin-left: 0;
}

.payroll-hero .trust-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

@media (max-width: 960px) {
  .payroll-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url('https://cdn.craft.cloud/019cb01a-1d95-731f-9bc4-3a2fec394116/assets/images/Z_DELETE/Temp/608c78a14f189da3e50e174bca035c7fbd051996.jpg?fit=cover&format=webp&width=1280&s=cK_YnjDwH_igbP_kzd4CFxjdweGJjgJGK6Vq_7weuxE');
  }
}

@media (max-width: 640px) {
  .payroll-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .payroll-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url('https://cdn.craft.cloud/019cb01a-1d95-731f-9bc4-3a2fec394116/assets/images/Z_DELETE/Temp/608c78a14f189da3e50e174bca035c7fbd051996.jpg?fit=cover&format=webp&width=1280&s=cK_YnjDwH_igbP_kzd4CFxjdweGJjgJGK6Vq_7weuxE');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .payroll-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .payroll-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .payroll-hero .btn-primary,
  .payroll-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* Payroll-specific tweaks */
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
}
.how-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.12);
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

/* ============= PROCESS CARDS ============= */
.process-card {
  padding: 40px 32px 36px;
  border-bottom: 4px solid var(--accent);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card-dots {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 0;
}
.process-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(9, 64, 123, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}
.card-content-wrap {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.process-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
}
.process-card .process-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--ink-soft);
  padding: 0;
}
.process-card .process-list li::before {
  content: none;
}
.process-check {
  flex-shrink: 0;
  margin-top: 1px;
}
/* ============= PREMIUM COMPARISON CARDS ============= */
.section-head.text-center {
  text-align: center;
  margin: 0 auto 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.section-head.text-center .section-lead.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.comparison-grid-2 {
  grid-template-columns: repeat(2, 1fr);
  max-width: 960px;
  margin: 0 auto;
  gap: 32px;
}

.comparison-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 44px 38px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comparison-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.08);
}

.comparison-card.is-featured {
  background: rgba(9, 64, 123, 0.04);
  color: var(--ink);
  border: 1.5px solid var(--accent);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.1);
}

.comparison-card-head h3 {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 12px;
}

.comparison-card-head p {
  font-size: 15px;
  opacity: 0.85;
  line-height: 1.6;
}

.comparison-card ul {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex-grow: 1;
}

.comparison-card li {
  font-size: 15px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.comparison-card .li-mark {
  color: var(--accent);
  font-weight: 700;
  font-size: 18px;
  margin-top: -2px;
}

.comparison-bestfor {
  margin-top: 12px;
  border-top: 1px solid rgba(9, 64, 123, 0.15);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.comparison-card.is-featured .comparison-bestfor {
  border-top: 1px solid rgba(9, 64, 123, 0.3);
}

.comparison-bestfor span {
  font-size: 12px;
  letter-spacing: 0.15em;
  color: var(--accent);
  text-transform: uppercase;
}

.comparison-bestfor strong {
  font-size: 16px;
  font-weight: 500;
}

/* Technology strip */
.tech-strip {
  background: var(--bg);
  padding: 100px 0;
}
.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}
.tech-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
}
.tech-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: 18px;
}
.tech-card h3 {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
  color: var(--ink);
}
.tech-card p {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.55;
}
.tech-benefits .tag { margin-bottom: 16px; }
.tech-benefits-pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.tech-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--ink-soft);
}

@media (max-width: 1024px) {
  .services-grid,
  .how-grid-4,
  .comparison-grid-2,
  .tech-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 640px) {
  .services-grid,
  .how-grid-4,
  .comparison-grid-2,
  .tech-grid {
    grid-template-columns: 1fr;
  }
}
`}</style>

      <header className="service-hero payroll-hero">
        <div className="payroll-hero-inner">
          <div className="service-hero-copy">
            <h1>
              Global <em>payroll</em>,<br />simplified
            </h1>
            <p className="service-hero-lede">
              {payroll.definition.description}
            </p>
            <ul className="service-hero-features">
              {payroll.definition.keyFeatures.map((f: string, i: number) => (
                <li key={i} className="hero-feature">
                  <span className="hero-feature-check"></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="cta-row">
              <Link href="/contact?reason=payroll_services" className="btn-primary">
                {payroll.definition.primaryButtonText} <span className="arrow">→</span>
              </Link>
              <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {payroll.definition.secondaryButtonText}
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
                Processing payroll for <strong>700+</strong> teams worldwide
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="section container">
        <div className="definition-block">
          <div>
            <h2 className="section-title">{payroll.mainDescription.title}</h2>
          </div>
          <div className="definition-text">
            <p>{payroll.mainDescription.description}</p>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-strip-inner">
          {payroll.definition.trustSignals.stats.map((s: any, i: number) => (
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
          <h2 className="section-title">{payroll.services.title}</h2>
          {payroll.services.description && (
            <p className="section-lead">
              {payroll.services.description}
            </p>
          )}
        </div>
        <div className="services-grid">
          {payroll.services.items.map((svc: any, i: number) => (
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
          <h2 className="section-title">{payroll.process.title}</h2>
          {payroll.process.description && (
            <p className="section-lead">
              {payroll.process.description}
            </p>
          )}
        </div>
        <div className="how-grid how-grid-4">
          {payroll.process.steps.map((step: any) => (
            <div key={step.number} className="how-card process-card">
              <svg className="card-dots" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <pattern id="dots-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="rgba(9, 64, 123, 0.15)"></circle>
                </pattern>
                <rect x="0" y="0" width="48" height="48" fill="url(#dots-pattern)"></rect>
              </svg>
              <div className="process-icon-wrap">
                {step.number === 1 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>}
                {step.number === 2 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>}
                {step.number === 3 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>}
                {step.number === 4 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>}
              </div>
              <div className="card-content-wrap">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <ul className="process-list">
                {step.details.map((d: string) => (
                  <li key={d}>
                    <svg className="process-check" width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 11 15 16 9"></polyline></svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head text-center">
           <h2 className="section-title">{payroll.eorComparison.title}</h2>
          <p className="section-lead mx-auto">{payroll.eorComparison.description}</p>
        </div>
        <div className="comparison-grid comparison-grid-2 mx-auto">
          {payroll.eorComparison.options.map((opt: any) => (
            <div
              key={opt.type}
              className={`comparison-card ${opt.type.toLowerCase().includes('employer of record') ? 'is-featured' : ''}`}
            >
              <div className="comparison-card-head">
                <h3>{opt.type}</h3>
                <p>{opt.description}</p>
              </div>
              <ul>
                {opt.features.map((f: string) => (
                  <li key={f}>
                    <span className="li-mark" aria-hidden>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="comparison-bestfor">
                <span>Best for</span>
                <strong>{opt.bestFor}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tech-strip">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">{payroll.technology.title}</h2>
            <p className="section-lead">{payroll.technology.description}</p>
          </div>
          <div className="tech-grid">
            {payroll.technology.features.map((f: any, i: number) => (
              <div key={i} className="tech-card">
                <span className="tech-mark">
                  {f.icon === 'Monitor' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>}
                  {f.icon === 'Zap' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>}
                  {f.icon === 'FileBarChart' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 18v-6"></path><path d="M8 18v-1"></path><path d="M16 18v-3"></path></svg>}
                  {f.icon === 'DollarSign' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                  {f.icon !== 'Monitor' && f.icon !== 'Zap' && f.icon !== 'FileBarChart' && f.icon !== 'DollarSign' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>}
                </span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="tech-benefits">
            <div className="tech-benefits-pills">
              {payroll.technology.benefits.map((b: string) => (
                <span key={b} className="tech-pill">
                  {b === 'Cloud-based platform' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>}
                  {b === 'Mobile app access' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>}
                  {b === 'API integrations' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg>}
                  {b === 'Data security' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>}
                  {b === '24/7 support' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>}
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="faq-block">
          <div className="faq-head">
            <h2 className="section-title">{payroll.faqs.title}</h2>
          </div>
          <div className="faq-list">
            {payroll.faqs.items.map((item: any, i: number) => (
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

      <GlobalCTA title="Ready to streamline your global payroll?" />
    </>
  )
}
