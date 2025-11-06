import z from 'zod';

export const transparenciaSchemaBase = z.object({
	concepto: z.string().min(1, { message: 'El concepto no puede estar vacío' }),
});

export const periodoRequest = z.object({
	transparenciaId: z.number(),
	año: z.string().min(1, { message: 'El año no puede estar vacío' }),
	responsable: z.string().min(1, { message: 'El responsable no puede estar vacío' }),
	trimestre1: z.instanceof(File, { message: 'Debe seleccionar un documento para el trimestre 1' }).optional(),
	trimestre2: z.instanceof(File, { message: 'Debe seleccionar un documento para el trimestre 2' }).optional(),
	trimestre3: z.instanceof(File, { message: 'Debe seleccionar un documento para el trimestre 3' }).optional(),
	trimestre4: z.instanceof(File, { message: 'Debe seleccionar un documento para el trimestre 4' }).optional(),
});

export const periodoResponse = periodoRequest.omit({
	trimestre1: true,
	trimestre2: true,
	trimestre3: true,
	trimestre4: true,
}).extend({
	periodoId: z.number(),
	responsable: z.string().min(1, { message: 'El responsable no puede estar vacío' }),
	trimestre1: z
		.string()
		.min(1, { message: 'El link del documento del trimestre 1 no puede estar vacío' })
		.optional(),
	trimestre2: z
		.string()
		.min(1, { message: 'El link del documento del trimestre 2 no puede estar vacío' })
		.optional(),
	trimestre3: z
		.string()
		.min(1, { message: 'El link del documento del trimestre 3 no puede estar vacío' })
		.optional(),
	trimestre4: z
		.string()
		.min(1, { message: 'El link del documento del trimestre 4 no puede estar vacío' })
		.optional(),
	fechaCreacion: z.string(),
	fechaActualizacion: z.string(),
});

export const transparenciaResponse = transparenciaSchemaBase.extend({
	transparenciaId: z.number(),
	fechaCreacion: z.string(),
	fechaModificacion: z.string(),
	periodos: z.array(periodoResponse).optional(),
});

export type TransparenciaRequest = z.infer<typeof transparenciaSchemaBase>;
export type TransparenciaResponse = z.infer<typeof transparenciaResponse>;
export type PeriodoRequest = z.infer<typeof periodoRequest>;
export type PeriodoResponse = z.infer<typeof periodoResponse>;
