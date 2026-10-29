'use client'

import dynamic from 'next/dynamic'
import type { Centro } from '@/lib/directorio'

const MapaSedesInternal = dynamic(
  () => import('@/components/directorio/mapa-sedes'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[260px] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-400">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-[#1176ab]" />
          <span className="text-xs font-medium text-slate-500">Cargando mapa...</span>
        </div>
      </div>
    ),
  }
)

interface MapaSedeClientProps {
  centros: Centro[]
  sedeSeleccionadaId?: string
  height?: string
  zoom?: number
}

export default function MapaSedeClient(props: MapaSedeClientProps) {
  return <MapaSedesInternal {...props} />
}

