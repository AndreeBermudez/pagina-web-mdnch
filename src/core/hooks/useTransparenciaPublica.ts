import { useQuery } from '@tanstack/react-query';
import { axiosWithoutMultipart } from '../api/axiosInstance';

interface PeriodoPublico {
	periodoId: number;
	año: string;
	responsable: string;
	trimestre1?: string;
	trimestre2?: string;
	trimestre3?: string;
	trimestre4?: string;
}

interface TransparenciaPublica {
	transparenciaId: number;
	concepto: string;
	periodos: PeriodoPublico[];
}

const obtenerTransparenciaPublica = async (): Promise<TransparenciaPublica[]> => {
	const response = await axiosWithoutMultipart.get('transparencia/listar');
	// El backend podría devolver { data: [...] } o directamente [...]
	const datos = Array.isArray(response.data) ? response.data : response.data?.data || [];
	return datos;
};

export const useTransparenciaPublica = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['transparencia-publica'],
		queryFn: obtenerTransparenciaPublica,
	});

	// Filtrar transparencias que tienen al menos un período con archivos
	const transparenciasConArchivos = Array.isArray(data) ? data.filter(t => 
		t.periodos && t.periodos.length > 0 && 
		t.periodos.some(p => p.trimestre1 || p.trimestre2 || p.trimestre3 || p.trimestre4)
	) : [];

	return {
		transparencias: transparenciasConArchivos,
		isLoading,
		error,
	};
};
