
export interface NoticiaResponse {
  noticiaId?: number;
  titulo: string;
  categoria: string;
  descripcion: string;
  direccionImagen: string;
  fechaManual: string;
  fechaCreacion: string;
  fechaModificacion?: string;
  responsable: string;
}

export interface NoticiaRequest {
	titulo: string;
	categoria: string;
	descripcion: string;
  fechaManual: string;
	imagen?: File;
}

export interface ResponseBase<T> {
    success: boolean;
    message: string;
    data: T;
}