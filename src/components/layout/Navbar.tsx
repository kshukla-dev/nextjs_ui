'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import navigation from '@/data/navigation.json'

type DropdownKey = 'services' | 'about' | 'insights' | null

type Preview = {
  eyebrow: string
  title: string
  blurb: string
  image: string
  href: string
  cta: string
}

const previewMap: Record<Exclude<DropdownKey, null>, Preview> = {
  services: {
    eyebrow: 'Featured service',
    title: 'Employer of record',
    blurb: 'Hire across 160+ countries - without setting up a local entity.',
    image: '/services/service-page/eor-hero2.png',
    href: '/employer-of-record',
    cta: 'Explore EOR',
  },
  about: {
    eyebrow: 'Our story',
    title: '50+ years, 160+ countries',
    blurb: 'From the Netherlands to every continent - the team behind 700+ global hires.',
    image: '/services/service-page/about2.png',
    href: '/about-us',
    cta: 'Meet the team',
  },
  insights: {
    eyebrow: 'Latest insight',
    title: 'Hiring your first European employee',
    blurb: 'Real all-in employer costs in 13 European countries for 2026.',
    image: '/blog-images/hiring-european-employee.webp',
    href: '/blog/hiring-your-first-european-employee',
    cta: 'Read the guide',
  },
}

const services = (navigation as any).navbar.services.items
const about = (navigation as any).navbar.about.items
const insights = (navigation as any).navbar.insights.items

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const close = useCallback(() => setOpenDropdown(null), [])

  const toggle = (key: Exclude<DropdownKey, null>) => {
    setOpenDropdown(prev => prev === key ? null : key)
  }

  const openHover = (key: Exclude<DropdownKey, null>) => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null }
    setOpenDropdown(key)
  }

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null)
      closeTimerRef.current = null
    }, 120)
  }

  const cancelClose = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null }
  }

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('.nav-dropdown') && !t.closest('.nav-trigger') && !t.closest('.dropdown-wrap')) close()
    }
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    const handleScroll = () => setIsScrolled(window.scrollY > 20)

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [close])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    close()
  }, [pathname, close])

  // Lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const currentPreview = openDropdown ? previewMap[openDropdown] : null

  const getItems = () => {
    if (openDropdown === 'services') return services
    if (openDropdown === 'about') return about
    return insights
  }

  const getEyebrow = () => {
    if (openDropdown === 'services') return 'What we do'
    if (openDropdown === 'about') return 'Who we are'
    return 'Insights & tools'
  }

  return (
    <>
      <style>{`
        .nav-placeholder{height:76px;width:100%}
        nav{position:fixed;top:0;left:0;right:0;width:100%;z-index:100;background:transparent;border-bottom:1px solid transparent;transition:all 0.3s ease}
        nav.scrolled{background:var(--header-bg);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);box-shadow:0 4px 20px rgba(0,0,0,0.05)}
        .nav-inner{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding-top:18px;padding-bottom:18px;gap:24px}
        .logo{font-family:'DM Serif Display',var(--serif);font-size:clamp(22px,4vw,32px);font-weight:500;letter-spacing:-0.01em;color:var(--ink);text-decoration:none;justify-self:start;display:flex;align-items:center}
        .logo-img{height:38px;width:auto;display:block;transition:height 0.2s ease}
        .nav-links{display:flex;gap:28px;align-items:center;justify-self:center}
        .nav-trigger{display:inline-flex;align-items:center;color:var(--ink);font-size:16px;font-weight:600;padding:8px 0;transition:color 0.2s;font-family:var(--sans);background:transparent;border:none;cursor:pointer;text-decoration:none}
        .nav-trigger:hover,.nav-trigger.active{color:#09407B}
        .btn-consultation{background:#F7931E;color:#ffffff !important;padding:10px 24px;border-radius:8px;font-size:15px;font-weight:600;font-family:var(--sans);transition:background-color 0.2s,transform 0.2s,box-shadow 0.2s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;border:none;white-space:nowrap;box-shadow:0 4px 14px rgba(247,147,30,0.3)}
        .btn-consultation:hover{background:#e07d10;transform:translateY(-1px);box-shadow:0 6px 20px rgba(247,147,30,0.45)}
        .dropdown-wrap{position:absolute;top:100%;left:0;right:0;z-index:60;padding-top:12px;padding-bottom:16px;background:var(--bg);border-top:1px solid var(--border);border-bottom:1px solid var(--border);box-shadow:0 30px 60px -20px rgba(0,0,0,0.12);animation:dropIn 0.22s ease}
        @keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .nav-dropdown{background:transparent;padding:36px 40px;display:grid;grid-template-columns:1.4fr 1fr;gap:48px}
        .dropdown-eyebrow{display:inline-block;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:18px}
        .dropdown-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px}
        .dropdown-item{display:block;padding:14px 16px;border-radius:12px;transition:background 0.18s ease,transform 0.18s ease;text-decoration:none}
        .dropdown-item:hover{background:var(--accent-soft);transform:translateX(2px)}
        .dropdown-item strong{display:block;font-size:15px;font-weight:600;color:var(--ink);margin-bottom:4px;font-family:var(--sans)}
        .dropdown-item span{display:block;font-size:12.5px;color:var(--ink-muted);line-height:1.5}
        .dropdown-preview{position:relative;padding:24px;border-radius:var(--radius);background:var(--bg);border:1px solid var(--border);display:flex;flex-direction:column;gap:10px;isolation:isolate}
        .dropdown-preview-img{position:relative;aspect-ratio:16/9;border-radius:10px;background-size:cover;background-position:center;margin-bottom:4px;box-shadow:0 12px 30px -10px rgba(0,0,0,0.18)}
        .dropdown-preview-eyebrow{font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-muted)}
        .dropdown-preview h4{font-family:var(--serif);font-size:22px;line-height:1.2;font-weight:400;color:var(--ink)}
        .dropdown-preview p{font-size:13px;color:var(--ink-soft);line-height:1.5}
        .dropdown-preview-cta{margin-top:auto;align-self:flex-start;background:var(--ink);color:var(--bg);padding:10px 18px;border-radius:999px;font-size:13px;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:background 0.2s,transform 0.2s,gap 0.2s}
        .dropdown-preview-cta:hover{background:var(--accent);transform:translateY(-1px);gap:10px}
        .nav-right{display:flex;gap:8px;align-items:center;justify-self:end}
        .mobile-toggle{display:none;background:transparent;border:none;cursor:pointer;color:var(--ink);padding:6px;min-width:44px;min-height:44px;align-items:center;justify-content:center}
        .mobile-overlay{position:fixed;inset:0;background:rgba(14,15,59,0.4);backdrop-filter:blur(4px);z-index:190}
        .mobile-drawer{position:fixed;top:0;bottom:0;right:0;width:100%;max-width:100%;background:var(--bg);z-index:200;padding:80px 32px 32px;display:flex;flex-direction:column;gap:28px;overflow-y:auto;box-shadow:-10px 0 40px rgba(0,0,0,0.1);animation:slideIn 0.3s cubic-bezier(0.16,1,0.3,1)}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        .mobile-close{position:absolute;top:18px;right:24px;background:transparent;border:none;cursor:pointer;color:var(--ink);min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;z-index:210}
        .mobile-section{display:flex;flex-direction:column;gap:8px}
        .mobile-section a{font-size:16px;color:var(--ink);padding:12px 0;border-bottom:1px solid var(--border);text-decoration:none;min-height:44px;display:flex;align-items:center}
        .mobile-cta{align-self:flex-start;margin-top:12px}
        @media(max-width:1024px){.nav-dropdown{grid-template-columns:1fr;gap:28px}.dropdown-grid{grid-template-columns:1fr}}
        @media(max-width:900px){.nav-links{display:none}.mobile-toggle{display:inline-flex}.nav-inner{grid-template-columns:1fr auto}.btn-consultation{display:none}.dropdown-wrap{display:none}}
        @media(max-width:768px){.logo{font-size:24px;white-space:nowrap}.logo-img{height:30px}}
      `}</style>

      <div className="nav-wrapper">
        <div className="nav-placeholder"></div>
        <nav className={isScrolled ? 'scrolled' : ''}>
          <div className="container nav-inner">
            {/* Logo (left) */}
            <Link href="/" className="logo" onClick={close}>
              <img src="/logo-dark.svg" alt="Jackson & Frank" className="logo-img" />
            </Link>

            {/* Center nav */}
            <div className="nav-links">
              <button
                className={`nav-trigger${openDropdown === 'services' ? ' active' : ''}`}
                onClick={() => toggle('services')}
                onMouseEnter={() => openHover('services')}
                onMouseLeave={scheduleClose}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'services'}
              >
                Solutions
              </button>
              <button
                className={`nav-trigger${openDropdown === 'insights' ? ' active' : ''}`}
                onClick={() => toggle('insights')}
                onMouseEnter={() => openHover('insights')}
                onMouseLeave={scheduleClose}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'insights'}
              >
                Resources
              </button>
              <button
                className={`nav-trigger${openDropdown === 'about' ? ' active' : ''}`}
                onClick={() => toggle('about')}
                onMouseEnter={() => openHover('about')}
                onMouseLeave={scheduleClose}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'about'}
              >
                About Us
              </button>
              <Link href="/contact" className="nav-trigger" onClick={close}>
                Contact
              </Link>
            </div>

            {/* Right CTA */}
            <div className="nav-right">
              <Link href="/contact" className="btn-consultation" onClick={close}>
                Book a consultation
              </Link>
              <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-haspopup="true"
                aria-expanded={mobileOpen}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>

          {/* Full-width dropdown panel */}
          {openDropdown && (
            <div className="dropdown-wrap" onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
              <div className="container">
                <div className="nav-dropdown">
                  {/* Left: items grid */}
                  <div className="dropdown-items">
                    <span className="dropdown-eyebrow">{getEyebrow()}</span>
                    <div className="dropdown-grid">
                      {getItems().map((item: any) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="dropdown-item"
                          onClick={close}
                        >
                          <strong>{item.title}</strong>
                          <span>{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right: featured preview tile */}
                  {currentPreview && (
                    <div className="dropdown-preview">
                      <div
                        className="dropdown-preview-img"
                        style={{ backgroundImage: `url('${currentPreview.image}')` }}
                      />
                      <span className="dropdown-preview-eyebrow">{currentPreview.eyebrow}</span>
                      <h4>{currentPreview.title}</h4>
                      <p>{currentPreview.blurb}</p>
                      <Link
                        href={currentPreview.href}
                        className="dropdown-preview-cta"
                        onClick={close}
                      >
                        {currentPreview.cta} <span aria-hidden>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <>
            <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true"></div>
            <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
              <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={32} />
              </button>
              <div className="mobile-section">
                <span className="dropdown-eyebrow">Solutions</span>
                {services.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              <div className="mobile-section">
                <span className="dropdown-eyebrow">Resources</span>
                {insights.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              <div className="mobile-section">
                <span className="dropdown-eyebrow">About Us</span>
                {about.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              <div className="mobile-section">
                <Link href="/contact" onClick={() => setMobileOpen(false)} style={{ fontWeight: 700, borderBottom: 'none' }}>
                  Contact Us
                </Link>
              </div>
              <Link href="/contact" className="btn-consultation mobile-cta" onClick={() => setMobileOpen(false)}>
                Book a consultation
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
