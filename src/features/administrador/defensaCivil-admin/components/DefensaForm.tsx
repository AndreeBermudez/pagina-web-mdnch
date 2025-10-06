import { useState, useEffect } from 'react';
import { X, FileText, Phone, Users, Shield } from 'lucide-react';
import { useDefensaMutations } from '../hooks/useDefensaMutations';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import type { DefensaCivil } from '../services/defensa.interface';

interface DefensaFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	initialData?: DefensaCivil | null;
}

export default function DefensaForm({ isOpen, onClose, onSave, initialData }: DefensaFormProps) {
	const [titulo, setTitulo] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [rutaPdf, setRutaPdf] = useState<File | null>(null);
	const [numeroSerenazgo, setNumeroSerenazgo] = useState('');
	const [numeroSalud, setNumeroSalud] = useState('');
	const [numeroBomberos, setNumeroBomberos] = useState('');
	
	const { crearDefensa, actualizarDefensa } = useDefensaMutations();
	const { success, error } = useNotifications();

	useEffect(() => {
		if (initialData) {
			setTitulo(initialData.titulo || '');
			setDescripcion(initialData.descripcion || '');
			setNumeroSerenazgo(initialData.numeroSerenazgo || '');
			setNumeroSalud(initialData.numeroSalud || '');
			setNumeroBomberos(initialData.numeroBomberos || '');
			// No establecemos el archivo PDF ya que no se puede precargar
			setRutaPdf(null);
		} else {
			setTitulo('');
			setDescripcion('');
			setNumeroSerenazgo('');
			setNumeroSalud('');
			setNumeroBomberos('');
			setRutaPdf(null);
		}
	}, [initialData]);

	if (!isOpen) return null;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.type !== 'application/pdf') {
				error('Solo se permiten archivos PDF');
				return;
			}
			if (file.size > 10 * 1024 * 1024) {
				error('El archivo no puede exceder 10MB');
				return;
			}
			setRutaPdf(file);
		}
	};

	const handleSave = async () => {
		// Validaciones
		if (!titulo.trim()) {
			error('El título es obligatorio');
			return;
		}
		if (!descripcion.trim()) {
			error('La descripción es obligatoria');
			return;
		}
		if (!numeroSerenazgo.trim()) {
			error('El número de Serenazgo es obligatorio');
			return;
		}
		if (!numeroSalud.trim()) {
			error('El número de Salud es obligatorio');
			return;
		}
		if (!numeroBomberos.trim()) {
			error('El número de Bomberos es obligatorio');
			return;
		}

		try {
			const defensaId = initialData?.defensaCivilId || (initialData as any)?.id;
			if (defensaId) {
				// Actualizar defensa existente
				await actualizarDefensa.mutateAsync({
					id: defensaId,
					data: {
						titulo: titulo.trim(),
						descripcion: descripcion.trim(),
						rutaPdf: rutaPdf,
						numeroSerenazgo: numeroSerenazgo.trim(),
						numeroSalud: numeroSalud.trim(),
						numeroBomberos: numeroBomberos.trim()
					}
				});
				success('Información de Defensa Civil actualizada exitosamente');
			} else {
				// Crear nueva defensa
				await crearDefensa.mutateAsync({
					titulo: titulo.trim(),
					descripcion: descripcion.trim(),
					rutaPdf: rutaPdf,
					numeroSerenazgo: numeroSerenazgo.trim(),
					numeroSalud: numeroSalud.trim(),
					numeroBomberos: numeroBomberos.trim()
				});
				success('Información de Defensa Civil creada exitosamente');
			}

			// Limpiar formulario y cerrar modal
			setTitulo('');
			setDescripcion('');
			setRutaPdf(null);
			setNumeroSerenazgo('');
			setNumeroSalud('');
			setNumeroBomberos('');
			onSave?.();
			onClose();
		} catch (err: any) {
			error(err.message || 'Error al guardar la información de Defensa Civil');
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col'>
			{/* Header */}
			<div className='flex items-center justify-between p-6 border-b border-slate-200'>
				<h3 className='text-xl font-semibold text-slate-900'>
					{initialData ? 'Editar Defensa Civil' : 'Nueva Defensa Civil'}
				</h3>
				<button onClick={onClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
					<X className='w-5 h-5 text-slate-500' />
				</button>
			</div>			{/* Content - Scrollable */}
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
							placeholder='Ingrese el título'
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
							placeholder='Ingrese la descripción'
							maxLength={1000}
						/>
						<p className='mt-1 text-xs text-slate-500'>
							{descripcion.length}/1000 caracteres
						</p>
					</div>

					{/* Archivo PDF */}
					<div>
						<label className='block mb-2 text-sm font-medium text-slate-700'>
							Archivo PDF {!initialData && <span className='text-red-500'>*</span>}
						</label>
						<div className='relative'>
							<FileText className='absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
							<input
								id='rutaPdf'
								type='file'
								accept='.pdf'
								onChange={handleFileChange}
								className='w-full pl-10 pr-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
							/>
						</div>
						<p className='mt-1 text-xs text-slate-500'>
							Solo archivos PDF, máximo 10MB
						</p>
						{initialData?.rutaPdf && (
							<p className='mt-1 text-xs text-blue-600'>
								Archivo actual: {initialData.rutaPdf.split('/').pop()}
							</p>
						)}
					</div>

					{/* Números de Emergencia */}
					<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
						{/* Serenazgo */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Serenazgo <span className='text-red-500'>*</span>
							</label>
							<div className='relative'>
								<Shield className='absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
								<input
									id='numeroSerenazgo'
									type='tel'
									value={numeroSerenazgo}
									onChange={(e) => setNumeroSerenazgo(e.target.value)}
									required
									className='w-full pl-10 pr-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='(043)313000'
									maxLength={20}
								/>
							</div>
						</div>

						{/* Salud */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Salud <span className='text-red-500'>*</span>
							</label>
							<div className='relative'>
								<Users className='absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
								<input
									id='numeroSalud'
									type='tel'
									value={numeroSalud}
									onChange={(e) => setNumeroSalud(e.target.value)}
									required
									className='w-full pl-10 pr-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='483230'
									maxLength={20}
								/>
							</div>
						</div>

						{/* Bomberos */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Bomberos <span className='text-red-500'>*</span>
							</label>
							<div className='relative'>
								<Phone className='absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
								<input
									id='numeroBomberos'
									type='tel'
									value={numeroBomberos}
									onChange={(e) => setNumeroBomberos(e.target.value)}
									required
									className='w-full pl-10 pr-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='(043)341569'
									maxLength={20}
								/>
							</div>
						</div>
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
						disabled={
							!titulo.trim() || 
							!descripcion.trim() || 
							!numeroSerenazgo.trim() || 
							!numeroSalud.trim() || 
							!numeroBomberos.trim() || 
							(!initialData && !rutaPdf) ||
							crearDefensa.isPending || 
							actualizarDefensa.isPending
						}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed'>
						{(crearDefensa.isPending || actualizarDefensa.isPending) ? (
							<div className="flex items-center space-x-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								<span>Guardando...</span>
							</div>
						) : (
							`${initialData ? 'Actualizar' : 'Crear'} Defensa Civil`
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
