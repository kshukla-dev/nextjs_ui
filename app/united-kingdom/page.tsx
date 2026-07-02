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
import ukEorData from '@/data/united-kingdom-eor.json'

const data = ukEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'UK employment law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'London', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Pound sterling (GBP)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'English', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '67M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Global hub', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '20%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'GMT / BST', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'PAYE & National Insurance', icon: Shield, desc: 'Income tax and employee Class 1 NI deducted at source; employer NI calculated and reported to HMRC via RTI.' },
  { title: 'Workplace pensions', icon: PiggyBank, desc: 'Automatic enrolment into a qualifying pension scheme when eligibility thresholds are met, with employer contributions.' },
  { title: 'Statutory pay', icon: Wallet, desc: 'Administration of Statutory Sick Pay (SSP), maternity, paternity, adoption, and shared parental pay where employees qualify.' },
  { title: 'Holiday & rights', icon: Heart, desc: 'Paid annual leave (minimum 5.6 weeks), rest breaks, and other Employment Rights Act 1996 entitlements.' },
]

const publicHolidays2026EnglandWales = [
  { name: "New Year's Day", date: 'January 1, 2026 (Thursday)' },
  { name: 'Good Friday', date: 'April 3, 2026 (Friday)' },
  { name: 'Easter Monday', date: 'April 6, 2026 (Monday)' },
  { name: 'Early May bank holiday', date: 'May 4, 2026 (Monday)' },
  { name: 'Spring bank holiday', date: 'May 25, 2026 (Monday)' },
  { name: 'Summer bank holiday', date: 'August 31, 2026 (Monday)' },
  { name: 'Christmas Day', date: 'December 25, 2026 (Friday)' },
  { name: 'Boxing Day (substitute day)', date: 'December 28, 2026 (Monday)' },
]

const eorPros = [
  'No UK limited company required we employ under our UK entity with full PAYE registration.',
  'Onboard many roles in 2–3 business days once right-to-work checks and starter information are complete.',
  'Jackson & Frank runs payroll, RTI filings, NI, pension auto-enrolment, and P45/P60 processes.',
  'Contracts of employment and statements of particulars meet core UK statutory requirements.',
  'Support for Skilled Worker sponsorship where we hold a licence and the role qualifies.',
  'One partner for UK hires alongside your global expansion.',
]

const eorCons = [
  'Employer NIC and pension costs add to total employment cost vs. gross salary alone.',
  'You rely on the EOR for HR and payroll compliance choose an experienced UK provider.',
  'IR35 does not apply to employees but remains relevant if you also use contractors alongside EOR staff.',
]

const eorBenefits = [
  'No local Ltd setup or Companies House filings required for your first UK hires',
  'HMRC PAYE, RTI, and employment law alignment from day one',
  'Payslips, P60s, and leaver documentation handled',
  'Right-to-work and visa coordination where applicable',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written statement of particulars / contract from day one (or within legal time limits)', 'Probationary periods are common (e.g. 3–6 months); fairness rules still apply to dismissal', 'National Minimum Wage / National Living Wage must be met for each pay reference period'],
  },
  {
    title: 'Notice & dismissal',
    items: ['Statutory minimum notice increases with service (up to 12 weeks after 12 years)', 'Unfair dismissal protection generally after two years’ service (exceptions apply)', 'Follow fair process and ACAS-style good practice for performance and conduct'],
  },
  {
    title: 'Pay & leave',
    items: ['5.6 weeks’ paid holiday per year for full-time workers (often 28 days including bank holidays confirm contract wording)', 'Working Time Regulations cap average weekly hours unless opted out for certain roles', 'SSP and family-related statutory pay subject to eligibility'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'UK PAYE & RTI', jf: 'Own UK employer', others: 'Varies' },
  { feature: 'Pension auto-enrolment', jf: 'Managed', others: 'Often add-on' },
  { feature: 'Right to work', jf: 'Checks documented', others: 'Varies' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often extras' },
]

const services = [
  { title: 'Payroll & PAYE', desc: 'Monthly payroll, tax codes, student loans, NI, RTI Full Payment Submission, and year-end reporting.', icon: FileCheck },
  { title: 'HR support', desc: 'Contracts, changes, disciplinaries, and leavers in line with UK practice.', icon: Users },
  { title: 'Pensions', desc: 'Auto-enrolment assessments, enrolment, contributions, and re-enrolment cycles.', icon: PiggyBank },
  { title: 'Benefits admin', desc: 'Salary sacrifice and benefits in kind reporting where applicable (P11D process).', icon: Shield },
  { title: 'Compliance', desc: 'National Living Wage checks, holiday accrual, apprenticeship levy where liable.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & offer', desc: 'Sign master agreement; share candidate details, salary, and start date. We verify right to work.' },
  { day: 'Day 2', title: 'Contract & HMRC', desc: 'Issue employment contract / statement of particulars; collect P45 or starter checklist; set up PAYE and pension assessment.' },
  { day: 'Day 3', title: 'Live payroll', desc: 'Employee starts; first pay run on your agreed schedule with payslip and RTI submission.' },
]

const payrollHandles = [
  'Income tax and employee National Insurance via PAYE',
  'Employer National Insurance and apprenticeship levy (if applicable)',
  'Workplace pension contributions and re-enrolment duties',
  'Statutory payments (SSP, SMP, etc.) where eligible',
  'Payslips, P45 on exit, and end-of-year P60',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View UK headcount, costs, and payroll status.' },
  { title: 'Employee management', desc: 'Starters, changes, and leavers with audit trail.' },
  { title: 'Reporting', desc: 'Exports for finance and management accounts.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: 'Weeks to months' },
  { aspect: 'Setup cost', eor: 'Monthly fee + pass-through', entity: 'Incorporation, accounting, PAYE scheme' },
  { aspect: 'Compliance risk', eor: 'EOR as employer', entity: 'Your statutory duties' },
  { aspect: 'Ongoing admin', eor: 'EOR-led payroll & HR', entity: 'Your team or bureau' },
]

const startupUseCases = [
  'First UK hire from the US, EU, or APAC without a UK Ltd',
  'Sales and CS teams in London, Manchester, or Edinburgh',
  'Product and engineering hubs tapping UK talent',
]

const enterpriseUseCases = [
  'Project teams and secondments into the UK',
  'M&A and TUPE-adjacent planning with specialist advice',
  'Consistent EOR across UK and EU entities',
]

const stats2026 = [
  { label: 'Time to hire (with EOR)', value: '2–3 days' },
  { label: 'NLW / NMW', value: 'Annual uprating' },
  { label: 'Statutory holiday', value: '5.6 weeks' },
  { label: 'Income tax', value: 'PAYE bands' },
]

export default function UnitedKingdomPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-united-kingdom.webp"
            alt="UK Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">UK</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in UK without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record UK: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in UK
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
            United Kingdom at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-8 leading-relaxed">
            The UK (England, Scotland, Wales, and Northern Ireland) is a leading centre for finance, technology, life sciences, and professional services. London is Europe&apos;s largest financial hub; Manchester, Birmingham, Edinburgh, and Belfast offer deep talent pools. Hiring triggers PAYE, National Insurance, pension duties, and strict right-to-work rules ideal for a UK EOR partner.
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
            title="What is Employer of Record (EOR) in the UK?"
            description="A UK Employer of Record employs your hire on its PAYE scheme. You direct the work; we handle the employment contract, HMRC reporting, NI, pensions auto-enrolment, and core HR compliance. Suited for companies that want UK employees without registering their own limited company immediately."
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
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs UK EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Overseas companies testing the UK market, scaleups opening a London pod, enterprises needing compliant PAYE for remote British workers, and HR teams that want speed without entity setup.
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
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why the UK?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why the United Kingdom is attractive for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                The UK offers English-speaking talent, respected universities, and a large flexible labour market. Time zones bridge North America and Asia-Pacific for global operators.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Employment is regulated by statute (Employment Rights Act 1996, Working Time Regulations 1998, Equality Act 2010, etc.) and supplemented by case law. HMRC enforces PAYE in real time (RTI). Pension auto-enrolment is mandatory for eligible workers. UK EOR and payroll outsourcing must get all of this right on every run.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Post-Brexit, EU nationals need immigration status that allows work; British citizens remain free to work. Right-to-work checks are a strict liability area for employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in the UK
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            Beyond salary, UK employment brings tax, NI, pension, and statutory entitlements. We administer these through our UK EOR payroll.
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
            title="UK Employment Law 2026: What Companies Must Know"
            description="Core obligations under UK statute and HMRC rules for employers."
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
            Tribunal claims and HMRC penalties can follow payroll errors or unfair process. UK EOR reduces operational risk when delivered by specialists.
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of UK EOR"
            description="Balance speed against employer on-costs."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of UK EOR
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
            title="Why Choose Jackson & Frank for UK EOR?"
            description="PAYE accuracy, pension compliance, and responsive HR support."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'Fast starters once right to work and payroll data are in place.' },
              { icon: Scale, title: 'HMRC-aligned', desc: 'RTI submissions, tax codes, and NI handled by payroll experts.' },
              { icon: Users, title: 'UK HR practice', desc: 'Contracts, probation, and leavers managed to a professional standard.' },
              { icon: Shield, title: 'Employer of record', desc: 'We are the UK employer for your nominated staff.' },
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
            title="Jackson & Frank vs Other UK EOR Providers"
            description="Compare PAYE depth, pension handling, and support not logo size."
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
            title="Our Complete UK Employment Services"
            description="Payroll, pensions, and HR for your British workforce."
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
            title="UK EOR + Immigration Support"
            description="Right to work first; sponsorship where licensed and eligible."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Right to work checks</h3>
              <p className="text-gray-600 text-base!">
                We complete Home Office-compliant checks (including online services and share codes) before employment starts and maintain evidence for audits.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Skilled Worker & Global Business Mobility</h3>
              <p className="text-gray-600 text-base!">
                Where we hold a sponsor licence and the role meets skill and salary thresholds, we can assign Certificates of Sponsorship. Immigration rules change confirm eligibility for each hire.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">EU nationals post-Brexit</h3>
              <p className="text-gray-600 text-base!">
                EU citizens need status under the EU Settlement Scheme or another visa route allowing work. We verify documentation accordingly.
              </p>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/contact?reason=immigration_services" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Ask about UK work authorisation <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our UK EOR Process Works (2–3 Days)"
            description="From agreement to first PAYE pay run."
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
            title="UK Payroll: What We Handle"
            description="Full PAYE operation so HMRC receives accurate RTI."
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
            description="Manage your UK team alongside other countries."
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
            description="Employment tribunals and HMRC both demand evidence."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Payroll compliance', desc: 'RTI on time, correct tax codes, student loans, and postgrad loans.' },
              { title: 'Equality & conduct', desc: 'Policies and process aligned with Equality Act and unfair dismissal risk.' },
              { title: 'Records', desc: 'Right-to-work evidence, contracts, and holiday records retained appropriately.' },
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
            title="EOR vs Entity Setup in the UK"
            description="Compare EOR with incorporating a UK Ltd."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">UK EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">UK limited company</th>
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
            description="UK hiring at any scale."
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
            title="Contractor Management in the UK"
            description="IR35 and off-payroll working for PSCs and consultancies."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              UK contractors often trade through personal service companies. Medium and large clients must assess IR35 status and may operate PAYE on deemed employment income. We help separate contractor programmes from EOR employees.
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Document IR35 / off-payroll determinations where you are the fee payer.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Pay PSC invoices or umbrella flows with clear contracts.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Move contractors to UK EOR when employment is the right outcome.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/united-kingdom-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                UK contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in the UK
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Leave, dismissal, bank holidays, onboarding, and right to work aligned with UK employment law 2026 context.
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
                  {tab === 'holidays' && 'Bank Holidays'}
                  {tab === 'onboarding' && 'Onboarding'}
                  {tab === 'additional' && 'Right to work & visas'}
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
                    Full-time workers are entitled to 5.6 weeks’ paid holiday per year (statutory minimum). Many contracts show this as 28 days inclusive of bank holidays, or 20 days plus bank holidays both can be compliant if the total meets 5.6 weeks. Part-time workers receive a pro-rated entitlement. Accrual during maternity and other leave may continue in part apply current rules. Our UK EOR tracks balances and approvals.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave & SSP</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Statutory Sick Pay is payable when eligibility criteria are met (including waiting days and average earnings threshold). Employers may offer enhanced sick pay. Fit notes and reporting procedures should be documented.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Family leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Maternity, paternity, adoption, shared parental, and parental bereavement leave have statutory notice and pay rules. We coordinate payroll during leave periods.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Fair dismissal</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    After two years’ service, employees generally gain unfair dismissal protection. Potentially fair reasons include conduct, capability, redundancy, statutory illegality, and some other substantial reasons. Procedure matters: investigations, warnings where appropriate, and the right to be accompanied at disciplinary hearings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice & redundancy</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Statutory minimum notice must be given or paid in lieu where permitted. Redundancy requires fair selection, consultation (including collective consultation if thresholds met), and statutory redundancy pay for eligible employees.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Settlement agreements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Exits are sometimes concluded via settlement agreement with independent legal advice for the employee. We coordinate payroll aspects with your legal advisers.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Bank holidays in England & Wales 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Scotland and Northern Ireland have additional or different dates. Apply the correct calendar for employees in Edinburgh, Glasgow, Belfast, etc.
                </p>
                <div className="space-y-2">
                  {publicHolidays2026EnglandWales.map((holiday, index) => (
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
                  <h3 className="text-lg font-bold text-primary mb-3">Starter checklist</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    New starters without a P45 complete HMRC&apos;s starter checklist for tax code. We collect bank details, NI number, and emergency contact. Pension auto-enrolment assessment runs from the first pay period.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Contract & handbook</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    The written statement must cover prescribed particulars (pay, hours, place of work, benefits, training, notice, etc.). Many employers add a staff handbook for policies (IT, conduct, equality).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Probation is not a free pass to dismiss unfairly especially as service approaches two years. Set clear objectives and review meetings.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Right to work & sponsorship</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Every UK employer must prevent illegal working. Checks must be completed before employment begins (or follow-up where permitted for pending applications). British and Irish citizens have distinct evidence rules; others may use share codes, biometric residence permits, or frontier worker documents.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Skilled Worker sponsorship requires a licensed sponsor, eligible role, and minimum salary. Immigration skills charge and healthcare surcharge may apply. Ask Jackson & Frank whether sponsorship is available for your vacancy.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Button size="lg" aria-label="Learn more about UK contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/united-kingdom-contractor">
              Learn more about UK contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="UK Employment Snapshot 2026"
            description="Benchmarks for workforce planning confirm NLW/NMW rates each April."
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
            UK employment law and tax thresholds change with Budgets and regulations. UK EOR keeps your payroll and HR aligned with current rules.
          </p>
        </div>
      </section>

      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our UK EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
