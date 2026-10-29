import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | San Luis Medic',
  description:
    'Conoce cómo San Luis Medic recopila, usa, conserva y protege tus datos personales al usar nuestro sitio web y nuestros servicios médicos para brevete.',
  alternates: {
    canonical: 'https://sanluismedic.pe/politica-privacidad',
  },
}

export default function PoliticaPrivacidadLayout({ children }: { children: React.ReactNode }) {
  return children
}
