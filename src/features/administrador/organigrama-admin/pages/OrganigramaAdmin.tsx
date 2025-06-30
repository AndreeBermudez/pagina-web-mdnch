import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, Layers } from 'lucide-react';
import OrganigramaModal from '../components/OrganigramaModal';
import { listaOrganigramas, eliminarOrganigrama } from '../../../../core/services/organigrama';
import type { Organigrama } from '../../../../core/services/EndPointOrganigrama';
import ConfirmModal from '../components/ConfirmModal';

export default function OrganigramaAdmin() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [organigramas, setOrganigramas] = useState<Organigrama[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [organigramaToDelete, setOrganigramaToDelete] = useState<number | null>(null);
	const [editingOrganigrama, setEditingOrganigrama] = useState<Organigrama | null>(null);

	useEffect(() => {
		fetchOrganigramas();
	}, []);

	// Filtrar organigramas por término de búsqueda (por fecha principalmente)
	const filteredOrganigramas = organigramas.filter((organigrama) =>
		organigrama.fechaCreacion.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const fetchOrganigramas = async () => {
		const res = await listaOrganigramas();
		setOrganigramas(res);
	};

	const handleDelete = async () => {
		if (organigramaToDelete === null) return;

		const ok = await eliminarOrganigrama(organigramaToDelete);
		if (ok) {
			fetchOrganigramas();
		} else {
			alert('Error al eliminar organigrama.');
		}
		setOrganigramaToDelete(null);
	};

	return (
		<>
			<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<div className='flex items-center space-x-3'>
						<div className='p-2 rounded-lg bg-blue-50'>
							<Layers className='w-6 h-6 text-blue-600' />
						</div>
						<div>
							<h1 className='text-xl font-semibold text-slate-900'>Gestión del Organigrama Municipal</h1>
							<p className='text-sm text-slate-600'>Administra los organigramas institucionales</p>
						</div>
					</div>
					<button
						onClick={() => {
							setEditingOrganigrama(null);
							setIsModalOpen(true);
						}}
						className='flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'>
						<Plus className='w-4 h-4' />
						<span>Nuevo Organigrama</span>
					</button>
				</div>

				{/* Search and Filters */}
				<div className='p-6 border-b border-slate-200 bg-slate-50'>
					<div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
						<div className='relative flex-1 max-w-md'>
							<Search className='absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
							<input
								type='text'
								placeholder='Buscar por fecha...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full py-2 pl-10 pr-4 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div className='flex items-center space-x-2'>
							<span className='px-3 py-1 text-sm font-medium bg-white border rounded-full text-slate-700 border-slate-200'>
								{filteredOrganigramas.length} de {organigramas.length} organigramas
							</span>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className='overflow-hidden'>
					{filteredOrganigramas.length === 0 ? (
						<div className='py-12 text-center'>
							<Layers className='w-12 h-12 mx-auto mb-4 text-slate-300' />
							<h3 className='mb-2 text-lg font-medium text-slate-900'>
								{searchTerm ? 'No se encontraron organigramas' : 'No hay organigramas'}
							</h3>
							<p className='mb-4 text-slate-500'>
								{searchTerm
									? 'Intenta con términos de búsqueda diferentes'
									: 'Comienza creando tu primer organigrama institucional'}
							</p>
							{!searchTerm && (
								<button
									onClick={() => {
										setEditingOrganigrama(null);
										setIsModalOpen(true);
									}}
									className='flex items-center px-4 py-2 mx-auto space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'>
									<Plus className='w-4 h-4' />
									<span>Crear Organigrama</span>
								</button>
							)}
						</div>
					) : (
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead>
									<tr className='border-b border-slate-200 bg-slate-50'>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500'>
											Fecha de Creación
										</th>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500'>
											Imagen
										</th>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-500'>
											Acciones
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-slate-200'>
									{filteredOrganigramas.map((organigrama) => (
										<tr key={organigrama.organigramaId} className='transition-colors hover:bg-slate-50'>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm font-medium text-slate-900'>{organigrama.fechaCreacion}</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<img
														src={organigrama.direccionImagen || '/placeholder.svg'}
														alt='Organigrama'
														className='object-cover w-12 h-12 border rounded-lg shadow-sm border-slate-200'
													/>
												</div>
											</td>
											<td className='px-6 py-4 text-center whitespace-nowrap'>
												<div className='flex items-center justify-center space-x-2'>
													<button
														onClick={() => {
															setEditingOrganigrama(organigrama);
															setIsModalOpen(true);
														}}
														className='p-2 transition-colors rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50'
														title='Editar organigrama'>
														<Edit className='w-4 h-4' />
													</button>
													<button
														onClick={() => {
															setOrganigramaToDelete(organigrama.organigramaId);
															setIsConfirmOpen(true);
														}}
														className='p-2 transition-colors rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50'
														title='Eliminar organigrama'>
														<Trash2 className='w-4 h-4' />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
			<OrganigramaModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setEditingOrganigrama(null);
				}}
				onRefresh={fetchOrganigramas}
				initialData={editingOrganigrama}
			/>

			<ConfirmModal
				isOpen={isConfirmOpen}
				onClose={() => {
					setIsConfirmOpen(false);
					setOrganigramaToDelete(null);
				}}
				onConfirm={handleDelete}
				title='Confirmar eliminación'
				message='¿Estás seguro de que deseas eliminar este organigrama?'
			/>
		</>
	);
}
