import { useCallback, useEffect, useState } from 'react';
import { listarTopNoticias } from '../../../../core/services/noticias/listarTopNoticias';
import type { NoticiaResponse } from '../../../../core/services/noticias/noticia.interface';

export const useNoticiasHome = () => {
	const [noticias, setNoticias] = useState<NoticiaResponse[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	//* Funcion para actualizar las ultimas noticias
	const refreshNoticias = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await listarTopNoticias();
			setNoticias(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al cargar las ultimas noticias');
		} finally {
			setLoading(false);
		}
	}, []);

	//* Funcion para cargar las noticias al iniciar el componente
	useEffect(() => {
		refreshNoticias();
	}, [refreshNoticias]);

	return {
		noticias,
		loading,
		error,
		refreshNoticias,
	};
};
