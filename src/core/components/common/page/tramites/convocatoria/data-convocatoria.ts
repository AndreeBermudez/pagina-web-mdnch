export interface ConvocatoriaData {
	codigo: string;
	convocatoria: string;
	area: string;
	vacantes: number;
	bases: string;
	anexos: string;
	postulacion: string;
	comunicados: string[];
	evaluacionCurricular: string | null;
	absolucionReclamos: string | null;
	evaluacionEntrevista: string | null;
	resultadosFinales: string | null;
}

