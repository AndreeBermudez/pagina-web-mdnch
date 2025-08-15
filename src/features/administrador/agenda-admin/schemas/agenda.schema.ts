import { z } from 'zod';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
const TIME_RE = /^\d{2}:\d{2}(:\d{2})?$/; // HH:mm or HH:mm:ss

export const agendaRequestSchema = z.object({
	titulo: z.string().min(1),
	fecha: z.string().regex(DATE_RE, 'fecha debe ser YYYY-MM-DD'),
	horaInicio: z.string().regex(TIME_RE, 'La hora de inicio debe ser HH:mm o HH:mm:ss'),
	horaFin: z.string().regex(TIME_RE, 'La hora de fin debe ser HH:mm o HH:mm:ss'),
	direccion: z.string().min(1),
	categoria: z.string().min(1),
});

export const agendaResponseSchema = agendaRequestSchema.extend({
	agendaId: z.number().int(),
	fechaCreacion: z.string().regex(DATE_RE, 'La fecha de creación debe ser YYYY-MM-DD'),
	fechaModificacion: z.string().regex(DATE_RE, 'La fecha de modificación debe ser YYYY-MM-DD'),
	responsable: z.string().min(1),
});

export type AgendaRequest = z.infer<typeof agendaRequestSchema>;
export type AgendaResponse = z.infer<typeof agendaResponseSchema>;
