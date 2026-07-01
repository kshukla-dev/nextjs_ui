import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import Providers from './providers'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/constants'
import { buildPageSchemaGraph } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import '@/styles/global.css'
import '@/styles/eor-modern.css'
import '@/styles/eor-sections.css'
import '@/styles/service-page.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#143369',
}

const base = genMeta({
  title: 'Global HR Solutions - EOR & Payroll',
  description:
    'Hire talent worldwide with fast, compliant global HR solutions. EOR, payroll, and compliance services across 160+ countries. Start today.',
})

export const metadata: Metadata = {
  ...base,
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: '%s | Jackson & Frank',
    default: 'Global HR Solutions - EOR & Payroll | Jackson & Frank',
  },
  alternates: { canonical: SITE_CONFIG.url },
  referrer: 'strict-origin-when-cross-origin',
  authors: [{ name: 'Jackson & Frank' }],
  creator: 'Jackson & Frank',
  publisher: 'Jackson & Frank',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
    other: { 'msvalidate.01': '60E5EC820D7200BA2607ABDCD07B0CFF' },
  },
}

// Organization + WebSite base graph, present on every page.
const baseSchema = buildPageSchemaGraph([])

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W3H7GWCH');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="jhdPOn/H20mv87THGB8MVA"
          strategy="afterInteractive"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />

        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://js-eu1.hs-scripts.com" />
        <link rel="dns-prefetch" href="https://static.hotjar.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        <meta name="geo.region" content="NL-GE" />
        <meta name="application-name" content="Jackson & Frank" />
        <meta name="msapplication-TileColor" content="#143369" />

        <JsonLd data={baseSchema} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3H7GWCH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>

        {/* GA4 / Google Ads with consent mode */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0SFW22DLWG"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'granted'
            });
            gtag('js', new Date());
            gtag('config', 'G-0SFW22DLWG');
          `}
        </Script>
        {/* Google Ads conversion helper: window.gtagSendEvent(url) fires the
            conversion before navigating. Wire on contact/booking actions. */}
        <Script id="gtag-send-event" strategy="afterInteractive">
          {`
            function gtagSendEvent(url) {
              var callback = function () {
                if (typeof url === 'string') { window.location = url; }
              };
              gtag('event', 'ads_conversion_Contact_Us_1', {
                'event_callback': callback,
                'event_timeout': 2000,
              });
              return false;
            }
            window.gtagSendEvent = gtagSendEvent;
          `}
        </Script>

        {/* Hotjar */}
        <Script id="hotjar" strategy="lazyOnload">
          {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:5072457,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "s2f1owcfae");`}
        </Script>

        {/* HubSpot */}
        <Script
          id="hs-script-loader"
          src="https://js-eu1.hs-scripts.com/145156571.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
