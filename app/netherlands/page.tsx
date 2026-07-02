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
import netherlandsEorData from '@/data/netherlands-eor.json'

const data = netherlandsEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Dutch law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Amsterdam', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Euro (EUR)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Dutch, English', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '17.5M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Very high', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '21%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Dutch Health Insurance', icon: Heart, desc: 'Mandatory basic health insurance (basisverzekering) and optional supplementary cover.' },
  { title: 'Social Security (SVB)', icon: Shield, desc: 'State pension (AOW) and other SVB-administered benefits.' },
  { title: 'Unemployment (WW)', icon: Wallet, desc: 'Unemployment insurance and employee insurance via UWV.' },
  { title: 'Pension & Benefits', icon: PiggyBank, desc: 'Occupational pension, holiday allowance (8%), and statutory leave.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day", date: 'January 1, 2026 (Thursday)' },
  { name: 'Good Friday', date: 'April 3, 2026 (Friday)' },
  { name: 'Easter Sunday', date: 'April 5, 2026 (Sunday)' },
  { name: 'Easter Monday', date: 'April 6, 2026 (Monday)' },
  { name: "King's Day", date: 'April 27, 2026 (Monday)' },
  { name: 'Liberation Day', date: 'May 5, 2026 (Tuesday)' },
  { name: 'Ascension Day', date: 'May 14, 2026 (Thursday)' },
  { name: 'Whit Sunday', date: 'May 24, 2026 (Sunday)' },
  { name: 'Whit Monday', date: 'May 25, 2026 (Monday)' },
  { name: 'Christmas Day', date: 'December 25, 2026 (Friday)' },
  { name: 'Boxing Day', date: 'December 26, 2026 (Saturday)' },
]

const eorPros = [
  'No Dutch entity (BV) required save €100K+ and 6–12 months of setup.',
  'Hire employees in the Netherlands in 2–3 days with full legal compliance.',
  'Jackson & Frank handles payroll, taxes, social security, and Dutch employment law.',
  'Local Dutch employment contracts and mandatory benefits (holiday pay, leave, pension) included.',
  'Visa sponsorship and Highly Skilled Migrant (HSM) support for non-EU talent.',
  'Single provider for multiple countries if you expand beyond the Netherlands.',
]

const eorCons = [
  'Ongoing monthly cost per employee vs. long-term lower cost with your own entity at scale.',
  'You depend on the EOR for compliance choose a licensed, established provider like Jackson & Frank.',
  'Some sector-specific collective agreements (CAOs) may require extra checks; we handle this.',
]

const eorBenefits = [
  'No local entity required save €100K+ and 6–12 months',
  'Full compliance with Dutch employment laws 2026',
  'Local employment contracts and payroll from day one',
  'Visa sponsorship and HSM program support',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written contract required', 'Probation: 1–2 months max', 'Permanent vs fixed-term rules'],
  },
  {
    title: 'Notice & severance',
    items: ['Notice: 1–4 months (employer, by tenure)', 'Transition payment (transitievergoeding) after 24 months', 'Capped at €89K or 1x annual salary'],
  },
  {
    title: 'Pay & benefits',
    items: ['Minimum wage (per 1 Jan 2026)', '8% holiday allowance (paid in May)', '20+ days leave minimum', 'Sick pay up to 2 years'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'Dutch entity & compliance', jf: 'Own Dutch entity', others: 'Varies' },
  { feature: 'Dedicated Netherlands support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Visa / HSM support', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, tax withholdings, holiday allowance, year-end statements.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract management, amendments, leave, and local HR queries.', icon: Users },
  { title: 'Benefits', desc: 'Pension, health insurance, and other mandatory and optional benefits.', icon: Shield },
  { title: 'Contracts', desc: 'Dutch-compliant employment contracts and addendums.', icon: FileCheck },
  { title: 'Compliance', desc: 'CAO, UWV, tax office, and employment law compliance.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer.' },
  { day: 'Day 2', title: 'Contract & onboarding', desc: 'We issue the Dutch contract; employee signs. We register with tax and benefits.' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is onboarded and included in the next payroll run.' },
]

const payrollHandles = [
  'Income tax (loonheffing) and national insurance',
  'Social security (SVB) and pension contributions',
  'Holiday allowance (8%) and 13th month if agreed',
  'Payslips and annual statements',
  'Tax and social filings (e.g. monthly tax return)',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage Dutch employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and export for finance.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: '6–12 months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: '€100K+ (incorporation, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR holds risk', entity: 'You hold full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local provider' },
]

const startupUseCases = [
  'First hires in the EU without a Dutch BV',
  'Testing the market with a small team',
  'Remote-first teams with Dutch talent',
]

const enterpriseUseCases = [
  'Scaling Dutch teams without new entities',
  'M&A or project-based hiring in the Netherlands',
  'Centralized global EOR with strong Dutch compliance',
]

const netherlandsEorCaseStudies = [
  {
    slug: 'automotive-relocation-china-netherlands',
    title: 'Automotive Relocation: China to Netherlands',
    client: 'Global Automotive Company',
    excerpt: 'Rapid relocation of 35 employees from China to the Netherlands in 2 months with full EOR, visa, and payroll support.',
    metrics: [
      { value: '35', label: 'Employees relocated' },
      { value: '2 months', label: 'Time to complete' },
      { value: 'Zero', label: 'Compliance issues' },
    ],
  },
  {
    slug: 'german-saas-scale-up',
    title: 'SaaS Scale-up: European Expansion',
    client: 'German SaaS Company',
    excerpt: '12 engineers onboarded across Germany, Netherlands, and Poland in 3 months with 90% fewer payroll errors.',
    metrics: [
      { value: '12', label: 'Engineers hired' },
      { value: '3 months', label: 'Onboarding time' },
      { value: '90%', label: 'Fewer errors' },
    ],
  },
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage (NL, 2026)', value: '€2,500+ / month (approx)' },
  { label: 'Holiday allowance', value: '8% of gross' },
  { label: 'Statutory leave', value: '20 days minimum' },
]

export default function NetherlandsPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-netherlands.webp"
            alt="Netherlands Employer of Record"
            fill
            className="object-cover object-center scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/50 to-black/90" />
        </div>

        <div className="relative z-10 w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="mb-6 sm:mb-8">
              <h1 className="font-bold text-white leading-[1.1] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl drop-shadow-2xl">
                Hire in <span className="text-[#f7931e] relative">Netherlands</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in Netherlands without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Netherlands: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in Netherlands
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
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-[2rem] sm:text-[2.5rem] font-bold text-primary mb-3 leading-tight">
            Netherlands at a glance
          </h2>
          <p className="text-[15px] text-gray-500 max-w-2xl mb-8 leading-relaxed">
            The Netherlands is one of Europe&apos;s most competitive economies and a gateway to EU talent. With strong employment laws, high English proficiency, and a business-friendly environment, it is a top choice for Employer of Record and Netherlands payroll outsourcing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {countryFacts.map((fact, index) => {
              const IconComponent = fact.icon
              return (
                <div key={index} className="flex flex-col items-center justify-center text-center py-7 px-4 rounded-2xl bg-white border border-gray-200 hover:border-primary/20 hover:shadow-md transition-all duration-200">
                  <IconComponent className={`w-6 h-6 mb-3 ${fact.iconColor}`} />
                  <p className={`text-xs mb-1.5 font-medium ${fact.iconColor}`}>{fact.label}</p>
                  <p className="text-[15px] font-bold text-gray-900 leading-tight">{fact.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. What is EOR in the Netherlands */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Employer of Record (EOR) in the Netherlands?"
            description="Employer of Record Netherlands lets you hire Dutch employees without setting up a local entity. We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in the Netherlands without entity setup."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mt-10 items-stretch">
            {/* Who needs Netherlands EOR? */}
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-left rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs Netherlands EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  US, UK, EU, and global companies hiring in the Netherlands; startups and scaleups building a Dutch team; enterprises expanding without new entities; HR leaders and recruiters who need fast, compliant hiring.
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

      {/* 4. Why the Netherlands is attractive for hiring */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why the Netherlands?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why the Netherlands is an attractive option for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                The Netherlands offers an exceptional business environment with a highly educated, multilingual workforce and a strong culture of innovation. As one of Europe&apos;s most open economies, it provides excellent access to EU markets and is a leading hub for tech, logistics, and finance. Dutch employment laws 2026 and a clear regulatory framework make Netherlands EOR and Netherlands payroll outsourcing straightforward for international companies.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                English is widely spoken, and the country ranks among the top globally for quality of life and work-life balance. With Europe&apos;s largest port in Rotterdam and a strategic location, the Netherlands is ideal for companies hiring in the Netherlands without entity: you get local contracts, full compliance with Dutch employment laws, and access to top talent through Employer of Record Netherlands services.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Dutch workers are known for high productivity, technical skills, and a collaborative mindset. The government supports innovation and the Highly Skilled Migrant program makes it easier to bring in non-EU talent. Whether you need Netherlands payroll outsourcing, full EOR, or visa support, the Netherlands is a prime destination for scaling your European team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Employee Benefits */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in the Netherlands
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            We manage mandatory and optional benefits for your Dutch employees through our Netherlands EOR and payroll platform. Full compliance with Dutch employment laws 2026, including holiday allowance, pension, and social security.
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

      {/* 6. Netherlands Employment Laws 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Netherlands Employment Laws 2026: What Companies Must Know"
            description="Stay compliant with Dutch employment law. Key rules on contracts, probation, notice, minimum wage, and employee protections."
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
            Non-compliance can lead to fines, back payments, and reputational risk. With Netherlands EOR, Jackson & Frank ensures your hires meet Dutch employment laws 2026.
          </p>
        </div>
      </section>

      {/* 7. Pros and Cons of Netherlands EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of Netherlands EOR"
            description="Weigh the benefits and considerations of using an Employer of Record in the Netherlands versus setting up your own entity."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of Netherlands EOR
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

      {/* 8. Why Choose Jackson & Frank Netherlands EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Jackson & Frank for Netherlands EOR?"
            description="Speed, compliance, and local expertise so you can focus on growing your team."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
              { icon: Scale, title: 'Full compliance', desc: 'Dutch entity, CAO awareness, and employment law compliance built in.' },
              { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of Dutch payroll, benefits, and HR practices.' },
              { icon: Shield, title: 'Risk managed', desc: 'We carry employment and tax risk as the legal employer in the Netherlands.' },
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

      {/* 5. Jackson & Frank vs Other Netherlands EOR Providers */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Jackson & Frank vs Other Netherlands EOR Providers"
            description="Compare speed, compliance, support, and pricing. We focus on European markets with a strong Netherlands footprint."
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

      {/* 6. Complete Netherlands Employment Services */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Complete Netherlands Employment Services"
            description="End-to-end employment and payroll so you can hire and manage Dutch talent without a local entity."
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

      {/* 7. Netherlands EOR + Immigration */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Netherlands EOR + Immigration Services"
            description="Visa sponsorship and relocation support so you can hire non-EU talent in the Netherlands."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Visa sponsorship</h3>
              <p className="text-gray-600 text-base!">
                We support combined residence and work permits (GVVA) and coordinate with the IND so your employees can work legally in the Netherlands.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Highly Skilled Migrant (HSM) program</h3>
              <p className="text-gray-600 text-base!">
                Fast-track permits and reduced salary thresholds for qualified professionals. We handle sponsorship and paperwork as your Netherlands EOR.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Relocation support</h3>
              <p className="text-gray-600 text-base!">
                From registration to BSN and first payroll: we guide your new hires through the Dutch system so they can start quickly.
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

      {/* 8. How Our Netherlands EOR Process Works */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our Netherlands EOR Process Works (2–3 Days)"
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

      {/* 9. Netherlands Payroll: What We Handle */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Netherlands Payroll: What We Handle"
            description="Full payroll and tax compliance so you don't have to manage Dutch regulations."
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

      {/* 10. Platform Features */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Platform Features"
            description="Manage your Netherlands team from one place."
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

      {/* 11. Compliance & Risk Management */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Compliance & Risk Management"
            description="We keep your Netherlands hiring legally sound and audit-ready."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Legal compliance', desc: 'Dutch employment law, CAO, UWV, and tax office requirements.' },
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

      {/* 12. Netherlands EOR Success Stories */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Netherlands EOR Success Stories"
            description="Real results from companies using our Employer of Record in the Netherlands."
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-7xl mx-auto">
            {netherlandsEorCaseStudies.map((c, index) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-2xl" aria-hidden />

                {/* Case badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    EOR Case Study
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {c.title}
                </h3>

                {/* Client */}
                <p className="text-sm text-primary font-medium mb-3">{c.client}</p>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{c.excerpt}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mt-auto mb-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <p className="text-lg sm:text-xl font-bold text-primary">{m.value}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 leading-tight mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Read full case study
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* View all button */}
          <div className="text-center mt-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              View all success stories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. EOR vs Entity Setup in Netherlands */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR vs Entity Setup in the Netherlands"
            description="Decide whether Netherlands EOR or a Dutch BV is right for you."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">Netherlands EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Dutch entity (BV)</th>
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

      {/* 14. EOR for Startups vs Enterprises */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR for Startups vs Enterprises"
            description="Whether you're a startup or enterprise, Netherlands EOR fits your use case."
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

      {/* 15. Contractor Management in Netherlands */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Contractor Management in the Netherlands"
            description="Avoid misclassification and stay compliant when engaging Dutch contractors."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              Dutch rules on self-employed vs employed are strict. Misclassifying workers can lead to back taxes, penalties, and reclassification. We help you:
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Assess contractor vs employee status and avoid false self-employment (schijnzelfstandigheid) risk.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Use compliant contracts and structures for genuine contractors.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Convert contractors to employees via Netherlands EOR when a permanent role makes more sense.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/netherlands-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Netherlands contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide to Hiring in the Netherlands (tabs) */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in the Netherlands
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Explore leave, termination, public holidays, onboarding, and immigration. Everything you need for Dutch employment laws 2026 and Netherlands payroll outsourcing.
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
                  <h3 className="text-lg font-bold text-primary mb-3">Annual leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In the Netherlands, employees are entitled to a minimum of 20 days (4 weeks) of paid annual leave per year based on full-time employment. Many employers offer 25 days or more. Unused vacation days can usually be carried forward but must be used within six months after the end of the calendar year. Our Netherlands EOR ensures your team receives full statutory and contractual leave under Dutch employment laws 2026.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Expecting mothers are entitled to 16 weeks of maternity leave (6 weeks before and 10 weeks after the due date). Salary is paid at 100% by the Dutch Employee Insurance Agency (UWV). Additional unpaid parental leave is available. We handle all administration and compliance for your Dutch employees.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Paternity and partner leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Partners receive one week of paid birth leave at 100% salary within four weeks of birth, plus five weeks of additional birth leave (paid at 70% by UWV) within six months. Parental leave of 26 times weekly hours per child (until the child turns 8) is also available first 9 weeks paid at 70%, remainder unpaid.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employers must continue to pay sick employees for up to 2 years (minimum 70% of salary, often 100% in year one and 70% in year two as per contract). Netherlands payroll outsourcing through Jackson & Frank includes correct sick pay and UWV reporting.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In the Netherlands, termination is highly regulated. Employers can terminate via mutual consent, through the UWV (Employee Insurance Agency), or through the courts. Unilateral termination without proper procedure is not permitted. Valid grounds include business economic reasons, long-term illness, frequent absenteeism, underperformance, misconduct, or a disturbed employment relationship.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Statutory notice (employer) depends on tenure:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Less than 5 years: 1 month</li>
                    <li>5–10 years: 2 months</li>
                    <li>10–15 years: 3 months</li>
                    <li>15+ years: 4 months</li>
                  </ul>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">Employee notice is typically 1 month unless the contract states otherwise.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Transition payment (transitievergoeding)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Required for employees with at least 24 months of service. Calculated as 1/3 of a month&apos;s salary per year for the first 10 years and 1/2 month per year thereafter, capped at €89,000 or one year&apos;s salary (whichever is higher). As your Employer of Record Netherlands, we handle all termination and transition payments in line with Dutch employment laws 2026.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Public holidays in the Netherlands 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Below are the main national public holidays. Employers are not always required to give paid time off for every holiday it depends on the sector and collective agreement (CAO). Our Netherlands EOR team applies the correct rules for your employees.
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
                    With Jackson & Frank Netherlands EOR, onboarding typically takes 2–3 business days. We handle registration with the Dutch tax authority, BSN for foreign workers, and payroll setup. No Dutch entity required you send employee details and signed agreements; we issue the Dutch contract and get them live on Netherlands payroll.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary and holiday allowance</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employers must pay at least the statutory minimum wage and an 8% holiday allowance (typically paid in May). Salaries are usually paid monthly with detailed payslips. Netherlands payroll outsourcing through us includes all withholdings, social security, and filings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Employment contract</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Dutch contracts must be in writing and include:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Names and addresses of both parties</li>
                    <li>Start date and place of work</li>
                    <li>Job description, salary, and working hours</li>
                    <li>Leave entitlements and notice periods</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation period</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Maximum 1 month for contracts under 2 years; 2 months for contracts of 2+ years or permanent. During probation, either party can terminate without notice. We draft compliant contracts as part of our Employer of Record Netherlands service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Dutch work permits and visas</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Non-EU/EEA nationals need a combined residence and work permit (GVVA) or qualify under the Highly Skilled Migrant (HSM) program. Jackson & Frank supports visa sponsorship and relocation: we coordinate with the IND (Immigration and Naturalisation Service), handle sponsorship as your Netherlands EOR, and guide employees through BSN registration and first payroll.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our in-house team manages the full visa and permit process so you can hire employees in the Netherlands without entity and without worrying about immigration compliance. Ideal for tech, finance, and scaleups bringing international talent to Amsterdam, Rotterdam, or elsewhere in the Netherlands.
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
            <Button size="lg" aria-label="Learn more about Netherlands contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/netherlands-contractor">
              Learn more about Netherlands contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 16. Netherlands Employment Statistics 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Netherlands Employment Statistics 2026"
            description="Hiring trends, salary benchmarks, and market insights for planning your Dutch team."
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
            Dutch labor market remains competitive for tech, finance, and logistics. Netherlands EOR helps you access talent quickly while staying compliant with Dutch employment laws 2026 and payroll obligations.
          </p>
        </div>
      </section>

      {/* 17. FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Netherlands EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />

     

     
    </>
  )
}
