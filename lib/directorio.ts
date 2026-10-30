export type Centro = {
  id: string
  nombre: string
  ciudad: string
  distrito: string
  direccion: string
  telefonoHref: string
  whatsapp: string
  tiktok: string
  facebook: string
  horario: string
  abreSabado: boolean
  servicios: string[]
  precioExamen: number
  lat: number
  lng: number
  mapQuery: string
}

export const PRECIO_EXAMEN = 130

export const TARIFAS = [
  {
    titulo: 'Examen médico',
    precio: 130,
    detalle: 'Nuevo trámite, revalidación, canje extranjero y recategorización de licencias de moto y carro.',
  },
  {
    titulo: 'Duplicado de licencia de moto',
    precio: 30,
    detalle: 'Solo para certificados aprobados en el centro durante los últimos seis meses y no utilizados.',
  },
  {
    titulo: 'Duplicado de licencia de carro',
    precio: 20,
    detalle: 'Solo para certificados aprobados en el centro durante los últimos seis meses y no utilizados.',
  },
]

export const EVALUACIONES = [
  {
    titulo: 'Matrícula',
    duracion: 'Registro',
    detalle: 'Registro de los datos del postulante para iniciar el proceso del examen médico.',
  },
  {
    titulo: 'Laboratorio',
    duracion: '5 minutos',
    detalle: 'Medición de talla y peso, y toma de muestra de sangre únicamente para determinar el grupo sanguíneo.',
  },
  {
    titulo: 'Psicología',
    duracion: '80 minutos',
    detalle: 'Resolución de preguntas y pruebas con la orientación del licenciado en Psicología, dentro del tiempo establecido.',
  },
  {
    titulo: 'Oftalmología',
    duracion: '15 minutos',
    detalle: 'Evaluación de la vista para verificar la capacidad visual del postulante.',
  },
  {
    titulo: 'Otorrinolaringología',
    duracion: '15 minutos',
    detalle: 'Evaluación de la capacidad auditiva del postulante.',
  },
  {
    titulo: 'Medicina General',
    duracion: '15 minutos',
    detalle: 'Evaluación clínica general para revisar el estado de salud del postulante.',
  },
]

const SERVICIOS_BASE = [
  'Laboratorio',
  'Psicología',
  'Oftalmología',
  'Otorrinolaringología',
  'Medicina general',
]

export const CENTROS: Centro[] = [
  {
    id: 'lima-independencia',
    nombre: 'San Luis Medic — Sede Lima',
    ciudad: 'Lima',
    distrito: 'Independencia',
    direccion: 'Av. Carlos Izaguirre 108, Independencia 15311',
    telefonoHref: 'tel:+5116429971',
    whatsapp: '51966600891',
    tiktok: 'https://www.tiktok.com/@sanluismediclima',
    facebook: 'https://www.facebook.com/profile.php?id=61575655906856',
    horario: 'Lunes a sábado, 8:00 a 18:00',
    abreSabado: true,
    servicios: SERVICIOS_BASE,
    precioExamen: PRECIO_EXAMEN,
    lat: -11.988863,
    lng: -77.057482,
    mapQuery: 'Av. Carlos Izaguirre 108, Independencia, Lima',
  },
  {
    id: 'andahuaylas',
    nombre: 'San Luis Medic — Sede Andahuaylas',
    ciudad: 'Andahuaylas',
    distrito: 'Andahuaylas',
    direccion: 'Jr. Alfonso Ugarte N.º 354, frente a la ex UGEL Andahuaylas',
    telefonoHref: 'tel:+5154234567',
    whatsapp: '51941971060',
    tiktok: 'https://www.tiktok.com/@sancristobal_andahuaylas',
    facebook: 'https://www.facebook.com/sanluismedicandahuaylas',
    horario: 'Lunes a sábado, 9:00 a 18:00',
    abreSabado: true,
    servicios: SERVICIOS_BASE,
    precioExamen: PRECIO_EXAMEN,
    lat: -13.651203637235811,
    lng: -73.36337728787365,
    mapQuery: 'Jr. Alfonso Ugarte 354, Andahuaylas',
  },
  {
    id: 'ayacucho',
    nombre: 'San Luis Medic — Sede Ayacucho',
    ciudad: 'Ayacucho',
    distrito: 'Jesús Nazareno',
    direccion: 'Jr. José Santos Chocano N.º 410, Jesús Nazareno, Huamanga',
    telefonoHref: 'tel:+5144345678',
    whatsapp: '51947992807',
    tiktok: 'https://www.tiktok.com/@brevetesapurimac410',
    facebook: 'https://www.facebook.com/profile.php?id=61558734843609',
    horario: 'Lunes a viernes, 8:00 a 17:00',
    abreSabado: false,
    servicios: SERVICIOS_BASE,
    precioExamen: PRECIO_EXAMEN,
    lat: -13.156021376519789,
    lng: -74.21794367539681,
    mapQuery: 'Jr. José Santos Chocano 410, Jesús Nazareno, Huamanga, Ayacucho',
  },
]

export const CIUDADES = Array.from(new Set(CENTROS.map((centro) => centro.ciudad)))

export const FECHA_ACTUALIZACION = 'octubre de 2026'
