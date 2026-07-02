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
  Plane,
  Scale,
  Shield,
  Users,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import FAQSection from '@/components/templates/FAQSection'
import uaeEorData from '@/data/uae-eor.json'

const data = uaeEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'UAE labour & WPS aligned', icon: Scale },
  { label: 'Visa & MOHRE support', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Abu Dhabi', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'UAE Dirham (AED)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Arabic, English', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '10M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Very high', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '5%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'GST (GMT+4)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Medical insurance', icon: Heart, desc: 'Employer-sponsored health cover is mandatory in key emirates (e.g. Dubai, Abu Dhabi) and standard elsewhere plans must meet authority minimums.' },
  { title: 'End of Service Gratuity', icon: PiggyBank, desc: 'EOS accrues for eligible employees under UAE Labour Law, generally linked to length of service and basic wage subject to legal rules and caps.' },
  { title: 'WPS payroll', icon: Shield, desc: 'Wage Protection System (WPS) compliance for salary transfers through approved channels where applicable to your licence and workforce.' },
  { title: 'Common allowances', icon: Plane, desc: 'Many UAE packages include housing, transport, and annual flight allowance structured compliantly in the employment contract.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day", date: 'January 1, 2026 (Thursday)' },
  { name: 'Eid al-Fitr (dates per moon sighting)', date: 'Typically March–April 2026 (confirm Cabinet announcement)' },
  { name: 'Arafat Day (Hajj)', date: 'Typically May–June 2026 (confirm official calendar)' },
  { name: 'Eid al-Adha', date: 'Typically multi-day around Hajj 2026 (confirm official calendar)' },
  { name: 'Islamic New Year (Hijri)', date: 'Approx. mid-2026 (confirm official calendar)' },
  { name: "Prophet Muhammad's Birthday (Mawlid)", date: 'Approx. late 2026 (confirm official calendar)' },
  { name: 'Commemoration Day (Martyr’s Day)', date: 'December 1, 2026 (Tuesday)' },
  { name: 'UAE National Day', date: 'December 2–3, 2026 (Wednesday–Thursday)' },
]

const eorPros = [
  'No UAE mainland company or free-zone licence required on your side we employ through our compliant structure.',
  'Coordinated work permits (MOHRE / relevant authority), medical, Emirates ID, and residence visa workflows.',
  'Jackson & Frank runs WPS-compliant payroll in AED, contract administration, and statutory benefits.',
  'UAE-compliant employment contracts aligned with Federal Labour Law and applicable emirate or free zone rules.',
  'Practical HR support for leave, probation, and end-of-service calculations.',
  'Single global partner if you hire across the GCC and beyond.',
]

const eorCons = [
  'Visa and government processing create timelines longer than in some pure payroll-only markets.',
  'Monthly EOR fees plus visa, insurance, and payroll pass-through costs.',
  'Mainland vs free zone vs financial free zone (DIFC/ADGM) rules differ we scope the right model up front.',
]

const eorBenefits = [
  'Avoid setting up your own LLC or branch for early-stage UAE hiring',
  'Labour law, WPS, and insurance requirements handled by specialists',
  'AED payroll and payslips from first legal workday',
  'Immigration and work authorisation coordinated end to end',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written employment contract required with agreed wage, allowances, and working hours', 'Probation: up to 6 months under federal rules; termination during probation follows notice rules', 'Limited vs unlimited terms most new hires use fixed-term / defined contracts under current law'],
  },
  {
    title: 'Notice & termination',
    items: ['Notice periods depend on contract type and tenure follow MOHRE / authority templates', 'Arbitrary dismissal can trigger compensation; document performance and process', 'Calculate End of Service Gratuity and final settlement in line with law'],
  },
  {
    title: 'Pay & leave',
    items: ['Generally no personal income tax on salary for individuals under standard UAE rules', 'Annual leave accrues per Labour Law (commonly 2 days per month in first year, then 30 days per year after one year of service confirm against current text)', 'Sick leave and maternity rules are codified apply medical certificates'],
  },
]

const jfVsOthers = [
  { feature: 'UAE onboarding (visa + payroll)', jf: '2–4 weeks typical', others: 'Often 4–10 weeks' },
  { feature: 'WPS & insurance discipline', jf: 'Built in', others: 'Varies' },
  { feature: 'Mainland / FZ awareness', jf: 'Yes', others: 'Often generic' },
  { feature: 'Dedicated coordination', jf: 'Single point of contact', others: 'Ticket queues' },
  { feature: 'Transparent fees', jf: 'Visa & insurance broken out', others: 'Hidden extras' },
]

const services = [
  { title: 'Payroll & WPS', desc: 'Monthly payroll in AED, salary transfers via WPS where required, payslips, and leave balances.', icon: FileCheck },
  { title: 'HR support', desc: 'Contracts, renewals, warnings, and HR letters aligned with local practice.', icon: Users },
  { title: 'Benefits', desc: 'Medical insurance placement, EOS tracking, and optional allowances (housing, transport, flight).', icon: Shield },
  { title: 'Immigration', desc: 'Work permit, entry permit, medical, Emirates ID, and residence visa stamping coordination.', icon: FileCheck },
  { title: 'Compliance', desc: 'MOHRE, ICP, and free zone authority filings matched to your engagement model.', icon: Scale },
]

const processSteps = [
  { day: 'Step 1', title: 'Commercial & offer', desc: 'Master agreement signed; we draft UAE employment contract and collect passport, degree attestation, and photos as needed.' },
  { day: 'Step 2', title: 'Medical & labour approval', desc: 'Medical fitness, work permit / labour card processing with MOHRE or the relevant free zone authority.' },
  { day: 'Step 3', title: 'Visa, ID & WPS', desc: 'Residence visa, Emirates ID biometrics, bank salary account setup, WPS registration, and first payroll run.' },
]

const payrollHandles = [
  'AED salary processing and WPS file submission where applicable',
  'Employer medical insurance enrolment and renewals',
  'Leave accruals, overtime, and allowances per contract',
  'End of Service Gratuity accrual tracking',
  'Payslips and management reporting for finance',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'Track hires, visa status, and payroll in one view.' },
  { title: 'Employee management', desc: 'Onboard, renew contracts, and manage UAE-specific fields.' },
  { title: 'Reporting', desc: 'Headcount cost and visa expiry alerts.' },
]

const eorVsEntity = [
  { aspect: 'Time to first legal work', eor: 'Typically 2–4 weeks', entity: '2–6+ months' },
  { aspect: 'Setup cost', eor: 'Predictable monthly + pass-through', entity: 'High (licence, office, PRO)' },
  { aspect: 'Compliance load', eor: 'EOR operates employer stack', entity: 'Your PRO, HR, and payroll team' },
  { aspect: 'Flexibility', eor: 'Scale headcount up or down', entity: 'Fixed overheads' },
]

const startupUseCases = [
  'Landing teams in Dubai or Abu Dhabi before you incorporate',
  'Sales and implementation staff for GCC clients',
  'Regional HQ hires without immediate trade licence complexity',
]

const enterpriseUseCases = [
  'Project-based expatriate workforce in the UAE',
  'M&A carve-outs needing short-term employer continuity',
  'Consistent EOR alongside Saudi, Qatar, or Bahrain expansion',
]

const stats2026 = [
  { label: 'Typical EOR timeline', value: '2–4 weeks' },
  { label: 'Personal income tax', value: 'None (standard UAE)' },
  { label: 'Annual leave (typical)', value: 'Per Labour Law accrual' },
  { label: 'EOS gratuity', value: 'Statutory for eligible staff' },
]

export default function UAEPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-uae.webp"
            alt="UAE Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">UAE</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in UAE without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record UAE: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in UAE
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

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            UAE at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-8 leading-relaxed">
            The United Arab Emirates is a global hub for trade, finance, logistics, and technology. Seven emirates led by Abu Dhabi and Dubai offer world-class infrastructure, English-friendly business culture, and access to Middle East and Africa markets. UAE labour rules, WPS wage transfers, and visa compliance are central to any hiring plan.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {countryFacts.map((fact, index) => {
              const IconComponent = fact.icon
              return (
                <div key={index} className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary/20 transition-colors">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${fact.iconColor}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{fact.label}</p>
                  <p className="font-semibold text-gray-900">{fact.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Employer of Record (EOR) in the UAE?"
            description="UAE EOR means we become the legal employer on record for labour and immigration purposes: work permits, visas, payroll, and core HR. You manage day-to-day work and performance. Ideal when you need UAE employees without incorporating an LLC or free zone company immediately."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mt-10 items-stretch">
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-left rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs UAE EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Global firms entering the Gulf, startups hiring in Dubai Internet City or mainland Dubai, enterprises deploying project teams in Abu Dhabi, and HR leaders who need compliant visas and WPS payroll without local entity delay.
                </p>
              </div>
            </div>
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

      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why the UAE?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why the UAE is attractive for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                The UAE combines no personal income tax on employment income (under standard rules), strategic location, and diversified economy beyond oil. Free zones offer 100% foreign ownership in many cases; mainland companies access the wider UAE market through licensed activities.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Compliance is strict where it matters: work authorisation, WPS salary transfers, and mandatory medical insurance. UAE labour law reforms have modernised contracts, flexible work arrangements, and dispute pathways. A knowledgeable EOR keeps you aligned with MOHRE, ICP, and where relevant free zone registries.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Financial free zones such as DIFC and ADGM follow distinct employment regulations; we help you pick the right jurisdiction for each hire.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in the UAE
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            Typical UAE packages combine cash allowances with insured benefits and statutory end-of-service accrual. We administer payroll, insurance, and documentation through our UAE EOR.
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

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="UAE Employment & Labour Law 2026: Essentials"
            description="Federal Decree-Law on Labour Relations governs most mainland employment. Free zones and financial free zones may apply their own rules."
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
            Penalties for illegal work or WPS failures can be severe. UAE EOR keeps visas, contracts, and salary transfers aligned.
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of UAE EOR"
            description="Weigh speed and compliance against building your own licence."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of UAE EOR
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Jackson & Frank for UAE EOR?"
            description="Visa-savvy coordination plus disciplined payroll."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: 'Realistic timelines', desc: 'We plan around medical, typing centres, and authority cut-offs not fantasy 48-hour visas.' },
              { icon: Scale, title: 'WPS & labour discipline', desc: 'Salary files and contract terms built for audit and inspection readiness.' },
              { icon: Users, title: 'PRO coordination', desc: 'Experienced handling of MOHRE, ICP, and free zone portals.' },
              { icon: Shield, title: 'Employer of record', desc: 'We carry the compliance obligations on our UAE structure for your hired staff.' },
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

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Jackson & Frank vs Other UAE EOR Providers"
            description="Compare visa handling, WPS rigour, and fee transparency."
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
                    Typical global platforms
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Complete UAE Employment Services"
            description="Visa-to-payslip coverage for your Emirati and expatriate workforce."
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

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="UAE EOR + Visa Services"
            description="Work authorisation is the critical path for every expatriate hire."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Work permit & labour card</h3>
              <p className="text-gray-600 text-base!">
                MOHRE-approved work permits for mainland employees, or equivalent approvals inside your chosen free zone. Quota and salary thresholds may apply.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Residence visa & Emirates ID</h3>
              <p className="text-gray-600 text-base!">
                Entry permit, medical fitness, Emirates ID biometrics, and visa stamping on passport coordinated with clear employee instructions.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Family sponsorship (optional)</h3>
              <p className="text-gray-600 text-base!">
                Where eligible, we advise on spouse and dependent visas linked to the employee sponsor.
              </p>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/contact?reason=immigration_services" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Ask about UAE visas <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our UAE EOR Process Works"
            description="Three coordinated phases from signed agreement to live payroll."
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

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="UAE Payroll: What We Handle"
            description="WPS-compliant salary processing and benefit administration."
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Platform Features"
            description="Visibility across visas and payroll."
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

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Compliance & Risk Management"
            description="Reduce labour, immigration, and wage transfer risk."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Labour compliance', desc: 'Contracts, working hours, overtime, and leave aligned with applicable UAE law or zone rules.' },
              { title: 'WPS & banking', desc: 'Salary files submitted on time; employee accounts validated.' },
              { title: 'Audit trail', desc: 'Documented approvals, contract versions, and visa milestones.' },
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR vs Entity Setup in the UAE"
            description="Compare EOR with forming your own mainland or free zone company."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">UAE EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Local licence (LLC / FZ)</th>
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

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR for Startups vs Enterprises"
            description="From first Dubai hire to large project teams."
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Contractor Management in the UAE"
            description="Freelance permits, free zone licences, and misclassification risk."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              Working in the UAE without a visa or permit that matches the activity is high risk. We help structure genuine contractor and freelance engagements or move talent to EOR employment.
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Validate freelance permit / licence routes (e.g. select free zones) before work starts.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Avoid de facto full-time employment masked as invoices.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Convert to UAE EOR when supervision and exclusivity look like employment.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/uae-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                UAE contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in the UAE
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Leave, termination, public holidays, onboarding, and visas for UAE labour law 2026 context.
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
                  {tab === 'additional' && 'Visas & WPS'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            {activeTab === 'leave' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Annual leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Under UAE Labour Law, employees accrue paid annual leave based on length of service (commonly two days per month for the first year, then 30 days per year after completing one year verify against the current official text and your contract). Employers should schedule leave and keep records. Our UAE EOR tracks balances and approvals.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Paid sick leave is regulated: notify the employer promptly and provide medical documentation per law. Payroll must reflect eligible paid days versus unpaid portions correctly.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity & parental leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Female employees are entitled to maternity leave under the Labour Law (duration and pay rules per statute). Parental leave for fathers has also been introduced in reforms apply current legal text and any free zone variations.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination types</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Contracts may end by expiry (fixed term), mutual consent, resignation, or termination for cause or redundancy-style reasons. Each route has notice, documentation, and potential compensation consequences. Arbitrary dismissal can trigger awards seek proper process.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice periods</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Notice is typically 30–90 days depending on contract and law; during probation shorter notice may apply. Always align with the written employment agreement and MOHRE-approved template where used.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">End of Service Gratuity</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Eligible employees generally accrue gratuity based on basic wage and years of service (21 days per year for the first five years and 30 days per year thereafter, subject to caps and exclusions for resignation scenarios calculate per current law). Final settlement should include unused leave and repatriation ticket if contractually required.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Public holidays in the UAE (2026 overview)</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Islamic holidays move with the Hijri calendar UAE Cabinet confirms exact Gregorian dates each year. Fixed holidays include Commemoration Day and National Day.
                </p>
                <div className="space-y-2">
                  {publicHolidays2026.map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0 gap-4">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{holiday.name}</span>
                      <span className="text-sm sm:text-base text-gray-600 text-right">{holiday.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Onboarding sequence</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    After offer acceptance, we issue the UAE employment contract, initiate labour approval, and schedule medical and biometrics. Employees may need degree attestation for certain roles. Only after visa stamping should work commence if prior work authorisation is not already in place.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Probation up to six months is permitted under federal law; either party may terminate during probation subject to notice rules. Extend or confirm completion in writing.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">WPS registration</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    We register the employee for salary transfer through the Wage Protection System with an approved bank or financial institution, satisfying Ministry requirements for covered employers.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Work authorisation & WPS</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Every expatriate employee needs a residence visa linked to a sponsor (typically the employer) and a valid work permit. Overstay and illegal work fines are significant. The WPS monitors salary payments delayed or missing transfers can trigger blocks on new permits.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Jackson & Frank aligns visa validity, labour card expiry, and payroll cycles so your team remains compliant in Dubai, Abu Dhabi, Sharjah, and other emirates.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Button size="lg" aria-label="Learn more about UAE contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/uae-contractor">
              Learn more about UAE contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="UAE Employment Snapshot 2026"
            description="Planning benchmarks always confirm against latest Cabinet and MOHRE notices."
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
            Corporate tax may apply to businesses at entity level from 2023 rules separate from personal salary tax. UAE EOR focuses on labour, immigration, and payroll compliance for your hires.
          </p>
        </div>
      </section>

      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our UAE EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
