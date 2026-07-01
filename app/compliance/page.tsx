'use client'

import { useState } from 'react'
import Link from 'next/link'
import GlobalCTA from '@/components/sections/GlobalCTA'
import compliance from '@/data/compliance.json'
import { DollarSign, Scale, AlertTriangle, TrendingDown } from 'lucide-react'

const icons = {
  DollarSign,
  Scale,
  AlertTriangle,
  TrendingDown
}

export default function CompliancePage() {
  const [openFaq, setOpenFaq] = useState(0)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  const trustAvatars = [
    '/testimonials/lina.jpg',
    '/testimonials/Anya.jpg',
    '/testimonials/priya.jpg',
  ]

  const getIcon = (iconName: string) => icons[iconName as keyof typeof icons] || (() => null)

  return (
    <>
      <style>{`
@import '@/styles/service-page.css';

.compliance-hero {
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
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 75%) 40%, rgb(14 15 59 / 17%) 70%, transparent 100%), url(/compliance-hero-bg.png);  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: 700px;
  overflow: hidden;
  margin-bottom: 40px;

  padding-inline: clamp(32px, 8vw, 96px);}

.compliance-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.compliance-hero > * {
  position: relative;
  z-index: 1;
}

.compliance-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding-inline: clamp(32px, 8vw, 96px);
}

.compliance-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.compliance-hero .tag {
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

.compliance-hero h1 {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 24px;
  color: #ffffff;
}

.compliance-hero .service-hero-copy h1 em {
  color: var(--accent-warm, #F7931E);
}

.compliance-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.compliance-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.compliance-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow: none;
}

.compliance-hero .hero-feature-check {
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
  box-shadow: 0 0 12px rgba(9, 64, 123, 0.2);
}

.compliance-hero .cta-row {
  margin-top: 40px;
}

.compliance-hero .btn-primary {
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

.compliance-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.compliance-hero .btn-secondary {
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

.compliance-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

.compliance-hero .trust-row {
  margin-top: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.compliance-hero .trust-text {
  color: rgba(255, 255, 255, 0.85);
}

.compliance-hero .avatar {
  border-color: #fdfbf7;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

@media (max-width: 960px) {
  .compliance-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url(/services/service-page/compliances.webp);
  
  padding-inline: clamp(32px, 8vw, 96px);}
}

@media (max-width: 640px) {
  .compliance-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
  
  padding-inline: clamp(32px, 8vw, 96px);}
  .compliance-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/compliances.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .compliance-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .compliance-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .compliance-hero .btn-primary,
  .compliance-hero .btn-secondary {
    justify-content: center;
  }
}
  .compliance-hero-inner {
    padding-left: 0;
    padding-right: 0;
  }
  .compliance-hero .service-hero-copy h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .compliance-hero .cta-row {
    flex-direction: row;
    gap: 16px;
  }
  .compliance-hero .btn-primary,
  .compliance-hero .btn-secondary {
   
    justify-content: center;
  }


/* Compliance-specific tweaks */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}
.service-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px 32px;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  font-style: normal;
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
  flex-grow: 1;
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
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
  position: relative;
  z-index: 1;
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

/* Coverage strip */
.coverage-strip {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 100px 0;
}
.coverage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}
.coverage-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
}
.coverage-mark {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 16px;
  margin-bottom: 16px;
}
.coverage-card h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 16px;
}
.coverage-card ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.coverage-card li {
  font-size: 14px;
  color: var(--ink-soft);
  display: flex;
  gap: 10px;
  line-height: 1.5;
}
.li-check {
  color: var(--accent);
  flex-shrink: 0;
}
.coverage-guarantee {
  background: var(--accent);
  color: var(--bg);
  padding: 28px 36px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  gap: 24px;
}
.coverage-guarantee .tag { color: var(--accent-warm); margin: 0; }
.coverage-guarantee p {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  margin: 0;
  line-height: 1.4;
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

/* Risks */
.risks-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  margin-top: 48px;
}
.risk-card {
  background: #ffffff;
  border: 1px solid rgba(9, 64, 123, 0.15);
  border-radius: var(--radius-lg);
  padding: 40px 32px 32px;
  box-shadow: 0 16px 32px rgba(9, 64, 123, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}
.risk-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.08);
}
.risk-pill {
  position: absolute;
  top: -14px;
  left: 32px;
  background: #e63946;
  color: #ffffff;
  font-size: 13px;
  letter-spacing: 0.02em;
  padding: 6px 16px;
  border-radius: 999px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.25);
}
.risk-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(230, 57, 70, 0.08);
  border-radius: 12px;
  margin-bottom: 24px;
}
.risk-icon {
  width: 28px;
  height: 28px;
  color: #e63946;
}
.risk-card h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 14px;
  color: var(--ink);
}
.risk-card p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  flex-grow: 1;
}
.risk-footer {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(9, 64, 123, 0.15);
}
.risk-footer-text {
  font-size: 13px;
  font-weight: 600;
  color: #e63946;
  letter-spacing: 0.05em;
}

/* EOR bridge */
.eor-bridge {
  border-top: 1px solid rgba(9, 64, 123, 0.15);
  border-bottom: 1px solid rgba(9, 64, 123, 0.15);
  padding: 100px 0;
}
.eor-bridge .tag { 
  color: var(--accent);
  background: rgba(9, 64, 123, 0.1);
  border: 1px solid rgba(9, 64, 123, 0.2);
}
.eor-bridge .section-title { color: var(--ink); }
.eor-bridge .section-title em { color: var(--accent); }
.eor-bridge .section-lead { color: var(--ink-soft); }
.eor-bridge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}
.eor-bridge-card {
  background: #ffffff;
  border: 1px solid rgba(9, 64, 123, 0.18);
  box-shadow: 0 16px 32px rgba(9, 64, 123, 0.04);
  border-radius: var(--radius-lg);
  padding: 36px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.eor-bridge-card:hover {
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.08);
  transform: translateY(-2px);
}
.eor-bridge-mark {
  display: inline-block;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(22px, 4vw, 36px);
  color: var(--accent);
  margin-bottom: 16px;
}
.eor-bridge-card h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 12px;
  color: var(--ink);
}
.eor-bridge-card p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
}
.eor-bridge-cta {
  text-align: center;
}
.eor-bridge-cta .btn-primary {
  background: var(--accent);
  color: #ffffff;
}
.eor-bridge-cta .btn-primary:hover {
  background: #e07d10;
}

@media (max-width: 1024px) {
  .services-grid,
  .how-grid-4,
  .coverage-grid,
  .risks-grid,
  .eor-bridge-grid {
    grid-template-columns: 1fr;
  }
  .coverage-guarantee {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
`}</style>

      <header className="service-hero compliance-hero">
        <div className="compliance-hero-inner">
          <div className="service-hero-copy">
            <h1>
              Stay <em>compliant</em>,<br />everywhere
            </h1>
            <p className="service-hero-lede">{compliance.definition.description}</p>
            <ul className="service-hero-features">
              {compliance.definition.keyFeatures.map((f: string, i: number) => (
                <li key={i} className="hero-feature">
                  <span className="hero-feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="cta-row">
              <Link href="/contact?reason=compliance_questions" className="btn-primary">
                {compliance.definition.primaryButtonText} <span className="arrow">→</span>
              </Link>
              <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {compliance.definition.secondaryButtonText}
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
                <strong>99.9%</strong> compliance rate across 160+ countries
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="section container">
        <div className="definition-block">
          <div>
            <h2 className="section-title">{compliance.mainDescription.title}</h2>
          </div>
          <div className="definition-text">
            <p>{compliance.mainDescription.description}</p>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-strip-inner">
          {compliance.definition.trustSignals.stats.map((s: any, i: number) => (
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
          <h2 className="section-title">{compliance.services.title}</h2>
          {compliance.services.description && (
            <p className="section-lead">
              {compliance.services.description}
            </p>
          )}
        </div>
        <div className="services-grid">
          {compliance.services.items.map((svc: any, i: number) => (
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

      <section className="coverage-strip">
        <div className="container">
          <div className="section-head">
            <span className="tag">{compliance.coverage.subtitle}</span>
            <h2 className="section-title">{compliance.coverage.title}</h2>
            <p className="section-lead">{compliance.coverage.description}</p>
          </div>
          <div className="coverage-grid">
            {compliance.coverage.categories.map((cat: any) => (
              <div key={cat.category} className="coverage-card">
                <span className="coverage-mark" aria-hidden>
                  {cat.category.includes('Employment') && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>}
                  {cat.category.includes('Tax') && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg>}
                  {cat.category.includes('Benefit') && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>}
                  {cat.category.includes('Regulat') && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>}
                  {!cat.category.includes('Employment') && !cat.category.includes('Tax') && !cat.category.includes('Benefit') && !cat.category.includes('Regulat') && <span>◆</span>}
                </span>
                <h3>{cat.category}</h3>
                <ul>
                  {cat.items.map((item: string) => (
                    <li key={item}>
                      <span className="li-check" aria-hidden>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="coverage-guarantee">
            <p>{compliance.coverage.guarantee}</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="section-title">{compliance.process.title}</h2>
          {compliance.process.description && (
            <p className="section-lead">
              {compliance.process.description}
            </p>
          )}
        </div>
        <div className="how-grid how-grid-4">
          {compliance.process.steps.map((step: any) => (
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
        <div className="section-head">
          <span className="tag">{compliance.risks.subtitle}</span>
          <h2 className="section-title">{compliance.risks.title}</h2>
          <p className="section-lead">{compliance.risks.description}</p>
        </div>
        <div className="risks-grid">
          {compliance.risks.risks.map((risk: any) => {
            const Icon = getIcon(risk.icon)
            return (
              <div key={risk.title} className="risk-card">
                <span className="risk-pill">{risk.impact}</span>
                
                <div className="risk-icon-wrapper">
                  {Icon && <Icon className="risk-icon" />}
                </div>
                
                <h3>{risk.title}</h3>
                <p>{risk.description}</p>
                
                <div className="risk-footer">
                  <span className="risk-footer-text">IMPACT: {risk.impact.toUpperCase()}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="eor-bridge">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">{compliance.eorBridge.title}</h2>
            <p className="section-lead">{compliance.eorBridge.description}</p>
          </div>
          <div className="eor-bridge-grid">
            {compliance.eorBridge.benefits.map((b: any, i: number) => (
              <div key={i} className="eor-bridge-card">
                <div className="eor-bridge-mark">
                  {b.icon === 'Shield' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
                  {b.icon === 'CheckCircle2' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M9 12l2 2 4-4"></path></svg>}
                  {b.icon === 'Users' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                  {b.icon === 'Eye' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>}
                  {b.icon !== 'Shield' && b.icon !== 'CheckCircle2' && b.icon !== 'Users' && b.icon !== 'Eye' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>}
                </div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
          <div className="eor-bridge-cta">
            <Link href="/employer-of-record" className="btn-primary">
              Explore EOR services <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="faq-block">
          <div className="faq-head">
            <h2 className="section-title">{compliance.faqs.title}</h2>
          </div>
          <div className="faq-list">
            {compliance.faqs.items.map((item: any, i: number) => (
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

      <GlobalCTA title="Ready to ensure full compliance?" />
    </>
  )
}
