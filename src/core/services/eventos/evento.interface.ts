export interface Evento {
    eventoId?: number;
    categoria: string;
    fecha: string;
    titulo: string;
    descripcion: string;
    hora: string;
    ubicacion: string;
    direccionImagen: string;
}

export const initialEvento: Evento = {
    categoria: '',
    fecha: '',
    titulo: '',
    descripcion: '',
    hora: '',
    ubicacion: '',
    direccionImagen: ''
};