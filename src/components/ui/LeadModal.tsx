'use client'
import { useState, useEffect } from 'react'
import { submitContactForm } from '@/lib/contact'

interface Props {
  open: boolean
  title?: string
  subtitle?: string
  reason?: string
  onClose: () => void
}

export default function LeadModal({ open, title, subtitle, reason, onClose }: Props) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) { setStatus('idle'); setErrorMessage('') }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleChange = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.firstName || !form.email) {
      setStatus('error'); setErrorMessage('Please enter your name and email.')
      return
    }
    setStatus('sending')
    const result = await submitContactForm({
      first_name: form.firstName,
      last_name: form.lastName,
      work_email: form.email,
      phone_number: '',
      company_name: form.company,
      help_reason: reason ?? 'general_inquiry',
      message: form.message || 'Requested via blog CTA.',
    })
    if (result.success) {
      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', company: '', message: '' })
    } else {
      setStatus('error')
      setErrorMessage(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  if (!open) return null

  return (
    <>
      <style>{`
        .lead-overlay{position:fixed;inset:0;z-index:1000;background:rgba(20,18,16,0.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:24px;animation:leadFadeIn 0.25s ease}
        @keyframes leadFadeIn{from{opacity:0}to{opacity:1}}
        .lead-modal{background:var(--bg-card);border-radius:var(--radius-lg);padding:40px;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;overflow-x:hidden;position:relative;box-shadow:0 40px 100px -30px rgba(0,0,0,0.5);animation:leadSlideIn 0.25s ease}
        @keyframes leadSlideIn{from{transform:translateY(16px)}to{transform:translateY(0)}}
        .lead-close{position:absolute;top:18px;right:20px;font-size:28px;line-height:1;color:var(--ink-muted);transition:color 0.2s;background:none;border:none;cursor:pointer}
        .lead-close:hover{color:var(--ink)}
        .lead-modal .tag{display:inline-block;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:12px}
        .lead-modal h3{font-family:var(--serif);font-size:clamp(22px,4vw,30px);font-weight:400;line-height:1.1;margin-bottom:8px}
        .lead-sub{font-size:14px;color:var(--ink-soft);line-height:1.55;margin-bottom:24px}
        .lead-form{display:flex;flex-direction:column;gap:16px;width:100%}
        .lead-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .field{display:flex;flex-direction:column;gap:7px;min-width:0}
        .field span{font-size:12px;letter-spacing:0.05em;text-transform:uppercase;color:var(--ink-muted);font-weight:500}
        .field input,.field textarea{font-family:var(--sans);font-size:15px;padding:12px 14px;border:1px solid var(--border);border-radius:10px;background:var(--bg);outline:none;transition:border-color 0.2s;width:100%;min-width:0;max-width:100%}
        .field input:focus,.field textarea:focus{border-color:var(--accent)}
        .field textarea{resize:vertical}
        .lead-form .btn-primary{justify-content:center;margin-top:4px}
        .lead-error{color:#b54234;font-size:14px;margin:0}
        .lead-success{text-align:center;padding:24px 8px}
        .lead-success-icon{display:inline-flex;width:56px;height:56px;border-radius:50%;background:var(--accent);color:#fff;align-items:center;justify-content:center;font-size:26px;margin-bottom:18px}
        .lead-success h3{font-family:var(--serif);font-size:28px;font-weight:400;margin-bottom:8px}
        .lead-success p{font-size:15px;color:var(--ink-soft);line-height:1.6;margin-bottom:24px}
        @media(max-width:540px){.lead-modal{padding:32px 24px}.lead-row{grid-template-columns:1fr;gap:16px}}
      `}</style>
      <div className="lead-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} tabIndex={-1} role="dialog" aria-modal="true">
        <div className="lead-modal">
          <button className="lead-close" onClick={onClose} aria-label="Close">×</button>

          {status === 'success' ? (
            <div className="lead-success">
              <span className="lead-success-icon" aria-hidden>✓</span>
              <h3>Thank you!</h3>
              <p>We've received your details and will be in touch within 24 hours.</p>
              <button className="btn-primary" onClick={onClose}>Close</button>
            </div>
          ) : (
            <>
              <span className="tag">{reason === 'careers' ? 'Join us' : 'Get in touch'}</span>
              <h3>{title ?? 'Talk to our team'}</h3>
              <p className="lead-sub">
                {subtitle ?? `Tell us a little about your needs and we'll get back to you within 24 hours.`}
              </p>
              <form onSubmit={submit} className="lead-form">
                <div className="lead-row">
                  <label className="field">
                    <span>First name *</span>
                    <input value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} type="text" placeholder="Jane" required />
                  </label>
                  <label className="field">
                    <span>Last name</span>
                    <input value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} type="text" placeholder="Doe" />
                  </label>
                </div>
                <label className="field">
                  <span>Work email *</span>
                  <input value={form.email} onChange={e => handleChange('email', e.target.value)} type="email" placeholder="jane@company.com" required />
                </label>
                <label className="field">
                  <span>Company</span>
                  <input value={form.company} onChange={e => handleChange('company', e.target.value)} type="text" placeholder="Company name" />
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} rows={3} placeholder="What can we help with?" />
                </label>
                {status === 'error' && <p className="lead-error">{errorMessage}</p>}
                <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send request'}
                  <span className="arrow">→</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
