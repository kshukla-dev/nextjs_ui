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
import hkEorData from '@/data/hong-kong-eor.json'

const data = hkEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Employment Ordinance aligned', icon: Scale },
  { label: 'MPF enrolment & remittance', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Hong Kong', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Hong Kong dollar (HKD)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Cantonese, English', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '7.5M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Global hub', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT / sales tax', value: 'No VAT', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'GMT+8 (HKT)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Mandatory Provident Fund (MPF)', icon: PiggyBank, desc: 'Employer and employee contributions into approved MPF schemes (or exempt category where applicable), with enrolment and remittance handled each pay cycle.' },
  { title: 'Employment Ordinance rights', icon: Shield, desc: 'Paid annual leave, sick leave entitlements, maternity, paternity, rest days, and statutory holiday pay tracked in line with the Ordinance.' },
  { title: 'Statutory holidays', icon: Heart, desc: '15 statutory holidays in 2026 (per Labour Department schedule), with holiday pay rules for qualifying continuous contracts.' },
  { title: 'Salaries tax & reporting', icon: Wallet, desc: 'Payroll structured for IR56B / IR56E / IR56F reporting and employee salaries tax obligations HK does not mirror UK PAYE withholding.' },
]

/** Source: Hong Kong Labour Department – Statutory Holidays for 2026 */
const publicHolidays2026 = [
  { name: 'The first day of January', date: '1 January 2026 (Thursday)' },
  { name: "Lunar New Year's Day", date: '17 February 2026 (Tuesday)' },
  { name: 'The second day of Lunar New Year', date: '18 February 2026 (Wednesday)' },
  { name: 'The third day of Lunar New Year', date: '19 February 2026 (Thursday)' },
  { name: 'Ching Ming Festival', date: '5 April 2026 (Sunday)' },
  { name: 'Easter Monday', date: '6 April 2026 (Monday)' },
  { name: 'Labour Day', date: '1 May 2026 (Friday)' },
  { name: 'The Birthday of the Buddha', date: '24 May 2026 (Sunday)' },
  { name: 'Tuen Ng Festival', date: '19 June 2026 (Friday)' },
  { name: 'HKSAR Establishment Day', date: '1 July 2026 (Wednesday)' },
  { name: 'The day following the Chinese Mid-Autumn Festival', date: '26 September 2026 (Saturday)' },
  { name: 'National Day', date: '1 October 2026 (Thursday)' },
  { name: 'Chung Yeung Festival', date: '18 October 2026 (Sunday)' },
  { name: 'Chinese Winter Solstice Festival or Christmas Day (employer option)', date: '22 December or 25 December 2026' },
  { name: 'The first weekday after Christmas Day', date: '26 December 2026' },
]

const eorPros = [
  'No Hong Kong limited company required on your side for early hires we employ through our compliant structure.',
  'Employment contracts, MPF enrolment, and monthly payroll aligned with Hong Kong practice.',
  'Jackson & Frank handles leavers, severance / long-service calculations where applicable, and statutory filings.',
  'Support for expatriate employment visas where the role and candidate qualify under Immigration Department rules.',
  'English- and Chinese-friendly documentation for finance and HR teams.',
  'One partner for Hong Kong alongside hiring in 160+ other countries.',
]

const eorCons = [
  'Expatriate visa processing adds weeks compared with a local hire who already has the right to work.',
  'MPF employer contributions are an on-cost on top of gross salary.',
  'Statutory holiday, rest-day, and overtime rules are technical mistakes create Labour Department and tribunal risk.',
]

const eorBenefits = [
  'Enter the Hong Kong market before incorporating a local entity',
  'MPF, payroll, and Employment Ordinance compliance managed centrally',
  'IR56 reporting and payslips handled through the EOR',
  'Visa pathway coordination for eligible overseas hires',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written employment terms should set out wages, hours, rest days, and notice continuous contract rules affect leave and holiday pay', 'Probation is common; termination during probation still requires lawful notice or payment in lieu unless contract provides otherwise', 'Minimum wage applies verify current hourly rate each year'],
  },
  {
    title: 'Termination & payments',
    items: ['Notice or payment in lieu per contract and Ordinance; unreasonable dismissal claims possible for employees with 24+ months service (exceptions apply)', 'Redundancy may trigger severance payment; long service payment may apply after five years in qualifying exits', 'Final wages due within seven days of termination subject to rules'],
  },
  {
    title: 'Leave & holidays',
    items: ['Annual leave accrues from 7 to 14 days minimum depending on length of service under a continuous contract', 'Paid sick leave accumulates after a qualifying period; medical certificates required', 'From 2026, Easter Monday is a statutory holiday alongside the Labour Department’s published calendar substitute days apply when holidays fall on rest days'],
  },
]

const jfVsOthers = [
  { feature: 'HK payroll & MPF', jf: 'Integrated', others: 'Often split vendors' },
  { feature: 'Employment Ordinance depth', jf: 'Practitioner-led', others: 'Generic templates' },
  { feature: 'Visa realism', jf: 'Honest timelines', others: 'Overstated speed' },
  { feature: 'IR56 & year-end', jf: 'Coordinated', others: 'Employee-only reminders' },
  { feature: 'Transparent fees', jf: 'Clear pass-through', others: 'Add-ons' },
]

const services = [
  { title: 'Payroll & MPF', desc: 'Monthly pay runs, MPF contributions to approved trustees, and payment records.', icon: FileCheck },
  { title: 'HR & contracts', desc: 'Hong Kong employment agreements, changes, warnings, and leaver letters.', icon: Users },
  { title: 'Statutory compliance', desc: 'Minimum wage checks, rest days, statutory holiday pay, and leave balances.', icon: Scale },
  { title: 'Tax reporting', desc: 'IR56B/E/F preparation and submission support in line with Inland Revenue timelines.', icon: FileCheck },
  { title: 'Benefits admin', desc: 'Optional medical, housing allowances, and bonuses structured in payroll.', icon: Shield },
]

const processSteps = [
  { day: 'Step 1', title: 'Commercial & offer', desc: 'Master agreement signed; employment contract drafted; collect ID, bank, tax status, and prior service details.' },
  { day: 'Step 2', title: 'MPF & payroll setup', desc: 'Enrol employee with MPF trustee, register payroll, and configure statutory holiday and leave policies.' },
  { day: 'Step 3', title: 'Go live', desc: 'Start date confirmed; first pay run; IR56 reporting cycle established for year-end.' },
]

const payrollHandles = [
  'Gross-to-net salary and MPF employee deductions',
  'Employer MPF contributions and remittance deadlines',
  'Statutory holiday pay, annual leave, and sick leave accruals',
  'Severance and long service payment calculations where applicable',
  'Payslips and leaver documentation including IR56F where required',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'Hong Kong headcount, payroll status, and employer cost in one view.' },
  { title: 'Employee management', desc: 'Onboarding, contract changes, and departures with audit trail.' },
  { title: 'Reporting', desc: 'Exports for finance and group consolidation.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: 'Often 3–10 business days (local)', entity: 'Weeks (incorporation + bank)' },
  { aspect: 'Setup cost', eor: 'Monthly fee + pass-through', entity: 'Company secretary, audit, office' },
  { aspect: 'Compliance load', eor: 'EOR as employer', entity: 'Your HR, payroll, MPF' },
  { aspect: 'Flexibility', eor: 'Scale headcount quickly', entity: 'Fixed running costs' },
]

const startupUseCases = [
  'First Hong Kong hire from the US, EU, or mainland China',
  'APAC sales, trading, or fintech teams in Central or Quarry Bay',
  'Regional treasury and professional services roles',
]

const enterpriseUseCases = [
  'Project teams between Hong Kong and Greater Bay Area entities',
  'Short-term coverage while a local subsidiary is being formed',
  'Consistent EOR across Singapore, Hong Kong, and Tokyo hubs',
]

const stats2026 = [
  { label: 'Statutory holidays', value: '15 days' },
  { label: 'Typical local onboarding', value: '3–10 days' },
  { label: 'MPF', value: 'Mandatory (most staff)' },
  { label: 'Salaries tax', value: 'Employee-led filing' },
]

export default function HongKongPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-hong-kong.webp"
            alt="Hong Kong Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">Hong Kong</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in Hong Kong without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Hong Kong: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in Hong Kong
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
            Hong Kong at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-8 leading-relaxed">
            Hong Kong SAR is a global financial centre with common-law roots, free flow of capital, and deep bilingual talent. Hiring triggers the Employment Ordinance, mandatory MPF (for most employees), statutory holidays, and Inland Revenue reporting not a UK-style PAYE system. Hong Kong EOR lets you access that talent without first setting up a limited company.
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
            title="What is Employer of Record (EOR) in Hong Kong?"
            description="Hong Kong EOR means a local employer signs the employment contract, runs payroll, deducts MPF, and meets Employment Ordinance obligations. You direct the work and performance. It is suited to companies that want Hong Kong employees while deferring or avoiding their own incorporation."
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
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs Hong Kong EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Asset managers and fintechs testing Hong Kong coverage, mainland and global firms hiring a SAR desk, and enterprises placing compliance or trading staff in Central, Admiralty, or Tsim Sha Tsui without immediate entity setup.
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
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why Hong Kong?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why Hong Kong is attractive for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Hong Kong combines English-language business practice with proximity to mainland China and the Greater Bay Area. World-class banks, listing venues, and professional services firms make it a natural hub for finance, law, logistics, and technology.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Salaries tax is capped at progressive rates with generous allowances; there is no VAT. Compliance focus is on the Employment Ordinance, MPF, and accurate IR56 reporting. Labour Tribunal claims for unpaid wages or wrongful termination are a real risk if payroll and holidays are mishandled.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Expatriates usually need an employment visa matched to a genuine job offer and sponsoring employer. Hong Kong permanent residents and certain other categories already have the right to work we verify status before start dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in Hong Kong
          </h2>
          <p className="text-base text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            Core packages centre on MPF, statutory leave, and holiday pay. We administer these through our Hong Kong EOR payroll.
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
            title="Hong Kong employment law 2026: essentials"
            description="Employment Ordinance, MPF, and statutory holiday reforms including Easter Monday from 2026."
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
            If a statutory holiday falls on a rest day, substitute arrangements apply. Always confirm the Labour Department calendar and your employees’ rest-day pattern.
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of Hong Kong EOR"
            description="Balance speed and simplicity against employer MPF cost and visa lead times."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of Hong Kong EOR
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
            title="Why choose Jackson & Frank for Hong Kong EOR?"
            description="Ordinance-savvy HR, disciplined MPF, and clear communication with finance."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: 'Fast local onboarding', desc: 'Where the employee already has the right to work, we target a short path to first pay run.' },
              { icon: Scale, title: 'MPF & payroll accuracy', desc: 'Contribution caps, enrolment windows, and leaver handling done to trustee requirements.' },
              { icon: Users, title: 'HR practice', desc: 'Contracts, probation, performance, and exits documented to Hong Kong standards.' },
              { icon: Shield, title: 'Employer of record', desc: 'We are the Hong Kong employer for your nominated staff.' },
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
            title="Jackson & Frank vs other Hong Kong EOR providers"
            description="Compare MPF integration, Ordinance depth, and reporting support."
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
            title="Our complete Hong Kong employment services"
            description="Payroll, MPF, and HR for your SAR workforce."
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
            title="Hong Kong EOR + employment visas"
            description="Right to work first; Immigration Department routes for overseas hires."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Right to work</h3>
              <p className="text-gray-600 text-base!">
                Hong Kong permanent residents and certain other categories may work without a separate employment visa. We verify identity and immigration status before employment starts.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">General Employment Policy & schemes</h3>
              <p className="text-gray-600 text-base!">
                Overseas professionals often enter under the General Employment Policy or other suitable schemes. Applications require a genuine job match, employer sponsor, and relevant qualifications processing times vary by case load.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Remote work from Hong Kong</h3>
              <p className="text-gray-600 text-base!">
                Working physically in Hong Kong for an overseas employer without proper visa coverage is risky. We help you structure compliant employment through EOR when substance is in Hong Kong.
              </p>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/contact?reason=immigration_services" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Ask about Hong Kong work visas <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How our Hong Kong EOR process works"
            description="From agreement to first compliant pay run."
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
            title="Hong Kong payroll: what we handle"
            description="MPF, wages, and Inland Revenue reporting support."
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
            title="Platform features"
            description="Manage Hong Kong alongside your other markets."
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
            title="Compliance & risk management"
            description="Labour Department inspections and tribunal claims need a clear paper trail."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Wages & timing', desc: 'Payment cycles, overtime, and final pay aligned with the Employment Ordinance.' },
              { title: 'MPF compliance', desc: 'Enrolment deadlines, contribution accuracy, and leaver notices to trustees.' },
              { title: 'Records', desc: 'Leave balances, holiday pay calculations, and contracts retained for audit defence.' },
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
            title="EOR vs entity setup in Hong Kong"
            description="Compare EOR with incorporating a Hong Kong limited company."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">Hong Kong EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Limited company</th>
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
            title="EOR for startups vs enterprises"
            description="Hong Kong hiring at any scale."
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

      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in Hong Kong
          </h2>
          <p className="text-base text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Leave, termination, statutory holidays (2026 Labour Department calendar), onboarding, and visas. If a holiday falls on a rest day, a substitute day may apply see LD guidance.
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
                  {tab === 'holidays' && 'Statutory Holidays'}
                  {tab === 'onboarding' && 'Onboarding'}
                  {tab === 'additional' && 'Visas & right to work'}
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
                    Under a continuous contract, annual leave entitlement increases with service from 7 days after one year up to 14 days after nine years (minimum statutory scale). Employers may grant more. Our Hong Kong EOR tracks balances and approvals.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Paid sickness allowance accrues after a qualifying period and is subject to medical certification. Rates differ between the first days and subsequent days apply the Ordinance and contract.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity & paternity</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Statutory maternity leave is 14 weeks for eligible employees with prescribed pay rates for the paid portion. Paternity leave is available for eligible fathers confirm notice and documentation rules.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Termination must follow contract terms and the Employment Ordinance: notice or payment in lieu, valid grounds where required, and timely final wages. Employees with 24+ months’ service may pursue unreasonable dismissal claims in prescribed circumstances.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Notice lengths are often one month after probation but can be longer by agreement. During probation, shorter notice (e.g. seven days) is common if the contract allows always document dismissals fairly.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Severance & long service payment</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Redundancy-style dismissals may trigger severance payment. Long service payment may apply when an employee with five or more years of service is dismissed in qualifying scenarios. They are generally mutually exclusive calculate carefully.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Statutory holidays in 2026 (Hong Kong)</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  The Labour Department publishes 15 statutory holidays for 2026. Easter Monday is included from 2026 under the Employment (Amendment) Ordinance 2021. Where a holiday falls on a rest day, a substitute holiday is granted per LD rules.
                </p>
                <div className="space-y-2">
                  {publicHolidays2026.map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0 gap-4">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{holiday.name}</span>
                      <span className="text-sm sm:text-base text-gray-600 text-right">{holiday.date}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Source:{' '}
                  <a
                    href="https://www.labour.gov.hk/eng/news/latest_holidays2026.htm"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hong Kong Labour Department
                  </a>
                  .
                </p>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Onboarding</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Collect identity documents, proof of right to work or visa status, tax file references if available, bank details, and emergency contacts. MPF enrolment must be completed within the statutory window for new employees.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary & benefits</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Packages often include base salary, discretionary bonus, housing or transport allowances, and group medical. Structure items clearly for salaries tax and MPF relevant income rules.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Probation up to three months is typical; set objectives and review dates. Termination still requires lawful notice or payment unless contract and law allow otherwise.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Visas & right to work</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Every employee must have permission to work in Hong Kong. Permanent residents have general right to work; other nationalities usually need an employment visa tied to the sponsoring employer before employment commences.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Jackson & Frank coordinates with you and immigration advisers on documentation for eligible candidates, while running compliant payroll once work authorisation is in place.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Hong Kong employment snapshot 2026"
            description="Planning benchmarks confirm MPF caps and minimum wage with current notices."
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
            Minimum wage, MPF thresholds, and tax bands can change with government announcements. Hong Kong EOR keeps payroll aligned with current rules.
          </p>
        </div>
      </section>

      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Hong Kong EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
