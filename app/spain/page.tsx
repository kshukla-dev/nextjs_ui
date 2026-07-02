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
import spainEorData from '@/data/spain-eor.json'

const data = spainEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Spanish law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Madrid', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Euro (EUR)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Spanish (+ co-official regional)', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '48M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Strong EU market', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '21%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Seguridad Social', icon: Shield, desc: 'Mandatory registration with the Spanish Social Security system: common contingencies, unemployment, training, and related coverages per applicable bases.' },
  { title: 'Public healthcare', icon: Heart, desc: 'Access to the National Health System (SNS) for affiliated workers and dependents within the rules of each comunidad autónoma.' },
  { title: 'Unemployment & protection', icon: Wallet, desc: 'Contributions toward unemployment benefits and other protective schemes where legally required.' },
  { title: 'Pensions & extra pay', icon: PiggyBank, desc: 'Retirement accrual through contributions; many contracts include extra monthly payments (pagas extraordinarias), often prorated in payroll.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day (Año Nuevo)", date: 'January 1, 2026 (Thursday)' },
  { name: 'Epiphany (Día de Reyes)', date: 'January 6, 2026 (Tuesday)' },
  { name: 'Good Friday (Viernes Santo)', date: 'April 3, 2026 (Friday)' },
  { name: 'Labour Day (Fiesta del Trabajo)', date: 'May 1, 2026 (Friday)' },
  { name: 'Assumption (Asunción de la Virgen)', date: 'August 15, 2026 (Saturday)' },
  { name: 'National Day (Fiesta Nacional de España)', date: 'October 12, 2026 (Monday)' },
  { name: "All Saints' Day (Todos los Santos)", date: 'November 1, 2026 (Sunday)' },
  { name: 'Constitution Day (Día de la Constitución)', date: 'December 6, 2026 (Sunday)' },
  { name: 'Immaculate Conception (Inmaculada Concepción)', date: 'December 8, 2026 (Tuesday)' },
  { name: 'Christmas Day (Navidad)', date: 'December 25, 2026 (Friday)' },
]

const eorPros = [
  'No Spanish entity (S.L./S.A.) required save incorporation time and upfront cost.',
  'Hire employees in Spain in 2–3 days with Seguridad Social and payroll compliance.',
  'Jackson & Frank handles IRPF withholdings, employer SS contributions, contracts, and HR admin.',
  'Local Spanish employment contracts (contrato de trabajo) and statutory vacation (vacaciones).',
  'Immigration support (NIE/TIE, work authorisation) for non-EU talent where applicable.',
  'Single provider if you expand beyond Spain across Europe and globally.',
]

const eorCons = [
  'Ongoing monthly fee per employee vs. lower marginal cost with your own entity at large scale.',
  'You rely on the EOR for compliance choose an experienced provider like Jackson & Frank.',
  'Collective agreements (convenios colectivos) may apply; we coordinate with applicable rules.',
]

const eorBenefits = [
  'No local entity required avoid long S.L. setup and registered office obligations',
  'Full alignment with the Workers’ Statute (Estatuto de los Trabajadores) and Seguridad Social',
  'Spanish payroll and payslips from day one',
  'Work and residence authorisation support for eligible hires',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written employment contract (contrato de trabajo) with essential terms', 'Probation (periodo de prueba): length depends on role and collective agreement (often up to 6 months for qualified roles, shorter for others)', 'Fixed-term contracts only where legally justified'],
  },
  {
    title: 'Notice & termination',
    items: ['Dismissals and objective terminations follow strict procedural rules under Spanish law', 'Compensation may apply depending on type of termination (e.g. objective, collective)', 'Disciplinary process must respect guarantees under the Estatuto and agreements'],
  },
  {
    title: 'Pay & leave',
    items: ['National minimum wage (SMI) updated annually in EUR gross/month', 'Minimum 30 calendar days paid annual leave (vacaciones retribuidas)', 'Extra payments (pagas extraordinarias) common often prorated monthly in payroll'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'Spanish entity & SS', jf: 'Own Spanish entity', others: 'Varies' },
  { feature: 'Dedicated Spain support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Immigration coordination', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, Seguridad Social (TC1/TC2), IRPF withholdings, pagas extraordinarias prorrata where agreed, payslips, and year-end summaries.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract changes, leave, remote-work documentation, and day-to-day HR queries in Spain.', icon: Users },
  { title: 'Benefits', desc: 'Core statutory benefits, mutual insurance (mutua) coordination where applicable, and aligned extras per policy.', icon: Shield },
  { title: 'Contracts', desc: 'Spanish-compliant contracts and addenda reflecting convenio and company policy.', icon: FileCheck },
  { title: 'Compliance', desc: 'Labour Inspectorate readiness, TGSS filings, AEAT tax obligations, and employment law updates.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer terms.' },
  { day: 'Day 2', title: 'Contract & alta', desc: 'We issue the Spanish contract; employee signs. We complete Seguridad Social registration (alta) and tax setup (NIF/NIE, withholding).' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is active and included in the next payroll run.' },
]

const payrollHandles = [
  'IRPF personal income tax withholdings and annual reporting where applicable',
  'Employer and employee Seguridad Social contributions (common contingencies, unemployment, training, etc.)',
  'Prorrata of extra payments (pagas extraordinarias) when paid monthly',
  'Temporary incapacity (IT) coordination basics with mutua/INSS rules',
  'Payslips (nómina) and cost reporting for finance',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage Spanish employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and exports for accounting.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: 'Several months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (notary, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR carries employer duties', entity: 'You carry full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local advisors' },
]

const startupUseCases = [
  'First EU Southern hub hires without incorporating an S.L.',
  'Testing Spain from Madrid, Barcelona, Valencia, or Málaga',
  'Remote-first teams with Spanish-speaking talent in Spain',
]

const enterpriseUseCases = [
  'Scaling Spanish teams without new local entities',
  'Project or M&A hiring with fast onboarding',
  'Centralised global EOR with consistent Spain compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage (SMI)', value: 'EUR gross/month (annual update)' },
  { label: 'Statutory annual leave', value: '30 calendar days' },
  { label: 'Extra pay (typical)', value: '14 payments / prorrata' },
]

export default function SpainPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-spain.webp"
            alt="Spain Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">Spain</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in Spain without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Spain: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in Spain
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
            Spain at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-8 leading-relaxed">
            Spain is the eurozone&apos;s fourth-largest economy and a gateway to Europe, Latin America, and North Africa. Strong services, tourism, tech, logistics, and renewable sectors pair with modern infrastructure and a large talent pool ideal for Employer of Record and Spain payroll outsourcing.
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
            title="What is Employer of Record (EOR) in Spain?"
            description="Employer of Record Spain lets you hire Spanish employees without setting up a local company (S.L./S.A.). We become the legal employer; you direct day-to-day work. Perfect when you want to hire in Spain without entity setup."
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
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs Spain EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Global companies entering Southern Europe, startups hiring in Madrid or Barcelona, enterprises with project teams in Spain, and HR teams that need compliant speed without a subsidiary.
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
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why Spain?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why Spain is an attractive option for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Spain combines EU market access, competitive talent in tech and professional services, and strong English in many sectors. Hubs like Madrid, Barcelona, Valencia, and Bilbao host multinationals, scaleups, and R&D.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Employment is governed by the Workers&apos; Statute (Estatuto de los Trabajadores), collective agreements (convenios colectivos), and EU directives. Seguridad Social registration and accurate IRPF withholding are non-negotiable areas where Spain EOR and payroll outsourcing add clear value.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Whether you need payroll-only support or full EOR with immigration coordination, Spain is a strategic base for European and LatAm-facing operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in Spain
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            We administer statutory social security, healthcare affiliation, and payroll practices including common treatment of extra payments (pagas extraordinarias) through our Spain EOR.
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
            title="Spain Employment Laws 2026: What Companies Must Know"
            description="Stay aligned with the Estatuto de los Trabajadores, convenios colectivos, and Seguridad Social rules."
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
            Labour inspections and social security audits can be costly if payroll is wrong. Spain EOR keeps registrations, contributions, and contracts in order.
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of Spain EOR"
            description="Balance speed and compliance against building your own Spanish subsidiary."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of Spain EOR
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
            title="Why Choose Jackson & Frank for Spain EOR?"
            description="Speed, compliance, and practical HR support for your Spanish team."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'Fast path from agreement to registered employee and payroll.' },
              { icon: Scale, title: 'Full compliance', desc: 'Seguridad Social, IRPF, convenio awareness, and labour rules built into delivery.' },
              { icon: Users, title: 'Local expertise', desc: 'Spanish payroll, mutua, and HR conventions handled by specialists.' },
              { icon: Shield, title: 'Risk managed', desc: 'We operate as legal employer for your hired staff in Spain.' },
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
            title="Jackson & Frank vs Other Spain EOR Providers"
            description="Compare onboarding, compliance depth, and support not only headline price."
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Complete Spain Employment Services"
            description="Employment, payroll, and compliance so you can operate in Spain without your own S.L."
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
            title="Spain EOR + Immigration Services"
            description="NIE, TIE, and work authorisation support for non-EU hires."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">NIE / TIE & registration</h3>
              <p className="text-gray-600 text-base!">
                Foreign workers typically need a tax ID (NIF/NIE) and, for non-EU nationals, a foreigner identity card (TIE) linked to authorised residence and work. We coordinate documentation with your hiring timeline.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Work and residence authorisation</h3>
              <p className="text-gray-600 text-base!">
                Depending on nationality and role, hires may need initial work/residence approval before or after entry. We support highly qualified permits, EU Blue Card where eligible, and modifications when circumstances change.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Relocation support</h3>
              <p className="text-gray-600 text-base!">
                Practical guidance on SS alta, bank, and first nómina so employees land productively in Spain.
              </p>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/contact?reason=immigration_services" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Ask about immigration & relocation <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our Spain EOR Process Works (2–3 Days)"
            description="Three steps from agreement to payroll."
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
            title="Spain Payroll: What We Handle"
            description="Payroll, social security, and tax withholding in line with AEAT and TGSS requirements."
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
            description="Manage your Spain workforce from one place."
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
            description="Documentation and processes that stand up to inspection."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Legal compliance', desc: 'Estatuto de los Trabajadores, convenios, working time, and remote-work rules where applicable.' },
              { title: 'Risk mitigation', desc: 'Correct alta/baja in SS, IRPF, and contract types to reduce fines and claims.' },
              { title: 'Audit support', desc: 'Payroll history, contribution bulletins, and HR files for internal or external review.' },
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
            title="EOR vs Entity Setup in Spain"
            description="Compare EOR with incorporating an S.L. or S.A."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">Spain EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Spanish entity (S.L./S.A.)</th>
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
            description="Spain EOR scales from first hire to large teams."
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
            title="Contractor Management in Spain"
            description="Reduce falso autónomo risk when engaging Spanish freelancers and autónomos."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              Spain actively polices dependent self-employment. We help you structure genuine contractor relationships and document independence.
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Assess employment vs autónomo status before engagement.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Align contracts and invoicing with Spanish tax and SS practice.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Move to Spain EOR when the role is clearly employment.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/spain-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Spain contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in Spain
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Leave, termination, national holidays, onboarding, and immigration essentials for Spanish employment laws 2026.
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
                  {tab === 'additional' && 'NIE / Work Authorisation'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            {activeTab === 'leave' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Annual leave (vacaciones retribuidas)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employees are entitled to a minimum of 30 calendar days of paid holiday per year (often more under convenios colectivos). Holiday dates are agreed between employer and employee, respecting business needs and legal minima. Unused vacation may need to be settled according to law and agreement. Our Spain EOR tracks balances and approvals.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity & paternity</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Spain provides statutory maternity and paternity rights (with recent reforms expanding partner leave). Benefits and job protection are coordinated with Seguridad Social. We administer leave notifications and payroll impacts for your team.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Parental and family leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Additional parental and family-care leave may be available under law and agreements. Entitlements and pay mechanisms should be checked case by case.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave (baja médica / IT)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Temporary incapacity due to common illness or accident follows mutua/INSS rules with employer involvement in early phases. Medical certificates and timely reporting are essential. Payroll must reflect subsidised periods correctly.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination overview</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Spanish termination is highly regulated. Dismissals may be disciplinary, objective (e.g. organisational/economic grounds with procedure), or collective. Wrongful dismissal can trigger compensation and, in some cases, reinstatement. Always document causes and follow procedural steps and timelines.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice & compensation</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Notice periods and indemnities depend on the type of termination, seniority, and applicable convenio. Objective dismissals often involve minimum compensation (e.g. 20 days&apos; pay per year worked, subject to caps and rules). Voluntary resignations by employees typically require notice as agreed in contract or convenio (commonly 15 days).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Settlement (finiquito)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Final settlements should include accrued salary, unused vacation, prorated extras, and any statutory payments. Employees should understand what they sign. Jackson & Frank supports compliant payroll closure for EOR employees.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">National public holidays in Spain 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Each comunidad autónoma adds regional holidays (e.g. regional day, some Easter Mondays). Below are nationwide dates commonly observed.
                </p>
                <div className="space-y-2">
                  {publicHolidays2026.map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{holiday.name}</span>
                      <span className="text-sm sm:text-base text-gray-600">{holiday.date}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">Confirm regional calendars for employees in Catalonia, Basque Country, Valencia, etc.</p>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Onboarding process</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With Jackson & Frank Spain EOR, onboarding usually takes 2–3 business days. We prepare the contrato de trabajo, complete Seguridad Social alta, set IRPF withholding using employee data, and register the employee for payroll. You provide the offer details; we employ under Spanish law.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary, extras, and nómina</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Gross salary must meet SMI and convenio minima where applicable. Many Spanish contracts assume 14 payments per year; companies often prorate the two extra payments (pagas extraordinarias) each month for simpler cash flow. Payslips show earnings, SS employee share, IRPF, and net pay.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Contract essentials</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Written contracts should specify:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Identity of parties and work centre</li>
                    <li>Job group / professional category and duties</li>
                    <li>Contract type (indefinido, temporal where legal)</li>
                    <li>Base salary, pay periods, and extras treatment</li>
                    <li>Working hours and applicable convenio</li>
                    <li>Probation period if any</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation (periodo de prueba)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Maximum probation depends on company size and employee category; qualified roles can have longer trials than non-qualified ones. During probation, termination conditions differ draft clauses carefully and align with the Estatuto and convenio.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">NIE, TIE, and work authorisation</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  EU/EEA nationals generally work without a work permit but still need NIE/NIF for payroll in many cases. Non-EU nationals need appropriate residence and work authorisation before starting. Procedures involve Spanish consulates, immigration offices, and sometimes labour market tests depending on the permit type.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Jackson & Frank coordinates with your timeline as employer of record: document checklists, contract start dates aligned to permits, and SS registration once work is lawful.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Button size="lg" aria-label="Learn more about Spain contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/spain-contractor">
              Learn more about Spain contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Spain Employment Statistics 2026"
            description="Useful benchmarks for workforce planning."
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
            Spain remains a priority market for EU expansion and nearshore delivery. Spain EOR helps you hire faster while respecting Seguridad Social and labour law.
          </p>
        </div>
      </section>

      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Spain EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
