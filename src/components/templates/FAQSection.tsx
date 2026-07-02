'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'

export interface FAQItem {
  question: string
  answer: string
  /** Optional: slugs of related blog posts to show under the answer (used on FAQ page). */
  relatedBlogSlugs?: string[]
}

interface FAQSectionProps {
  readonly title: string
  readonly subtitle: string
  readonly items: readonly FAQItem[]
  /** Optional CTA link text (e.g. "Contact our EOR experts"). Default: "Contact us" */
  readonly contactLinkText?: string
  /** Optional CTA href. Default: "/contact" */
  readonly contactHref?: string
  /** Optional: link to full FAQ page (e.g. "/faq"). When set, shows "Browse all FAQs" in the section. */
  readonly faqPageHref?: string
  /** Optional label for FAQ page link. Default: "Browse all FAQs" */
  readonly faqPageLabel?: string
  /** Optional section id for anchor links */
  readonly id?: string
  /** Optional: render answer content with custom formatting (e.g. inline links) */
  readonly renderAnswer?: (answer: string) => React.ReactNode
  /** Title/header alignment. Default: "center" */
  readonly align?: 'center' | 'left'
  /** When true, removes outer section styling so it can sit inside an article column. Default: false */
  readonly embedded?: boolean
  /** When true, the contact link opens the global contact modal instead of navigating to contactHref. Default: false */
  readonly useContactModal?: boolean
}

export default function FAQSection({
  title,
  subtitle,
  items,
  contactLinkText = 'Contact us',
  contactHref = '/contact',
  faqPageHref,
  faqPageLabel = 'Browse all FAQs',
  id,
  renderAnswer,
  align = 'center',
  embedded = false,
  useContactModal = false,
}: FAQSectionProps) {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (useContactModal) {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('jf:open-contact-modal'))
    }
  }
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!items?.length) return null

  const isLeft = align === 'left'

  // Outer wrapper: <section> with full padding/background for default mode,
  // bare <div> for embedded mode (so it sits naturally inside an article column).
  const OuterTag = embedded ? 'div' : 'section'
  const outerClass = embedded
    ? 'relative my-8 scroll-mt-24'
    : 'py-20 lg:py-28 bg-white relative overflow-hidden scroll-mt-24'
  const innerClass = embedded
    ? 'relative z-10'
    : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'

  return (
    <OuterTag id={id} className={outerClass}>
      {/* Background Pattern — hidden in embedded mode */}
      {!embedded && (
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #143369 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      )}

      <div className={innerClass}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={isLeft ? 'mb-8' : 'text-center mb-12 lg:mb-16'}
        >
          {isLeft ? (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #143369 0%, #1a4a7a 100%)' }}
                >
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight m-0">
                  {title}
                </h2>
              </div>
              {subtitle && (
                <p className="text-base text-gray-600 leading-relaxed m-0">
                  {subtitle}
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="inline-flex items-center justify-center mb-4 w-full">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #143369 0%, #1a4a7a 100%)' }}
                >
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <SectionTitle title={title} description={subtitle} align="center" />
            </>
          )}
        </motion.div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {items.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border-2 border-gray-200/60 hover:border-[#143369]/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
              >
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#143369] transition-colors flex-1">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-[#143369] transition-colors" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed">
                          {renderAnswer ? renderAnswer(faq.answer) : faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={isLeft ? 'mt-8' : 'mt-12 text-center'}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-2 px-6 py-3 rounded-full bg-gray-50 border-2 border-gray-200/60">
            <HelpCircle className="w-5 h-5 shrink-0" style={{ color: '#143369' }} />
            <span className="text-gray-700 font-medium">
              Still have questions?{' '}
              <a href={contactHref} onClick={handleContactClick} className="font-semibold hover:underline" style={{ color: '#143369' }}>
                {contactLinkText}
              </a>
              {faqPageHref && (
                <>
                  {' · '}
                  <a href={faqPageHref} className="font-semibold hover:underline" style={{ color: '#143369' }}>
                    {faqPageLabel}
                  </a>
                </>
              )}
            </span>
          </div>
        </motion.div>
      </div>
    </OuterTag>
  )
}
