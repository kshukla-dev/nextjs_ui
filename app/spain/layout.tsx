import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import spainEorData from '@/data/spain-eor.json'

const { title, description, keywords } = spainEorData.metadata as {
  title: string
  description: string
  keywords: string[]
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/spain',
  keywords,
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/spain',
    name: title,
    description,
    pageNameForBreadcrumb: 'Spain',
  })
)

export default function SpainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
