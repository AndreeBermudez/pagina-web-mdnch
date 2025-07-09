import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { crearAgenda } from '../../../../core/services/agenda/crearAgenda';
import { editarAgenda } from '../../../../core/services/agenda/editarAgenda';

interface AgendaModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
	initialData?: any | null;
}

export default function ModalAgregar({ isOpen, onClose, onSuccess, initialData }: AgendaModalProps) {
	const [titulo, setTitulo] = useState('');
	const [direccion, setDireccion] = useState('');
	const [categoria, setCategoria] = useState('');
	const [fecha, setFecha] = useState('');
	const [horaInicio, setHoraInicio] = useState('');
	const [horaFin, setHoraFin] = useState('');


	const resetForm = () => {
		setTitulo('');
		setDireccion('');
		setCategoria('');
		setFecha('');
		setHoraInicio('');
		setHoraFin('');
	
	};

	useEffect(() => {
		if (initialData) {
			setTitulo(initialData.titulo);
			setDireccion(initialData.direccion);
			setCategoria(initialData.categoria);
			setFecha(initialData.fecha);
			setHoraInicio(initialData.horaInicio);
			setHoraFin(initialData.horaFin);
		
		} else {
			resetForm();
		}
	}, [initialData]);

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();

	const payload = {
		titulo,
		fecha,
		horaInicio,
		horaFin,
		direccion,
		categoria,
	};

	let success = false;

	if (initialData) {
		// es edición
		success = await editarAgenda(initialData.agendaId, payload);
	} else {
		// es creación
		success = await crearAgenda(payload);
	}

	if (success) {
		resetForm();
		onSuccess();
		onClose();
	} else {
		console.error('Fallo al crear o editar agenda');
	}
};


	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>
						{initialData ? 'Editar Fecha Agenda' : 'Nueva Fecha Agenda'}
					</h3>
					<button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100'>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				{/* Content */}
				<div className='flex-1 p-6 overflow-y-auto'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block mb-2 text-sm font-medium'>Título</label>
								<input 
								value={titulo} 
								onChange={(e) => setTitulo(e.target.value)} 
								 placeholder='Ingrese el titulo'
								required
								className='w-full px-3 py-2 border rounded-lg' />
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium'>Dirección</label>
								<input 
								value={direccion}
								 onChange={(e) => setDireccion(e.target.value)} 
								 required
								 placeholder='Ingrese la dirección'
								className='w-full px-3 py-2 border rounded-lg' />
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium'>Categoría</label>
								<input 
								value={categoria} 
								onChange={(e) => setCategoria(e.target.value)}
								 placeholder='Ingrese la categoria'
								required 
								className='w-full px-3 py-2 border rounded-lg' />
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium'>Fecha</label>
								<input type='date' value={fecha} onChange={(e) => setFecha(e.target.value)} required className='w-full px-3 py-2 border rounded-lg' />
							</div>
							
							<div>
								<label className='block mb-2 text-sm font-medium'>Hora Inicio</label>
								<input type='time' value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required className='w-full px-3 py-2 border rounded-lg' />
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium'>Hora Fin</label>
								<input type='time' value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required className='w-full px-3 py-2 border rounded-lg' />
							</div>
						</div>

					</form>
				</div>

				{/* Footer */}
				<div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
					<button type='button' onClick={onClose} className='px-4 py-2 bg-white border rounded-lg text-slate-700 hover:bg-slate-50'>
						Cancelar
					</button>
					<button onClick={handleSubmit} className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
						{initialData ? 'Actualizar' : 'Crear'}
					</button>
				</div>
			</div>
		</div>
	);
}
