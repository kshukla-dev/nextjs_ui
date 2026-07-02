import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

const title = 'Employer of Record & Payroll Services | Czech Republic'
const description = 'Expand your business in Czech Republic with EOR services. Expert payroll, compliance, and HR solutions. Fast onboarding and full compliance.'

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/czech-republic',
  keywords: [
    'EOR Czech Republic',
    'hire in Czech Republic',
    'Czech Republic payroll services',
    'Czech Republic employment services',
    'Czech Republic EOR provider',
    'hire employees Czech Republic',
    'Czech Republic HR solutions',
    'Czech Republic compliance',
    'Czech Republic workforce management',
    'Czech Republic employment law',
  ],
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/czech-republic',
    name: title,
    description,
    pageNameForBreadcrumb: 'Czech Republic',
  })
)

export default function CzechRepublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
