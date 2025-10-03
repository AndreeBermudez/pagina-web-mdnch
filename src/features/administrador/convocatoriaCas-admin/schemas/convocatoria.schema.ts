import z from 'zod';

const convocatoriaBaseSchema = z.object({
  codigo: z.string().trim().min(1, { message: 'Ingresa el codigo de la convocatoria.' }),
  convocatoria: z.string().trim().min(1, { message: 'Ingresa el nombre de la convocatoria.' }),
  area: z.string().trim().min(1, { message: 'Indica el area responsable.' }),
  vacantes: z
    .coerce.number({ invalid_type_error: 'Ingresa el numero de vacantes.' })
    .int({ message: 'El numero de vacantes debe ser entero.' })
    .min(1, { message: 'Debe haber al menos una vacante.' }),
});

const convocatoriaPostulacionSchema = z.object({
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

const convocatoriaDocumentoSchema = z.object({
  tipo: documentoTipoSchema,
  titulo: z.string().trim().nullable(),
  descripcion: z.string().trim().nullable(),
  url: z.string().trim().nullable(),
  habilitado: z.boolean(),
  orden: z.number().nullable(),
});

export const convocatoriaRequestSchema = convocatoriaBaseSchema.merge(convocatoriaPostulacionSchema);
export const convocatoriaFormSchema = convocatoriaBaseSchema;

const convocatoriaMetadataSchema = z.object({
  postulacion: z.string().trim().nullable().optional(),
  estado: z.boolean().optional(),
  responsable: z.string().trim().nullable().optional(),
  fechaCreacion: z.string().trim().nullable().optional(),
  fechaModificacion: z.string().trim().nullable().optional(),
  documentos: z
    .array(convocatoriaDocumentoSchema)
    .optional()
    .transform((value) => value ?? []),
});

export const convocatoriaResponseSchema = convocatoriaBaseSchema
  .extend({
    id: z.number(),
    vacantes: z.number(),
  })
  .merge(convocatoriaMetadataSchema);

export const convocatoriaUpdateSchema = convocatoriaRequestSchema.partial();

export const convocatoriaDocumentoConfigSchema = z.object({
  tipo: documentoTipoSchema,
  habilitado: z.boolean(),
  url: z.string().trim().nullable().optional(),
});

export const convocatoriaDocumentosConfigSchema = z.object({
  documentos: z.array(convocatoriaDocumentoConfigSchema),
});

export type ConvocatoriaRequest = z.infer<typeof convocatoriaRequestSchema>;
export type ConvocatoriaFormValues = z.infer<typeof convocatoriaFormSchema>;
export type ConvocatoriaUpdatePayload = z.infer<typeof convocatoriaUpdateSchema>;
export type ConvocatoriaResponse = z.infer<typeof convocatoriaResponseSchema>;
export type ConvocatoriaDocumento = z.infer<typeof convocatoriaDocumentoSchema>;
export type ConvocatoriaDocumentoConfigPayload = z.infer<typeof convocatoriaDocumentosConfigSchema>;
export type ConvocatoriaDocumentoTipo = (typeof DOCUMENTO_TIPOS)[number];

