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
import czechRepublicEorData from '@/data/czech-republic-eor.json'

const data = czechRepublicEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Czech law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Prague', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Czech Koruna (CZK)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Czech', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '10.5M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Very high', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '21%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Health Insurance', icon: Heart, desc: 'Mandatory public health insurance covering medical care and family benefits.' },
  { title: 'Social Security (ČSSZ)', icon: Shield, desc: 'Pension insurance, sickness insurance, and unemployment insurance administered by Czech Social Security Administration.' },
  { title: 'Unemployment Insurance', icon: Wallet, desc: 'Unemployment benefits via Czech Labor Office.' },
  { title: 'Pension & Benefits', icon: PiggyBank, desc: 'State pension, statutory leave (20 days minimum, often 25 days), and mandatory benefits.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day", date: 'January 1, 2026 (Thursday)' },
  { name: 'Good Friday', date: 'April 3, 2026 (Friday)' },
  { name: 'Easter Monday', date: 'April 6, 2026 (Monday)' },
  { name: 'Labour Day', date: 'May 1, 2026 (Friday)' },
  { name: 'Liberation Day', date: 'May 8, 2026 (Friday)' },
  { name: 'Saints Cyril and Methodius Day', date: 'July 5, 2026 (Sunday)' },
  { name: 'Jan Hus Day', date: 'July 6, 2026 (Monday)' },
  { name: 'Czech Statehood Day', date: 'September 28, 2026 (Monday)' },
  { name: 'Independent Czechoslovak State Day', date: 'October 28, 2026 (Wednesday)' },
  { name: 'Struggle for Freedom and Democracy Day', date: 'November 17, 2026 (Tuesday)' },
  { name: 'Christmas Eve', date: 'December 24, 2026 (Thursday)' },
  { name: 'Christmas Day', date: 'December 25, 2026 (Friday)' },
  { name: "St. Stephen's Day", date: 'December 26, 2026 (Saturday)' },
]

const eorPros = [
  'No Czech entity (s.r.o./a.s.) required save significant setup cost and 6–12 months.',
  'Hire employees in Czech Republic in 2–3 days with full social security and legal compliance.',
  'Jackson & Frank handles payroll, taxes, social security (ČSSZ), and Czech employment law.',
  'Local Czech employment contracts and mandatory benefits (health insurance, pension, leave) included.',
  'Employee Card and EU Blue Card support for non-EU talent.',
  'Single provider for multiple countries if you expand beyond Czech Republic.',
]

const eorCons = [
  'Ongoing monthly cost per employee vs. long-term lower cost with your own entity at scale.',
  'You depend on the EOR for compliance choose a licensed provider like Jackson & Frank.',
  'Collective agreements and sector rules may apply; we handle this.',
]

const eorBenefits = [
  'No local entity required save cost and 6–12 months setup',
  'Full compliance with Czech employment law and social security',
  'Local employment contracts and payroll from day one',
  'Employee Card and EU Blue Card support',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written contract required (pracovní smlouva)', 'Probation: up to 3 months (6 months for managers)', 'Unlimited vs fixed-term rules'],
  },
  {
    title: 'Notice & severance',
    items: ['Notice: 2 months (standard), 8 days during probation', 'Severance (odstupné) mandatory for organizational terminations', '1–3 months severance based on tenure'],
  },
  {
    title: 'Pay & benefits',
    items: ['Minimum wage 18,900 CZK/month (2026, ~€780)', '20 days leave minimum (25 days for certain categories)', 'Sick pay: employer days 4–14, then ČSSZ'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'Czech entity & social security', jf: 'Own Czech entity', others: 'Varies' },
  { feature: 'Dedicated Czech Republic support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Employee Card / Blue Card', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, social security (ČSSZ), health insurance, tax withholdings, payslips, year-end.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract management, amendments, leave, and local HR queries.', icon: Users },
  { title: 'Benefits', desc: 'Health insurance, pension, unemployment insurance, and mandatory benefits.', icon: Shield },
  { title: 'Contracts', desc: 'Czech-compliant employment contracts (pracovní smlouva) and addendums.', icon: FileCheck },
  { title: 'Compliance', desc: 'Social security (ČSSZ), tax office, and employment law compliance.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer.' },
  { day: 'Day 2', title: 'Contract & onboarding', desc: 'We issue the Czech contract (pracovní smlouva); employee signs. We register with social security (ČSSZ), health insurance, and tax office.' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is onboarded and included in the next payroll run.' },
]

const payrollHandles = [
  'Income tax and social security (ČSSZ) withholdings',
  'Health insurance contributions',
  'Pension, sickness, and unemployment insurance',
  'Payslips and annual statements',
  'Tax and social security filings (monthly reports)',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage Czech employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and export for finance.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: '6–12 months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (incorporation, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR holds risk', entity: 'You hold full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local provider' },
]

const startupUseCases = [
  'First hires in Central Europe without a Czech s.r.o./a.s.',
  'Testing the market with a small team in Prague',
  'Remote-first teams with Czech talent',
]

const enterpriseUseCases = [
  'Scaling Czech teams without new entities',
  'M&A or project-based hiring in Czech Republic',
  'Centralized global EOR with strong Czech compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage (CZ, 2026)', value: '18,900 CZK / month' },
  { label: 'Statutory leave', value: '20 days minimum' },
  { label: 'Typical leave offered', value: '25 days' },
]

export default function CzechRepublicPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-czech-republic.webp"
            alt="Czech Republic Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">Czech Republic</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in Czech Republic without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Czech Republic: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in Czech Republic
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
            Czech Republic at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-10 leading-relaxed">
            The Czech Republic is a prime destination for IT, manufacturing, and shared services in Central Europe. Its strategic location, competitive talent pool, and EU membership make it a strong choice for Employer of Record and Czech payroll outsourcing.
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

      {/* 3. What is EOR in Czech Republic */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Employer of Record (EOR) in Czech Republic?"
            description="Employer of Record Czech Republic lets you hire Czech employees without setting up a local entity (s.r.o./a.s.). We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in Czech Republic without entity setup."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mt-10 items-stretch">
            {/* Who needs Czech Republic EOR? */}
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[240px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-8 shrink-0 items-center justify-left rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs Czech Republic EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  US, UK, EU, and global companies hiring in Czech Republic; startups and scaleups building a Czech team; enterprises expanding without new entities; HR leaders and recruiters who need fast, compliant hiring.
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

      {/* 4. Why Czech Republic is attractive for hiring */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why Czech Republic?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why the Czech Republic is an attractive option for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                The Czech Republic offers an excellent business environment with a highly skilled, well-educated workforce and a strategic location at the heart of Europe. As one of the most stable and prosperous economies in Central Europe, the Czech Republic provides exceptional opportunities for companies looking to establish operations in the region.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                The country&apos;s excellent infrastructure, modern business centers, and well-developed transportation networks make it an ideal hub for European operations. The Czech Republic&apos;s competitive labor costs, combined with high productivity and a strong tradition of engineering and manufacturing excellence, create exceptional value for international companies. Czech employment laws 2026 and a clear social security (ČSSZ) framework make Czech Republic EOR and Czech Republic payroll outsourcing straightforward for international companies.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Czech workers are known for their technical expertise, strong work ethic, and multilingual capabilities. The country&apos;s excellent education system produces highly qualified graduates in engineering, IT, finance, and other key sectors. Whether you need Czech Republic payroll outsourcing, full EOR, or visa support, the Czech Republic is a prime destination for scaling your Central European team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Employee Benefits */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in Czech Republic
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            We manage mandatory and optional benefits for your Czech employees through our Czech Republic EOR and payroll platform. Full compliance with Czech employment laws 2026, including health insurance, pension, social security, and statutory leave.
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

      {/* 6. Czech Republic Employment Laws 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Czech Republic Employment Laws 2026: What Companies Must Know"
            description="Stay compliant with Czech employment law. Key rules on contracts, probation, notice, minimum wage, and employee protections."
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
            Non-compliance can lead to fines, back payments, and reputational risk. With Czech Republic EOR, Jackson & Frank ensures your hires meet Czech employment laws 2026.
          </p>
        </div>
      </section>

      {/* 7. Pros and Cons of Czech Republic EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of Czech Republic EOR"
            description="Weigh the benefits and considerations of using an Employer of Record in Czech Republic versus setting up your own entity."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of Czech Republic EOR
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

      {/* 8. Why Choose Jackson & Frank Czech Republic EOR */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Jackson & Frank for Czech Republic EOR?"
            description="Speed, compliance, and local expertise so you can focus on growing your team."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
              { icon: Scale, title: 'Full compliance', desc: 'Czech entity, social security (ČSSZ) awareness, and employment law compliance built in.' },
              { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of Czech payroll, benefits, and HR practices.' },
              { icon: Shield, title: 'Risk managed', desc: 'We carry employment and tax risk as the legal employer in Czech Republic.' },
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

      {/* 9. Jackson & Frank vs Other Czech Republic EOR Providers */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Jackson & Frank vs Other Czech Republic EOR Providers"
            description="Compare speed, compliance, support, and pricing. We focus on European markets with a strong Czech Republic footprint."
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

      {/* 10. Complete Czech Republic Employment Services */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Complete Czech Republic Employment Services"
            description="End-to-end employment and payroll so you can hire and manage Czech talent without a local entity."
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

      {/* 11. Czech Republic EOR + Immigration */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Czech Republic EOR + Immigration Services"
            description="Visa sponsorship and relocation support so you can hire non-EU talent in Czech Republic."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Employee Card (Zaměstnanecká karta)</h3>
              <p className="text-gray-600 text-base!">
                We support the Employee Card program, which combines residence and work permit for non-EU workers. The employer must obtain approval from the Czech Labor Office before the employee can apply.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">EU Blue Card</h3>
              <p className="text-gray-600 text-base!">
                Fast-track option for highly qualified non-EU workers with university degrees and job offers meeting minimum salary thresholds. We handle sponsorship and paperwork as your Czech Republic EOR.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Relocation support</h3>
              <p className="text-gray-600 text-base!">
                From birth number (rodné číslo) or tax ID (daňové identifikační číslo) to health insurance and first payroll: we guide your new hires through the Czech system so they can start quickly.
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

      {/* 12. How Our Czech Republic EOR Process Works */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our Czech Republic EOR Process Works (2–3 Days)"
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

      {/* 13. Czech Republic Payroll: What We Handle */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Czech Republic Payroll: What We Handle"
            description="Full payroll and social security compliance so you don't have to manage Czech regulations."
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
            description="Manage your Czech Republic team from one place."
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
            description="We keep your Czech Republic hiring legally sound and audit-ready."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Legal compliance', desc: 'Czech employment law, social security (ČSSZ), tax office, and employment requirements.' },
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

      {/* 16. EOR vs Entity Setup in Czech Republic */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR vs Entity Setup in Czech Republic"
            description="Decide whether Czech Republic EOR or a Czech s.r.o./a.s. is right for you."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">Czech Republic EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Czech entity (s.r.o./a.s.)</th>
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
            description="Whether you're a startup or enterprise, Czech Republic EOR fits your use case."
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

      {/* 18. Contractor Management in Czech Republic */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Contractor Management in Czech Republic"
            description="Avoid misclassification and stay compliant when engaging Czech contractors."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              Czech rules on self-employed vs employed are strict. Misclassifying workers can lead to back social security, penalties, and reclassification. We help you:
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
                Convert contractors to employees via Czech Republic EOR when a permanent role makes more sense.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/czech-republic-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Czech Republic contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide to Hiring in Czech Republic (tabs) */}
      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in Czech Republic
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Explore leave, termination, public holidays, onboarding, and immigration. Everything you need for Czech employment laws 2026 and Czech Republic payroll outsourcing.
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
                  <h3 className="text-lg font-bold text-primary mb-3">Annual leave (Dovolená)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    In Czech Republic, employees are entitled to a minimum of 4 weeks (20 working days) of paid annual leave per year. Employees over 50 or certain categories of employees may be entitled to 5 weeks (25 days). Leave must be used within the calendar year, though up to 4 weeks can be carried forward with employer approval. Our Czech Republic EOR ensures your team receives full statutory and contractual leave under Czech employment laws 2026.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity leave (Mateřská dovolená)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Expecting mothers are entitled to 28 weeks of maternity leave (37 weeks for multiple births), starting 6–8 weeks before the expected due date. Maternity benefit (mateřská) is paid by the Czech Social Security Administration (ČSSZ) at 70% of average earnings (capped). Mothers can also opt for reduced benefits over a longer period (up to 4 years with lower payments). We handle all administration and compliance for your Czech employees.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Paternity leave (Otcovská dovolená)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Fathers are entitled to 1 week of paternity leave to be taken within 6 weeks of the child&apos;s birth. Additional parental leave is available to either parent after maternity leave ends.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Parental leave (Rodičovská dovolená)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Either parent can take parental leave until the child turns 3 years old. Parental benefit (rodičovský příspěvek) is paid for varying durations depending on the chosen option: faster payment (up to 2 years) at higher monthly amounts, or slower payment (up to 4 years) at lower monthly amounts.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave (Nemocenská)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    The first 3 calendar days of sick leave are unpaid (karenční doba). From day 4–14, employers pay 60% of reduced average earnings. From day 15 onwards, the Czech Social Security Administration (ČSSZ) pays sickness benefit (nemocenská) at 60% of reduced average earnings for up to 1 year (380 days). Czech Republic payroll outsourcing through Jackson & Frank includes correct sick pay and ČSSZ reporting.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Czech labor law regulates termination procedures. Employment can be terminated by mutual agreement, by either party with notice, or immediately for serious reasons. Employers must provide written notice with justification. Valid grounds include organizational changes, health reasons, or breach of work duties. Certain employees (pregnant women, those on maternity/parental leave) have enhanced protection. Employees can challenge unfair dismissals in Czech courts.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period (Výpovědní doba)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    The statutory notice period in Czech Republic is 2 months for both employer and employee, starting on the first day of the calendar month following notice delivery. During the trial period (zkušební doba), the notice period is shortened to 8 days with specific regulations about when it starts.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Severance pay (Odstupné)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Severance pay is mandatory for organizational terminations: 1 month&apos;s average earnings for less than 1 year of service, 2 months&apos; earnings for 1–2 years, and 3 months&apos; earnings for 2+ years of service. Severance is also payable if employment ends due to health reasons (12 months&apos; average earnings) or if the employer closes (3 months&apos; earnings). As your Employer of Record Czech Republic, we handle all termination and severance payments in line with Czech employment laws 2026.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Public holidays in Czech Republic 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Below are the main national public holidays. Our Czech Republic EOR team applies the correct rules for your employees.
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
                    With Jackson & Frank Czech Republic EOR, onboarding typically takes 2–3 business days. We handle registration with Czech Social Security Administration (ČSSZ) and health insurance companies. Employees need a birth number (rodné číslo) or tax identification number (daňové identifikační číslo) for foreign workers. No Czech entity required you send employee details and signed agreements; we issue the Czech contract (pracovní smlouva) and get them live on Czech Republic payroll.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary and benefits</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employers must pay at least the statutory minimum wage of 18,900 CZK per month (approximately €780) as of 2026. Salaries are paid monthly, and employers must provide detailed payslips showing gross salary, social security contributions, health insurance, income tax, and net salary. Czech Republic payroll outsourcing through us includes all withholdings, social security (ČSSZ), and filings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Employment contract</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Czech contracts (pracovní smlouva) must be in writing and include:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Parties&apos; details and workplace</li>
                    <li>Job description</li>
                    <li>Start date</li>
                    <li>Salary and working hours</li>
                    <li>Leave entitlement</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation period (Zkušební doba)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Czech law allows probation periods of up to 3 months for most positions (6 months for managerial positions). During probation, either party can terminate with 8 days&apos; notice without providing reasons. We draft compliant contracts as part of our Employer of Record Czech Republic service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Czech work permits and visas</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Non-EU/EEA nationals require an employee card (zaměstnanecká karta) combining residence and work permit, or a Blue Card for highly qualified workers. The employer must obtain approval from the Czech Labor Office before the employee can apply. Jackson & Frank supports visa sponsorship and relocation: we coordinate with Czech Labor Office, handle sponsorship as your Czech Republic EOR, and guide employees through birth number (rodné číslo) or tax ID (daňové identifikační číslo), health insurance registration, and first payroll.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our in-house team manages the full visa and permit process so you can hire employees in Czech Republic without entity and without worrying about immigration compliance. Ideal for tech, engineering, and scaleups bringing international talent to Prague, Brno, or elsewhere in the Czech Republic.
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
            <Button size="lg" aria-label="Learn more about Czech Republic contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/czech-republic-contractor">
              Learn more about Czech Republic contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 19. Czech Republic Employment Statistics 2026 */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Czech Republic Employment Statistics 2026"
            description="Hiring trends, salary benchmarks, and market insights for planning your Czech team."
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
            The Czech labor market remains competitive for engineering, IT, manufacturing, and automotive. Czech Republic EOR helps you access talent quickly while staying compliant with Czech employment laws 2026 and social security (ČSSZ) obligations.
          </p>
        </div>
      </section>

      {/* 20. FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Czech Republic EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />

     
    </>
  )
}
