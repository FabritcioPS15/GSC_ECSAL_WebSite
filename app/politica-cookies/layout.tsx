import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | San Luis Medic',
  description:
    'Qué cookies utiliza San Luis Medic, para qué sirven, cuánto duran y cómo puedes aceptarlas, rechazarlas o configurarlas en cualquier momento.',
  alternates: {
    canonical: 'https://sanluismedic.pe/politica-cookies',
  },
}

export default function PoliticaCookiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
