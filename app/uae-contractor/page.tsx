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
import uaeContractorData from '@/data/uae-contractor.json'

const data = uaeContractorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'UAE work-authorisation aware', icon: Scale },
  { label: 'Freelance & B2B support', icon: Zap },
  { label: 'Misclassification checks', icon: Shield },
]

const contractorBenefits = [
  'Structure engagements around valid freelance permits or licences',
  'Reduce illegal work and falso autónomo-style exposure',
  'AED invoicing and payment workflows',
  'Move to UAE EOR when employment is the right model',
]

const contractorServices = [
  { title: 'Contractor onboarding', desc: 'KYC, trade licence or freelance permit checks, and service agreements for Dubai / UAE work.', icon: Users },
  { title: 'Classification support', desc: 'Assess supervision, exclusivity, and tools access that imply employment vs genuine services.', icon: Scale },
  { title: 'Contract management', desc: 'MSAs and SOWs aligned with UAE practice; optional Arabic/English bilingual drafts via counsel.', icon: FileText },
  { title: 'Payments', desc: 'Invoice approval and AED transfers with withholding documentation where applicable.', icon: FileCheck },
  { title: 'Compliance monitoring', desc: 'Watch for visa expiry, permit scope, and evolving MOHRE / free zone guidance.', icon: Shield },
  { title: 'EOR conversion', desc: 'Switch to employment visa, medical insurance, and WPS payroll through our UAE EOR.', icon: Briefcase },
]

const contractorPros = [
  'Pilot UAE demand before you incorporate.',
  'Engage specialists who already hold UAE freelance or company licences.',
  'Single workflow for invoices, approvals, and vendor records.',
  'Practical advice on mainland vs free zone freelance options.',
  'Less guesswork on whether someone can legally bill from the UAE.',
  'Seamless upgrade path to full EOR employment.',
]

const contractorCons = [
  'Visitors cannot replace work visas permits still matter.',
  'Long-term exclusive roles often belong on employment, not invoices.',
  'Free zone freelance packages have activity and quota limits.',
]

const compliancePoints = [
  {
    title: 'Work authorisation',
    desc: 'Performing work in the UAE generally requires a visa or permit that matches the activity not a tourist entry.',
  },
  {
    title: 'Dependent contractors',
    desc: 'If someone works full-time on your systems with your tools and reports only to you, authorities may treat them as employees.',
  },
  {
    title: 'WPS mismatch',
    desc: 'Paying “salary-like” amounts to personal accounts without employment can still attract scrutiny structure deliberately.',
  },
]

export default function UAEContractorPage() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-uae.webp"
            alt="UAE Contractor Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">UAE</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire contractors in UAE without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record UAE: compliant payroll, local contracts, fast payments. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=contractor_management"
              >
                Hire in UAE
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
            title="What is Contractor Management in the UAE?"
            description="Contractor management helps you pay and document genuine independent services while avoiding illegal work and employment misclassification. The UAE requires a legal basis (employment visa, freelance permit, or licensed company) for most onshore work."
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
                  Tech consultancies, agencies, and project teams hiring UAE-based autónomos or free zone freelancers; companies testing the market before opening an LLC.
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
            <Link href="/uae" className="text-primary font-medium hover:underline inline-flex items-center gap-1 ">
              Need employees instead? See UAE EOR <ArrowRight className="w-4 h-4" />
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
              Classification in the UAE: Permits, not just paperwork
            </h2>

            <div className="space-y-4">
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                MOHRE and free zone authorities care whether the person is truly independent or economically dependent on one client.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Jackson & Frank helps you document substance deliverables, substitution, equipment, and control before you scale contractor spend.
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
                alt="Contractor onboarding UAE"
                title="Contractor onboarding"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl sm:text-4xl  font-bold text-primary mb-5 leading-tight">
                Onboarding freelancers with the right permits
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Collect licence numbers, permit scope, bank details, and VAT/TRN where registered before first payment.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                We align your vendor setup with finance and compliance checkpoints.
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
                Contracts that reflect UAE reality
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Service agreements should spell governing law, place of work, deliverables, and liability especially when contractors access your UAE offices or systems.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                We coordinate with legal counsel for high-value or regulated sectors.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden ">
              <Image
                src="/countries/contractors/ensuringcomplilance.webp"
                alt="UAE compliance"
                title="Compliance"
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
                alt="Payments UAE"
                title="Payments"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl sm:text-4xl  font-bold text-primary mb-5 leading-tight">
                AED payments with clear audit trails
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Approve invoices, match purchase orders, and release funds with documentation your auditors expect.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Track withholding and VAT treatment where your policies require it.
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
              Why use contractor management in the UAE?
            </h2>
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                The UAE is not a “invoice-only” jurisdiction: work authorisation still applies. Contractor programmes add structure and evidence.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                When roles become permanent and integrated, switching to UAE EOR gives visas, insurance, WPS payroll, and EOS accrual in one compliant package.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our UAE Contractor Services"
            description="From permit checks to payment runs."
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
            title="Pros and considerations"
            description="Balance flexibility with enforcement reality."
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
                  <li key={item} className="flex items-start gap-2 text-base">
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
            title="UAE Contractor Compliance"
            description="Focus areas for HR and legal teams."
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
            <p className="text-gray-600 mb-4">Need full-time employees in the UAE?</p>
            <Button size="lg" aria-label="Learn more about UAE EOR" className="bg-primary hover:bg-primary/90 text-white" href="/uae">
              Learn more about UAE EOR
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
        contactLinkText="Contact our UAE contractor experts"
        contactHref="/contact?reason=contractor_management"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />
    </>
  )
}
