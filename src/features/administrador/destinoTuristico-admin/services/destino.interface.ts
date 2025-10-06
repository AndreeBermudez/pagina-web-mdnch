export interface Destino {
	destinoTuristicoId: number;
	video: string;
	fechaCreacion?: string;
	fechaModificacion?: string;
}

export interface DestinoFormData {
	video: string;
}

export interface DestinoRequest extends DestinoFormData {}

export interface DestinoResponse extends Destino {}

export interface DestinoUpdateData extends DestinoFormData {}