'use client'

import { SectionTitle } from '@/components/ui/SectionTitle'
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

import FAQSection from '@/components/templates/FAQSection'
import netherlandsContractorData from '@/data/netherlands-contractor.json'

const data = netherlandsContractorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Dutch compliant contracts', icon: Scale },
  { label: 'Fast onboarding', icon: Zap },
  { label: 'Classification support', icon: Shield },
]

const contractorBenefits = [
  'Compliant contractor agreements under Dutch law',
  'Avoid misclassification risk (schijnzelfstandigheid)',
  'Payroll and invoicing handled in one platform',
  'Convert contractors to employees via EOR when needed',
]

const contractorServices = [
  { title: 'Contractor onboarding', desc: 'Fast, compliant onboarding with Dutch-law contracts and tax document collection.', icon: Users },
  { title: 'Classification support', desc: 'Assess contractor vs employee status to avoid false self-employment penalties.', icon: Scale },
  { title: 'Contract management', desc: 'Agreements reviewed by Dutch legal experts, updated for local regulations.', icon: FileText },
  { title: 'Payroll & invoicing', desc: 'Pay contractors in EUR or local currency, handle invoices and tax filings.', icon: FileCheck },
  { title: 'Compliance monitoring', desc: 'Ongoing checks to ensure contractors remain compliant with Dutch rules.', icon: Shield },
  { title: 'EOR conversion', desc: 'Convert contractors to full employees via our Netherlands EOR when roles become permanent.', icon: Briefcase },
]

const contractorPros = [
  'No Dutch entity required engage contractors compliantly without a BV.',
  'Fast onboarding: contracts and tax forms handled in days, not weeks.',
  'Reduce misclassification risk with expert classification assessment.',
  'Single platform for contractor payments, invoicing, and compliance.',
  'Seamless conversion to EOR if you need to hire contractors as employees.',
  'Local Dutch expertise contracts reviewed by Dutch legal professionals.',
]

const contractorCons = [
  'Contractor relationships have limits some roles require full employment.',
  'Dutch tax authority (Belastingdienst) enforces strict classification rules; we help you stay compliant.',
  'If converting to EOR, additional onboarding steps and costs apply.',
]

const compliancePoints = [
  {
    title: 'Avoid schijnzelfstandigheid',
    desc: 'Dutch law is strict on false self-employment. We assess each engagement to ensure genuine contractor status.',
  },
  {
    title: 'Modelovereenkomst support',
    desc: 'We help you use approved model agreements recognized by the Dutch tax authority.',
  },
  {
    title: 'Ongoing compliance',
    desc: 'Regulations change. We monitor Dutch contractor law and update contracts as needed.',
  },
]

export default function NetherlandsContractorPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-bg-wrapper">
          <Image
            src="/countries/eor-netherlands.webp"
            alt="Netherlands Contractor Employer of Record"
            fill
            className="hero-bg-img"
            priority
            sizes="100vw"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="center-align">
            <div className="mb-6 sm:mb-8">
              <h1 className="hero-title">
                Hire in <span>Netherlands</span>
              </h1>
            </div>

            <p className="hero-subtitle">
              Hire contractors in Netherlands without opening an entity.
            </p>
            <p className="hero-desc">
              Employer of Record Netherlands: compliant payroll, local contracts, fast payments. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="center-btn-wrapper">
              <Link className="btn-outline"
                href="/contact?reason=contractor_management"
              >
                Hire in Netherlands
              </Link>
            </div>

            <div className="trust-badges">
              {trustBadges.map((b) => {
                const Icon = b.icon
                return (
                  <span
                    key={b.label}
                    className="badge"
                  >
                    <Icon className="badge-icon" />
                    {b.label}
                  </span>
                )
              }) || null}
            </div>
          </div>
        </div>

        
      </section>

      {/* What is Contractor Management */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What is Contractor Management in the Netherlands?"
            description="Contractor management helps you engage freelancers and independent contractors compliantly under Dutch law without the complexity of setting up an entity or risking misclassification."
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
                  Companies hiring freelancers, consultants, or project-based contractors in the Netherlands without a local entity. Ideal for tech, consulting, and creative industries.
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
            <Link href="/netherlands" className="text-primary font-medium hover:underline inline-flex items-center gap-1 ">
              Need to hire employees instead? See Netherlands EOR <ArrowRight className="check-icon" />
            </Link>
          </p>
        </div>
      </section>


      {/* Contractor Classification Section */}
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
              Mastering Contractor Classification for Business Expansion in the Netherlands
            </h2>
            
            <div >
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Unleash your business potential in the Netherlands with strategic hiring. Learn the intricacies of classifying independent contractors to sidestep fines and penalties.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Jackson and Frank provide expert guidance tailored to the Dutch classification landscape, ensuring compliance and success in this dynamic market.
              </p>
            </div>
          </div>
        </div>
      </section>

    

      {/* Seamless Onboarding Section */}
      <section className="eor-section lg:py-24 bg-linear-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl overflow-hidden ">
              <Image
                src="/countries/contractors/effortlescontract.webp"
                alt="Seamless Contractor Onboarding in the Netherlands"
                title="Seamless Contractor Onboarding"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl sm:text-4xl  font-bold text-primary mb-5 leading-tight">
                Seamless Contractor Onboarding in the Netherlands with Jackson and Frank
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Simplify the onboarding of independent contractors in the Netherlands using your Jackson and Frank account. Achieve compliance with local regulations in minutes.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Our platform handles everything, from personalized contracts to effortless tax document collection, extending to streamlined international payroll. Make contractor onboarding a breeze for success in the Dutch market with Jackson and Frank.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Compliance Section */}
      <section className="eor-section lg:py-24 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-primary mb-5 leading-tight">
                Upholding Compliance with the Netherlands&apos; Premier Legal Firms at Jackson and Frank
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Trust Jackson and Frank in the Netherlands to ensure compliance with the expertise of the country&apos;s top legal firms. Our contracts undergo meticulous review, aligning with local laws, covering essentials such as minimum wage, national holidays, and termination conditions.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Stay confident with accurate and up-to-date information for seamless operations in the Dutch business landscape.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden ">
              <Image
                src="/countries/contractors/ensuringcomplilance.webp"
                alt="Legal Compliance in Netherlands"
                title="Legal Compliance"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payroll Funding Section */}
      <section className="eor-section lg:py-24 bg-linear-to-br from-slate-50 via-blue-50 to-emerald-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl overflow-hidden ">
              <Image
                src="/countries/contractors/effortlesspayroll.webp"
                alt="Payroll Funding in Netherlands"
                title="Payroll Funding"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl sm:text-4xl  font-bold text-primary mb-5 leading-tight">
                Streamlined Payroll Funding in the Netherlands - One Click Away with Jackson and Frank
              </h2>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed mb-6">
                Simplify your payroll process in the Netherlands with Jackson and Frank. Effortlessly initiate mass payouts in various currencies using your preferred payment method.
              </p>
              <p className="text-sm sm:text-base  text-gray-600 leading-relaxed">
                Team members can conveniently withdraw funds with their chosen payment methods, saving on currency conversions and wire transfer fees. Experience a seamless financial transaction solution tailored for success in the Dutch market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Netherlands contractor management */}
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
              Why use contractor management in the Netherlands?
            </h2>
            <div >
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                The Netherlands has strict rules on contractor classification. The Dutch tax authority (Belastingdienst) actively enforces rules against &quot;schijnzelfstandigheid&quot; (false self-employment). Misclassifying an employee as a contractor can lead to back taxes, social security liabilities, and penalties.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Using a contractor management solution like Jackson & Frank helps you engage contractors compliantly: we assess classification, provide Dutch-law contracts (including modelovereenkomsten), handle payroll and invoicing, and monitor ongoing compliance. If a role becomes permanent, we can convert contractors to employees via our Netherlands EOR.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                This protects your business, keeps contractors happy with proper agreements and timely payments, and gives you flexibility to scale your Dutch workforce without setting up a local entity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Services */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Netherlands Contractor Services"
            description="End-to-end contractor management so you can engage freelancers and independent contractors compliantly."
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
            {contractorServices.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col hover:border-primary/25 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="globe-icon" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 ">{s.title}</h3>
                  <p className="text-gray-600 flex-1 text-base">{s.desc}</p>
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
            title="Pros and considerations of Netherlands contractor management"
            description="Weigh the benefits and considerations before engaging contractors in the Netherlands."
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-5xl mx-auto">
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

      {/* Compliance Section */}
      <section className="eor-section lg:py-24 bg-gray-50">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Dutch Contractor Compliance"
            description="Staying compliant with Dutch contractor law protects your business from penalties and ensures genuine contractor relationships."
            align="center"
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
            {compliancePoints.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white border border-gray-200 p-6 text-center hover:border-primary/25 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="icon" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn more – EOR */}
      <section className="section">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 mb-4">Need to hire full employees in the Netherlands?</p>
            <Button size="lg" aria-label="Learn more about Netherlands EOR services" className="bg-primary hover:bg-primary/90 text-white" href="/netherlands">
              Learn more about Netherlands EOR
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            </div>
          </div>
      </section>

      {/* FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our Netherlands contractor experts"
        contactHref="/contact?reason=contractor_management"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />

     
    </>
  )
}
