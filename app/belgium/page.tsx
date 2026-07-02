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
import belgiumEorData from '@/data/belgium-eor.json'

const data = belgiumEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Belgian law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Brussels', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Euro (EUR)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Dutch, French, German', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '11.6M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Very high', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '21%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Health insurance (mutualiteit/mutuelle)', icon: Heart, desc: 'Mandatory affiliation to a health insurance fund; we handle registration and compliance.' },
  { title: 'ONSS/RSZ Social Security', icon: Shield, desc: 'Employer and employee contributions; state pension and social security administered by NSSO.' },
  { title: 'Unemployment (ONEM/RVA)', icon: Wallet, desc: 'Unemployment insurance and benefits via the National Employment Office.' },
  { title: 'Pension, 13th month & meal vouchers', icon: PiggyBank, desc: 'Holiday pay (double pécule), 13th month, and optional meal vouchers as per sector.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day", date: 'January 1, 2026 (Thursday)' },
  { name: 'Easter Monday', date: 'April 6, 2026 (Monday)' },
  { name: 'Labour Day', date: 'May 1, 2026 (Friday)' },
  { name: 'Ascension Day', date: 'May 14, 2026 (Thursday)' },
  { name: 'Whit Monday', date: 'May 25, 2026 (Monday)' },
  { name: 'Belgian National Day', date: 'July 21, 2026 (Tuesday)' },
  { name: 'Assumption of Mary', date: 'August 15, 2026 (Saturday)' },
  { name: "All Saints' Day", date: 'November 1, 2026 (Sunday)' },
  { name: 'Armistice Day', date: 'November 11, 2026 (Wednesday)' },
  { name: 'Christmas Day', date: 'December 25, 2026 (Friday)' },
]

const eorPros = [
  'No Belgian entity (BV/SRL) required save significant setup cost and 6–12 months.',
  'Hire employees in Belgium in 2–3 days with full ONSS/RSZ and legal compliance.',
  'Jackson & Frank handles payroll, taxes, social security, and Belgian employment law.',
  'Local Belgian contracts and mandatory benefits (holiday pay, 13th month, leave) included.',
  'Work permit and EU Blue Card support for non-EU talent.',
  'Single provider for multiple countries if you expand beyond Belgium.',
]

const eorCons = [
  'Ongoing monthly cost per employee vs. long-term lower cost with your own entity at scale.',
  'You depend on the EOR for compliance choose a licensed provider like Jackson & Frank.',
  'Joint committee (paritair comité) and sector rules may apply; we handle this.',
]

const eorBenefits = [
  'No local entity required save cost and 6–12 months setup',
  'Full compliance with Belgian employment law and ONSS/RSZ',
  'Local employment contracts and payroll from day one',
  'Work permit and EU Blue Card support',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written contract required', 'No probation for indefinite contracts (since 2014)', 'Fixed-term: probation 1–6 months by length'],
  },
  {
    title: 'Notice & severance',
    items: ['Notice by seniority (weeks/months)', 'Payment in lieu (opzegvergoeding) allowed', 'Manifestly unreasonable dismissal: 3–17 weeks extra'],
  },
  {
    title: 'Pay & benefits',
    items: ['Minimum wage (RMMMG) ~€2,000+/month (2026)', '13th month and double holiday pay', '20 days leave minimum', 'Sick pay: employer then mutuelle'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'Belgian entity & ONSS/RSZ', jf: 'Own Belgian entity', others: 'Varies' },
  { feature: 'Dedicated Belgium support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Work permit / Blue Card', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, ONSS/RSZ, holiday pay, 13th month, DIMONA, year-end.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract management, amendments, leave, and local HR queries.', icon: Users },
  { title: 'Benefits', desc: 'Health fund, pension, meal vouchers, and mandatory benefits.', icon: Shield },
  { title: 'Contracts', desc: 'Belgian-compliant employment contracts and addendums.', icon: FileCheck },
  { title: 'Compliance', desc: 'Joint committee, ONSS/RSZ, tax office, and employment law.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer.' },
  { day: 'Day 2', title: 'Contract & onboarding', desc: 'We issue the Belgian contract; employee signs. We register DIMONA, ONSS/RSZ, mutuelle.' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is onboarded and included in the next payroll run.' },
]

const payrollHandles = [
  'Income tax and ONSS/RSZ (social security) withholdings',
  'Holiday pay (double pécule de vacances/vakantiegeld) and 13th month',
  'Health insurance fund (mutualiteit/mutuelle) registration',
  'Payslips and annual statements',
  'DIMONA declaration and tax/social filings',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage Belgian employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and export for finance.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: '6–12 months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (incorporation, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR holds risk', entity: 'You hold full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local provider' },
]

const startupUseCases = [
  'First hires in the EU without a Belgian BV/SRL',
  'Testing the market with a small team in Brussels',
  'Remote-first teams with Belgian talent',
]

const enterpriseUseCases = [
  'Scaling Belgian teams without new entities',
  'M&A or project-based hiring in Belgium',
  'Centralized global EOR with strong Belgian compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage (BE, 2026)', value: '~€2,000+ / month' },
  { label: 'Holiday pay', value: 'Double pécule' },
  { label: 'Statutory leave', value: '20 days minimum' },
]

export default function BelgiumPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-belgium.webp"
            alt="Belgium Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">Belgium</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in Belgium without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Belgium: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in Belgium
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
            Belgium at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-10 leading-relaxed">
            Belgium is strategically located in the heart of Europe and serves as a major hub for international business, EU institutions, and logistics. A highly skilled multilingual workforce and strong labor protections make it a key market for Employer of Record and Belgium payroll outsourcing.
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

      {/* 3. What is EOR in Belgium */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Employer of Record (EOR) in Belgium?"
            description="Employer of Record Belgium lets you hire Belgian employees without setting up a local entity (BV/SRL). We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in Belgium without entity setup."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mt-10 items-stretch">
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs Belgium EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  US, UK, EU, and global companies hiring in Belgium; startups and scaleups building a Belgian team; enterprises expanding without new entities; HR leaders who need fast, compliant hiring in Brussels or across Belgium.
                </p>
              </div>
            </div>
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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

      {/* 4. Why Belgium is attractive for hiring */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why Belgium?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why Belgium is an attractive option for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base  text-gray-600 leading-relaxed">
                Belgium offers an exceptional business environment with a highly educated, multilingual workforce (Dutch, French, German, English) and a strategic location at the heart of Europe. As the headquarters of the EU and NATO, Belgium provides unparalleled access to European institutions and markets. Belgian employment law and ONSS/RSZ framework are clear for Employer of Record and Belgium payroll outsourcing.
              </p>
              <p className="text-base  text-gray-600 leading-relaxed">
                Excellent infrastructure, world-class logistics, and central location make Belgium an ideal hub. With competitive labor costs, a stable legal framework, and DIMONA-based payroll, Belgium EOR helps you hire employees in Belgium without entity and access top talent in Brussels, Antwerp, Ghent, and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Employee Benefits */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in Belgium
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            We manage mandatory and optional benefits for your Belgian employees through our Belgium EOR and payroll platform. Full compliance with Belgian employment law, including holiday pay, 13th month, ONSS/RSZ, and health fund.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {employeeBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 text-primary">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-base">{benefit.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. Belgium Employment Laws */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Belgium Employment Laws 2026: What Companies Must Know"
            description="Stay compliant with Belgian employment law. Key rules on contracts, notice, ONSS/RSZ, minimum wage, and employee protections."
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
            Non-compliance can lead to fines, back payments, and reputational risk. With Belgium EOR, Jackson & Frank ensures your hires meet Belgian employment law and ONSS/RSZ obligations.
          </p>
        </div>
      </section>

      {/* 7. Pros and Cons */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of Belgium EOR"
            description="Weigh the benefits and considerations of using an Employer of Record in Belgium versus setting up your own entity."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of Belgium EOR
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

      {/* 8. Why Choose Jackson & Frank */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Jackson & Frank for Belgium EOR?"
            description="Speed, compliance, and local expertise so you can focus on growing your team."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
              { icon: Scale, title: 'Full compliance', desc: 'Belgian entity, joint committee awareness, ONSS/RSZ and employment law.' },
              { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of Belgian payroll, benefits, and HR practices.' },
              { icon: Shield, title: 'Risk managed', desc: 'We carry employment and tax risk as the legal employer in Belgium.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-xl border border-gray-200 p-6 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">{item.title}</h3>
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

      {/* 9. Jackson & Frank vs Others */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Jackson & Frank vs Other Belgium EOR Providers"
            description="Compare speed, compliance, support, and pricing. We focus on European markets with a strong Belgium footprint."
            align="center"
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/80 rounded-tl-2xl">Feature</th>
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-primary bg-primary/5 border-x border-gray-100">Jackson & Frank</th>
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/80 rounded-tr-2xl">Deel / Remote / Papaya</th>
                </tr>
              </thead>
              <tbody>
                {jfVsOthers.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50/50 ${index % 2 === 1 ? 'bg-gray-50/30' : 'bg-white'}`}
                  >
                    <td className="px-6 py-4 sm:py-5 text-gray-800 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 sm:py-5 border-x border-gray-100 bg-primary/5">
                      <span className="inline-flex items-center gap-2 font-semibold text-primary">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                        {row.jf}
                      </span>
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-gray-600">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. Complete Belgium Employment Services */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Complete Belgium Employment Services"
            description="End-to-end employment and payroll so you can hire and manage Belgian talent without a local entity."
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
                  <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-base flex-1">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 11. Belgium EOR + Immigration */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Belgium EOR + Work Permits & Visas"
            description="Work permit and EU Blue Card support so you can hire non-EU talent in Belgium."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg sm:text-xl mb-2">Work permits (Type A, B, C)</h3>
              <p className="text-gray-600 text-base">
                We support work permit applications and coordinate with regional employment services (VDAB, Actiris, Forem) and immigration authorities so your employees can work legally in Belgium.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg sm:text-xl mb-2">EU Blue Card</h3>
              <p className="text-gray-600 text-base">
                Fast-track option for highly qualified non-EU workers. We handle sponsorship and paperwork as your Belgium EOR.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg sm:text-xl mb-2">Relocation support</h3>
              <p className="text-gray-600 text-base">
                From national register number to mutuelle and first payroll: we guide your new hires through the Belgian system so they can start quickly.
              </p>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/contact?reason=immigration_services" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Ask about work permits & relocation <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* 12. How Our Belgium EOR Process Works */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our Belgium EOR Process Works (2–3 Days)"
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
                  <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Belgium Payroll */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Belgium Payroll: What We Handle"
            description="Full payroll and ONSS/RSZ compliance so you don't have to manage Belgian regulations."
            align="left"
          />
          <ul className="max-w-2xl mx-auto mt-10 space-y-3">
            {payrollHandles.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-lg bg-white border border-gray-200 px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-700 text-base">{item}</span>
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
            description="Manage your Belgium team from one place."
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {platformFeatures.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">{f.title}</h3>
                <p className="text-gray-600 text-base">{f.desc}</p>
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
            description="We keep your Belgium hiring legally sound and audit-ready."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Legal compliance', desc: 'Belgian employment law, joint committee (paritair comité), ONSS/RSZ, and tax requirements.' },
              { title: 'Risk mitigation', desc: 'Correct classification, DIMONA, contracts, and filings to avoid fines and back payments.' },
              { title: 'Audit support', desc: 'Documentation and reporting for internal and external audits.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white border border-gray-200 p-6">
                <Scale className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. EOR vs Entity */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR vs Entity Setup in Belgium"
            description="Decide whether Belgium EOR or a Belgian BV/SRL is right for you."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">Belgium EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Belgian entity (BV/SRL)</th>
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
            description="Whether you're a startup or enterprise, Belgium EOR fits your use case."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold text-gray-900">Startups & scaleups</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-base">
                {startupUseCases.map((u) => (
                  <li key={u} className="flex items-start gap-2">
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
              <ul className="space-y-2 text-gray-600 text-base">
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

      {/* 18. Contractor Management */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Contractor Management in Belgium"
            description="Avoid misclassification and stay compliant when engaging Belgian contractors."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base mb-4">
              Belgian rules on self-employed vs employed are strict. Misclassifying workers can lead to back ONSS/RSZ, penalties, and reclassification. We help you:
            </p>
            <ul className="space-y-2 text-gray-600 text-base">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Assess contractor vs employee status and avoid false self-employment risk.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Use compliant contracts and structures for genuine contractors.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Convert contractors to employees via Belgium EOR when a permanent role makes more sense.
              </li>
            </ul>
            <p className="mt-6 text-base">
              <Link href="/belgium-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Belgium contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide (tabs) */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Comprehensive guide to hiring in Belgium
          </h2>
          <p className="text-base text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Explore leave, termination, public holidays, onboarding, and work permits. Everything you need for Belgian employment law and Belgium payroll.
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
                  {tab === 'additional' && 'Work Permits & Visa'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            {activeTab === 'leave' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Annual leave (Jaarlijkse vakantie / Congés annuels)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In Belgium, employees are entitled to a minimum of 20 days of paid annual leave per year (full-time). Leave is earned in the previous calendar year and taken in the following (système de l&apos;année de référence). Our Belgium EOR ensures full statutory and contractual leave.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity leave (Moederschapsverlof / Congé de maternité)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Expecting mothers are entitled to 15 weeks: 1 week compulsory before birth (or up to 6 weeks optional) and 9 weeks after, plus 5 weeks optional. Benefits are paid by the health insurance fund (mutualiteit/mutuelle) at 82% then 75%. We handle all administration.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Paternity leave (Vaderschapsverlof / Congé de paternité)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Fathers or co-parents are entitled to 20 days of paternity leave within 4 months of birth. First 3 days paid at 100% by employer; remaining 17 days at 82% by the health insurance fund.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Parental leave (Ouderschapsverlof / Congé parental)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Each parent is entitled to 4 months of parental leave per child until the child turns 12. Can be taken full-time, half-time, or one-fifth reduction. A flat-rate benefit is paid by ONEM/RVA during parental leave.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave (Ziekteverlof / Congé de maladie)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employers pay 100% (guaranteed wage) for the first 30 days (white-collar) or 7–14 days (blue-collar, by seniority). After that, the health insurance fund pays at 60% of capped earnings. We handle correct pay and mutuelle reporting.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Belgian labour law provides strong protection. Since 2014 a unified statute applies to white- and blue-collar workers. Termination can be by mutual agreement, with notice, or for serious cause (ontslag om dringende reden / licenciement pour motif grave). We ensure written notice and proper procedure.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period (Opzegtermijn / Délai de préavis)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Notice is calculated by seniority:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Base: 2 weeks for employees</li>
                    <li>Plus 1 week per year (years 1–5), 2 weeks per year (6–10), 4 weeks (11–15), 6 weeks (16–20), 8 weeks (21+)</li>
                  </ul>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">Notice can be replaced by payment in lieu (opzegvergoeding / indemnité de préavis).</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Severance / manifestly unreasonable dismissal</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Belgium does not have statutory severance beyond notice, but manifestly unreasonable dismissal can result in additional compensation of 3–17 weeks&apos; salary depending on seniority. We handle all termination and compensation in line with Belgian law.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Public holidays in Belgium 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  National public holidays. When a holiday falls on a non-working day (e.g. weekend), replacement days may apply per sector or agreement. Our Belgium EOR team applies the correct rules for your employees.
                </p>
                <div className="space-y-2">
                  {publicHolidays2026.map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{holiday.name}</span>
                      <span className="text-sm sm:text-base text-gray-600">{holiday.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Onboarding process</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With Jackson & Frank Belgium EOR, onboarding typically takes 2–3 business days. We handle DIMONA (immediate employment declaration), ONSS/RSZ registration, and enrolment in a health insurance fund (mutualiteit/mutuelle). No Belgian entity required you send details and signed agreements; we issue the Belgian contract and get them live on payroll.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary and holiday pay</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employers must pay at least the statutory minimum (RMMMG ~€2,000+ gross/month in 2026). The 13th month and double holiday pay (pécule de vacances/vakantiegeld) are mandatory in most sectors. Salaries are paid monthly with detailed payslips.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Employment contract</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Belgian contracts (arbeidsovereenkomst/contrat de travail) must be in writing and include:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Parties&apos; details and workplace</li>
                    <li>Start date and contract type</li>
                    <li>Function and remuneration</li>
                    <li>Working schedule and applicable joint committee (paritair comité/commission paritaire)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation period</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Belgian law allows probation only for fixed-term contracts (not for indefinite contracts since 2014). For fixed-term: max 1 month (contracts under 6 months), 3 months (6 months–2 years), 6 months (over 2 years). We draft compliant contracts as part of our Belgium EOR service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Belgian work permits and visas</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Non-EU/EEA nationals need a work permit (type A, B, or C) and residence permit to work in Belgium. Highly skilled workers may qualify for the EU Blue Card. Labour market approval is usually required. Jackson & Frank supports work permit applications and coordinates with VDAB, Actiris, Forem, and immigration authorities so your employees can work legally in Belgium.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our team manages the process so you can hire in Belgium without an entity and without worrying about immigration compliance. Ideal for companies bringing international talent to Brussels, Antwerp, Ghent, or elsewhere in Belgium.
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
            <Button size="lg" aria-label="Learn more about Belgium contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/belgium-contractor">
              Learn more about Belgium contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Belgium Employment Statistics 2026"
            description="Hiring trends, salary benchmarks, and market insights for planning your Belgian team."
            align="left"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {stats2026.map((s) => (
              <div key={s.label} className="rounded-xl bg-white border border-gray-200 p-6 text-center">
                <p className="font-bold text-primary text-lg sm:text-xl mb-1">{s.value}</p>
                <p className="text-gray-600 text-base">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-8 max-w-4xl mx-auto text-center text-base italic">
            The Belgian labour market remains competitive for EU institutions, pharma, logistics, and tech. Belgium EOR helps you access talent quickly while staying compliant with Belgian employment law and ONSS/RSZ obligations.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Belgium EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
