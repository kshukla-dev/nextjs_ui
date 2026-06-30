import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import Providers from './providers'
import '@/styles/global.css'
import '@/styles/eor-modern.css'
import '@/styles/eor-sections.css'
import '@/styles/service-page.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Jackson & Frank',
    default: 'Jackson & Frank - Hire talent, anywhere',
  },
  description: 'Jackson & Frank — Hire talent, anywhere. International payroll and employment compliance.',
  openGraph: {
    title: 'Jackson & Frank',
    description: 'Hire talent anywhere. Employer of record, international payroll, and compliance.',
    images: [{ url: 'https://jacksonandfrank.com/og-image.jpg' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Jackson & Frank",
              "url": "https://jacksonandfrank.com",
              "logo": "https://jacksonandfrank.com/logo.png",
              "description": "Global expansion and employer of record services."
            })
          }}
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
