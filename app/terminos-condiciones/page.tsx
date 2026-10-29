import type { Metadata } from 'next'
import Link from 'next/link'
import {
  LegalCallout,
  LegalContactBlock,
  LegalList,
  LegalPage,
  LegalSection,
} from '@/components/legal'
import { LEGAL_ENTITY } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | San Luis Medic',
  description:
    'Términos y condiciones de uso del sitio web y de los servicios de evaluación médica de aptitud psicosomática de San Luis Medic.',
  alternates: {
    canonical: 'https://sanluismedic.pe/terminos-condiciones',
  },
  openGraph: {
    title: 'Términos y Condiciones | San Luis Medic',
    description:
      'Reglas de uso del sitio web, reservas, requisitos de atención y responsabilidades de San Luis Medic.',
    url: 'https://sanluismedic.pe/terminos-condiciones',
    locale: 'es_PE',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const NAV = [
  { id: 'objeto', label: 'Objeto y aceptación' },
  { id: 'servicios', label: 'Servicios ofrecidos' },
  { id: 'uso-sitio', label: 'Uso del sitio web' },
  { id: 'reservas', label: 'Reservas, citas y pagos' },
  { id: 'requisitos', label: 'Requisitos de atención' },
  { id: 'resultados', label: 'Resultados y certificados' },
  { id: 'propiedad', label: 'Propiedad intelectual' },
  { id: 'responsabilidad', label: 'Limitación de responsabilidad' },
  { id: 'terceros', label: 'Enlaces y servicios de terceros' },
  { id: 'modificaciones', label: 'Modificaciones' },
  { id: 'ley', label: 'Ley aplicable y jurisdicción' },
  { id: 'contacto', label: 'Contacto' },
]

export default function TerminosCondicionesPage() {
  return (
    <LegalPage
      eyebrow="Información legal"
      title="Términos y"
      highlight="Condiciones"
      breadcrumb="Términos y Condiciones"
      description="Reglas que rigen el uso de este sitio web y la contratación de nuestros servicios de evaluación médica para licencias de conducir."
      nav={NAV}
    >
      <LegalSection id="objeto" number={1} title="Objeto y aceptación">
        <p>
          Los presentes Términos y Condiciones regulan el acceso y uso del sitio web{' '}
          <a href={LEGAL_ENTITY.website} className="text-[#158cca] font-bold hover:underline">
            {LEGAL_ENTITY.website}
          </a>{' '}
          y la contratación de los servicios ofrecidos por <strong>{LEGAL_ENTITY.name}</strong>, en
          adelante «San Luis Medic».
        </p>
        <p>
          Al navegar en el sitio, solicitar una cita o utilizar cualquiera de nuestros canales de
          atención, declaras haber leído y aceptado estos Términos y Condiciones, así como nuestra{' '}
          <Link href="/politica-privacidad" className="text-[#158cca] font-bold hover:underline">
            Política de Privacidad
          </Link>{' '}
          y{' '}
          <Link href="/politica-cookies" className="text-[#158cca] font-bold hover:underline">
            Política de Cookies
          </Link>
          . Si no estás de acuerdo, debes abstenerte de usar el sitio y los servicios.
        </p>
      </LegalSection>

      <LegalSection id="servicios" number={2} title="Servicios ofrecidos">
        <p>
          San Luis Medic brinda servicios de evaluación médica de aptitud psicosomática y otros trámites
          vinculados a la obtención, revalidación o recategorización de licencias de conducir, conforme a
          la normativa del Ministerio de Transportes y Comunicaciones (MTC).
        </p>
        <LegalList
          items={[
            'Examen médico para licencia de conducir particular (A1).',
            'Revalidación de licencia de conducir.',
            'Recategorización de licencia.',
            'Examen médico para licencia de moto (B2C).',
            'Evaluaciones complementarias y servicios de orientación al usuario.',
          ]}
        />
        <p>
          La información publicada en el sitio (precios, horarios, sedes y requisitos) es referencial y
          puede variar sin previo aviso. El precio final y las condiciones aplicables se confirman en la
          sede o en el canal de atención al momento de la reserva.
        </p>
      </LegalSection>

      <LegalSection id="uso-sitio" number={3} title="Uso del sitio web">
        <p>El usuario se compromete a utilizar el sitio de forma lícita y diligente. Queda prohibido:</p>
        <LegalList
          items={[
            'Proporcionar información falsa, inexacta o de terceros sin autorización.',
            'Suplantar la identidad de otra persona o entidad.',
            'Introducir virus, código malicioso o realizar ataques que afecten la disponibilidad del sitio.',
            'Extraer, copiar o reutilizar el contenido del sitio con fines comerciales sin autorización escrita.',
            'Utilizar el sitio para enviar comunicaciones no solicitadas o contenido ilícito.',
            'Intentar acceder a áreas restringidas, bases de datos o sistemas internos.',
          ]}
        />
        <p>
          San Luis Medic se reserva el derecho de restringir el acceso al sitio a usuarios que incumplan
          estas reglas, sin perjuicio de las acciones legales que correspondan.
        </p>
      </LegalSection>

      <LegalSection id="reservas" number={4} title="Reservas, citas y pagos">
        <p>
          Las reservas pueden realizarse mediante el formulario del sitio, WhatsApp o de forma presencial
          en cualquiera de nuestras sedes. La reserva se considera confirmada cuando recibes la
          comunicación de confirmación por parte de San Luis Medic.
        </p>
        <LegalList
          items={[
            'La disponibilidad de cupos está sujeta a la capacidad de cada sede y al horario de atención.',
            'El usuario debe presentarse con la documentación requerida y con una anticipación mínima de 15 minutos.',
            'Las reprogramaciones deben solicitarse con al menos 24 horas de anticipación.',
            'El pago del servicio puede realizarse en la sede o mediante los canales habilitados. El comprobante se emite conforme a las normas tributarias.',
            'Los precios publicados incluyen los impuestos aplicables, salvo indicación contraria.',
            'No se realizan devoluciones por servicios ya prestados. Las devoluciones por inasistencias o servicios no prestados se evalúan según el caso y la normativa de protección al consumidor.',
          ]}
        />
        <LegalCallout title="Importante">
          <p>
            La inasistencia sin aviso previo puede generar la pérdida del cupo reservado. Si no puedes
            asistir, comunícalo cuanto antes para reprogramar tu cita.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection id="requisitos" number={5} title="Requisitos de atención">
        <p>Para ser atendido en nuestras sedes deberás:</p>
        <LegalList
          items={[
            'Presentar tu Documento Nacional de Identidad (DNI) vigente y en buen estado, o el documento oficial que corresponda.',
            'Presentar la licencia de conducir vigente, en los casos de revalidación o recategorización.',
            'Declarar de forma veraz tus antecedentes médicos y condiciones de salud relevantes.',
            'Cumplir con las indicaciones previas a la evaluación (por ejemplo, descanso o ausencia de sustancias que alteren los resultados).',
            'Firmar los consentimientos informados que correspondan.',
          ]}
        />
        <p>
          San Luis Medic puede negar la atención si el usuario no cumple los requisitos, se presenta en
          estado de alteración o intenta obtener un certificado mediante fraude. En tal caso, no
          procederá la devolución del pago.
        </p>
      </LegalSection>

      <LegalSection id="resultados" number={6} title="Resultados y certificados">
        <p>
          El resultado de la evaluación es determinado exclusivamente por el criterio del médico
          evaluador, sobre la base de los protocolos vigentes y de la información obtenida durante la
          evaluación. San Luis Medic no garantiza un resultado de aptitud: el certificado se emite
          únicamente cuando el evaluado cumple los requisitos médicos establecidos.
        </p>
        <LegalList
          items={[
            'El certificado de aptitud psicosomática se emite en el formato y plazo definidos por la autoridad competente.',
            'La validez del certificado está sujeta a las normas del MTC y a los plazos que dicha entidad establezca.',
            'El usuario es responsable de verificar que sus datos consignados en el certificado sean correctos antes de su uso.',
            'La información médica se remite a la autoridad competente cuando la normativa lo exige.',
          ]}
        />
      </LegalSection>

      <LegalSection id="propiedad" number={7} title="Propiedad intelectual">
        <p>
          Todos los contenidos del sitio web —incluyendo textos, marcas, logotipos, diseños, imágenes,
          código fuente, bases de datos y elementos gráficos— son propiedad de {LEGAL_ENTITY.name} o se
          utilizan con autorización de sus titulares. Están protegidos por la legislación peruana e
          internacional sobre propiedad intelectual.
        </p>
        <p>
          Se permite la visualización y descarga de contenidos para uso personal y no comercial. Queda
          prohibida su reproducción, distribución, modificación o explotación sin autorización previa y
          por escrito.
        </p>
      </LegalSection>

      <LegalSection id="responsabilidad" number={8} title="Limitación de responsabilidad">
        <p>
          San Luis Medic adopta medidas razonables para mantener la información actualizada y el sitio
          disponible, pero no garantiza la ausencia de interrupciones, errores o imprecisiones.
        </p>
        <LegalList
          items={[
            'No somos responsables por daños derivados del uso indebido del sitio o de la información publicada.',
            'No somos responsables por decisiones tomadas por el usuario en función de contenidos informativos del sitio.',
            'No somos responsables por interrupciones causadas por terceros, fallas de red, mantenimiento o fuerza mayor.',
            'La información publicada no sustituye la evaluación médica presencial ni la asesoría de un profesional de la salud.',
            'La responsabilidad de San Luis Medic se limita al monto efectivamente pagado por el servicio contratado, salvo dolo o culpa grave.',
          ]}
        />
      </LegalSection>

      <LegalSection id="terceros" number={9} title="Enlaces y servicios de terceros">
        <p>
          El sitio puede contener enlaces a plataformas de terceros, como WhatsApp, redes sociales, mapas
          o pasarelas de pago. Estos servicios se rigen por sus propias políticas y términos, respecto de
          los cuales San Luis Medic no tiene control ni asume responsabilidad. Te recomendamos revisar
          sus condiciones antes de utilizarlos.
        </p>
      </LegalSection>

      <LegalSection id="modificaciones" number={10} title="Modificaciones">
        <p>
          San Luis Medic puede modificar estos Términos y Condiciones en cualquier momento. La versión
          vigente será publicada en esta página con la fecha de actualización correspondiente. El uso
          continuado del sitio después de la publicación de los cambios implica su aceptación.
        </p>
      </LegalSection>

      <LegalSection id="ley" number={11} title="Ley aplicable y jurisdicción">
        <p>
          Estos Términos y Condiciones se rigen por la legislación de la República del Perú, en
          particular por el Código Civil, el Código de Protección y Defensa del Consumidor y las normas
          sectoriales aplicables.
        </p>
        <p>
          Cualquier controversia derivada del uso del sitio o de la prestación de los servicios será
          sometida a los jueces y tribunales competentes de la ciudad de Lima, sin perjuicio de los
          derechos que la ley reconoce al consumidor para acudir a la autoridad administrativa
          correspondiente.
        </p>
      </LegalSection>

      <LegalSection id="contacto" number={12} title="Contacto">
        <p>
          Para consultas sobre estos Términos y Condiciones, puedes comunicarte con nosotros a través de:
        </p>
        <LegalContactBlock email={LEGAL_ENTITY.email} />
        <p className="text-xs text-slate-500">
          Última actualización: {LEGAL_ENTITY.updated}.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
