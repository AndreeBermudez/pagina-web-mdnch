export interface Servicio {
	serviciosMuniId: number;
	titulo: string;
	descripcion: string;
	link: string;
	fechaCreacion?: string;
	fechaModificacion?: string;
}

export interface ServicioFormData {
	titulo: string;
	descripcion: string;
	link: string;
}

export interface ServicioRequest extends ServicioFormData {}

export interface ServicioResponse extends Servicio {}

export interface ServicioUpdateData extends ServicioFormData {}