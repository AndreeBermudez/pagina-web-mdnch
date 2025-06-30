import { HiArrowRight, HiCalendar, HiClock, HiLocationMarker, HiUsers, HiViewGrid } from 'react-icons/hi';
import { type Evento } from './types';

interface EventoDetalleProps {
	evento: Evento;
}

const EventoDetalle = ({ evento }: EventoDetalleProps) => {
	const fechaEvento = new Date(evento.fecha);
	const opciones: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const fechaFormateada = fechaEvento.toLocaleDateString('es-ES', opciones);

	return (
		<div className='border border-blue-200 rounded shadow'>
			<div className='relative h-48 w-full overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-t from-blue-800/70 to-transparent z-10'></div>
				<img
					src={evento.imagen}
					alt={evento.titulo}
					className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'
				/>
				{evento.destacado && (
					<div className='absolute top-3 right-3 z-20 bg-cyan-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1'>
						<HiViewGrid className='w-4 h-4' />
						Destacado
					</div>
				)}
				<div className='absolute bottom-4 left-4 z-20'>
					<h1 className='text-3xl font-bold text-white drop-shadow'>{evento.titulo}</h1>
					{evento.organizador && (
						<div className='flex items-center text-white/90 text-sm gap-1'>
							<HiUsers className='w-4 h-4' />
							Organizado por: <span>{evento.organizador}</span>
						</div>
					)}
				</div>
			</div>
			<div className='p-6'>
				<div className='flex flex-wrap gap-4 mb-6 bg-blue-50 p-4 rounded'>
					<div className='flex items-center text-blue-800'>
						<HiCalendar className='w-5 h-5 mr-2 text-blue-600' />
						<span>{fechaFormateada}</span>
					</div>
					<div className='flex items-center text-blue-800'>
						<HiClock className='w-5 h-5 mr-2 text-blue-600' />
						<span>
							{evento.horaInicio} - {evento.horaFin}
						</span>
					</div>
					<div className='flex items-center text-blue-800'>
						<HiLocationMarker className='w-5 h-5 mr-2 text-blue-600' />
						<span>{evento.ubicacion}</span>
					</div>
				</div>

				<div className='mt-4'>
					<h2 className='text-2xl font-bold text-blue-800 mb-4'>Descripción del evento</h2>
					<p className='text-gray-700'>{evento.descripcion}</p>
					{evento.descripcionCompleta && (
						<div className='mt-4 p-4 bg-blue-50 border border-blue-100 rounded'>
							<p
								dangerouslySetInnerHTML={{
									__html: evento.descripcionCompleta.replace(/\n/g, '<br>'),
								}}
							/>
						</div>
					)}
				</div>
			</div>
			<div className='bg-gradient-to-r from-blue-100 to-cyan-100 p-4'>
				<button
					className='w-full inline-flex items-center justify-center py-2 px-4 rounded font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
					onClick={() => (window.location.href = `/eventos/${evento.id}`)}>
					Ver detalles completos
					<HiArrowRight className='w-4 h-4 ml-2' />
				</button>
			</div>
		</div>
	);
};

export default EventoDetalle;
