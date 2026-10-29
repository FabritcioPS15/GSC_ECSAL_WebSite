import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { SiGooglemaps, SiWaze } from 'react-icons/si'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  CENTROS,
  EVALUACIONES,
  FECHA_ACTUALIZACION,
  TARIFAS,
} from '@/lib/directorio'

export const dynamicParams = false

export function generateStaticParams() {
  return CENTROS.map((centro) => ({ id: centro.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const centro = CENTROS.find((item) => item.id === id)

  if (!centro) {
    return { title: 'Sede no encontrada | San Luis Medic' }
  }

  const url = `https://sanluismedic.pe/sedes/${centro.id}`

  return {
    title: `${centro.nombre} | Examen médico de brevete`,
    description: `Dirección, horario, tarifario y contacto de ${centro.nombre} en ${centro.distrito}, ${centro.ciudad}.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${centro.nombre} | Examen médico de brevete`,
      description: `Consulta el tarifario, horario y ubicación de ${centro.nombre}.`,
      url,
      locale: 'es_PE',
      type: 'website',
    },
  }
}

export default async function SedePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const centro = CENTROS.find((item) => item.id === id)

  if (!centro) notFound()

  const whatsappUrl = `https://wa.me/${centro.whatsapp}?text=${encodeURIComponent(
    `Hola San Luis Medic, deseo información sobre el examen médico de brevete en la sede ${centro.ciudad}.`
  )}`
  const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    centro.mapQuery
  )}`
  const wazeUrl = `https://waze.com/ul?ll=${centro.lat},${centro.lng}&navigate=yes`
  const tarifas = TARIFAS.map((tarifa) =>
    tarifa.titulo === 'Examen médico'
      ? { ...tarifa, precio: centro.precioExamen }
      : tarifa
  )
  const otrasSedes = CENTROS.filter((item) => item.id !== centro.id)

  return (
    <div className="w-full bg-white font-sans text-slate-900">
      <Navbar active="sedes" />

      <section className="relative overflow-hidden border-b border-slate-100 bg-[#0f172a] px-4 py-10 md:py-14">
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-1/4 translate-x-1/2 -skew-x-12 bg-[#158cca]/10"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#a3c435]">
              <span className="h-px w-8 bg-[#a3c435]" aria-hidden="true" />
              Sede {centro.ciudad}
              <span className="h-px w-8 bg-[#a3c435]" aria-hidden="true" />
            </p>

            <nav
              aria-label="Migas de pan"
              className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50"
            >
              <Link href="/" className="transition-colors hover:text-[#a3c435]">
                Inicio
              </Link>
              <ChevronRight size={10} aria-hidden="true" />
              <Link href="/sedes" className="transition-colors hover:text-[#a3c435]">
                Sedes
              </Link>
              <ChevronRight size={10} aria-hidden="true" />
              <span className="text-[#a3c435]">{centro.ciudad}</span>
            </nav>

            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl">
              {centro.nombre}
            </h1>
            <p className="mt-3 flex max-w-2xl items-start gap-2 text-sm font-normal leading-relaxed text-white/60 md:text-base">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[#a3c435]" aria-hidden="true" />
              <span>
                {centro.direccion} — {centro.distrito}, {centro.ciudad}
              </span>
            </p>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1176ab] px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
              >
                <FaWhatsapp size={18} aria-hidden="true" />
                Consultar por WhatsApp
              </a>
              <a
                href={mapaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
              >
                <Navigation size={17} aria-hidden="true" />
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <MapPin size={18} aria-hidden="true" />,
              titulo: 'Dirección',
              detalle: centro.direccion,
            },
            {
              icon: <Clock size={18} aria-hidden="true" />,
              titulo: 'Horario de atención',
              detalle: centro.horario,
            },
            {
              icon: <Banknote size={18} aria-hidden="true" />,
              titulo: 'Examen médico',
              detalle: `S/ ${centro.precioExamen}.00`,
            },
          ].map((item) => (
            <div key={item.titulo} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[#158cca]">
                {item.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0f172a]">{item.titulo}</p>
                <p className="text-xs font-normal leading-relaxed text-slate-500">
                  {item.detalle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="tarifario" className="border-b border-slate-100 bg-slate-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-[#0f172a] md:text-3xl">
              Tarifario de la sede {centro.ciudad}
            </h2>
            <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
              Precios vigentes en esta sede para el examen de aptitud psicosomática y duplicados de
              licencia.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {tarifas.map((tarifa) => (
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
            <Banknote size={18} className="mt-0.5 shrink-0 text-[#158cca]" aria-hidden="true" />
            <p>
              Los duplicados solo se emiten para usuarios que aprobaron su examen médico en este
              centro dentro de los últimos seis meses y cuyo certificado no haya sido utilizado
              previamente. Información actualizada en {FECHA_ACTUALIZACION}.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] md:text-3xl">
              Servicios en esta sede
            </h2>
            <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
              El examen médico incluye las siguientes evaluaciones, según el trámite que realices.
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {centro.servicios.map((servicio) => (
                <li
                  key={servicio}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-700"
                >
                  <Check size={16} className="shrink-0 text-[#a3c435]" aria-hidden="true" />
                  {servicio}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {EVALUACIONES.map((evaluacion) => (
                <div
                  key={evaluacion.titulo}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-[#0f172a]">
                      {evaluacion.titulo}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      {evaluacion.duracion}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-normal leading-relaxed text-slate-600">
                    {evaluacion.detalle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] md:text-3xl">
              Ubicación y contacto
            </h2>
            <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
              Abre la ruta en tu aplicación de mapas o comunícate directamente con esta sede.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="flex items-start gap-2 text-sm font-normal leading-relaxed text-slate-700">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#158cca]" aria-hidden="true" />
                <span>{centro.direccion}</span>
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm font-normal leading-relaxed text-slate-700">
                <Clock size={18} className="mt-0.5 shrink-0 text-[#158cca]" aria-hidden="true" />
                <span>{centro.horario}</span>
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <a
                  href={mapaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-sm font-semibold text-[#0f172a] transition-colors hover:border-[#158cca] hover:text-[#158cca]"
                >
                  <SiGooglemaps size={16} aria-hidden="true" />
                  Google Maps
                </a>
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-sm font-semibold text-[#0f172a] transition-colors hover:border-[#158cca] hover:text-[#158cca]"
                >
                  <SiWaze size={16} aria-hidden="true" />
                  Waze
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1176ab] text-sm font-semibold text-white transition-colors hover:bg-[#0f172a] sm:col-span-2"
                >
                  <FaWhatsapp size={17} aria-hidden="true" />
                  Escribir por WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Otras sedes
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {otrasSedes.map((sede) => (
                  <Link
                    key={sede.id}
                    href={`/sedes/${sede.id}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-[#0f172a] transition-colors hover:border-[#158cca] hover:text-[#158cca]"
                  >
                    <span>{sede.nombre}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1176ab] px-4 py-12 md:py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              ¿Listo para tu examen en {centro.ciudad}?
            </h2>
            <p className="mt-2 max-w-xl text-sm font-normal leading-relaxed text-slate-300">
              Escríbenos por WhatsApp y confirma disponibilidad, requisitos y horarios de atención.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#0f172a] px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
          >
            <FaWhatsapp size={18} aria-hidden="true" />
            Agendar por WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
