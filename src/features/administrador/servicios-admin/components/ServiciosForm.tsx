import { useState, useEffect } from 'react';
import { X, Link2 } from 'lucide-react';
import { useServiciosMutations } from '../hooks/useServiciosMutations';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import type { Servicio } from '../services/servicios.interface';

interface ServicioFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	initialData?: Servicio | null;
}

export default function ServiciosForm({ isOpen, onClose, onSave, initialData }: ServicioFormProps) {
	const [titulo, setTitulo] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [link, setLink] = useState('');
	
	const { crearServicio, actualizarServicio } = useServiciosMutations();
	const { success, error } = useNotifications();

	useEffect(() => {
		if (initialData) {
			setTitulo(initialData.titulo || '');
			setDescripcion(initialData.descripcion || '');
			setLink(initialData.link || '');
		} else {
			setTitulo('');
			setDescripcion('');
			setLink('');
		}
	}, [initialData]);

	if (!isOpen) return null;

	const handleSave = async () => {
		if (!titulo.trim()) {
			error('El título es obligatorio');
			return;
		}

		if (!descripcion.trim()) {
			error('La descripción es obligatoria');
			return;
		}

		if (!link.trim()) {
			error('El enlace es obligatorio');
			return;
		}

		try {
			if (initialData?.serviciosMuniId) {
				// Actualizar servicio existente
				await actualizarServicio.mutateAsync({
					id: initialData.serviciosMuniId,
					data: {
						titulo: titulo.trim(),
						descripcion: descripcion.trim(),
						link: link.trim()
					}
				});
				success('Servicio actualizado exitosamente');
			} else {
				// Crear nuevo servicio
				await crearServicio.mutateAsync({
					titulo: titulo.trim(),
					descripcion: descripcion.trim(),
					link: link.trim()
				});
				success('Servicio creado exitosamente');
			}

			// Limpiar formulario y cerrar modal
			setTitulo('');
			setDescripcion('');
			setLink('');
			onSave?.();
			onClose();
		} catch (err: any) {
			error(err.message || 'Error al guardar el servicio');
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>
						{initialData ? 'Editar Servicio' : 'Nuevo Servicio'}
					</h3>
					<button onClick={onClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				{/* Content - Scrollable */}
				<div className='flex-1 p-6 overflow-y-auto'>
					<div className='space-y-6'>
						{/* Título */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Título <span className='text-red-500'>*</span>
							</label>
							<input
								id='titulo'
								value={titulo}
								onChange={(e) => setTitulo(e.target.value)}
								required
								className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='Ingrese el título del servicio'
								maxLength={255}
							/>
							<p className='mt-1 text-xs text-slate-500'>
								{titulo.length}/255 caracteres
							</p>
						</div>

						{/* Descripción */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Descripción <span className='text-red-500'>*</span>
							</label>
							<textarea
								id='descripcion'
								value={descripcion}
								onChange={(e) => setDescripcion(e.target.value)}
								required
								rows={4}
								className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
								placeholder='Ingrese la descripción del servicio'
								maxLength={500}
							/>
							<p className='mt-1 text-xs text-slate-500'>
								{descripcion.length}/500 caracteres
							</p>
						</div>

						{/* Link */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Enlace <span className='text-red-500'>*</span>
							</label>
							<div className='relative'>
								<Link2 className='absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
								<input
									id='link'
									type='url'
									value={link}
									onChange={(e) => setLink(e.target.value)}
									required
									className='w-full pl-10 pr-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='https://ejemplo.com'
								/>
							</div>
							<p className='mt-1 text-xs text-slate-500'>
								Incluya http:// o https:// al inicio de la URL
							</p>
						</div>
					</div>
				</div>

				{/* Footer - Fixed */}
				<div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
					<button
						type='button'
						onClick={onClose}
						className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
						Cancelar
					</button>
					<button
						onClick={handleSave}
						disabled={!titulo.trim() || !descripcion.trim() || !link.trim() || crearServicio.isPending || actualizarServicio.isPending}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed'>
						{(crearServicio.isPending || actualizarServicio.isPending) ? (
							<div className="flex items-center space-x-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								<span>Guardando...</span>
							</div>
						) : (
							`${initialData ? 'Actualizar' : 'Crear'} Servicio`
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
