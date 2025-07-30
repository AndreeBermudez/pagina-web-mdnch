import { useCallback, useEffect, useState } from 'react';
import type { Evento } from '../../../../core/services/eventos/evento.interface';
import { listarEventos } from '../../../../core/services/eventos/listarEventos';

export const useEventos = () => {
	const [eventos, setEventos] = useState<Evento[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	//* Funcion para actualizar las noticias
	const refreshEventos = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await listarEventos();
			setEventos(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al cargar los eventos');
		} finally {
			setLoading(false);
		}
	}, []);

	//* Funcion para cargar los eventos al iniciar el componente
	useEffect(() => {
		refreshEventos();
	}, [refreshEventos]);

	// //* Filtrado de noticias
	// const filteredNoticias = eventos.filter(
	// 	(noticia) =>
	// 		noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		noticia.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		noticia.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
	// );

	// //* Funcion para crear una noticia
	// const createNoticia = async (data: NoticiaRequest) => {
	// 	try {
	// 		setLoading(true);
	// 		await crearNoticia(data);
	// 		await refreshNoticias();
	// 		return true;
	// 	} catch (error) {
	// 		setError(error instanceof Error ? error.message : 'Error al crear la noticia');
	// 		return false;
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	// //* Funcion para actualizar noticia
	// const updateNoticia = async (id: number, data: NoticiaRequest): Promise<boolean> => {
	// 	try {
	// 		setLoading(true);
	// 		await actualizarNoticia(id, data);
	// 		await refreshNoticias();
	// 		return true;
	// 	} catch (err) {
	// 		setError(err instanceof Error ? err.message : 'Error al actualizar noticia');
	// 		return false;
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	// * Funcion para eliminar noticia
	// const deleteNoticia = async (id: number): Promise<boolean> => {
	// 	try {
	// 		setLoading(true);
	// 		const success = await eliminarNoticia(id);
	// 		if (success) {
	// 			await refreshNoticias();
	// 		}
	// 		return success;
	// 	} catch (err) {
	// 		setError(err instanceof Error ? err.message : 'Error al eliminar noticia');
	// 		return false;
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };
	return {
		eventos,
		refreshEventos,
		loading,
		error,
		searchTerm,
		setSearchTerm,
	};
};
