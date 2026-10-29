'use client'

import { Settings2 } from 'lucide-react'
import { openCookieSettings } from '@/lib/consent'

export function CookieSettingsButton({
  className,
  label = 'Configurar cookies',
}: {
  className?: string
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={
        className ??
        'inline-flex items-center justify-center gap-2 h-10 px-5 bg-[#158cca] hover:bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-[0.15em] transition-colors'
      }
    >
      <Settings2 size={14} />
      {label}
    </button>
  )
}
