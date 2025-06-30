import { axiosWithoutMultipart } from '../../api/axiosInstance';

export const registrarMiembroEquipo = async (
	consejoMuniId: number,
	miembro: { nombre: string; apellido: string }
): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.post('equipo-trabajo/registrar', {
			consejoMuniId,
			nombre: miembro.nombre,
			apellido: miembro.apellido,
		});
		return true;
	} catch (err) {
		console.error('Error al registrar miembro:', err);
		return false;
	}
};
