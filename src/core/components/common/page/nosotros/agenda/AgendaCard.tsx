import { HiClock } from 'react-icons/hi';
import type { AgendaResponse } from '../../../../../../features/administrador/agenda-admin/schemas/agenda.schema';

interface AgendaCardProps {
	evento: AgendaResponse;
	index: number;
	onSelect: (id: number) => void;
}

const AgendaCard = ({ evento, index, onSelect }: AgendaCardProps) => {
	
	const [year, month, day] = evento.fecha.split('-');
	const fecha = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
	const diaSemana = fecha.toLocaleDateString('es-PE', { weekday: 'long' });
	const diaNumero = fecha.getDate();

	return (
		<div
			className='mb-4 overflow-hidden transition-all border border-blue-100 rounded cursor-pointer hover:shadow-lg hover:scale-105'
			style={{ animationDelay: `${index * 0.1}s` }}
			onClick={() => onSelect(evento.agendaId ? evento.agendaId : 0)}>
			<div className='flex'>
				<div className='w-2'></div>
				<div className='flex gap-3 p-3'>
					<div className='flex flex-col items-center justify-center flex-shrink-0 p-2 border border-blue-200 rounded h-14 w-14 bg-blue-50'>
						<span className='text-xs text-blue-400 uppercase'>{diaSemana}</span>
						<span className='text-xl font-bold text-blue-700'>{diaNumero}</span>
					</div>
					<div className='flex-1 min-w-0'>
						<h4 className='overflow-hidden font-medium whitespace-nowrap text-ellipsis'>{evento.titulo}</h4>
						<span className='text-xs px-2 py-0.5 rounded-full inline-block mt-1 bg-blue-100 text-blue-800'>
							{evento.categoria}
						</span>
						<div className='flex items-center mt-1 text-sm text-gray-500'>
							<HiClock className='w-3 h-3 mr-1' />
							{evento.horaInicio} - {evento.horaFin}
						</div>
						<div className='overflow-hidden text-sm text-gray-500 whitespace-nowrap text-ellipsis'>
							{evento.direccion}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AgendaCard;
