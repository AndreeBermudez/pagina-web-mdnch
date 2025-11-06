import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormInput, FormLabel } from '../../../../core/components/common/form';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useState } from 'react';
import { useTransparenciaMutation } from '../hooks/useTransparenciaMutation';
import {
	transparenciaSchemaBase,
	type TransparenciaRequest,
	type TransparenciaResponse,
} from '../schemas/transparencia.schema';

interface TransparenciaModalProps {
	handleModal: () => void;
	transparenciaEditable?: TransparenciaResponse | null;
}

export const TransparenciaForm = ({ handleModal, transparenciaEditable }: TransparenciaModalProps) => {
	const isEditing = Boolean(transparenciaEditable);
	const { success, error: notifyError } = useNotifications();
	const { onError } = useFormatErrors();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { createTransparencia, updateTransparencia } = useTransparenciaMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TransparenciaRequest>({
		resolver: zodResolver(transparenciaSchemaBase),
		defaultValues: {
			concepto: transparenciaEditable?.concepto || '',
		},
	});

	const onSubmit = async (data: TransparenciaRequest) => {
		setIsSubmitting(true);

		try {
			if (isEditing && transparenciaEditable) {
				updateTransparencia.mutate(
					{ id: transparenciaEditable.transparenciaId, data },
					{
						onSuccess: () => {
							success('Concepto de transparencia actualizado exitosamente');
							handleModal();
						},
						onError: () => {
							notifyError('Error al actualizar el concepto');
						},
					}
				);
			} else {
				createTransparencia.mutate(data, {
					onSuccess: () => {
						success('Concepto de transparencia creado exitosamente');
						reset();
						handleModal();
					},
					onError: () => {
						notifyError('Error al crear el concepto');
					},
				});
			}
		} catch (error) {
			console.error('Error en el formulario:', error);
			notifyError('Ocurrió un error al procesar el formulario');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='flex flex-col'>
			<form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col'>
				<div className='p-6 space-y-6'>
					<div>
						<FormLabel label='Concepto' required />
						<FormInput
							{...register('concepto')}
							placeholder='Ingrese el concepto de transparencia'
						/>
						{errors.concepto?.message && (
							<p className='text-red-600 text-sm mt-1'>{errors.concepto.message}</p>
						)}
					</div>
				</div>

				<div className='p-6 border-t bg-slate-50 border-slate-200'>
					<div className='flex justify-end space-x-3 text-sm'>
						<button
							type='button'
							onClick={handleModal}
							disabled={isSubmitting}
							className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
							Cancelar
						</button>
						<button
							type='submit'
							disabled={isSubmitting}
							className='px-4 py-2 text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800 disabled:bg-blue-400'>
							{isSubmitting ? 'Procesando...' : transparenciaEditable ? 'Actualizar' : 'Crear'} Concepto
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
