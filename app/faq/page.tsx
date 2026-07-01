'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import faqData from '@/data/faq-page.json'

export default function FaqPage() {
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(-1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return (faqData as any).items
    return (faqData as any).items.filter(
      (item: any) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    )
  }, [query])

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  return (
    <>
      <style>{`
        .faq-hero{padding:140px 32px 40px;text-align:center;max-width:760px}
        .faq-hero .tag{margin-bottom:16px}
        .faq-hero .section-title{margin-bottom:16px}
        .faq-hero p{font-size:17px;color:var(--ink-soft);line-height:1.6;margin:0 auto 28px;max-width:560px}
        .faq-search input{font-family:var(--sans);font-size:16px;padding:16px 24px;border:1px solid var(--border);border-radius:999px;background:var(--bg-card);width:100%;max-width:480px;outline:none;transition:border-color 0.2s}
        .faq-search input:focus{border-color:var(--accent)}
        .faq-list-full{max-width:820px;margin:0 auto}
        .faq-noresults{text-align:center;color:var(--ink-soft);padding:48px 0}
        @media(max-width:640px){.faq-hero{padding-top:110px}}
      `}</style>

      <header className="container faq-hero">
        <h1 className="section-title">{(faqData as any).title}</h1>
        <p>{(faqData as any).subtitle}</p>
        <div className="faq-search">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            type="search"
            placeholder={(faqData as any).searchPlaceholder}
          />
        </div>
      </header>

      <section className="section container">
        {filtered.length === 0 ? (
          <p className="faq-noresults">{(faqData as any).noResults}</p>
        ) : (
          <div className="faq-list faq-list-full">
            {filtered.map((item: any, i: number) => (
              <button
                key={i}
                className={`faq-item${openFaq === i ? ' open' : ''}`}
                onClick={() => toggleFaq(i)}
                aria-expanded={openFaq === i}
              >
                <span className="faq-q">{item.question}</span>
                <span className="faq-toggle-circle" aria-hidden="true" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
                {openFaq === i && <p className="faq-a">{item.answer}</p>}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="cta-warm-wrap">
        <div className="cta-warm">
          <span className="cta-tag">Still have questions?</span>
          <h2>We&apos;re ready to <em>help</em></h2>
          <p>Can&apos;t find what you&apos;re looking for? Our team responds within 24 hours.</p>
          <div className="cta-warm-buttons">
            <Link href="/contact" className="btn-primary">
              Contact our team <span className="arrow">→</span>
            </Link>
            <Link href="/blog" className="btn-secondary">Read the blog</Link>
          </div>
        </div>
      </section>
    </>
  )
}
