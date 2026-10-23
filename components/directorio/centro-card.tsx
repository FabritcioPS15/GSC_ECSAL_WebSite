'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Banknote,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import type { Centro } from '@/lib/directorio'

interface CentroCardProps {
  centro: Centro
}

export function CentroCard({ centro }: CentroCardProps) {
  const [abierto, setAbierto] = useState(false)
  const detalleId = `detalle-${centro.id}`
  const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centro.mapQuery)}`
  const whatsappUrl = `https://wa.me/${centro.whatsapp}?text=${encodeURIComponent(
    `Hola San Luis Medic, deseo información sobre el examen médico de brevete en la sede ${centro.ciudad}.`
  )}`

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md md:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            <MapPin size={13} aria-hidden="true" />
            {centro.distrito}, {centro.ciudad}
          </span>
          <h3 className="text-lg font-semibold leading-snug text-[#0f172a] md:text-xl">
            {centro.nombre}
          </h3>
        </div>
      </div>

      <p className="mb-4 flex items-start gap-2 text-sm font-normal leading-relaxed text-slate-600">
        <MapPin size={16} className="mt-0.5 shrink-0 text-[#158cca]" aria-hidden="true" />
        <span>{centro.direccion}</span>
      </p>

      <div className="mb-4 flex items-end justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Banknote size={14} aria-hidden="true" />
            Examen médico
          </p>
          <p className="mt-0.5 text-2xl font-bold leading-none text-[#0f172a]">
            S/ {centro.precioExamen}.00
          </p>
        </div>
        <span className="rounded-full bg-[#a3c435]/15 px-2.5 py-1 text-xs font-medium text-[#0f172a]">
          Precio publicado
        </span>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-slate-500">Servicios disponibles</p>
        <ul className="flex flex-wrap gap-1.5">
          {centro.servicios.slice(0, 3).map((servicio) => (
            <li
              key={servicio}
              className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600"
            >
              {servicio}
            </li>
          ))}
          <li className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600">
            +{centro.servicios.length - 3} más
          </li>
        </ul>
      </div>

      <p className="mb-5 flex items-start gap-2 text-sm font-normal leading-relaxed text-slate-600">
        <Clock size={16} className="mt-0.5 shrink-0 text-[#158cca]" aria-hidden="true" />
        <span>{centro.horario}</span>
      </p>

      <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-4">
        <Link
          href={`/sedes/${centro.id}`}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#1176ab] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
        >
          Ver página de la sede
          <ArrowRight size={16} aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={() => setAbierto((valor) => !valor)}
          aria-expanded={abierto}
          aria-controls={detalleId}
          className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#158cca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
        >
          {abierto ? 'Ocultar detalles' : 'Ver detalles de contacto'}
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${abierto ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        <div className="grid grid-cols-3 gap-2">
          <a
            href={mapaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-xs font-semibold text-[#0f172a] transition-colors hover:border-[#158cca] hover:text-[#158cca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
          >
            <Navigation size={16} aria-hidden="true" />
            Cómo llegar
          </a>
          <a
            href={centro.telefonoHref}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-xs font-semibold text-[#0f172a] transition-colors hover:border-[#158cca] hover:text-[#158cca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
          >
            <Phone size={16} aria-hidden="true" />
            Llamar
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Contactar por WhatsApp con ${centro.nombre}`}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-xs font-semibold text-[#0f172a] transition-colors hover:border-[#158cca] hover:text-[#158cca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
          >
            <FaWhatsapp size={16} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>

      {abierto && (
        <div id={detalleId} className="mt-4 space-y-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs font-medium text-slate-500">Teléfono</p>
            <a
              href={centro.telefonoHref}
              className="text-sm font-semibold text-[#0f172a] underline-offset-2 hover:underline"
            >
              {centro.telefono}
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-slate-500">Servicios disponibles</p>
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {centro.servicios.map((servicio) => (
                <li
                  key={servicio}
                  className="flex items-center gap-2 text-sm font-normal text-slate-600"
                >
                  <Check size={15} className="shrink-0 text-[#a3c435]" aria-hidden="true" />
                  {servicio}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs font-normal leading-relaxed text-slate-500">
            La dirección y el horario mostrados corresponden a la información publicada por el
            centro. Confirma la disponibilidad antes de asistir.
          </p>
        </div>
      )}
    </article>
  )
}
