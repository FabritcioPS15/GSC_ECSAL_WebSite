import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sanluismedic.pe'),
  title: 'San Luis Medic | Sedes y Centros Médicos para Brevete en Perú',
  description: 'Encuentra y compara centros médicos para el examen de aptitud psicosomática del brevete. Consulta sedes, precios, horarios, servicios y contacto directo.',
  keywords: ['directorio medico brevete', 'centros medicos brevete', 'examen medico brevete', 'policlinicos brevete', 'licencia de conducir', 'mtc examen medico'],
  authors: [{ name: 'San Luis Medic' }],
  openGraph: {
    title: 'San Luis Medic | Sedes y Centros Médicos para Brevete',
    description: 'Sedes con precios, horarios, servicios y contacto para tu examen médico de licencia de conducir.',
    url: 'https://sanluismedic.pe',
    siteName: 'San Luis Medic',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'San Luis Medic - Examen Médico para Brevete',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'San Luis Medic | Sedes y Centros Médicos para Brevete',
    description: 'Encuentra tu centro médico para el examen de brevete y consulta precios, horarios y contacto.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'EMaoov4TWOGeHLprqp5hVrOls5-h-YETOIF3cd_N6cA',
  },
  alternates: {
    canonical: 'https://sanluismedic.pe',
  },
  icons: {
    icon: '/slmfavicon.webp',
    shortcut: '/slmfavicon.webp',
    apple: '/slmfavicon.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "San Luis Medic",
              "image": "https://sanluismedic.pe/Slmlogo.webp",
              "@id": "https://sanluismedic.pe",
              "url": "https://sanluismedic.pe",
              "telephone": "+51016429971",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Carlos Izaguirre 108",
                "addressLocality": "Independencia",
                "addressRegion": "Lima",
                "postalCode": "15311",
                "addressCountry": "PE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -11.988863,
                "longitude": -77.057482
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.facebook.com/sanluismedic",
                "https://www.instagram.com/sanluismedic"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
