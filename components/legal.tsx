import Link from 'next/link'
import { CalendarDays, ChevronRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LEGAL_ENTITY, LEGAL_PAGES } from '@/lib/legal'

export type LegalNavItem = {
  id: string
  label: string
}

type LegalPageProps = {
  eyebrow: string
  title: string
  highlight: string
  description: string
  breadcrumb: string
  nav: LegalNavItem[]
  children: React.ReactNode
}

export function LegalPage({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumb,
  nav,
  children,
}: LegalPageProps) {
  const related = LEGAL_PAGES.filter((page) => page.label !== breadcrumb)

  return (
    <div className="w-full bg-white font-sans text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0f172a] py-10 md:py-14 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#158cca]/10 -skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#a3c435]/5 rounded-full blur-[80px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-xs text-[#a3c435] font-bold mb-2 uppercase tracking-[0.3em] flex items-center gap-2 justify-start">
            <span className="w-8 h-px bg-[#a3c435]" />
            {eyebrow}
          </div>
          <div className="flex items-center justify-start gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-[#a3c435] transition-colors">Inicio</Link>
            <ChevronRight size={10} />
            <span className="text-[#a3c435]">{breadcrumb}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
            {title} <span className="text-[#158cca]">{highlight}</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-2xl font-medium">
            {description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            <CalendarDays size={13} className="text-[#a3c435]" />
            Última actualización: {LEGAL_ENTITY.updated}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-10 xl:gap-16 items-start">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="border border-slate-200 bg-slate-50">
              <div className="bg-[#0f172a] px-5 py-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#a3c435]" />
                  Contenido
                </h2>
              </div>
              <nav className="p-3">
                <ol className="space-y-1">
                  {nav.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-start gap-3 px-2 py-2 text-[12px] font-bold text-slate-500 hover:text-[#158cca] transition-colors leading-snug"
                      >
                        <span className="text-[10px] font-black text-[#a3c435] tabular-nums mt-0.5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <div className="bg-[#0f172a] p-6 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#158cca]/20 rounded-full blur-2xl" />
              <h3 className="text-white font-black uppercase tracking-tight text-sm mb-1">¿Tienes dudas?</h3>
              <p className="text-white/50 text-[11px] font-medium leading-relaxed mb-4">
                Escríbenos y te responderemos en horario de atención.
              </p>
              <ul className="space-y-3 text-[11px] font-bold text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin size={13} className="text-[#a3c435] shrink-0 mt-0.5" />
                  <span>{LEGAL_ENTITY.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={13} className="text-[#a3c435] shrink-0" />
                  <a href={`mailto:${LEGAL_ENTITY.email}`} className="hover:text-[#a3c435] transition-colors break-all">
                    {LEGAL_ENTITY.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={13} className="text-[#a3c435] shrink-0" />
                  <a href="tel:+5116429971" className="hover:text-[#a3c435] transition-colors">
                    {LEGAL_ENTITY.phone}
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* Body */}
          <div className="min-w-0">
            <div className="border-l-4 border-[#a3c435] bg-slate-50 px-5 py-4 mb-10">
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Este documento es parte de la información legal de {LEGAL_ENTITY.name}. Al utilizar
                nuestro sitio web y nuestros servicios aceptas las condiciones aquí descritas.
              </p>
            </div>

            <div className="space-y-10">{children}</div>

            {/* Related documents */}
            <div className="mt-16 pt-10 border-t border-slate-200">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                Otros documentos legales
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group border border-slate-200 hover:border-[#158cca] bg-white p-5 transition-colors"
                  >
                    <span className="block text-[10px] font-black uppercase tracking-widest text-[#158cca] mb-2">
                      {page.label}
                    </span>
                    <span className="block text-[11px] text-slate-500 leading-relaxed mb-4">
                      {page.description}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-[#158cca] transition-colors">
                      Leer más <ChevronRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-[11px] font-black text-[#158cca] tabular-nums mt-1 shrink-0">
          {String(number).padStart(2, '0')}
        </span>
        <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-[#0f172a] leading-tight">
          {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-9 space-y-4 text-sm md:text-[15px] leading-relaxed text-slate-600 [&_strong]:font-bold [&_strong]:text-slate-900">
        {children}
      </div>
    </section>
  )
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-[9px] w-1.5 h-1.5 bg-[#a3c435] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalSubsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-900">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

export function LegalTable({
  head,
  rows,
}: {
  head: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="overflow-x-auto border border-slate-200 my-2">
      <table className="w-full text-left text-xs md:text-[13px] border-collapse">
        <thead className="bg-[#0f172a] text-white">
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                className="px-4 py-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top odd:bg-white even:bg-slate-50/60">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 leading-relaxed ${
                    cellIndex === 0 ? 'font-bold text-slate-900 whitespace-nowrap' : 'text-slate-600'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LegalCallout({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-[#158cca]/20 bg-[#158cca]/5 px-5 py-4 my-2">
      {title && (
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#158cca] mb-2">{title}</p>
      )}
      <div className="text-[13px] md:text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

export function LegalContactBlock({ email = LEGAL_ENTITY.dataEmail }: { email?: string }) {
  return (
    <div className="border border-slate-200 bg-slate-50 px-5 py-4 text-[13px] md:text-sm text-slate-600 space-y-1.5">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Canal oficial</p>
      <p>
        <strong className="text-slate-900">{LEGAL_ENTITY.name}</strong>
      </p>
      <p>{LEGAL_ENTITY.address}</p>
      <p>
        Correo: <a href={`mailto:${email}`} className="text-[#158cca] font-bold hover:underline break-all">{email}</a>
      </p>
      <p>
        Teléfono: <a href="tel:+5116429971" className="text-[#158cca] font-bold hover:underline">{LEGAL_ENTITY.phone}</a>
        {' · '}WhatsApp:{' '}
        <a href="https://wa.me/51966600891" target="_blank" rel="noreferrer" className="text-[#158cca] font-bold hover:underline">
          {LEGAL_ENTITY.whatsapp}
        </a>
      </p>
    </div>
  )
}
