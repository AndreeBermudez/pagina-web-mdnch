export interface Miembro {
	id: number;
	nombre: string;
	apellido: string;
}

export interface Equipo {
	equipoId?: number;
	nombre: string;
	apellido: string;
}

export interface Consejo {
	consejoMuniId?: number;
	nombre: string;
	apellido: string;
	cargo: string;
	area: string;
	direccionImagen?: string;
	fechaCreacion?: string;
	miembros?: Miembro[];
	equipos?: Equipo[];
}
