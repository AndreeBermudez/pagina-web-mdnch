import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel, FormTextArea, ImagePreview } from '../../../../core/components/common/form';
import { FormDateInput } from '../../../../core/components/common/form/FormDateInput';
import { FormSelect } from '../../../../core/components/common/form/FormSelect';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useImagePreview } from '../../../../core/hooks/useImagePreview';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useEventosMutations } from '../hooks/useEventosMutation';
import {
	eventoEditForm,
	eventoForm,
	type EventoEditForm,
	type EventoForm,
	type EventoResponse,
} from '../schemas/evento.schema';

interface EventoModalProps {
	handleModal: () => void;
	eventoEditable?: EventoResponse | null;
}

export const EventosForm = ({ handleModal, eventoEditable }: EventoModalProps) => {
	const isEditing = Boolean(eventoEditable);
	const { register, handleSubmit, reset, setValue } = useForm<EventoForm | EventoEditForm>({
		resolver: zodResolver(isEditing ? eventoEditForm : eventoForm),
		defaultValues: {
			fecha: eventoEditable?.fecha || '',
			titulo: eventoEditable?.titulo || '',
			categoria: eventoEditable?.categoria || '',
			descripcion: eventoEditable?.descripcion || '',
			horaInicio: eventoEditable?.horaInicio || '',
			horaFin: eventoEditable?.horaFin || '',
			ubicacion: eventoEditable?.ubicacion || '',
		},
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { crearEvento, actualizarEvento } = useEventosMutations();
	const { previewImage, handleImageChange, removeImage } = useImagePreview({
		setValue: setImageHookForm,
		initialImage: eventoEditable?.direccionImagen,
	});

	function setImageHookForm(file: File | null) {
		if (file) {
			setValue('direccionImagen', file, { shouldValidate: true });
		}
	}

	function onSubmit(data: EventoForm | EventoEditForm) {
		const eventoData = {
			titulo: data.titulo,
			categoria: data.categoria,
			descripcion: data.descripcion,
			fecha: data.fecha,
			horaInicio: data.horaInicio,
			horaFin: data.horaFin,
			ubicacion: data.ubicacion,
		};
		if (isEditing && eventoEditable) {
			const updateData = data.direccionImagen ? { ...eventoData, imagen: data.direccionImagen } : eventoData;
			actualizarEvento.mutate(
				{ id: eventoEditable.eventoId, data: updateData },
				{
					onSuccess: () => {
						success('Evento actualizado exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar el evento'),
				}
			);
		} else {
			crearEvento.mutate(
				{ ...eventoData, direccionImagen: data.direccionImagen as File },
				{
					onSuccess: () => {
						reset();
						removeImage();
						success('Evento creado exitosamente');
						handleModal();
					},
					onError: () => error('Error al crear el evento'),
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
									<FormInput {...register('titulo')} placeholder='Ingrese el título del evento' />
								</div>
								<div>
									<FormLabel label='Categoría' required />
									<FormSelect {...register('categoria')}>
										<option value=''>Seleccionar categoría</option>
										<option value='Anuncios'>Anuncios</option>
										<option value='Eventos'>Eventos</option>
										<option value='Obras'>Obras</option>
										<option value='Servicios'>Servicios</option>
										<option value='Cultura'>Cultura</option>
										<option value='Deportes'>Deportes</option>
										<option value='Salud'>Salud</option>
										<option value='Educación'>Educación</option>
									</FormSelect>
								</div>
								<div>
									<FormLabel label='Hora de Inicio' required />
									<FormInput type='time' {...register('horaInicio')} placeholder='Hora de inicio' />
								</div>
								<div>
									<FormLabel label='Hora de Fin' required />
									<FormInput type='time' {...register('horaFin')} placeholder='Hora de fin' />
								</div>
							</div>
							<div>
								<FormLabel label='Fecha de Publicación' required />
								<FormDateInput {...register('fecha')} />
							</div>
							<div>
								<FormLabel label='Ubicación' required />
								<FormInput {...register('ubicacion')} placeholder='Ingrese la ubicación del evento' />
							</div>
							<div>
								<FormLabel label='Descripción' required />
								<FormTextArea {...register('descripcion')} placeholder='Escriba la descripción del evento..' />
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
								{eventoEditable ? 'Actualizar' : 'Crear'} Evento
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
