import z from 'zod';

export const pduSchemaBase = z.object({
	titulo: z.string().min(1, { message: 'El título no puede estar vacío' }),
	descripcion: z.string().min(1, { message: 'La descripción no puede estar vacía' }),
});

export const pduEditForm = pduSchemaBase.extend({
	linkDocumento: z.instanceof(File, { message: 'Debe seleccionar un documento' }).optional(),
});

export const pduRequest = pduSchemaBase.extend({
	linkDocumento: z.instanceof(File, { message: 'Debe seleccionar un documento' }),
});

export const pduResponse = pduSchemaBase.extend({
	pduId: z.number(),
	linkDocumento: z.string().min(1, { message: 'El link del documento no puede estar vacío' }),
	fechaCreacion: z.string().min(1, { message: 'La fecha de creación no puede estar vacía' }),
	fechaModificacion: z.string().min(1, { message: 'La fecha de modificación no puede estar vacía' }).optional(),
	responsable: z.string().min(1, { message: 'El responsable no puede estar vacío' }),
});

export type Pdu = z.infer<typeof pduResponse>;
export type PduRequest = z.infer<typeof pduRequest>;
export type PduEditForm = z.infer<typeof pduEditForm>;
