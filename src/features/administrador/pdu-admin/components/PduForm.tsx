import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel } from '../../../../core/components/common/form';
import { FormTextArea } from '../../../../core/components/common/form/FormTextArea';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { usePduMutations } from '../hooks/usePduMutations';
import { pduEditForm, pduRequest, type PduEditForm, type PduRequest, type Pdu } from '../schemas/pdu.schema';

interface PduModalProps {
	handleModal: () => void;
	pduEditable?: Pdu | null;
}

export const PduForm = ({ handleModal, pduEditable }: PduModalProps) => {
	const isEditing = Boolean(pduEditable);
	const { register, handleSubmit, reset, setValue } = useForm<PduRequest | PduEditForm>({
		resolver: zodResolver(isEditing ? pduEditForm : pduRequest),
		defaultValues: {
			titulo: pduEditable?.titulo || '',
			descripcion: pduEditable?.descripcion || '',
		},
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { crearPdu, actualizarPdu } = usePduMutations();

	function setDocumentHookForm(file: File | null) {
		if (file) {
			setValue('linkDocumento', file, { shouldValidate: true });
		}
	}

	function onSubmit(data: PduRequest | PduEditForm) {
		const pduData = {
			titulo: data.titulo,
			descripcion: data.descripcion,
		};
		if (isEditing && pduEditable) {
			const updateData = data.linkDocumento ? { ...pduData, linkDocumento: data.linkDocumento } : pduData;
			actualizarPdu.mutate(
				{ id: pduEditable.pduId, data: updateData },
				{
					onSuccess: () => {
						success('PDU actualizado exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar el PDU'),
				}
			);
		} else {
			crearPdu.mutate(
				{ ...pduData, linkDocumento: data.linkDocumento as File },
				{
					onSuccess: () => {
						reset();
						success('PDU creado exitosamente');
						handleModal();
					},
					onError: () => error('Error al crear el PDU'),
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
							<div>
								<FormLabel label='Título' required />
								<FormInput {...register('titulo')} placeholder='Ingrese el título del PDU' />
							</div>
							<div>
								<FormLabel label='Descripción' required />
								<FormTextArea
									{...register('descripcion')}
									placeholder='Escriba la descripción del PDU...'
									rows={6}
								/>
							</div>
							<div>
								<FormLabel label='Documento' required />
								<div className='space-y-3'>
									<FormFileInput
										id='documento-input'
										accept='.pdf,.doc,.docx'
										onChange={(e) => {
											const file = e.target.files?.[0] || null;
											setDocumentHookForm(file);
										}}
									/>
									{pduEditable?.linkDocumento && (
										<div className='p-3 border rounded-lg bg-slate-50 border-slate-200'>
											<div className='flex items-center justify-between'>
												<span className='text-sm text-slate-700'>Documento actual:</span>
												<a
													href={pduEditable.linkDocumento}
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
								{pduEditable ? 'Actualizar' : 'Crear'} PDU
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
