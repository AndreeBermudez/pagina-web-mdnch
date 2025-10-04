import { useState, useEffect } from 'react';
import { FileText, X, Trash2 } from 'lucide-react';
import { crearControl, actualizarControl } from '../service';
import type { Control } from '../service';

interface ControlFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	initialData?: Control | null;
}

export default function ControlForm({ isOpen, onClose, onSave, initialData }: ControlFormProps) {
	const [titulo, setTitulo] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [previewPdf, setPreviewPdf] = useState<string | null>(null);

	// Función para extraer el nombre del archivo de una URL
	const extractFileName = (url: string): string => {
		try {
			// Extraer el nombre del archivo de la URL
			const parts = url.split('/');
			const fileName = parts[parts.length - 1];
			
			// Si el nombre es muy largo, acortarlo
			if (fileName.length > 50) {
				const extension = fileName.substring(fileName.lastIndexOf('.'));
				const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
				return nameWithoutExt.substring(0, 45) + '...' + extension;
			}
			
			return fileName;
		} catch {
			return 'Archivo PDF';
		}
	};

	useEffect(() => {
		if (initialData) {
			
			setTitulo(initialData.titulo || '');
			setPreviewPdf(initialData.rutaPdf || null);
			setFile(null); 
		} else {
			
			setTitulo('');
			setPreviewPdf(null);
			setFile(null);
		}
	}, [initialData]);

	if (!isOpen) return null;

	const handleSave = async () => {
		if (!titulo.trim()) {
			alert('El título es obligatorio');
			return;
		}

		if (!initialData && !file) {
			alert('Debe seleccionar un archivo PDF');
			return;
		}

		let ok = false;

		if (initialData?.controlInternoId) {
			ok = await actualizarControl(initialData.controlInternoId, {
				titulo: titulo.trim(),
				rutaPdf: file
			});
		} else {
			
			if (file) {
				ok = await crearControl({
					titulo: titulo.trim(),
					rutaPdf: file
				});
			}
		}

		if (ok) {
			onSave?.();
			onClose();
		
			setTitulo('');
			setFile(null);
			setPreviewPdf(null);
		} else {
		
			alert('Error al guardar el control interno');
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>
						{initialData ? 'Editar Control Interno' : 'Nuevo Control Interno'}
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
								placeholder='Ingrese el título del control interno'
								maxLength={255}
							/>
							<p className='mt-1 text-xs text-slate-500'>
								{titulo.length}/255 caracteres
							</p>
						</div>

						{/* Archivo PDF */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Archivo PDF {!initialData && <span className='text-red-500'>*</span>}
							</label>
							<div className='space-y-3'>
								<input
									id='rutaPdf'
									name='rutaPdf'
									type='file'
									accept='application/pdf,.pdf'
									required={!initialData}
									className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
									onChange={(e) => {
										const f = e.target.files?.[0] || null;
										setFile(f);
										if (f) {
											setPreviewPdf(f.name);
										} else {
											setPreviewPdf(null);
										}
									}}
								/>
								
								{/* Vista previa del PDF seleccionado */}
								{file && (
									<div className='flex items-center space-x-3 p-3 bg-slate-50 rounded-lg'>
										<FileText className='w-8 h-8 text-red-600' />
										<div className='flex-1'>
											<p className='text-sm font-medium text-slate-900'>{file.name}</p>
											<p className='text-xs text-slate-500'>
												{(file.size / 1024 / 1024).toFixed(2)} MB
											</p>
										</div>
										<button
											onClick={() => {
												setFile(null);
												setPreviewPdf(null);
												// Limpiar el input file
												const input = document.getElementById('rutaPdf') as HTMLInputElement;
												if (input) input.value = '';
											}}
											className='flex items-center space-x-1 text-sm text-red-600 hover:text-red-800'
											type='button'>
											<Trash2 className='w-4 h-4' />
											<span>Eliminar</span>
										</button>
									</div>
								)}

								{/* Vista previa del PDF existente (al editar) */}
								{!file && previewPdf && initialData && (
									<div className='flex items-center space-x-3 p-3 bg-slate-50 rounded-lg'>
										<FileText className='w-8 h-8 text-red-600' />
										<div className='flex-1'>
											<p className='text-sm font-medium text-slate-900'>Archivo actual</p>
											<p className='text-xs text-slate-500' title={previewPdf}>
												{extractFileName(previewPdf)}
											</p>
										</div>
									</div>
								)}
								
								<p className='text-xs text-slate-500'>
									Formatos permitidos: PDF. Tamaño máximo: 10MB
								</p>
							</div>
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
						disabled={!titulo.trim() || (!initialData && !file)}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed'>
						{initialData ? 'Actualizar' : 'Crear'} Control Interno
					</button>
				</div>
			</div>
		</div>
	);
}
