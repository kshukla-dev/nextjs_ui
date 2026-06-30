'use server'

import type { BlogPost, Category, Tag } from '@/types/blog'
import { mergeManualBlogPosts, getManualBlogBySlug } from '@/data/manual-blog-posts'
import { sanityClient } from './sanity'

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined) ?? '/api/v1'
const TIMEOUT_MS = 15000

async function getJson<T>(path: string): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${API_BASE}/${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} for ${path}`)
    return (await res.json()) as T
  } finally {
    clearTimeout(timer)
  }
}

const POST_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  "page_content": rawHtml,
  rawHtml,
  body,
  "image_url": mainImage.asset->url,
  "page_type": pageType,
  "estimated_reading_time": readingTime,
  "meta_title": metaTitle,
  "meta_description": metaDescription,
  "canonical_url": canonicalUrl,
  "status": "PUBLISHED",
  "publish_date": publishedAt,
  "updated_at": lastUpdated,
  "in_this_guide": inThisGuide,
  "author": author->{ "id": _id, name, email },
  "categories": categories[]->{ "id": _id, "category_name": title, "slug": slug.current },
  "tags": tags
`

function mapSanityPost(post: any): BlogPost {
  if (!post) return post
  return {
    ...post,
    publish_date: post.publish_date || new Date().toISOString(),
    category_ids: post.categories?.map((c: any) => c.slug).join(',') || '',
    tag_ids: post.tags?.join(',') || '',
    keywords: post.tags?.join(',') || ''
  }
}

export async function fetchBlogPage(
  page = 1,
  limit = 50
): Promise<{ results: BlogPost[]; count: number }> {
  const start = (page - 1) * limit
  const end = start + limit

  const query = `*[_type == "post"] | order(publishedAt desc) [${start}...${end}] {
    ${POST_FIELDS}
  }`
  const countQuery = `count(*[_type == "post"])`

  const [results, count] = await Promise.all([
    sanityClient.fetch(query),
    sanityClient.fetch(countQuery)
  ])

  return { 
    results: results.map(mapSanityPost), 
    count 
  }
}

export async function fetchAllBlogs(): Promise<BlogPost[]> {
  const all: BlogPost[] = []
  
  // 1. Fetch from Old CMS API
  try {
    let page = 1
    let guard = 0
    while (guard++ < 20) {
      const json = await getJson<any>(`dynamic-page?page=${page}&limit=50`)
      const results = json?.data?.results || json?.data?.data || []
      if (results.length === 0) break
      all.push(...results)
      if (results.length < 50) break
      page++
    }
  } catch (err) {
    console.error('Error fetching blogs from old CMS API:', err)
  }

  // 2. Fetch from Sanity
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      ${POST_FIELDS}
    }`
    const sanityResults = await sanityClient.fetch(query)
    all.push(...sanityResults.map(mapSanityPost))
  } catch (err) {
    console.error('Error fetching all blogs from Sanity:', err)
  }

  // 3. Merge with manual blogs
  return mergeManualBlogPosts(all)
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const manual = getManualBlogBySlug(slug)
  if (manual) return manual

  // 1. Try Sanity
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      ${POST_FIELDS},
      "related_articles": relatedArticles[]->{
        "id": _id,
        title,
        "slug": slug.current,
        excerpt,
        "image_url": mainImage.asset->url,
        "publish_date": publishedAt,
        "page_type": pageType
      }
    }`
    const result = await sanityClient.fetch(query, { slug })
    if (result) return mapSanityPost(result)
  } catch (err) {
    console.error('Error fetching blog by slug from Sanity:', err)
  }

  // 2. Try Old API
  try {
    const json = await getJson<any>(`dynamic-page/slug/${encodeURIComponent(slug)}`)
    if (json?.success && json?.data) return json.data
    if (json?.slug) return json
  } catch (err) {
    console.error('Error fetching blog by slug from old CMS API:', err)
  }

  return null
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const query = `*[_type == "category"] {
      "id": _id,
      "category_name": title,
      "slug": slug.current
    }`
    return await sanityClient.fetch(query)
  } catch {
    return []
  }
}

export async function fetchTags(): Promise<Tag[]> {
  try {
    const query = `array::unique(*[_type == "post"].tags[])`
    const tags: string[] = await sanityClient.fetch(query)
    return (tags || []).filter(Boolean).map((t, i) => ({ id: i, tag_name: t, name: t, tag: t }))
  } catch {
    return []
  }
}
