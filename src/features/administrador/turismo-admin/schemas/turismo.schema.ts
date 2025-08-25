import z from 'zod';

export const turismoSchemaBase = z.object({
	titulo: z.string().min(1, { message: 'El título no puede estar vacío' }),
	descripcion: z.string().min(1, { message: 'La descripción no puede estar vacía' }),
	lugar: z.string().min(1, { message: 'El lugar no puede estar vacío' }),
	ubicacion: z.string().min(1, { message: 'La ubicación no puede estar vacía' }),
});

export const turismoEditForm = turismoSchemaBase.extend({
	direccionImagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }).optional(),
});

export const turismoRequest = turismoSchemaBase.extend({
	direccionImagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }),
});

export const turismoResponse = turismoSchemaBase.extend({
	turismoId: z.number(),
	direccionImagen: z.string().min(1, { message: 'La imagen no puede estar vacía' }),
	fechaCreacion: z.string().min(1, { message: 'La fecha de creación no puede estar vacía' }),
	fechaModificacion: z.string().min(1, { message: 'La fecha de modificación no puede estar vacía' }).optional(),
	responsable: z.string().min(1, { message: 'El responsable no puede estar vacío' }),
});

export type Turismo = z.infer<typeof turismoResponse>;
export type TurismoRequest = z.infer<typeof turismoRequest>;
export type TurismoEditForm = z.infer<typeof turismoEditForm>;
