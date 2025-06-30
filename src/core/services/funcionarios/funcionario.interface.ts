export interface Funcionario {
	funcionarioId: number;
	nombre: string;
	apellido: string;
	cargo: string;
	contacto: string;
	direccionImagen?: string;
	fechaCreacion?: string;
}

export interface UpdatePayload {
	nombre: string;
	apellido: string;
	cargo: string;
	contacto: string;
	direccionImagen?: string;
}
