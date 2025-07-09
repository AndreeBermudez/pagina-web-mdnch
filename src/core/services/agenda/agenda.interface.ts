export interface AgendaPayload {
	titulo: string;
	fecha: string;
	horaInicio: string;
	horaFin: string;
	direccion: string;
	categoria: string;
	fechaCreacion?: string; 
	agendaId?: number; 
}