import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel, ImagePreview } from '../../../../core/components/common/form';
import { FormTextArea } from '../../../../core/components/common/form/FormTextArea';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useImagePreview } from '../../../../core/hooks/useImagePreview';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useTurismoMutations } from '../hooks/useTurismoMutations';
import {
	turismoEditForm,
	turismoRequest,
	type TurismoEditForm,
	type TurismoRequest,
	type Turismo,
} from '../schemas/turismo.schema';

interface TurismoModalProps {
	handleModal: () => void;
	turismoEditable?: Turismo | null;
}

export const TurismoForm = ({ handleModal, turismoEditable }: TurismoModalProps) => {
	const isEditing = Boolean(turismoEditable);
	const { register, handleSubmit, reset, setValue } = useForm<TurismoRequest | TurismoEditForm>({
		resolver: zodResolver(isEditing ? turismoEditForm : turismoRequest),
		defaultValues: {
			titulo: turismoEditable?.titulo || '',
			descripcion: turismoEditable?.descripcion || '',
			lugar: turismoEditable?.lugar || '',
			ubicacion: turismoEditable?.ubicacion || '',
		},
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { createTurismo, updateTurismo } = useTurismoMutations();
	const { previewImage, handleImageChange, removeImage } = useImagePreview({
		setValue: setImageHookForm,
		initialImage: turismoEditable?.direccionImagen,
	});

	function setImageHookForm(file: File | null) {
		if (file) {
			setValue('direccionImagen', file, { shouldValidate: true });
		}
	}

	function onSubmit(data: TurismoRequest | TurismoEditForm) {
		const turismoData = {
			titulo: data.titulo,
			descripcion: data.descripcion,
			lugar: data.lugar,
			ubicacion: data.ubicacion,
		};
		if (isEditing && turismoEditable) {
			const updateData = data.direccionImagen
				? { ...turismoData, direccionImagen: data.direccionImagen }
				: turismoData;
			updateTurismo.mutate(
				{ id: turismoEditable.turismoId, data: updateData },
				{
					onSuccess: () => {
						success('Elemento de turismo actualizado exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar el elemento de turismo'),
				}
			);
		} else {
			createTurismo.mutate(
				{ ...turismoData, direccionImagen: data.direccionImagen as File },
				{
					onSuccess: () => {
						reset();
						removeImage();
						success('Elemento de turismo creado exitosamente');
						handleModal();
					},
					onError: () => error('Error al crear el elemento de turismo'),
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
									<FormInput {...register('titulo')} placeholder='Ingrese el título del lugar turístico' />
								</div>
								<div>
									<FormLabel label='Lugar' required />
									<FormInput {...register('lugar')} placeholder='Ingrese el nombre del lugar' />
								</div>
							</div>
							<div>
								<FormLabel label='Ubicación' required />
								<FormInput {...register('ubicacion')} placeholder='Ingrese la ubicación específica' />
							</div>
							<div>
								<FormLabel label='Descripción' required />
								<FormTextArea
									{...register('descripcion')}
									placeholder='Escriba la descripción del lugar turístico...'
									rows={6}
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
								{turismoEditable ? 'Actualizar' : 'Crear'} Elemento de Turismo
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
