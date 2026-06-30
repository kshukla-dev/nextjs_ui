'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { fetchBlogBySlug, fetchAllBlogs } from '@/services/blog'
import {
  applyStatCorrections,
  ensureImageAlt,
  demoteBodyH1s,
  formatBlogDate,
} from '@/utils/blog'
import AuthorAvatar from '@/components/ui/AuthorAvatar'
import LeadModal from '@/components/ui/LeadModal'
import type { BlogPost } from '@/types/blog'
import { PortableText } from '@portabletext/react'
import type { PortableTextReactComponents } from '@portabletext/react'

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // Lead-capture modal
  const [modalOpen, setModalOpen] = useState(false)
  function openModal() {
    setModalOpen(true)
  }

  function generateId(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
  }

  const ptComponents: Partial<PortableTextReactComponents> = {
    block: {
      h2: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join('') || ''
        return <h2 id={generateId(text)}>{children}</h2>
      },
      h3: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join('') || ''
        return <h3 id={generateId(text)}>{children}</h3>
      }
    }
  }

  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const TOC_MARKER = '<!--BLOG_TOC_INSERT-->'

  // Process CMS HTML once per blog change
  const renderedContent = useMemo(() => {
    if (!blog) return ''
    let html = blog.page_content || blog.excerpt || ''
    html = ensureImageAlt(html, blog.title)
    html = applyStatCorrections(html)
    html = demoteBodyH1s(html)

    // Strip TOC marker from body content since we render TOC horizontally at the top
    if (html.includes(TOC_MARKER)) {
      html = html.replace(TOC_MARKER, '')
    }

    // Wrap every table so it scrolls horizontally on small screens instead of
    // breaking the layout.
    html = html.replace(/<table/gi, '<div class="blog-table-wrap"><table').replace(/<\/table>/gi, '</table></div>')

    return html
  }, [blog])

  // Extract top-level headings from TOC HTML for horizontal "In this article" component
  const parsedToc = useMemo(() => {
    if (!blog || !blog.toc_html) return []
    const html = blog.toc_html
    const matches = [...html.matchAll(/href="([^"]+)"[^>]*>([^<]+)<\/a>/gi)]
    return matches.map(m => ({
      href: m[1],
      text: m[2].replace(/&amp;/g, '&')
    })).slice(0, 5) // Limit to top 5 circles for aesthetics
  }, [blog])

  // Authors metadata lookup
  const AUTHORS_INFO: Record<string, { title: string; bio: string }> = {
    'vibhu agarwal': {
      title: 'Co-Founder & Director',
      bio: 'Vibhu is a co-founder and director at Jackson & Frank, specializing in global workforce operations, expansion strategies, and compliance frameworks across Europe and Asia.'
    },
    'pawel michalkiewicz': {
      title: 'Founder & CSO',
      bio: 'Pawel has 20+ years of experience helping international companies expand globally. He is a trusted advisor for market entry, HR, and compliance across Europe.'
    },
    'gaurav yelve': {
      title: 'Immigration & Global Mobility Specialist',
      bio: 'Gaurav has extensive experience in immigration services, visa sponsorships, and navigating complex mobility regulations for international hires.'
    }
  }

  const authorInfo = useMemo(() => {
    const name = (blog?.author?.name ?? '').trim().toLowerCase()
    return AUTHORS_INFO[name] || {
      title: 'Global Mobility Expert',
      bio: 'The team of global expansion specialists at Jackson & Frank helps companies hire, pay, and manage talent across international borders.'
    }
  }, [blog])

  // Social sharing links
  const shareLinks = useMemo(() => {
    const url = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''
    const title = encodeURIComponent(blog?.title ?? '')
    return {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      email: `mailto:?subject=${title}&body=Check out this article: ${url}`
    }
  }, [blog])

  // Sidebar related articles
  const sidebarRelated = useMemo(() => {
    return related.slice(0, 4)
  }, [related])

  // Newsletter signup
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)
  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!subscribeEmail) return
    setSubscribeEmail('')
    setSubscribeSuccess(true)
    setTimeout(() => {
      setSubscribeSuccess(false)
    }, 4000)
  }

  useEffect(() => {
    async function loadBlog() {
      if (!slug) return
      setLoading(true)
      setNotFound(false)
      setBlog(null)
      setRelated([])

      const post = await fetchBlogBySlug(slug)
      if (!post) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setBlog(post)

      // Update document title for SEO
      document.title = `${post.meta_title || post.title} - Jackson & Frank`

      // Fetch related articles (up to 4)
      try {
        const all = await fetchAllBlogs()
        const sameCat = (post.category_ids ?? '').split(',').map((s) => s.trim()).filter(Boolean)
        const candidates = all.filter(
          (b) =>
            b.slug !== post.slug &&
            sameCat.some((cid) =>
              (b.category_ids ?? '').split(',').map((s) => s.trim()).includes(cid)
            )
        )
        setRelated((candidates.length > 0 ? candidates : all.filter((b) => b.slug !== post.slug))
          .sort((a, b) => +new Date(b.publish_date) - +new Date(a.publish_date))
          .slice(0, 4))
      } catch {
        setRelated([])
      }

      setLoading(false)
    }

    loadBlog()
  }, [slug])

  if (loading) {
    return (
      <>
        <style>{`
.blog-detail {
  padding-top: 2rem;
  padding-bottom: 120px;
  background-color: #fdfcfb;
}

/* ====== BREADCRUMB ====== */
.blog-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-muted);
  margin-bottom: 40px;
  font-family: var(--sans);
}
.blog-breadcrumb a {
  color: var(--ink-soft);
  text-decoration: none;
  transition: color 0.2s;
}
.blog-breadcrumb a:hover {
  color: var(--accent);
}
.blog-breadcrumb .sep {
  color: var(--ink-muted);
}
.blog-breadcrumb .current {
  color: var(--ink);
  font-weight: 500;
  max-width: 380px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ====== HEADER ====== */
.blog-detail-header {
  margin-bottom: 48px;
  text-align: left;
}
.header-container-inner {
  max-width: 900px;
}
.tag-eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.16em;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
  font-family: var(--sans);
}
.blog-detail-header h1 {
  font-family: var(--serif);
  font-size: clamp(34px, 4.2vw, 56px);
  line-height: 1.15;
  font-weight: 400;
  letter-spacing: -0.015em;
  margin-bottom: 20px;
  color: var(--ink);
}
.excerpt-subtitle {
  font-size: clamp(16px, 1.8vw, 20px);
  line-height: 1.55;
  color: var(--ink-soft);
  margin-bottom: 32px;
  font-family: var(--sans);
}

.blog-detail-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}
.meta-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-info-block {
  display: flex;
  flex-direction: column;
}
.author-info-block .name {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
}
.author-info-block .role {
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: 2px;
}
.meta-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-soft);
  font-family: var(--sans);
}
.meta-icon {
  width: 15px;
  height: 15px;
  color: var(--ink-muted);
}
.btn-save {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 500;
  transition: color 0.2s;
}
.btn-save:hover {
  color: var(--accent);
}
.btn-save:hover .meta-icon {
  color: var(--accent);
}

/* ====== HERO IMAGE ====== */
.blog-detail-hero {
  margin: 0 auto 64px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 48px -15px rgba(0,0,0,0.06);
}
.blog-detail-hero img {
  width: 100%;
  height: auto;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  display: block;
}

/* ====== GRID LAYOUT ====== */
.blog-grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
}
@media (min-width: 1024px) {
  .blog-grid-layout {
    grid-template-columns: 1fr 340px;
    gap: 64px;
    align-items: start;
  }
}
.blog-main-column {
  min-width: 0; /* Prevents flex items/grid cells from breaking page layout */
}

/* ====== IN THIS ARTICLE ====== */
.in-this-article {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 48px;
  box-shadow: 0 4px 24px rgba(20, 51, 105, 0.02);
}
.toc-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  margin-bottom: 20px;
}
.toc-circles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.toc-circle-card {
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.2s;
}
.toc-circle-card:hover {
  transform: translateY(-2px);
}
.circle-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  background-color: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--serif);
  font-style: italic;
  transition: background-color 0.2s, color 0.2s;
}
.toc-circle-card:hover .circle-num {
  background-color: var(--accent);
  color: white;
}
.circle-label {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink);
  font-family: var(--sans);
}
.toc-circle-card:hover .circle-label {
  color: var(--accent);
}

/* ====== CONTENT BODY ====== */
.blog-detail-body {
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.75;
  color: var(--ink-soft);
}
.blog-detail-body :deep(h2),
.blog-detail-body :deep(h3) {
  font-family: var(--serif);
  
  letter-spacing: -0.015em;
  margin-top: 56px;
  margin-bottom: 20px;
  line-height: 1.25;
  color: var(--ink);
}
.blog-detail-body :deep(h2) { font-size: clamp(22px, 4vw, 32px); border-bottom: 1px solid var(--border); padding-bottom: 12px; }
.blog-detail-body :deep(h3) { font-size: 24px; margin-top: 40px; }
.blog-detail-body :deep(p) {
  margin: 20px 0;
}
.blog-detail-body :deep(strong) {
  color: var(--ink);
  font-weight: 600;
}
.blog-detail-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.blog-detail-body :deep(a:hover) {
  color: var(--ink);
}

/* Checklist custom styling */
.blog-detail-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 24px 0;
}
.blog-detail-body :deep(li) {
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
  line-height: 1.65;
}
.blog-detail-body :deep(li::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b09559' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

/* Exclude list icons under Sources */
.blog-detail-body :deep(h2:has(a[href*="Sources"]) + ul li::before),
.blog-detail-body :deep(h2:has(span:contains("Sources")) + ul li::before),
.blog-detail-body :deep(ul:last-of-type li::before) {
  background-image: none;
  content: "•";
  color: var(--accent);
  font-size: 20px;
  left: 6px;
  top: -2px;
  width: auto;
  height: auto;
}

/* Info & warning cards styling */
.blog-detail-body :deep(.info),
.blog-detail-body :deep(.warning),
.blog-detail-body :deep(.highlight) {
  padding: 24px 28px;
  border-radius: 8px;
  margin: 32px 0;
  font-size: 15px;
  line-height: 1.65;
  box-shadow: 0 4px 20px rgba(0,0,0,0.01);
}
.blog-detail-body :deep(.info) {
  background-color: #faf7f2;
  border-left: 3px solid var(--accent);
  color: var(--ink-soft);
}
.blog-detail-body :deep(.warning) {
  background-color: #fcf9f4;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent-warm, #d08855);
}
.blog-detail-body :deep(.highlight) {
  background-color: #f7f4ef;
  border: 1px solid var(--border);
}
.blog-detail-body :deep(.info p),
.blog-detail-body :deep(.warning p),
.blog-detail-body :deep(.highlight p) {
  margin: 0 0 8px 0;
}
.blog-detail-body :deep(.info p:last-child),
.blog-detail-body :deep(.warning p:last-child),
.blog-detail-body :deep(.highlight p:last-child) {
  margin-bottom: 0;
}

/* Table container details */
.blog-detail-body :deep(.blog-table-wrap) {
  overflow-x: auto;
  margin: 36px 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.01);
}
.blog-detail-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-width: 800px;
}
.blog-detail-body :deep(th),
.blog-detail-body :deep(td) {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border);
  line-height: 1.5;
}
.blog-detail-body :deep(th:last-child),
.blog-detail-body :deep(td:last-child) {
  border-right: none;
}
.blog-detail-body :deep(tr:last-child td) {
  border-bottom: none;
}
.blog-detail-body :deep(thead th) {
  background-color: var(--ink);
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-size: 11px;
}
.blog-detail-body :deep(tbody tr:nth-child(even)) {
  background-color: #ffffff;
}

/* Accordion updates */
.blog-detail-body :deep(details.country-accordion) {
  border: 1px solid var(--border);
  border-radius: 8px;
  margin: 16px 0;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.blog-detail-body :deep(details.country-accordion[open]) {
  border-color: var(--accent);
}
.blog-detail-body :deep(details.country-accordion > summary) {
  cursor: pointer;
  padding: 18px 24px;
  user-select: none;
}
.blog-detail-body :deep(details.country-accordion > summary h3) {
  margin: 0;
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
}

/* ====== CONSULTATION BANNER ====== */
.consultation-banner {
  background-color: #f7f4ef;
  border-radius: 12px;
  padding: 32px;
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: space-between;
}
@media (min-width: 640px) {
  .consultation-banner {
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }
}
.consultation-content {
  display: flex;
  align-items: center;
  gap: 20px;
}
.consultation-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.consultation-icon-circle svg {
  width: 24px;
  height: 24px;
}
.consultation-text h3 {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 4px;
  line-height: 1.3;
}
.consultation-text p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin: 0;
}
.consultation-btn {
  white-space: nowrap;
  flex-shrink: 0;
}

/* ====== STICKY SIDEBAR ====== */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: sticky;
  top: 100px;
  margin-top: 12px;
}

.sidebar-widget {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}
.widget-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

/* Author widget details */
.author-header-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.author-meta-text h5 {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 2px;
  line-height: 1.2;
}
.author-tagline {
  display: block;
  font-size: 11px;
  color: var(--accent);
  font-weight: 600;
}
.author-corp {
  display: block;
  font-size: 10px;
  color: var(--ink-muted);
}
.author-bio {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.widget-action-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s;
}
.widget-action-link:hover {
  color: var(--ink);
}

/* Share widget details */
.share-buttons {
  display: flex;
  gap: 12px;
}
.share-btn-round {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.share-btn-round svg {
  width: 16px;
  height: 16px;
}
.share-btn-round:hover {
  background-color: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

/* Related Widget Details */
.related-vertical-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.related-item-row {
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.related-item-row:hover {
  transform: translateX(4px);
}
.related-thumb-box {
  width: 72px;
  height: 54px;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--accent-soft);
  flex-shrink: 0;
}
.related-thumb-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}
.related-item-text h5 {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.related-item-row:hover h5 {
  color: var(--accent);
}
.related-item-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--ink-muted);
}

/* Newsletter widget details */
.newsletter-widget {
  background-color: #f7f4ef;
  border-color: #eae6df;
}
.newsletter-widget-card p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.newsletter-inline-form {
  display: flex;
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px 4px 4px 16px;
  align-items: center;
}
.newsletter-inline-form input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: var(--ink);
}
.submit-arrow-btn {
  width: 36px;
  height: 36px;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}
.submit-arrow-btn svg {
  width: 16px;
  height: 16px;
}
.submit-arrow-btn:hover {
  background-color: var(--ink);
}
.subscribe-success-banner {
  margin-top: 12px;
  font-size: 12px;
  color: #3b7a57;
  font-weight: 600;
}

/* ====== SKELETONS ====== */
.blog-detail-loading {
  padding-top: 160px;
  padding-bottom: 100px;
  max-width: 820px;
}
.skeleton {
  background: var(--accent-soft);
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  );
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.skeleton-title { height: 56px; width: 80%; margin-bottom: 24px; }
.skeleton-meta { height: 18px; width: 240px; margin: 0 auto 32px; }
.skeleton-hero { height: 420px; margin-bottom: 32px; }
.skeleton-line { height: 16px; }

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
`}</style>
        <div className="container blog-detail-loading">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-meta" />
          <div className="skeleton skeleton-hero" />
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton skeleton-line" />)}
        </div>
      </>
    )
  }

  if (notFound) {
    return (
      <>
        <style>{`
.blog-detail {
  padding-top: 2rem;
  padding-bottom: 120px;
  background-color: #fdfcfb;
}

/* ====== BREADCRUMB ====== */
.blog-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-muted);
  margin-bottom: 40px;
  font-family: var(--sans);
}
.blog-breadcrumb a {
  color: var(--ink-soft);
  text-decoration: none;
  transition: color 0.2s;
}
.blog-breadcrumb a:hover {
  color: var(--accent);
}
.blog-breadcrumb .sep {
  color: var(--ink-muted);
}
.blog-breadcrumb .current {
  color: var(--ink);
  font-weight: 500;
  max-width: 380px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ====== HEADER ====== */
.blog-detail-header {
  margin-bottom: 48px;
  text-align: left;
}
.header-container-inner {
  max-width: 900px;
}
.tag-eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.16em;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
  font-family: var(--sans);
}
.blog-detail-header h1 {
  font-family: var(--serif);
  font-size: clamp(34px, 4.2vw, 56px);
  line-height: 1.15;
  font-weight: 400;
  letter-spacing: -0.015em;
  margin-bottom: 20px;
  color: var(--ink);
}
.excerpt-subtitle {
  font-size: clamp(16px, 1.8vw, 20px);
  line-height: 1.55;
  color: var(--ink-soft);
  margin-bottom: 32px;
  font-family: var(--sans);
}

.blog-detail-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}
.meta-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-info-block {
  display: flex;
  flex-direction: column;
}
.author-info-block .name {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
}
.author-info-block .role {
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: 2px;
}
.meta-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-soft);
  font-family: var(--sans);
}
.meta-icon {
  width: 15px;
  height: 15px;
  color: var(--ink-muted);
}
.btn-save {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 500;
  transition: color 0.2s;
}
.btn-save:hover {
  color: var(--accent);
}
.btn-save:hover .meta-icon {
  color: var(--accent);
}

/* ====== HERO IMAGE ====== */
.blog-detail-hero {
  margin: 0 auto 64px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 48px -15px rgba(0,0,0,0.06);
}
.blog-detail-hero img {
  width: 100%;
  height: auto;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  display: block;
}

/* ====== GRID LAYOUT ====== */
.blog-grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
}
@media (min-width: 1024px) {
  .blog-grid-layout {
    grid-template-columns: 1fr 340px;
    gap: 64px;
    align-items: start;
  }
}
.blog-main-column {
  min-width: 0; /* Prevents flex items/grid cells from breaking page layout */
}

/* ====== IN THIS ARTICLE ====== */
.in-this-article {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 48px;
  box-shadow: 0 4px 24px rgba(20, 51, 105, 0.02);
}
.toc-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  margin-bottom: 20px;
}
.toc-circles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.toc-circle-card {
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.2s;
}
.toc-circle-card:hover {
  transform: translateY(-2px);
}
.circle-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  background-color: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--serif);
  font-style: italic;
  transition: background-color 0.2s, color 0.2s;
}
.toc-circle-card:hover .circle-num {
  background-color: var(--accent);
  color: white;
}
.circle-label {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink);
  font-family: var(--sans);
}
.toc-circle-card:hover .circle-label {
  color: var(--accent);
}

/* ====== CONTENT BODY ====== */
.blog-detail-body {
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.75;
  color: var(--ink-soft);
}
.blog-detail-body :deep(h2),
.blog-detail-body :deep(h3) {
  font-family: var(--serif);
  
  letter-spacing: -0.015em;
  margin-top: 56px;
  margin-bottom: 20px;
  line-height: 1.25;
  color: var(--ink);
}
.blog-detail-body :deep(h2) { font-size: clamp(22px, 4vw, 32px); border-bottom: 1px solid var(--border); padding-bottom: 12px; }
.blog-detail-body :deep(h3) { font-size: 24px; margin-top: 40px; }
.blog-detail-body :deep(p) {
  margin: 20px 0;
}
.blog-detail-body :deep(strong) {
  color: var(--ink);
  font-weight: 600;
}
.blog-detail-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.blog-detail-body :deep(a:hover) {
  color: var(--ink);
}

/* Checklist custom styling */
.blog-detail-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 24px 0;
}
.blog-detail-body :deep(li) {
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
  line-height: 1.65;
}
.blog-detail-body :deep(li::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b09559' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

/* Exclude list icons under Sources */
.blog-detail-body :deep(h2:has(a[href*="Sources"]) + ul li::before),
.blog-detail-body :deep(h2:has(span:contains("Sources")) + ul li::before),
.blog-detail-body :deep(ul:last-of-type li::before) {
  background-image: none;
  content: "•";
  color: var(--accent);
  font-size: 20px;
  left: 6px;
  top: -2px;
  width: auto;
  height: auto;
}

/* Info & warning cards styling */
.blog-detail-body :deep(.info),
.blog-detail-body :deep(.warning),
.blog-detail-body :deep(.highlight) {
  padding: 24px 28px;
  border-radius: 8px;
  margin: 32px 0;
  font-size: 15px;
  line-height: 1.65;
  box-shadow: 0 4px 20px rgba(0,0,0,0.01);
}
.blog-detail-body :deep(.info) {
  background-color: #faf7f2;
  border-left: 3px solid var(--accent);
  color: var(--ink-soft);
}
.blog-detail-body :deep(.warning) {
  background-color: #fcf9f4;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent-warm, #d08855);
}
.blog-detail-body :deep(.highlight) {
  background-color: #f7f4ef;
  border: 1px solid var(--border);
}
.blog-detail-body :deep(.info p),
.blog-detail-body :deep(.warning p),
.blog-detail-body :deep(.highlight p) {
  margin: 0 0 8px 0;
}
.blog-detail-body :deep(.info p:last-child),
.blog-detail-body :deep(.warning p:last-child),
.blog-detail-body :deep(.highlight p:last-child) {
  margin-bottom: 0;
}

/* Table container details */
.blog-detail-body :deep(.blog-table-wrap) {
  overflow-x: auto;
  margin: 36px 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.01);
}
.blog-detail-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-width: 800px;
}
.blog-detail-body :deep(th),
.blog-detail-body :deep(td) {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border);
  line-height: 1.5;
}
.blog-detail-body :deep(th:last-child),
.blog-detail-body :deep(td:last-child) {
  border-right: none;
}
.blog-detail-body :deep(tr:last-child td) {
  border-bottom: none;
}
.blog-detail-body :deep(thead th) {
  background-color: var(--ink);
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-size: 11px;
}
.blog-detail-body :deep(tbody tr:nth-child(even)) {
  background-color: #ffffff;
}

/* Accordion updates */
.blog-detail-body :deep(details.country-accordion) {
  border: 1px solid var(--border);
  border-radius: 8px;
  margin: 16px 0;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.blog-detail-body :deep(details.country-accordion[open]) {
  border-color: var(--accent);
}
.blog-detail-body :deep(details.country-accordion > summary) {
  cursor: pointer;
  padding: 18px 24px;
  user-select: none;
}
.blog-detail-body :deep(details.country-accordion > summary h3) {
  margin: 0;
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
}

/* ====== CONSULTATION BANNER ====== */
.consultation-banner {
  background-color: #f7f4ef;
  border-radius: 12px;
  padding: 32px;
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: space-between;
}
@media (min-width: 640px) {
  .consultation-banner {
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }
}
.consultation-content {
  display: flex;
  align-items: center;
  gap: 20px;
}
.consultation-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.consultation-icon-circle svg {
  width: 24px;
  height: 24px;
}
.consultation-text h3 {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 4px;
  line-height: 1.3;
}
.consultation-text p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin: 0;
}
.consultation-btn {
  white-space: nowrap;
  flex-shrink: 0;
}

/* ====== STICKY SIDEBAR ====== */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: sticky;
  top: 100px;
  margin-top: 12px;
}

.sidebar-widget {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}
.widget-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

/* Author widget details */
.author-header-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.author-meta-text h5 {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 2px;
  line-height: 1.2;
}
.author-tagline {
  display: block;
  font-size: 11px;
  color: var(--accent);
  font-weight: 600;
}
.author-corp {
  display: block;
  font-size: 10px;
  color: var(--ink-muted);
}
.author-bio {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.widget-action-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s;
}
.widget-action-link:hover {
  color: var(--ink);
}

/* Share widget details */
.share-buttons {
  display: flex;
  gap: 12px;
}
.share-btn-round {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.share-btn-round svg {
  width: 16px;
  height: 16px;
}
.share-btn-round:hover {
  background-color: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

/* Related Widget Details */
.related-vertical-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.related-item-row {
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.related-item-row:hover {
  transform: translateX(4px);
}
.related-thumb-box {
  width: 72px;
  height: 54px;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--accent-soft);
  flex-shrink: 0;
}
.related-thumb-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}
.related-item-text h5 {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.related-item-row:hover h5 {
  color: var(--accent);
}
.related-item-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--ink-muted);
}

/* Newsletter widget details */
.newsletter-widget {
  background-color: #f7f4ef;
  border-color: #eae6df;
}
.newsletter-widget-card p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.newsletter-inline-form {
  display: flex;
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px 4px 4px 16px;
  align-items: center;
}
.newsletter-inline-form input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: var(--ink);
}
.submit-arrow-btn {
  width: 36px;
  height: 36px;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}
.submit-arrow-btn svg {
  width: 16px;
  height: 16px;
}
.submit-arrow-btn:hover {
  background-color: var(--ink);
}
.subscribe-success-banner {
  margin-top: 12px;
  font-size: 12px;
  color: #3b7a57;
  font-weight: 600;
}

/* ====== SKELETONS ====== */
.blog-detail-loading {
  padding-top: 160px;
  padding-bottom: 100px;
  max-width: 820px;
}
.skeleton {
  background: var(--accent-soft);
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  );
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.skeleton-title { height: 56px; width: 80%; margin-bottom: 24px; }
.skeleton-meta { height: 18px; width: 240px; margin: 0 auto 32px; }
.skeleton-hero { height: 420px; margin-bottom: 32px; }
.skeleton-line { height: 16px; }

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
`}</style>
        <div className="container blog-detail-404">
          <h1 className="section-title">We couldn&apos;t find that <em>article</em></h1>
          <p>The link may be outdated or the post may have moved.</p>
          <Link href="/blog" className="btn-primary">
            Back to all articles <span className="arrow">→</span>
          </Link>
        </div>
      </>
    )
  }

  if (blog) {
    return (
      <>
        <style>{`
.blog-detail {
  padding-top: 2rem;
  padding-bottom: 120px;
  background-color: #fdfcfb;
}

/* ====== BREADCRUMB ====== */
.blog-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-muted);
  margin-bottom: 40px;
  font-family: var(--sans);
}
.blog-breadcrumb a {
  color: var(--ink-soft);
  text-decoration: none;
  transition: color 0.2s;
}
.blog-breadcrumb a:hover {
  color: var(--accent);
}
.blog-breadcrumb .sep {
  color: var(--ink-muted);
}
.blog-breadcrumb .current {
  color: var(--ink);
  font-weight: 500;
  max-width: 380px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ====== HEADER ====== */
.blog-detail-header {
  margin-bottom: 48px;
  text-align: left;
}
.header-container-inner {
  max-width: 900px;
}
.tag-eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.16em;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
  font-family: var(--sans);
}
.blog-detail-header h1 {
  font-family: var(--serif);
  font-size: clamp(34px, 4.2vw, 56px);
  line-height: 1.15;
  font-weight: 400;
  letter-spacing: -0.015em;
  margin-bottom: 20px;
  color: var(--ink);
}
.excerpt-subtitle {
  font-size: clamp(16px, 1.8vw, 20px);
  line-height: 1.55;
  color: var(--ink-soft);
  margin-bottom: 32px;
  font-family: var(--sans);
}

.blog-detail-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}
.meta-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-info-block {
  display: flex;
  flex-direction: column;
}
.author-info-block .name {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
}
.author-info-block .role {
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: 2px;
}
.meta-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-soft);
  font-family: var(--sans);
}
.meta-icon {
  width: 15px;
  height: 15px;
  color: var(--ink-muted);
}
.btn-save {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 500;
  transition: color 0.2s;
}
.btn-save:hover {
  color: var(--accent);
}
.btn-save:hover .meta-icon {
  color: var(--accent);
}

/* ====== HERO IMAGE ====== */
.blog-detail-hero {
  margin: 0 auto 64px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 48px -15px rgba(0,0,0,0.06);
}
.blog-detail-hero img {
  width: 100%;
  height: auto;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  display: block;
}

/* ====== GRID LAYOUT ====== */
.blog-grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
}
@media (min-width: 1024px) {
  .blog-grid-layout {
    grid-template-columns: 1fr 340px;
    gap: 64px;
    align-items: start;
  }
}
.blog-main-column {
  min-width: 0; /* Prevents flex items/grid cells from breaking page layout */
}

/* ====== IN THIS ARTICLE ====== */
.in-this-article {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 48px;
  box-shadow: 0 4px 24px rgba(20, 51, 105, 0.02);
}
.toc-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  margin-bottom: 20px;
}
.toc-circles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.toc-circle-card {
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.2s;
}
.toc-circle-card:hover {
  transform: translateY(-2px);
}
.circle-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  background-color: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--serif);
  font-style: italic;
  transition: background-color 0.2s, color 0.2s;
}
.toc-circle-card:hover .circle-num {
  background-color: var(--accent);
  color: white;
}
.circle-label {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink);
  font-family: var(--sans);
}
.toc-circle-card:hover .circle-label {
  color: var(--accent);
}

/* ====== CONTENT BODY ====== */
.blog-detail-body {
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.75;
  color: var(--ink-soft);
}
.blog-detail-body :deep(h2),
.blog-detail-body :deep(h3) {
  font-family: var(--serif);
  
  letter-spacing: -0.015em;
  margin-top: 56px;
  margin-bottom: 20px;
  line-height: 1.25;
  color: var(--ink);
}
.blog-detail-body :deep(h2) { font-size: clamp(22px, 4vw, 32px); border-bottom: 1px solid var(--border); padding-bottom: 12px; }
.blog-detail-body :deep(h3) { font-size: 24px; margin-top: 40px; }
.blog-detail-body :deep(p) {
  margin: 20px 0;
}
.blog-detail-body :deep(strong) {
  color: var(--ink);
  font-weight: 600;
}
.blog-detail-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.blog-detail-body :deep(a:hover) {
  color: var(--ink);
}

/* Checklist custom styling */
.blog-detail-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 24px 0;
}
.blog-detail-body :deep(li) {
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
  line-height: 1.65;
}
.blog-detail-body :deep(li::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b09559' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

/* Exclude list icons under Sources */
.blog-detail-body :deep(h2:has(a[href*="Sources"]) + ul li::before),
.blog-detail-body :deep(h2:has(span:contains("Sources")) + ul li::before),
.blog-detail-body :deep(ul:last-of-type li::before) {
  background-image: none;
  content: "•";
  color: var(--accent);
  font-size: 20px;
  left: 6px;
  top: -2px;
  width: auto;
  height: auto;
}

/* Info & warning cards styling */
.blog-detail-body :deep(.info),
.blog-detail-body :deep(.warning),
.blog-detail-body :deep(.highlight) {
  padding: 24px 28px;
  border-radius: 8px;
  margin: 32px 0;
  font-size: 15px;
  line-height: 1.65;
  box-shadow: 0 4px 20px rgba(0,0,0,0.01);
}
.blog-detail-body :deep(.info) {
  background-color: #faf7f2;
  border-left: 3px solid var(--accent);
  color: var(--ink-soft);
}
.blog-detail-body :deep(.warning) {
  background-color: #fcf9f4;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent-warm, #d08855);
}
.blog-detail-body :deep(.highlight) {
  background-color: #f7f4ef;
  border: 1px solid var(--border);
}
.blog-detail-body :deep(.info p),
.blog-detail-body :deep(.warning p),
.blog-detail-body :deep(.highlight p) {
  margin: 0 0 8px 0;
}
.blog-detail-body :deep(.info p:last-child),
.blog-detail-body :deep(.warning p:last-child),
.blog-detail-body :deep(.highlight p:last-child) {
  margin-bottom: 0;
}

/* Table container details */
.blog-detail-body :deep(.blog-table-wrap) {
  overflow-x: auto;
  margin: 36px 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.01);
}
.blog-detail-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-width: 800px;
}
.blog-detail-body :deep(th),
.blog-detail-body :deep(td) {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border);
  line-height: 1.5;
}
.blog-detail-body :deep(th:last-child),
.blog-detail-body :deep(td:last-child) {
  border-right: none;
}
.blog-detail-body :deep(tr:last-child td) {
  border-bottom: none;
}
.blog-detail-body :deep(thead th) {
  background-color: var(--ink);
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-size: 11px;
}
.blog-detail-body :deep(tbody tr:nth-child(even)) {
  background-color: #ffffff;
}

/* Accordion updates */
.blog-detail-body :deep(details.country-accordion) {
  border: 1px solid var(--border);
  border-radius: 8px;
  margin: 16px 0;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.blog-detail-body :deep(details.country-accordion[open]) {
  border-color: var(--accent);
}
.blog-detail-body :deep(details.country-accordion > summary) {
  cursor: pointer;
  padding: 18px 24px;
  user-select: none;
}
.blog-detail-body :deep(details.country-accordion > summary h3) {
  margin: 0;
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
}

/* ====== CONSULTATION BANNER ====== */
.consultation-banner {
  background-color: #f7f4ef;
  border-radius: 12px;
  padding: 32px;
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: space-between;
}
@media (min-width: 640px) {
  .consultation-banner {
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }
}
.consultation-content {
  display: flex;
  align-items: center;
  gap: 20px;
}
.consultation-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.consultation-icon-circle svg {
  width: 24px;
  height: 24px;
}
.consultation-text h3 {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 4px;
  line-height: 1.3;
}
.consultation-text p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin: 0;
}
.consultation-btn {
  white-space: nowrap;
  flex-shrink: 0;
}

/* ====== STICKY SIDEBAR ====== */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: sticky;
  top: 100px;
  margin-top: 12px;
}

.sidebar-widget {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}
.widget-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

/* Author widget details */
.author-header-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.author-meta-text h5 {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 2px;
  line-height: 1.2;
}
.author-tagline {
  display: block;
  font-size: 11px;
  color: var(--accent);
  font-weight: 600;
}
.author-corp {
  display: block;
  font-size: 10px;
  color: var(--ink-muted);
}
.author-bio {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.widget-action-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s;
}
.widget-action-link:hover {
  color: var(--ink);
}

/* Share widget details */
.share-buttons {
  display: flex;
  gap: 12px;
}
.share-btn-round {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.share-btn-round svg {
  width: 16px;
  height: 16px;
}
.share-btn-round:hover {
  background-color: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

/* Related Widget Details */
.related-vertical-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.related-item-row {
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.related-item-row:hover {
  transform: translateX(4px);
}
.related-thumb-box {
  width: 72px;
  height: 54px;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--accent-soft);
  flex-shrink: 0;
}
.related-thumb-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}
.related-item-text h5 {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.related-item-row:hover h5 {
  color: var(--accent);
}
.related-item-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--ink-muted);
}

/* Newsletter widget details */
.newsletter-widget {
  background-color: #f7f4ef;
  border-color: #eae6df;
}
.newsletter-widget-card p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.newsletter-inline-form {
  display: flex;
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px 4px 4px 16px;
  align-items: center;
}
.newsletter-inline-form input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: var(--ink);
}
.submit-arrow-btn {
  width: 36px;
  height: 36px;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}
.submit-arrow-btn svg {
  width: 16px;
  height: 16px;
}
.submit-arrow-btn:hover {
  background-color: var(--ink);
}
.subscribe-success-banner {
  margin-top: 12px;
  font-size: 12px;
  color: #3b7a57;
  font-weight: 600;
}

/* ====== SKELETONS ====== */
.blog-detail-loading {
  padding-top: 160px;
  padding-bottom: 100px;
  max-width: 820px;
}
.skeleton {
  background: var(--accent-soft);
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  );
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.skeleton-title { height: 56px; width: 80%; margin-bottom: 24px; }
.skeleton-meta { height: 18px; width: 240px; margin: 0 auto 32px; }
.skeleton-hero { height: 420px; margin-bottom: 32px; }
.skeleton-line { height: 16px; }

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
`}</style>
        <article className="blog-detail">
          {/* Breadcrumb */}
          <nav className="container blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">&gt;</span>
            <Link href="/blog">Resources</Link>
            <span className="sep">&gt;</span>
            <Link href="/blog">Blog</Link>
            <span className="sep">&gt;</span>
            <span className="current">{blog.title}</span>
          </nav>

          {/* Header */}
          <header className="container blog-detail-header">
            <div className="header-container-inner">
              <h1>{blog.title}</h1>
              {blog.excerpt && <p className="excerpt-subtitle">{blog.excerpt}</p>}
              
              <div className="blog-detail-meta">
                {blog.author?.name && (
                  <div className="meta-author">
                    <AuthorAvatar name={blog.author.name} size="sm" />
                    <div className="author-info-block">
                      <span className="name">{blog.author.name}</span>
                      <span className="role">{authorInfo.title} · Jackson &amp; Frank</span>
                    </div>
                  </div>
                )}
                
                <div className="meta-stats">
                  <span className="meta-item">
                    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {formatBlogDate(blog.publish_date)}
                  </span>
                  {blog.estimated_reading_time && (
                    <span className="meta-item">
                      <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {blog.estimated_reading_time} min read
                    </span>
                  )}
                  <button className="meta-item btn-save" aria-label="Save Article">
                    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Hero image */}
          {blog.image_url && (
            <figure className="container blog-detail-hero">
              <img src={blog.image_url} alt={blog.title} />
            </figure>
          )}

          {/* Body & Sidebar Grid */}
          <div className="container blog-detail-body-wrap">
            <div className="blog-grid-layout">
              
              {/* Main Column */}
              <main className="blog-main-column">
                {/* Horizontal Table of Contents "In this article" circles */}
                {parsedToc.length > 0 && (
                  <div className="in-this-article">
                    <h3 className="toc-title">In this article</h3>
                    <div className="toc-circles-container">
                      {parsedToc.map((item, index) => (
                        <a key={index} href={item.href} className="toc-circle-card">
                          <div className="circle-num">{index + 1}</div>
                          <div className="circle-label">{item.text}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="blog-detail-body blog-content">
                  {blog.body ? (
                    <PortableText value={blog.body} components={ptComponents} />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
                  )}
                </div>

                {/* Bottom consultation Banner */}
                <div className="consultation-banner">
                  <div className="consultation-content">
                    <div className="consultation-icon-circle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <div className="consultation-text">
                      <h3>Ready to expand your business to Europe?</h3>
                      <p>Our experts can help you navigate every step of your expansion journey.</p>
                    </div>
                  </div>
                  <button className="btn-primary consultation-btn" onClick={openModal}>
                    Book a Consultation <span className="arrow">→</span>
                  </button>
                </div>
              </main>

              {/* Sticky Sidebar */}
              <aside className="blog-sidebar">
                
                {/* About the Author */}
                {blog.author?.name && (
                  <div className="sidebar-widget author-widget">
                    <h4 className="widget-title">About the Author</h4>
                    <div className="author-widget-body">
                      <div className="author-header-row">
                        <AuthorAvatar name={blog.author.name} size="md" />
                        <div className="author-meta-text">
                          <h5>{blog.author.name}</h5>
                          <span className="author-tagline">{authorInfo.title}</span>
                          <span className="author-corp">Jackson &amp; Frank</span>
                        </div>
                      </div>
                      <p className="author-bio">{authorInfo.bio}</p>
                      <Link href="/blog" className="widget-action-link">
                        View all posts <span className="arrow">→</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Share this article */}
                <div className="sidebar-widget share-widget">
                  <h4 className="widget-title">Share this article</h4>
                  <div className="share-buttons">
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="share-btn-round" aria-label="Share on LinkedIn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="share-btn-round" aria-label="Share on Twitter/X">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </a>
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="share-btn-round" aria-label="Share on Facebook">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href={shareLinks.email} className="share-btn-round" aria-label="Share via Email">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </a>
                  </div>
                </div>

                {/* Related Articles */}
                {sidebarRelated.length > 0 && (
                  <div className="sidebar-widget related-widget">
                    <h4 className="widget-title">Related Articles</h4>
                    <div className="related-vertical-list">
                      {sidebarRelated.map(post => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="related-item-row"
                        >
                          <div className="related-thumb-box">
                            {post.image_url ? (
                              <img
                                src={post.image_url}
                                alt={post.title}
                                loading="lazy"
                              />
                            ) : (
                              <div className="thumb-placeholder">JF</div>
                            )}
                          </div>
                          <div className="related-item-text">
                            <h5>{post.title}</h5>
                            <div className="related-item-meta-row">
                              <span>{formatBlogDate(post.publish_date)}</span>
                              <span className="dot">•</span>
                              <span>{post.estimated_reading_time || 5} min read</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stay Updated */}
                <div className="sidebar-widget newsletter-widget">
                  <h4 className="widget-title">Stay Updated</h4>
                  <div className="newsletter-widget-card">
                    <p>Subscribe to our newsletter for the latest insights.</p>
                    <form onSubmit={handleSubscribe} className="newsletter-inline-form">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={subscribeEmail}
                        onChange={(e) => setSubscribeEmail(e.target.value)}
                        aria-label="Email Address"
                      />
                      <button type="submit" className="submit-arrow-btn" aria-label="Subscribe">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </button>
                    </form>
                    {subscribeSuccess && (
                      <div className="subscribe-success-banner">
                        Thank you for subscribing!
                      </div>
                    )}
                  </div>
                </div>

              </aside>

            </div>
          </div>

          {/* Lead-capture modal */}
          <LeadModal
            open={modalOpen}
            title={`Talk to us about ${blog.title.length > 40 ? 'this topic' : blog.title}`}
            subtitle="Share your details and our team will get back to you within 24 hours."
            reason="general_inquiry"
            onClose={() => setModalOpen(false)}
          />
        </article>
      </>
    )
  }

  return null
}
