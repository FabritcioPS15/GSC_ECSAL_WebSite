import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sedes y Centros Médicos para Brevete | San Luis Medic',
  description: 'Encuentra y compara sedes para tu examen de brevete en Lima, Andahuaylas y Ayacucho: precios, horarios, servicios y contacto directo.',
  alternates: {
    canonical: 'https://sanluismedic.pe/sedes',
  },
  openGraph: {
    title: 'Sedes y Centros Médicos para Brevete | San Luis Medic',
    description: 'Consulta sedes, precios, horarios, servicios y contacto para tu examen médico de brevete.',
    url: 'https://sanluismedic.pe/sedes',
    locale: 'es_PE',
    type: 'website',
  },
}

export default function SedesLayout({ children }: { children: React.ReactNode }) {
  return children
}
