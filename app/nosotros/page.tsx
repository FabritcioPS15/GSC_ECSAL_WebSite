'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Star, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaBrain, FaEye, FaFlask, FaStethoscope } from 'react-icons/fa'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { formatMiles } from '@/lib/utils'

export default function Nosotros() {
  const [counters, setCounters] = useState({ years: 0, clients: 0, branches: 0 })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      setCounters({
        years: Math.floor(15 * easeProgress),
        clients: Math.floor(50 * easeProgress),
        branches: Math.floor(3 * easeProgress)
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setCounters({ years: 15, clients: 50000, branches: 3 })
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-white font-sans text-slate-900">
      <Navbar active="nosotros" />

      {/* Hero Section */}
      <section className="bg-[#0f172a] py-10 md:py-14 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#158cca]/10 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12 }}
          >
            <div className="text-xs text-[#a3c435] font-bold mb-2 uppercase tracking-[0.3em] flex items-center gap-2 justify-start">
              <span className="w-8 h-px bg-[#a3c435]"></span>
              CONÓCENOS
              <span className="w-8 h-px bg-[#a3c435]"></span>
            </div>
            <div className="flex items-center justify-start gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-white/40">
              <Link href="/" className="hover:text-[#a3c435] transition-colors">Inicio</Link>
              <ChevronRight size={10} />
              <span className="text-[#a3c435]">Nosotros</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
              Quiénes <span className="text-[#158cca]">Somos</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl font-medium">
              Líderes en evaluaciones médicas certificadas por el MTC, garantizando seguridad y confianza en cada trámite vial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-10 bg-slate-50 border border-slate-100">
              <div className="text-4xl md:text-5xl font-black text-[#158cca] mb-2">{counters.years}+</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Años de Trayectoria</div>
            </div>
            <div className="p-10 bg-[#158cca] text-white">
              <div className="text-4xl md:text-5xl font-black mb-2">+ {formatMiles(counters.clients)}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Conductores Certificados</div>
            </div>
            <div className="p-10 bg-slate-50 border border-slate-100">
              <div className="text-4xl md:text-5xl font-black text-[#158cca] mb-2">{counters.branches}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sedes Estratégicas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.12 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-8 uppercase tracking-tighter leading-none">
                Liderazgo y <br /> <span className="text-[#158cca]">Excelencia Médica</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-base leading-relaxed">
                <p>
                  Corporación San Luis Medic nació con la visión de profesionalizar el proceso de obtención de licencias de conducir en el Perú. Entendemos que cada evaluación médica es un paso crítico para salvaguardar vidas en nuestras carreteras.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Certificación MTC Vigente",
                    "Tecnología Biométrica",
                    "Infraestructura Moderna",
                    "Atención Personalizada",
                    "Ética Profesional",
                    "Compromiso Vial"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#a3c435] rounded-full" />
                      <span className="text-sm font-bold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.12 }}
              className="relative"
            >
              <div className="relative h-[500px] w-full bg-slate-100 border-l-8 border-[#158cca] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Instalaciones San Luis Medic"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0f172a]/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión, Visión y Valores */}
      <section className="py-20 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-[0.3em] flex items-center gap-2 justify-center">
              <span className="w-8 h-px bg-[#a3c435]" aria-hidden="true"></span>
              NUESTRA IDENTIDAD
              <span className="w-8 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] uppercase tracking-tighter">
              Misión, Visión y Valores
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Misión */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 border border-slate-100 hover:border-[#158cca]/30 transition-colors"
            >
              <div className="w-14 h-14 bg-[#158cca]/10 flex items-center justify-center mb-6">
                <FaStethoscope size={28} className="text-[#158cca]" />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-4">Misión</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Brindar servicios médicos de evaluación psicosomática de excelencia, con tecnología de punta y personal altamente calificado, garantizando la seguridad vial de los conductores peruanos.
              </p>
            </motion.div>

            {/* Visión */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 border border-slate-100 hover:border-[#158cca]/30 transition-colors"
            >
              <div className="w-14 h-14 bg-[#a3c435]/10 flex items-center justify-center mb-6">
                <Star size={28} className="text-[#a3c435]" />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-4">Visión</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ser la red líder de centros médicos especializados en evaluaciones para licencias de conducir en el Perú, reconocidos por nuestra calidad, innovación y compromiso con la seguridad vial.
              </p>
            </motion.div>

            {/* Valores */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 border border-slate-100 hover:border-[#158cca]/30 transition-colors"
            >
              <div className="w-14 h-14 bg-[#5ec4f0]/10 flex items-center justify-center mb-6">
                <ShieldCheck size={28} className="text-[#5ec4f0]" />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-4">Valores</h3>
              <ul className="text-slate-600 text-sm leading-relaxed space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#a3c435] rounded-full" />
                  Integridad y honestidad
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#a3c435] rounded-full" />
                  Excelencia en el servicio
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#a3c435] rounded-full" />
                  Compromiso con la seguridad
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#a3c435] rounded-full" />
                  Innovación tecnológica
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestras Instalaciones */}
      <section className="py-20 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-[0.3em] flex items-center gap-2 justify-center">
              <span className="w-8 h-px bg-[#a3c435]" aria-hidden="true"></span>
              INFRAESTRUCTURA
              <span className="w-8 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] uppercase tracking-tighter mb-4">
              Nuestras Instalaciones
            </h2>
            <p className="text-slate-600 text-base">
              Contamos con instalaciones modernas y equipadas con tecnología de última generación para brindarte un servicio de calidad.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaFlask size={24} />,
                title: 'Laboratorio Clínico',
                description: 'Equipamiento moderno para análisis de sangre y orina'
              },
              {
                icon: <FaEye size={24} />,
                title: 'Oftalmología',
                description: 'Equipos de última generación para evaluación visual'
              },
              {
                icon: <FaBrain size={24} />,
                title: 'Psicología',
                description: 'Pruebas psicotécnicas computarizadas'
              },
              {
                icon: <FaStethoscope size={24} />,
                title: 'Consultorios Médicos',
                description: 'Ambientes cómodos y privados para tu evaluación'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 p-6 border border-slate-100 hover:border-[#158cca]/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-[#158cca]/10 flex items-center justify-center mb-4 group-hover:bg-[#158cca]/20 transition-colors">
                  <span className="text-[#158cca]">{item.icon}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
