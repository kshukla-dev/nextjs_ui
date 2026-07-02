'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileCheck,
  Globe,
  Heart,
  LayoutDashboard,
  Languages,
  MapPin,
  MinusCircle,
  Percent,
  PiggyBank,
  Scale,
  Shield,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import FAQSection from '@/components/templates/FAQSection'
import italyEorData from '@/data/italy-eor.json'

const data = italyEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Italian law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Rome', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Euro (EUR)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Italian', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '59M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Very high', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '22%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'National Health Service (SSN)', icon: Heart, desc: 'Mandatory public health insurance (Servizio Sanitario Nazionale) covering medical care and family benefits.' },
  { title: 'Social Security (INPS)', icon: Shield, desc: 'Istituto Nazionale della Previdenza Sociale - pension insurance, unemployment insurance, and social security contributions.' },
  { title: 'Workplace Injury Insurance (INAIL)', icon: Wallet, desc: 'Istituto Nazionale per l\'Assicurazione contro gli Infortuni sul Lavoro - mandatory workplace accident and injury insurance.' },
  { title: 'TFR & Benefits', icon: PiggyBank, desc: 'Trattamento di Fine Rapporto (severance fund), 13th month salary (tredicesima), and statutory leave (20 days minimum).' },
]

const publicHolidays2026 = [
  { name: "New Year's Day (Capodanno)", date: 'January 1, 2026 (Thursday)' },
  { name: 'Epiphany (Epifania)', date: 'January 6, 2026 (Tuesday)' },
  { name: 'Easter Monday (Pasquetta)', date: 'April 6, 2026 (Monday)' },
  { name: 'Liberation Day (Festa della Liberazione)', date: 'April 25, 2026 (Saturday)' },
  { name: 'Labour Day (Festa dei Lavoratori)', date: 'May 1, 2026 (Friday)' },
  { name: 'Republic Day (Festa della Repubblica)', date: 'June 2, 2026 (Tuesday)' },
  { name: 'Assumption Day (Ferragosto)', date: 'August 15, 2026 (Saturday)' },
  { name: "All Saints' Day (Ognissanti)", date: 'November 1, 2026 (Sunday)' },
  { name: 'Immaculate Conception (Immacolata)', date: 'December 8, 2026 (Tuesday)' },
  { name: 'Christmas Day (Natale)', date: 'December 25, 2026 (Friday)' },
  { name: "St. Stephen's Day (Santo Stefano)", date: 'December 26, 2026 (Saturday)' },
]

const eorPros = [
  'No Italian entity (S.r.l./S.p.A.) required save significant setup cost and 6–12 months.',
  'Hire employees in Italy in 2–3 days with full INPS, INAIL, and legal compliance.',
  'Jackson & Frank handles payroll, taxes (IRPEF, IRAP), social security (INPS), and Italian employment law.',
  'Local Italian employment contracts (contratto di lavoro) and mandatory benefits (INPS, INAIL, TFR, tredicesima) included.',
  'Work permit support (Nulla Osta, Permesso di Soggiorno) for non-EU talent.',
  'Single provider for multiple countries if you expand beyond Italy.',
]

const eorCons = [
  'Ongoing monthly cost per employee vs. long-term lower cost with your own entity at scale.',
  'You depend on the EOR for compliance choose a licensed provider like Jackson & Frank.',
  'Collective agreements (CCNL) and labor regulations may apply; we handle this.',
]

const eorBenefits = [
  'No local entity required save cost and 6–12 months setup',
  'Full compliance with Italian employment law (Codice del Lavoro) and INPS/INAIL',
  'Local employment contracts and payroll from day one',
  'Work permit and visa support',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written contract required (contratto di lavoro)', 'Probation: 1–6 months depending on CCNL and level (periodo di prova)', 'Unlimited vs fixed-term rules per Codice del Lavoro'],
  },
  {
    title: 'Notice & severance',
    items: ['Notice: varies by CCNL, typically 8–15 days to 6 months (preavviso)', 'TFR (Trattamento di Fine Rapporto) mandatory: ~1 month gross salary per year', 'Termination protection under Codice del Lavoro'],
  },
  {
    title: 'Pay & benefits',
    items: ['No universal minimum wage (set by CCNL)', '20 days leave minimum (often more per CCNL)', '13th month salary (tredicesima) mandatory', 'Sick pay: INPS 50% from day 4, often topped up to 100% per CCNL'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'Italian entity & INPS/INAIL', jf: 'Own Italian entity', others: 'Varies' },
  { feature: 'Dedicated Italy support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Work permit / visa support', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, INPS contributions, INAIL premiums, tax withholdings (IRPEF), payslips (busta paga), year-end, TFR management.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract management, amendments, leave, and local HR queries.', icon: Users },
  { title: 'Benefits', desc: 'INPS, INAIL, TFR, tredicesima, and mandatory benefits per CCNL.', icon: Shield },
  { title: 'Contracts', desc: 'Italian-compliant employment contracts (contratto di lavoro) and addendums per Codice del Lavoro and CCNL.', icon: FileCheck },
  { title: 'Compliance', desc: 'CCNL, INPS, INAIL, tax office (Agenzia delle Entrate), Comunicazione Obbligatoria, and employment law.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer.' },
  { day: 'Day 2', title: 'Contract & onboarding', desc: 'We issue the Italian contract (contratto di lavoro); employee signs. We register with INPS, INAIL, obtain Codice Fiscale, and submit Comunicazione Obbligatoria.' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is onboarded and included in the next payroll run.' },
]

const payrollHandles = [
  'Income tax (IRPEF) and regional production tax (IRAP) withholdings',
  'Social security (INPS) contributions for pension, unemployment, and family benefits',
  'Workplace injury insurance (INAIL) premiums',
  'TFR (Trattamento di Fine Rapporto) accrual and management',
  '13th month salary (tredicesima) calculation and payment',
  'Payslips (busta paga) and annual statements',
  'Tax and social security filings (monthly INPS, quarterly IRAP)',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage Italian employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and export for finance.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: '6–12 months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (incorporation, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR holds risk', entity: 'You hold full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local provider' },
]

const startupUseCases = [
  'First hires in the EU without an Italian S.r.l./S.p.A.',
  'Testing the market with a small team in Milan or Rome',
  'Remote-first teams with Italian talent',
]

const enterpriseUseCases = [
  'Scaling Italian teams without new entities',
  'M&A or project-based hiring in Italy',
  'Centralized global EOR with strong Italian compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage', value: 'Set by CCNL' },
  { label: 'Statutory leave', value: '20 days minimum' },
  { label: '13th month salary', value: 'Mandatory (tredicesima)' },
]

export default function ItalyPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-italy.webp"
            alt="Italy Employer of Record"
            fill
            className="object-cover object-center scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-[#f7931e]/15 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="mb-6 sm:mb-8">
              <h1 className="font-bold text-white leading-[1.1] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl drop-shadow-2xl">
                Hire in <span className="text-[#f7931e] relative">Italy</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in Italy without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Italy: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in Italy
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {trustBadges.map((b) => {
                const Icon = b.icon
                return (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/95 text-sm font-medium"
                  >
                    <Icon className="w-4 h-4 text-[#f7931e] shrink-0" />
                    {b.label}
                  </span>
                )
              }) || null}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" aria-hidden />
      </section>

      {/* 2. Country Facts */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Italy at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-10 leading-relaxed">
            Italy is a major European economy known for its strong manufacturing, design, and fashion industries. Navigating its regional labor laws and national collective agreements (CCNL) makes it a vital market for Employer of Record and Italy payroll outsourcing.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {countryFacts.map((fact, index) => {
              const IconComponent = fact.icon
              return (
                <div key={index} className="flex flex-col items-center justify-center text-center py-6 px-4 rounded-xl bg-white border border-gray-200 hover:border-primary/30 transition-all shadow-sm">
                  <IconComponent className={`w-6 h-6 mb-3 ${fact.iconColor}`} />
                  <p className="text-xs text-gray-500 mb-1">{fact.label}</p>
                  <p className="text-[15px] font-semibold text-gray-900">{fact.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. What is EOR in Italy */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Employer of Record (EOR) in Italy?"
            description="Employer of Record Italy lets you hire Italian employees without setting up a local entity (S.r.l./S.p.A.). We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in Italy without entity setup."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mt-10 items-stretch">
            {/* Who needs Italy EOR? */}
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-left rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs Italy EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  US, UK, EU, and global companies hiring in Italy; startups and scaleups building an Italian team; enterprises expanding without new entities; HR leaders and recruiters who need fast, compliant hiring.
                </p>
              </div>
            </div>
            {/* Benefits */}
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-left rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Benefits</h3>
                </div>
                <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
                  {eorBenefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/employer-of-record" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Learn more about global EOR <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 4. Why Italy is attractive for hiring */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why Italy?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why Italy is an attractive option for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Italy stands as Europe&apos;s third-largest economy and a global leader in fashion, luxury goods, automotive, machinery, and food production. With a highly skilled, creative workforce and a strong tradition of craftsmanship and design excellence, Italy offers exceptional talent across manufacturing, engineering, IT, fashion, and research sectors.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                The country&apos;s strategic location in the heart of the Mediterranean, excellent infrastructure, and well-developed transportation networks make it an ideal gateway to European and North African markets. Italy&apos;s stable political environment, strong legal framework (Codice del Lavoro), and commitment to quality create a reliable and predictable business climate. Italian employment laws 2026 and a clear INPS/INAIL framework make Italy EOR and Italy payroll outsourcing straightforward for international companies.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Italian workers are known for their creativity, technical expertise, and strong work ethic. The country&apos;s excellent quality of life, rich cultural heritage, and beautiful landscapes make it an attractive destination for international talent. Whether you need Italy payroll outsourcing, full EOR, or visa support, Italy is a prime destination for scaling your European team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Employee Benefits */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in Italy
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            We manage mandatory and optional benefits for your Italian employees through our Italy EOR and payroll platform. Full compliance with Italian employment laws 2026, including INPS, INAIL, TFR, tredicesima, and statutory leave.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {employeeBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 text-primary">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg! sm:text-xl! mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-base!">{benefit.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. Italy Employment Laws 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Italy Employment Laws 2026: What Companies Must Know"
            description="Stay compliant with Italian employment law (Codice del Lavoro). Key rules on contracts, probation, notice, CCNL, and employee protections."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {employmentLaws.map((block) => (
              <div key={block.title} className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-primary mb-4">{block.title}</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start text-base gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-8 max-w-3xl mx-auto text-center text-sm italic">
            Non-compliance can lead to fines, back payments, and reputational risk. With Italy EOR, Jackson & Frank ensures your hires meet Italian employment laws 2026.
          </p>
        </div>
      </section>

      {/* 7. Pros and Cons of Italy EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of Italy EOR"
            description="Weigh the benefits and considerations of using an Employer of Record in Italy versus setting up your own entity."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of Italy EOR
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                {eorPros.map((item) => (
                  <li key={item} className="flex items-start text-base gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MinusCircle className="w-5 h-5 text-amber-600" />
                Considerations
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                {eorCons.map((item) => (
                  <li key={item} className="flex items-start text-base gap-2">
                    <MinusCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why Choose Jackson & Frank Italy EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Jackson & Frank for Italy EOR?"
            description="Speed, compliance, and local expertise so you can focus on growing your team."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
              { icon: Scale, title: 'Full compliance', desc: 'Italian entity, CCNL awareness, INPS/INAIL and employment law compliance built in.' },
              { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of Italian payroll, benefits, and HR practices.' },
              { icon: Shield, title: 'Risk managed', desc: 'We carry employment and tax risk as the legal employer in Italy.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-xl border border-gray-200 p-6 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg! sm:text-xl! text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-base">{item.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Button href="/contact?reason=eor_services" size="lg" className="bg-primary text-white hover:bg-primary/90">
              Get a custom quote
            </Button>
          </div>
        </div>
      </section>

      {/* 9. Jackson & Frank vs Other Italy EOR Providers */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Jackson & Frank vs Other Italy EOR Providers"
            description="Compare speed, compliance, support, and pricing. We focus on European markets with a strong Italy footprint."
            align="center"
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/80 rounded-tl-2xl">
                    Feature
                  </th>
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-primary bg-primary/5 border-x border-gray-100">
                    Jackson & Frank
                  </th>
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/80 rounded-tr-2xl">
                    Deel / Remote / Papaya
                  </th>
                </tr>
              </thead>
              <tbody>
                {jfVsOthers.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50/50 ${
                      index % 2 === 1 ? 'bg-gray-50/30' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-4 sm:py-5 text-gray-800 font-medium">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 sm:py-5 border-x border-gray-100 bg-primary/5">
                      <span className="inline-flex items-center gap-2 font-semibold text-primary">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                        {row.jf}
                      </span>
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-gray-600">
                      {row.others}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
        </div>
      </section>

      {/* 10. Complete Italy Employment Services */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Complete Italy Employment Services"
            description="End-to-end employment and payroll so you can hire and manage Italian talent without a local entity."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="rounded-xl border border-gray-200 p-6 flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg! sm:text-xl! mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-base flex-1">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 11. Italy EOR + Immigration */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Italy EOR + Immigration Services"
            description="Visa sponsorship and relocation support so you can hire non-EU talent in Italy."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Work permits (Nulla Osta)</h3>
              <p className="text-gray-600 text-base!">
                We support work permit applications (Nulla Osta) for non-EU workers. The employer must obtain approval from the provincial immigration desk (Sportello Unico per l&apos;Immigrazione) before the employee can apply for a visa at the Italian consulate.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Residence permits (Permesso di Soggiorno)</h3>
              <p className="text-gray-600 text-base!">
                We handle residence permit (Permesso di Soggiorno) applications and coordinate with immigration authorities (Questura) so your employees can work legally in Italy. The permit must be obtained within 8 days of arrival in Italy.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Relocation support</h3>
              <p className="text-gray-600 text-base!">
                From Codice Fiscale (tax code) and INPS registration to INAIL enrollment and first payroll: we guide your new hires through the Italian system so they can start quickly.
              </p>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/contact?reason=immigration_services" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Ask about visa & relocation <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 12. How Our Italy EOR Process Works */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our Italy EOR Process Works (2–3 Days)"
            description="From agreement to first payroll in three simple steps."
            align="left"
          />
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {processSteps.map((step, i) => (
              <div key={step.day} className="relative">
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-primary/20" />
                )}
                <div className="rounded-xl border-2 border-primary/20 bg-gray-50/50 p-6 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-sm font-semibold mb-4">{step.day}</span>
                  <h3 className="font-semibold text-gray-900 text-lg! sm:text-xl! mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-base!">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Italy Payroll: What We Handle */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Italy Payroll: What We Handle"
            description="Full payroll and INPS/INAIL compliance so you don't have to manage Italian regulations."
            align="left"
          />
          <ul className="max-w-2xl mx-auto mt-10 space-y-3">
            {payrollHandles.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-lg bg-white border border-gray-200 px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-700 text-base!">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-center mt-8 italic">
            <Link href="/payroll" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Global payroll services <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 14. Platform Features */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Platform Features"
            description="Manage your Italy team from one place."
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {platformFeatures.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Compliance & Risk Management */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Compliance & Risk Management"
            description="We keep your Italy hiring legally sound and audit-ready."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Legal compliance', desc: 'Italian employment law (Codice del Lavoro), collective agreements (CCNL), INPS, INAIL, and tax requirements (IRPEF, IRAP).' },
              { title: 'Risk mitigation', desc: 'Correct classification, contracts, and filings to avoid fines and back payments.' },
              { title: 'Audit support', desc: 'Documentation and reporting for internal and external audits.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white border border-gray-200 p-6">
                <Scale className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-gray-900 text-lg! sm:text-xl! mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base!">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. EOR vs Entity Setup in Italy */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR vs Entity Setup in Italy"
            description="Decide whether Italy EOR or an Italian S.r.l./S.p.A. is right for you."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">Italy EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Italian entity (S.r.l./S.p.A.)</th>
                </tr>
              </thead>
              <tbody>
                {eorVsEntity.map((row) => (
                  <tr key={row.aspect} className="border-b border-gray-100 last:border-0">
                    <td className="px-6 py-4 text-gray-700">{row.aspect}</td>
                    <td className="px-6 py-4 font-medium text-primary">{row.eor}</td>
                    <td className="px-6 py-4 text-gray-600">{row.entity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 17. EOR for Startups vs Enterprises */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR for Startups vs Enterprises"
            description="Whether you're a startup or enterprise, Italy EOR fits your use case."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold text-gray-900">Startups & scaleups</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-base!">
                {startupUseCases.map((u) => (
                  <li key={u} className="flex items-start text-base gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Enterprises</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-base!">
                {enterpriseUseCases.map((u) => (
                  <li key={u} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 18. Contractor Management in Italy */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Contractor Management in Italy"
            description="Avoid misclassification and stay compliant when engaging Italian contractors."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              Italian rules on self-employed vs employed are strict. Misclassifying workers can lead to back INPS contributions, penalties, and reclassification. We help you:
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Assess contractor vs employee status and avoid false self-employment risk.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Use compliant contracts and structures for genuine contractors.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Convert contractors to employees via Italy EOR when a permanent role makes more sense.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/italy-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Italy contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide to Hiring in Italy (tabs) */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in Italy
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Explore leave, termination, public holidays, onboarding, and immigration. Everything you need for Italian employment laws 2026 and Italy payroll outsourcing.
          </p>

          <div className="border-b border-gray-200 mb-6">
            <div className="flex flex-wrap gap-2 justify-start">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${
                    activeTab === tab
                      ? 'border-b-4 border-[#051435] text-[#2563EB] bg-white font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {tab === 'leave' && 'Leave Policy'}
                  {tab === 'termination' && 'Termination'}
                  {tab === 'holidays' && 'Public Holidays'}
                  {tab === 'onboarding' && 'Onboarding'}
                  {tab === 'additional' && 'Visa & Immigration'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            {activeTab === 'leave' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Annual leave (Ferie)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In Italy, employees are entitled to a minimum of 20 working days of paid annual leave per year. Many collective bargaining agreements (CCNL) provide for more generous entitlements (often 25–30 days). Leave accrues monthly and must be taken, as Italian law does not allow payment in lieu of vacation except upon termination of employment. Our Italy EOR ensures your team receives full statutory and contractual leave under Italian employment laws 2026.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity leave (Congedo di Maternità)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Expecting mothers are entitled to 5 months of maternity leave: typically 2 months before the expected due date and 3 months after childbirth (flexible arrangements are possible). INPS pays 80% of salary during this period, with many employers topping up to 100% per CCNL. Mothers also have the right to an additional 6 months of optional parental leave. We handle all administration and compliance for your Italian employees.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Paternity leave (Congedo di Paternità)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Fathers are entitled to 10 days of mandatory paternity leave, paid at 100% of salary by INPS. This leave must be taken within 5 months of the child&apos;s birth. Additional optional parental leave is also available.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Parental leave (Congedo Parentale)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Both parents are entitled to parental leave until the child turns 12 years old. Each parent can take up to 6 months (or 10 months total between both parents, with an additional month bonus if the father takes at least 3 months). The first 9 months total are paid at 30% of salary by INPS.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave (Malattia)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    INPS pays sick leave benefits starting from the 4th day of absence at 50% of average daily salary (up to 180 days per year). Employers typically supplement this amount per CCNL requirements, often reaching 100% of regular salary for the first days/weeks of illness. Employees must provide a medical certificate (certificato medico) from their doctor. Italy payroll outsourcing through Jackson & Frank includes correct sick pay and INPS reporting.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Italian labor law (Codice del Lavoro) provides strong employee protection. Termination must be justified (giusta causa for serious misconduct, or giustificato motivo for objective or subjective reasons). Employers must provide written notice stating the reason. The Jobs Act (2015) reformed dismissal procedures, but protection remains significant, especially for companies with more than 15 employees. Employees can challenge unfair dismissals in labor courts. For protected dismissals, reinstatement or substantial compensation may be awarded.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period (Preavviso)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Notice periods in Italy are determined by CCNL (collective bargaining agreements) and vary by sector, job level, and length of service. Typical minimums include:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Blue-collar workers: 8–15 days per year of service</li>
                    <li>White-collar employees: 15 days to 4 months depending on seniority</li>
                    <li>Managers: 3–6 months</li>
                  </ul>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">
                    Payment in lieu of notice (indennità sostitutiva del preavviso) is common.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Severance pay (TFR - Trattamento di Fine Rapporto)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    All employees are entitled to TFR (end-of-service indemnity), calculated as approximately one month&apos;s gross salary per year of service. The exact calculation is: (gross annual salary ÷ 13.5) accumulated annually and indexed for inflation. TFR is paid upon termination regardless of the reason and is a mandatory benefit. As your Employer of Record Italy, we handle all termination and TFR payments in line with Italian employment laws 2026.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Public holidays in Italy 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Below are the main national public holidays. Note that some Italian regions have additional regional public holidays (patron saint days). Our Italy EOR team applies the correct rules for your employees based on their location.
                </p>
                <div className="space-y-2">
                  {publicHolidays2026.map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{holiday.name}</span>
                      <span className="text-sm sm:text-base text-gray-600">{holiday.date}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">Note: Some Italian regions have additional regional public holidays (patron saint days).</p>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Onboarding process</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With Jackson & Frank Italy EOR, onboarding typically takes 2–3 business days. We handle registration with INPS (social security), INAIL (workplace injury insurance), obtaining a Codice Fiscale (tax code), and submitting the mandatory pre-hiring communication (Comunicazione Obbligatoria) to labor authorities before the employee starts work. No Italian entity required you send employee details and signed agreements; we issue the Italian contract (contratto di lavoro) and get them live on Italy payroll.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary and benefits</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Italy does not have a universal minimum wage; instead, minimum salaries are set by sector-specific collective bargaining agreements (CCNL). Salaries are typically paid monthly, and employers must provide detailed payslips (busta paga) showing gross salary, INPS contributions, INAIL premiums, income tax (IRPEF), regional production tax (IRAP), and net salary. The 13th month salary (tredicesima) is mandatory, typically paid in December. Italy payroll outsourcing through us includes all withholdings, INPS/INAIL, and filings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Employment contract</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Italian contracts (contratto di lavoro) must be in writing and include:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Parties&apos; details and workplace</li>
                    <li>Contract type and start date</li>
                    <li>Job level and duties per CCNL</li>
                    <li>Salary and working hours</li>
                    <li>Applicable CCNL</li>
                    <li>Notice period (preavviso) and trial period (periodo di prova)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation period (Periodo di Prova)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Italian law allows probation periods as specified in the applicable CCNL, typically ranging from 1–6 months depending on the employee&apos;s level. During the probation period, either party can terminate the contract without notice or severance (though accrued TFR must be paid). Most Italian employers include a probationary period in employment contracts. We draft compliant contracts as part of our Employer of Record Italy service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Italian work permits and visas</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Non-EU/EEA nationals require a work permit (Nulla Osta) and residence permit (Permesso di Soggiorno) to work in Italy. The employer must obtain approval from the provincial immigration desk (Sportello Unico per l&apos;Immigrazione) before the employee can apply for a visa at the Italian consulate. The residence permit must be obtained within 8 days of arrival in Italy at the Questura (police headquarters). Jackson & Frank supports visa sponsorship and relocation: we coordinate with immigration authorities, handle sponsorship as your Italy EOR, and guide employees through Codice Fiscale, INPS/INAIL registration, and first payroll.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our in-house team manages the full visa and permit process so you can hire employees in Italy without entity and without worrying about immigration compliance. Ideal for tech, fashion, manufacturing, and scaleups bringing international talent to Milan, Rome, Turin, or elsewhere in Italy.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Learn more – Contractor */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Button size="lg" aria-label="Learn more about Italy contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/italy-contractor">
              Learn more about Italy contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 19. Italy Employment Statistics 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Italy Employment Statistics 2026"
            description="Hiring trends, salary benchmarks, and market insights for planning your Italian team."
            align="left"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {stats2026.map((s) => (
              <div key={s.label} className="rounded-xl bg-white border border-gray-200 p-6 text-center">
                <p className="font-bold text-primary text-lg! sm:text-xl! mb-1">{s.value}</p>
                <p className="text-gray-600 text-base!">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-8 max-w-4xl mx-auto text-center text-base! italic">
            The Italian labor market remains competitive for fashion, luxury goods, automotive, manufacturing, and tech. Italy EOR helps you access talent quickly while staying compliant with Italian employment laws 2026 and INPS/INAIL obligations.
          </p>
        </div>
      </section>

      {/* 20. FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Italy EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />

     
    </>
  )
}
