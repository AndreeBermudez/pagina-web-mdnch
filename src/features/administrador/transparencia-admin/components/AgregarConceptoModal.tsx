import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../core/components/ui/Button';
import { FormInput } from '../../../../core/components/common/form/FormInput';
import { useTransparenciaMutation } from '../hooks/useTransparenciaMutation';
import { transparenciaSchemaBase, type TransparenciaRequest } from '../schemas/transparencia.schema';
import { useNotifications } from '../../../../core/hooks/useNotifications';

interface AgregarConceptoModalProps {
	handleModal: () => void;
}

export function AgregarConceptoModal({ handleModal }: AgregarConceptoModalProps) {
	const { success, error } = useNotifications();
	const { createTransparencia } = useTransparenciaMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TransparenciaRequest>({
		resolver: zodResolver(transparenciaSchemaBase),
	});

	const onSubmit = (data: TransparenciaRequest) => {
		createTransparencia.mutate(data, {
			onSuccess: () => {
				success('Concepto de transparencia creado exitosamente');
				handleModal();
			},
			onError: () => {
				error('Error al crear el concepto de transparencia');
			},
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full'>
			<div className='flex-1 overflow-y-auto px-6 py-6'>
				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Concepto <span className='text-red-500'>*</span>
						</label>
						<FormInput
							{...register('concepto')}
							placeholder='Ingrese el concepto de transparencia'
							className='w-full'
						/>
						{errors.concepto?.message && (
							<p className='text-red-600 text-sm mt-1'>{errors.concepto.message}</p>
						)}
					</div>
				</div>
			</div>

			<div className='flex justify-end space-x-3 px-6 py-4 border-t bg-gray-50'>
				<Button type='button' variant='outline' onClick={handleModal}>
					Cancelar
				</Button>
				<Button 
					type='submit' 
					disabled={createTransparencia.isPending}
					className={createTransparencia.isPending ? 'opacity-50 cursor-not-allowed' : ''}
				>
					{createTransparencia.isPending ? 'Creando...' : 'Crear Concepto'}
				</Button>
			</div>
		</form>
	);
}