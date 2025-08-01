import { useQuery } from '@tanstack/react-query';
import { getSliders } from '../services/getSliders';

export const useSliderQuery = () => {
	const getAll = useQuery({
		queryKey: ['sliders'],
		queryFn: () => getSliders(),
	});
	return {
		sliders: getAll.data,
		isLoading: getAll.isLoading,
		error: getAll.error,
		isError: getAll.isError,
	};
};
