import type { Metadata } from 'next'
import Link from 'next/link'
import {
  LegalCallout,
  LegalContactBlock,
  LegalList,
  LegalPage,
  LegalSection,
  LegalTable,
} from '@/components/legal'
import { LEGAL_ENTITY } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Política de Datos | San Luis Medic',
  description:
    'Política de tratamiento y protección de datos personales de San Luis Medic: principios, banco de datos, medidas de seguridad, encargados y ejercicio de derechos.',
  alternates: {
    canonical: 'https://sanluismedic.pe/politica-datos',
  },
  openGraph: {
    title: 'Política de Datos | San Luis Medic',
    description:
      'Principios y procedimientos que aplicamos para el tratamiento responsable de datos personales.',
    url: 'https://sanluismedic.pe/politica-datos',
    locale: 'es_PE',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const NAV = [
  { id: 'alcance', label: 'Alcance y definiciones' },
  { id: 'principios', label: 'Principios rectores' },
  { id: 'banco', label: 'Banco de datos personales' },
  { id: 'roles', label: 'Roles y responsabilidades' },
  { id: 'ciclo', label: 'Ciclo de vida del dato' },
  { id: 'encargados', label: 'Encargados y transferencias' },
  { id: 'seguridad', label: 'Medidas de seguridad' },
  { id: 'incidentes', label: 'Incidentes de seguridad' },
  { id: 'derechos', label: 'Ejercicio de derechos' },
  { id: 'conservacion', label: 'Conservación y eliminación' },
  { id: 'gobernanza', label: 'Gobernanza y capacitación' },
  { id: 'contacto', label: 'Contacto' },
]

export default function PoliticaDatosPage() {
  return (
    <LegalPage
      eyebrow="Información legal"
      title="Política de"
      highlight="Datos"
      breadcrumb="Política de Datos"
      description="Nuestra política de tratamiento y protección de datos personales: principios, controles, responsabilidades y derechos de los titulares."
      nav={NAV}
    >
      <LegalSection id="alcance" number={1} title="Alcance y definiciones">
        <p>
          Esta Política de Datos establece los lineamientos que aplica <strong>{LEGAL_ENTITY.name}</strong>{' '}
          para el tratamiento de datos personales en todos sus procesos, sedes y canales digitales. Es
          complementaria a nuestra{' '}
          <Link href="/politica-privacidad" className="text-[#158cca] font-bold hover:underline">
            Política de Privacidad
          </Link>
          , que detalla los datos recopilados y las finalidades.
        </p>
        <LegalTable
          head={['Término', 'Definición']}
          rows={[
            ['Dato personal', 'Información que identifica o hace identificable a una persona natural.'],
            ['Dato sensible', 'Datos referidos a salud, biometría, origen étnico, convicciones o vida sexual.'],
            ['Titular', 'Persona natural a quien corresponden los datos personales.'],
            ['Tratamiento', 'Cualquier operación sobre datos: recolección, almacenamiento, uso, transferencia o eliminación.'],
            ['Encargado', 'Proveedor que trata datos por cuenta y bajo instrucciones del responsable.'],
            ['Responsable', 'San Luis Medic, quien decide sobre las finalidades y medios del tratamiento.'],
          ]}
        />
      </LegalSection>

      <LegalSection id="principios" number={2} title="Principios rectores">
        <p>
          Nuestro tratamiento se rige por los principios de la Ley N° 29733 y su reglamento:
        </p>
        <LegalList
          items={[
            <><strong>Legalidad:</strong> tratamos datos conforme al ordenamiento jurídico, sin afectar derechos fundamentales.</>,
            <><strong>Consentimiento:</strong> recabamos el consentimiento previo, expreso e informado, salvo excepciones legales.</>,
            <><strong>Finalidad:</strong> los datos solo se usan para fines determinados, explícitos y lícitos.</>,
            <><strong>Proporcionalidad y calidad:</strong> recopilamos lo estrictamente necesario y procuramos que sea exacto y actualizado.</>,
            <><strong>Seguridad:</strong> aplicamos medidas técnicas y organizativas para evitar pérdidas o accesos indebidos.</>,
            <><strong>Disposición de residuos:</strong> eliminamos los datos cuando dejan de ser necesarios.</>,
            <><strong>Nivel de protección adecuado:</strong> exigimos protección equivalente en transferencias nacionales o internacionales.</>,
            <><strong>Responsabilidad:</strong> documentamos y demostramos el cumplimiento de nuestras obligaciones.</>,
          ]}
        />
      </LegalSection>

      <LegalSection id="banco" number={3} title="Banco de datos personales">
        <p>
          Los datos se almacenan en los siguientes bancos, bajo titularidad de {LEGAL_ENTITY.name}:
        </p>
        <LegalTable
          head={['Banco de datos', 'Titulares', 'Finalidad']}
          rows={[
            ['Usuarios y clientes', 'Personas que reservan o solicitan información', 'Gestión de citas, atención y comunicaciones.'],
            ['Historias clínicas', 'Pacientes evaluados', 'Registro de la evaluación médica y emisión de certificados.'],
            ['Facturación', 'Clientes y proveedores', 'Emisión de comprobantes y cumplimiento tributario.'],
            ['Recursos humanos', 'Colaboradores y postulantes', 'Gestión laboral y procesos de selección.'],
            ['Videovigilancia', 'Visitantes y personal', 'Seguridad de las instalaciones.'],
            ['Navegación web', 'Usuarios del sitio', 'Funcionamiento del sitio y estadísticas agregadas.'],
          ]}
        />
        <p>
          Los bancos se encuentran inscritos o en proceso de inscripción ante la Autoridad Nacional de
          Protección de Datos Personales, conforme a la normativa vigente.
        </p>
      </LegalSection>

      <LegalSection id="roles" number={4} title="Roles y responsabilidades">
        <LegalList
          items={[
            <><strong>Dirección General:</strong> aprueba esta política y asigna los recursos necesarios para su cumplimiento.</>,
            <><strong>Oficial de Protección de Datos:</strong> coordina la implementación, atiende solicitudes, evalúa riesgos y reporta incidentes.</>,
            <><strong>Área de Sistemas:</strong> administra accesos, respaldos, cifrado y medidas de seguridad de la información.</>,
            <><strong>Jefaturas de sede:</strong> supervisan el tratamiento en cada local y la custodia de documentos físicos.</>,
            <><strong>Colaboradores:</strong> tratan datos solo en el marco de sus funciones y guardan confidencialidad.</>,
          ]}
        />
        <p>
          Todo el personal firma acuerdos de confidencialidad y recibe capacitación periódica sobre
          protección de datos y secreto médico.
        </p>
      </LegalSection>

      <LegalSection id="ciclo" number={5} title="Ciclo de vida del dato">
        <p>
          El tratamiento sigue un ciclo controlado en cada etapa:
        </p>
        <LegalTable
          head={['Etapa', 'Controles aplicados']}
          rows={[
            ['Recolección', 'Formularios con avisos de privacidad, verificación de identidad y consentimientos informados.'],
            ['Almacenamiento', 'Bases de datos con acceso por roles, cifrado en tránsito y respaldos periódicos.'],
            ['Uso', 'Acceso limitado a personal autorizado según la finalidad y el principio de necesidad.'],
            ['Transferencia', 'Evaluación previa del destinatario y suscripción de cláusulas contractuales.'],
            ['Eliminación', 'Borrado seguro, disociación o anonimización al cumplirse el plazo de conservación.'],
          ]}
        />
      </LegalSection>

      <LegalSection id="encargados" number={6} title="Encargados y transferencias">
        <p>
          Cuando contratamos proveedores que acceden a datos personales, suscribimos acuerdos que
          incluyen obligaciones de confidencialidad, seguridad, uso limitado a nuestras instrucciones y
          devolución o eliminación al término del servicio.
        </p>
        <LegalList
          items={[
            'Proveedores de hosting y servicios en la nube.',
            'Plataformas de mensajería y comunicación con clientes.',
            'Servicios de análisis web y medición de tráfico.',
            'Empresas de mensajería o transporte de documentación.',
            'Pasarelas de pago y entidades financieras.',
          ]}
        />
        <p>
          Para transferencias internacionales verificamos el nivel de protección del país de destino,
          aplicamos cláusulas contractuales o recabamos el consentimiento del titular cuando corresponda.
        </p>
      </LegalSection>

      <LegalSection id="seguridad" number={7} title="Medidas de seguridad">
        <p>
          Implementamos un enfoque de seguridad por capas, proporcional a la sensibilidad de la
          información:
        </p>
        <LegalList
          items={[
            'Autenticación con contraseñas robustas y control de sesiones.',
            'Segmentación de redes y restricción de accesos físicos a áreas de archivo.',
            'Cifrado de datos en tránsito mediante TLS/HTTPS.',
            'Registro de auditoría de accesos a historias clínicas.',
            'Respaldos automáticos y pruebas de restauración.',
            'Protección antivirus, cortafuegos y actualizaciones de seguridad.',
            'Política de escritorio limpio y destrucción segura de documentos.',
          ]}
        />
        <p>
          Los niveles de acceso se revisan periódicamente y se revocan de inmediato cuando un colaborador
          deja de cumplir funciones que los requieran.
        </p>
      </LegalSection>

      <LegalSection id="incidentes" number={8} title="Incidentes de seguridad">
        <p>
          Contamos con un procedimiento de gestión de incidentes que comprende detección, contención,
          evaluación de impacto, mitigación y documentación. Ante una vulneración de seguridad que afecte
          datos personales, actuamos de la siguiente manera:
        </p>
        <LegalList
          items={[
            'Notificación a la Autoridad Nacional de Protección de Datos Personales en el plazo legal aplicable.',
            'Comunicación a los titulares afectados cuando exista un riesgo significativo para sus derechos.',
            'Registro del incidente, sus causas y las medidas correctivas adoptadas.',
            'Revisión posterior para prevenir recurrencias y mejorar los controles.',
          ]}
        />
      </LegalSection>

      <LegalSection id="derechos" number={9} title="Ejercicio de derechos">
        <p>
          Los titulares pueden ejercer sus derechos de acceso, rectificación, cancelación, oposición,
          portabilidad e información. El procedimiento es gratuito y no requiere justificación.
        </p>
        <LegalTable
          head={['Etapa', 'Plazo']}
          rows={[
            ['Recepción y validación de la solicitud', 'Hasta 3 días hábiles'],
            ['Respuesta a solicitudes de acceso', 'Máximo 10 días hábiles'],
            ['Respuesta a rectificación, cancelación u oposición', 'Máximo 20 días hábiles'],
            ['Ampliación por complejidad', 'Hasta 10 días hábiles adicionales, con comunicación previa'],
          ]}
        />
        <LegalCallout title="Cómo presentar tu solicitud">
          <p>
            Envía un correo a{' '}
            <a href={`mailto:${LEGAL_ENTITY.dataEmail}`} className="text-[#158cca] font-bold hover:underline">
              {LEGAL_ENTITY.dataEmail}
            </a>{' '}
            con tu nombre completo, número de DNI, el derecho que deseas ejercer y los datos sobre los
            que se refiere la solicitud. También puedes presentarla presencialmente en cualquiera de
            nuestras sedes.
          </p>
        </LegalCallout>
        <p>
          Si la solicitud es denegada, te informaremos los motivos y el mecanismo para impugnar la
          decisión ante la autoridad competente.
        </p>
      </LegalSection>

      <LegalSection id="conservacion" number={10} title="Conservación y eliminación">
        <p>
          Conservamos los datos solo mientras sean necesarios para la finalidad que motivó su
          recolección o mientras exista una obligación legal de conservarlos. Cumplido el plazo, se
          eliminan de forma segura o se anonimizan para fines estadísticos.
        </p>
        <p>
          La documentación física se destruye mediante mecanismos de trituración certificada, con
          registro del acta correspondiente. Los respaldos digitales se eliminan conforme a los ciclos
          de rotación definidos por el área de sistemas.
        </p>
      </LegalSection>

      <LegalSection id="gobernanza" number={11} title="Gobernanza y capacitación">
        <p>
          Esta política se revisa al menos una vez al año o cuando ocurra un cambio normativo relevante.
          El Oficial de Protección de Datos mantiene un registro de actividades de tratamiento, evalúa
          riesgos y propone mejoras.
        </p>
        <LegalList
          items={[
            'Capacitación anual obligatoria para todo el personal.',
            'Evaluaciones de impacto para nuevos proyectos que traten datos sensibles.',
            'Auditorías internas periódicas de cumplimiento.',
            'Canal de consultas y denuncias para colaboradores.',
            'Revisión de contratos con proveedores que traten datos personales.',
          ]}
        />
      </LegalSection>

      <LegalSection id="contacto" number={12} title="Contacto">
        <p>
          Para consultas relacionadas con esta política o con el tratamiento de tus datos personales:
        </p>
        <LegalContactBlock />
        <p className="text-xs text-slate-500">Última actualización: {LEGAL_ENTITY.updated}.</p>
      </LegalSection>
    </LegalPage>
  )
}
