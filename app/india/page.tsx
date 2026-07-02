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
import indiaEorData from '@/data/india-eor.json'

const data = indiaEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Indian law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'New Delhi', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Indian Rupee (INR)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Hindi, English', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '1.4B+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Very high', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'GST standard rate', value: '18%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'IST (GMT+5:30)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Employee Provident Fund (EPF)', icon: Heart, desc: 'Mandatory EPF contributions for retirement savings (12% employee, 12% employer).' },
  { title: 'Employee State Insurance (ESI)', icon: Shield, desc: 'Health insurance and medical benefits for employees earning below threshold (1.75% employee, 4.75% employer).' },
  { title: 'Gratuity', icon: Wallet, desc: 'Gratuity payable after 5 years of continuous service (15 days wages per year).' },
  { title: 'Leave & Benefits', icon: PiggyBank, desc: 'Statutory leave (casual, earned, sick), bonus, and other mandatory benefits as per state laws.' },
]

const publicHolidays2026 = [
  { name: 'Republic Day', date: 'January 26, 2026 (Monday)' },
  { name: 'Maha Shivaratri', date: 'February 23, 2026 (Monday)' },
  { name: 'Holi', date: 'March 14, 2026 (Saturday)' },
  { name: 'Eid al-Fitr', date: 'March 30, 2026 (Monday)' },
  { name: 'Mahavir Jayanti', date: 'April 9, 2026 (Thursday)' },
  { name: 'Good Friday', date: 'April 3, 2026 (Friday)' },
  { name: 'Eid al-Adha (Bakrid)', date: 'June 6, 2026 (Saturday)' },
  { name: 'Independence Day', date: 'August 15, 2026 (Saturday)' },
  { name: 'Gandhi Jayanti', date: 'October 2, 2026 (Friday)' },
  { name: 'Diwali (Deepavali)', date: 'October 20, 2026 (Tuesday)' },
  { name: 'Christmas Day', date: 'December 25, 2026 (Friday)' },
]

const eorPros = [
  'No Indian entity (Private Limited/LLP) required save significant setup cost and 6–12 months.',
  'Hire employees in India in 2–3 days with full EPF, ESI, and legal compliance.',
  'Jackson & Frank handles payroll, taxes (TDS), EPF, ESI, and Indian employment law.',
  'Local Indian employment contracts and mandatory benefits (EPF, ESI, gratuity, leave) included.',
  'Employment Visa and work permit support for non-Indian talent.',
  'Single provider for multiple countries if you expand beyond India.',
]

const eorCons = [
  'Ongoing monthly cost per employee vs. long-term lower cost with your own entity at scale.',
  'You depend on the EOR for compliance choose a licensed provider like Jackson & Frank.',
  'State-specific labor laws (Shops and Establishments Act) may apply; we handle this.',
]

const eorBenefits = [
  'No local entity required save cost and 6–12 months setup',
  'Full compliance with Indian employment law and EPF/ESI',
  'Local employment contracts and payroll from day one',
  'Employment Visa and work permit support',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written contract recommended', 'Probation: typically 3–6 months', 'Permanent vs fixed-term rules'],
  },
  {
    title: 'Notice & severance',
    items: ['Notice: 1–4 months (by tenure and contract)', 'Gratuity after 5 years (15 days per year)', 'Retrenchment compensation may apply'],
  },
  {
    title: 'Pay & benefits',
    items: ['Minimum wage varies by state and skill level', 'EPF mandatory (12% + 12%)', 'ESI for eligible employees', '12–15 days leave typically (varies by state)'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'Indian entity & EPF/ESI', jf: 'Own Indian entity', others: 'Varies' },
  { feature: 'Dedicated India support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Employment Visa / work permit', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, EPF, ESI, TDS, gratuity, bonus, payslips, year-end.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract management, amendments, leave, and local HR queries.', icon: Users },
  { title: 'Benefits', desc: 'EPF, ESI, gratuity, bonus, and mandatory benefits as per state laws.', icon: Shield },
  { title: 'Contracts', desc: 'Indian-compliant employment contracts and addendums.', icon: FileCheck },
  { title: 'Compliance', desc: 'EPF, ESI, TDS, GST, labor laws, and employment law compliance.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer.' },
  { day: 'Day 2', title: 'Contract & onboarding', desc: 'We issue the Indian contract; employee signs. We register with EPF, ESI, and tax authorities (TDS).' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is onboarded and included in the next payroll run.' },
]

const payrollHandles = [
  'Income tax (TDS) and EPF (Employee Provident Fund) contributions',
  'ESI (Employee State Insurance) for eligible employees',
  'Gratuity calculations and accruals',
  'Payslips and annual statements (Form 16)',
  'TDS returns, EPF/ESI filings, and compliance reports',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage Indian employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and export for finance.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: '6–12 months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (incorporation, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR holds risk', entity: 'You hold full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local provider' },
]

const startupUseCases = [
  'First hires in India without a Private Limited/LLP',
  'Testing the market with a small team in Bangalore',
  'Remote-first teams with Indian talent',
]

const enterpriseUseCases = [
  'Scaling Indian teams without new entities',
  'M&A or project-based hiring in India',
  'Centralized global EOR with strong Indian compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage (varies by state)', value: 'State-specific' },
  { label: 'EPF contribution', value: '12% + 12%' },
  { label: 'Statutory leave', value: '12–15 days' },
]

export default function IndiaPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-india.webp"
            alt="India Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">India</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in India without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record India: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in India
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
            India at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-10 leading-relaxed">
            India is the world's second-most populous country and one of the fastest-growing major economies. With a vast talent pool, strong IT infrastructure, and competitive costs, it is a top choice for Employer of Record and India payroll outsourcing.
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

      {/* 3. What is EOR in India */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Employer of Record (EOR) in India?"
            description="Employer of Record India lets you hire Indian employees without setting up a local entity (Private Limited/LLP). We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in India without entity setup."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mt-10 items-stretch">
            {/* Who needs India EOR? */}
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-left rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs India EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  US, UK, EU, and global companies hiring in India; startups and scaleups building an Indian team; enterprises expanding without new entities; HR leaders and recruiters who need fast, compliant hiring.
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

      {/* 4. Why India is attractive for hiring */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why India?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why India is an attractive option for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                India offers an exceptional business environment with one of the world&apos;s largest and most diverse talent pools. As one of the fastest-growing major economies, India provides access to highly skilled professionals across IT, engineering, finance, healthcare, and numerous other sectors at competitive costs.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                The country&apos;s strong educational system, with world-class universities and technical institutes, produces millions of qualified graduates annually. India&apos;s large English-speaking population, combined with a strong work ethic and cultural alignment with global business practices, makes it an ideal destination for international companies. Indian employment laws 2026 and a clear EPF/ESI framework make India EOR and India payroll outsourcing straightforward for international companies.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Indian professionals are known for their technical expertise, problem-solving skills, and adaptability. The country&apos;s growing startup ecosystem, government support for business growth, and improving infrastructure create excellent opportunities. Whether you need India payroll outsourcing, full EOR, or visa support, India is a prime destination for scaling your global team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Employee Benefits */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in India
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            We manage mandatory and optional benefits for your Indian employees through our India EOR and payroll platform. Full compliance with Indian employment laws 2026, including EPF, ESI, gratuity, and statutory leave.
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

      {/* 6. India Employment Laws 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="India Employment Laws 2026: What Companies Must Know"
            description="Stay compliant with Indian employment law. Key rules on contracts, probation, notice, EPF, ESI, and employee protections."
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
            Non-compliance can lead to fines, back payments, and reputational risk. With India EOR, Jackson & Frank ensures your hires meet Indian employment laws 2026.
          </p>
        </div>
      </section>

      {/* 7. Pros and Cons of India EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of India EOR"
            description="Weigh the benefits and considerations of using an Employer of Record in India versus setting up your own entity."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of India EOR
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

      {/* 8. Why Choose Jackson & Frank India EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Jackson & Frank for India EOR?"
            description="Speed, compliance, and local expertise so you can focus on growing your team."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
              { icon: Scale, title: 'Full compliance', desc: 'Indian entity, EPF/ESI awareness, TDS, and employment law compliance built in.' },
              { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of Indian payroll, benefits, and HR practices.' },
              { icon: Shield, title: 'Risk managed', desc: 'We carry employment and tax risk as the legal employer in India.' },
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

      {/* 9. Jackson & Frank vs Other India EOR Providers */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Jackson & Frank vs Other India EOR Providers"
            description="Compare speed, compliance, support, and pricing. We focus on global markets with a strong India footprint."
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

      {/* 10. Complete India Employment Services */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Complete India Employment Services"
            description="End-to-end employment and payroll so you can hire and manage Indian talent without a local entity."
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

      {/* 11. India EOR + Immigration */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="India EOR + Immigration Services"
            description="Visa sponsorship and relocation support so you can hire non-Indian talent in India."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Employment Visa</h3>
              <p className="text-gray-600 text-base!">
                We support Employment Visa applications for skilled professionals, executives, and specialists. The employer must obtain approval and provide necessary documentation.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Project Visa</h3>
              <p className="text-gray-600 text-base!">
                For project-based work, we handle Project Visa applications and coordinate with immigration authorities so your employees can work legally in India.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">FRRO registration</h3>
              <p className="text-gray-600 text-base!">
                From PAN (Permanent Account Number) and Aadhaar to EPF registration and first payroll: we guide your new hires through the Indian system so they can start quickly.
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

      {/* 12. How Our India EOR Process Works */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our India EOR Process Works (2–3 Days)"
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

      {/* 13. India Payroll: What We Handle */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="India Payroll: What We Handle"
            description="Full payroll and EPF/ESI compliance so you don't have to manage Indian regulations."
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
            description="Manage your India team from one place."
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
            description="We keep your India hiring legally sound and audit-ready."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Legal compliance', desc: 'Indian employment law (Industrial Disputes Act, Shops and Establishments Act), EPF, ESI, TDS, GST, and tax requirements.' },
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

      {/* 16. EOR vs Entity Setup in India */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR vs Entity Setup in India"
            description="Decide whether India EOR or an Indian Private Limited/LLP is right for you."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">India EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Indian entity (Private Limited/LLP)</th>
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
            description="Whether you're a startup or enterprise, India EOR fits your use case."
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

      {/* 18. Contractor Management in India */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Contractor Management in India"
            description="Avoid misclassification and stay compliant when engaging Indian contractors."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              Indian rules on self-employed vs employed are strict. Misclassifying workers can lead to back EPF/ESI, TDS penalties, and reclassification. We help you:
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Assess contractor vs employee status and avoid false self-employment risk.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Use compliant contracts and structures for genuine contractors with proper GST and TDS handling.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Convert contractors to employees via India EOR when a permanent role makes more sense.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/india-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                India contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide to Hiring in India (tabs) */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in India
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Explore leave, termination, public holidays, onboarding, and immigration. Everything you need for Indian employment laws 2026 and India payroll outsourcing.
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
                  <h3 className="text-lg font-bold text-primary mb-3">Casual Leave (CL)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Casual Leave serves as a provision for unforeseen circumstances or emergencies that require immediate attention. This type of leave is typically granted for short-duration personal needs, with the number of days varying based on company policies (typically 12 days per year). Employees are generally required to inform their supervisors promptly when requesting casual leave. Our India EOR ensures your team receives full statutory and contractual leave under Indian employment laws 2026.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Earned or Privilege Leave (EL/PL)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    This type of leave is designed for planned absences such as vacations or personal reasons. Employees need to request EL/PL in advance, subject to approval based on the company&apos;s leave policies and workload considerations. The number of days accrued may increase with years of service (typically 12–15 days per year), with companies often specifying a maximum limit for accumulated leave days.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity Leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Expecting mothers are entitled to 26 weeks of maternity leave (extended to 8 weeks before and 18 weeks after childbirth, or as per company policy). This leave is typically paid, covering a portion of the employee&apos;s salary during the absence. We handle all administration and compliance for your Indian employees.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Paternity Leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    The partner of an employee who has recently become a parent is entitled to paid leave equivalent to their weekly working hours (5 working days for full-time employment). This paid leave should be utilized within the initial four weeks following childbirth.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick Leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employers in India are mandated to provide sick employees with their salary for a specified duration (typically 12 days per year). The wage payment comprises a percentage of the last earned salary. Employment contracts typically stipulate that the employer will cover either a percentage of the employee&apos;s full salary during illness. India payroll outsourcing through Jackson & Frank includes correct sick pay and EPF/ESI reporting.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Termination in India is subject to local labor laws (Industrial Disputes Act, Shops and Establishments Act) and requires compliance with statutory provisions. Employers must handle off-boarding procedures with care. Indian labor laws require employers to provide a valid reason for termination, and unilateral termination without proper justification may not be permitted. Mutual consent is often preferred, but in certain cases, permission from the relevant labor authorities may be required. Employees can challenge unfair dismissals in labor courts.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Notice periods for termination by mutual consent in India vary based on the length of an employee&apos;s service:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Less than 1 year of service: 1 month&apos;s notice</li>
                    <li>1 to 3 years of service: 2 months&apos; notice</li>
                    <li>3 to 5 years of service: 3 months&apos; notice</li>
                    <li>More than 5 years of service: 4 months&apos; notice</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Severance and gratuity</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In India, severance payments during termination by mutual consent are often negotiated and may vary based on the specific circumstances. The amount may be equivalent to 2–6 months of the employee&apos;s salary or more, depending on the situation. Gratuity is mandatory for employees with 5+ years of service: 15 days&apos; wages per year of service. As your Employer of Record India, we handle all termination, severance, and gratuity payments in line with Indian employment laws 2026.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Public holidays in India 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Below are the main national public holidays. Note that India has many regional holidays that vary by state. Our India EOR team applies the correct rules for your employees based on their location.
                </p>
                <div className="space-y-2">
                  {publicHolidays2026.map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{holiday.name}</span>
                      <span className="text-sm sm:text-base text-gray-600">{holiday.date}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">Note: India has many regional holidays that vary by state.</p>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Onboarding process</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With Jackson & Frank India EOR, onboarding typically takes 2–3 business days. We handle registration with EPF (Employee Provident Fund), ESI (Employee State Insurance) for eligible employees, and tax authorities (TDS). Employees need PAN (Permanent Account Number) and may need Aadhaar. No Indian entity required you send employee details and signed agreements; we issue the Indian contract and get them live on India payroll.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary and benefits</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employers must pay at least the statutory minimum wage, which varies by state and skill level. Salaries are typically paid monthly, and employers must provide detailed payslips showing gross salary, EPF, ESI, TDS, and net salary. India payroll outsourcing through us includes all withholdings, EPF/ESI contributions, and filings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Employment contract</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Under Indian labor laws, employment contracts are crucial for defining the terms and conditions of employment. A comprehensive employment contract in India typically includes:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Name and details of parties</li>
                    <li>Start date and duration of employment</li>
                    <li>Job description and workplace</li>
                    <li>Salary, allowances, and benefits</li>
                    <li>Leave entitlements</li>
                    <li>Termination conditions and notice periods</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation period</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In India, employers often include a probationary period to assess the employee&apos;s suitability for the role. Probation periods are typically for a maximum of 6 months for permanent employment, and for a maximum of 3 months for fixed-term employment. During probation, either party can terminate with shorter notice. We draft compliant contracts as part of our Employer of Record India service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Indian work permits and visas</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Non-Indian nationals require an Employment Visa or Project Visa to work in India. The employer must obtain approval and provide necessary documentation. Employment Visa is for skilled professionals, executives, and specialists. Project Visa is for project-based work. Jackson & Frank supports visa sponsorship and relocation: we coordinate with FRRO (Foreigners Regional Registration Office), handle sponsorship as your India EOR, and guide employees through PAN, Aadhaar, EPF registration, and first payroll.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our in-house team manages the full visa and permit process so you can hire employees in India without entity and without worrying about immigration compliance. Ideal for tech, engineering, and scaleups bringing international talent to Bangalore, Mumbai, Delhi, or elsewhere in India.
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
            <Button size="lg" aria-label="Learn more about India contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/india-contractor">
              Learn more about India contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 19. India Employment Statistics 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="India Employment Statistics 2026"
            description="Hiring trends, salary benchmarks, and market insights for planning your Indian team."
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
            The Indian labor market remains competitive for IT, engineering, finance, and manufacturing. India EOR helps you access talent quickly while staying compliant with Indian employment laws 2026 and EPF/ESI obligations.
          </p>
        </div>
      </section>

      {/* 20. FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our India EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />

     
    </>
  )
}
