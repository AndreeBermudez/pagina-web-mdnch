import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormInput, FormLabel } from '../../../../core/components/common/form';
import { FormDateInput } from '../../../../core/components/common/form/FormDateInput';
import { FormSelect } from '../../../../core/components/common/form/FormSelect';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useAgendaMutations } from '../hooks/useAgendaMutation';
import { agendaRequestSchema, type AgendaRequest, type AgendaResponse } from '../schemas/agenda.schema';

interface AgendaModalProps {
	handleModal: () => void;
	agendaEditable?: AgendaResponse | null;
}

export const AgendaForm = ({ handleModal, agendaEditable }: AgendaModalProps) => {
	const isEditing = Boolean(agendaEditable);
	const { register, handleSubmit, reset } = useForm<AgendaRequest>({
		resolver: zodResolver(agendaRequestSchema),
		defaultValues: {
			titulo: agendaEditable?.titulo || '',
			direccion: agendaEditable?.direccion || '',
			categoria: agendaEditable?.categoria || '',
			fecha: agendaEditable?.fecha || '',
			horaInicio: agendaEditable?.horaInicio || '',
			horaFin: agendaEditable?.horaFin || '',
		}
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { crearAgenda, actualizarAgenda } = useAgendaMutations();

	function onSubmit(data: AgendaRequest) {
		if (isEditing && agendaEditable?.agendaId) {
			actualizarAgenda.mutate(
				{ id: agendaEditable.agendaId, data: data },
				{
					onSuccess: () => {
						success('Agenda actualizada exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar la agenda'),
				}
			);
		} else {
			crearAgenda.mutate(data, {
				onSuccess: () => {
					reset();
					success('Agenda creada exitosamente');
					handleModal();
				},
				onError: () => error('Error al crear la agenda'),
			});
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
									<FormInput {...register('titulo')} placeholder='Ingrese el título' />
								</div>
								<div>
									<FormLabel label='Dirección' required />
									<FormInput {...register('direccion')} placeholder='Ingrese la dirección' />
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
							</div>
							<div>
								<FormLabel label='Fecha' required />
								<FormDateInput {...register('fecha')} />
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
								{agendaEditable ? 'Actualizar' : 'Crear'} Agenda
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
