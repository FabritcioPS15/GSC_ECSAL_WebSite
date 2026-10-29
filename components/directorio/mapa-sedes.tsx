'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import type { Centro } from '@/lib/directorio'

// Corrección de los íconos por defecto de Leaflet en Next.js
const defaultMarkerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Ícono personalizado destacado (color corporativo)
const brandMarkerIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `
    <div style="
      background-color: #1176ab;
      width: 34px;
      height: 34px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      border: 2px solid #ffffff;
    ">
      <div style="
        transform: rotate(45deg);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
})

// Componente para ajustar dinámicamente los límites del mapa según los centros filtrados
function FitBounds({ centros }: { centros: Centro[] }) {
  const map = useMap()

  useEffect(() => {
    if (!centros.length) return

    if (centros.length === 1) {
      map.flyTo([centros[0].lat, centros[0].lng], 15, { duration: 1 })
    } else {
      const bounds = L.latLngBounds(centros.map((c) => [c.lat, c.lng]))
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
    }
  }, [centros, map])

  return null
}

// Fuerza el recálculo del tamaño del contenedor tras el montaje
function InvalidateSize() {
  const map = useMap()

  useEffect(() => {
    let raf1: number
    let raf2: number
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        map.invalidateSize()
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [map])

  return null
}

interface MapaSedesProps {
  centros: Centro[]
  sedeSeleccionadaId?: string
  className?: string
  zoom?: number
  height?: string
}

export default function MapaSedes({
  centros,
  sedeSeleccionadaId,
  className = '',
  zoom = 6,
  height = '480px',
}: MapaSedesProps) {
  // Centro aproximado de Perú para vista general
  const centroPorDefecto: [number, number] = centros.length === 1 
    ? [centros[0].lat, centros[0].lng]
    : [-12.5, -75.0]

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm ${className}`}
      style={{ height }}
    >
      <MapContainer
        center={centroPorDefecto}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <InvalidateSize />
        <FitBounds centros={centros} />

        {centros.map((centro) => (
          <Marker
            key={centro.id}
            position={[centro.lat, centro.lng]}
            icon={centro.id === sedeSeleccionadaId ? brandMarkerIcon : defaultMarkerIcon}
          >
            <Popup className="custom-popup" minWidth={240}>
              <div className="p-1">
                <span className="inline-block rounded bg-[#1176ab]/10 px-2 py-0.5 text-[11px] font-semibold text-[#1176ab]">
                  {centro.ciudad}
                </span>
                <h4 className="mt-1.5 text-sm font-bold text-slate-900 leading-snug">
                  {centro.nombre}
                </h4>

                <p className="mt-2 flex items-start gap-1.5 text-xs text-slate-600 leading-normal">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#158cca]" />
                  <span>{centro.direccion}</span>
                </p>

                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-600">
                  <Clock size={14} className="shrink-0 text-[#158cca]" />
                  <span>{centro.horario}</span>
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <span className="text-xs font-semibold text-[#0f172a]">
                    Examen: S/ {centro.precioExamen}
                  </span>
                  <Link
                    href={`/sedes/${centro.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1176ab] hover:underline"
                  >
                    Ver sede <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

