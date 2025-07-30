import { useCallback, useEffect, useState } from 'react';
import { actualizarNoticia } from '../../../../core/services/noticias/actualizarNoticia';
import { crearNoticia } from '../../../../core/services/noticias/crearNoticia';
import { eliminarNoticia } from '../../../../core/services/noticias/eliminarNoticia';
import { listarNoticias } from '../../../../core/services/noticias/listarNoticias';
import type { NoticiaRequest, Evento } from '../../../../core/services/noticias/noticia.interface';

export const useNoticias = () => {
	const [noticias, setNoticias] = useState<Evento[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	//* Funcion para actualizar las noticias
	const refreshNoticias = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await listarNoticias();
			setNoticias(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al cargar las noticias');
		} finally {
			setLoading(false);
		}
	}, []);

	//* Funcion para cargar las noticias al iniciar el componente
	useEffect(() => {
		refreshNoticias();
	}, [refreshNoticias]);

	//* Filtrado de noticias
	const filteredNoticias = noticias.filter(
		(noticia) =>
			noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
			noticia.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
			noticia.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
	);

	//* Funcion para crear una noticia
	const createNoticia = async (data: NoticiaRequest) => {
		try {
			setLoading(true);
			await crearNoticia(data);
			await refreshNoticias();
			return true;
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Error al crear la noticia');
			return false;
		} finally {
			setLoading(false);
		}
	};

	//* Funcion para actualizar noticia
	const updateNoticia = async (id: number, data: NoticiaRequest): Promise<boolean> => {
		try {
			setLoading(true);
			await actualizarNoticia(id, data);
			await refreshNoticias();
			return true;
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al actualizar noticia');
			return false;
		} finally {
			setLoading(false);
		}
	};

	//* Funcion para eliminar noticia
	const deleteNoticia = async (id: number): Promise<boolean> => {
		try {
			setLoading(true);
			const success = await eliminarNoticia(id);
			if (success) {
				await refreshNoticias();
			}
			return success;
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al eliminar noticia');
			return false;
		} finally {
			setLoading(false);
		}
	};
	return {
		noticias,
		loading,
		error,
		searchTerm,
		setSearchTerm,
		filteredNoticias,
		refreshNoticias,
		createNoticia,
		updateNoticia,
		deleteNoticia,
	};
};
