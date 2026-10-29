export const CONSENT_STORAGE_KEY = 'slm_cookie_consent'
export const CONSENT_VERSION = 1

export const CONSENT_CHANGED_EVENT = 'slm:cookie-consent-changed'
export const OPEN_COOKIE_SETTINGS_EVENT = 'slm:open-cookie-settings'

export type ConsentCategories = {
  necessary: true
  preferences: boolean
  analytics: boolean
}

export type ConsentRecord = ConsentCategories & {
  version: number
  updatedAt: string
}

export const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true,
  preferences: false,
  analytics: false,
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<ConsentRecord>
    if (parsed.version !== CONSENT_VERSION) return null

    return {
      necessary: true,
      preferences: parsed.preferences === true,
      analytics: parsed.analytics === true,
      version: CONSENT_VERSION,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function saveConsent(categories: Omit<ConsentCategories, 'necessary'>): ConsentRecord {
  const record: ConsentRecord = {
    necessary: true,
    preferences: categories.preferences,
    analytics: categories.analytics,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Storage may be unavailable (private mode); consent still applies to this session.
  }

  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT))
  return record
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true
}

export function openCookieSettings() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))
}
