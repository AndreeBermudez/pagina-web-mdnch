import { z } from 'zod';

export const servicioSchemaBase = z.object({
	titulo: z
		.string()
		.min(1, { message: 'El título es obligatorio' })
		.max(255, { message: 'El título no puede exceder 255 caracteres' }),
	descripcion: z
		.string()
		.min(1, { message: 'La descripción es obligatoria' })
		.max(500, { message: 'La descripción no puede exceder 500 caracteres' }),
	link: z
		.string()
		.min(1, { message: 'El enlace es obligatorio' })
		.url({ message: 'El enlace debe ser una URL válida' }),
});

export const servicioCreateSchema = servicioSchemaBase;

export const servicioUpdateSchema = servicioSchemaBase;

export const servicioResponseSchema = servicioSchemaBase.extend({
	serviciosMuniId: z.number(),
	fechaCreacion: z.string(),
	fechaModificacion: z.string().optional(),
});

// Tipos TypeScript generados automáticamente
export type ServicioCreateRequest = z.infer<typeof servicioCreateSchema>;
export type ServicioUpdateRequest = z.infer<typeof servicioUpdateSchema>;
export type ServicioResponse = z.infer<typeof servicioResponseSchema>;