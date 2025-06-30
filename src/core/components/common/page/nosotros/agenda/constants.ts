import { type Evento, type ColoresCategorias } from './types';

// Datos iniciales de eventos
export const EVENTOS_INICIALES: Evento[] = [
  {
    id: "1",
    titulo: "ENTIERRO DEL NO CARNAVALÓN",
    fecha: "2025-03-12",
    horaInicio: "2:00 AM",
    horaFin: "6:00 PM",
    ubicacion: "Arterias de la ciudad Abancay",
    descripcion:
      "Tradicional entierro del No Carnavalón, un evento cultural que marca el fin de las festividades de carnaval en la ciudad de Abancay.",
    imagen: "https://via.placeholder.com/600x400",
    categoria: "Cultural",
    destacado: true,
    organizador: "Municipalidad de Abancay"
  },
  {
    id: "2",
    titulo: "Festival Gastronómico Regional",
    fecha: "2025-03-01",
    horaInicio: "10:00 AM",
    horaFin: "8:00 PM",
    ubicacion: "Plaza de Armas, Abancay",
    descripcion:
      "Gran festival gastronómico con los mejores platos típicos de la región Apurímac.",
    imagen: "https://via.placeholder.com/600x400",
    categoria: "Gastronomía",
    organizador: "Asociación de Restaurantes de Apurímac"
  },
  {
    id: "3",
    titulo: "Concierto de Música Andina",
    fecha: "2025-03-09",
    horaInicio: "7:00 PM",
    horaFin: "11:00 PM",
    ubicacion: "Coliseo Cerrado de Abancay",
    descripcion:
      "Presentación de los mejores grupos de música andina contemporánea y tradicional.",
    imagen: "https://via.placeholder.com/600x400",
    categoria: "Musical"
  },
  {
    id: "4",
    titulo: "Feria Artesanal",
    fecha: "2025-03-22",
    horaInicio: "9:00 AM",
    horaFin: "6:00 PM",
    ubicacion: "Parque Micaela Bastidas",
    descripcion:
      "Exposición y venta de artesanías locales, textiles tradicionales y productos regionales.",
    imagen: "https://via.placeholder.com/600x400",
    categoria: "Artesanía"
  },
  {
    id: "5",
    titulo: "Maratón Municipal",
    fecha: "2025-03-28",
    horaInicio: "8:00 AM",
    horaFin: "12:00 PM",
    ubicacion: "Estadio Municipal",
    descripcion:
      "Carrera atlética con recorrido por los principales puntos de la ciudad.",
    imagen: "https://via.placeholder.com/600x400",
    categoria: "Deportivo"
  },
  {
    id: "6",
    titulo: "Taller de Danzas Folclóricas",
    fecha: "2025-03-15",
    horaInicio: "3:00 PM",
    horaFin: "6:00 PM",
    ubicacion: "Casa de la Cultura",
    descripcion:
      "Aprende las danzas tradicionales de la región con instructores profesionales.",
    imagen: "https://via.placeholder.com/600x400",
    categoria: "Cultural"
  },
  {
    id: "7",
    titulo: "Exposición Fotográfica",
    fecha: "2025-03-27",
    horaInicio: "10:00 AM",
    horaFin: "7:00 PM",
    ubicacion: "Galería Municipal",
    descripcion:
      "Muestra fotográfica 'Rostros de Apurímac' con imágenes que capturan la esencia de la región.",
    imagen: "https://via.placeholder.com/600x400",
    categoria: "Arte"
  },
];

// Nombres de los meses
export const MESES: string[] = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

// Mapeo de categorías a clases de Tailwind para fondo y textos
export const COLORES_CATEGORIAS: ColoresCategorias = {
  Cultural: { clase: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  Gastronomía: { clase: "bg-cyan-100 text-cyan-800", dot: "bg-cyan-500" },
  Musical: { clase: "bg-sky-100 text-sky-800", dot: "bg-sky-500" },
  Artesanía: { clase: "bg-indigo-100 text-indigo-800", dot: "bg-indigo-500" },
  Deportivo: { clase: "bg-teal-100 text-teal-800", dot: "bg-teal-500" },
  Arte: { clase: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  default: { clase: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
};
