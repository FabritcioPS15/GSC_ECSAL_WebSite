import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | San Luis Medic',
  description:
    'Términos y condiciones de uso del sitio web y de los servicios de evaluación médica de aptitud psicosomática de San Luis Medic.',
  alternates: {
    canonical: 'https://sanluismedic.pe/terminos-condiciones',
  },
}

export default function TerminosCondicionesLayout({ children }: { children: React.ReactNode }) {
  return children
}
