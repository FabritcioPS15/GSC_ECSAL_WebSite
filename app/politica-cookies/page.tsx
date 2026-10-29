import type { Metadata } from 'next'
import Link from 'next/link'
import {
  LegalCallout,
  LegalList,
  LegalPage,
  LegalSection,
  LegalSubsection,
  LegalTable,
} from '@/components/legal'
import { CookieSettingsButton } from '@/components/cookie-settings-button'
import { LEGAL_ENTITY } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Política de Cookies | San Luis Medic',
  description:
    'Qué cookies utiliza San Luis Medic, para qué sirven, cuánto duran y cómo puedes aceptarlas, rechazarlas o configurarlas en cualquier momento.',
  alternates: {
    canonical: 'https://sanluismedic.pe/politica-cookies',
  },
  openGraph: {
    title: 'Política de Cookies | San Luis Medic',
    description:
      'Información detallada sobre las cookies necesarias, de preferencias y analíticas de nuestro sitio web.',
    url: 'https://sanluismedic.pe/politica-cookies',
    locale: 'es_PE',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const NAV = [
  { id: 'que-son', label: '¿Qué son las cookies?' },
  { id: 'marco-legal', label: 'Marco legal' },
  { id: 'tipos', label: 'Tipos de cookies que usamos' },
  { id: 'detalle', label: 'Detalle de cookies' },
  { id: 'terceros', label: 'Cookies de terceros' },
  { id: 'gestion', label: 'Cómo gestionar tus cookies' },
  { id: 'consentimiento', label: 'Tu consentimiento' },
  { id: 'actualizaciones', label: 'Actualizaciones' },
]

export default function PoliticaCookiesPage() {
  return (
    <LegalPage
      eyebrow="Información legal"
      title="Política de"
      highlight="Cookies"
      breadcrumb="Política de Cookies"
      description="Qué cookies y tecnologías similares usamos, con qué finalidad y cómo puedes controlarlas en cualquier momento."
      nav={NAV}
    >
      <LegalSection id="que-son" number={1} title="¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador o
          dispositivo. Sirven para recordar información sobre tu visita: preferencias, seguridad,
          funcionamiento del sitio o estadísticas de uso.
        </p>
        <p>
          También utilizamos tecnologías equivalentes, como el almacenamiento local (
          <em>localStorage</em>) y píxeles de medición, que se rigen por las mismas reglas descritas en
          esta política.
        </p>
      </LegalSection>

      <LegalSection id="marco-legal" number={2} title="Marco legal">
        <p>
          Esta política se enmarca en la Ley N° 29733, Ley de Protección de Datos Personales, su
          reglamento y las disposiciones de la Autoridad Nacional de Protección de Datos Personales. Para
          los usuarios que navegan desde el extranjero, aplicamos además los principios del Reglamento
          General de Protección de Datos de la Unión Europea (RGPD) cuando corresponda.
        </p>
        <p>
          El uso de cookies no necesarias requiere tu consentimiento previo, libre, informado y
          específico, el cual puedes otorgar, rechazar o modificar en cualquier momento.
        </p>
      </LegalSection>

      <LegalSection id="tipos" number={3} title="Tipos de cookies que usamos">
        <LegalSubsection title="Según su finalidad">
          <LegalList
            items={[
              <><strong>Necesarias:</strong> permiten la navegación, la seguridad y el funcionamiento básico del sitio. No requieren consentimiento porque son imprescindibles.</>,
              <><strong>De preferencias:</strong> recuerdan ajustes como el idioma o la sede consultada. Solo se activan si las aceptas.</>,
              <><strong>Analíticas:</strong> nos permiten medir de forma agregada cuántas personas visitan el sitio y qué secciones resultan más útiles. Solo se activan si las aceptas.</>,
            ]}
          />
        </LegalSubsection>
        <LegalSubsection title="Según su duración">
          <LegalList
            items={[
              <><strong>De sesión:</strong> se eliminan cuando cierras el navegador.</>,
              <><strong>Persistentes:</strong> permanecen durante un periodo determinado o hasta que las borras manualmente.</>,
            ]}
          />
        </LegalSubsection>
        <LegalSubsection title="Según su origen">
          <LegalList
            items={[
              <><strong>Propias:</strong> gestionadas directamente por {LEGAL_ENTITY.shortName}.</>,
              <><strong>De terceros:</strong> instaladas por proveedores de servicios que colaboran con nosotros.</>,
            ]}
          />
        </LegalSubsection>
      </LegalSection>

      <LegalSection id="detalle" number={4} title="Detalle de cookies">
        <LegalTable
          head={['Nombre', 'Proveedor', 'Finalidad', 'Duración', 'Categoría']}
          rows={[
            ['slm_cookie_consent', 'San Luis Medic', 'Guarda tus preferencias de consentimiento para no volver a preguntarte en cada visita.', '12 meses', 'Necesaria'],
            ['__next_hmr', 'San Luis Medic', 'Soporte técnico del entorno de desarrollo de Next.js. No se usa en producción.', 'Sesión', 'Necesaria'],
            ['slm_preferences', 'San Luis Medic', 'Recuerda ajustes de navegación, como la sede consultada por última vez.', '6 meses', 'Preferencias'],
            ['_vercel_analytics*', 'Vercel Inc.', 'Medición agregada y anónima de visitas y páginas vistas. No identifica personas.', 'Sesión', 'Analítica'],
            ['NID / _ga*', 'Google (solo si se integra)', 'Actualmente no se utilizan cookies de Google Analytics en este sitio.', 'No aplica', 'Analítica'],
            ['_fbp', 'Meta (solo si se integra)', 'Actualmente no se utilizan cookies publicitarias de Meta en este sitio.', 'No aplica', 'Publicitaria'],
          ]}
        />
        <LegalCallout title="Sin cookies publicitarias">
          <p>
            Actualmente no utilizamos cookies de publicidad, remarketing ni perfiles comerciales. Si en
            el futuro incorporamos este tipo de tecnologías, actualizaremos esta política y solicitaremos
            tu consentimiento antes de activarlas.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection id="terceros" number={5} title="Cookies y recursos de terceros">
        <p>
          Algunas funciones del sitio cargan recursos de proveedores externos que pueden registrar tu
          dirección IP o instalar sus propias cookies. Entre ellos:
        </p>
        <LegalList
          items={[
            <><strong>Vercel Analytics:</strong> servicio de medición de tráfico que no utiliza cookies de seguimiento personal y solo se activa con tu consentimiento.</>,
            <><strong>CartoDB / OpenStreetMap:</strong> mapas de sedes que cargan mosaicos desde sus servidores al abrir la sección de ubicaciones.</>,
            <><strong>Unsplash:</strong> alojamiento de imágenes ilustrativas utilizadas en el sitio.</>,
            <><strong>WhatsApp y redes sociales:</strong> los enlaces de contacto te redirigen a plataformas externas que aplican sus propias políticas.</>,
          ]}
        />
        <p>
          No controlamos las cookies de estos terceros. Te recomendamos revisar sus políticas de
          privacidad para conocer el tratamiento de tu información.
        </p>
      </LegalSection>

      <LegalSection id="gestion" number={6} title="Cómo gestionar tus cookies">
        <p>
          Puedes aceptar todas las cookies, rechazar las opcionales o elegir categoría por categoría
          desde nuestro panel de configuración:
        </p>
        <div className="py-2">
          <CookieSettingsButton />
        </div>
        <p>
          Además, puedes eliminar o bloquear cookies directamente desde tu navegador. Ten en cuenta que,
          si desactivas las cookies necesarias, algunas funciones del sitio podrían no operar
          correctamente. Enlaces de ayuda:
        </p>
        <LegalList
          items={[
            <a key="chrome" href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="text-[#158cca] font-bold hover:underline">Google Chrome</a>,
            <a key="edge" href="https://support.microsoft.com/microsoft-edge" target="_blank" rel="noreferrer" className="text-[#158cca] font-bold hover:underline">Microsoft Edge</a>,
            <a key="firefox" href="https://support.mozilla.org/es/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noreferrer" className="text-[#158cca] font-bold hover:underline">Mozilla Firefox</a>,
            <a key="safari" href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" className="text-[#158cca] font-bold hover:underline">Safari</a>,
          ]}
        />
        <p>
          Si navegas en modo incógnito, las cookies de sesión se eliminan automáticamente al cerrar la
          ventana, pero las persistentes pueden mantenerse según la configuración del navegador.
        </p>
      </LegalSection>

      <LegalSection id="consentimiento" number={7} title="Tu consentimiento y cómo cambiarlo">
        <p>
          La primera vez que visitas el sitio mostramos un banner donde puedes aceptar todas las cookies,
          rechazar las opcionales o configurarlas. Tu elección se guarda durante 12 meses o hasta que la
          modifiques.
        </p>
        <p>
          Puedes cambiar o retirar tu consentimiento en cualquier momento usando el botón «Configurar
          cookies» de esta página o el enlace disponible en el pie de página. El retiro del consentimiento
          no afecta la licitud del tratamiento realizado previamente.
        </p>
        <p>
          Las cookies necesarias no pueden desactivarse porque son indispensables para el funcionamiento
          del sitio y la seguridad de la navegación.
        </p>
      </LegalSection>

      <LegalSection id="actualizaciones" number={8} title="Actualizaciones de esta política">
        <p>
          Podemos actualizar esta Política de Cookies cuando incorporemos nuevas tecnologías o cambie la
          normativa aplicable. Publicaremos la versión vigente en esta página e indicaremos la fecha de
          actualización.
        </p>
        <p>
          Si tienes dudas sobre esta política, escríbenos a{' '}
          <a href={`mailto:${LEGAL_ENTITY.dataEmail}`} className="text-[#158cca] font-bold hover:underline">
            {LEGAL_ENTITY.dataEmail}
          </a>{' '}
          o consulta nuestra{' '}
          <Link href="/politica-privacidad" className="text-[#158cca] font-bold hover:underline">
            Política de Privacidad
          </Link>
          .
        </p>
        <p className="text-xs text-slate-500">Última actualización: {LEGAL_ENTITY.updated}.</p>
      </LegalSection>
    </LegalPage>
  )
}
