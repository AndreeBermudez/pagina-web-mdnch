import { useCallback, useEffect, useState } from 'react';
import type { Evento } from '../../../../core/services/eventos/evento.interface';
import { listarEventos } from '../../../../core/services/eventos/listarEventos';

export const useEventosHome = () => {
	const [eventos, setEventos] = useState<Evento[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	//* Funcion para actualizar los ultimos eventos
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

	return {
		eventos,
		loading,
		error,
		refreshEventos,
	};
};
