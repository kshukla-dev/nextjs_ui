import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import ukContractorData from '@/data/united-kingdom-contractor.json'

const { title, description, keywords } = ukContractorData.metadata as {
  title: string
  description: string
  keywords: string[]
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/united-kingdom-contractor',
  keywords,
  image: 'countries/UK.webp',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/united-kingdom-contractor',
    name: title,
    description,
    pageNameForBreadcrumb: 'United Kingdom Contractor',
  })
)

export default function UnitedKingdomContractorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
