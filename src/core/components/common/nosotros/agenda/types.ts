// Definición de tipos para el calendario y eventos

export interface Evento {
  id: string;
  titulo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  ubicacion: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  destacado?: boolean;
  organizador?: string;
  descripcionCompleta?: string;
}

export interface DiaCalendario {
  fecha: Date;
  esMesActual: boolean;
  eventos: Evento[];
}

export interface ColorCategoria {
  clase: string;
  dot: string;
}

export interface ColoresCategorias {
  [key: string]: ColorCategoria;
  default: ColorCategoria;
}
