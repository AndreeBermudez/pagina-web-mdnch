export interface AlcaldeBanner {
	alcaldeId: number;
	nombre: string;
	apellido: string;
	direccionImagen: string;
	tituloBannerPage: string;
	descripcionBannerPage: string;
	fechaCreacion: string;
}

export interface AlcaldeBannerFormData {
	nombre: string;
	apellido: string;
	direccionImagen: File;
	tituloBannerPage: string;
	descripcionBannerPage: string;
}

export interface AlcaldeBannerUpdateData {
	nombre: string;
	apellido: string;
	direccionImagen?: File;
	tituloBannerPage: string;
	descripcionBannerPage: string;
}