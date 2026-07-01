'use client'

import { useState } from 'react'
import Link from 'next/link'
import GlobalCTA from '@/components/sections/GlobalCTA'
import contractor from '@/data/contractor.json'

export default function ContractorPage() {
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

/* ============================================================
   HERO
   ============================================================ */
.contractor-hero {
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
    box-sizing: border-box;
    padding: 20px 0 96px;
    display: block;
  background-color: #0E0F3B;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 81%) 40%, rgb(14 15 59 / 34%) 70%, #00000021 100%), url(/services/service-page/contractor-hero.png);
  background-size: cover;
    background-position: center right;
    background-repeat: no-repeat;
    color: #ffffff;
    min-height: 700px;
    overflow: hidden;
    margin-bottom: 40px;

  padding-inline: clamp(32px, 8vw, 96px);}

.contractor-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.contractor-hero > * {
  position: relative;
  z-index: 1;
}

.contractor-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding-inline: clamp(32px, 8vw, 96px);
}

.contractor-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.contractor-hero .tag {
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

.contractor-hero h1 {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 24px;
  color: #ffffff;
}

.contractor-hero h1 em {
  font-style: italic;
  color: var(--accent-warm, #F7931E);
}

.contractor-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.contractor-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.contractor-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.contractor-hero .hero-feature-check,
.contractor-hero .hero-feature-dot {
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

.contractor-hero .hero-feature-check::after,
.contractor-hero .hero-feature-dot::after {
  content: '✓';
}

.contractor-hero .cta-row {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.contractor-hero .btn-primary {
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

.contractor-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.contractor-hero .btn-secondary {
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

.contractor-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

.contractor-hero .trust-row {
  margin-top: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.contractor-hero .avatars {
  display: flex;
}

.contractor-hero .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-size: cover;
  background-position: center;
  margin-left: -8px;
}

.contractor-hero .avatar:first-child {
  margin-left: 0;
}

.contractor-hero .trust-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

@media (max-width: 960px) {
  .contractor-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url(/services/service-page/contract.webp);
  
  padding-inline: clamp(32px, 8vw, 96px);}
}

@media (max-width: 640px) {
  .contractor-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
  
  padding-inline: clamp(32px, 8vw, 96px);}
  .contractor-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/contract.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .contractor-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .contractor-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .contractor-hero .btn-primary,
  .contractor-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* Benefits cards (3-col) */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.benefit-card {
  background: var(--bg-card, #ffffff);
  border: 1px solid var(--border, rgba(9, 64, 123, 0.12));
  border-radius: var(--radius-lg, 16px);
  padding: 36px 32px;
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.05);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
  position: relative;
  overflow: hidden;
}
.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 50px rgba(9, 64, 123, 0.1);
}
.benefit-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent, #09407B);
  color: #ffffff;
  font-family: var(--serif, serif);
  font-style: italic;
  font-size: 20px;
  margin-bottom: 22px;
}
.benefit-card h3 {
  font-family: var(--serif, serif);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 14px;
  color: var(--ink, #0E0F3B);
}
.benefit-card p {
  font-size: 15px;
  color: var(--ink-soft, rgba(14, 15, 59, 0.7));
  line-height: 1.75;
}

/* Solutions split: Management (light) vs Compliance (dark) */
.solutions-strip {
  background: var(--bg-card, #ffffff);
  border-top: 1px solid var(--border, rgba(9, 64, 123, 0.12));
  border-bottom: 1px solid var(--border, rgba(9, 64, 123, 0.12));
  padding: 100px 0;
}
.solutions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.solution-block {
  background: #ffffff;
  border: 1px solid rgba(9, 64, 123, 0.14);
  box-shadow: 0 16px 32px rgba(9, 64, 123, 0.04);
  border-radius: var(--radius-lg, 16px);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.solution-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.08);
}
.solution-block.solution-block-dark {
  background: #0E0F3B; /* Deep Navy to match the brand theme */
  color: #ffffff;
  border-color: #0E0F3B;
  box-shadow: 0 16px 32px rgba(14, 15, 59, 0.15);
}
.solution-tag {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent, #09407B);
  margin-bottom: 12px;
  font-weight: 700;
}
.solution-block-dark .solution-tag {
  color: var(--accent-warm, #F7931E); /* Orange highlight */
}
.solution-head h3 {
  font-family: var(--serif, serif);
  font-size: clamp(26px, 2.6vw, 36px);
  font-weight: 400;
  line-height: 1.15;
  margin-bottom: 12px;
  color: var(--ink, #0E0F3B);
}
.solution-block-dark .solution-head h3 {
  color: #ffffff;
}
.solution-head p {
  font-size: 14px;
  color: var(--ink-soft, rgba(14, 15, 59, 0.7));
  line-height: 1.6;
}
.solution-block-dark .solution-head p {
  color: rgba(255, 255, 255, 0.7);
}
.solution-block ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid var(--border, rgba(9, 64, 123, 0.12));
  padding-top: 24px;
}
.solution-block-dark ul {
  border-top-color: rgba(255, 255, 255, 0.1);
}
.solution-block li {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 12px;
}
.li-check {
  color: var(--accent, #09407B);
  font-weight: 600;
  margin-top: 1px;
}
.solution-block-dark .li-check {
  color: var(--accent-warm, #F7931E); /* Orange checkmark on dark */
}
.solution-block li strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  color: var(--ink, #0E0F3B);
}
.solution-block-dark li strong {
  color: #ffffff;
}
.solution-block li span {
  font-size: 13px;
  color: var(--ink-soft, rgba(14, 15, 59, 0.7));
  line-height: 1.5;
}
.solution-block-dark li span {
  color: rgba(255, 255, 255, 0.65);
}

@media (max-width: 1024px) {
  .benefits-grid,
  .solutions-grid {
    grid-template-columns: 1fr;
  }
}
`}</style>

      <header className="service-hero contractor-hero">
        <div className="contractor-hero-inner">
          <div className="service-hero-copy">
            <h1>
              Global <em>contractors</em>,<br />compliantly managed
            </h1>
            <p className="service-hero-lede">{contractor.definition.description}</p>
            <div className="service-hero-features">
              {contractor.definition.keyFeatures.map((f: string, i: number) => (
                <div key={i} className="hero-feature">
                  <span className="hero-feature-dot" />
                  {f}
                </div>
              ))}
            </div>
            <div className="cta-row">
              <Link href="/contact?reason=contractor_management" className="btn-primary">
                {contractor.definition.primaryButtonText} <span className="arrow">→</span>
              </Link>
              <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {contractor.definition.secondaryButtonText.trim()}
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
                Pay contractors in <strong>50+</strong> currencies, across 80+ countries
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="section container">
        <div className="definition-block">
          <div>
            <h2 className="section-title">{contractor.mainDescription.title}</h2>
          </div>
          <div className="definition-text">
            <p>{contractor.mainDescription.description}</p>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-strip-inner">
          {contractor.definition.trustSignals.stats.map((s: any, i: number) => (
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
          <h2 className="section-title">{contractor.benefits.title}</h2>
          <p className="section-lead">{contractor.benefits.subtitle}</p>
        </div>
        <div className="benefits-grid">
          {contractor.benefits.items.map((b: any, i: number) => (
            <div key={i} className="benefit-card">
              <span className="benefit-mark">{String(i + 1).padStart(2, '0')}</span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="solutions-strip">
        <div className="container">
          <div className="section-head">
            <span className="tag">{contractor.solutions.subtitle}</span>
            <h2 className="section-title">{contractor.solutions.title}</h2>
            <p className="section-lead">{contractor.solutions.description}</p>
          </div>
          <div className="solutions-grid">
            <div className="solution-block">
              <div className="solution-head">
                <span className="solution-tag">Management</span>
                <h3>{contractor.solutions.management.title}</h3>
                <p>{contractor.solutions.management.description}</p>
              </div>
              <ul>
                {contractor.solutions.management.items.map((item: any) => (
                  <li key={item.title}>
                    <span className="li-check" aria-hidden>✓</span>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="solution-block solution-block-dark">
              <div className="solution-head">
                <span className="solution-tag">Compliance</span>
                <h3>{contractor.solutions.compliance.title}</h3>
                <p>{contractor.solutions.compliance.description}</p>
              </div>
              <ul>
                {contractor.solutions.compliance.items.map((item: any) => (
                  <li key={item.title}>
                    <span className="li-check" aria-hidden>✓</span>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="faq-block">
          <div className="faq-head">
            <h2 className="section-title">{contractor.faqs.title}</h2>
            {contractor.faqs.subtitle && <p className="section-lead">{contractor.faqs.subtitle}</p>}
          </div>
          <div className="faq-list">
            {contractor.faqs.items.map((item: any, i: number) => (
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

      <GlobalCTA title="Ready to simplify contractor management?" />
    </>
  )
}
