'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Initialize Lenis smooth scroll
  useEffect(() => {
    lenisInstance = new Lenis({ autoRaf: true })
    return () => {
      if (lenisInstance) {
        lenisInstance.destroy()
        lenisInstance = null
      }
    }
  }, [])

  // Scroll to top + re-init fade-in observer on route change
  useEffect(() => {
    // Scroll to top on route change
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    // Re-run IntersectionObserver for .fade-in elements
    const initObserver = () => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible')
              obs.unobserve(e.target)
            }
          })
        },
        { threshold: 0.1 }
      )
      document.querySelectorAll('.fade-in:not(.visible)').forEach((el) => observer.observe(el))
    }

    // Slight delay to let Next.js render the new page
    const timer = setTimeout(initObserver, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return <>{children}</>
}
