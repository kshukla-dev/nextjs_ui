'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  ChevronDown,
  Globe,
  Building2,
  HelpCircle,
  Info,
  UserCheck,
  Clock,
  Handshake,
  ShieldCheck,
  Flag,
  TrendingUp
} from 'lucide-react'
import Script from 'next/script'
import Image from 'next/image'
import { CALENDLY_URL } from '@/lib/constants'
import { fireContactConversion } from '@/utils/conversion'

// Testimonial type
interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  logo?: string
  website?: string
}

// Real, context-relevant testimonials from the database
const testimonials: Testimonial[] = [
  {
    name: 'Xin Shi',
    role: 'Partner',
    company: 'Amice Advocaten',
    quote: 'During my co-operation with Jackson and Frank B.V. , I have noticed that the management does not only do their HR jobs wonderfully, but has had a larger view of the global need of movement of talent and knowledges migrants. This mission ensures the excellence of their daily work and performance , but in addition, substantially providing our clients the efficient and workable HR solutions. Their compliance also has given our clients great confidence to work with them.'
  },
  {
    name: 'Robin Zijsling',
    role: 'Founder',
    company: 'LM5 Capital',
    logo: '/logos/lm5-capital.jpg',
    website: 'https://lm5capital.com/',
    quote: 'We really value our relationship with the team at Jackson & Frank. They’re a great group of professionals to work with, knowledgeable, pragmatic, and always clear in how they approach complex cross border matters. What we appreciate most is how practical they are. Their expertise in legal and workforce structuring, combined with a strong international perspective, makes them a trusted partner when navigating different jurisdictions. It was great to spend some time together again recently in Shanghai and continue building on a partnership we genuinely enjoy. Thanks again to the Jackson & Frank team. Looking forward to many more conversations ahead.'
  }
]

function TestimonialCard({ test }: { test: Testimonial }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = test.quote.length > 150

  return (
    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 sm:p-8 relative shadow-sm flex flex-col justify-between h-full">
      <div className="text-6xl text-[#143369]/10 font-serif absolute top-4 left-4 pointer-events-none">&ldquo;</div>
      
      <div className="relative z-10 mb-6 flex-1">
        <div className={`transition-all duration-300 relative overflow-hidden ${!isExpanded && isLong ? 'max-h-24 pb-4' : ''}`}>
          <blockquote className="text-slate-600 italic text-sm sm:text-base leading-relaxed">
            {test.quote}
          </blockquote>
          {!isExpanded && isLong && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent pointer-events-none" />
          )}
        </div>
        {isLong && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#143369] hover:text-[#143369]/80 font-bold text-xs mt-2 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Read less' : 'Read more...'}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#143369] text-white flex items-center justify-center font-bold text-sm shrink-0">
            {test.name[0]}
          </div>
          <div>
            <h5 className="font-bold text-slate-900 text-sm leading-none mb-1">{test.name}</h5>
            <p className="text-xs text-slate-500 font-medium">
              {test.role} · {test.website ? (
                <a href={test.website} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-semibold">
                  {test.company}
                </a>
              ) : (
                <span className="text-secondary">{test.company}</span>
              )}
            </p>
          </div>
        </div>
        {test.logo && (
          test.website ? (
            <a href={test.website} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={test.logo} alt={test.company} className="h-6 w-auto opacity-90 object-contain max-w-[90px]" />
            </a>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={test.logo} alt={test.company} className="h-6 w-auto shrink-0 opacity-90 object-contain max-w-[90px]" />
          )
        )}
      </div>
    </div>
  )
}

// FAQ item type
interface FAQItem {
  question: string
  answer: React.ReactNode
}

export default function HireNonEuEmployeesPage() {
  const searchParams = useSearchParams()

  // Capture UTM parameters + Google Ads click ID (GCLID) for conversion tracking
  const [utmData, setUtmData] = useState({
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: '',
    gclid: ''
  })

  useEffect(() => {
    setUtmData({
      source: searchParams.get('utm_source') || '',
      medium: searchParams.get('utm_medium') || '',
      campaign: searchParams.get('utm_campaign') || '',
      content: searchParams.get('utm_content') || '',
      term: searchParams.get('utm_term') || '',
      gclid: searchParams.get('gclid') || ''
    })
  }, [searchParams])

  // Fire the Google Ads "Contact Us" conversion when the embedded HubSpot form
  // is submitted. HubSpot posts a window message on successful submission.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; eventName?: string } | undefined
      if (data?.type === 'hsFormCallback' && data.eventName === 'onFormSubmitted') {
        fireContactConversion()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])



  // Lead capture is handled by the embedded HubSpot two-step form in Section 8.

  // FAQ Tab and Accordion State
  const faqTabs = ['getting-started', 'process-timeline', 'costs-tax'] as const
  type FAQTabType = (typeof faqTabs)[number]
  const [activeFaqTab, setActiveFaqTab] = useState<FAQTabType>('getting-started')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleTabChange = (tab: FAQTabType) => {
    setActiveFaqTab(tab)
    setOpenFaqIndex(null) // collapse on tab change
  }

  const painPoints = [
    {
      Icon: UserCheck,
      iconWrap: 'bg-slate-100 border-slate-200',
      iconColor: 'text-[#143369]',
      title: 'Your candidate is ready. The process is not.',
      body: 'Hiring someone from outside the EU in the Netherlands means navigating rules most companies have never dealt with before.'
    },
    {
      Icon: Clock,
      iconWrap: 'bg-slate-100 border-slate-200',
      iconColor: 'text-[#143369]',
      title: 'Getting IND sponsor status yourself would take 12 to 24 months.',
      body: 'That is before paying €2,000 to €5,000 in government fees, and before your candidate has worked a single day.'
    },
    {
      Icon: Building2,
      iconWrap: 'bg-slate-100 border-slate-200',
      iconColor: 'text-[#143369]',
      title: 'No Dutch entity means you cannot even start the process.',
      body: 'Registering a Dutch BV adds 3 to 6 months and requires capital before you have proven the market works for your business.'
    }
  ]

  const painCardsRef = React.useRef<HTMLDivElement>(null)
  const [activePainCard, setActivePainCard] = useState(0)

  const whyCardsRef = React.useRef<HTMLDivElement>(null)
  const [activeWhyCard, setActiveWhyCard] = useState(0)



  // Section 4 — MVV detail note toggle on Step 3
  const [showMvvNote, setShowMvvNote] = useState(false)
  const [expandedNetherlands, setExpandedNetherlands] = useState(false)
  const [expandedOutside, setExpandedOutside] = useState(false)
  const [expandedStep1, setExpandedStep1] = useState(false)
  const [expandedStep2, setExpandedStep2] = useState(false)
  const [expandedStep3, setExpandedStep3] = useState(false)

  // Cost-comparison line items (Section 3)
  const costRows = [
    { label: 'Corporate setup + IND sponsor status', alone: '€4,500 to €5,500', jf: '€0, we hold it' },
    { label: 'Annual admin, tax & payroll (24 months)', alone: '€12,000 to €20,000', jf: 'Included' },
    { label: 'Sick leave liability (Arbodienst + insurance)', alone: '€8,000 to €10,000', jf: 'Included' },
    { label: 'Office & infrastructure (24 months)', alone: '€16,000 to €20,000', jf: 'Remote-first, virtual address only (~€2,400)' },
    { label: 'Equipment', alone: '€4,000 to €5,000', jf: '€4,000 to €5,000' },
  ]



  const scrollToPainCard = (index: number) => {
    const el = painCardsRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement | undefined
    if (!child) return
    const rectContainer = el.getBoundingClientRect()
    const rectChild = child.getBoundingClientRect()
    const relativeLeft = rectChild.left - rectContainer.left + el.scrollLeft
    const target = relativeLeft + rectChild.width / 2 - rectContainer.width / 2
    el.scrollTo({ left: target, behavior: 'smooth' })
    setActivePainCard(index)
  }

  const handlePainScroll = () => {
    const el = painCardsRef.current
    if (!el) return
    const containerCenter = el.scrollLeft + el.offsetWidth / 2
    let closestIndex = 0
    let minDiff = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const diff = Math.abs(containerCenter - childCenter)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
      }
    }
    if (closestIndex !== activePainCard) setActivePainCard(closestIndex)
  }

  // Auto-advance the pain-point slider every 8s (mobile only)
  useEffect(() => {
    const el = painCardsRef.current
    if (!el) return
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return

    const intervalId = setInterval(() => {
      const nextIndex = (activePainCard + 1) % painPoints.length
      const child = el.children[nextIndex] as HTMLElement | undefined
      if (child) {
        const rectContainer = el.getBoundingClientRect()
        const rectChild = child.getBoundingClientRect()
        const relativeLeft = rectChild.left - rectContainer.left + el.scrollLeft
        const target = relativeLeft + rectChild.width / 2 - rectContainer.width / 2
        el.scrollTo({ left: target, behavior: 'smooth' })
      }
    }, 8000)

    return () => clearInterval(intervalId)
  }, [activePainCard, painPoints.length])

  const scrollToWhyCard = (index: number) => {
    const el = whyCardsRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement | undefined
    if (!child) return
    const rectContainer = el.getBoundingClientRect()
    const rectChild = child.getBoundingClientRect()
    const relativeLeft = rectChild.left - rectContainer.left + el.scrollLeft
    const target = relativeLeft + rectChild.width / 2 - rectContainer.width / 2
    el.scrollTo({ left: target, behavior: 'smooth' })
    setActiveWhyCard(index)
  }

  const handleWhyScroll = () => {
    const el = whyCardsRef.current
    if (!el) return
    const containerCenter = el.scrollLeft + el.offsetWidth / 2
    let closestIndex = 0
    let minDiff = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const diff = Math.abs(containerCenter - childCenter)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
      }
    }
    if (closestIndex !== activeWhyCard) setActiveWhyCard(closestIndex)
  }

  // Auto-advance the why-j&f slider every 8s (mobile only)
  useEffect(() => {
    const el = whyCardsRef.current
    if (!el) return
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return

    const intervalId = setInterval(() => {
      const nextIndex = (activeWhyCard + 1) % 5
      const child = el.children[nextIndex] as HTMLElement | undefined
      if (child) {
        const rectContainer = el.getBoundingClientRect()
        const rectChild = child.getBoundingClientRect()
        const relativeLeft = rectChild.left - rectContainer.left + el.scrollLeft
        const target = relativeLeft + rectChild.width / 2 - rectContainer.width / 2
        el.scrollTo({ left: target, behavior: 'smooth' })
      }
    }, 8000)

    return () => clearInterval(intervalId)
  }, [activeWhyCard])



  // Helper to preserve UTM parameters in query string for Calendly
  const getBookingUrl = () => {
    const url = new URL(CALENDLY_URL)
    if (utmData.source) url.searchParams.set('utm_source', utmData.source)
    if (utmData.medium) url.searchParams.set('utm_medium', utmData.medium)
    if (utmData.campaign) url.searchParams.set('utm_campaign', utmData.campaign)
    if (utmData.content) url.searchParams.set('utm_content', utmData.content)
    if (utmData.term) url.searchParams.set('utm_term', utmData.term)
    if (utmData.gclid) url.searchParams.set('gclid', utmData.gclid)
    return url.toString()
  }

  // Accordion Visa comparison card list for mobile viewport
  const mobileVisaCards = [
    {
      type: 'Skilled Worker Visa (Kennismigrant / HSM)',
      recommended: true,
      bestFor: 'Senior or specialist roles above salary threshold',
      time: '~2 weeks with approved sponsor',
      requiresSponsor: 'Yes, Jackson & Frank holds this status'
    },
    {
      type: 'EU Blue Card',
      recommended: false,
      bestFor: 'Highly qualified workers with a university degree',
      time: '2 to 8 weeks',
      requiresSponsor: 'No, but the salary threshold is higher'
    },
    {
      type: 'Single Work & Residence Permit (GVVA)',
      recommended: false,
      bestFor: 'Roles below Skilled Worker Visa salary threshold',
      time: 'Up to 90 days',
      requiresSponsor: 'No, but requires a labour market test'
    },
    {
      type: 'Intra-Company Transfer (ICT)',
      recommended: false,
      bestFor: 'Employees transferring from a non-EU office',
      time: '2 to 8 weeks',
      requiresSponsor: 'No'
    }
  ]

  // Complete category-filtered FAQs matching reference content
  const faqsByCategory: Record<FAQTabType, FAQItem[]> = {
    'getting-started': [
      {
        question: 'Can I hire someone in the Netherlands without opening a Dutch company?',
        answer: 'Yes. Jackson & Frank becomes the legal employer in the Netherlands on your behalf. You do not need a Dutch legal entity (BV) or any local presence. We issue the employment contract, run payroll, and manage all immigration compliance. Your candidate is legally employed in the Netherlands from day one.'
      },
      {
        question: 'Do I need to become an approved immigration sponsor yourself?',
        answer: 'No. Jackson & Frank already holds approved sponsor status (Erkend Referent). We submit your candidate\'s visa application on your behalf, which means you bypass a 12 to 24 month process and thousands of euros in government fees. Your candidate benefits from our status immediately.'
      },
      {
        question: 'Can an Employer of Record sponsor a Skilled Worker Visa in the Netherlands?',
        answer: 'Yes, but only if the Employer of Record holds IND Recognised Sponsor status. Not all EOR providers do. Jackson & Frank does. Without this status, an EOR cannot submit a fast-track Skilled Worker Visa. It is worth confirming this with any provider before you commit.'
      },
      {
        question: 'Can I hire a non-EU candidate who is already living in the Netherlands?',
        answer: 'Yes, and the process is often faster. If your candidate holds a valid Dutch residence permit — from a previous employer, an orientation year visa (Zoekjaar), or a partner\'s permit. The route to starting work is typically shorter. We assess their current status during the eligibility check.'
      }
    ],
    'process-timeline': [
      {
        question: 'How long does the Skilled Worker Visa (Kennismigrant) take?',
        answer: (
          <div>
            <p className="mb-3">Timeline depends on where your candidate is currently based.</p>
            <p className="mb-3"><strong>Already in the Netherlands:</strong> sponsor change via document submission. Allow 2–4 weeks — the main variable is their notice period.</p>
            <p className="mb-3"><strong>Outside the Netherlands:</strong> full immigration applies. We submit the Skilled Worker Visa application directly to the IND. If an Entry Visa (MVV) is required, that runs through the Dutch embassy in their country of residence. Allow 8–12 weeks from the point we have all candidate documents.</p>
            <p>{"We don't overpromise on timelines. You'll know exactly what to expect before you commit."}</p>
          </div>
        )
      },
      {
        question: 'What happens to the visa if our hire changes roles or salary?',
        answer: 'Any change to employment terms, including role title, salary, or working hours, must be reported to the IND within four weeks. Jackson & Frank manages that reporting on your behalf. You notify us of the change and we handle the IND submission. You do not need to interact with the Dutch Immigration Authority directly.'
      },
      {
        question: 'What does Jackson & Frank handle versus what we handle?',
        answer: (
          <div>
            <p className="mb-2 font-semibold text-slate-800">Jackson &amp; Frank handles:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600">
              <li>Employment contract and legal employer status</li>
              <li>Skilled Worker Visa application and IND submissions</li>
              <li>Dutch payroll and statutory employer obligations</li>
              <li>30% ruling administration (if applicable)</li>
              <li>Ongoing IND compliance reporting and visa renewals</li>
            </ul>
            <p className="mb-2 font-semibold text-slate-800">You handle:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Day-to-day work direction and performance management</li>
              <li>Role and project decisions</li>
            </ul>
          </div>
        )
      }
    ],
    'costs-tax': [
      {
        question: 'What are the 2026 salary requirements for the Skilled Worker Visa?',
        answer: (
          <div>
            <p className="mb-2">The 2026 gross monthly salary thresholds are:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>€5,942/month</strong> for employees aged 30 and over</li>
              <li><strong>€4,357/month</strong> for employees under 30</li>
              <li><strong>€3,122/month</strong> for recent graduates (reduced criterion)</li>
            </ul>
            <p className="mt-2 text-sm text-slate-500">Figures exclude the 8% Dutch holiday allowance (vakantiegeld) and are updated each January. We confirm the applicable threshold during the eligibility assessment.</p>
          </div>
        )
      },
      {
        question: 'Can you handle the 30% ruling for our hire?',
        answer: 'Yes. The 30% ruling allows qualifying international employees to receive up to 30% of gross salary tax-free as compensation for relocation costs. If your hire qualifies, we administer it through payroll and handle the joint application to the Dutch Tax Authority. We assess eligibility during onboarding and flag it proactively — it\'s often a material factor in offer negotiations.'
      },
      {
        question: 'What does it cost compared to opening a Dutch entity?',
        answer: (
          <div>
            <p className="mb-3 font-semibold text-slate-800">Going it alone: Dutch BV and IND sponsor status over 24 months:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600">
              <li>Corporate setup + IND sponsor fee: €4,500–€5,500</li>
              <li>Annual admin, tax & payroll: €12,000–€20,000</li>
              <li>Sick leave liability (Arbodienst + insurance): €8,000–€10,000</li>
              <li>Office & infrastructure: €16,000–€20,000</li>
              <li>Equipment: €4,000–€5,000</li>
              <li className="font-bold text-slate-900 list-none mt-1">Total: ~€95,000–€110,000 over 24 months</li>
            </ul>

            <p className="mb-2 font-semibold text-[#143369]">Via Jackson &amp; Frank over 24 months:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600">
              <li>EOR management fee: market rate per employee per month</li>
              <li>Corporate setup, admin, compliance, sick leave: €0 — included</li>
              <li>Office: ~€2,400 (virtual address only)</li>
              <li>Equipment: €4,000–€5,000</li>
              <li className="font-bold text-slate-900 list-none mt-1">Total: significantly less. Your first hire starts in weeks, not after a 3 to 6 month setup.</li>
            </ul>

            <p className="text-sm text-slate-500 italic mt-2">Full breakdown available on request.</p>
          </div>
        )
      }
    ]
  }

  const displayedFaqs = faqsByCategory[activeFaqTab]
  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-secondary/35 selection:text-primary">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      {/* FAQ Schema for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can I hire someone in the Netherlands without opening a Dutch company?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Jackson & Frank becomes the legal employer in the Netherlands on your behalf. You do not need a Dutch legal entity (BV) or any local presence. We issue the employment contract, run payroll, and manage all immigration compliance. Your candidate is legally employed in the Netherlands from day one."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to become an approved immigration sponsor yourself?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Jackson & Frank already holds approved sponsor status (Erkend Referent). We submit your candidate's visa application on your behalf, which means you bypass a 12 to 24 month process and thousands of euros in government fees. Your candidate benefits from our status immediately."
                }
              },
              {
                "@type": "Question",
                "name": "Can an Employer of Record sponsor a Skilled Worker Visa in the Netherlands?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, but only if the Employer of Record holds IND Recognised Sponsor status. Not all EOR providers do. Jackson & Frank does. Without this status, an EOR cannot submit a fast-track Skilled Worker Visa. It is worth confirming this with any provider before you commit."
                }
              },
              {
                "@type": "Question",
                "name": "Can I hire a non-EU candidate who is already living in the Netherlands?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, and the process is often faster. If your candidate holds a valid Dutch residence permit — from a previous employer, an orientation year visa (Zoekjaar), or a partner's permit. The route to starting work is typically shorter. We assess their current status during the eligibility check."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the Skilled Worker Visa (Kennismigrant) take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Timeline depends on where your candidate is currently based. Already in the Netherlands: sponsor change via document submission. Allow 2–4 weeks. Outside the Netherlands: full immigration applies. We submit the Skilled Worker Visa application directly to the IND. If an Entry Visa (MVV) is required, that runs through the Dutch embassy in their country of residence. Allow 8–12 weeks from the point we have all candidate documents."
                }
              },
              {
                "@type": "Question",
                "name": "What happens to the visa if our hire changes roles or salary?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Any change to employment terms, including role title, salary, or working hours, must be reported to the IND within four weeks. Jackson & Frank manages that reporting on your behalf. You notify us of the change and we handle the IND submission."
                }
              },
              {
                "@type": "Question",
                "name": "What does Jackson & Frank handle versus what we handle?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Jackson & Frank handles: Employment contract and legal employer status; Skilled Worker Visa application and IND submissions; Dutch payroll and statutory obligations; 30% ruling administration (if applicable); IND compliance reporting and renewals. You handle: Day-to-day work direction and performance management; Role and project decisions."
                }
              },
              {
                "@type": "Question",
                "name": "What are the 2026 salary requirements for the Skilled Worker Visa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 2026 gross monthly salary thresholds are: €5,942/month for employees aged 30 and over; €4,357/month for employees under 30; €3,122/month for recent graduates (reduced criterion). Figures exclude the 8% holiday allowance."
                }
              },
              {
                "@type": "Question",
                "name": "Can you handle the 30% ruling for our hire?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The 30% ruling allows qualifying international employees to receive up to 30% of gross salary tax-free. If your hire qualifies, we administer it through payroll and handle the joint application to the Dutch Tax Authority."
                }
              },
              {
                "@type": "Question",
                "name": "What does it cost compared to opening a Dutch entity?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Going it alone with a Dutch BV and IND sponsor status costs around €95,000–€110,000 over 24 months, including setup fees, admin, tax, payroll, and office costs. Via Jackson & Frank, you pay a simple monthly fee, and all compliance, admin, and setups are included for €0, resulting in significantly lower costs."
                }
              }
            ]
          })
        }}
      />
      {/* HubSpot tracking code — also loaded globally in app/layout.tsx; same id
          dedupes via next/script so it won't double-load. Added explicitly here
          per the campaign launch checklist. */}
      <Script
        id="hs-script-loader"
        src={`https://js-eu1.hs-scripts.com/145156571.js`}
        strategy="lazyOnload"
      />
      {/* HERO SECTION */}
      <section id="hero" className="relative bg-[#0F1F3D] text-white pt-32 pb-10 lg:pt-40 lg:pb-16 overflow-hidden">
        {/* HubSpot form embed — renders into the target divs below */}
        <Script src="https://js-eu1.hsforms.net/forms/embed/145156571.js" strategy="afterInteractive" />

        {/* Background micro-accents */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-secondary rounded-full filter blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full filter blur-[120px]" />
        </div>

        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              {/* Eyebrow — small caps amber, above H1 */}
              <span className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mb-5">
                IND Recognised Sponsor · Netherlands
              </span>

              <h1 className="text-[32px] sm:text-5xl lg:text-6xl font-serif font-normal text-white leading-[1.3] sm:leading-[1.25] mb-5">
                Hire non-EU talent in the Netherlands.
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-9 max-w-xl">
                No Dutch entity required. No 12-month wait to get sponsor status yourself.
              </p>

              {/* Divider line */}
              <div className="border-t border-white/15 my-6 w-full max-w-lg" />

              {/* Certificates section */}
              <div className="flex flex-col gap-5 text-left w-full max-w-lg">
                {/* IND Recognised Sponsor */}
                <div className="flex items-center gap-4">
                  <div className="w-14 flex justify-center shrink-0">
                    <Image
                      src="/license/logo-ind.svg"
                      alt="IND Recognised Sponsor"
                      width={100}
                      height={44}
                      className="h-10 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
                      priority
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-bold text-white leading-tight">Official IND Recognised Sponsor</p>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">Fast-track visa processing in 2 to 4 weeks</p>
                  </div>
                </div>

                {/* NEN Certified / SNA */}
                <div className="flex items-center gap-4">
                  <div className="w-14 flex justify-center shrink-0">
                    <Image
                      src="/license/sna-Certificering-Nederland-Logo.png"
                      alt="NEN 4400-1 Certified"
                      width={100}
                      height={44}
                      className="h-10 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
                      priority
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-bold text-white leading-tight">Local Staffing License (NEN 4400-1)</p>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">Your hire is legally employed from day one.</p>
                  </div>
                </div>

                {/* GDPR Compliance */}
                <div className="flex items-center gap-4">
                  <div className="w-14 flex justify-center shrink-0">
                    <Image
                      src="/license/gdpr_graphic.svg"
                      alt="GDPR Compliant"
                      width={100}
                      height={44}
                      className="h-10 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
                      priority
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-bold text-white leading-tight">GDPR Compliant</p>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">Your data is protected under EU law.</p>
                  </div>
                </div>

                {/* Sponsor Transfer Micro-copy */}
                <div className="mt-3 pt-3 border-t border-white/10 max-w-[400px]">
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed italic">
                    Already found someone in the Netherlands on another employer&apos;s permit? We can transfer their sponsorship to us in 2 to 4 weeks.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column - HubSpot Form */}
            <div className="lg:col-span-6 lg:col-start-7 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[550px]">
                <div
                  className="hs-form-frame w-full"
                  data-region="eu1"
                  data-form-id="ae5f8766-1a3f-4da7-8886-6ab2b92c3780"
                  data-portal-id="145156571"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS TRUST BAR */}
      <div className="w-full bg-slate-50 border-y border-slate-200/80 py-3.5 sm:py-4">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full grid grid-cols-2 gap-4 md:flex md:flex-row md:items-center md:justify-between text-xs sm:text-sm font-bold text-slate-800">
            <div className="flex items-center gap-2 justify-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[#143369]">1,279+ Employees Placed</span>
            </div>
            <span className="hidden md:inline text-slate-300" aria-hidden="true">|</span>
            <div className="flex items-center gap-2 justify-start md:justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[#143369]">18+ Active Markets</span>
            </div>
            <span className="hidden md:inline text-slate-300" aria-hidden="true">|</span>
            <div className="flex items-center gap-2 justify-start md:justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[#143369]">2–12 Weeks Hire Start Timeline</span>
            </div>
            <span className="hidden md:inline text-slate-300" aria-hidden="true">|</span>
            <div className="flex items-center gap-2 justify-start md:justify-end">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[#143369]">24-Hour Eligibility Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 — PAIN POINTS */}
      <section className="pt-10 lg:pt-14 pb-12 lg:pb-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              You&apos;ve found the right person. Here is what is stopping you from hiring them.
            </h2>
          </div>

          {/* Cards: 3 columns side-by-side on desktop; full-width auto-advancing slider on mobile */}
          <div
            ref={painCardsRef}
            onScroll={handlePainScroll}
            className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {painPoints.map((p, i) => {
              const Icon = p.Icon
              return (
                <div
                  key={i}
                  className="snap-center shrink-0 w-full md:w-auto group flex flex-col items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${p.iconWrap}`}>
                    <Icon className={`w-6 h-6 ${p.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{p.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{p.body}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Slider dots — mobile only */}
          <div className="flex md:hidden justify-center gap-2 mt-4 mb-10">
            {painPoints.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to card ${i + 1}`}
                onClick={() => scrollToPainCard(i)}
                className={`h-2 rounded-full transition-all duration-300 ${activePainCard === i ? 'w-6 bg-primary' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </div>

          <div className="hidden md:block mb-10" />

          {/* Solution Callout — blue */}
          <div className="bg-[#e8f0fd] rounded-2xl border-l-4 border-[#143369] p-6 sm:p-8 shadow-xs">
            <h4 className="text-[#143369] font-bold text-lg mb-2">That is where we come in.</h4>
            <p className="text-slate-700 font-medium leading-relaxed mb-4 text-sm sm:text-base">
              Jackson &amp; Frank is an IND Recognised Sponsor. You do not need a Dutch entity and you do not need to wait. We handle the sponsorship on your behalf.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#143369] text-sm font-semibold">
              <li>Candidate already in the Netherlands: they can start in 2 to 4 weeks.</li>
              <li>Candidate outside the Netherlands: allow 8 to 12 weeks for full immigration clearance.</li>
            </ul>
          </div>
        </div>
      </section>


      {/* SECTION 4 — HOW IT WORKS */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Here is how we get your hire working in the Netherlands.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-3xl">
              We manage every interaction with the Dutch authorities. You provide the candidate details and assign the work.
            </p>
          </div>

          {/* Three steps — horizontal row on desktop, stacked on mobile */}
          {/* Three steps — horizontal row on desktop, stacked on mobile */}
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200 p-6 bg-white hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedStep1(!expandedStep1)}
                  className="w-full text-left cursor-pointer group focus:outline-none flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col">
                    <span className="block text-4xl font-extrabold text-secondary mb-3">1</span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                      Tell us about your hire.
                    </h3>
                  </div>
                  <div className={`transition-transform duration-300 shrink-0 ${expandedStep1 ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {expandedStep1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-2 pt-4 border-t border-slate-100">
                        Share your candidate&apos;s nationality, role, and salary. We confirm eligibility within 24 hours. No commitment required.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200 p-6 bg-white hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedStep2(!expandedStep2)}
                  className="w-full text-left cursor-pointer group focus:outline-none flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col">
                    <span className="block text-4xl font-extrabold text-secondary mb-3">2</span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                      We submit the visa application.
                    </h3>
                  </div>
                  <div className={`transition-transform duration-300 shrink-0 ${expandedStep2 ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {expandedStep2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-2 pt-4 border-t border-slate-100">
                        As an IND Recognised Sponsor, we submit your candidate&apos;s application directly to the Dutch Immigration Authority. This gives your candidate access to fast-track processing that companies without sponsor status cannot use.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200 p-6 bg-white hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedStep3(!expandedStep3)}
                  className="w-full text-left cursor-pointer group focus:outline-none flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col">
                    <span className="block text-4xl font-extrabold text-secondary mb-3">3</span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                      Your hire begins their role.
                    </h3>
                  </div>
                  <div className={`transition-transform duration-300 shrink-0 ${expandedStep3 ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {expandedStep3 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 pt-4 border-t border-slate-100">
                        {/* Scenarios */}
                        <div className="space-y-3">
                          {/* Scenario 1 */}
                          <div className="text-left border border-slate-200 rounded-xl p-3 bg-white hover:border-amber-400 transition-all duration-200">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedNetherlands(!expandedNetherlands);
                              }}
                              className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none"
                            >
                              <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                                Already in the Netherlands
                              </span>
                              <div className={`transition-transform duration-200 shrink-0 ${expandedNetherlands ? 'rotate-180' : ''}`}>
                                <ChevronDown className="w-4 h-4 text-amber-900/60 group-hover:text-amber-900 transition-colors" />
                              </div>
                            </button>
                            <AnimatePresence initial={false}>
                              {expandedNetherlands && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 pt-2 border-t border-slate-100">
                                    We process a sponsor change via document submission. Allow 2 to 4 weeks, depending on their notice period.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Scenario 2 */}
                          <div className="text-left border border-slate-200 rounded-xl p-3 bg-white hover:border-indigo-400 transition-all duration-200">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedOutside(!expandedOutside);
                              }}
                              className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none"
                            >
                              <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-900 border border-indigo-200">
                                Outside the Netherlands
                              </span>
                              <div className={`transition-transform duration-200 shrink-0 ${expandedOutside ? 'rotate-180' : ''}`}>
                                <ChevronDown className="w-4 h-4 text-indigo-900/60 group-hover:text-indigo-900 transition-colors" />
                              </div>
                            </button>
                            <AnimatePresence initial={false}>
                              {expandedOutside && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 pt-2 border-t border-slate-100">
                                    Full immigration applies. We handle the IND submission, the Entry Visa (MVV) process if your candidate&apos;s nationality requires it, and local registration on arrival. Allow 8 to 12 weeks from the point we have all candidate documents.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Footnote */}
                        <div className="mt-4 pt-4 border-t border-slate-200/60">
                          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed italic">
                            Throughout employment, we run Dutch payroll, manage IND compliance reporting, and administer the 30% ruling if your hire qualifies.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Single reassurance line beneath all three steps */}
          <div className="mt-6 rounded-2xl bg-[#e8f0fd] border border-primary/15 p-5">
            <p className="text-[#143369] font-bold text-center text-sm sm:text-base">
              You stay in control of the work. We stay in control of everything the Dutch authorities require.
            </p>
          </div>
        </div>
      </section>



      {/* WHY JACKSON & FRANK SECTION */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-10 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight mb-4">
              Most companies who come to us have already ruled out opening a Dutch entity.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Here is what that looks like in practice.
            </p>
          </div>

          <div
            ref={whyCardsRef}
            onScroll={handleWhyScroll}
            className="flex md:flex md:flex-row md:flex-wrap md:justify-center md:items-stretch gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Card 1 */}
            <div className="snap-center shrink-0 w-full md:w-[calc((100%-2*24px)/3)] lg:w-[calc((100%-2*32px)/3)] bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fd] text-[#143369] flex items-center justify-center mb-6">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Direct support. No middlemen.
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  We manage our Dutch operations directly. No subcontracting, no third parties. When you have a question, you reach us directly and get an answer. Not a ticket number.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="snap-center shrink-0 w-full md:w-[calc((100%-2*24px)/3)] lg:w-[calc((100%-2*32px)/3)] bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fd] text-[#143369] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Fully certified. Legally sound from day one.
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Not every EOR can legally sponsor foreign nationals in the Netherlands. We hold IND Recognised Sponsor status and are NEN 4400-1 certified. Your hire&apos;s employment structure stands up from day one.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="snap-center shrink-0 w-full md:w-[calc((100%-2*24px)/3)] lg:w-[calc((100%-2*32px)/3)] bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fd] text-[#143369] flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Netherlands today. Eighteen markets tomorrow.
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  When you are ready to grow beyond the Netherlands, we are already there. Germany, Belgium, Spain, France, the UK, UAE, India and more. Same relationship, with tailored local terms.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="snap-center shrink-0 w-full md:w-[calc((100%-2*24px)/3)] lg:w-[calc((100%-2*32px)/3)] bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fd] text-[#143369] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  When something goes wrong, we solve it.
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Two candidates in our automotive case hit a visa wall mid-process. We recruited local replacements, ran the full hiring process, and kept the launch on schedule. Our clients do not manage complications. We do.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="snap-center shrink-0 w-full md:w-[calc((100%-2*24px)/3)] lg:w-[calc((100%-2*32px)/3)] bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fd] text-[#143369] flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Pay only when you hire.
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  With J&amp;F, you pay a fixed monthly fee per employee. No hidden costs with external accountants, specialist insurance or standalone payroll software. When the employment stops, so does the fee.
                </p>
              </div>
            </div>
          </div>

          {/* Slider dots — mobile only */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to card ${i + 1}`}
                onClick={() => scrollToWhyCard(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeWhyCard === i ? 'w-6 bg-primary' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — SOCIAL PROOF */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8">
            <span className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider mb-2 block">
              IN PRACTICE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Chinese Automotive Brand Opens Amsterdam Store After 15 Hires Across Six Months.
            </h2>
          </div>

          {/* Case study card — lead element, navy left border */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200/60 border-l-4 border-l-[#143369] p-6 sm:p-8 lg:p-10 shadow-sm mb-8">
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
              A Chinese automotive brand needed 15 people on the ground in Amsterdam for their first European retail launch. They had no Dutch entity, no local employment infrastructure, and a launch date that could not move. When two candidates hit a visa eligibility wall mid-process, we recruited local replacements and ran the full hiring process ourselves. All 15 positions were filled. The store opened on schedule.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
              Automotive sector · Guangzhou to Amsterdam
            </p>

            <div className="rounded-xl bg-[#e8f0fd] border-l-4 border-primary p-5">
              <blockquote className="text-[#143369] italic text-sm sm:text-base leading-relaxed mb-3">
                &ldquo;The management does not only do their HR jobs wonderfully, but has had a larger view of the global need of movement of talent and knowledge migrants. Their compliance has given our clients great confidence to work with them.&rdquo;
              </blockquote>
              <p className="font-bold text-slate-900 text-sm">
                Xin Shi LLM <span className="text-slate-500 font-medium">· Head of China Desk, Amice Advocaten</span>
              </p>
            </div>
          </div>

          {/* Testimonial card — full width */}
          <div className="w-full mb-12">
            {testimonials.slice(1).map((test, index) => (
              <div key={index} className="w-full">
                <TestimonialCard test={test} />
              </div>
            ))}
          </div>



          {/* Client Logos Strip (Grayscale, centering, premium layout) */}
          <div className="mt-16 border-t border-slate-100 pt-12">
            <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
              Trusted by progressive teams globally
            </p>
            
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee-rtl {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-rtl {
                animation: marquee-rtl 25s linear infinite;
              }
              .mask-gradient {
                mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
              }
            `}} />

            {/* Desktop View: Single centered row, all logos on the same line */}
            <div className="hidden md:flex items-center justify-between gap-6 lg:gap-8 w-full max-w-5xl mx-auto px-4">
              <img
                src="/logos/shell.svg"
                alt="Shell logo"
                className="h-8 w-auto object-contain shrink-0"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
              <img
                src="/logos/xpeng.svg"
                alt="Xpeng logo"
                className="h-7 w-auto object-contain shrink-0"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
              <img
                src="/logos/sany.svg"
                alt="Sany logo"
                className="h-7 w-auto object-contain shrink-0"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
              <img
                src="/logos/citibank.svg"
                alt="Citibank logo"
                className="h-7 w-auto object-contain shrink-0"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
              <img
                src="/logos/popmart.svg"
                alt="Popmart logo"
                className="h-8 w-auto object-contain shrink-0"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
              <img
                src="/logos/hepha-bikes.png"
                alt="Hepha Bikes logo"
                className="h-8 w-auto object-contain shrink-0"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
              <img
                src="/logos/cruit.svg"
                alt="Cruit B.V. logo"
                className="h-7 w-auto object-contain shrink-0"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
            </div>

            {/* Mobile View: Infinite marquee moving right-to-left */}
            <div className="md:hidden relative w-full overflow-hidden py-2 mask-gradient">
              <div className="flex w-max animate-marquee-rtl">
                {/* Track 1 */}
                <div className="flex items-center gap-10 pr-10 shrink-0">
                  <img
                    src="/logos/shell.svg"
                    alt="Shell logo"
                    className="h-7 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/xpeng.svg"
                    alt="Xpeng logo"
                    className="h-6 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/sany.svg"
                    alt="Sany logo"
                    className="h-6 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/citibank.svg"
                    alt="Citibank logo"
                    className="h-6 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/popmart.svg"
                    alt="Popmart logo"
                    className="h-7 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/hepha-bikes.png"
                    alt="Hepha Bikes logo"
                    className="h-7 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/cruit.svg"
                    alt="Cruit B.V. logo"
                    className="h-6 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                </div>
                {/* Track 2 */}
                <div className="flex items-center gap-10 pr-10 shrink-0" aria-hidden="true">
                  <img
                    src="/logos/shell.svg"
                    alt="Shell logo"
                    className="h-7 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/xpeng.svg"
                    alt="Xpeng logo"
                    className="h-6 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/sany.svg"
                    alt="Sany logo"
                    className="h-6 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/citibank.svg"
                    alt="Citibank logo"
                    className="h-6 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/popmart.svg"
                    alt="Popmart logo"
                    className="h-7 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/hepha-bikes.png"
                    alt="Hepha Bikes logo"
                    className="h-7 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                  <img
                    src="/logos/cruit.svg"
                    alt="Cruit B.V. logo"
                    className="h-6 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — FINAL CTA (mirrors the hero in tone) */}
      <section className="bg-[#0F1F3D] text-white py-12 md:py-20 lg:py-24 scroll-mt-24 relative overflow-hidden group">
        {/* Desktop-only left side background image - absolute layout */}
        <div className="hidden md:block absolute left-0 top-0 h-full w-[60%] lg:w-[65%] z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/case-study/smart-mobility-brand-netherlands-workforce-setup.png"
            alt="Smart Mobility Brand Netherlands Workforce Setup"
            fill
            className="object-cover object-left opacity-85 transition-all duration-[750ms] ease-out transform group-hover:scale-[1.03]"
            sizes="50vw"
            priority
          />
          
          {/* Opacity Fade/Blur Effects */}
          {/* 1. Backdrop blur transition zone in the middle */}
          <div 
            className="absolute inset-y-0 right-0 w-[45%] pointer-events-none z-10"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              maskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent 100%)'
            }}
          />

          {/* 2. Gradient overlay fading from transparent (left) to solid dark blue (right) */}
          <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, transparent 30%, rgba(15, 31, 61, 0.4) 50%, rgba(15, 31, 61, 0.95) 80%, #0F1F3D 100%)',
            }}
          />
        </div>

        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Mobile-only Image Card - clear and modern */}
            <div className="block md:hidden w-full h-48 sm:h-60 relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/case-study/smart-mobility-brand-netherlands-workforce-setup.png"
                alt="Smart Mobility Brand Netherlands Workforce Setup"
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
            </div>

            {/* Empty column to push text to the right half on desktop */}
            <div className="hidden md:block md:col-span-5 lg:col-span-6" />

            {/* Right Column - Content */}
            <div className="col-span-1 md:col-span-7 lg:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                Your candidate is waiting.
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-5 max-w-lg">
                Tell us about the person you want to hire. We will come back within 24 hours.
              </p>
              <a
                href="#hero"
                className="w-full text-center md:w-auto md:inline-block bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-lg shadow-lg shadow-secondary/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get a free eligibility assessment &rarr;
              </a>
              <p className="mt-4 text-xs sm:text-sm text-slate-500 italic">
                We&apos;ll tell you honestly if we&apos;re not the right fit.
              </p>

              {/* Still have questions? | Book a Call */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm text-slate-300 font-medium w-full max-w-lg">
                <HelpCircle className="w-4 h-4 text-secondary shrink-0" />
                <span>Still have questions?</span>
                <span className="text-slate-500" aria-hidden="true">|</span>
                <a
                  href={getBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => fireContactConversion()}
                  className="text-secondary font-bold hover:underline"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
