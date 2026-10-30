'use client'

import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, CircleMarker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { SiGooglemaps, SiWaze } from 'react-icons/si'
import { motion } from 'framer-motion'

const sedesCoords: [number, number][] = [
  [-11.988863, -77.057482],
  [-13.651203637235811, -73.36337728787365],
  [-13.156021376519789, -74.21794367539681],
]

const sedesData = [
  {
    name: 'Sede Lima (Izaguirre)',
    address: 'Av. Carlos Izaguirre 108, Independencia 15311',
    whatsapp: '966 600 891',
    hours: 'Lun-Sáb: 8am - 6pm',
    mapQuery: 'Av. Carlos Izaguirre 108, Independencia',
  },
  {
    name: 'Sede Andahuaylas',
    address: 'Jr. Alfonso Ugarte N.º. 354 frente ex Ugel Andahuaylas',
    whatsapp: '941 971 060',
    hours: 'Lun-Sáb: 9am - 6pm',
    mapQuery: 'Jr. Alfonso Ugarte N.º. 354 frente ex Ugel Andahuaylas',
  },
  {
    name: 'Sede Ayacucho',
    address: 'Jr. José Santos Chocano N°410, Jesús Nazareno-Huamanga-Ayacucho',
    whatsapp: '947 992 807',
    hours: 'Lun-Vie: 8am - 5pm',
    mapQuery: 'Jr. José Santos Chocano N°410, Jesús Nazareno-Huamanga-Ayacucho',
  },
]

const createCustomIcon = () =>
  L.divIcon({
    className: '',
    html: `<div style="position:relative;width:42px;height:54px;filter:drop-shadow(0 4px 4px rgba(0,0,0,0.3))">
            <svg width="42" height="54" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 13.54 12 22 12 22C12 22 20 13.54 20 8C20 3.58 16.42 0 12 0Z" fill="#158cca"/>
              <circle cx="12" cy="8" r="6" fill="white"/>
            </svg>
            <div style="position:absolute;top:4px;left:10px;width:22px;height:22px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:50%">
              <img src="/PinSLM.webp" style="width:80%;height:auto;object-fit:contain" alt="SLM" />
            </div>
           </div>`,
    iconSize: [42, 54],
    iconAnchor: [21, 54],
  })

// ─── Controladores internos del mapa ─────────────────────────────────────────

/**
 * Usa requestAnimationFrame (no setTimeout) para garantizar que
 * invalidateSize se ejecuta DESPUÉS del primer pintado real del
 * navegador, momento en que el contenedor ya tiene dimensiones reales.
 */
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

/**
 * Vuela al centro de la sede seleccionada.
 * Ignora el efecto en el primer montaje (la posición inicial ya
 * está en el prop `center` del MapContainer).
 */
function MapRecenter({ coords }: { coords: [number, number] }) {
  const map = useMap()
  const isMounted = useRef(false)
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return }
    map.flyTo(coords, 16, { duration: 0.8 })
  }, [coords, map])
  return null
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function MapSection() {
  const [selectedSede, setSelectedSede] = useState(0)
  const [icon, setIcon] = useState<L.DivIcon | null>(null)

  useEffect(() => { setIcon(createCustomIcon()) }, [])

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Columna del mapa — overflow-hidden para contener el mapa,
          height explícito con px para que Leaflet lo mida correctamente */}
      <div
        className="lg:col-span-2 border border-slate-100 shadow-xl relative z-0 overflow-hidden"
        style={{ height: '500px' }}
      >
        <MapContainer
          center={sedesCoords[0]}
          zoom={16}
          scrollWheelZoom={false}
          attributionControl={false}
          // height/width en style inline — es lo que Leaflet lee directamente del DOM
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'
            maxZoom={19}
          />

          <InvalidateSize />
          <MapRecenter coords={sedesCoords[selectedSede]} />

          {sedesCoords.map((coords, index) => {
            if (index === selectedSede && icon) {
              return <Marker key={`mk-${index}`} position={coords} icon={icon} />
            }
            return (
              <CircleMarker
                key={`cm-${index}`}
                center={coords}
                radius={8}
                eventHandlers={{ click: () => setSelectedSede(index) }}
                pathOptions={{
                  fillColor: '#a3c435',
                  color: '#fff',
                  weight: 2,
                  opacity: 0.9,
                  fillOpacity: 0.8,
                }}
              />
            )
          })}
        </MapContainer>
      </div>

      {/* Columna de información */}
      <div className="flex flex-col gap-4">
        {sedesData.map((sede, idx) => (
          <motion.div
            key={idx}
            onClick={() => setSelectedSede(idx)}
            className={`p-4 md:p-5 cursor-pointer border transition-all duration-300 ${
              selectedSede === idx
                ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-lg translate-x-2'
                : 'bg-white border-slate-100 text-slate-600 hover:border-[#158cca]/30'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3
                className={`font-bold uppercase tracking-widest text-[11px] ${
                  selectedSede === idx ? 'text-[#a3c435]' : 'text-slate-900'
                }`}
              >
                {sede.name}
              </h3>
              {selectedSede === idx && (
                <div className="w-2 h-2 bg-[#a3c435] rounded-full" />
              )}
            </div>

            {selectedSede === idx ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12 }}
                className="space-y-3 mt-3"
              >
                <div className="text-xs opacity-80 flex gap-2">
                  <MapPin size={14} className="shrink-0 mt-0.5" />
                  <span>{sede.address}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${sedesCoords[idx][0]},${sedesCoords[idx][1]}`}
                    target="_blank" rel="noreferrer" title="Abrir en Google Maps"
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center py-2.5 border border-white/20 transition-colors"
                  >
                    <SiGooglemaps size={16} />
                  </a>
                  <a
                    href={`https://waze.com/ul?ll=${sedesCoords[idx][0]},${sedesCoords[idx][1]}&navigate=yes`}
                    target="_blank" rel="noreferrer" title="Abrir en Waze"
                    className="flex-1 bg-[#33ccff]/20 hover:bg-[#33ccff]/40 text-white flex items-center justify-center py-2.5 border border-[#33ccff]/30 transition-colors"
                  >
                    <SiWaze size={16} />
                  </a>
                  <a
                    href={`https://wa.me/51${sede.whatsapp.replace(/\s/g, '')}`}
                    target="_blank" rel="noreferrer" title="Contactar por WhatsApp"
                    className="flex-1 bg-[#25D366]/20 hover:bg-[#25D366]/40 text-white flex items-center justify-center py-2.5 border border-[#25D366]/30 transition-colors"
                  >
                    <FaWhatsapp size={16} />
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="text-[9px] uppercase font-bold tracking-tight opacity-50">
                Ver detalles y ubicación
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
