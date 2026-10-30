'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  CalendarCheck,
  Check,
  ChevronRight,
  Clock,
  Ear,
  Eye,
  FlaskConical,
  Info,
  MapPin,
  MessageSquareWarning,
  Search,
  Stethoscope,
  Brain,
  X,
  Map as MapIcon,
  LayoutGrid,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CentroCard } from '@/components/directorio/centro-card'

const MapaSedes = dynamic(() => import('@/components/directorio/mapa-sedes'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#1176ab]" />
        <span className="text-xs font-medium text-slate-500">Cargando mapa...</span>
      </div>
    </div>
  ),
})
import {
  CENTROS,
  CIUDADES,
  EVALUACIONES,
  FECHA_ACTUALIZACION,
  TARIFAS,
} from '@/lib/directorio'

const ICONOS_EVALUACION = [
  <CalendarCheck size={20} key="matricula" />,
  <FlaskConical size={20} key="laboratorio" />,
  <Brain size={20} key="psicologia" />,
  <Eye size={20} key="oftalmologia" />,
  <Ear size={20} key="otorrino" />,
  <Stethoscope size={20} key="medicina" />,
]

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function Directorio() {
  const [query, setQuery] = useState('')
  const [ciudad, setCiudad] = useState('todas')
  const [soloSabado, setSoloSabado] = useState(false)
  const [vista, setVista] = useState<'cuadricula' | 'mapa'>('cuadricula')

  useEffect(() => {
    const busquedaInicial = new URLSearchParams(window.location.search).get('q')
    if (busquedaInicial) setQuery(busquedaInicial)
  }, [])

  const resultados = useMemo(() => {
    const busqueda = normalizar(query.trim())

    return CENTROS.filter((centro) => {
      const coincideCiudad = ciudad === 'todas' || centro.ciudad === ciudad
      const coincideSabado = !soloSabado || centro.abreSabado
      const coincideBusqueda =
        busqueda.length === 0 ||
        [
          centro.nombre,
          centro.ciudad,
          centro.distrito,
          centro.direccion,
          centro.servicios.join(' '),
        ].some((valor) => normalizar(valor).includes(busqueda))

      return coincideCiudad && coincideSabado && coincideBusqueda
    })
  }, [query, ciudad, soloSabado])

  const hayFiltros = query.trim().length > 0 || ciudad !== 'todas' || soloSabado

  const limpiarFiltros = () => {
    setQuery('')
    setCiudad('todas')
    setSoloSabado(false)
  }

  return (
    <div className="w-full bg-white font-sans text-slate-900">
      <Navbar active="sedes" />

      <section className="bg-[#0f172a] py-10 md:py-14 px-4 overflow-hidden relative">
        <div
          className="absolute top-0 right-0 w-1/4 h-full bg-[#158cca]/10 -skew-x-12 translate-x-1/2"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12 }}
          >
            <div className="text-xs text-[#a3c435] font-bold mb-2 uppercase tracking-[0.3em] flex items-center gap-2 justify-start">
              <span className="w-8 h-px bg-[#a3c435]"></span>
              SEDES Y POLICLÍNICOS
              <span className="w-8 h-px bg-[#a3c435]"></span>
            </div>
            <div className="flex items-center justify-start gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-white/40">
              <Link href="/" className="hover:text-[#a3c435] transition-colors">
                Inicio
              </Link>
              <ChevronRight size={10} />
              <span className="text-[#a3c435]">Sedes</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
              Encuentra sedes para tu <span className="text-[#158cca]">examen médico</span> de
              brevete
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl font-medium">
              Consulta sedes disponibles, precios publicados, horarios, servicios y medios de
              contacto para realizar tu examen de aptitud psicosomática.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-4 py-6">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: <MapPin size={18} aria-hidden="true" />,
              titulo: 'Sedes con dirección publicada',
              detalle: 'Ubicaciones y referencias para llegar.',
            },
            {
              icon: <Check size={18} aria-hidden="true" />,
              titulo: 'Precio del examen visible',
              detalle: 'Tarifa publicada de S/ 130.00.',
            },
            {
              icon: <Clock size={18} aria-hidden="true" />,
              titulo: 'Horarios y contacto directo',
              detalle: 'Teléfono y WhatsApp por sede.',
            },
          ].map((item) => (
            <div key={item.titulo} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[#158cca]">
                {item.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0f172a]">{item.titulo}</p>
                <p className="text-xs font-normal text-slate-500">{item.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="resultados" className="scroll-mt-28 px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="mb-8 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:flex-row"
          >
            <div className="relative flex-1">
              <label htmlFor="buscar-centro" className="sr-only">
                Buscar por distrito, ciudad o nombre del policlínico
              </label>
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="buscar-centro"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busca por distrito, ciudad o nombre"
                className="h-12 w-full rounded-md border border-transparent bg-slate-50 pl-11 pr-4 text-sm font-normal text-[#0f172a] placeholder:text-slate-400 focus:border-[#158cca] focus:outline-none focus:ring-2 focus:ring-[#158cca]/40"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1176ab] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
            >
              <Search size={17} aria-hidden="true" />
              Buscar sedes
            </button>
          </form>

          <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#0f172a] md:text-4xl">
                Sedes disponibles
              </h2>
              <p className="mt-1 text-base font-normal text-slate-600" aria-live="polite">
                {resultados.length} de {CENTROS.length} sedes encontradas
                {hayFiltros ? ' con los filtros aplicados' : ''}.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div>

                <select
                  id="filtro-ciudad"
                  value={ciudad}
                  onChange={(event) => setCiudad(event.target.value)}
                  className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-normal text-[#0f172a] focus:border-[#158cca] focus:outline-none focus:ring-2 focus:ring-[#158cca]/30 sm:w-44"
                >
                  <option value="todas">Todas las sedes</option>
                  {CIUDADES.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              </div>
              {hayFiltros && (
                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-semibold text-[#0f172a] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
                >
                  <X size={15} aria-hidden="true" />
                  Limpiar filtros
                </button>
              )}

              <div className="flex items-center rounded-md border border-slate-300 bg-slate-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setVista('cuadricula')}
                  className={`inline-flex h-10 items-center gap-1.5 rounded px-3 text-xs font-semibold transition-all ${
                    vista === 'cuadricula'
                      ? 'bg-white text-[#1176ab] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Ver en cuadrícula"
                >
                  <LayoutGrid size={15} />
                  <span>Tarjetas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVista('mapa')}
                  className={`inline-flex h-10 items-center gap-1.5 rounded px-3 text-xs font-semibold transition-all ${
                    vista === 'mapa'
                      ? 'bg-white text-[#1176ab] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Ver en mapa interactivo"
                >
                  <MapIcon size={15} />
                  <span>Mapa</span>
                </button>
              </div>
            </div>
          </div>

          {resultados.length > 0 ? (
            vista === 'cuadricula' ? (
              <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
                {resultados.map((centro) => (
                  <CentroCard key={centro.id} centro={centro} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <MapaSedes centros={resultados} height="520px" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {resultados.map((centro) => (
                    <div
                      key={centro.id}
                      className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-[#158cca]"
                    >
                      <span className="rounded bg-[#1176ab]/10 px-2 py-0.5 text-[10px] font-semibold text-[#1176ab]">
                        {centro.ciudad}
                      </span>
                      <h4 className="mt-1 font-semibold text-slate-900 text-sm">
                        {centro.nombre}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                        {centro.direccion}
                      </p>
                      <Link
                        href={`/sedes/${centro.id}`}
                        className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#1176ab] hover:underline"
                      >
                        Ver detalles completos &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <Search size={28} className="mx-auto mb-3 text-slate-400" aria-hidden="true" />
              <h3 className="text-lg md:text-xl font-semibold text-[#0f172a]">
                No encontramos sedes con esos criterios
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm font-normal text-slate-600">
                Prueba con otra ciudad o distrito. También puedes limpiar los filtros para ver
                todas las sedes disponibles.
              </p>
              <button
                type="button"
                onClick={limpiarFiltros}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-[#1176ab] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-2 border-t border-slate-100 pt-5 text-xs font-normal text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Información actualizada en {FECHA_ACTUALIZACION}.</p>
            <a
              href="mailto:info@sanluismedic.pe?subject=Reportar%20datos%20del%20directorio"
              className="inline-flex items-center gap-1.5 font-medium text-[#0f172a] underline-offset-2 hover:text-[#1176ab] hover:underline"
            >
              <MessageSquareWarning size={14} aria-hidden="true" />
              Reportar datos incorrectos
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-[#0f172a] md:text-4xl">
              Tarifario de referencia
            </h2>
            <p className="mt-2 text-base font-normal leading-relaxed text-slate-600">
              El examen médico tiene una tarifa única para nuevos trámites, revalidación, canje
              extranjero y recategorización de licencias de moto y carro.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {TARIFAS.map((tarifa) => (
              <div
                key={tarifa.titulo}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <p className="text-sm font-semibold text-[#0f172a]">{tarifa.titulo}</p>
                <p className="mt-3 text-2xl font-bold text-[#0f172a]">
                  S/ {tarifa.precio}.00
                </p>
                <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
                  {tarifa.detalle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-4 text-sm font-normal leading-relaxed text-slate-600">
            <Info size={18} className="mt-0.5 shrink-0 text-[#158cca]" aria-hidden="true" />
            <p>
              Los duplicados solo se emiten para usuarios que aprobaron su examen médico en el
              centro dentro de los últimos seis meses y cuyo certificado no haya sido utilizado
              previamente.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-[#0f172a] md:text-4xl">
              Cómo es el examen médico
            </h2>
            <p className="mt-2 text-base font-normal leading-relaxed text-slate-600">
              El proceso incluye las siguientes etapas. La duración indicada corresponde al tiempo
              de cada evaluación.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EVALUACIONES.map((evaluacion, index) => (
              <div
                key={evaluacion.titulo}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[#158cca]">
                    {ICONOS_EVALUACION[index]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {evaluacion.duracion}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0f172a]">
                  {evaluacion.titulo}
                </h3>
                <p className="mt-1.5 text-sm font-normal leading-relaxed text-slate-600">
                  {evaluacion.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-[#0f172a] px-4 py-12 md:py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              ¿Necesitas ayuda para elegir una sede?
            </h2>
            <p className="mt-2 max-w-xl text-base font-normal leading-relaxed text-slate-300">
              Escríbenos y te orientamos sobre disponibilidad, requisitos y horarios de atención.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#1176ab] px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
          >
            Contactar con un asesor
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
