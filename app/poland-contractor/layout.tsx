import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import polandContractorData from '@/data/poland-contractor.json'

const { title, description, keywords } = polandContractorData.metadata as {
  title: string
  description: string
  keywords: string[]
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/poland-contractor',
  keywords,
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/poland-contractor',
    name: title,
    description,
    pageNameForBreadcrumb: 'Poland Contractor',
  })
)

export default function PolandContractorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
