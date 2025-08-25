import { useQuery } from '@tanstack/react-query';
import { getPages } from '../services/getPages';
import { getPageById } from '../services/getPageById';

export const usePages = () => {
	return useQuery({
		queryKey: ['paginas'],
		queryFn: () => getPages(),
	});
};

export const usePageById = (id: number) => {
	return useQuery({
		queryKey: ['pagina', id],
		queryFn: () => getPageById(id),
		enabled: !!id && id > 0,
	});
};
