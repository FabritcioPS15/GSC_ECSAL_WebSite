'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { openCookieSettings } from '@/lib/consent'

export function Footer() {
  return (
    <footer className="bg-[#0f172a] py-10 sm:py-12 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#158cca]/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#a3c435]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#158cca]/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-5 gap-6 lg:gap-10 mb-8 border-b border-white/10 pb-8">
          <div className="md:col-span-2 pr-0 md:pr-6">
            <div className="bg-white/5 inline-block p-3 rounded-none mb-5 border border-white/10 relative group">
              <div className="absolute inset-0 bg-[#158cca]/20 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              <Image src="/Slmlogo.webp" alt="San Luis Medic Logo" width={180} height={45} sizes="180px" loading="lazy" decoding="async" className="h-8 w-auto brightness-0 invert" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed max-w-md font-medium">
              Corporación líder en evaluaciones médicas certificadas por el MTC para licencias de conducir. Brindamos confianza, rapidez y seguridad vial a nivel nacional con más de 15 años de experiencia.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/51999888777" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 hover:-translate-y-1">
                <FaWhatsapp size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-[#1877f2] hover:border-[#1877f2] transition-all duration-300 hover:-translate-y-1">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-[#E4405F] hover:border-[#E4405F] transition-all duration-300 hover:-translate-y-1">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-white text-xs sm:text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#a3c435]"></span>
              Navegación
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-bold text-slate-400">
              <li><Link href="/" className="hover:text-[#a3c435] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#158cca]" /> Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-[#a3c435] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#158cca]" /> Nosotros</Link></li>
              <li><Link href="/servicios" className="hover:text-[#a3c435] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#158cca]" /> Servicios</Link></li>
              <li><Link href="/sedes" className="hover:text-[#a3c435] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#158cca]" /> Sedes</Link></li>
              <li><Link href="/contacto" className="hover:text-[#a3c435] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#158cca]" /> Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white text-xs sm:text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#158cca]"></span>
              Legal
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-bold text-slate-400">
              <li><Link href="/politica-privacidad" className="hover:text-[#158cca] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#a3c435]" /> Política de Privacidad</Link></li>
              <li><Link href="/terminos-condiciones" className="hover:text-[#158cca] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#a3c435]" /> Términos y Condiciones</Link></li>
              <li><Link href="/politica-cookies" className="hover:text-[#158cca] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#a3c435]" /> Política de Cookies</Link></li>
              <li><Link href="/politica-datos" className="hover:text-[#158cca] hover:translate-x-1 transition-transform flex items-center gap-2"><ChevronRight size={12} className="text-[#a3c435]" /> Política de Datos</Link></li>
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="hover:text-[#158cca] hover:translate-x-1 transition-transform flex items-center gap-2 text-left"
                >
                  <ChevronRight size={12} className="text-[#a3c435]" /> Configurar cookies
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white text-xs sm:text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#158cca]"></span>
              Contacto Central
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400 font-medium">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#a3c435]/10 transition-colors">
                  <MapPin size={16} className="text-[#a3c435]" />
                </div>
                <span className="mt-1.5 leading-relaxed">Av. Carlos Izaguirre 108, Independencia, Lima</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#a3c435]/10 transition-colors">
                  <Mail size={16} className="text-[#a3c435]" />
                </div>
                <span>info@sanluismedic.pe</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
            © {new Date().getFullYear()} CORPORACIÓN SAN LUIS MEDIC S.A.C.
          </p>
          <Link
            href="https://sparktreestudio.com/"
            target="_blank"
            className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          >
            desarrollado por: Sparktree Studio
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
