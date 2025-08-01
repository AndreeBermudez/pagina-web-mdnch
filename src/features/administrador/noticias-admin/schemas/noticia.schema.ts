import z from 'zod';

export const noticiaSchemaBase = z.object({
	titulo: z.string().min(1, { message: 'El título no puede estar vacío' }),
	categoria: z.string().min(1, { message: 'La categoría no puede estar vacía' }),
	descripcion: z.string().min(1, { message: 'La descripción no puede estar vacía' }),
	fechaManual: z.string().min(1, { message: 'La fecha no puede estar vacía' }),
});

export const noticiaEditForm = noticiaSchemaBase.extend({
	imagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }).optional(),
});

export const noticiaRequest = noticiaSchemaBase.extend({
	imagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }),
});

export const noticiaReponse = noticiaSchemaBase.extend({
	noticiaId: z.number(),
	direccionImagen: z.string().min(1, { message: 'La imagen no puede estar vacía' }),
	fechaManualCruda: z.string().min(1, { message: 'La fecha no puede estar vacía' }),
	fechaCreacion: z.string().min(1, { message: 'La fecha de creación no puede estar vacía' }),
	fechaModificacion: z.string().min(1, { message: 'La fecha de modificación no puede estar vacía' }).optional(),
	responsable: z.string().min(1, { message: 'El responsable no puede estar vacío' }),
});

export type NoticiaEditForm = z.infer<typeof noticiaEditForm>;
export type NoticiaForm = z.infer<typeof noticiaRequest>
export type NoticiaRequest = z.infer<typeof noticiaRequest>;
export type NoticiaResponse = z.infer<typeof noticiaReponse>;
