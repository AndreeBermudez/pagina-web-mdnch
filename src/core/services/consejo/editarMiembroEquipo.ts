import { axiosWithoutMultipart } from '../../api/axiosInstance';

export const editarMiembroEquipo = async (
	equipoId: number,
	miembro: { nombre: string; apellido: string }
): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.patch(`equipo-trabajo-edit/${equipoId}`, {
			nombre: miembro.nombre,
			apellido: miembro.apellido,
		});
		return true;
	} catch (err) {
		console.error('Error al editar miembro:', err);
		return false;
	}
};
