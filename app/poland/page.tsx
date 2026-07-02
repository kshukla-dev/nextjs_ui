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
import polandEorData from '@/data/poland-eor.json'

const data = polandEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Polish law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '160+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Warsaw', icon: MapPin, iconColor: 'text-blue-600' },
  { label: 'Currency', value: 'Polish złoty (PLN)', icon: DollarSign, iconColor: 'text-green-600' },
  { label: 'Languages', value: 'Polish', icon: Languages, iconColor: 'text-purple-600' },
  { label: 'Population', value: '38M+', icon: Users, iconColor: 'text-orange-600' },
  { label: 'Ease of doing business', value: 'Strong EU hub', icon: Zap, iconColor: 'text-emerald-600' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'text-indigo-600' },
  { label: 'VAT standard rate', value: '23%', icon: Percent, iconColor: 'text-red-600' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'text-cyan-600' },
]

const employeeBenefits = [
  { title: 'National Health Fund (NFZ)', icon: Heart, desc: 'Mandatory health insurance financed via ZUS health contribution, providing access to public healthcare (Narodowy Fundusz Zdrowia).' },
  { title: 'Social insurance (ZUS)', icon: Shield, desc: 'Zakład Ubezpieczeń Społecznych: retirement, disability, sickness, accident, and labour fund contributions as required by law.' },
  { title: 'Sick pay & benefits', icon: Wallet, desc: 'Statutory sick pay funded by the employer for the initial period, then social insurance (ZUS) benefits where conditions are met.' },
  { title: 'Employee Capital Plans (PPK)', icon: PiggyBank, desc: 'Pracownicze Plany Kapitałowe: long-term savings with employer and employee contributions for eligible employers under Polish rules.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day (Nowy Rok)", date: 'January 1, 2026 (Thursday)' },
  { name: 'Epiphany (Święto Trzech Króli)', date: 'January 6, 2026 (Tuesday)' },
  { name: 'Easter Sunday (Wielkanoc)', date: 'April 5, 2026 (Sunday)' },
  { name: 'Easter Monday (Poniedziałek Wielkanocny)', date: 'April 6, 2026 (Monday)' },
  { name: 'Labour Day (Święto Pracy)', date: 'May 1, 2026 (Friday)' },
  { name: 'Constitution Day (Święto Konstytucji 3 Maja)', date: 'May 3, 2026 (Sunday)' },
  { name: 'Whit Sunday (Zielone Świątki)', date: 'May 24, 2026 (Sunday)' },
  { name: 'Corpus Christi (Boże Ciało)', date: 'June 4, 2026 (Thursday)' },
  { name: 'Assumption of Mary (Wniebowzięcie NMP)', date: 'August 15, 2026 (Saturday)' },
  { name: "All Saints' Day (Wszystkich Świętych)", date: 'November 1, 2026 (Sunday)' },
  { name: 'Independence Day (Narodowe Święto Niepodległości)', date: 'November 11, 2026 (Wednesday)' },
  { name: 'Christmas Day (Boże Narodzenie)', date: 'December 25, 2026 (Friday)' },
  { name: 'Second Day of Christmas (Drugie Święto Bożego Narodzenia)', date: 'December 26, 2026 (Saturday)' },
]

const eorPros = [
  'No Polish entity (sp. z o.o./S.A.) required save significant setup cost and many months of incorporation.',
  'Hire employees in Poland in 2–3 days with full ZUS, tax, and Labour Code (Kodeks pracy) compliance.',
  'Jackson & Frank handles payroll, PIT withholdings, ZUS declarations, NFZ health contributions, and PPK where applicable.',
  'Local Polish employment contracts (umowa o pracę) and statutory benefits included.',
  'Work permit and residence support (oświadczenie, type A permit, EU Blue Card where eligible) for non-EU talent.',
  'Single provider for multiple countries if you expand beyond Poland.',
]

const eorCons = [
  'Ongoing monthly cost per employee vs. long-term lower cost with your own entity at scale.',
  'You depend on the EOR for compliance choose a licensed provider like Jackson & Frank.',
  'Collective agreements and sector rules may apply; we help you navigate them.',
]

const eorBenefits = [
  'No local entity required save cost and long incorporation timelines',
  'Full compliance with the Labour Code (Kodeks pracy) and ZUS/NFZ',
  'Local employment contracts and payroll from day one',
  'Work permit and residence support',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written employment contract (umowa o pracę) required', 'Probation (okres próbny): typically up to 3 months (longer limits apply in specific cases per Kodeks pracy)', 'Fixed-term rules and limits must be observed'],
  },
  {
    title: 'Notice & termination',
    items: ['Notice (wypowiedzenie): e.g. 2 weeks if tenure under 6 months; 1 month if 6 months–3 years; 3 months if 3+ years (standard indefinite contracts)', 'Strict rules for termination without notice (rozwiązanie bez wypowiedzenia)', 'Documentation and process requirements under Polish law'],
  },
  {
    title: 'Pay & leave',
    items: ['National minimum wage set annually in PLN (gross/month)', 'Annual leave (urlop wypoczynkowy): 20 or 26 days depending on length of service', 'Working time, overtime, and night work rules under the Labour Code'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'Polish entity & ZUS', jf: 'Own Polish entity', others: 'Varies' },
  { feature: 'Dedicated Poland support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Work permit / residence support', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, ZUS contributions, health insurance (NFZ via ZUS), PIT withholdings, payslips (pasek wypłaty), year-end, PPK administration where applicable.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract management, amendments, leave, and local HR queries under Polish practice.', icon: Users },
  { title: 'Benefits', desc: 'ZUS, NFZ coverage, statutory sick pay coordination, PPK, and benefits aligned to your policy.', icon: Shield },
  { title: 'Contracts', desc: 'Polish-compliant employment contracts (umowa o pracę) and addendums per Kodeks pracy.', icon: FileCheck },
  { title: 'Compliance', desc: 'Labour Inspectorate (PIP) readiness, ZUS filings, tax office (Urząd Skarbowy), and employment law.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer.' },
  { day: 'Day 2', title: 'Contract & onboarding', desc: 'We issue the Polish contract (umowa o pracę); employee signs. We register with ZUS, set up tax identifiers, and complete mandatory notifications.' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is onboarded and included in the next payroll run.' },
]

const payrollHandles = [
  'Personal income tax (PIT) withholdings and annual reconciliations where applicable',
  'ZUS social security: retirement, disability, accident, sickness, and labour fund',
  'Health insurance contribution financing NFZ coverage',
  'PPK (Pracownicze Plany Kapitałowe) contributions for eligible employers',
  'Payslips and reporting to authorities',
  'Minimum wage and working time compliance checks',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage Polish employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and export for finance.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: 'Several months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (incorporation, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR holds risk', entity: 'You hold full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local provider' },
]

const startupUseCases = [
  'First hires in the EU without a Polish sp. z o.o.',
  'Testing the market with a small team in Warsaw, Kraków, or Wrocław',
  'Remote-first teams with Polish engineering and operations talent',
]

const enterpriseUseCases = [
  'Scaling Polish teams without new entities',
  'M&A or project-based hiring in Poland',
  'Centralized global EOR with strong Polish compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage', value: 'PLN gross/month (annual update)' },
  { label: 'Statutory annual leave', value: '20 or 26 days' },
  { label: 'PPK', value: 'For eligible employers' },
]

export default function PolandPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-poland.webp"
            alt="Poland Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">Poland</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire employees in Poland without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Poland: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=eor_services"
              >
                Hire in Poland
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
            Poland at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-8 leading-relaxed">
            Poland is Central Europe&apos;s largest economy and a major hub for IT, shared services, manufacturing, and logistics. EU membership, competitive talent, and a clear Labour Code (Kodeks pracy) make it a strong choice for Employer of Record and Poland payroll outsourcing.
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
            title="What is Employer of Record (EOR) in Poland?"
            description="Employer of Record Poland lets you hire Polish employees without setting up a local entity (sp. z o.o./S.A.). We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in Poland without entity setup."
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
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs Poland EOR?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  US, UK, EU, and global companies hiring in Poland; startups and scaleups building nearshore teams; enterprises expanding without new entities; HR leaders who need fast, compliant hiring.
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
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why Poland?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Why Poland is an attractive option for hiring
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Poland offers a large, well-educated workforce, especially in software development, engineering, finance, and business services. Cities like Warsaw, Kraków, Wrocław, and Tri-City (Gdańsk–Gdynia–Sopot) host major tech and SSC/BPO hubs with strong English proficiency.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                As an EU member state, Poland aligns with European market access while maintaining competitive cost structures. The Labour Code (Kodeks pracy) sets clear rules on contracts, working time, leave, and termination. Social insurance through ZUS and health coverage via NFZ are well-defined, which supports predictable Poland payroll outsourcing and EOR operations.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Whether you need Poland payroll outsourcing, full EOR, or support for non-EU hires, Poland is a strategic location for scaling teams serving Western Europe and North America.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-center">
            Employee benefits in Poland
          </h2>
          <p className="text-base  text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            We manage mandatory contributions and benefits for your Polish employees through our Poland EOR and payroll platform, including ZUS, NFZ, statutory leave, and PPK where your organisation qualifies.
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
            title="Poland Employment Laws 2026: What Companies Must Know"
            description="Stay compliant with the Labour Code (Kodeks pracy). Key rules on contracts, probation, notice, minimum wage, and employee protections."
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
            Non-compliance can lead to fines, back ZUS, and disputes. With Poland EOR, Jackson & Frank helps your hires meet Polish employment laws 2026.
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and cons of Poland EOR"
            description="Weigh the benefits and considerations of using an Employer of Record in Poland versus setting up your own entity."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros of Poland EOR
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
            title="Why Choose Jackson & Frank for Poland EOR?"
            description="Speed, compliance, and local expertise so you can focus on growing your team."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
              { icon: Scale, title: 'Full compliance', desc: 'Polish entity, ZUS/NFZ, PPK where applicable, and Labour Code compliance built in.' },
              { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of Polish payroll, benefits, and HR practice.' },
              { icon: Shield, title: 'Risk managed', desc: 'We carry employment and payroll compliance risk as the legal employer in Poland.' },
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
            title="Jackson & Frank vs Other Poland EOR Providers"
            description="Compare speed, compliance, support, and pricing. We focus on European markets with a strong Poland footprint."
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
            title="Our Complete Poland Employment Services"
            description="End-to-end employment and payroll so you can hire and manage Polish talent without a local entity."
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
            title="Poland EOR + Immigration Services"
            description="Work permits and residence support so you can hire non-EU talent in Poland."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Statements & work permits</h3>
              <p className="text-gray-600 text-base!">
                Depending on nationality and role, work may start with an employer statement (oświadczenie o powierzeniu wykonywania pracy) registered with the labour office, or require a work permit (e.g. type A) or EU Blue Card. We coordinate documentation and timelines with the relevant labour office and voivodeship (urząd wojewódzki).
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Temporary residence & work</h3>
              <p className="text-gray-600 text-base!">
                Non-EU nationals typically need a temporary residence permit with work rights (single permit / combined procedures where applicable). We support applications and employer obligations so your hire can work legally.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-primary text-lg! sm:text-xl! mb-2">Relocation support</h3>
              <p className="text-gray-600 text-base!">
                From PESEL/NIP registration, ZUS onboarding, and first payslip to practical checklists: we help new hires start smoothly in Poland.
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Our Poland EOR Process Works (2–3 Days)"
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

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Poland Payroll: What We Handle"
            description="Full payroll and ZUS compliance so you don't have to manage Polish regulations alone."
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
            description="Manage your Poland team from one place."
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
            description="We keep your Poland hiring legally sound and audit-ready."
            align="left"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Legal compliance', desc: 'Labour Code (Kodeks pracy), working time, leave, ZUS, NFZ, PIT, and PPK where applicable.' },
              { title: 'Risk mitigation', desc: 'Correct contracts, registrations, and filings to reduce fines and back contributions.' },
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="EOR vs Entity Setup in Poland"
            description="Decide whether Poland EOR or a Polish sp. z o.o./S.A. is right for you."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-w-3xl mx-auto">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 font-semibold text-primary">Poland EOR</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Polish entity (sp. z o.o./S.A.)</th>
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
            description="Whether you're a startup or enterprise, Poland EOR fits your use case."
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
            title="Contractor Management in Poland"
            description="Avoid misclassification and stay compliant when engaging Polish contractors (B2B / civil contracts)."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              Polish law scrutinises relationships that look like employment. Misclassification can trigger back ZUS, taxes, and penalties. We help you:
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Assess contractor vs employee status for umowa zlecenia, umowa o dzieło, and B2B (JDG) setups.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Use compliant contracts and documentation for genuine independent engagements.
              </li>
              <li className="flex items-start text-base gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                Convert contractors to employees via Poland EOR when a permanent role is the better fit.
              </li>
            </ul>
            <p className="mt-6 text-base!">
              <Link href="/poland-contractor" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Poland contractor solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            Our comprehensive guide to hiring in Poland
          </h2>
          <p className="text-base  text-gray-600 text-left mb-8 leading-relaxed max-w-4xl">
            Explore leave, termination, public holidays, onboarding, and immigration. Everything you need for Polish employment laws 2026 and Poland payroll outsourcing.
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
                  {tab === 'additional' && 'Work Permits & Residence'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            {activeTab === 'leave' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Annual leave (urlop wypoczynkowy)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Employees are entitled to 20 working days per year if they have been employed for less than 10 years (counted under Polish rules, including certain education periods). After reaching 10 years of service, entitlement increases to 26 working days per year. Leave accrues during employment and should be planned with the employer. Unused leave may need to be granted or paid out on termination in line with the Labour Code. Our Poland EOR administers leave in line with Polish employment laws 2026.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Maternity leave (urlop macierzyński)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Maternity leave lengths depend on the number of children born in a delivery (e.g. 20 weeks for one child, longer for multiple births). Benefits are coordinated with social insurance (ZUS). Additional parental leave (urlop rodzicielski) may follow. We support HR administration and compliance for your Polish employees.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Paternity leave (urlop ojcowski)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Fathers are entitled to paternity leave (typically up to 2 weeks) around the birth, with rules and benefit coordination set under Polish law and ZUS practice.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Parental leave (urlop rodzicielski)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Parental leave allows parents to care for a child after maternity leave, with lengths and benefit levels defined in legislation. Parents can often combine or transfer parts of leave within legal limits.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Sick leave (zwolnienie lekarskie)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    For incapacity to work due to illness, the employer generally finances sick pay for a defined initial period (e.g. 33 days in a calendar year, or 14 days for employees aged 50+), after which sickness benefit may be paid from ZUS if conditions are met. Employees obtain electronic medical certificates (e-ZLA). Poland payroll outsourcing through Jackson & Frank includes coordination of sick pay and reporting in line with applicable rules.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Termination requirements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Termination of an employment contract (umowa o pracę) must follow the Labour Code. Employers typically terminate with notice (wypowiedzenie) or, in strictly defined cases, without notice (rozwiązanie bez wypowiedzenia) for cause. Fixed-term contracts expire or may be terminated only where the law allows. Wrongful termination can lead to claims for reinstatement or compensation. As your Employer of Record Poland, we apply compliant processes and documentation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Notice period (wypowiedzenie)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                    For indefinite contracts, statutory notice periods for employer or employee termination with notice include:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>2 weeks if employed under 6 months</li>
                    <li>1 month if employed at least 6 months but under 3 years</li>
                    <li>3 months if employed 3 years or more</li>
                  </ul>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">
                    Collective agreements or individual contracts may specify different rules only where they improve employee terms or otherwise comply with law.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Severance and settlements</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Poland does not use a single &quot;TFR-style&quot; mandatory severance for all employees, but severance pay may apply in specific situations (e.g. collective redundancies or certain group dismissals). Final pay, unused holiday, and any statutory payments are settled on termination. Jackson & Frank handles payroll aspects of leavers in line with Polish employment laws 2026.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'holidays' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Public holidays in Poland 2026</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  The following are national public holidays. Most are non-working days for employees under standard employment rules.
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
                    With Jackson & Frank Poland EOR, onboarding typically takes 2–3 business days. We prepare the employment contract (umowa o pracę), complete ZUS registration as the employer, set up tax reporting, and ensure mandatory notifications (e.g. to labour authorities where required) before or on start date. You provide candidate details and the commercial agreement; we employ legally in Poland without your sp. z o.o.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Salary and contributions</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Salaries must meet at least the national minimum wage (updated annually in PLN gross per month for full-time). Employers withhold personal income tax (PIT) and remit ZUS contributions (retirement, disability, accident, sickness, labour fund, and health contribution for NFZ). PPK applies to eligible employers. Payslips must reflect gross, deductions, and net pay. Our Poland payroll outsourcing covers calculations and filings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Employment contract essentials</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">Polish employment contracts should define:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600">
                    <li>Parties and workplace</li>
                    <li>Type of contract and start date</li>
                    <li>Job title or duties</li>
                    <li>Remuneration and payment date</li>
                    <li>Working hours (e.g. full-time / part-time)</li>
                    <li>Probation period (okres próbny) if any</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Probation (okres próbny)</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    The Labour Code limits probation length depending on contract type and duration (commonly up to 3 months, with extensions possible only in specific cases). During probation, termination rules differ from those after probation. We draft compliant clauses as part of our Employer of Record Poland service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Work permits and residence in Poland</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  EU/EEA and Swiss nationals generally work without a Polish work permit, subject to registration rules where applicable. Non-EU nationals usually need a legal basis to work: e.g. employer statement registered with the labour office, work permit (such as type A), EU Blue Card for highly qualified employment, or a temporary residence permit authorising work. Procedures involve the starosta (district labour authority) and voivodeship office (urząd wojewódzki) for residence. Jackson & Frank coordinates with your hire timeline as employer of record.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our team supports document checklists, employer obligations, and handover to payroll once work authorisation is in place so you can hire in Warsaw, Kraków, Wrocław, and beyond with fewer immigration surprises.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Button size="lg" aria-label="Learn more about Poland contractor services" className="bg-primary hover:bg-primary/90 text-white" href="/poland-contractor">
              Learn more about Poland contractor solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Poland Employment Statistics 2026"
            description="Planning benchmarks for your Polish team."
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
            Poland remains a top nearshore destination for tech and business services. Poland EOR helps you hire quickly while staying aligned with Polish employment laws 2026 and ZUS/NFZ obligations.
          </p>
        </div>
      </section>

      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Poland EOR experts"
        contactHref="/contact?reason=eor_services"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
