import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

const title = 'Employer of Record & Payroll Services | India'
const description = 'Expand your business in India with EOR services. Expert payroll, compliance, and HR solutions. Navigate Indian labor laws and tax regulations.'

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/india',
  keywords: [
    'EOR India',
    'hire in India',
    'India payroll services',
    'India employment services',
    'India EOR provider',
    'hire employees India',
    'India HR solutions',
    'India compliance',
    'India workforce management',
    'India employment law',
  ],
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/india',
    name: title,
    description,
    pageNameForBreadcrumb: 'India',
  })
)

export default function IndiaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
