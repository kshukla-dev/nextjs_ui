'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import contactData from '@/data/contact.json'
import ghgData from '@/data/global-hiring.json'

export default function ContactPage() {
  const availableCountries = useMemo(() => {
    return ghgData.countries.filter((c: any) => c.status === 'Available')
  }, [])

  const comingSoonCountries = useMemo(() => {
    return ghgData.countries.filter((c: any) => c.status === 'Coming soon')
  }, [])

  const [openFaq, setOpenFaq] = useState(0)
  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    reason: '',
    message: '',
    consent: false,
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [showValidation, setShowValidation] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const r = searchParams.get('reason')
    if (r) {
      const match = contactData.form.contactReasons.find((opt: any) => opt.value === r)
      if (match) {
        setForm(prev => ({ ...prev, reason: match.value }))
      }
    }
  }, [])

  const getFlag = (name: string) => {
    const map: Record<string, string> = {
      'The Netherlands': '🇳🇱', 'India': '🇮🇳', 'Poland': '🇵🇱', 'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪', 'Italy': '🇮🇹', 'Czech Republic': '🇨🇿', 'France': '🇫🇷',
      'Belgium': '🇧🇪', 'Spain': '🇪🇸', 'UAE': '🇦🇪', 'Hong Kong': '🇭🇰',
      'China': '🇨🇳', 'Portugal': '🇵🇹', 'Sweden': '🇸🇪', 'Hungary': '🇭🇺',
      'Romania': '🇷🇴', 'Singapore': '🇸🇬', 'United States': '🇺🇸',
      'New York': '🇺🇸', 'Australia': '🇦🇺'
    }
    return map[name] || '🌍'
  }

  const getCountryImage = (name: string) => {
    const map: Record<string, string> = {
      'The Netherlands': '/countries/eor-netherlands.webp',
      'India': '/countries/eor-india.webp',
      'Poland': '/countries/eor-poland.webp',
      'United Kingdom': '/countries/eor-uk.webp',
      'Germany': '/countries/eor-germany.webp',
      'Italy': '/countries/eor-Italy.webp',
      'Czech Republic': '/countries/eor-czech.webp',
      'France': '/countries/eor-france.webp',
      'Belgium': '/countries/eor-belgium.webp',
      'Spain': '/countries/eor-spain.webp',
      'UAE': '/countries/eor-uae.webp',
      'Hong Kong': '/countries/eor-hong-kong.webp',
      'Singapore': '/countries/eor-hong-kong.webp',
      'China': '/countries/eor-china.webp',
      'United States': '/countries/eor-spain.webp',
      'New York': '/countries/eor-spain.webp'
    }
    return map[name] || '/countries/eor-spain.webp'
  }

  const getPhone = (name: string) => {
    const map: Record<string, string> = {
      'United Kingdom': '+44 20 4572 2467',
      'Poland': '+48 22 208 27 00',
      'The Netherlands': '+31 20 808 2967',
      'Singapore': '+65 6950 2185',
      'United States': '+1 646 993 9004',
      'New York': '+1 646 993 9004'
    }
    return map[name] || ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('idle')
    setErrorMessage('')

    if (!form.firstName || !form.lastName || !form.email || !form.message || !form.reason) {
      setStatus('error')
      setShowValidation(true)
      setErrorMessage('Please fill in all required fields.')
      return
    }
    if (!form.consent) {
      setStatus('error')
      setShowValidation(true)
      setErrorMessage('Please agree to the terms to continue.')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch('/api/v1/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        reason: '',
        message: '',
        consent: false,
      })

      setStatus('success')
      setShowValidation(false)
    } catch (error) {
      setStatus('error')
      setErrorMessage('There was an issue sending your message. Please try again later.')
      console.error('Contact form submission error:', error)
    }
  }

  const carouselTrack = useRef<HTMLDivElement>(null)

  function slide(direction: 'next' | 'prev') {
    if (!carouselTrack.current) return
    const card = carouselTrack.current.querySelector('.office-location-card') as HTMLElement
    if (!card) return
    const cardWidth = card.offsetWidth
    const gap = 24
    const scrollAmount = direction === 'next' ? (cardWidth + gap) : -(cardWidth + gap)
    carouselTrack.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <div className="contact-page-container">
      <style>{`
.contact-page-container {
  background-color: #f8fafc;
  font-family: var(--sans);
  color: var(--ink);
}

/* ============= HERO & FORM ============= */
.contact-hero-section {
  position: relative;
  min-height: auto;
  padding: 100px 20px 60px;
  background-color: #0E0F3B;
  overflow: hidden;
}

.contact-hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  background-image: url('/case-study/contact-bg.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
  filter: invert(1) grayscale(1) brightness(1.5);
  mix-blend-mode: screen;
  opacity: 0.35;
  pointer-events: none;
  z-index: 1;
}

@media (min-width: 1024px) {
  .contact-hero-section {
    padding: 40px 0 100px;
  }
  .contact-hero-section::before {
    display: none;
  }
}

.hero-bg-map {
  display: none;
}

@media (min-width: 1024px) {
  .hero-bg-map {
    display: block;
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 1100px;
    height: 100%;
    background-image: url('/case-study/contact-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    filter: invert(1) grayscale(1) brightness(1.5);
    mix-blend-mode: screen;
    opacity: 0.35;
    pointer-events: none;
    z-index: 1;
  }
}

.hero-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 80px;
  }
}

.hero-left-content {
  max-width: 580px;
}

.tag-eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--accent);
  margin-bottom: 16px;
  text-transform: uppercase;
}

.hero-left-content h1 {
  font-family: var(--serif);
  font-size: clamp(38px, 4.8vw, 56px);
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: -0.015em;
  margin-bottom: 24px;
  color: #ffffff;
}

.highlight-gold {
    color: #F7931E;
    font-style: italic;
  }

.hero-desc {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
}

.contact-info-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 24px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
}

.info-card:not(.no-hover):hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.3);
}


.info-card .icon-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: transparent;
  color: #F7931E;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s, background-color 0.2s;
}

.info-card:hover .icon-circle {
  border-color: #F7931E;
  background-color: rgba(247, 147, 30, 0.1);
}

.info-card .icon-circle svg {
  width: 18px;
  height: 18px;
}

.info-card-text {
  display: flex;
  flex-direction: column;
}

.info-card-text .label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 3px;
}

.info-card-text .value {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* Form block */
.hero-right-form {
  min-width: 0;
}

.floating-contact-form-card {
  background-color: #ffffffc9;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(20, 51, 105, 0.03);
}

@media (min-width: 768px) {
  .floating-contact-form-card {
    padding: 40px;
  }
}

.floating-contact-form-card h2 {
  font-family: var(--serif);
  font-size: 28px;
  
  color: var(--ink);
  margin-bottom: 28px;
  letter-spacing: -0.01em;
}

.form-grid-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 580px) {
  .form-grid-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-field {
  margin-bottom: 20px;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: #ffffff85;
  font-family: var(--sans);
  font-size: 14px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus,
.form-field input:focus-visible,
.form-field select:focus-visible,
.form-field textarea:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(20, 51, 105, 0.1);
  outline: none;
}

form.was-validated .form-field input:invalid,
form.was-validated .form-field select:invalid,
form.was-validated .form-field textarea:invalid {
  border-color: #b54234;
  background-color: #fffaf9;
}

form.was-validated .custom-checkbox input:invalid + .checkmark {
  border-color: #b54234;
}

.form-field textarea {
  resize: vertical;
}

/* Select custom dropdown arrow */
.select-field {
  position: relative;
}

.select-field select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 44px;
}

.select-arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--ink-soft);
  display: flex;
  align-items: center;
}

.select-arrow svg {
  width: 16px;
  height: 16px;
}

/* Custom Checkbox */
.form-consent-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 28px;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.custom-checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.custom-checkbox input:checked + .checkmark {
  background-color: var(--accent);
  border-color: var(--accent);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked + .checkmark:after {
  display: block;
}

.consent-text {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.45;
}

.consent-text a {
  color: var(--accent);
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  background-color: #143369;
  color: #ffffff;
  border-radius: 8px;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 15px;
  transition: background-color 0.2s, transform 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0e254e;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.submit-btn .arrow {
  transition: transform 0.2s;
}

.submit-btn:hover .arrow {
  transform: translateX(4px);
}

.error-msg-banner {
  color: #b54234;
  font-size: 13px;
  margin-bottom: 16px;
  font-weight: 500;
}

.form-footer-lock {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-top: 24px;
  color: var(--ink-muted);
}

.form-footer-lock svg {
  width: 14px;
  height: 14px;
}

.form-footer-lock span {
  font-size: 12px;
}

.form-success-card {
  text-align: center;
  padding: 40px 16px;
}

.success-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 0 auto 20px;
}

.form-success-card strong {
  display: block;
  font-family: var(--serif);
  font-size: 24px;
  color: var(--ink);
  margin-bottom: 8px;
}

.form-success-card p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
}

/* ============= WHY JACKSON & FRANK ============= */
.why-us-section {
  padding: 80px 0;
  background-color: #f8fafc33;
  border-top: 1px solid var(--border);
}

.why-us-card-container {
  position: relative;
  background-color: #ffffff87;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.01);
}

@media (min-width: 768px) {
  .why-us-card-container {
    padding: 60px 48px;
  }
}

.why-us-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.grid-divider {
  display: none;
}

@media (min-width: 1024px) {
  .why-us-grid {
    grid-template-columns: 1.25fr 0.95fr 0.95fr 0.95fr;
    row-gap: 48px;
    column-gap: 0;
  }

  .why-us-left-col {
    grid-column: 1;
    grid-row: 1 / 3;
    padding-right: 48px;
  }

  .feature-item.col-2 {
    grid-column: 2;
    padding-left: 48px;
    padding-right: 24px;
  }

  .feature-item.col-3 {
    grid-column: 3;
    padding-left: 48px;
    padding-right: 24px;
  }

  .feature-item.col-4 {
    grid-column: 4;
    padding-left: 48px;
  }

  .grid-divider {
    display: block;
    position: absolute;
    top: 60px;
    bottom: 60px;
    width: 1px;
    background-color: var(--border);
  }

  .divider-1 {
    left: calc(48px + (100% - 96px) * 0.3048);
  }

  .divider-2 {
    left: calc(48px + (100% - 96px) * 0.5365);
  }

  .divider-3 {
    left: calc(48px + (100% - 96px) * 0.7682);
  }
}

.why-us-left-col h2 {
  font-family: var(--serif);
  font-size: clamp(28px, 3.2vw, 36px);
  line-height: 1.15;
  
  margin-bottom: 20px;
  letter-spacing: -0.015em;
  color: var(--ink);
}

.why-us-left-col p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 32px;
}

.learn-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid var(--border);
  background-color: #ffffff;
  border-radius: 8px;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 14px;
  color: var(--accent);
  transition: all 0.2s;
}

.learn-more-btn:hover {
  background-color: var(--accent-soft);
  border-color: var(--accent);
}

.learn-more-btn .arrow {
  transition: transform 0.2s;
}

.learn-more-btn:hover .arrow {
  transform: translateX(4px);
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.feature-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(20, 51, 105, 0.2);
  background: radial-gradient(circle, #f8fafc 0%, #f1f5f9 100%);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 10px rgba(20, 51, 105, 0.05);
}

.feature-icon-wrap svg {
  width: 22px;
  height: 22px;
}

.feature-item h5 {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 8px;
}

.feature-item p {
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin: 0;
}

/* ============= OUR OFFICES ============= */
.offices-section {
  padding: 60px 0;
  background-color: #ffffff;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

@media (min-width: 768px) {
  .offices-section {
    padding: 120px 0;
  }
}

.offices-header-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 56px;
  justify-content: space-between;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .offices-header-row {
    flex-direction: row;
    align-items: flex-end;
  }
}

.carousel-arrow-btn {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background-color: #ffffff;
  color: var(--ink);
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

@media (min-width: 1024px) {
  .carousel-arrow-btn {
    display: flex;
  }
}

.carousel-arrow-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background-color: var(--accent-soft);
  box-shadow: 0 6px 16px rgba(20, 51, 105, 0.15);
}

.prev-btn {
  left: -24px;
}

.next-btn {
  right: -24px;
}

@media (max-width: 1280px) and (min-width: 1024px) {
  .prev-btn {
    left: 0;
  }
  .next-btn {
    right: 0;
  }
}

.carousel-arrow-btn svg {
  width: 18px;
  height: 18px;
}

.view-locations-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border: 1px solid var(--border);
  background-color: #ffffff;
  border-radius: 999px;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 14px;
  color: var(--ink);
  transition: all 0.2s;
  cursor: pointer;
  margin-left: 8px;
}

.view-locations-btn:hover {
  background-color: var(--ink);
  color: #ffffff;
  border-color: var(--ink);
}

.view-locations-btn .arrow {
  transition: transform 0.2s;
}

.view-locations-btn:hover .arrow {
  transform: translateX(4px);
}

.carousel-track-wrapper {
  width: 100%;
  overflow: visible;
  position: relative;
}

.offices-carousel-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 10px 4px 20px;
  margin: -10px -4px -20px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.offices-carousel-track::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.offices-carousel-track {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.office-location-card {
  flex: 0 0 280px;
  scroll-snap-align: start;
}

@media (min-width: 768px) {
  .office-location-card {
    flex: 0 0 300px;
  }
}

@media (min-width: 1024px) {
  .office-location-card {
    flex: 0 0 310px;
  }
}

@media (min-width: 1200px) {
  .office-location-card {
    flex: 0 0 330px;
  }
}

.office-location-card {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0,0,0,0.01);
  transition: transform 0.25s, box-shadow 0.25s;
}

.office-location-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(20, 51, 105, 0.05);
}

.office-img-wrap {
  position: relative;
  overflow: hidden;
  height: 140px;
}

.office-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.office-location-card:hover .office-img {
  transform: scale(1.05);
}

.card-inner-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.country-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.country-row .flag {
  font-size: 16px;
}

.country-row .country-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
}

.badge-hq {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  background-color: var(--accent-soft);
  color: var(--accent);
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  margin-left: auto;
}

.office-location-card .address {
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 20px;
  display: flex;
  gap: 8px;
}

.office-location-card .phone-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.office-location-card .phone-link:hover {
  text-decoration: underline;
}

.loc-icon {
  width: 14px;
  height: 14px;
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

/* ============= MAP OVERLAY STRIP ============= */
.map-overlay-section {
  background-color: #f8fafc;
  padding: 40px 0;
  position: relative;
  overflow: hidden;
}

@media (min-width: 900px) {
  .map-overlay-section {
    padding: 80px 0;
  }
}

.map-strip-container {
  position: relative;
  width: 100%;
}

.dotted-map-backdrop {
  height: 220px;
  border-radius: 16px;
  background-color: #f6f8fc;
  background-image: url('/case-study/contact-bg.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  border: 1px solid #0e0f3b29;
}

@media (min-width: 900px) {
  .dotted-map-backdrop {
    height: 400px;
    background-position: left 50px center;
  }
}

/* World pins overlay styling */
.map-pin {
  display: none;
}

@media (min-width: 900px) {
  .map-pin {
    display: block;
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: var(--accent);
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(20, 51, 105, 0.8);
    transform: translate(-50%, -50%);
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(20, 51, 105, 0.7); }
  70% { box-shadow: 0 0 0 8px rgba(20, 51, 105, 0); }
  100% { box-shadow: 0 0 0 0 rgba(20, 51, 105, 0); }
}

.stats-overlay-card {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 15px 40px rgba(20, 51, 105, 0.04);
  text-align: center;
  width: 100%;
  max-width: 320px;
  margin: 32px auto 0;
}

@media (min-width: 900px) {
  .stats-overlay-card {
    position: absolute;
    right: 140px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    padding: 40px;
  }
}

.operating-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.countries-count {
  font-family: var(--serif);
  font-size: clamp(43px, 4vw, 72px);
  line-height: 1;
  font-weight: 400;
  color: var(--accent);
  margin: 12px 0;
}

.countries-label {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ink);
  display: block;
  margin-bottom: 16px;
}

.stats-overlay-card .desc {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--ink-soft);
  margin: 0;
}

/* Tablet specific styles (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .hero-left-content {
    margin: 0 auto;
    text-align: center;
    max-width: 580px;
  }
  .contact-info-cards {
    align-items: center;
  }
  .info-card {
    width: 100%;
    max-width: 480px;
  }
  .floating-contact-form-card {
    max-width: 580px;
    margin: 0 auto;
  }
  .why-us-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px 40px;
  }
  .why-us-left-col {
    grid-column: 1 / -1;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 16px;
  }
}

/* Mobile specific styles (up to 767px) */
@media (max-width: 767px) {
  .hero-left-content {
    margin: 0 auto;
    text-align: center;
  }
  .contact-info-cards {
    align-items: center;
  }
  .info-card {
    width: 100%;
  }
  .why-us-card-container {
    padding: 24px 16px;
  }
  .why-us-grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .why-us-left-col {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: 8px;
  }
  .why-us-left-col h2 {
    font-size: 28px;
  }
  .feature-item {
    align-items: center;
    text-align: center;
    padding: 16px;
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 12px;
  }
  .feature-item h5 {
    font-size: 13px;
  }
  .feature-item p {
    font-size: 11.5px;
  }
}

/* COMING SOON SECTION */
.coming-soon-section {
  padding: 60px 20px;
  background-color: #ffffff;
}
.coming-soon-title {
  color: #0E0F3B;
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 700;
  margin-bottom: 24px;
}
.coming-soon-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 580px) {
  .coming-soon-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 900px) {
  .coming-soon-grid {
    grid-template-columns: repeat(6, minmax(260px, 1fr));
    gap: 20px;
  }
}
.coming-soon-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  color: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 240px;
}
.cs-bg-image {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 0.4s ease;
}
.cs-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(71, 85, 105, 0.95), rgba(51, 65, 85, 0.98));
  z-index: 1;
  transition: background 0.4s ease, opacity 0.4s ease;
}
.coming-soon-card:hover .cs-bg-image {
  transform: scale(1.05);
}
.coming-soon-card:hover .cs-overlay {
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.8));
}
.cs-card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.cs-country-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.cs-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 8px;
}
.cs-icon-wrap svg {
  width: 16px;
  height: 16px;
}
.cs-country-name {
  font-size: 20px;
  font-weight: 600;
}
.cs-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  line-height: 1.5;
  flex-grow: 1;
}
.cs-contact-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}
.cs-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  font-weight: 600;
  font-size: 14px;
  z-index: 3;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  opacity: 1;
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: none;
}
.coming-soon-card:hover .cs-badge {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.learn-more-link {
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  width: 100%;
}
.learn-more-link span {
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
}

/* ============= FAQ ============= */
.faq-section {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.faq-block {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
@media (max-width: 900px) {
  .faq-block {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
.faq-head .section-title {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 32px);
  color: var(--ink);
  margin-bottom: 16px;
  line-height: 1.1;
}
.faq-head .section-lead {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.faq-list {
  display: flex;
  flex-direction: column;
}
.faq-item {
  text-align: left;
  background: transparent;
  border: none;
  border-top: 1px solid var(--border);
  display: block;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  padding: 20px 0;
}
.faq-item:last-child {
  border-bottom: 1px solid var(--border);
}
.faq-q-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.faq-q {
  font-family: var(--serif);
  font-size: clamp(17px, 3vw, 22px);
  line-height: 1.3;
  color: var(--ink);
  transition: color 0.2s;
  flex: 1;
}
.faq-item:hover .faq-q {
  color: var(--accent);
}
.faq-item.open .faq-q {
  color: var(--accent);
}
.faq-toggle {
  font-size: 24px;
  color: var(--ink-muted);
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.2s;
}
.faq-item.open .faq-toggle {
  color: var(--accent);
}
.faq-a {
  margin-top: 14px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}
`}</style>

      {/* ============= HERO & FORM SECTION ============= */}
      <section className="contact-hero-section">
        <div className="hero-bg-map"></div>

        <div className="container hero-grid">
          {/* Left Content */}
          <div className="hero-left-content">
            <h1>Let&apos;s build your<br />global success <span className="highlight-gold">together.</span></h1>
            <p className="hero-desc">Have questions about global employment, expansion, or our services? Our experts are here to help.</p>

            <div className="contact-info-cards">
              <a href="mailto:hello@jacksonandfrank.com" className="info-card">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className="info-card-text">
                  <span className="label">Email us</span>
                  <strong className="value">hello@jacksonandfrank.com</strong>
                </div>
              </a>

              <a href="tel:+442045722467" className="info-card">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="info-card-text">
                  <span className="label">Call us</span>
                  <strong className="value">+44 20 4572 2467</strong>
                </div>
              </a>

              <div className="info-card no-hover">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div className="info-card-text">
                  <span className="label">Business hours</span>
                  <strong className="value">Mon – Fri, 9:00 AM – 6:00 PM (CET)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Form */}
          <div className="hero-right-form">
            <div className="floating-contact-form-card">
              <form onSubmit={handleSubmit} className={showValidation ? 'was-validated' : ''}>
                <h2>Send us a message</h2>

                {status === 'success' ? (
                  <div className="form-success-card">
                    <div className="success-icon-circle">✓</div>
                    <strong>Message Sent!</strong>
                    <p>Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <div className="form-grid-row">
                      <div className="form-field">
                        <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} type="text" placeholder="First name" required aria-label="First Name" />
                      </div>
                      <div className="form-field">
                        <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} type="text" placeholder="Last name" required aria-label="Last Name" />
                      </div>
                    </div>

                    <div className="form-field">
                      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" placeholder="Work email" required aria-label="Work Email" />
                    </div>

                    <div className="form-grid-row">
                      <div className="form-field">
                        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} type="tel" placeholder="Phone number" aria-label="Phone Number" />
                      </div>
                      <div className="form-field">
                        <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} type="text" placeholder="Company name" aria-label="Company Name" />
                      </div>
                    </div>

                    <div className="form-field select-field">
                      <select value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} required aria-label="What can we help you with?">
                        <option value="" disabled>How can we help you?</option>
                        {contactData.form.contactReasons.map((r: any) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                      <div className="select-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>

                    <div className="form-field">
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your message" rows={4} required aria-label="Your Message"></textarea>
                    </div>

                    <div className="form-consent-row">
                      <label className="custom-checkbox">
                        <input checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} type="checkbox" required />
                        <span className="checkmark"></span>
                      </label>
                      <span className="consent-text">
                        I agree to receive communications from Jackson &amp; Frank. View our <Link href="/privacy-policy">Privacy policy</Link>.
                      </span>
                    </div>

                    {status === 'error' && <p className="error-msg-banner">{errorMessage}</p>}

                    <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                      {status === 'sending' && <span className="spinner"></span>}
                      <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                      {status !== 'sending' && <span className="arrow">→</span>}
                    </button>

                    <div className="form-footer-lock">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      <span>Your information is secure and confidential.</span>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============= WHY GET IN TOUCH ============= */}
      <section className="why-us-section">
        <div className="container">
          <div className="why-us-card-container">
            <div className="why-us-grid">
              <div className="why-us-left-col">
                <span className="tag-eyebrow">WHY GET IN TOUCH WITH JACKSON &amp; FRANK</span>
                <h2>Your trusted partner<br />for <span className="highlight-gold">global expansion</span></h2>
                <p>We combine local expertise with global experience to make your expansion simple, compliant, and successful.</p>
                <Link href="/about-us" className="learn-more-btn">
                  Learn more about us <span className="arrow">→</span>
                </Link>
              </div>

              <div className="feature-item col-2 row-1">
                <div className="feature-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                <h5>Local Expertise, Global Reach</h5>
                <p>Our teams in 160+ countries understand local markets, laws, and business culture.</p>
              </div>

              <div className="feature-item col-3 row-1">
                <div className="feature-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 11 2 2 4-4"></path></svg>
                </div>
                <h5>Compliance You Can Trust</h5>
                <p>Stay compliant with local laws, tax regulations, and labor requirements.</p>
              </div>

              <div className="feature-item col-4 row-1">
                <div className="feature-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                </div>
                <h5>Fast &amp; Efficient</h5>
                <p>Most first hires go live within 48–72 hours.</p>
              </div>

              <div className="feature-item col-2 row-2">
                <div className="feature-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h5>End-to-End Support</h5>
                <p>From entity setup to payroll and HR, we handle it all.</p>
              </div>

              <div className="feature-item col-3 row-2">
                <div className="feature-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
                </div>
                <h5>Cost Effective</h5>
                <p>Save time and costs with our streamlined solutions.</p>
              </div>

              <div className="feature-item col-4 row-2">
                <div className="feature-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                </div>
                <h5>Human Support</h5>
                <p>Real people, real support, whenever you need us.</p>
              </div>
            </div>

            <div className="grid-divider divider-1"></div>
            <div className="grid-divider divider-2"></div>
            <div className="grid-divider divider-3"></div>
          </div>
        </div>
      </section>

      {/* ============= OUR OFFICES ============= */}
      <section className="offices-section">
        <div className="container">
          <div className="offices-header-row">
            <div>
              <span className="tag-eyebrow">OUR OFFICES</span>
              <h2>A global presence, <span className="highlight-gold">wherever you grow.</span></h2>
            </div>
          </div>

          <div className="carousel-track-wrapper">
            <button onClick={() => slide('prev')} className="carousel-arrow-btn prev-btn" aria-label="Previous Location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <div ref={carouselTrack} className="offices-carousel-track">
              {availableCountries.map((country: any, idx: number) => (
                <div key={idx} className="office-location-card">
                  <div className="office-img-wrap">
                    <img src={getCountryImage(country.name)} alt={country.name} className="office-img" />
                  </div>
                  <div className="card-inner-body">
                    <div className="country-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="flag" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: '1.5px solid #E2E8F0', borderRadius: '50%', fontSize: '13px', fontWeight: 600, background: '#fff', color: '#0E0F3B' }}>
                        {getFlag(country.name)}
                      </span>
                      <span className="country-name">{country.name}</span>
                      {country.name === 'United Kingdom' && <span className="badge-hq">Head Office</span>}
                    </div>
                    <p className="address">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loc-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {country.address}
                    </p>
                    {country.href && (
                      <Link href={country.href} className="learn-more-link">
                        Learn more about {country.name} <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => slide('next')} className="carousel-arrow-btn next-btn" aria-label="Next Location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ============= COMING SOON OFFICES ============= */}
      {comingSoonCountries.length > 0 && (
        <section className="coming-soon-section">
          <div className="container">
            <h2 className="coming-soon-title">Coming soon</h2>
            <div className="coming-soon-grid">
              {comingSoonCountries.map((country: any, idx: number) => (
                <div key={idx} className="coming-soon-card">
                  <div className="cs-bg-image" style={{ backgroundImage: `url(${getCountryImage(country.name)})` }}></div>
                  <div className="cs-overlay"></div>
                  <div className="cs-card-content">
                    <div className="cs-country-header">
                      <span className="cs-icon-wrap">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      </span>
                      <span className="cs-country-name">{country.name}</span>
                    </div>
                    <p className="cs-desc">Full country guide and local EOR details:<br />Launching soon. Contact us to plan ahead.</p>
                    <Link href="/#contact" className="cs-contact-link">
                      Contact us to plan ahead <span>→</span>
                    </Link>
                  </div>
                  <div className="cs-badge">Coming soon</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============= MAP OVERLAY STRIP ============= */}
      <section className="map-overlay-section">
        <div className="container map-strip-container">
          <div className="dotted-map-backdrop">
            <div className="map-pin pin-us" style={{ top: '35%', left: '22%' }}></div>
            <div className="map-pin pin-uk" style={{ top: '25%', left: '46%' }}></div>
            <div className="map-pin pin-nl" style={{ top: '24%', left: '49%' }}></div>
            <div className="map-pin pin-pl" style={{ top: '26%', left: '53%' }}></div>
            <div className="map-pin pin-in" style={{ top: '52%', left: '68%' }}></div>
            <div className="map-pin pin-sg" style={{ top: '66%', left: '74%' }}></div>
          </div>

          <div className="stats-overlay-card">
            <span className="operating-label">Operating in</span>
            <div className="countries-count">160+</div>
            <span className="countries-label">countries</span>
            <p className="desc">Supporting companies worldwide with local expertise.</p>
          </div>
        </div>
      </section>

      {/* ============= FAQ ============= */}
      <section className="section container faq-section">
        <div className="faq-block">
          <div className="faq-head">
            <h2 className="section-title">{contactData.faqs.title}</h2>
            <p className="section-lead">{contactData.faqs.subtitle}</p>
          </div>
          <div className="faq-list">
            {contactData.faqs.items.map((item: any, i: number) => (
              <button
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => toggleFaq(i)}
                aria-expanded={openFaq === i}
              >
                <div className="faq-q-row">
                  <span className="faq-q">{item.question}</span>
                  <span className="faq-toggle" aria-hidden>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p className="faq-a">{item.answer}</p>}
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
