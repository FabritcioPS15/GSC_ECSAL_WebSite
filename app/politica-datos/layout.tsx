import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Datos | San Luis Medic',
  description:
    'Política de tratamiento y protección de datos personales de San Luis Medic: principios, banco de datos, medidas de seguridad, encargados y ejercicio de derechos.',
  alternates: {
    canonical: 'https://sanluismedic.pe/politica-datos',
  },
}

export default function PoliticaDatosLayout({ children }: { children: React.ReactNode }) {
  return children
}
