'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { BarChart3, Check, Cookie, Settings2, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import {
  DEFAULT_CONSENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsent,
  saveConsent,
  type ConsentCategories,
} from '@/lib/consent'

type OptionalCategory = Exclude<keyof ConsentCategories, 'necessary'>

const OPTIONAL_COOKIES: {
  key: OptionalCategory
  title: string
  description: string
  icon: typeof BarChart3
}[] = [
  {
    key: 'preferences',
    title: 'Preferencias',
    description:
      'Permiten recordar ajustes como el idioma, la sede seleccionada o la última búsqueda realizada.',
    icon: SlidersHorizontal,
  },
  {
    key: 'analytics',
    title: 'Analíticas',
    description:
      'Nos ayudan a saber qué páginas se visitan más para mejorar el contenido. Se usan datos agregados y anónimos.',
    icon: BarChart3,
  },
]

export function CookieConsent() {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<'summary' | 'settings'>('summary')
  const [draft, setDraft] = useState<Omit<ConsentCategories, 'necessary'>>({
    preferences: DEFAULT_CONSENT.preferences,
    analytics: DEFAULT_CONSENT.analytics,
  })

  useEffect(() => {
    setIsMounted(true)

    const stored = readConsent()
    if (!stored) {
      setIsOpen(true)
    } else {
      setDraft({ preferences: stored.preferences, analytics: stored.analytics })
    }

    const handleOpenSettings = () => {
      const current = readConsent()
      setDraft({
        preferences: current?.preferences ?? false,
        analytics: current?.analytics ?? false,
      })
      setView('settings')
      setIsOpen(true)
    }

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings)
  }, [])

  const persist = useCallback((categories: Omit<ConsentCategories, 'necessary'>) => {
    saveConsent(categories)
    setIsOpen(false)
    setView('summary')
  }, [])

  const acceptAll = useCallback(() => {
    persist({ preferences: true, analytics: true })
  }, [persist])

  const rejectOptional = useCallback(() => {
    persist({ preferences: false, analytics: false })
  }, [persist])

  const toggleDraft = (key: OptionalCategory) => {
    setDraft((current) => ({ ...current, [key]: !current[key] }))
  }

  if (!isMounted || !isOpen) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-5 pointer-events-none"
      role="region"
      aria-label="Preferencias de cookies"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-3xl bg-[#0f172a] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        <div className="h-1 w-full bg-gradient-to-r from-[#158cca] via-[#a3c435] to-[#158cca]" />

        <div className="p-5 sm:p-6">
          {view === 'summary' ? (
            <>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 shrink-0 bg-[#158cca]/15 border border-[#158cca]/30 flex items-center justify-center">
                  <Cookie size={20} className="text-[#a3c435]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a3c435] mb-1">
                    Tu privacidad
                  </p>
                  <h2 className="text-white font-black uppercase tracking-tight text-base sm:text-lg leading-tight">
                    Usamos cookies en este sitio
                  </h2>
                </div>
              </div>

              <p className="text-[12px] sm:text-sm text-white/60 leading-relaxed font-medium mb-4">
                Utilizamos cookies necesarias para que el sitio funcione y, con tu permiso, cookies de
                preferencias y analíticas para mejorar tu experiencia. Puedes aceptarlas todas,
                rechazar las opcionales o elegir cuáles permitir. Más detalles en nuestra{' '}
                <Link href="/politica-cookies" className="text-[#a3c435] font-bold hover:underline">
                  Política de Cookies
                </Link>{' '}
                y{' '}
                <Link href="/politica-privacidad" className="text-[#a3c435] font-bold hover:underline">
                  Política de Privacidad
                </Link>
                .
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => setView('settings')}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 text-[10px] font-black uppercase tracking-[0.15em] transition-colors order-3 sm:order-1"
                >
                  <Settings2 size={14} />
                  Configurar
                </button>
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 text-[10px] font-black uppercase tracking-[0.15em] transition-colors order-2"
                >
                  Rechazar opcionales
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#158cca] hover:bg-[#a3c435] text-white font-black text-[10px] uppercase tracking-[0.15em] transition-colors order-1 sm:order-3"
                >
                  <Check size={14} />
                  Aceptar todas
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 shrink-0 bg-[#158cca]/15 border border-[#158cca]/30 flex items-center justify-center">
                  <Settings2 size={20} className="text-[#a3c435]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a3c435] mb-1">
                    Configuración
                  </p>
                  <h2 className="text-white font-black uppercase tracking-tight text-base sm:text-lg leading-tight">
                    Elige qué cookies permites
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-white/10 border border-white/10 mb-4">
                <div className="flex items-start gap-3 p-4">
                  <div className="w-8 h-8 shrink-0 bg-white/5 border border-white/10 flex items-center justify-center">
                    <ShieldCheck size={15} className="text-[#a3c435]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-black uppercase tracking-widest text-white">
                        Necesarias
                      </p>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#a3c435] border border-[#a3c435]/30 px-2 py-1 shrink-0">
                        Siempre activas
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed mt-1">
                      Permiten la navegación, la seguridad y el funcionamiento básico del sitio. No se
                      pueden desactivar.
                    </p>
                  </div>
                </div>

                {OPTIONAL_COOKIES.map((item) => {
                  const Icon = item.icon
                  const enabled = draft[item.key]
                  return (
                    <div key={item.key} className="flex items-start gap-3 p-4">
                      <div className="w-8 h-8 shrink-0 bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon size={15} className="text-[#158cca]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[11px] font-black uppercase tracking-widest text-white">
                            {item.title}
                          </p>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={enabled}
                            aria-label={`Cookies de ${item.title.toLowerCase()}`}
                            onClick={() => toggleDraft(item.key)}
                            className={`relative w-11 h-6 shrink-0 border transition-colors ${
                              enabled
                                ? 'bg-[#158cca] border-[#158cca]'
                                : 'bg-white/5 border-white/20'
                            }`}
                          >
                            <span
                              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 transition-all ${
                                enabled ? 'left-6 bg-white' : 'left-1 bg-white/50'
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-[11px] text-white/50 leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setView('summary')}
                  className="text-[10px] font-black uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors h-11 px-1 text-left"
                >
                  ← Volver
                </button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={rejectOptional}
                    className="inline-flex items-center justify-center h-11 px-5 border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 text-[10px] font-black uppercase tracking-[0.15em] transition-colors"
                  >
                    Rechazar opcionales
                  </button>
                  <button
                    type="button"
                    onClick={() => persist(draft)}
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#158cca] hover:bg-[#a3c435] text-white font-black text-[10px] uppercase tracking-[0.15em] transition-colors"
                  >
                    <Check size={14} />
                    Guardar preferencias
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
