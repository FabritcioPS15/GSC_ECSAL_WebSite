'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Check, ChevronRight, MapPin, Star, Clock, Stethoscope, AlertCircle, ChevronDown, Search, CreditCard } from 'lucide-react'
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



// Hero slideshow with content for each slide
const HERO_SLIDES = [
  {
    src: '/servicios/moto.webp',
    alt: 'Examen médico para licencia de moto - categoría A1',
    kicker: 'Centro médico autorizado por el MTC',
    title: 'Licencia de Moto',
    subtitle: 'Categoría A1',
    lead: 'El examen médico de aptitud para tu brevete, sin filas innecesarias.',
    description: 'Completa laboratorio, visión, psicología y evaluación general en una sola visita. Al aprobar, emitimos el certificado digital y lo cargamos al sistema del MTC para que continúes tu trámite con respaldo oficial.',
    points: [
      'Proceso completo en aproximadamente 2.5 horas',
      'Certificado digital con carga inmediata al MTC',
      'Atención en Lima, Andahuaylas y Ayacucho',
    ],
    cta: 'Reservar Cita Moto'
  },
  {
    src: '/servicios/revalidacion.webp',
    alt: 'Revalidación de brevete - renovación de licencia de conducir',
    kicker: 'Renovación de licencia de conducir',
    title: 'Revalidación',
    subtitle: 'Mantén tu brevete vigente',
    lead: 'Renueva a tiempo y sigue conduciendo con tu certificado al día.',
    description: 'Revalidamos tu licencia con la misma rigurosidad médica exigida por el MTC, en un circuito ordenado y con resultados el mismo día. Te orientamos si hay observaciones y te entregamos el certificado listo para el sistema nacional.',
    points: [
      'Trámite ágil con DNI y licencia anterior',
      'Resultado el mismo día, con firma biométrica',
      'Sedes homologadas y personal especializado',
    ],
    cta: 'Revalidar Ahora'
  },
  {
    src: '/servicios/recategorizacion.webp',
    alt: 'Recategorización de licencia de conducir - cambio de categoría',
    kicker: 'Cambio de categoría vehicular',
    title: 'Recategorización',
    subtitle: 'Da el siguiente paso en tu licencia',
    lead: 'Actualiza tu categoría con una evaluación médica completa y oficial.',
    description: 'Si necesitas pasar a otra categoría, realizamos el perfil médico que exige el MTC y te acompañamos en cada estación del examen. El objetivo es un proceso claro, seguro y con respaldo institucional desde el primer momento.',
    points: [
      'Evaluación alineada a la categoría que solicitas',
      'Circuito médico en un solo local',
      'Orientación si el resultado queda observado',
    ],
    cta: 'Recategorizar'
  },
  {
    src: '/servicios/nuevo-ai.webp',
    alt: 'Licencia de conducir nueva con tecnología de IA',
    kicker: 'Primera licencia de conducir',
    title: 'Licencia Nueva',
    subtitle: 'Empieza a conducir con respaldo médico',
    lead: 'Tu primer certificado de aptitud, con tecnología y un equipo que te guía.',
    description: 'Si es tu primera licencia, te recibimos con un flujo simple: te explicamos cada prueba, evaluamos tu aptitud física y psicológica, y emitimos el certificado digital para que inicies tu trámite ante el MTC con confianza.',
    points: [
      'Acompañamiento para postulantes nuevos',
      'Equipos modernos en visión, lab y psicología',
      'Más de 15 años certificando conductores',
    ],
    cta: 'Sacar Licencia'
  },
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
    { name: 'Sede Lima (Independencia)', whatsapp: '51966600891', address: 'Av. Carlos Izaguirre 108, Independencia' },
    { name: 'Sede Andahuaylas', whatsapp: '51941971060', address: 'Jr. Alfonso Ugarte N.º 354' },
    { name: 'Sede Ayacucho', whatsapp: '51947992807', address: 'Jr. José Santos Chocano N° 410' }
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
        href="https://wa.me/51966600891"
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
      <section className="relative min-h-[92vh] md:min-h-[85vh] lg:min-h-[88vh] flex items-center bg-[#0f172a]">
        {/* Background Image Slideshow: anclada a la derecha para que su parte visible no quede tapada */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[50%] lg:w-[48%] z-0">
          {HERO_SLIDES.map((slide, idx) => (
            <motion.div
              key={slide.src}
              initial={false}
              animate={{ opacity: heroSlideIndex === idx ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-right"
                priority={idx === 0}
              />
            </motion.div>
          ))}

          {/* Degradado suave justo donde la imagen se encuentra con el fondo sólido de la izquierda */}
          <div 
            className="hidden md:block absolute inset-y-0 left-0 w-36 lg:w-48 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/75 to-transparent z-[1] pointer-events-none" 
            aria-hidden="true" 
          />
        </div>

        {/* Degradado corporativo con los colores principales de la marca (#0f172a y matices de #158cca) */}
        <div 
          className="hidden md:block absolute inset-0 z-[1] bg-gradient-to-r from-[#0f172a] from-50% via-[#0f172a]/95 via-65% to-transparent pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Móvil: velo oscuro para garantizar legibilidad completa */}
        <div 
          className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/75 md:hidden pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Velos superior e inferior */}
        <div 
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0f172a] to-transparent z-[1] pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0f172a]/70 to-transparent z-[1] pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Ambient glow effects con los colores corporativos (#158cca y #a3c435) */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-[#158cca]/15 blur-[140px]" />
          <div className="absolute left-1/3 bottom-0 h-[320px] w-[320px] rounded-full bg-[#a3c435]/10 blur-[130px]" />
          <div className="absolute right-10 bottom-10 h-[380px] w-[380px] rounded-full bg-[#158cca]/10 blur-[130px]" />
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20" aria-label="Slides del hero">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroSlideIndex(idx)}
              aria-label={`Slide ${idx + 1}: ${HERO_SLIDES[idx].title}`}
              className={`h-2 rounded-full transition-all duration-300 ${heroSlideIndex === idx
                ? 'bg-[#158cca] w-8 shadow-sm shadow-[#158cca]/50'
                : 'bg-white/40 hover:bg-white/80 w-2.5'
                }`}
            />
          ))}
        </div>

        {/* === CONTENT === */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-12 pb-28 sm:py-16 lg:py-24">
          <div className="max-w-2xl lg:max-w-[40rem]">

            {/* Left Content Column */}
            <motion.div
              key={heroSlideIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full flex flex-col items-start"
            >

              <p className="mb-5 flex items-center gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#a3c435]">
                <span className="h-px w-8 bg-[#a3c435]" aria-hidden="true" />
                {HERO_SLIDES[heroSlideIndex].kicker}
              </p>

              <h1 className="font-heading text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.15rem] font-extrabold text-white leading-[1.05] tracking-tight text-balance">
                {HERO_SLIDES[heroSlideIndex].title}
              </h1>

              <p className="mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-[#5ec4f0] tracking-tight">
                {HERO_SLIDES[heroSlideIndex].subtitle}
              </p>

              <p className="mt-4 max-w-xl text-base sm:text-lg font-medium leading-snug text-white/90">
                {HERO_SLIDES[heroSlideIndex].lead}
              </p>

              <span className="mt-5 mb-5 h-px w-16 bg-gradient-to-r from-[#158cca] to-transparent" aria-hidden="true" />

              <p className="mb-6 max-w-xl text-[15px] sm:text-base md:text-lg leading-relaxed text-white/72">
                {HERO_SLIDES[heroSlideIndex].description}
              </p>

              <ul className="mb-8 space-y-2.5 text-[13px] sm:text-sm text-white/70">
                {HERO_SLIDES[heroSlideIndex].points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#a3c435]" strokeWidth={2.5} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full mb-8">
                <div ref={heroDropdownRef} className="relative w-full sm:w-auto">
                  <Button
                    onClick={() => setIsHeroDropdownOpen(!isHeroDropdownOpen)}
                    aria-expanded={isHeroDropdownOpen}
                    aria-haspopup="true"
                    className="bg-[#158cca] hover:bg-[#1176ab] text-white font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2.5 w-full sm:w-auto"
                  >
                    <FaWhatsapp size={18} className="text-[#25D366] shrink-0" />
                    <span>{HERO_SLIDES[heroSlideIndex].cta}</span>
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
              <p className="mt-1 pt-5 border-t border-white/12 w-full max-w-xl text-[12px] sm:text-[13px] leading-relaxed text-white/55">
                <span className="inline-flex items-center gap-1.5 align-middle mr-1.5">
                  <span className="inline-flex" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                  <span className="font-semibold text-white/85">4.9 / 5</span>
                </span>
                en atención · +50,000 certificados emitidos · Homologados por el MTC
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Acerca de Nosotros */}
      <section id="nosotros" className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
              CONÓCENOS
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-6">Corporación San Luis Medic</h2>
            <p className="text-slate-600 text-base">Más de 15 años liderando evaluaciones médicas para conductores en el Perú, con cobertura nacional y compromiso con la seguridad vial.</p>
          </motion.div>

          <div id="stats-section" className="grid md:grid-cols-3 gap-8 mb-12" aria-live="polite" aria-atomic="true">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#158cca] mb-2">
                {counters.years}+
              </p>
              <p className="text-sm text-slate-600">Años de experiencia</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#158cca] mb-2">
                + {formatMiles(counters.clients)}
              </p>
              <p className="text-sm text-slate-600">Conductores certificados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#158cca] mb-2">
                {counters.branches}
              </p>
              <p className="text-sm text-slate-600">Sedes a nivel nacional</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-6">Líderes en Evaluaciones Médicas</h3>
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

      {/* Section 6: Proceso de Evaluación MTC */}
      <section id="proceso" className="py-16 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-12"
          >
            <p className="flex items-center gap-2 mb-4 text-[#a3c435] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-0.5 bg-[#a3c435]" aria-hidden="true"></span>
              EXAMEN MÉDICO DE APTITUD
            </p>
            <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-6">Proceso de Evaluación MTC</h3>
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
                <h4 className="text-xl md:text-2xl font-bold text-white mb-3">Resultado: Aprobado</h4>
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
              className="bg-white p-4 rounded-none border border-slate-100 flex items-center gap-8 shadow-sm"
            >
              <span className="w-14 h-14 bg-blue-50 rounded-none flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <AlertCircle size={24} className="text-[#158cca]" />
              </span>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-[#0f172a] mb-3">Resultado: Observado</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  El postulante recibirá indicaciones médicas específicas para subsanar la observación (ej. uso de lentes, tratamiento especializado) antes de continuar.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 7: Sedes */}
      <section id="sedes" className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
              Nuestras Sedes
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-6">Elige la sede que prefieras</h2>
            <p className="text-slate-600 text-base">Cada sede cuenta con su propio tarifario, horarios y canales de atención. Ingresa para ver toda la información.</p>
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
                    <h3 className="mt-3 text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#0f172a]">{centro.distrito}</h3>
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
                      <h3 className="mt-2 text-xl md:text-2xl font-black uppercase tracking-tighter text-white">{centro.nombre}</h3>
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

      {/* Section 8: Mapa de sedes */}
      <section id="mapa" className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
              UBICACIONES
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-6">Ubícanos en el mapa</h2>
            <p className="text-slate-600 text-base">Explora la ubicación de cada sede y abre la ruta en Google Maps o Waze.</p>
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

      {/* Section 9: Unidades de Negocio */}
      <section className="py-16 bg-white border-t border-slate-100 overflow-hidden">
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
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-8">Unidades de Negocio</h2>
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
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Revisiones Técnicas</h3>
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
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Escuela de Conductores</h3>
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
      <section id="faq" className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-10"
          >
            <p className="text-xs text-[#a3c435] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
              DUDAS
              <span className="w-6 h-px bg-[#a3c435]" aria-hidden="true"></span>
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-6">Preguntas Frecuentes</h2>
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
