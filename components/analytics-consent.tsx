'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { CONSENT_CHANGED_EVENT, hasAnalyticsConsent } from '@/lib/consent'

export function AnalyticsConsent() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const sync = () => setEnabled(hasAnalyticsConsent())

    sync()
    window.addEventListener(CONSENT_CHANGED_EVENT, sync)
    window.addEventListener('storage', sync)

    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (!enabled) return null

  return <Analytics />
}
