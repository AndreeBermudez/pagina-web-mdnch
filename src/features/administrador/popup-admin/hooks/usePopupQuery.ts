import { useQuery } from '@tanstack/react-query';
import { obtenerPopup } from '../service/obtenerPopup';

export const usePopupQuery = () => {
	const getAll = useQuery({
		queryKey: ['popup'],
		queryFn: async () => {
			const data = await obtenerPopup();
			console.log('Datos recibidos de la API:', data);
			return data;
		},
	});

	return {
		popups: getAll.data || [],
		isLoading: getAll.isLoading,
		error: getAll.error,
		refetch: getAll.refetch,
	};
};

export const usePopupList = () => {
	return useQuery({
		queryKey: ['popup-list'],
		queryFn: () => obtenerPopup(),
	});
};