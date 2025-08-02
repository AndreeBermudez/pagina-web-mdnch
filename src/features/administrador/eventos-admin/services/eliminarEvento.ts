import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';

export const eliminarEvento = async (id:number): Promise<boolean> => {
	try {
		const response = await axiosInstance.delete<ResponseBase<null>>(`eventos/${id}`);
		if (response.status === 200 && response.data.success) {
			return true;
		}
		throw new Error(response.data.message || 'Error al eliminar el evento');
	} catch (error: unknown) {
		return handleError(error);
	}
};
