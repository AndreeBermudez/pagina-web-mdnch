import { HiClock } from 'react-icons/hi';

interface Evento {
	id: string;
	titulo: string;
	categoria: string;
	horaInicio: string;
	horaFin: string;
	direccion: string;
	fecha: string; // en formato YYYY-MM-DD
}

interface EventoCardProps {
	evento: Evento;
	index: number;
	onSelect: (id: string) => void;
}

const EventoCard = ({ evento, index, onSelect }: EventoCardProps) => {
	const fecha = new Date(evento.fecha);
	const diaSemana = fecha.toLocaleDateString('es-PE', { weekday: 'long' });
	const diaNumero = fecha.getDate();

	return (
		<div
			className='border border-blue-100 rounded overflow-hidden cursor-pointer transition-all mb-4 hover:shadow-lg hover:scale-105'
			style={{ animationDelay: `${index * 0.1}s` }}
			onClick={() => onSelect(evento.id)}
		>
			<div className='flex'>
				<div className='w-2'></div>
				<div className='flex gap-3 p-3'>
					<div className='flex-shrink-0 p-2 flex flex-col items-center justify-center h-14 w-14 rounded border border-blue-200 bg-blue-50'>
						<span className='text-xs text-blue-400 uppercase'>{diaSemana}</span>
						<span className='text-xl font-bold text-blue-700'>{diaNumero}</span>
					</div>
					<div className='flex-1 min-w-0'>
						<h4 className='font-medium whitespace-nowrap overflow-hidden text-ellipsis'>
							{evento.titulo}
						</h4>
						<span className='text-xs px-2 py-0.5 rounded-full inline-block mt-1 bg-blue-100 text-blue-800'>
							{evento.categoria}
						</span>
						<div className='flex items-center text-sm text-gray-500 mt-1'>
							<HiClock className='w-3 h-3 mr-1' />
							{evento.horaInicio} - {evento.horaFin}
						</div>
						<div className='text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis'>
							{evento.direccion}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventoCard;
