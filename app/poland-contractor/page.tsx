'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  MinusCircle,
  Scale,
  Shield,
  Users,
  Zap,
  FileText,
  Briefcase,
  AlertTriangle,
  FileCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import FAQSection from '@/components/templates/FAQSection'
import polandContractorData from '@/data/poland-contractor.json'

const data = polandContractorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Polish compliant contracts', icon: Scale },
  { label: 'Fast onboarding', icon: Zap },
  { label: 'Classification support', icon: Shield },
]

const contractorBenefits = [
  'Compliant contractor agreements under Polish law',
  'Reduce misclassification and disguised employment risk',
  'Payroll and invoicing handled in one platform',
  'Convert contractors to employees via EOR when needed',
]

const contractorServices = [
  { title: 'Contractor onboarding', desc: 'Fast onboarding with Polish-law contracts and tax identifiers (PESEL/NIP, VAT where relevant).', icon: Users },
  { title: 'Classification support', desc: 'Assess employee vs contractor status for umowa zlecenia, umowa o dzieło, and B2B (JDG) to limit ZUS risk.', icon: Scale },
  { title: 'Contract management', desc: 'Agreements aligned with Polish regulations and sector practice, updated when rules change.', icon: FileText },
  { title: 'Payroll & invoicing', desc: 'Pay contractors in PLN (and other currencies where agreed) with correct invoicing and documentation.', icon: FileCheck },
  { title: 'Compliance monitoring', desc: 'Ongoing checks so engagements stay compliant with Polish labour and tax rules.', icon: Shield },
  { title: 'EOR conversion', desc: 'Convert contractors to full employees via our Poland EOR with umowa o pracę and ZUS.', icon: Briefcase },
]

const contractorPros = [
  'No Polish entity (sp. z o.o.) required to engage many contractor models compliantly.',
  'Fast onboarding: contracts and tax documentation handled in days, not weeks.',
  'Reduce misclassification risk with structured classification support.',
  'Single platform for contractor payments, invoicing, and compliance tracking.',
  'Seamless conversion to EOR if you need employees instead of contractors.',
  'Local Polish expertise: Kodeks pracy boundaries, ZUS, and VAT context.',
]

const contractorCons = [
  'Some roles must be employment only contractor models have legal limits.',
  'Polish authorities enforce strict rules on disguised employment; we help you stay compliant.',
  'EOR conversion adds onboarding steps and employer costs.',
]

const compliancePoints = [
  {
    title: 'Avoid disguised employment',
    desc: 'Poland tests substance over label. We review supervision, exclusivity, and integration to reduce reclassification as umowa o pracę.',
  },
  {
    title: 'Collective & sector norms',
    desc: 'Industry practice and collective agreements can influence how engagements are viewed. We factor this into setup.',
  },
  {
    title: 'Ongoing compliance',
    desc: 'Labour and tax rules evolve. We monitor changes and help you refresh contracts and processes.',
  },
]

export default function PolandContractorPage() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-poland.webp"
            alt="Poland Contractor Employer of Record"
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
              Hire contractors in Poland without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record Poland: compliant payroll, local contracts, fast payments. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=contractor_management"
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

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Contractor Management in Poland?"
            description="Contractor management helps you engage freelancers, sole traders (jednoosobowa działalność gospodarcza), and civil-contract workers under Polish law without opening a local entity or risking disguised employment and ZUS liability."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mt-10 items-stretch">
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[220px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Who needs it?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Companies hiring consultants, developers, or project specialists in Poland without a sp. z o.o. Ideal for IT, SSC/BPO, engineering, and professional services in Warsaw, Kraków, Wrocław, and Tri-City.
                </p>
              </div>
            </div>
            <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300 text-left overflow-hidden relative min-h-[220px]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">Benefits</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  {contractorBenefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-center mt-8 w-full ">
            <Link href="/poland" className="text-primary font-medium hover:underline inline-flex items-center gap-1 ">
              Need to hire employees instead? See Poland EOR <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="eor-section lg:py-16  relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Contractor Classification</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>

            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Mastering Contractor Classification for Business Expansion in Poland
            </h2>

            <div className="space-y-4">
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Growing in Poland means getting classification right. Authorities look at how work is performed, not only the contract title.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Jackson & Frank provides practical guidance for the Polish market so you can scale with fewer compliance surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-linear-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl overflow-hidden ">
              <Image
                src="/countries/contractors/effortlescontract.webp"
                alt="Seamless Contractor Onboarding in Poland"
                title="Seamless Contractor Onboarding"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl sm:text-4xl  font-bold text-primary mb-5 leading-tight">
                Seamless Contractor Onboarding in Poland with Jackson and Frank
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Onboard independent contractors and B2B partners with structured workflows. Collect contracts, identifiers, and VAT evidence where needed.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Our platform supports compliant documentation and payouts so you can focus on delivery not admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-primary mb-5 leading-tight">
                Upholding Compliance with Polish Legal Standards at Jackson and Frank
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Contracts are reviewed for alignment with Polish labour boundaries, taxation, and common sector expectations including working time, exclusivity, and substitution clauses where relevant.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Stay confident with documentation that reflects how your engagements actually operate.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden ">
              <Image
                src="/countries/contractors/ensuringcomplilance.webp"
                alt="Legal Compliance in Poland"
                title="Legal Compliance"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-linear-to-br from-slate-50 via-blue-50 to-emerald-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl overflow-hidden ">
              <Image
                src="/countries/contractors/effortlesspayroll.webp"
                alt="Payroll Funding in Poland"
                title="Payroll Funding"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl sm:text-4xl  font-bold text-primary mb-5 leading-tight">
                Streamlined Payroll Funding in Poland with Jackson and Frank
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Initiate payouts in PLN and other currencies where agreed, with clear approval flows for your finance team.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Contractors receive timely payments with the documentation they need for their books and tax filings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why contractor management?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title text-3xl sm:text-4xl  font-bold text-primary mb-5 leading-tight">
              Why use contractor management in Poland?
            </h2>
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Poland actively challenges disguised employment. If a relationship looks like subordination and fixed schedules like employment, authorities may seek ZUS and tax reassessment.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Jackson & Frank helps you structure genuine contractor and B2B relationships, maintain documentation, and monitor risk. When you need full employment, we convert to Poland EOR with umowa o pracę, ZUS, and statutory benefits.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                That flexibility supports fast market entry without unnecessary entity setup while keeping compliance on solid ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Poland Contractor Services"
            description="End-to-end contractor management so you can engage freelancers and B2B partners compliantly."
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
            {contractorServices.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col hover:border-primary/25 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 ">{s.title}</h3>
                  <p className="text-gray-600 flex-1 text-base">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and considerations of Poland contractor management"
            description="Weigh the benefits and considerations before engaging contractors in Poland."
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-7xl mx-auto">
            <div className="rounded-2xl border-2 border-green-200 bg-green-50/30 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                {contractorPros.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base  ">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-1 " />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MinusCircle className="w-5 h-5 text-amber-600" />
                Considerations
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                {contractorCons.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base">
                    <MinusCircle className="w-5 h-5 text-amber-600 shrink-0 mt-1 " />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Polish Contractor Compliance"
            description="Staying compliant with Polish contractor and employment law protects your business from penalties and disputes."
            align="center"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto">
            {compliancePoints.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white border border-gray-200 p-6 text-center hover:border-primary/25 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 mb-4">Need to hire full employees in Poland?</p>
            <Button size="lg" aria-label="Learn more about Poland EOR services" className="bg-primary hover:bg-primary/90 text-white" href="/poland">
              Learn more about Poland EOR
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Poland contractor experts"
        contactHref="/contact?reason=contractor_management"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
