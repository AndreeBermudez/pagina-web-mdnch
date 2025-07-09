
export interface Evento {
	id: string;
	titulo: string;
	categoria: string;
	horaInicio: string;
	horaFin: string;
	direccion: string;
	fecha: string; // formato YYYY-MM-DD
}

export interface DiaCalendario {
	fecha: Date;
	esMesActual: boolean;
}
