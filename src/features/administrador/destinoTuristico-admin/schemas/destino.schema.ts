import { z } from 'zod';

export const destinoSchemaBase = z.object({
	video: z
		.string()
		.min(1, { message: 'El enlace del video es obligatorio' })
		.url({ message: 'El enlace debe ser una URL válida' }),
});

export const destinoCreateSchema = destinoSchemaBase;

export const destinoUpdateSchema = destinoSchemaBase;

export const destinoResponseSchema = destinoSchemaBase.extend({
	destinoTuristicoId: z.number(),
	fechaCreacion: z.string().optional(),
	fechaModificacion: z.string().optional(),
});

// Tipos TypeScript generados automáticamente
export type DestinoCreateRequest = z.infer<typeof destinoCreateSchema>;
export type DestinoUpdateRequest = z.infer<typeof destinoUpdateSchema>;
export type DestinoResponse = z.infer<typeof destinoResponseSchema>;