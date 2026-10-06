# GSC ECSAL WebSite

Sitio web corporativo de **San Luis Medic**, centro de exámenes médicos autorizado y homologado por el MTC para licencias de conducir en Perú.

## Descripción

Plataforma web institucional que presenta los servicios médicos para obtener o renovar el brevete (licencia particular A1, revalidación, recategorización y licencia de moto), junto con información de sedes, precios y contacto. Generada como sitio estático para su despliegue en hosting de archivos.

## Características

- Páginas de servicios con precios y promociones por sede (Lima, Andahuaylas, Ayacucho).
- Sección de sedes con mapa interactivo.
- SEO completo: `sitemap.xml`, `robots.txt` y metadatos por página.
- Exportación estática (`output: 'export'`) con `trailingSlash`.
- Optimización de imágenes a WebP/AVIF y script de inline CSS para el build.
- UI moderna con animaciones, modo claro/oscuro y diseño responsive.
- Formularios validados con `zod` y `react-hook-form`.

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router) + React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 + tw-animate-css
- **UI:** shadcn/ui sobre Radix UI, lucide-react, sonner
- **Animaciones:** Framer Motion, Lenis
- **Mapas:** Leaflet / react-leaflet, Mapbox GL
- **Formularios:** react-hook-form + zod
- **Analíticas:** Vercel Analytics

## Estructura

```
.
├── app/                  # Rutas y páginas (App Router)
│   ├── page.tsx          # Inicio
│   ├── servicios/        # Servicios y detalle de cada uno
│   ├── sedes/            # Sedes
│   ├── nosotros/         # Nosotros
│   ├── contacto/         # Contacto
│   ├── sitemap.ts        # Sitemap XML
│   └── robots.ts         # Robots.txt
├── components/           # Componentes de la interfaz
│   ├── ui/               # Componentes shadcn/ui
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── map-section.tsx
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades (cn, helpers)
├── public/               # Imágenes y estáticos
├── scripts/              # optimize-images.mjs, inline-css.mjs
├── styles/               # Estilos globales
└── next.config.mjs       # Configuración de Next.js (export estático)
```

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Desarrollo
npm run build    # Build estático (genera out/)
npm run lint     # Lint
```
