import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { crearPresupuesto } from '../../../../core/services/presupuesto/crearPresupuesto';
import { editarPresupuesto } from '../../../../core/services/presupuesto/editarPresupuesto';
import type { presupuestoPayload } from '../../../../core/services/presupuesto/presupuesto.interface';

interface PresupuestoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	initialData?: presupuestoPayload | null;
}

export default function ModalAgregar({ isOpen, onClose, onSave, initialData }: PresupuestoModalProps) {
	const [titulo, setTitulo] = useState('');
	const [tipo, setTipo] = useState('');
	const [documento, setDocumento] = useState<File | null>(null);

	// Efecto para cargar datos iniciales cuando se está editando
	useEffect(() => {
		if (initialData) {
			setTitulo(initialData.titulo);
			setTipo(initialData.tipo);
			// No cargamos el documento ya que es un archivo
		} else {
			setTitulo('');
			setTipo('');
			setDocumento(null);
		}
	}, [initialData]);

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const form = new FormData();
		form.append('titulo', titulo);
		form.append('tipo', tipo);
		if (documento) {
			form.append('linkDocumento', documento);
		}

		let success = false;
		
		if (initialData && initialData.presupuestoId) {
			// Editar presupuesto existente
			success = await editarPresupuesto(initialData.presupuestoId, form);
		} else {
			// Crear nuevo presupuesto
			success = await crearPresupuesto(form);
		}

		if (success) {
			resetForm();
			onSave?.();
			onClose();
		}
	};

	const resetForm = () => {
		setTitulo('');
		setTipo('');
		setDocumento(null);
	};

	const handleClose = () => {
		if (!initialData) resetForm(); // Solo resetear si no hay datos iniciales
		onClose();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>
						{initialData ? 'Editar Presupuesto' : 'Crear Presupuesto'}
					</h3>
					<button onClick={handleClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				{/* Content - Scrollable */}
				<div className='flex-1 p-6 overflow-y-auto'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Row 1: Titulo y Tipo */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Titulo <span className='text-red-500'>*</span>
								</label>
								<input
									value={titulo}
									onChange={(e) => setTitulo(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el título'
								/>
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Tipo <span className='text-red-500'>*</span>
								</label>
								<input
									value={tipo}
									onChange={(e) => setTipo(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el tipo'
								/>
							</div>
						</div>
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Documento (PDF o Word) <span className='text-red-500'>*</span>
							</label>
							<input
								type="file"
								accept=".pdf,.doc,.docx"
								onChange={(e) => setDocumento(e.target.files?.[0] ?? null)}
								required={!initialData} // Solo requerido si no hay datos iniciales
								className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
							/>
						</div>

					</form>
				</div>

				{/* Footer - Fixed */}
				<div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
					<button
						type='button'
						onClick={handleClose}
						className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
						Cancelar
					</button>
					<button
						onClick={handleSubmit}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'>
						{initialData ? 'Actualizar' : 'Crear'} Presupuesto
					</button>
				</div>
			</div>
		</div>
	);
}
