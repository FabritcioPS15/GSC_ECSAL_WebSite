'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Check, ChevronRight, MapPin, Star, Clock, Stethoscope, AlertCircle, ChevronDown, Search, ShieldCheck, CreditCard } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { FaWhatsapp, FaFlask, FaBrain, FaEye, FaStethoscope, FaFileMedical } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CENTROS } from '@/lib/directorio'
import { formatMiles } from '@/lib/utils'

// Lazy load the map section - removes ~200KB of Leaflet from initial bundle
const MapSection = dynamic(() => import('@/components/map-section'), {
  ssr: false,
  loading: () => (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex h-[500px] items-center justify-center border border-slate-100 bg-slate-50 shadow-xl">
        <div className="loader" role="status" aria-label="Cargando mapa">
          <span className="sr-only">Cargando mapa...</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 animate-pulse border border-slate-100" />)}
      </div>
    </div>
  )
})



// Hero slideshow images
const HERO_SLIDES = [
  { src: '/servicios/moto.webp', alt: 'Examen médico para moto' },
  { src: '/servicios/revalidacion.webp', alt: 'Revalidación de brevete' },
  { src: '/servicios/recategorizacion.webp', alt: 'Recategorización de licencia' },
  { src: '/servicios/nuevo-ai.webp', alt: 'Licencia nueva con IA' },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [counters, setCounters] = useState({ years: 0, clients: 0, branches: 0 })
  const [countersStarted, setCountersStarted] = useState(false)
  const [isHeroDropdownOpen, setIsHeroDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const heroDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (heroDropdownRef.current && !heroDropdownRef.current.contains(event.target as Node)) {
        setIsHeroDropdownOpen(false)
      }
    }
    if (isHeroDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isHeroDropdownOpen])

  // Detect mobile device for conditional loading
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sedes = [
    { name: 'Sede Lima (Independencia)', whatsapp: '51999888777', address: 'Av. Carlos Izaguirre 108, Independencia' },
    { name: 'Sede Andahuaylas', whatsapp: '51944777666', address: 'Jr. Alfonso Ugarte N.º 354' },
    { name: 'Sede Ayacucho', whatsapp: '51944666555', address: 'Jr. José Santos Chocano N° 410' }
  ];

  const getWhatsAppUrl = (message: string, whatsapp: string) => {
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Hero slideshow auto-rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlideIndex(prev => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Counter animation effect - simplified for mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true)
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    const statsSection = document.getElementById('stats-section')
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection)
      }
    }
  }, [countersStarted])

  const animateCounters = () => {
    const duration = isMobile ? 1000 : 2000 // Faster animation on mobile
    const steps = isMobile ? 30 : 60
    const stepDuration = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic

      setCounters({
        years: Math.floor(15 * easeProgress),
        clients: Math.floor(50000 * easeProgress),
        branches: Math.floor(3 * easeProgress)
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setCounters({ years: 15, clients: 50000, branches: 3 })
      }
    }, stepDuration)
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.12, ease: "easeOut" } }
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01
      }
    }
  }

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 selection:bg-[#158cca] selection:text-white">
      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/51999999999"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center hover:bg-[#20bd5a] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.12 }}
      >
        <FaWhatsapp size={32} aria-hidden="true" />
      </motion.a>

      <Navbar active={activeSection} home />

      {/* Section 1: Hero */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] lg:min-h-[80vh] xl:min-h-[75vh] flex items-center overflow-hidden bg-[#0a1525]">
        {/* === BACKGROUND SLIDESHOW === */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {HERO_SLIDES.map((slide, idx) => (
            <motion.div
              key={slide.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: heroSlideIndex === idx ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={idx === 0}
              />
            </motion.div>
          ))}

          {/* Dark base overlay for readability */}
          <div className="absolute inset-0 bg-[#0a1525]/55" />

          {/* Gradient fade: from left (opaque) → center (semi) → right (transparent) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #0a1525 0%, #0a1525 35%, rgba(10,21,37,0.80) 50%, rgba(10,21,37,0.35) 65%, transparent 85%)'
            }}
          />

          {/* Bottom fade so hero melts into next section */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,21,37,0.5) 70%, #f8fafc 100%)' }}
          />
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20" aria-label="Slides del fondo">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroSlideIndex(idx)}
              aria-label={`Diapositiva ${idx + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                heroSlideIndex === idx
                  ? 'bg-white w-6'
                  : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* === CONTENT === */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full lg:col-span-7 flex flex-col items-start"
            >

              {/* Main Heading */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold text-white leading-[1.08] tracking-tight mb-5 text-balance drop-shadow-sm">
                Examen Médico<br />
                <span className="text-[#5ec4f0]">para Brevete</span> y<br className="hidden sm:block" />
                {' '}Licencia de Conducir
              </h1>

              {/* Value prop */}
              <p className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal mb-7">
                Obtén tu certificado psicosomático oficial para <strong className="text-white/95">brevete nuevo (A1, Motos), revalidación o recategorización</strong> en tan solo{' '}
                <span className="text-[#a3c435] font-semibold">2 horas y media</span>. Registro directo en el Sistema Nacional del MTC.
              </p>
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full mb-7">
                <div ref={heroDropdownRef} className="relative w-full sm:w-auto">
                  <Button
                    onClick={() => setIsHeroDropdownOpen(!isHeroDropdownOpen)}
                    aria-expanded={isHeroDropdownOpen}
                    aria-haspopup="true"
                    className="bg-[#158cca] hover:bg-[#1176ab] text-white font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2.5 w-full sm:w-auto"
                  >
                    <FaWhatsapp size={18} className="text-[#25D366] shrink-0" />
                    <span>Reservar Cita Ahora</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHeroDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </Button>

                  {isHeroDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      role="menu"
                      className="absolute top-full left-0 mt-2.5 w-full sm:w-80 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-[100] p-2 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Selecciona tu sede más cercana:
                      </div>
                      {sedes.map((sede, index) => (
                        <a
                          key={index}
                          href={getWhatsAppUrl(`Hola San Luis Medic, deseo reservar una cita para mi examen médico de brevete en la ${sede.name}`, sede.whatsapp)}
                          target="_blank"
                          rel="noreferrer"
                          role="menuitem"
                          onClick={() => setIsHeroDropdownOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <span className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-[#158cca] group-hover:bg-[#158cca] group-hover:text-white transition-colors shrink-0" aria-hidden="true">
                            <MapPin size={17} />
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#158cca] transition-colors">{sede.name}</div>
                            <div className="text-[11px] text-slate-500 truncate">{sede.address}</div>
                          </div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>

                <Link
                  href="/sedes"
                  className="inline-flex h-12 sm:h-14 items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-md hover:bg-white/20 px-5 sm:px-6 text-xs sm:text-sm font-bold text-white transition-colors gap-2"
                >
                  <MapPin size={15} className="text-[#5ec4f0]" />
                  <span>Ver Sedes y Tarifas</span>
                </Link>
              </div>
              {/* Social proof */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 pt-4 border-t border-white/15 w-full max-w-xl text-xs text-white/60">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white/90">4.9 / 5</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
                <span>+50,000 certificados emitidos</span>
                <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
                <div className="relative w-24 h-6 brightness-[3] opacity-70 hover:opacity-100 transition-opacity">
                  <Image
                    src="/MTC.webp"
                    alt="MTC Autorizado"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: floating doctor photo - desktop only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="hidden lg:flex lg:col-span-5 items-end justify-center"
            >
              <div className="relative w-full h-[560px] xl:h-[620px]">
                {/* Glow ring */}
                <div className="absolute inset-x-6 bottom-0 top-16 rounded-3xl bg-gradient-to-t from-[#158cca]/25 via-white/5 to-transparent border border-white/10 -z-10" />

                <Image
                  src="/Doctor SLM.webp"
                  alt="Doctora especialista en evaluación médica para brevete - San Luis Medic"
                  fill
                  sizes="40vw"
                  className="object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.5)]"
                  priority
                />

                {/* Floating badge: 2.5 Horas */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-10 -left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 z-20"
                >
                  <span className="w-11 h-11 rounded-xl bg-[#a3c435] flex items-center justify-center text-white shrink-0" aria-hidden="true">
                    <Clock size={22} />
                  </span>
                  <div>
                    <div className="text-base font-extrabold text-[#0f172a] leading-none">2.5 Horas</div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Certificado Rápido</div>
                  </div>
                </motion.div>

                {/* Floating badge: Homologado */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="absolute top-14 -right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 z-20"
                >
                  <span className="w-11 h-11 rounded-xl bg-[#158cca] flex items-center justify-center text-white shrink-0" aria-hidden="true">
                    <ShieldCheck size={22} />
                  </span>
                  <div>
                    <div className="text-base font-extrabold text-[#0f172a] leading-none">100% Homologado</div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Validez Nacional MTC</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 2: Acerca de Nosotros */}
      <section id="nosotros" className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
              CONÓCENOS
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </p>
            <h2 className="font-heading text-4xl font-extrabold text-[#0f172a] mb-6">Corporación San Luis Medic</h2>
            <p className="text-slate-600 text-lg">Más de 15 años liderando evaluaciones médicas para conductores en el Perú, con cobertura nacional y compromiso con la seguridad vial.</p>
          </motion.div>

          <div id="stats-section" className="grid md:grid-cols-3 gap-8 mb-16" aria-live="polite" aria-atomic="true">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#158cca] mb-2">
                {counters.years}+
              </p>
              <p className="text-sm text-slate-600">Años de experiencia</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#158cca] mb-2">
                + {formatMiles(counters.clients)}
              </p>
              <p className="text-sm text-slate-600">Conductores certificados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#158cca] mb-2">
                {counters.branches}
              </p>
              <p className="text-sm text-slate-600">Sedes a nivel nacional</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Líderes en Evaluaciones Médicas</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Como Corporación San Luis Medic, nos enorgullece ser la red más grande de centros médicos especializados en evaluaciones para licencias de conducir, con presencia estratégica en Lima y provincias.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Nuestro compromiso va más allá de las evaluaciones: promovemos una cultura de seguridad vial a través de servicios médicos de excelencia y tecnología de punta.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#a3c435] rounded-full" aria-hidden="true"></span>
                  <span className="text-slate-700">Cobertura nacional</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#a3c435] rounded-full" aria-hidden="true"></span>
                  <span className="text-slate-700">Tecnología médica avanzada</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#a3c435] rounded-full" aria-hidden="true"></span>
                  <span className="text-slate-700">Personal altamente calificado</span>
                </li>
              </ul>
            </div>
            <div className="relative h-96 bg-slate-100 overflow-hidden border-l-4 border-[#158cca]" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-br from-[#158cca]/10 to-[#a3c435]/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white flex items-center justify-center mx-auto mb-4 shadow-xl border border-slate-100">
                    <Stethoscope size={48} className="text-[#158cca]" aria-hidden="true" />
                  </div>
                  <p className="text-slate-900 font-black uppercase tracking-widest text-sm">Excelencia Nacional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Proceso de Evaluación MTC */}
      <section id="proceso" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <p className="flex items-center gap-2 mb-4 text-[#a3c435] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-0.5 bg-[#a3c435]" aria-hidden="true"></span>
              EXAMEN MÉDICO DE APTITUD
            </p>
            <h3 className="font-heading text-4xl font-extrabold text-[#0f172a] mb-6">Proceso de Evaluación MTC</h3>
            <p className="text-slate-500 text-base max-w-3xl leading-relaxed">
              Nuestras evaluaciones cumplen estrictamente con la Directiva N° 001-2023-MTC/18, garantizando un perfil de conductor apto y seguro.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border border-slate-100 rounded-none overflow-hidden shadow-sm mb-12"
          >
            {[
              {
                icon: <FaFlask size={20} className="text-[#158cca]" />,
                title: 'LABORATORIO',
                details: ['Glucosa', 'Hemoglobina', 'Grupo Sanguíneo']
              },
              {
                icon: <FaBrain size={20} className="text-[#158cca]" />,
                title: 'PSICOLÓGICA',
                details: ['Coordinación', 'Reacción', 'Atención']
              },
              {
                icon: <FaFileMedical size={20} className="text-[#158cca]" />,
                title: 'AUDITIVA',
                details: ['Percepción sonidos', 'Audiometría básica', 'Orientación']
              },
              {
                icon: <FaEye size={20} className="text-[#158cca]" />,
                title: 'VISUAL',
                details: ['Agudeza visual', 'Campo visual', 'Test de colores']
              },
              {
                icon: <FaStethoscope size={20} className="text-[#158cca]" />,
                title: 'MÉDICA GRAL.',
                details: ['Presión arterial', 'Peso / Talla', 'Salud general']
              }
            ].map((step, idx) => (
              <div
                key={idx}
                className={`bg-white p-8 flex flex-col items-start text-left border-slate-100 ${idx !== 4 ? 'lg:border-r' : ''} ${idx < 3 ? 'md:border-r' : ''} border-b lg:border-b-0`}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-none flex items-center justify-center mb-6" aria-hidden="true">
                  {step.icon}
                </div>
                <h4 className="text-sm font-black text-[#0f172a] mb-6">
                  {idx + 1}. {step.title}
                </h4>
                <ul className="space-y-3">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#a3c435] rounded-full flex-shrink-0" aria-hidden="true"></span>
                      <span className="text-sm text-slate-500 font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Aprobado Card */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.12 }}
              className="bg-[#0f172a] p-10 rounded-none flex items-center gap-8 shadow-xl"
            >
              <span className="w-14 h-14 bg-[#a3c435] rounded-none flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Check size={28} className="text-[#0f172a]" strokeWidth={3} />
              </span>
              <div>
                <h4 className="text-xl font-bold text-white mb-3">Resultado: Aprobado</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Se emite el Certificado Médico Digital inmediatamente después de la firma biométrica, habilitando su carga al sistema nacional del MTC.
                </p>
              </div>
            </motion.div>

            {/* Observado Card */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.12 }}
              className="bg-white p-10 rounded-none border border-slate-100 flex items-center gap-8 shadow-sm"
            >
              <span className="w-14 h-14 bg-blue-50 rounded-none flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <AlertCircle size={24} className="text-[#158cca]" />
              </span>
              <div>
                <h4 className="text-xl font-bold text-[#0f172a] mb-3">Resultado: Observado</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  El postulante recibirá indicaciones médicas específicas para subsanar la observación (ej. uso de lentes, tratamiento especializado) antes de continuar.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Sedes */}
      <section id="sedes" className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
              Nuestras Sedes
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </p>
            <h2 className="font-heading text-4xl font-extrabold text-[#0f172a] mb-6">Elige la sede que prefieras</h2>
            <p className="text-slate-600 text-lg">Cada sede cuenta con su propio tarifario, horarios y canales de atención. Ingresa para ver toda la información.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-0 border border-slate-100"
          >
            {CENTROS.map((centro, idx) => {
              const abierto = activeCard === idx
              const whatsappUrl = `https://wa.me/${centro.whatsapp}?text=${encodeURIComponent(
                `Hola San Luis Medic, deseo información sobre el examen médico de brevete en la sede ${centro.ciudad}.`
              )}`

              return (
                <motion.div
                  key={centro.id}
                  variants={fadeIn}
                  onClick={() => setActiveCard(abierto ? null : idx)}
                  className="relative h-[470px] overflow-hidden group cursor-pointer border-b border-slate-100 md:border-b-0 md:border-r last:border-r-0 last:border-b-0"
                >
                  {/* Initial View */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center bg-white px-8 text-center z-10 transition-all duration-500 ${abierto ? '-translate-y-full' : 'group-hover:-translate-y-full'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#158cca]">{centro.ciudad}</span>
                    <h3 className="mt-3 text-3xl font-black uppercase tracking-tighter text-[#0f172a]">{centro.distrito}</h3>
                    <div className="mt-5 h-px w-12 bg-[#a3c435]" aria-hidden="true"></div>
                    <p className="mt-5 text-sm font-normal leading-relaxed text-slate-600">{centro.direccion}</p>
                    <Link
                      href={`/sedes/${centro.id}`}
                      className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1176ab] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#158cca] focus-visible:ring-offset-2"
                    >
                      Ver sede
                      <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Tarifario, horarios y contacto
                    </p>
                  </div>

                  {/* Reveal View */}
                  <div className={`absolute inset-0 flex flex-col justify-between bg-[#0f172a] p-8 z-20 transition-all duration-500 delay-100 ${abierto ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'}`}>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#a3c435]">Sede {centro.ciudad}</span>
                      <h3 className="mt-2 text-2xl font-black uppercase tracking-tighter text-white">{centro.nombre}</h3>
                      <p className="mt-4 flex items-start gap-2 text-sm font-normal leading-relaxed text-white/70">
                        <MapPin size={16} className="mt-0.5 shrink-0 text-[#a3c435]" aria-hidden="true" />
                        <span>{centro.direccion}</span>
                      </p>
                      <p className="mt-3 flex items-start gap-2 text-sm font-normal leading-relaxed text-white/70">
                        <Clock size={16} className="mt-0.5 shrink-0 text-[#a3c435]" aria-hidden="true" />
                        <span>{centro.horario}</span>
                      </p>
                    </div>

                    <div>
                      <div className="mb-5 flex items-baseline gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Examen médico</span>
                        <span className="text-3xl font-black text-[#a3c435]">S/ {centro.precioExamen}<span className="text-base">.00</span></span>
                      </div>
                      <ul className="mb-6 flex flex-wrap gap-1.5">
                        {centro.servicios.slice(0, 3).map((servicio) => (
                          <li key={servicio} className="rounded-md border border-white/15 px-2 py-1 text-[11px] font-medium text-white/70">
                            {servicio}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/sedes/${centro.id}`}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1176ab] text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
                      >
                        Ver página de la sede
                        <ArrowRight size={17} aria-hidden="true" />
                      </Link>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="mt-3 inline-flex h-10 w-full items-center justify-center text-[10px] font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white"
                      >
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 w-full bg-[#a3c435] transition-all duration-500 opacity-50 ${abierto ? 'h-2' : 'h-0 group-hover:h-2'}`} aria-hidden="true"></div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Section 7: Mapa de sedes */}
      <section id="mapa" className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <p className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
              UBICACIONES
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </p>
            <h2 className="font-heading text-4xl font-extrabold text-[#0f172a] mb-6">Ubícanos en el mapa</h2>
            <p className="text-slate-600 text-lg">Explora la ubicación de cada sede y abre la ruta en Google Maps o Waze.</p>
            <Link
              href="/sedes"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#158cca] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0f172a]"
            >
              <Search size={17} aria-hidden="true" />
              Ver todas las sedes
            </Link>
          </motion.div>

          <MapSection />
        </div>
      </section>

      {/* Section 8: Unidades de Negocio */}
      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <p className="text-xs text-[#a3c435] font-bold mb-2 uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
                GRUPO SAN LUIS
              </p>
              <h2 className="font-heading text-4xl font-extrabold text-[#0f172a] mb-12">Unidades de Negocio</h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.12 }}
              whileHover={!isMobile ? { y: -5 } : {}}
              className="relative h-[500px] overflow-hidden group cursor-pointer"
              onClick={() => window.open('https://rtpsancristobal.pe', '_blank')}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/revisiones-tecnicas.webp"
                  alt="Revisiones Técnicas"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/60 group-hover:via-black/20"></div>
              </div>

              {/* Content - Initially Hidden, Shown on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center px-8">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Revisiones Técnicas</h3>
                  <p className="text-white/90 text-sm mb-6 max-w-md">Inspección vehicular completa para garantizar la seguridad y cumplimiento de normativas.</p>
                  <ul className="flex flex-col space-y-2 text-white/80 text-sm">
                    <li className="flex items-center justify-center gap-2"><Check size={16} className="text-green-400" aria-hidden="true" /> Certificación MTC</li>
                    <li className="flex items-center justify-center gap-2"><Check size={16} className="text-green-400" aria-hidden="true" /> Inspección 360°</li>
                    <li className="flex items-center justify-center gap-2"><Check size={16} className="text-green-400" aria-hidden="true" /> Resultados inmediatos</li>
                  </ul>
                  <div className="mt-6">
                    <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-none text-xs font-black uppercase tracking-widest">
                      Visitar sitio →
                    </Button>
                  </div>
                </div>
              </div>

              {/* Title - Initially Visible, Hidden on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <div className="text-center">
                  <span className="text-5xl md:text-6xl font-black text-white/90 uppercase tracking-tighter text-center leading-none">REVISIONES<br />TÉCNICAS</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.12, delay: 0.06 }}
              whileHover={!isMobile ? { y: -5 } : {}}
              className="relative h-[500px] overflow-hidden group cursor-pointer"
              onClick={() => window.open('https://escuela-conductores.com', '_blank')}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/escuela-conductores.webp"
                  alt="Escuela de Conductores"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/60 group-hover:via-black/20"></div>
              </div>

              {/* Content - Initially Hidden, Shown on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center px-8">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Escuela de Conductores</h3>
                  <p className="text-white/90 text-sm mb-6 max-w-md">Formación integral para conductores responsables y seguros en las vías.</p>
                  <ul className="flex flex-col space-y-2 text-white/80 text-sm">
                    <li className="flex items-center justify-center gap-2"><Check size={16} className="text-green-400" aria-hidden="true" /> Clases teóricas y prácticas</li>
                    <li className="flex items-center justify-center gap-2"><Check size={16} className="text-green-400" aria-hidden="true" /> Simuladores de conducción</li>
                    <li className="flex items-center justify-center gap-2"><Check size={16} className="text-green-400" aria-hidden="true" /> Examen final garantizado</li>
                  </ul>
                  <div className="mt-6">
                    <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-none text-xs font-black uppercase tracking-widest">
                      Visitar sitio →
                    </Button>
                  </div>
                </div>
              </div>

              {/* Title - Initially Visible, Hidden on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <div className="text-center">
                  <span className="text-5xl md:text-6xl font-black text-white/90 uppercase tracking-tighter text-center leading-none">ESCUELA DE<br />CONDUCTORES</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Section 10: FAQ */}
      <section id="faq" className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <p className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
              DUDAS
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </p>
            <h2 className="font-heading text-4xl font-extrabold text-[#0f172a] mb-6">Preguntas Frecuentes</h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "¿Cuánto tiempo demora el examen médico?", a: "El proceso completo suele tomar entre 45 a 60 minutos, dependiendo de la categoría." },
              { q: "¿Qué documentos debo llevar?", a: "Solo necesitas tu DNI vigente (físico o electrónico) y tu licencia anterior si es revalidación." },
              { q: "¿Tienen convenio con el MTC?", a: "Sí, somos un centro médico autorizado y homologado por el MTC con código vigente." }
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-200">
                <AccordionTrigger className="text-left font-bold text-slate-800 hover:text-[#158cca] hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cuánto tiempo demora el examen médico?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El proceso completo suele tomar entre 45 a 60 minutos, dependiendo de la categoría."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué documentos debo llevar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Solo necesitas tu DNI vigente (físico o electrónico) y tu licencia anterior si es revalidación."
                }
              },
              {
                "@type": "Question",
                "name": "¿Tienen convenio con el MTC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, somos un centro médico autorizado y homologado por el MTC con código vigente."
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}
