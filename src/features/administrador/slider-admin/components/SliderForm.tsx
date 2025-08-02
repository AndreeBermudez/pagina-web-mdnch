import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormLabel } from '../../../../core/components/common/form';
import { FormFileInput } from '../../../../core/components/common/form/FormFileInput';
import { FormTextArea } from '../../../../core/components/common/form/FormTextArea';
import { ImagePreview } from '../../../../core/components/common/form/ImagePreview';
import { useImagePreview } from '../../../../core/hooks/useImagePreview';
import {
	sliderEditSchema,
	sliderFormSchema,
	type SliderEditData,
	type SliderFormData,
	type SliderResponse,
} from '../schemas/slider.schema';
import { useSliderMutations } from '../hooks/useSliderMutations';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';

interface SliderFormProps {
	handleModal: () => void;
	sliderEditable: SliderResponse | null;
}

const SliderForm = ({ sliderEditable, handleModal }: SliderFormProps) => {
	const isEditing = Boolean(sliderEditable);
	const { register, handleSubmit, reset, setValue } = useForm<SliderFormData | SliderEditData>({
		resolver: zodResolver(isEditing ? sliderEditSchema : sliderFormSchema),
		defaultValues: {
			titulo: sliderEditable?.titulo ?? ['', '', ''],
			descripcion: sliderEditable?.descripcion || '',
		},
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { crearSlider, actualizarSlider } = useSliderMutations();
	const { previewImage, handleImageChange, removeImage } = useImagePreview({
		setValue: setImageHookForm,
		initialImage: sliderEditable?.direccionImagen,
	});

	function setImageHookForm(file: File | null) {
		if (file) {
			setValue('direccionImagen', file, { shouldValidate: true });
		}
	}

	function onSubmit(data: SliderFormData | SliderEditData) {
		const sliceData = {
			titulo: data.titulo,
			descripcion: data.descripcion,
			activo: 'true' as const,
		};
		if (isEditing && sliderEditable) {
			const updateData = data.direccionImagen
				? { ...sliceData, direccionImagen: data.direccionImagen }
				: sliceData;
			actualizarSlider.mutate(
				{ data: updateData, id: parseInt(sliderEditable.bannerId) },
				{
					onSuccess: () => {
						success('Slider actualizado exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar el slider'),
				}
			);
		} else {
			crearSlider.mutate(
				{ ...sliceData, direccionImagen: data.direccionImagen as File },
				{
					onSuccess: () => {
						reset();
						removeImage();
						success('Slider creado exitosamente');
						handleModal();
					},
					onError: () => error('Error al crear el slider'),
				}
			);
		}
	}

	return (
		<div className='flex flex-col h-[calc(95vh-theme(spacing.28))]'>
			<form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col h-full'>
				<div className='flex-1 overflow-y-auto'>
					<div className='p-6 space-y-6'>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<FormLabel label='Título' />
								<div className='space-y-2'>
									<FormInput {...register('titulo.0')} placeholder='Título 1' />
									<FormInput {...register('titulo.1')} placeholder='Título 2' />
									<FormInput {...register('titulo.2')} placeholder='Título 3' />
								</div>
							</div>
						</div>
						<div>
							<FormLabel label='Descripción' />
							<FormTextArea {...register('descripcion')} placeholder='Descripción del slider' />
						</div>
						<div>
							<FormLabel label='Imagen' />
							<div className='space-y-3'>
								<FormFileInput id='imagen-input' accept='image/*' onChange={handleImageChange} />
								{previewImage && <ImagePreview src={previewImage} alt='Vista previa' onRemove={removeImage} />}
							</div>
						</div>
					</div>
				</div>

				<div className='sticky bottom-0 px-6 py-4 border-t rounded-b-xl bg-slate-50 border-slate-200'>
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
							{sliderEditable ? 'Actualizar' : 'Crear'} Slider
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SliderForm;
