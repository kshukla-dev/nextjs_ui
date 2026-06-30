'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import cc from '@/data/cost-calculator.json'

interface CalcCountry {
  value: string
  label: string
  flag: string
  currency: string
  currencySymbol: string
  incomeTaxRate: number
  employeeSocialSecurityRate: number
  employerSocialSecurityRate: number
  benefitsPercentage: number
  averageBenefits: number
}

export default function CostCalculatorPage() {
  const countries = cc.countries as CalcCountry[]

  const [selectedValue, setSelectedValue] = useState('')
  const [grossSalary, setGrossSalary] = useState<number | ''>('')
  const [benefits, setBenefits] = useState<number | ''>('')

  const selected = useMemo(() => {
    return countries.find((c) => c.value === selectedValue) ?? null
  }, [selectedValue, countries])

  const result = useMemo(() => {
    const c = selected
    const gross = typeof grossSalary === 'number' ? grossSalary : null
    if (!c || !gross || gross <= 0) return null

    const benefitAmount = (typeof benefits === 'number' && benefits > 0) ? benefits : c.averageBenefits
    const incomeTax = gross * c.incomeTaxRate
    const employeeSS = gross * c.employeeSocialSecurityRate
    const employerSS = gross * c.employerSocialSecurityRate
    const totalDeductions = incomeTax + employeeSS
    const netSalary = gross - totalDeductions
    const totalEmployerCost = gross + employerSS + benefitAmount

    return { c, gross, benefitAmount, incomeTax, employeeSS, employerSS, totalDeductions, netSalary, totalEmployerCost }
  }, [selected, grossSalary, benefits])

  function fmt(n: number, symbol: string) {
    return `${symbol}${Math.round(n).toLocaleString('en-US')}`
  }

  return (
    <>
      <style>{`
@import '@/styles/service-page.css';

.cc-hero {
  padding: 140px 32px 40px;
  text-align: center;
  max-width: 760px;
}
.cc-hero .tag { margin-bottom: 16px; }
.cc-hero .section-title { margin-bottom: 16px; }
.cc-hero p { font-size: 17px; color: var(--ink-soft); max-width: 540px; margin: 0 auto; }

.cc-main {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 32px;
  padding-bottom: 100px;
  align-items: start;
}
.cc-form {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
}
.cc-form h2 {
  font-family: var(--serif);
  font-size: 28px;
  
  margin-bottom: 6px;
}
.cc-form-sub {
  font-size: 14px;
  color: var(--ink-muted);
  margin-bottom: 28px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
.field > span {
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
  font-weight: 500;
}
.field input,
.field select {
  font-family: var(--sans);
  font-size: 15px;
  padding: 13px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg);
  outline: none;
  transition: border-color 0.2s;
}
.field input:focus,
.field select:focus { border-color: var(--accent); }
.cc-info {
  margin-top: 24px;
  padding: 20px;
  background: var(--accent-soft);
  border-radius: 12px;
}
.cc-info strong {
  display: block;
  font-size: 13px;
  margin-bottom: 12px;
  color: var(--accent);
}
.cc-info ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cc-info li {
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.5;
  padding-left: 18px;
  position: relative;
}
.cc-info li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.cc-results {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  min-height: 400px;
}
.cc-empty {
  height: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
}
.cc-empty-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-style: italic;
  font-size: 26px;
}
.cc-empty p { color: var(--ink-muted); font-size: 15px; max-width: 280px; }

.cc-result-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 28px;
}
.cc-result-card {
  padding: 24px;
  border-radius: 14px;
  background: var(--bg);
  border: 1px solid var(--border);
}
.cc-result-card-dark {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}
.cc-result-label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 10px;
}
.cc-result-card-dark .cc-result-label { color: rgba(255,255,255,0.6); }
.cc-result-card strong {
  display: block;
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 34px);
  font-weight: 400;
}
.cc-result-card-dark strong { color: var(--accent-warm); }
.cc-result-sub {
  display: block;
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: 6px;
}
.cc-result-card-dark .cc-result-sub { color: rgba(255,255,255,0.5); }

.cc-breakdown h3 {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 12px;
}
.cc-deductions-title { margin-top: 28px; }
.cc-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  color: var(--ink-soft);
}
.cc-row em { font-style: normal; font-size: 11px; color: var(--ink-muted); }
.cc-row-total {
  font-weight: 600;
  color: var(--ink);
  border-bottom: none;
}
.cc-cta { margin-top: 28px; }
.cc-disclaimer {
  margin-top: 16px;
  font-size: 11px;
  color: var(--ink-muted);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .cc-main { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .cc-hero { padding-top: 110px; }
  .cc-result-cards { grid-template-columns: 1fr; }
}
`}</style>

      <header className="container cc-hero">
        <h1 className="section-title">Calculate <em>employment costs</em></h1>
        <p>{cc.hero.description}</p>
      </header>

      <section className="container cc-main">
        {/* Inputs */}
        <div className="cc-form">
          <h2>{cc.calculator.title}</h2>
          <p className="cc-form-sub">{cc.calculator.subtitle}</p>

          <label className="field">
            <span>{cc.calculator.countryLabel}</span>
            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
              <option value="" disabled>Select a country</option>
              {countries.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>{cc.calculator.grossSalaryLabel} {selected && `(${selected.currency})`}</span>
            <input 
              value={grossSalary} 
              onChange={(e) => setGrossSalary(e.target.value === '' ? '' : Number(e.target.value))} 
              type="number" 
              min="0" 
              placeholder="e.g. 60000" 
            />
          </label>

          <label className="field">
            <span>{cc.calculator.benefitsLabel}</span>
            <input 
              value={benefits} 
              onChange={(e) => setBenefits(e.target.value === '' ? '' : Number(e.target.value))} 
              type="number" 
              min="0" 
              placeholder={cc.calculator.benefitsPlaceholder} 
            />
          </label>

          <div className="cc-info">
            <strong>{cc.calculator.infoBox.title}</strong>
            <ul>
              {cc.calculator.infoBox.items.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Results */}
        <div className="cc-results">
          {!result ? (
            <div className="cc-empty">
              <span className="cc-empty-icon" aria-hidden>€</span>
              <p>{cc.results.emptyState}</p>
            </div>
          ) : (
            <>
              <div className="cc-result-cards">
                <div className="cc-result-card">
                  <span className="cc-result-label">{cc.results.netSalaryLabel}</span>
                  <strong>{fmt(result.netSalary, result.c.currencySymbol)}</strong>
                  <span className="cc-result-sub">{cc.results.netSalarySubtext}</span>
                </div>
                <div className="cc-result-card cc-result-card-dark">
                  <span className="cc-result-label">{cc.results.totalCostLabel}</span>
                  <strong>{fmt(result.totalEmployerCost, result.c.currencySymbol)}</strong>
                  <span className="cc-result-sub">{cc.results.totalCostSubtext}</span>
                </div>
              </div>

              <div className="cc-breakdown">
                <h3>{cc.results.breakdownLabel}</h3>
                <div className="cc-row">
                  <span>{cc.results.grossSalaryLabel}</span>
                  <span>{fmt(result.gross, result.c.currencySymbol)}</span>
                </div>
                <div className="cc-row">
                  <span>{cc.results.employerSSLabel} <em>{cc.results.employerSSNote}</em></span>
                  <span>+ {fmt(result.employerSS, result.c.currencySymbol)}</span>
                </div>
                <div className="cc-row">
                  <span>{cc.results.benefitsLabel}</span>
                  <span>+ {fmt(result.benefitAmount, result.c.currencySymbol)}</span>
                </div>
                <div className="cc-row cc-row-total">
                  <span>{cc.results.totalCostLabel}</span>
                  <span>{fmt(result.totalEmployerCost, result.c.currencySymbol)}</span>
                </div>

                <h3 className="cc-deductions-title">{cc.results.deductionsLabel}</h3>
                <div className="cc-row">
                  <span>{cc.results.incomeTaxLabel}</span>
                  <span>− {fmt(result.incomeTax, result.c.currencySymbol)}</span>
                </div>
                <div className="cc-row">
                  <span>{cc.results.employeeSSLabel}</span>
                  <span>− {fmt(result.employeeSS, result.c.currencySymbol)}</span>
                </div>
                <div className="cc-row cc-row-total">
                  <span>{cc.results.totalDeductionsLabel}</span>
                  <span>− {fmt(result.totalDeductions, result.c.currencySymbol)}</span>
                </div>
              </div>

              <Link href="/contact?reason=payroll_services" className="btn-primary cc-cta">
                {cc.results.ctaButton} <span className="arrow">→</span>
              </Link>
              <p className="cc-disclaimer">{cc.results.disclaimer}</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
