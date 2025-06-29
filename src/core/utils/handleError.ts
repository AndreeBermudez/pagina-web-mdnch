import axios from 'axios';

export const handleError = (error: unknown): never => {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			const { status, data } = error.response;
			const errorMessage = data?.message || data?.error || 'Error del servidor';
			throw new Error(`Error ${status}: ${errorMessage}`);
		} else if (error.request) {
			throw new Error('Error de conexión, verifique su conexión a internet');
		}
	}
	const message = error instanceof Error ? error.message : 'Ha ocurrido un error inesperado';
	throw new Error(message);
};
