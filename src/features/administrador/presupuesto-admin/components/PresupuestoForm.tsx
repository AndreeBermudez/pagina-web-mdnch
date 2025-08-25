import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel } from '../../../../core/components/common/form';
import { FormSelect } from '../../../../core/components/common/form/FormSelect';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import {
	presupuestoEdit,
	presupuestoRequest,
	type PresupuestoEdit,
	type PresupuestoRequest,
	type Presupuesto,
} from '../schemas/presupuesto.schema';
import { usePresupuestoMutation } from '../hooks/usePresupuestoMutation';

interface PresupuestoModalProps {
	handleModal: () => void;
	presupuestoEditable?: Presupuesto | null;
}

export const PresupuestoForm = ({ handleModal, presupuestoEditable }: PresupuestoModalProps) => {
	const isEditing = Boolean(presupuestoEditable);
	const { register, handleSubmit, reset, setValue } = useForm<PresupuestoRequest | PresupuestoEdit>({
		resolver: zodResolver(isEditing ? presupuestoEdit : presupuestoRequest),
		defaultValues: {
			titulo: presupuestoEditable?.titulo || '',
			tipo: presupuestoEditable?.tipo || '',
		},
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { createPresupuesto, updatePresupuesto } = usePresupuestoMutation();

	function setDocumentHookForm(file: File | null) {
		if (file) {
			setValue('linkDocumento', file, { shouldValidate: true });
		}
	}

	function onSubmit(data: PresupuestoRequest | PresupuestoEdit) {
		const presupuestoData = {
			titulo: data.titulo,
			tipo: data.tipo,
		};
		if (isEditing && presupuestoEditable) {
			const updateData = data.linkDocumento
				? { ...presupuestoData, linkDocumento: data.linkDocumento }
				: presupuestoData;
			updatePresupuesto.mutate(
				{ id: presupuestoEditable.presupuestoId, data: updateData },
				{
					onSuccess: () => {
						success('Presupuesto actualizado exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar el presupuesto'),
				}
			);
		} else {
			createPresupuesto.mutate(
				{ ...presupuestoData, linkDocumento: data.linkDocumento as File },
				{
					onSuccess: () => {
						reset();
						success('Presupuesto creado exitosamente');
						handleModal();
					},
					onError: () => error('Error al crear el presupuesto'),
				}
			);
		}
	}

	return (
		<>
			<div className='flex flex-col h-[calc(95vh-theme(spacing.28))]'>
				<form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col h-full'>
					<div className='flex-1 overflow-y-auto'>
						<div className='p-6 space-y-6'>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
								<div>
									<FormLabel label='Título' required />
									<FormInput {...register('titulo')} placeholder='Ingrese el título del presupuesto' />
								</div>
								<div>
									<FormLabel label='Tipo' required />
									<FormSelect {...register('tipo')}>
										<option value=''>Seleccionar tipo</option>
										<option value='Anual'>Anual</option>
										<option value='Trimestral'>Trimestral</option>
										<option value='Mensual'>Mensual</option>
										<option value='Extraordinario'>Extraordinario</option>
										<option value='Inversión'>Inversión</option>
										<option value='Operativo'>Operativo</option>
									</FormSelect>
								</div>
							</div>
							<div>
								<FormLabel label='Documento' required />
								<div className='space-y-3'>
									<FormFileInput
										id='documento-input'
										accept='.pdf,.doc,.docx,.xls,.xlsx'
										onChange={(e) => {
											const file = e.target.files?.[0] || null;
											setDocumentHookForm(file);
										}}
									/>
									{presupuestoEditable?.linkDocumento && (
										<div className='p-3 border rounded-lg bg-slate-50 border-slate-200'>
											<div className='flex items-center justify-between'>
												<span className='text-sm text-slate-700'>Documento actual:</span>
												<a
													href={presupuestoEditable.linkDocumento}
													target='_blank'
													rel='noopener noreferrer'
													className='text-sm text-blue-600 underline hover:text-blue-800'>
													Ver documento
												</a>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='sticky bottom-0 p-6 border-t rounded-b-xl bg-slate-50 border-slate-200'>
						<div className='flex justify-end space-x-3 text-sm'>
							<button
								type='button'
								onClick={handleModal}
								className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
								Cancelar
							</button>
							<button
								type='submit'
								className='px-4 py-2 text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800'>
								{presupuestoEditable ? 'Actualizar' : 'Crear'} Presupuesto
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
