// Contact form submission - posts to the live jacksonandfrank.com CMS API.
// Mirrors the payload shape used by jf_website_2.0 (snake_case fields).

const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined) ?? '/api/v1'

export interface ContactFormValues {
  first_name: string
  last_name: string
  work_email: string
  phone_number: string
  company_name: string
  help_reason: string
  message: string
}

export interface ContactSubmitResult {
  success: boolean
  error?: string
}

export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactSubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/contact-us`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) {
      return { success: false, error: `Request failed (${res.status}). Please try again.` }
    }
    return { success: true }
  } catch {
    return {
      success: false,
      error: 'Could not reach the server. Check your connection and try again.',
    }
  }
}

// Newsletter unsubscribe - used by /unsubscribe page.
export async function unsubscribeNewsletter(email: string): Promise<ContactSubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) return { success: false, error: `Request failed (${res.status}).` }
    return { success: true }
  } catch {
    return { success: false, error: 'Could not reach the server. Try again.' }
  }
}
