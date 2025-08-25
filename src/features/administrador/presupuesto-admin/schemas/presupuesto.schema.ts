import z from 'zod';

export const presupuestoSchemaBase = z.object({
	titulo: z.string().min(1, { message: 'El título no puede estar vacío' }),
	tipo: z.string().min(1, { message: 'El tipo no puede estar vacío' }),
});

export const presupuestoRequest = presupuestoSchemaBase.extend({
	linkDocumento: z.instanceof(File, { message: 'Debe seleccionar un documento' }),
});

export const presupuestoEdit = presupuestoSchemaBase.extend({
	linkDocumento: z.instanceof(File, { message: 'Debe seleccionar un documento' }).optional(),
});

export const presupuestoResponse = presupuestoSchemaBase.extend({
	presupuestoId: z.number(),
	linkDocumento: z.string().min(1, { message: 'El documento no puede estar vacío' }),
	fechaCreacion: z.string().min(1, { message: 'La fecha de creación no puede estar vacía' }),
	fechaModificacion: z.string().min(1, { message: 'La fecha de modificación no puede estar vacía' }).optional(),
	responsable: z.string().min(1, { message: 'El responsable no puede estar vacío' }),
});

export type PresupuestoRequest = z.infer<typeof presupuestoRequest>;
export type PresupuestoEdit = z.infer<typeof presupuestoEdit>;
export type Presupuesto = z.infer<typeof presupuestoResponse>;
