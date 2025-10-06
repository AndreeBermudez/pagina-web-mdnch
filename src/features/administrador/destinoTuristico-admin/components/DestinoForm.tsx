import { useState, useEffect } from 'react';
import { X, Link2 } from 'lucide-react';
import { useDestinosMutations } from '../hooks/useDestinosMutations';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import type { Destino } from '../services/destino.interface';

interface DestinoFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	initialData?: Destino | null;
}

export default function DestinoForm({ isOpen, onClose, onSave, initialData }: DestinoFormProps) {
	const [video, setVideo] = useState('');
	
	const { crearDestino, actualizarDestino } = useDestinosMutations();
	const { success, error } = useNotifications();

	useEffect(() => {
		if (initialData) {
			setVideo(initialData.video || '');
		} else {
			setVideo('');
		}
	}, [initialData]);

	if (!isOpen) return null;

	const handleSave = async () => {
		if (!video.trim()) {
			error('El enlace del video es obligatorio');
			return;
		}

		try {
			const destinoId = initialData?.destinoTuristicoId || (initialData as any)?.id || (initialData as any)?.destinoId;
			if (destinoId) {
				// Actualizar destino existente
				await actualizarDestino.mutateAsync({
					id: destinoId,
					data: {
						video: video.trim()
					}
				});
				success('Destino turístico actualizado exitosamente');
			} else {
				// Crear nuevo destino
				await crearDestino.mutateAsync({
					video: video.trim()
				});
				success('Destino turístico creado exitosamente');
			}

			// Limpiar formulario y cerrar modal
			setVideo('');
			onSave?.();
			onClose();
		} catch (err: any) {
			error(err.message || 'Error al guardar el destino turístico');
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col'>
			{/* Header */}
			<div className='flex items-center justify-between p-6 border-b border-slate-200'>
				<h3 className='text-xl font-semibold text-slate-900'>
					{initialData ? 'Editar Destino Turístico' : 'Nuevo Destino Turístico'}
				</h3>
				<button onClick={onClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
					<X className='w-5 h-5 text-slate-500' />
				</button>
			</div>			{/* Content - Scrollable */}
			<div className='flex-1 p-6 overflow-y-auto'>
				<div className='space-y-6'>
					{/* Video Link */}
					<div>
						<label className='block mb-2 text-sm font-medium text-slate-700'>
							Enlace del Video <span className='text-red-500'>*</span>
						</label>
						<div className='relative'>
							<Link2 className='absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
							<input
								id='video'
								type='url'
								value={video}
								onChange={(e) => setVideo(e.target.value)}
								required
								className='w-full pl-10 pr-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='https://www.youtube.com/watch?v=ejemplo'
							/>
						</div>
						<p className='mt-1 text-xs text-slate-500'>
							Ingrese la URL completa del video (YouTube, Vimeo, etc.)
						</p>
					</div>
				</div>
			</div>				{/* Footer - Fixed */}
				<div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
					<button
						type='button'
						onClick={onClose}
						className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
						Cancelar
					</button>
					<button
						onClick={handleSave}
						disabled={!video.trim() || crearDestino.isPending || actualizarDestino.isPending}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed'>
						{(crearDestino.isPending || actualizarDestino.isPending) ? (
							<div className="flex items-center space-x-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								<span>Guardando...</span>
							</div>
						) : (
							`${initialData ? 'Actualizar' : 'Crear'} Destino`
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
