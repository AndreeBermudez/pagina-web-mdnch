import { useQuery } from '@tanstack/react-query';
import { obtenerEmergencia } from '../../features/administrador/numeroEmergencia-admin/services/obtenerEmergencia';
import type { NumeroEmergenciaResponse } from '../../features/administrador/numeroEmergencia-admin/schemas/numeroEmergencia.schema';

export const useNumeroEmergenciaPublico = () => {
    const { data: numerosEmergencia = [], isLoading, error } = useQuery({
        queryKey: ['numeroEmergencia-publico'],
        queryFn: obtenerEmergencia,
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    });

    // Función para obtener un número específico por título
    const obtenerNumeroPorTitulo = (titulo: string): NumeroEmergenciaResponse | undefined => {
        return numerosEmergencia.find((numero: NumeroEmergenciaResponse) => 
            numero.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
    };

    // Función para obtener número de denuncia contra corrupción
    const obtenerNumeroCorrupcion = (): NumeroEmergenciaResponse | undefined => {
        return obtenerNumeroPorTitulo('corrupción') || 
               obtenerNumeroPorTitulo('denuncia') || 
               numerosEmergencia.find((numero: NumeroEmergenciaResponse) => numero.numero === '970385757') ||
               numerosEmergencia[0]; // Fallback al primer número
    };

    return {
        numerosEmergencia,
        isLoading,
        error,
        obtenerNumeroPorTitulo,
        obtenerNumeroCorrupcion,
    };
};