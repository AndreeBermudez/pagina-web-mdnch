import { z } from 'zod';

export const alcaldeBannerRequest = z.object({
	nombre: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre no debe exceder 100 caracteres'),
	apellido: z.string().min(1, 'El apellido es requerido').max(100, 'El apellido no debe exceder 100 caracteres'),
	direccionImagen: z
		.instanceof(File, { message: 'La imagen es requerida' })
		.refine((file) => file.type.startsWith('image/'), 'El archivo debe ser una imagen')
		.refine((file) => file.size <= 5 * 1024 * 1024, 'La imagen no debe superar 5MB'),
	tituloBannerPage: z
		.string()
		.min(1, 'El título del banner es requerido')
		.max(200, 'El título no debe exceder 200 caracteres'),
	descripcionBannerPage: z
		.string()
		.min(1, 'La descripción del banner es requerida')
		.max(500, 'La descripción no debe exceder 500 caracteres'),
});

export const alcaldeBannerEditForm = z.object({
	nombre: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre no debe exceder 100 caracteres'),
	apellido: z.string().min(1, 'El apellido es requerido').max(100, 'El apellido no debe exceder 100 caracteres'),
	direccionImagen: z
		.instanceof(File)
		.refine((file) => file.type.startsWith('image/'), 'El archivo debe ser una imagen')
		.refine((file) => file.size <= 5 * 1024 * 1024, 'La imagen no debe superar 5MB')
		.optional(),
	tituloBannerPage: z
		.string()
		.min(1, 'El título del banner es requerido')
		.max(200, 'El título no debe exceder 200 caracteres'),
	descripcionBannerPage: z
		.string()
		.min(1, 'La descripción del banner es requerida')
		.max(500, 'La descripción no debe exceder 500 caracteres'),
});

export type AlcaldeBannerRequest = z.infer<typeof alcaldeBannerRequest>;
export type AlcaldeBannerEditForm = z.infer<typeof alcaldeBannerEditForm>;

// Re-exportar la interfaz desde services para consistencia
export type { AlcaldeBanner } from '../services/AlcaldeBanner.interface';