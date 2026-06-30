'use client'
import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <style>{`
        .scroll-to-top{position:fixed;bottom:2rem;right:2rem;width:3.5rem;height:3.5rem;background-color:#f39c12;border:4px solid #e0e0e0;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:9999;box-shadow:0 4px 6px rgba(0,0,0,0.1);transition:all 0.3s ease;opacity:1;transform:translateY(0)}
        .scroll-to-top:hover{background-color:#e67e22;transform:translateY(-3px);box-shadow:0 6px 12px rgba(0,0,0,0.15)}
        .scroll-to-top.hidden{opacity:0;transform:translateY(20px);pointer-events:none}
        .scroll-to-top .icon{color:white;width:1.5rem;height:1.5rem;stroke-width:3}
      `}</style>
      <button
        className={`scroll-to-top${isVisible ? '' : ' hidden'}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="icon" />
      </button>
    </>
  )
}
