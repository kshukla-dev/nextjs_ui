import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import ukEorData from '@/data/united-kingdom-eor.json'

const { title, description, keywords } = ukEorData.metadata as {
  title: string
  description: string
  keywords: string[]
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/united-kingdom',
  keywords,
  image: 'countries/UK.webp',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/united-kingdom',
    name: title,
    description,
    pageNameForBreadcrumb: 'United Kingdom',
  })
)

export default function UnitedKingdomLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
