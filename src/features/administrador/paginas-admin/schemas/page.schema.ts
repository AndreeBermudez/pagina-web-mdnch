import z from 'zod';

export const paginaRequestSchema = z.object({
	titulo: z.string().min(1, 'El título es obligatorio'),
	slug: z.string().min(1, 'El slug es obligatorio'),
	contenido: z.string().min(1, 'El contenido es obligatorio'),
	imagen: z.instanceof(File).optional(),
});

export const paginaResponseSchema = paginaRequestSchema.omit({ imagen: true }).extend({
	id: z.number(),
	url: z.string().optional(),
	estado: z.boolean(),
	responsable: z.string(),
	fechaCreacion: z.string(),
	fechaModificacion: z.string(),
});

export type PaginaRequest = z.infer<typeof paginaRequestSchema>;
export type PaginaResponse = z.infer<typeof paginaResponseSchema>;
export type PaginaUpdate = Partial<PaginaRequest>;
