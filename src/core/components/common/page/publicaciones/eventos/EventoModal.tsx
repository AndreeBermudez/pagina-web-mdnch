import { Clock, MapPin, Tag, X } from 'lucide-react';
import { returnDay, returnMonth } from '../../../../../utils/formatDate';
import type { Evento } from '../../../../../services/eventos/evento.interface';

interface EventoModalProps {
	isOpen: boolean;
	onClose: () => void;
	evento?: Evento;
}

const EventoModal = ({ isOpen, onClose, evento }: EventoModalProps) => {
	if (!isOpen || !evento) return null;

	const getCategoryColor = (categoria: string) => {
		const colors = {
			Cultural: 'bg-purple-100 text-purple-800 border-purple-200',
			Deportivo: 'bg-green-100 text-green-800 border-green-200',
			Educativo: 'bg-blue-100 text-blue-800 border-blue-200',
			Social: 'bg-orange-100 text-orange-800 border-orange-200',
		};
		return colors[categoria as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
			<div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden'>
				{/* Header con imagen */}
				<div className='relative'>
					<img
						src={evento.direccionImagen}
						alt={evento.titulo}
						className='object-cover w-full h-56'
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.onerror = null;
							target.src = '/placeholder-image.jpg';
						}}
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>

					{/* Botón cerrar */}
					<button
						onClick={onClose}
						className='absolute p-2 transition-all duration-200 rounded-full shadow-lg top-4 right-4 bg-white/95 hover:bg-white'>
						<X className='w-5 h-5 text-slate-600' />
					</button>

					{/* Badge de categoría */}
					<div className='absolute bottom-4 left-4'>
						<span
							className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getCategoryColor(
								evento.categoria
							)}`}>
							<Tag className='w-4 h-4 mr-1.5' />
							{evento.categoria}
						</span>
					</div>
				</div>

				{/* Content */}
				<div className='p-6 overflow-y-auto max-h-[calc(85vh-14rem)]'>
					{/* Título y fecha */}
					<div className='flex items-start justify-between mb-6'>
						<div className='flex-1'>
							<h2 className='mb-2 text-2xl font-bold text-slate-900'>{evento.titulo}</h2>
						</div>
						<div className='ml-4 bg-blue-50 rounded-xl p-3 text-center min-w-[70px] shadow-sm border border-blue-100'>
							<span className='block text-xl font-bold text-blue-700'>{returnDay(evento.fecha)}</span>
							<span className='text-sm font-medium text-blue-600'>{returnMonth(evento.fecha)}</span>
						</div>
					</div>

					{/* Info grid */}
					<div className='grid grid-cols-1 gap-4 mb-6 md:grid-cols-2'>
						{/* Hora */}
						<div className='flex items-center p-4 space-x-3 border bg-slate-50 rounded-xl border-slate-200'>
							<div className='flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg'>
								<Clock className='w-5 h-5 text-blue-600' />
							</div>
							<div>
								<p className='text-sm font-semibold text-slate-900'>Horario</p>
								<p className='text-sm text-slate-600'>{evento.hora}</p>
							</div>
						</div>

						{/* Ubicación */}
						<div className='flex items-center p-4 space-x-3 border bg-slate-50 rounded-xl border-slate-200'>
							<div className='flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg'>
								<MapPin className='w-5 h-5 text-green-600' />
							</div>
							<div>
								<p className='text-sm font-semibold text-slate-900'>Ubicación</p>
								<p className='text-sm text-slate-600'>{evento.ubicacion}</p>
							</div>
						</div>
					</div>

					{/* Descripción */}
					<div className='mb-6'>
						<h3 className='mb-3 text-lg font-semibold text-slate-900'>Descripción del evento</h3>
						<div className='p-4 prose-sm prose border max-w-none text-slate-600 bg-slate-50 rounded-xl border-slate-200'>
							<p>
								{evento.descripcion ||
									'Únete a nosotros en este increíble evento. Será una experiencia memorable llena de actividades especiales y momentos únicos que no querrás perderte.'}
							</p>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default EventoModal;
