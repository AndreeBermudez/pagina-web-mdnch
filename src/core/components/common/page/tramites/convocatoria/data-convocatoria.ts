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

export const convocatoriasData: ConvocatoriaData[] = [
	{
		codigo: '001',
		convocatoria: 'INSPECTOR MUNICIPAL DE TRANSPORTE',
		area: 'SUB GERENCIA DE TRANSPORTE URBANO, TRANSITO Y SEGURIDAD VIAL',
		vacantes: 15,
		bases: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/BASESMDNCHCAS2025.pdf',
		anexos: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ANEXOS%201-8.pdf',
		postulacion: 'https://forms.gle/iavc8U6otqRtuZVi9',
		comunicados: [
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/COMUNICADO%20CAS%2001.jpeg',
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/COMUNICADO.pdf',
		],
		evaluacionCurricular:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-INSPECTOR%20DE%20TRANSPORTES.pdf',
		absolucionReclamos:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-HORARIO%20INSPECTOR%20DE%20TRANSPORTES.pdf',
		evaluacionEntrevista:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-ENTREVISTA PERSONAL-INSPECTOR DE TRANSPORTES.pdf',
		resultadosFinales:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-RESULTADO FINAL-INSPECTOR DE TRANSPORTES.pdf',
	},
	{
		codigo: '002',
		convocatoria: 'INSPECTOR DE COMERCIO',
		area: 'SUB GERENCIA DE COMERCIO, LICENCIAS Y PROMOCION EMPRESARIAL',
		vacantes: 4,
		bases: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/BASESMDNCHCAS2025.pdf',
		anexos: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ANEXOS%201-8.pdf',
		postulacion: 'https://forms.gle/iavc8U6otqRtuZVi9',
		comunicados: ['https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/COMUNICADO%20CAS%2001.jpeg'],
		evaluacionCurricular: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-INSPECTOR%20DE%20COMERCIO.pdf',
		absolucionReclamos:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-HORARIO%20INSPECTOR%20DE%20COMERCIO.pdf',
		evaluacionEntrevista:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-ENTREVISTA PERSONAL-INSPECTOR DE COMERCIO.pdf',
		resultadosFinales:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-RESULTADO FINAL-INSPECTOR DE COMERCIO.pdf',
	},
	{
		codigo: '003',
		convocatoria: 'COORDINADOR DE LA UNIDAD FUNCIONAL DE SUPERVISIÓN Y LIQUIDACIONES',
		area: 'SUB GERENCIA DE OBRAS PÚBLICAS',
		vacantes: 1,
		bases: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/BASESMDNCHCAS2025.pdf',
		anexos: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ANEXOS%201-8.pdf',
		postulacion: 'https://forms.gle/iavc8U6otqRtuZVi9',
		comunicados: ['https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/COMUNICADO%20CAS%2001.jpeg'],
		evaluacionCurricular:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-COORDINARDOR%20DE%20LIQUIDACIONES.pdf',
		absolucionReclamos: null,
		evaluacionEntrevista: null,
		resultadosFinales: null,
	},
	{
		codigo: '004',
		convocatoria: 'ZONIFICADOR',
		area: 'SUB GERENCIA DE COMERCIO, LICENCIAS Y PROMOCIÓN EMPRESARIAL',
		vacantes: 1,
		bases: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/BASESMDNCHCAS2025.pdf',
		anexos: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ANEXOS%201-8.pdf',
		postulacion: 'https://forms.gle/iavc8U6otqRtuZVi9',
		comunicados: ['https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/COMUNICADO%20CAS%2001.jpeg'],
		evaluacionCurricular: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-ZOONIFICADOR.pdf',
		absolucionReclamos: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-HORARIO%20ZOONIFICADOR.pdf',
		evaluacionEntrevista:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-ENTREVISTA PERSONAL-ZOONIFICADOR.pdf',
		resultadosFinales: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-RESULTADO FINAL-ZOONIFICADOR.pdf',
	},
	{
		codigo: '005',
		convocatoria: 'PSICÓLOGA',
		area: 'UNIDAD FUNCIONAL DE DEMUNA',
		vacantes: 1,
		bases: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/BASESMDNCHCAS2025.pdf',
		anexos: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ANEXOS%201-8.pdf',
		postulacion: 'https://forms.gle/iavc8U6otqRtuZVi9',
		comunicados: ['https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/COMUNICADO%20CAS%2001.jpeg'],
		evaluacionCurricular: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-PSICOLOGO(A).pdf',
		absolucionReclamos: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-HORARIO%20PSICOLOGO(A).pdf',
		evaluacionEntrevista:
			'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-ENTREVISTA PERSONAL-PSICOLOGO(A).pdf',
		resultadosFinales: 'https://www.muninuevochimbote.gob.pe/CONVOCATORIACAS/ORH-RESULTADO FINAL-PSICOLOGO(A).pdf',
	},
];
