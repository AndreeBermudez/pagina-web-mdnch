
export interface NoticiaResponse {
  noticiaId?: number;
  titulo: string;
  categoria: string;
  descripcion: string;
  direccionImagen: string;
  fechaCreacion: string;
  fechaModificacion?: string;
  responsable: string;
}

export interface NoticiaRequest {
	titulo: string;
	categoria: string;
	descripcion: string;
	imagen: File;
}