import z from 'zod';

export const alcaldeSchemaBase = z.object({
	nombre: z.string().min(1, { message: 'El nombre no puede estar vacío' }),
	apellido: z.string().min(1, { message: 'El apellido no puede estar vacío' }),
	descripcion: z.string().min(1, { message: 'La descripción no puede estar vacía' }),
	numeroObras: z.number().min(0, { message: 'El número de obras debe ser mayor o igual a 0' }),
	presupuesto: z.number().min(0, { message: 'El presupuesto debe ser mayor o igual a 0' }),
	aprobacionCiudadana: z.string().min(1, { message: 'La aprobación ciudadana no puede estar vacía' }),
	atencionCiudadana: z.string().min(1, { message: 'La atención ciudadana no puede estar vacía' }),
	periodo: z.string().min(1, { message: 'El periodo no puede estar vacío' }),
	experiencia: z.string().min(1, { message: 'La experiencia no puede estar vacía' }),
	reconocimientos: z.string().min(1, { message: 'Los reconocimientos no pueden estar vacíos' }),
	compromiso: z.string().min(1, { message: 'El compromiso no puede estar vacío' }),
});

export const alcaldeEditForm = alcaldeSchemaBase.extend({
	direccionImagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }).optional(),
});

export const alcaldeRequest = alcaldeSchemaBase.extend({
	direccionImagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }),
});

export const alcaldeResponse = alcaldeSchemaBase.extend({
	alcaldeId: z.number(),
	direccionImagen: z.string().min(1, { message: 'La imagen no puede estar vacía' }),
	fechaCreacion: z.string().min(1, { message: 'La fecha de creación no puede estar vacía' }),
	fechaModificacion: z.string().min(1, { message: 'La fecha de modificación no puede estar vacía' }).optional(),
	responsable: z.string().min(1, { message: 'El responsable no puede estar vacío' }),
});

export type AlcaldeEditForm = z.infer<typeof alcaldeEditForm>;
export type AlcaldeRequest = z.infer<typeof alcaldeRequest>;
export type Alcalde = z.infer<typeof alcaldeResponse>;
