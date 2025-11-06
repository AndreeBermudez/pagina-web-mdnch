import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel, ImagePreview } from '../../../../core/components/common/form';
import { FormTextArea } from '../../../../core/components/common/form/FormTextArea';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useImagePreview } from '../../../../core/hooks/useImagePreview';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useAlcaldeMutations } from '../hooks/useAlcaldeMutations';
import {
	alcaldeEditForm,
	alcaldeRequest,
	type AlcaldeEditForm,
	type AlcaldeRequest,
	type Alcalde,
} from '../schemas/alcalde.schema';

interface AlcaldeModalProps {
	handleModal: () => void;
	alcaldeEditable?: Alcalde | null;
}

export const AlcaldeForm = ({ handleModal, alcaldeEditable }: AlcaldeModalProps) => {
	const isEditing = Boolean(alcaldeEditable);
	const { register, handleSubmit, reset, setValue } = useForm<AlcaldeRequest | AlcaldeEditForm>({
		resolver: zodResolver(isEditing ? alcaldeEditForm : alcaldeRequest),
		defaultValues: {
			nombre: alcaldeEditable?.nombre || '',
			apellido: alcaldeEditable?.apellido || '',
			descripcion: alcaldeEditable?.descripcion || '',
			numeroObras: alcaldeEditable?.numeroObras || 0,
			presupuesto: alcaldeEditable?.presupuesto || 0,
			aprobacionCiudadana: alcaldeEditable?.aprobacionCiudadana || '',
			atencionCiudadana: alcaldeEditable?.atencionCiudadana || '',
			periodo: alcaldeEditable?.periodo || '',
			experiencia: alcaldeEditable?.experiencia || '',
			reconocimientos: alcaldeEditable?.reconocimientos || '',
			compromiso: alcaldeEditable?.compromiso || '',
		},
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { createAlcalde, updateAlcalde } = useAlcaldeMutations();
	const { previewImage, handleImageChange, removeImage } = useImagePreview({
		setValue: setImageHookForm,
		initialImage: alcaldeEditable?.direccionImagen,
	});
	const [descripcion, setDescripcion] = React.useState(alcaldeEditable?.descripcion || '');

	function setImageHookForm(file: File | null) {
		if (file) {
			setValue('direccionImagen', file, { shouldValidate: true });
		}
	}

	function onSubmit(data: AlcaldeRequest | AlcaldeEditForm) {
		const alcaldeData = {
			nombre: data.nombre,
			apellido: data.apellido,
			descripcion: data.descripcion,
			numeroObras: data.numeroObras,
			presupuesto: data.presupuesto,
			aprobacionCiudadana: data.aprobacionCiudadana,
			atencionCiudadana: data.atencionCiudadana,
			periodo: data.periodo,
			experiencia: data.experiencia,
			reconocimientos: data.reconocimientos,
			compromiso: data.compromiso,
		};
		if (isEditing && alcaldeEditable) {
			const updateData = data.direccionImagen
				? { ...alcaldeData, direccionImagen: data.direccionImagen }
				: alcaldeData;
			updateAlcalde.mutate(
				{ id: alcaldeEditable.alcaldeId, data: updateData },
				{
					onSuccess: () => {
						success('Alcalde actualizado exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar el alcalde'),
				}
			);
		} else {
			createAlcalde.mutate(
				{ ...alcaldeData, direccionImagen: data.direccionImagen as File },
				{
					onSuccess: () => {
						reset();
						removeImage();
						success('Alcalde creado exitosamente');
						handleModal();
					},
					onError: () => error('Error al crear el alcalde'),
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
									<FormLabel label='Nombre' required />
									<FormInput {...register('nombre')} placeholder='Ingrese el nombre del alcalde' />
								</div>
								<div>
									<FormLabel label='Apellido' required />
									<FormInput {...register('apellido')} placeholder='Ingrese el apellido del alcalde' />
								</div>
							</div>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
								<div>
									<FormLabel label='Número de Obras' required />
									<FormInput {...register('numeroObras', { valueAsNumber: true })} type='number' placeholder='0' />
								</div>
								<div>
									<FormLabel label='Presupuesto' required />
									<FormInput {...register('presupuesto', { valueAsNumber: true })} type='number' placeholder='0' />
								</div>
								<div>
									<FormLabel label='Periodo' required />
									<FormInput {...register('periodo')} placeholder='Ej: 2022-2026' />
								</div>
							</div>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
								<div>
									<FormLabel label='Aprobación Ciudadana' required />
									<FormInput {...register('aprobacionCiudadana')} placeholder='Ej: 85%' />
								</div>
								<div>
									<FormLabel label='Atención Ciudadana' required />
									<FormInput {...register('atencionCiudadana')} placeholder='Ej: 24/7' />
								</div>
							</div>
							<div>
								<FormLabel label='Descripción' required />
								<div className="text-right text-xs text-slate-500 mb-1">
									{descripcion.length}/600 caracteres
								</div>
								<FormTextArea
									value={descripcion}
									onChange={e => {
										if (e.target.value.length <= 600) {
											setDescripcion(e.target.value);
											setValue('descripcion', e.target.value, { shouldValidate: true });
										}
									}}
									placeholder='Escriba la descripción del alcalde...'
									rows={4}
								/>
							</div>
							<div>
								<FormLabel label='Experiencia' required />
								<FormTextArea
									{...register('experiencia')}
									placeholder='Describa la experiencia del alcalde...'
									rows={3}
								/>
							</div>
							<div>
								<FormLabel label='Reconocimientos' required />
								<FormTextArea
									{...register('reconocimientos')}
									placeholder='Describa los reconocimientos del alcalde...'
									rows={3}
								/>
							</div>
							<div>
								<FormLabel label='Compromiso' required />
								<FormTextArea
									{...register('compromiso')}
									placeholder='Describa el compromiso del alcalde...'
									rows={3}
								/>
							</div>
							<div>
								<FormLabel label='Imagen' required />
								<div className='space-y-3'>
									<FormFileInput id='imagen-input' accept='image/*' onChange={handleImageChange} />
									{previewImage && <ImagePreview src={previewImage} alt='Vista previa' onRemove={removeImage} />}
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
								{alcaldeEditable ? 'Actualizar' : 'Crear'} Alcalde
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
