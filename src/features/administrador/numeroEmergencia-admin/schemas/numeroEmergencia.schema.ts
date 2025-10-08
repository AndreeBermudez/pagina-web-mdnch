import { z } from 'zod';

export const numeroEmergenciaSchema = z.object({
    titulo: z.string().min(1, 'El título es obligatorio').max(100, 'El título es muy largo'),
    numero: z.string().min(1, 'El número es obligatorio').max(20, 'El número es muy largo')
});

export type NumeroEmergenciaRequest = z.infer<typeof numeroEmergenciaSchema>;

export interface NumeroEmergenciaResponse {
    id: number;
    titulo: string;
    numero: string;
}