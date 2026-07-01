// Blog content sanitizers - applied to CMS HTML at render time.
// Ports the same logic from jf_website_2.0/lib/utils/blog.utils.ts so legacy
// CMS posts render with correct alt text and up-to-date stats.

/**
 * Inject a fallback alt attribute into any <img> tag in HTML that doesn't have one.
 * Protects CMS-authored blog HTML from failing SEO/accessibility audits when
 * authors forget to fill in alt text.
 */
export function ensureImageAlt(html: string, fallbackAlt: string): string {
  const safeAlt = fallbackAlt.replace(/"/g, '&quot;')
  return html.replace(
    /<img\b(?![^>]*\salt=)([^>]*?)\/?>/gi,
    (_m, attrs) => `<img${attrs} alt="${safeAlt}">`
  )
}

// CMS authors typically wrap each number in <strong>…</strong>. The patterns
// below treat those tags as OPTIONAL so they match whether or not the post
// uses bold formatting. The replacement always emits <strong> for consistent
// visual styling across all blogs.
const S_OPEN = '(?:<strong\\b[^>]*>\\s*)?'
const S_CLOSE = '(?:\\s*</strong>)?'

const STAT_CORRECTIONS: ReadonlyArray<{ pattern: RegExp; replacement: string }> = [
  // Footer sentence variants - "300+ companies, and 1,000+ employees across 15+ countries"
  {
    pattern: new RegExp(
      `${S_OPEN}700\\s*\\+\\s*companies${S_CLOSE}\\s*,\\s*and\\s+${S_OPEN}1[,.]?000\\s*\\+\\s*employees${S_CLOSE}\\s+across\\s+${S_OPEN}15\\s*\\+\\s*countries${S_CLOSE}`,
      'gi'
    ),
    replacement:
      '<strong>700+ companies</strong>, and <strong>2,000+ employees</strong> across <strong>12+ countries</strong>',
  },
  {
    pattern: new RegExp(
      `${S_OPEN}700\\s*\\+\\s*companies${S_CLOSE}\\s*,\\s*and\\s+${S_OPEN}1[,.]?400\\s*\\+\\s*employees${S_CLOSE}\\s+across\\s+${S_OPEN}15\\s*\\+\\s*countries${S_CLOSE}`,
      'gi'
    ),
    replacement:
      '<strong>700+ companies</strong>, and <strong>2,000+ employees</strong> across <strong>12+ countries</strong>',
  },
  // "Employ talent in 15+ countries through our own offices"
  {
    pattern: new RegExp(
      `Employ\\s+talent\\s+in\\s+${S_OPEN}15\\s*\\+\\s*countries${S_CLOSE}\\s+through\\s+our\\s+own\\s+offices?`,
      'gi'
    ),
    replacement: 'Employ talent in <strong>12+ countries</strong> through our own offices',
  },
]

export function applyStatCorrections(html: string): string {
  if (!html) return html
  return STAT_CORRECTIONS.reduce(
    (out, { pattern, replacement }) => out.replace(pattern, replacement),
    html
  )
}

/**
 * Convert all <h1> tags in CMS HTML to <h2> so the page has a single H1
 * (rendered separately by the page header from blog.title).
 */
export function demoteBodyH1s(html: string): string {
  return html.replace(/<h1(\s[^>]*)?>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>')
}

/**
 * Format an ISO date string for blog display (e.g. "April 21, 2026").
 */
export function formatBlogDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
