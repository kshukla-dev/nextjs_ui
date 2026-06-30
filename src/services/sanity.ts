import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'jyq5j2qu',
  dataset: 'production',
  useCdn: true, // Use CDN for caching unless you want real-time updates
  apiVersion: '2023-05-03', // Use current date (YYYY-MM-DD) to pin the API version
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
