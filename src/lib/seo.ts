import type { Metadata } from "next"
import { SITE_CONFIG } from "./constants"

interface GenerateMetadataOptions {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
  type?: "website" | "article" | "product"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  /** Open Graph article:section (e.g. "Press release", "Events") */
  articleSection?: string
  /** Open Graph article:tag — same topics as meta/structured data */
  articleTags?: string[]
}

function truncateTitle(title: string, maxLength: number = 65): string {
  if (title.length <= maxLength) return title
  return title.substring(0, maxLength - 3) + '...'
}

function optimizeDescription(description: string): string {
  const minLength = 70
  const maxLength = 155
  
  if (description.length >= minLength && description.length <= maxLength) {
    return description
  }
  
  if (description.length < minLength) {
    return description
  }
  
  const truncated = description.substring(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(' ')
  return lastSpace > minLength 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

/**
 * Derives keyword tokens from the URL path so meta keywords align with the slug.
 * Helps third-party audits that require consistency between the page URL and meta keywords.
 */
function keywordsFromPath(path: string): string[] {
  if (!path || path === "/") return []

  const pathname = path.split("?")[0].split("#")[0]
  const segments = pathname.split("/").filter(Boolean)
  const out: string[] = []
  const seen = new Set<string>()

  const add = (raw: string) => {
    const t = raw.trim()
    if (!t) return
    if (t.length === 1) return
    // Two-letter segments: locale codes (en, cn) etc.
    if (t.length === 2 && !/^[a-z]{2}$/i.test(t)) return
    const key = t.toLowerCase()
    if (seen.has(key)) return
    seen.add(key)
    out.push(t)
  }

  for (const seg of segments) {
    add(seg)
    for (const part of seg.split("-")) {
      if (!part) continue
      if (/^\d+$/.test(part)) {
        if (part.length >= 4) add(part)
        continue
      }
      if (part.length >= 2) add(part)
    }
  }

  const last = segments[segments.length - 1]
  if (last === "career") add("careers")
  if (last === "sitemaps") add("sitemap")

  return out
}

function mergeKeywordsUnique(preferredFirst: string[]): string {
  const seen = new Set<string>()
  const merged: string[] = []
  for (const k of preferredFirst) {
    const key = k.trim().toLowerCase()
    if (!key || seen.has(key)) continue
    seen.add(key)
    merged.push(k.trim())
  }
  return merged.join(", ")
}

export function generateMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  articleSection,
  articleTags,
}: GenerateMetadataOptions = {}): Metadata {
  const maxPageTitleLength = 65 - SITE_CONFIG.name.length
  
  const finalTitle = title || ""
 
  
  
  
  const fullDescription = optimizeDescription(description || SITE_CONFIG.description)
  const url = `${SITE_CONFIG.url}${path}`
  const ogImage = image
    ? (image.startsWith("http") ? image : `${SITE_CONFIG.url}${image.startsWith("/") ? image : `/${image}`}`)
    : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`
  
  const defaultKeywords = [
    "EOR",
    "Employer of Record",
    "Global HR",
    "Payroll Services",
    "International Hiring",
    "Global Workforce",
    "HR Compliance",
    "Global Expansion",
  ]
  const pathKeywords = keywordsFromPath(path)
  const keywordsMeta = mergeKeywordsUnique([
    ...pathKeywords,
    ...keywords,
    ...defaultKeywords,
  ])

  const metadata: Metadata = {
    title: finalTitle,
    description: fullDescription,
    keywords: keywordsMeta,
    authors: authors?.map(name => ({ name })) || [{ name: SITE_CONFIG.name }],
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description: fullDescription,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: "en_US",
      type: (type === "product" ? "website" : (type || "website")) as "website" | "article",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(type === "article" && articleSection ? { section: articleSection } : {}),
      ...(type === "article" && articleTags?.length ? { tags: articleTags } : {}),
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      other: {
        "msvalidate.01": "60E5EC820D7200BA2607ABDCD07B0CFF",
      },
    },
  }

  return metadata
}

