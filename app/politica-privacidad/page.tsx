import type { Metadata } from 'next'
import {
  LegalCallout,
  LegalContactBlock,
  LegalList,
  LegalPage,
  LegalSection,
  LegalSubsection,
  LegalTable,
} from '@/components/legal'
import { LEGAL_ENTITY } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Política de Privacidad | San Luis Medic',
  description:
    'Conoce cómo San Luis Medic recopila, usa, conserva y protege tus datos personales al usar nuestro sitio web y nuestros servicios médicos para brevete.',
  alternates: {
    canonical: 'https://sanluismedic.pe/politica-privacidad',
  },
  openGraph: {
    title: 'Política de Privacidad | San Luis Medic',
    description:
      'Información sobre el tratamiento de datos personales en San Luis Medic, conforme a la Ley N° 29733.',
    url: 'https://sanluismedic.pe/politica-privacidad',
    locale: 'es_PE',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const NAV = [
  { id: 'responsable', label: 'Responsable del tratamiento' },
  { id: 'datos', label: 'Datos que recopilamos' },
  { id: 'finalidades', label: 'Finalidades del tratamiento' },
  { id: 'base-legal', label: 'Base legal y consentimiento' },
  { id: 'datos-sensibles', label: 'Datos sensibles de salud' },
  { id: 'conservacion', label: 'Plazo de conservación' },
  { id: 'comunicaciones', label: 'Comunicaciones y encargados' },
  { id: 'derechos', label: 'Tus derechos' },
  { id: 'seguridad', label: 'Seguridad de la información' },
  { id: 'menores', label: 'Menores de edad' },
  { id: 'cambios', label: 'Cambios a esta política' },
  { id: 'contacto', label: 'Contacto y reclamos' },
]

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Información legal"
      title="Política de"
      highlight="Privacidad"
      breadcrumb="Política de Privacidad"
      description="Cómo recopilamos, usamos y protegemos tus datos personales cuando navegas en nuestro sitio o realizas un trámite con nosotros."
      nav={NAV}
    >
      <LegalSection id="responsable" number={1} title="Responsable del tratamiento">
        <p>
          El responsable del tratamiento de tus datos personales es <strong>{LEGAL_ENTITY.name}</strong>,
          con domicilio en {LEGAL_ENTITY.address}, inscrita en los registros correspondientes para la
          prestación de servicios de salud y evaluaciones médicas de aptitud psicosomática.
        </p>
        <p>
          Para cualquier consulta relacionada con esta política puedes escribirnos a{' '}
          <a href={`mailto:${LEGAL_ENTITY.dataEmail}`} className="text-[#158cca] font-bold hover:underline">
            {LEGAL_ENTITY.dataEmail}
          </a>{' '}
          o comunicarte al {LEGAL_ENTITY.phone}.
        </p>
      </LegalSection>

      <LegalSection id="datos" number={2} title="Datos personales que recopilamos">
        <p>
          Recopilamos únicamente los datos necesarios para atender tu solicitud y brindarte el servicio
          médico. Según el canal que utilices, podemos tratar:
        </p>
        <LegalSubsection title="Datos de identificación y contacto">
          <LegalList
            items={[
              'Nombres y apellidos completos.',
              'Número de documento nacional de identidad (DNI) o carné de extranjería.',
              'Fecha de nacimiento, nacionalidad y sexo.',
              'Número de teléfono, WhatsApp y correo electrónico.',
              'Dirección de residencia, cuando sea necesaria para la atención.',
            ]}
          />
        </LegalSubsection>
        <LegalSubsection title="Datos del servicio">
          <LegalList
            items={[
              'Categoría de licencia de conducir solicitada y sede de atención.',
              'Fecha y hora de la cita, así como el historial de atenciones.',
              'Comprobantes de pago y datos de facturación.',
              'Comunicaciones que mantengas con nosotros por formularios, correo o WhatsApp.',
            ]}
          />
        </LegalSubsection>
        <LegalSubsection title="Datos médicos">
          <LegalList
            items={[
              'Resultados de la evaluación médica de aptitud psicosomática.',
              'Antecedentes médicos declarados por el usuario.',
              'Registros biométricos y audiovisuales generados durante la evaluación.',
            ]}
          />
        </LegalSubsection>
        <LegalSubsection title="Datos de navegación">
          <p>
            Cuando visitas el sitio web podemos registrar información técnica como dirección IP,
            tipo de dispositivo, navegador, páginas visitadas y tiempo de permanencia. Estos datos se
            usan de forma agregada y solo se asocian a cookies analíticas si otorgas tu consentimiento,
            conforme a nuestra Política de Cookies.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection id="finalidades" number={3} title="Finalidades del tratamiento">
        <p>Tus datos personales son tratados para las siguientes finalidades:</p>
        <LegalList
          items={[
            'Gestionar reservas, reprogramaciones y atención de citas en nuestras sedes.',
            'Realizar la evaluación médica de aptitud psicosomática y emitir el certificado correspondiente.',
            'Remitir la información médica a las autoridades competentes, cuando la normativa de tránsito lo exija.',
            'Atender consultas, reclamos y solicitudes de información.',
            'Emitir comprobantes de pago y cumplir obligaciones contables y tributarias.',
            'Enviar recordatorios o comunicaciones relacionadas con el servicio contratado.',
            'Enviar información comercial sobre nuestros servicios, solo si otorgaste tu consentimiento previo y expreso.',
            'Prevenir fraudes, verificar identidad y reforzar la seguridad de nuestras instalaciones.',
            'Elaborar estadísticas internas con datos disociados o agregados.',
          ]}
        />
        <LegalCallout title="No vendemos tus datos">
          <p>
            {LEGAL_ENTITY.name} no comercializa ni cede tus datos personales a terceros con fines
            publicitarios. Cualquier cesión se realiza únicamente en los supuestos previstos por ley o
            con tu consentimiento.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection id="base-legal" number={4} title="Base legal y consentimiento">
        <p>
          El tratamiento se sustenta en la Ley N° 29733, Ley de Protección de Datos Personales, su
          reglamento y las normas que la modifiquen o complementen, así como en la normativa sectorial
          de salud y tránsito aplicable.
        </p>
        <LegalList
          items={[
            'Tu consentimiento libre, previo, expreso, informado e inequívoco, otorgado al momento de reservar o atenderse.',
            'La ejecución de la relación contractual o precontractual derivada del servicio solicitado.',
            'El cumplimiento de obligaciones legales, como la emisión de certificados médicos y la conservación de registros.',
            'El interés legítimo en la prevención de fraudes y la seguridad de nuestras sedes, sin afectar tus derechos fundamentales.',
          ]}
        />
        <p>
          Puedes retirar tu consentimiento en cualquier momento, sin efecto retroactivo, salvo que el
          tratamiento sea necesario para cumplir una obligación legal o para la defensa de derechos en
          un procedimiento.
        </p>
      </LegalSection>

      <LegalSection id="datos-sensibles" number={5} title="Datos sensibles de salud">
        <p>
          La información médica es considerada dato sensible. Su tratamiento se realiza con medidas de
          seguridad reforzadas, acceso restringido al personal médico y administrativo autorizado, y
          únicamente para las finalidades descritas en esta política.
        </p>
        <p>
          El certificado de aptitud psicosomática es remitido a la autoridad competente a través de los
          canales oficiales, conforme a la normativa vigente. En ningún caso difundimos públicamente tus
          resultados médicos.
        </p>
      </LegalSection>

      <LegalSection id="conservacion" number={6} title="Plazo de conservación">
        <p>
          Conservamos tus datos durante el tiempo necesario para cumplir las finalidades descritas y
          los plazos legales aplicables:
        </p>
        <LegalTable
          head={['Tipo de dato', 'Plazo de conservación']}
          rows={[
            ['Historia clínica y resultados médicos', 'El plazo exigido por la normativa de salud y de tránsito (mínimo 5 años).'],
            ['Datos de identificación y contacto', 'Mientras exista relación con el usuario y hasta 2 años después.'],
            ['Documentos contables y de facturación', 'Hasta 10 años, conforme a las normas tributarias.'],
            ['Datos de navegación y cookies', 'Según la duración indicada en la Política de Cookies.'],
            ['Comunicaciones y consultas', 'Hasta 2 años desde la última interacción.'],
          ]}
        />
        <p>
          Cumplido el plazo, los datos son eliminados o disociados de forma segura, salvo que exista una
          obligación legal o una solicitud de conservación por parte de una autoridad competente.
        </p>
      </LegalSection>

      <LegalSection id="comunicaciones" number={7} title="Comunicaciones y encargados del tratamiento">
        <p>Podemos compartir tus datos con:</p>
        <LegalList
          items={[
            'Autoridades de tránsito y salud competentes, cuando exista mandato legal.',
            'Proveedores de servicios tecnológicos, hosting, mensajería y analítica, que actúan como encargados bajo nuestras instrucciones y con obligaciones de confidencialidad.',
            'Entidades financieras o pasarelas de pago, para procesar el pago del servicio.',
            'Asesores legales, contables o auditores, cuando sea necesario para el cumplimiento normativo.',
          ]}
        />
        <p>
          Cuando exista transferencia de datos a terceros países, verificamos que el destinatario ofrezca
          un nivel de protección adecuado o suscribimos los resguardos contractuales correspondientes,
          conforme a la normativa peruana de protección de datos.
        </p>
      </LegalSection>

      <LegalSection id="derechos" number={8} title="Tus derechos">
        <p>
          Como titular de datos personales puedes ejercer gratuitamente los siguientes derechos:
        </p>
        <LegalTable
          head={['Derecho', 'En qué consiste']}
          rows={[
            ['Acceso', 'Conocer qué datos personales tuyos tratamos y las condiciones del tratamiento.'],
            ['Rectificación', 'Solicitar la corrección de datos inexactos, incompletos o desactualizados.'],
            ['Cancelación', 'Pedir la eliminación de tus datos cuando ya no sean necesarios o el tratamiento sea ilegal.'],
            ['Oposición', 'Oponerte a un tratamiento concreto, por ejemplo, al envío de comunicaciones comerciales.'],
            ['Portabilidad', 'Recibir tus datos en un formato estructurado y de uso común, cuando sea técnicamente posible.'],
            ['Información', 'Ser informado sobre la existencia de un banco de datos y su finalidad.'],
          ]}
        />
        <p>
          Para ejercerlos, envía una solicitud a{' '}
          <a href={`mailto:${LEGAL_ENTITY.dataEmail}`} className="text-[#158cca] font-bold hover:underline">
            {LEGAL_ENTITY.dataEmail}
          </a>{' '}
          indicando tu nombre completo, número de DNI, el derecho que deseas ejercer y la documentación
          que acredite tu identidad. Responderemos en un plazo máximo de diez (10) días hábiles para el
          acceso y de veinte (20) días hábiles para los demás derechos, conforme a ley.
        </p>
        <LegalCallout title="Autoridad de control">
          <p>
            Si consideras que tu solicitud no fue atendida correctamente, puedes presentar un reclamo ante
            la Autoridad Nacional de Protección de Datos Personales (ANPD), adscrita al Ministerio de
            Justicia y Derechos Humanos.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection id="seguridad" number={9} title="Seguridad de la información">
        <p>
          Aplicamos medidas técnicas, organizativas y legales para proteger tus datos frente a accesos no
          autorizados, pérdida, alteración o divulgación indebida, entre ellas:
        </p>
        <LegalList
          items={[
            'Control de acceso por roles y autenticación del personal autorizado.',
            'Cifrado de comunicaciones mediante protocolos seguros (HTTPS).',
            'Respaldo periódico de la información y planes de recuperación.',
            'Capacitación del personal en protección de datos y confidencialidad.',
            'Registro y auditoría de accesos a historias clínicas.',
            'Eliminación segura de documentos físicos y digitales al vencer su plazo de conservación.',
          ]}
        />
        <p>
          Ante un incidente de seguridad que afecte significativamente tus datos, notificaremos a la
          autoridad competente y a los titulares afectados en los plazos establecidos por la normativa.
        </p>
      </LegalSection>

      <LegalSection id="menores" number={10} title="Menores de edad">
        <p>
          Nuestros servicios están dirigidos a personas mayores de edad con capacidad legal para
          contratar. Si se detecta el tratamiento de datos de un menor sin la autorización de su padre,
          madre o representante legal, procederemos a su eliminación. Los trámites que involucren a
          menores deben ser gestionados por su representante legal.
        </p>
      </LegalSection>

      <LegalSection id="cambios" number={11} title="Cambios a esta política">
        <p>
          Podemos actualizar esta Política de Privacidad para reflejar cambios normativos o mejoras en
          nuestros procesos. La versión vigente estará siempre publicada en esta página, con indicación
          de la fecha de última actualización. Cuando los cambios afecten de forma sustancial el
          tratamiento de tus datos, lo comunicaremos por los canales de contacto disponibles.
        </p>
      </LegalSection>

      <LegalSection id="contacto" number={12} title="Contacto y reclamos">
        <p>
          Para consultas, solicitudes o reclamos relacionados con el tratamiento de tus datos personales,
          contáctanos a través de los siguientes canales:
        </p>
        <LegalContactBlock />
        <p className="text-xs text-slate-500">
          También puedes presentar tu reclamo en el Libro de Reclamaciones disponible en cada una de
          nuestras sedes, conforme al Código de Protección y Defensa del Consumidor.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
