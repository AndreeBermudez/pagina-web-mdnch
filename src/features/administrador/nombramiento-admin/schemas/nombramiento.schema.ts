import z from 'zod';

const nombramientoBaseSchema = z.object({
  codigo: z.string().trim().min(1, { message: 'Ingresa el codigo del nombramiento.' }),
  nombramiento: z.string().trim().min(1, { message: 'Ingresa el nombre del nombramiento.' }),
  area: z.string().trim().min(1, { message: 'Indica el area responsable.' }),
  vacantes: z
    .coerce.number({ invalid_type_error: 'Ingresa el numero de vacantes.' })
    .int({ message: 'El numero de vacantes debe ser entero.' })
    .min(1, { message: 'Debe haber al menos una vacante.' }),
});

const nombramientoPostulacionSchema = z.object({
  postulacion: z.string().trim().min(1, { message: 'Ingresa el enlace o detalle de postulacion.' }).nullable().optional(),
});

export const DOCUMENTO_TIPOS = [
  'BASES',
  'POSTULACION',
  'ANEXOS',
  'COMUNICADO1',
  'COMUNICADO2',
  'EVAL_CURRICULAR',
  'EVAL_ENTREVISTA',
  'ABSOLUCION_RECLAMOS',
  'RESULTADOS_FINALES',
] as const;

const documentoTipoSchema = z.enum(DOCUMENTO_TIPOS);

const nombramientoDocumentoSchema = z.object({
  tipo: documentoTipoSchema,
  titulo: z.string().trim().nullable(),
  descripcion: z.string().trim().nullable(),
  url: z.string().trim().nullable(),
  habilitado: z.boolean(),
  orden: z.number().nullable(),
});

export const nombramientoRequestSchema = nombramientoBaseSchema.merge(nombramientoPostulacionSchema);
export const nombramientoFormSchema = nombramientoBaseSchema;

const nombramientoMetadataSchema = z.object({
  postulacion: z.string().trim().nullable().optional(),
  estado: z.boolean().optional(),
  responsable: z.string().trim().nullable().optional(),
  fechaCreacion: z.string().trim().nullable().optional(),
  fechaModificacion: z.string().trim().nullable().optional(),
  documentos: z
    .array(nombramientoDocumentoSchema)
    .optional()
    .transform((value) => value ?? []),
});

export const nombramientoResponseSchema = nombramientoBaseSchema
  .extend({
    id: z.number(),
    vacantes: z.number(),
  })
  .merge(nombramientoMetadataSchema);

export const nombramientoUpdateSchema = nombramientoRequestSchema.partial();

export const nombramientoDocumentoConfigSchema = z.object({
  tipo: documentoTipoSchema,
  habilitado: z.boolean(),
  url: z.string().trim().nullable().optional(),
});

export const nombramientoDocumentosConfigSchema = z.object({
  documentos: z.array(nombramientoDocumentoConfigSchema),
});

export type NombramientoRequest = z.infer<typeof nombramientoRequestSchema>;
export type NombramientoFormValues = z.infer<typeof nombramientoFormSchema>;
export type NombramientoUpdatePayload = z.infer<typeof nombramientoUpdateSchema>;
export type NombramientoResponse = z.infer<typeof nombramientoResponseSchema>;
export type NombramientoDocumento = z.infer<typeof nombramientoDocumentoSchema>;
export type NombramientoDocumentoConfigPayload = z.infer<typeof nombramientoDocumentosConfigSchema>;
export type NombramientoDocumentoTipo = (typeof DOCUMENTO_TIPOS)[number];
