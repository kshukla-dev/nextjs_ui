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
import indiaContractorData from '@/data/india-contractor.json'

const data = indiaContractorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Indian compliant contracts', icon: Scale },
  { label: 'Fast onboarding', icon: Zap },
  { label: 'Classification support', icon: Shield },
]

const contractorBenefits = [
  'Compliant contractor agreements under Indian law',
  'Avoid misclassification risk and EPF/ESI reclassification',
  'Payroll and invoicing handled in one platform with GST and TDS compliance',
  'Convert contractors to employees via EOR when needed',
]

const contractorServices = [
  { title: 'Contractor onboarding', desc: 'Fast, compliant onboarding with Indian-law contracts, GST registration, and tax document collection (PAN, Aadhaar).', icon: Users },
  { title: 'Classification support', desc: 'Assess contractor vs employee status to avoid false self-employment and EPF/ESI reclassification risk.', icon: Scale },
  { title: 'Contract management', desc: 'Agreements reviewed by Indian legal experts, updated for local regulations (GST, TDS, labor laws).', icon: FileText },
  { title: 'Payroll & invoicing', desc: 'Pay contractors in INR, handle invoices, GST documentation, and TDS compliance.', icon: FileCheck },
  { title: 'Compliance monitoring', desc: 'Ongoing checks to ensure contractors remain compliant with Indian rules (GST, TDS, EPF/ESI).', icon: Shield },
  { title: 'EOR conversion', desc: 'Convert contractors to full employees via our India EOR when roles become permanent.', icon: Briefcase },
]

const contractorPros = [
  'No Indian entity (Private Limited/LLP) required engage contractors compliantly.',
  'Fast onboarding: contracts, GST registration, and tax forms handled in days, not weeks.',
  'Reduce misclassification risk with expert classification assessment.',
  'Single platform for contractor payments, invoicing, GST, and TDS compliance.',
  'Seamless conversion to EOR if you need to hire contractors as employees.',
  'Local Indian expertise contracts aligned with EPF/ESI and GST requirements.',
]

const contractorCons = [
  'Contractor relationships have limits some roles require full employment.',
  'Indian authorities enforce strict classification rules; we help you stay compliant.',
  'If converting to EOR, additional onboarding steps and costs apply.',
]

const compliancePoints = [
  {
    title: 'Avoid misclassification',
    desc: 'Indian law is strict on contractor vs employee distinction. We assess each engagement to ensure genuine contractor status and avoid EPF/ESI reclassification, which can lead to back contributions and penalties.',
  },
  {
    title: 'GST and TDS compliance',
    desc: 'Contractors may need GST registration if annual turnover exceeds ₹20 lakhs. TDS (Tax Deducted at Source) applies to contractor payments at specified rates. We help ensure all GST and TDS obligations are met.',
  },
  {
    title: 'Ongoing compliance',
    desc: 'Regulations change. We monitor Indian contractor and employment law and update contracts as needed to stay compliant with EPF/ESI, GST, and TDS requirements.',
  },
]

export default function IndiaContractorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/countries/eor-india.webp"
            alt="India Contractor Employer of Record"
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
                Hire in <span className="text-[#f7931e] relative">India</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire contractors in India without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record India: compliant payroll, local contracts, fast payments. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=contractor_management"
              >
                Hire in India
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

      {/* What is Contractor Management */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Contractor Management in India?"
            description="Engage independent contractors in India without setting up a local entity. We handle contracts, GST, TDS, invoicing, and compliance so you can work with Indian freelancers and consultants legally and efficiently."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-gray-50 border border-gray-200 p-8">
            <p className="text-gray-600 text-base! mb-4">
              Indian contractor management lets you engage freelancers, consultants, and independent contractors in India without opening a Private Limited/LLP. We provide:
            </p>
            <ul className="space-y-2 text-gray-600 text-base!">
              {contractorBenefits.map((b) => (
                <li key={b} className="flex items-start text-base gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contractor Classification */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Navigating Contractor Classification in India"
            description="Indian authorities are strict on contractor vs employee classification. Misclassification can lead to back EPF/ESI contributions, TDS penalties, and reclassification. We help you assess each engagement and use compliant structures."
            align="left"
          />
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold text-gray-900 text-lg! sm:text-xl! mb-2">The misclassification risk</h3>
              <p className="text-gray-600 text-base!">
                If Indian authorities determine a contractor is actually an employee, you may face back EPF (Employee Provident Fund) and ESI (Employee State Insurance) contributions, TDS penalties, and reclassification. We assess each engagement to ensure genuine contractor status and reduce this risk.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-6">
              <CheckCircle2 className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 text-lg! sm:text-xl! mb-2">How we help</h3>
              <p className="text-gray-600 text-base!">
                Our team reviews contractor relationships against Indian labor law criteria (control, exclusivity, tools, risk). We provide compliant contracts, GST/TDS guidance, and ongoing monitoring to keep your engagements legally sound.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seamless Onboarding */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/countries/contractors/effortlescontract.webp"
                alt="Effortless Contractor Onboarding in India"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
                Seamless Contractor Onboarding in India
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                Onboard Indian contractors in days, not weeks. We handle contracts, GST registration (if needed), tax document collection (PAN, Aadhaar), and invoicing setup. Everything in one platform.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Our Indian legal experts review contracts to ensure compliance with local regulations, GST, TDS, and employment law. You focus on the work; we handle the paperwork and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Compliance */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
                Legal Compliance with Indian Regulations
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                Our contracts are reviewed by Indian legal experts to align with local laws, including GST registration requirements, TDS obligations, EPF/ESI classification, and labor law compliance. We stay up to date with Indian regulations so you don&apos;t have to.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Stay confident with accurate, compliant contractor agreements that reduce misclassification risk and ensure proper GST and TDS handling for your Indian contractors.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/countries/contractors/ensuringcomplilance.webp"
                alt="Legal Compliance in India"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payroll Funding */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/countries/contractors/effortlesspayroll.webp"
                alt="Effortless Payroll Funding in India"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
                Effortless Contractor Payments in India
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                Pay Indian contractors in INR with proper GST documentation and TDS compliance. Initiate mass payouts using your preferred payment method. Contractors receive payments with correct invoicing and tax documentation.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Our platform handles invoicing, GST compliance, TDS deductions, and payment processing so you can focus on the work. Experience seamless financial transactions for your Indian contractor team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contractor Management */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Use Contractor Management in India?"
            description="Engage Indian talent flexibly while staying compliant with GST, TDS, and classification rules."
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {contractorServices.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="rounded-xl border border-gray-200 p-6 bg-white">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg! sm:text-xl! mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-base!">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pros and Cons of Contractor Management in India"
            description="Weigh the benefits and considerations of engaging Indian contractors versus hiring employees."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Pros
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                {contractorPros.map((item) => (
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
                {contractorCons.map((item) => (
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

      {/* Compliance */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Compliance: GST, TDS, and Classification"
            description="Stay compliant with Indian contractor regulations to avoid penalties and reclassification."
            align="left"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {compliancePoints.map((point) => (
              <div key={point.title} className="rounded-xl bg-white border border-gray-200 p-6">
                <Scale className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-gray-900 text-lg! sm:text-xl! mb-2">{point.title}</h3>
                <p className="text-gray-600 text-base!">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our India contractor experts"
        contactHref="/contact?reason=contractor_management"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />

      {/* CTA */}
      <section className="eor-section md:py-12 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Ready to streamline contractor management in India?
          </h2>
          <p className="text-base lg:text-lg text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of companies who trust Jackson & Frank for compliant contractor onboarding and management in India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" aria-label="Get started today" className="bg-white text-[hsl(225,48%,45%)] hover:bg-gray-100" href="/contact?reason=contractor_management#contact-form">
              Get started today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" href="/contact?reason=contractor_management">
              Talk to an expert
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
