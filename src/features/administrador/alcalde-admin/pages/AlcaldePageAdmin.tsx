import { useEffect, useState } from 'react';
import ModalAgregar from '../components/ModalAgregar';
import { Search, Plus, Edit, Trash2, Eye, User } from 'lucide-react';
import { obtenerAlcaldes, eliminarAlcalde } from '../../../../core/services/alcalde';
import type { Alcalde } from '../../../../core/services/alcalde';
import ConfirmModal from '../components/ConfirmModal';


export default function AlcaldePageAdmin() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [alcaldes, setAlcaldes] = useState<Alcalde[]>([]);
	const [alcaldeEnEdicion, setAlcaldeEnEdicion] = useState<Alcalde | null>(null);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [alcaldeAEliminar, setAlcaldeAEliminar] = useState<Alcalde | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(false);

	// Filtrar alcaldes por término de búsqueda
	const filteredAlcaldes = alcaldes.filter(
		(alcalde) =>
			alcalde.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
			alcalde.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
			alcalde.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
			alcalde.periodo.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const openModal = () => setIsModalOpen(true);

	const openEditarModal = (alcalde: Alcalde) => {
		setAlcaldeEnEdicion(alcalde);
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		setAlcaldeEnEdicion(null);
	};
	const openEliminarModal = (alcalde: Alcalde) => {
		setAlcaldeAEliminar(alcalde);
		setIsConfirmModalOpen(true);
	};
	const cargarAlcaldes = async () => {
		setLoading(true);
		try {
			const data = await obtenerAlcaldes();
			setAlcaldes(data);
		} catch (error) {
			console.error('Error al cargar alcaldes:', error);
		} finally {
			setLoading(false);
		}
	};
	const confirmarEliminacion = async () => {
		if (!alcaldeAEliminar) return;

		const success = await eliminarAlcalde(alcaldeAEliminar.alcaldeId);
		if (success) {
			await cargarAlcaldes();
		} else {
			alert('Error al eliminar el alcalde.');
		}
		setAlcaldeAEliminar(null);
	};
	useEffect(() => {
		cargarAlcaldes();
	}, []);

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
				<div className='p-6 border-b border-slate-200'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 rounded-lg bg-blue-50'>
								<User className='w-6 h-6 text-blue-600' />
							</div>
							<div>
								<h1 className='text-2xl font-bold text-slate-900'>Gestión de Alcalde</h1>
								<p className='mt-1 text-slate-600'>Administra la información del alcalde municipal</p>
							</div>
						</div>
						<button
							className='flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700'
							onClick={openModal}>
							<Plus className='w-4 h-4' />
							<span>Nuevo Alcalde</span>
						</button>
					</div>
				</div>

				<div className='p-6'>
					<div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
						<div className='flex-1 max-w-md'>
							<div className='relative'>
								<Search className='absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
								<input
									placeholder='Buscar por nombre, apellido, período...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
								/>
							</div>
						</div>
						<div className='flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200'>
							<span className='font-medium text-slate-700'>{filteredAlcaldes.length}</span>
							<span className='ml-1 text-slate-500'>alcaldes</span>
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className='overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead className='border-b bg-slate-50 border-slate-200'>
							<tr>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Fecha
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Alcalde
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Período
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Descripción
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Obras
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Presupuesto
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Aprobación
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Imagen
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Acciones
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{loading && (
								<tr>
									<td colSpan={9} className='py-16 text-center'>
										<div className='flex flex-col items-center space-y-3'>
											<div className='w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin'></div>
											<p className='text-slate-600'>Cargando alcaldes...</p>
										</div>
									</td>
								</tr>
							)}
							{!loading && filteredAlcaldes.length === 0 && (
								<tr>
									<td colSpan={9} className='py-16 text-center'>
										<div className='flex flex-col items-center space-y-3'>
											<div className='p-3 rounded-full bg-slate-100'>
												<Search className='w-6 h-6 text-slate-400' />
											</div>
											<div>
												<p className='font-medium text-slate-700'>No se encontraron alcaldes</p>
												<p className='mt-1 text-sm text-slate-500'>Intenta con otros términos de búsqueda</p>
											</div>
										</div>
									</td>
								</tr>
							)}
							{!loading &&
								filteredAlcaldes.map((alcalde) => (
									<tr key={alcalde.alcaldeId} className='transition-colors hover:bg-slate-50'>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm font-medium text-slate-900'>{alcalde.fechaCreacion}</div>
										</td>
										<td className='px-6 py-4'>
											<div className='flex items-center space-x-3'>
												<div>
													<p className='text-sm font-medium text-slate-900'>
														{alcalde.nombre} {alcalde.apellido}
													</p>
												</div>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200'>
												{alcalde.periodo}
											</span>
										</td>
										<td className='px-6 py-4'>
											<div className='max-w-md text-sm text-slate-600 line-clamp-2'>{alcalde.descripcion}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-slate-900'>{alcalde.numeroObras}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-slate-900'>{alcalde.presupuesto}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-slate-900'>{alcalde.aprobacionCiudadana}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='w-12 h-12 overflow-hidden rounded-lg bg-slate-100'>
												{alcalde.direccionImagen ? (
													<img
														src={alcalde.direccionImagen}
														alt={`${alcalde.nombre} ${alcalde.apellido}`}
														className='object-cover w-full h-full'
													/>
												) : (
													<div className='flex items-center justify-center w-full h-full text-xs font-medium text-slate-600'>
														NA
													</div>
												)}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center space-x-1'>
												<button
													className='p-2 transition-colors rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50'
													title='Ver alcalde'>
													<Eye className='w-4 h-4' />
												</button>
												<button
													className='p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
													onClick={() => openEditarModal(alcalde)}
													title='Editar alcalde'>
													<Edit className='w-4 h-4' />
												</button>
												<button
													className='p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50'
													onClick={() => openEliminarModal(alcalde)}
													title='Eliminar alcalde'>
													<Trash2 className='w-4 h-4' />
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modals */}
			<ModalAgregar
				isOpen={isModalOpen}
				onClose={closeModal}
				onSuccess={cargarAlcaldes}
				initialData={alcaldeEnEdicion}
			/>

			<ConfirmModal
				isOpen={isConfirmModalOpen}
				onClose={() => setIsConfirmModalOpen(false)}
				onConfirm={confirmarEliminacion}
				title='Confirmar Eliminación'
				message={`¿Estás seguro de que deseas eliminar al alcalde "${alcaldeAEliminar?.nombre} ${alcaldeAEliminar?.apellido}"?`}
				confirmText='Eliminar'
				cancelText='Cancelar'
			/>
		</div>
	);
}
