import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import polandEorData from '@/data/poland-eor.json'

const { title, description, keywords } = polandEorData.metadata as {
  title: string
  description: string
  keywords: string[]
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/poland',
  keywords,
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/poland',
    name: title,
    description,
    pageNameForBreadcrumb: 'Poland',
  })
)

export default function PolandLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
