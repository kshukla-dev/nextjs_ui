import { sanityClient } from './sanity'

export interface ServiceItem {
  title: string
  description: string
  href: string
}

export interface FeaturedPreview {
  eyebrow: string
  title: string
  blurb: string
  image: string
  href: string
  cta: string
}

export interface ServiceNavigation {
  items: ServiceItem[]
  featuredPreview: FeaturedPreview
}

export async function fetchServiceNavigation(): Promise<ServiceNavigation | null> {
  const query = `*[_type == "serviceNavigation"][0] {
    items,
    featuredPreview {
      eyebrow,
      title,
      blurb,
      "image": image.asset->url,
      href,
      cta
    }
  }`
  
  try {
    const data = await sanityClient.fetch(query)
    return data || null
  } catch (error) {
    console.error('Failed to fetch service navigation:', error)
    return null
  }
}
