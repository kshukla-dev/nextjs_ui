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
import chinaEorData from '@/data/china-eor.json'

const data = chinaEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'PRC labour & social insurance aligned', icon: Scale },
  { label: 'City-correct 五险 & 公积金', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Beijing', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Chinese Yuan (CNY)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Mandarin Chinese', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '1.4B+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Moderate', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '13%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'GMT+8 (CST)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'Social insurance (五险)', icon: Shield, desc: 'Pension, medical, unemployment, injury, and maternity insurance where applicable contribution bases and caps are set per city and updated periodically.' },
  { title: 'Housing fund (公积金)', icon: PiggyBank, desc: 'Employer and employee housing provident fund contributions at locally prescribed rates; supports compliant payroll and employee housing benefits.' },
  { title: 'Statutory leave & holidays', icon: Heart, desc: 'Annual leave tiers by service, paid public holidays, and family-related leave entitlements under PRC labour rules tracked on payroll.' },
  { title: 'IIT withholding', icon: Wallet, desc: 'Individual income tax calculated and withheld monthly, with annual settlement (综合所得) reporting where employees are in scope.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day", date: 'January 1, 2026 (Thursday)' },
  { name: 'Spring Festival (Chinese New Year)', date: 'Typically late January–February 2026 (confirm State Council notice)' },
  { name: 'Qingming Festival (Tomb Sweeping Day)', date: 'Typically early April 2026 (confirm official calendar)' },
  { name: 'Labour Day', date: 'May 1, 2026 (Friday) extended break per annual notice' },
  { name: 'Dragon Boat Festival', date: 'Typically June 2026 (lunar calendar confirm dates)' },
  { name: 'Mid-Autumn Festival', date: 'Typically September–October 2026 (lunar calendar confirm dates)' },
  { name: 'National Day Golden Week', date: 'October 1–7 block typical (confirm State Council adjustments)' },
]

const eorPros = [
  'No immediate WFOE or subsidiary setup on your side we employ through a compliant China employer structure.',
  'Local employment contracts, onboarding, and statutory enrolment handled by specialists familiar with city-level rules.',
  'Jackson & Frank runs monthly payroll, IIT withholding, social insurance, and housing fund contributions per bureau requirements.',
  'HR administration for leave, probation, and leavers aligned with Labour Law and Labour Contract Law practice.',
  'Coordination for foreign national work permits and residence steps where your hire requires them.',
  'One partner for China alongside hiring in 160+ other countries.',
]

const eorCons = [
  'Onboarding and bureau registration usually take longer than in smaller payroll-only markets (plan weeks, not days).',
  'Employer social insurance and housing fund add materially to total employment cost beyond gross salary.',
  'Rules differ by municipality (Shanghai, Beijing, Shenzhen, etc.) each hire needs the right local baseline.',
]

const eorBenefits = [
  'Test the China market before committing to full entity incorporation',
  'Labour contracts, 五险, 公积金, and IIT handled on a compliant monthly cycle',
  'Payslips and leaver documentation managed through the EOR',
  'Work authorisation pathways coordinated for eligible foreign hires',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written labour contracts are central under the Labour Contract Law; terms for role, location, pay, and hours must be clear', 'Probation caps apply (e.g. up to six months for open-ended or long fixed-term contracts confirm against contract type)', 'Minimum wage and working hour rules are set locally Shanghai, Beijing, and other tiers differ'],
  },
  {
    title: 'Termination & disputes',
    items: ['Termination generally requires statutory grounds and procedure; unlawful termination can trigger reinstatement or damages', 'Notice or payment in lieu and severance may apply in redundancy or certain exits calculate per law and contract', 'Labour arbitration and courts handle many disputes documentation and process matter'],
  },
  {
    title: 'Pay, leave & contributions',
    items: ['Annual leave: statutory minimum days increase with cumulative service (5 / 10 / 15 days tiers at national level verify employee history)', 'Overtime pay rules apply to standard working hour systems; some roles use comprehensive or flexible schemes where permitted', 'Social insurance and housing fund registration and adjustments follow local HRSSB and fund centre rules'],
  },
]

const jfVsOthers = [
  { feature: 'China city expertise', jf: 'Shanghai / Beijing / tier-1 aware', others: 'Often one-size' },
  { feature: 'Social insurance & fund', jf: 'Bureau-aligned', others: 'Varies' },
  { feature: 'Realistic timelines', jf: 'Honest 2–6 week planning', others: 'Overstated speed' },
  { feature: 'Foreign hire support', jf: 'Coordinated pathway', others: 'Ticket-only' },
  { feature: 'Fee transparency', jf: 'Pass-through clarity', others: 'Hidden add-ons' },
]

const services = [
  { title: 'Payroll & IIT', desc: 'Monthly gross-to-net, IIT withholding and filing support, and payslips in line with local practice.', icon: FileCheck },
  { title: 'HR & contracts', desc: 'Labour contracts, changes, disciplinary documentation, and leavers under PRC employment law frameworks.', icon: Users },
  { title: '五险 & 公积金', desc: 'Enrolment, adjustments, and remittance coordination with social insurance and housing fund centres.', icon: Shield },
  { title: 'Benefits admin', desc: 'Supplementary commercial insurance and allowances where you offer them, structured compliantly in payroll.', icon: Heart },
  { title: 'Compliance', desc: 'Minimum wage checks, working hour systems, and audit-ready contribution records.', icon: Scale },
]

const processSteps = [
  { day: 'Step 1', title: 'Commercial & offer', desc: 'Master agreement signed; we draft the local employment contract and collect identity, bank, and prior employment details.' },
  { day: 'Step 2', title: 'Registration', desc: 'Employment filing, social insurance and housing fund set-up, and tax registration steps with local bureaus as required.' },
  { day: 'Step 3', title: 'Live payroll', desc: 'Employee starts on the agreed date; first monthly pay run with IIT, contributions, and payslip delivery.' },
]

const payrollHandles = [
  'Gross-to-net salary and IIT calculation and withholding',
  'Employer and employee social insurance contributions (五险)',
  'Housing provident fund (公积金) deductions and remittance',
  'Statutory bonuses or 13th-month pay where contractually agreed',
  'Payslips, annual IIT reconciliation support, and leaver final settlement',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View China headcount, employer cost, and payroll status.' },
  { title: 'Employee management', desc: 'Starters, contract changes, and departures with documentation trail.' },
  { title: 'Reporting', desc: 'Exports for finance and consolidation with your other countries.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: 'Typically 2–6 weeks', entity: 'Months (WFOE / subsidiary)' },
  { aspect: 'Setup cost', eor: 'Monthly fee + pass-through', entity: 'High (capital, licences, office)' },
  { aspect: 'Compliance load', eor: 'EOR operates employer stack', entity: 'Your local HR & finance team' },
  { aspect: 'Flexibility', eor: 'Scale up or wind down hires', entity: 'Fixed entity overheads' },
]

const startupUseCases = [
  'First China hire in Shanghai or Beijing before you incorporate',
  'Sales, engineering, or operations staff serving Chinese customers',
  'APAC expansion with a China pod alongside Singapore or Japan',
]

const enterpriseUseCases = [
  'Project teams and secondments into China',
  'Post-M&A integration while entity structure is rationalised',
  'Consistent EOR across China and neighbouring markets',
]

const stats2026 = [
  { label: 'Typical EOR timeline', value: '2–6 weeks' },
  { label: 'Social insurance', value: '五险 + fund (city)' },
  { label: 'Statutory annual leave', value: '5 / 10 / 15 days' },
  { label: 'IIT', value: 'Progressive brackets' },
]

export default function ChinaPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-china.webp"
            alt="China Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">China</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in China without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record China: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in China
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
            China at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-8 leading-relaxed">
            China is the world&apos;s second-largest economy and a major hub for manufacturing, technology, and domestic consumption. Hiring triggers local labour contracts, social insurance (五险), housing fund obligations where applicable, IIT withholding, and for foreign nationals work permit and residence compliance. A China EOR navigates city-level variation so you can access talent without an immediate WFOE.
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
            title="What is Employer of Record (EOR) in China?"
            description="China EOR means a licensed local employer signs the labour contract, runs payroll, withholds IIT, and remits social insurance and housing fund contributions. You manage work outcomes and day-to-day direction. It suits companies that need China employees before or instead of establishing a full WFOE."
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
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs China EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Multinationals opening a first China desk, scaleups hiring engineers or commercial staff in tier-1 cities, and enterprises placing specialists on the ground while entity plans are still in motion without delaying compliant employment.
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
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why China?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why China is attractive for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                China offers the world&apos;s largest consumer market, deep manufacturing and supply-chain expertise, and a large pool of STEM and digital talent. Tier-1 cities provide modern infrastructure, international schools, and ecosystems for finance and technology.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Compliance is detail-heavy: labour contracts, social insurance registration, housing fund rules, IIT reporting, and data privacy expectations all require disciplined processes. Rules are often implemented at provincial or municipal level, so Shanghai differs from Beijing or Shenzhen in contribution caps and admin.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Foreign nationals generally need an appropriate work permit and residence permit tied to a qualifying employer and role. China EOR keeps employment, payroll, and immigration steps aligned where we support your hire type.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in China
          </h2>
          <p className="text-base text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            Statutory packages combine social insurance, housing fund, leave, and IIT-compliant pay. We administer these through our China EOR payroll.
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
            title="China employment law 2026: essentials"
            description="National laws and local implementation for contracts, contributions, and dismissal."
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
            Labour arbitration outcomes and social insurance audits can be costly. China EOR reduces operational risk when delivered by specialists who follow local bureau practice.
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of China EOR"
            description="Balance market access against employer on-costs and lead times."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of China EOR
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
            title="Why choose Jackson & Frank for China EOR?"
            description="City-aware contributions, disciplined payroll, and clear timelines."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: 'Realistic planning', desc: 'We schedule around bureau cut-offs and document lead times not unrealistic same-week promises.' },
              { icon: Scale, title: 'Labour & tax alignment', desc: 'Contracts and payroll structured for PRC employment and IIT practice.' },
              { icon: Users, title: 'HR administration', desc: 'Probation, leave, and exits handled with documented process.' },
              { icon: Shield, title: 'Employer of record', desc: 'We operate the compliant local employer relationship for your nominated staff.' },
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
            title="Jackson & Frank vs other China EOR providers"
            description="Compare local depth, contribution accuracy, and transparency."
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
            title="Our complete China employment services"
            description="From contract to payslip for your China team."
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
            title="China EOR + work authorisation"
            description="Foreign hires need permits and residence status that match the employer and role."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Work permit & residence</h3>
              <p className="text-gray-600 text-base!">
                Foreign employees typically need a work permit (or equivalent notification regime where applicable) and a residence permit aligned with the sponsoring employer. Credentials, experience, and job category affect eligibility.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Local Chinese hires</h3>
              <p className="text-gray-600 text-base!">
                Chinese nationals are employed under standard labour contracts with hukou and social insurance registration handled per local bureau rules no immigration step, but onboarding still requires complete documentation.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Cross-border remote work</h3>
              <p className="text-gray-600 text-base!">
                Having someone work from China while employed overseas can create permanent establishment and immigration risk. We help you choose compliant structures usually in-country employment through EOR when substance is in China.
              </p>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/contact?reason=immigration_services" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Ask about China work authorisation <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How our China EOR process works"
            description="Three phases from agreement to live monthly payroll."
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
            title="China payroll: what we handle"
            description="Monthly cycle covering IIT, 五险, and 公积金."
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
            description="Manage your China team alongside other countries."
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
            description="Social insurance, contracts, and dismissal process must stand up to review."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Contribution compliance', desc: 'Correct bases and caps for 五险 and housing fund per city rules; timely adjustments.' },
              { title: 'Contract & hours', desc: 'Working hour systems, overtime, and rest days documented in line with local labour bureau expectations.' },
              { title: 'Records & audits', desc: 'Employment files, contribution proofs, and payroll history retained for inspections and employee queries.' },
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
            title="EOR vs entity setup in China"
            description="Compare EOR with forming a WFOE or subsidiary."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">China EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">WFOE / subsidiary</th>
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
            description="From first hire to larger China teams."
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
            Our comprehensive guide to hiring in China
          </h2>
          <p className="text-base text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Leave, termination, public holidays, onboarding, and work authorisation in a 2026 planning context. Confirm lunar holiday dates when the State Council publishes each year&apos;s arrangement.
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
                  {tab === 'additional' && 'Work permits & visas'}
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
                    Employees are entitled to a minimum number of paid annual leave days based on cumulative work experience (commonly 5 days after 1–10 years, 10 days after 10–20 years, and 15 days after 20+ years verify individual work history). Employers may offer more. Our China EOR tracks balances and approvals.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Paid sick leave depends on seniority and local regulations; medical certificates are usually required. Pay during sick leave may be a percentage of normal wages apply city rules and contract terms.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity & paternity</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Female employees receive statutory maternity leave (national minimum with possible local extensions). Paternity leave for male employees varies by region. Payroll must reflect legal pay rules during leave.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Termination must generally comply with the Labour Law and Labour Contract Law: valid grounds, notice or payment in lieu where required, and severance in statutory cases such as redundancy or expiry under certain conditions. Unlawful termination can lead to reinstatement or double severance in some cases.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Notice periods depend on contract type and situation; during probation, either party may terminate with shorter notice (often three days) unless otherwise agreed within legal limits. Always document the basis for termination.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Severance</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Severance may be due for redundancy or other statutory exits, commonly calculated with reference to years of service and average wage subject to caps in some jurisdictions. Final pay should include unused annual leave and settlement of social insurance through the last day.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">National public holidays (2026 overview)</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  The State Council publishes official holiday schedules each year; Spring Festival, Dragon Boat, and Mid-Autumn dates follow the lunar calendar. Use the list below for planning and confirm final dates when notices issue.
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
                  <h3 className="text-lg font-bold text-primary mb-3">Onboarding</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Onboarding starts after offer acceptance and contract signature: identity verification, bank account, emergency contacts, and social insurance / housing fund enrolment with local centres. Foreign nationals run in parallel with work permit and residence steps before or shortly after start, depending on route.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary structure</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Packages often include base salary, allowances, and bonuses. Components affect IIT and contribution bases structure them clearly in the labour contract and payroll system.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Probation lengths are capped by law relative to contract term. During probation, termination rules still require compliance; document performance feedback if ending early.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Work permits & visas</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Foreign nationals generally need a work permit (or applicable notification) and residence permit sponsored by the employer. Requirements include education, experience, and a clear job category; processing involves medical checks and police registration in many cases.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Jackson & Frank coordinates documentation with you and specialist partners so employment, payroll, and immigration status stay aligned for eligible hires in China.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="China employment snapshot 2026"
            description="Benchmarks for workforce planning confirm rates and thresholds with local bureaus each year."
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
            VAT, IIT brackets, and social contribution floors change with national and local notices. China EOR keeps payroll and HR aligned with current published rules.
          </p>
        </div>
      </section>

      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our China EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
