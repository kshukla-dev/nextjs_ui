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
import germanyEorData from '@/data/germany-eor.json'

const data = germanyEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'German law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Berlin', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Euro (EUR)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'German', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '83M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Very high', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '19%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Health Insurance (Krankenversicherung)', icon: Heart, desc: 'Mandatory public or private health insurance covering medical care and family benefits.' },
  { title: 'Social Security (Sozialversicherung)', icon: Shield, desc: 'Pension insurance (Rentenversicherung), unemployment insurance (Arbeitslosenversicherung), and long-term care insurance (Pflegeversicherung).' },
  { title: 'Unemployment Insurance', icon: Wallet, desc: 'Unemployment benefits via Bundesagentur für Arbeit (Federal Employment Agency).' },
  { title: 'Pension & Benefits', icon: PiggyBank, desc: 'State pension, occupational pension, and statutory leave (20+ days, often 25–30 days).' },
]

const publicHolidays2026 = [
  { name: "New Year's Day", date: 'January 1, 2026 (Thursday)' },
  { name: 'Good Friday', date: 'April 3, 2026 (Friday)' },
  { name: 'Easter Monday', date: 'April 6, 2026 (Monday)' },
  { name: 'Labour Day', date: 'May 1, 2026 (Friday)' },
  { name: 'Ascension Day', date: 'May 14, 2026 (Thursday)' },
  { name: 'Whit Monday', date: 'May 25, 2026 (Monday)' },
  { name: 'German Unity Day', date: 'October 3, 2026 (Saturday)' },
  { name: 'Christmas Day', date: 'December 25, 2026 (Friday)' },
  { name: 'Boxing Day', date: 'December 26, 2026 (Saturday)' },
]

const eorPros = [
  'No German entity (GmbH/AG) required save significant setup cost and 6–12 months.',
  'Hire employees in Germany in 2–3 days with full social security and legal compliance.',
  'Jackson & Frank handles payroll, taxes, social security, and German employment law.',
  'Local German employment contracts and mandatory benefits (health insurance, pension, leave) included.',
  'EU Blue Card and work permit support for non-EU talent.',
  'Single provider for multiple countries if you expand beyond Germany.',
]

const eorCons = [
  'Ongoing monthly cost per employee vs. long-term lower cost with your own entity at scale.',
  'You depend on the EOR for compliance choose a licensed provider like Jackson & Frank.',
  'Collective agreements (Tarifverträge) and works council (Betriebsrat) may apply; we handle this.',
]

const eorBenefits = [
  'No local entity required save cost and 6–12 months setup',
  'Full compliance with German employment law and social security',
  'Local employment contracts and payroll from day one',
  'EU Blue Card and work permit support',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written contract required (Arbeitsvertrag)', 'Probation: up to 6 months max (Probezeit)', 'Unlimited vs fixed-term rules'],
  },
  {
    title: 'Notice & severance',
    items: ['Notice: 4 weeks to 7 months (by tenure)', 'Severance (Abfindung) common in termination agreements', 'Kündigungsschutzgesetz protection after 6 months'],
  },
  {
    title: 'Pay & benefits',
    items: ['Minimum wage (Mindestlohn) €12.82/hour (2026)', '20 days leave minimum (often 25–30 days)', 'Sick pay: 100% for 6 weeks, then Krankengeld'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'German entity & social security', jf: 'Own German entity', others: 'Varies' },
  { feature: 'Dedicated Germany support', jf: 'Yes', others: 'Often global only' },
  { feature: 'EU Blue Card / work permit', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, social security, tax withholdings, payslips (Gehaltsabrechnung), year-end.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract management, amendments, leave, and local HR queries.', icon: Users },
  { title: 'Benefits', desc: 'Health insurance, pension, unemployment insurance, and mandatory benefits.', icon: Shield },
  { title: 'Contracts', desc: 'German-compliant employment contracts (Arbeitsvertrag) and addendums.', icon: FileCheck },
  { title: 'Compliance', desc: 'Tarifverträge, Betriebsrat, social security, tax office, and employment law.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer.' },
  { day: 'Day 2', title: 'Contract & onboarding', desc: 'We issue the German contract (Arbeitsvertrag); employee signs. We register with tax office (Finanzamt), social security, and health insurance.' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is onboarded and included in the next payroll run.' },
]

const payrollHandles = [
  'Income tax (Lohnsteuer) and social security withholdings',
  'Health insurance (Krankenversicherung) and pension (Rentenversicherung)',
  'Unemployment insurance (Arbeitslosenversicherung) and long-term care (Pflegeversicherung)',
  'Payslips (Gehaltsabrechnung) and annual statements',
  'Tax and social security filings (monthly DEÜV)',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage German employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and export for finance.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: '6–12 months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (incorporation, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR holds risk', entity: 'You hold full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local provider' },
]

const startupUseCases = [
  'First hires in the EU without a German GmbH/AG',
  'Testing the market with a small team in Berlin',
  'Remote-first teams with German talent',
]

const enterpriseUseCases = [
  'Scaling German teams without new entities',
  'M&A or project-based hiring in Germany',
  'Centralized global EOR with strong German compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage (DE, 2026)', value: '€12.82 / hour' },
  { label: 'Statutory leave', value: '20 days minimum' },
  { label: 'Typical leave offered', value: '25–30 days' },
]

export default function GermanyPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-germany.webp"
            alt="Germany Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">Germany</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in Germany without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Germany: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in Germany
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
            Germany at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-10 leading-relaxed">
            Germany is Europe's largest economy and a global powerhouse for engineering, automotive, and technology. Strong union presence and strict labor regulations make compliance essential, driving demand for Employer of Record and Germany payroll outsourcing.
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

      {/* 3. What is EOR in Germany */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Employer of Record (EOR) in Germany?"
            description="Employer of Record Germany lets you hire German employees without setting up a local entity (GmbH/AG). We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in Germany without entity setup."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mt-10 items-stretch">
            {/* Who needs Germany EOR? */}
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-left rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs Germany EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  US, UK, EU, and global companies hiring in Germany; startups and scaleups building a German team; enterprises expanding without new entities; HR leaders and recruiters who need fast, compliant hiring.
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

      {/* 4. Why Germany is attractive for hiring */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why Germany?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why Germany is an attractive option for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Germany stands as Europe&apos;s largest economy and a global leader in innovation, engineering, and technology. With a highly skilled, well-educated workforce and a strong tradition of vocational training, Germany offers exceptional talent across manufacturing, engineering, IT, and research sectors.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                The country&apos;s robust infrastructure, central location in Europe, and excellent transportation networks make it an ideal hub for European operations. Germany&apos;s stable political environment, strong legal framework, and commitment to quality and precision create a reliable and predictable business climate. German employment laws 2026 and a clear social security framework make Germany EOR and Germany payroll outsourcing straightforward for international companies.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                German workers are known for their strong work ethic, technical expertise, and commitment to quality. The country&apos;s dual education system produces highly skilled professionals, while its world-class universities and research institutions drive innovation. Whether you need Germany payroll outsourcing, full EOR, or visa support, Germany is a prime destination for scaling your European team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Employee Benefits */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in Germany
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            We manage mandatory and optional benefits for your German employees through our Germany EOR and payroll platform. Full compliance with German employment laws 2026, including health insurance, pension, social security, and statutory leave.
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

      {/* 6. Germany Employment Laws 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Germany Employment Laws 2026: What Companies Must Know"
            description="Stay compliant with German employment law. Key rules on contracts, probation, notice, minimum wage, and employee protections."
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
            Non-compliance can lead to fines, back payments, and reputational risk. With Germany EOR, Jackson & Frank ensures your hires meet German employment laws 2026.
          </p>
        </div>
      </section>

      {/* 7. Pros and Cons of Germany EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of Germany EOR"
            description="Weigh the benefits and considerations of using an Employer of Record in Germany versus setting up your own entity."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of Germany EOR
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

      {/* 8. Why Choose Jackson & Frank Germany EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Jackson & Frank for Germany EOR?"
            description="Speed, compliance, and local expertise so you can focus on growing your team."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
              { icon: Scale, title: 'Full compliance', desc: 'German entity, collective agreement awareness, social security and employment law compliance built in.' },
              { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of German payroll, benefits, and HR practices.' },
              { icon: Shield, title: 'Risk managed', desc: 'We carry employment and tax risk as the legal employer in Germany.' },
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

      {/* 9. Jackson & Frank vs Other Germany EOR Providers */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Jackson & Frank vs Other Germany EOR Providers"
            description="Compare speed, compliance, support, and pricing. We focus on European markets with a strong Germany footprint."
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

      {/* 10. Complete Germany Employment Services */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Complete Germany Employment Services"
            description="End-to-end employment and payroll so you can hire and manage German talent without a local entity."
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

      {/* 11. Germany EOR + Immigration */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Germany EOR + Immigration Services"
            description="Visa sponsorship and relocation support so you can hire non-EU talent in Germany."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">EU Blue Card</h3>
              <p className="text-gray-600 text-base!">
                We support the EU Blue Card program for highly qualified workers with university degrees and job offers meeting minimum salary thresholds (€45,300+ for 2026, or €41,041.80+ for shortage occupations).
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Work permits</h3>
              <p className="text-gray-600 text-base!">
                We handle work permit applications and coordinate with Ausländerbehörde (Foreigners&apos; Registration Office) and immigration authorities so your employees can work legally in Germany.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Relocation support</h3>
              <p className="text-gray-600 text-base!">
                From tax ID (Steueridentifikationsnummer) and social security number (Sozialversicherungsnummer) to health insurance and first payroll: we guide your new hires through the German system so they can start quickly.
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

      {/* 12. How Our Germany EOR Process Works */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our Germany EOR Process Works (2–3 Days)"
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

      {/* 13. Germany Payroll: What We Handle */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Germany Payroll: What We Handle"
            description="Full payroll and social security compliance so you don't have to manage German regulations."
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
            description="Manage your Germany team from one place."
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
            description="We keep your Germany hiring legally sound and audit-ready."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Legal compliance', desc: 'German employment law (BGB, Kündigungsschutzgesetz), collective agreements (Tarifverträge), social security, and tax requirements.' },
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

      {/* 16. EOR vs Entity Setup in Germany */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR vs Entity Setup in Germany"
            description="Decide whether Germany EOR or a German GmbH/AG is right for you."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">Germany EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">German entity (GmbH/AG)</th>
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
            description="Whether you're a startup or enterprise, Germany EOR fits your use case."
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

      {/* 18. Contractor Management in Germany */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Contractor Management in Germany"
            description="Avoid misclassification and stay compliant when engaging German contractors."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              German rules on self-employed vs employed are strict. Misclassifying workers can lead to back social security, penalties, and reclassification (Scheinselbstständigkeit). We help you:
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Assess contractor vs employee status and avoid false self-employment (Scheinselbstständigkeit) risk.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Use compliant contracts and structures for genuine contractors.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Convert contractors to employees via Germany EOR when a permanent role makes more sense.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/germany-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Germany contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide to Hiring in Germany (tabs) */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in Germany
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Explore leave, termination, public holidays, onboarding, and immigration. Everything you need for German employment laws 2026 and Germany payroll outsourcing.
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
                  <h3 className="text-lg font-bold text-primary mb-3">Annual leave (Urlaub)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In Germany, employees are entitled to a minimum of 20 working days of paid annual leave per year based on a 5-day work week (24 days for a 6-day work week). Many German employers offer 25–30 days of vacation. Unused vacation days must generally be taken by March 31st of the following year, though exceptions apply for illness or operational reasons. Our Germany EOR ensures your team receives full statutory and contractual leave under German employment laws 2026.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity leave (Mutterschutz)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Expecting mothers are entitled to 14 weeks of maternity leave: 6 weeks before the expected due date and 8 weeks after childbirth (extended to 12 weeks for premature or multiple births). During this period, employees receive Mutterschaftsgeld (maternity benefit) from health insurance and a top-up from the employer to reach full salary. We handle all administration and compliance for your German employees.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Parental leave (Elternzeit)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Each parent is entitled to up to 3 years of parental leave per child until the child turns 3 years old. Parents can take up to 24 months between the child&apos;s 3rd and 8th birthday. Elterngeld (parental allowance) is paid for 12–14 months at 65–67% of previous net income (maximum €1,800 per month).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave (Krankheit)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    German employers must pay 100% of an employee&apos;s salary during sick leave for up to 6 weeks (Entgeltfortzahlung). After 6 weeks, employees receive Krankengeld (sickness benefit) from health insurance at 70% of gross salary (maximum 90% of net salary) for up to 78 weeks over a 3-year period. Germany payroll outsourcing through Jackson & Frank includes correct sick pay and social security reporting.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements (Kündigungsschutz)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Germany has strong employee protection laws. For employees who have worked more than 6 months in companies with more than 10 employees, the Kündigungsschutzgesetz (Protection Against Dismissal Act) applies. Employers must have a valid reason for termination: operational (betriebsbedingt), personal (personenbedingt), or behavioral (verhaltensbedingt). Written warnings (Abmahnung) are typically required before termination for behavioral reasons. Employees can challenge unfair dismissals in labor courts.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period (Kündigungsfrist)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Statutory notice periods in Germany increase with length of service:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>During probation: 2 weeks</li>
                    <li>Up to 2 years: 4 weeks to the 15th or end of month</li>
                    <li>2–5 years: 1 month to end of month</li>
                    <li>5–8 years: 2 months to end of month</li>
                    <li>8–10 years: 3 months to end of month</li>
                    <li>10–12 years: 4 months to end of month</li>
                    <li>12–15 years: 5 months to end of month</li>
                    <li>15–20 years: 6 months to end of month</li>
                    <li>20+ years: 7 months to end of month</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Severance pay (Abfindung)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    While not mandatory in all cases, severance pay in Germany is common in termination agreements. The typical calculation is 0.5 months&apos; gross salary per year of service, though this can vary based on negotiations and circumstances. In some cases where termination is challenged, labor courts may order higher severance payments. As your Employer of Record Germany, we handle all termination and severance payments in line with German employment laws 2026.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Public holidays in Germany 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Below are the main national public holidays. Note that some German states (Bundesländer) have additional regional public holidays. Our Germany EOR team applies the correct rules for your employees based on their location.
                </p>
                <div className="space-y-2">
                  {publicHolidays2026.map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{holiday.name}</span>
                      <span className="text-sm sm:text-base text-gray-600">{holiday.date}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">Note: Some German states have additional regional public holidays.</p>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Onboarding process</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With Jackson & Frank Germany EOR, onboarding typically takes 2–3 business days. We handle registration with tax authorities (Finanzamt), obtaining a tax ID (Steueridentifikationsnummer), and registration with social insurance providers. For foreign workers, a Sozialversicherungsnummer (social security number) must be obtained. No German entity required you send employee details and signed agreements; we issue the German contract (Arbeitsvertrag) and get them live on Germany payroll.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary and benefits</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employers must pay at least the statutory minimum wage (Mindestlohn) of €12.82 per hour as of 2026. Salaries are typically paid monthly, and employers must provide detailed payslips (Gehaltsabrechnung) showing all deductions including income tax, social security, health insurance, pension insurance, unemployment insurance, and long-term care insurance. Germany payroll outsourcing through us includes all withholdings, social security, and filings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Employment contract</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">German contracts (Arbeitsvertrag) must be in writing and include:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Names and addresses of both parties</li>
                    <li>Start date and location of work</li>
                    <li>Job description</li>
                    <li>Salary, working hours, and overtime regulations</li>
                    <li>Vacation entitlement</li>
                    <li>Notice periods</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation period (Probezeit)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In Germany, probation periods (Probezeit) are permitted for a maximum of 6 months. During this time, the notice period is reduced to 2 weeks, and employment protection laws are limited. Most German employers include a probationary period in employment contracts. We draft compliant contracts as part of our Employer of Record Germany service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">German work permits and visas</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Non-EU/EEA nationals require a work permit and residence permit to work in Germany. The EU Blue Card is available for highly qualified workers with university degrees and a job offer meeting minimum salary thresholds (€45,300+ for 2026, or €41,041.80+ for shortage occupations). Jackson & Frank supports visa sponsorship and relocation: we coordinate with Ausländerbehörde (Foreigners&apos; Registration Office), handle sponsorship as your Germany EOR, and guide employees through tax ID, social security registration, and first payroll.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our in-house team manages the full visa and permit process so you can hire employees in Germany without entity and without worrying about immigration compliance. Ideal for tech, engineering, and scaleups bringing international talent to Berlin, Munich, Hamburg, or elsewhere in Germany.
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
            <Button size="lg" aria-label="Learn more about Germany contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/germany-contractor">
              Learn more about Germany contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 19. Germany Employment Statistics 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Germany Employment Statistics 2026"
            description="Hiring trends, salary benchmarks, and market insights for planning your German team."
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
            The German labor market remains competitive for engineering, tech, manufacturing, and automotive. Germany EOR helps you access talent quickly while staying compliant with German employment laws 2026 and social security obligations.
          </p>
        </div>
      </section>

      {/* 20. FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Germany EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />

     
    </>
  )
}
