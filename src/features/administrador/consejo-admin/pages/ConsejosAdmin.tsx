import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Users } from 'lucide-react';
import CreateConsejoModal from '../components/CreateConsejoModal';
import TeamModal from '../components/TeamModal';
import {
	getAllConsejos,
	registrarMiembroEquipo,
	getConsejoById,
	eliminarConsejo,
} from '../../../../core/services/consejo';
import type { Consejo } from '../../../../core/services/consejo';
import ConfirmModal from '../../funcionarios-admin/components/ConfirmModal';

export default function ConsejoAd() {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
	const [consejos, setConsejos] = useState<Consejo[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedConsejo, setSelectedConsejo] = useState<Consejo | null>(null);
	const [consejoToDelete, setConsejoToDelete] = useState<Consejo | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	useEffect(() => {
		fetchConsejosLista(); // esta sí trae miembros
	}, []);

	// Filtrar consejos por término de búsqueda
	const filteredConsejos = consejos.filter(
		(consejo) =>
			consejo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
			consejo.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
			consejo.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
			consejo.area.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const fetchConsejos = async () => {
		try {
			const lista = await getAllConsejos();
			setConsejos(lista);
		} catch (error) {
			console.error('Error al obtener lista de consejos:', error);
		}
	};
	const fetchConsejosLista = async () => {
		try {
			const listaBasica = await getAllConsejos();

			const listaConMiembros = await Promise.all(
				listaBasica.map(async (consejo) => {
					const detalle = await getConsejoById(consejo.consejoMuniId!);
					return detalle || consejo;
				})
			);

			setConsejos(listaConMiembros);
		} catch (error) {
			console.error('Error al obtener consejos con miembros:', error);
		}
	};

	const handleDeleteConfirm = async () => {
		if (!consejoToDelete?.consejoMuniId) return;

		const ok = await eliminarConsejo(consejoToDelete.consejoMuniId);
		if (ok) {
			await fetchConsejosLista();
		} else {
			console.error('Error al eliminar el consejo.');
		}
	};
	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
				<div className='p-6 border-b border-slate-200'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 rounded-lg bg-blue-50'>
								<Users className='w-6 h-6 text-blue-600' />
							</div>
							<div>
								<h1 className='text-2xl font-bold text-slate-900'>Gestión de Consejos</h1>
								<p className='mt-1 text-slate-600'>Administra los miembros del consejo municipal y sus equipos</p>
							</div>
						</div>
						<button
							className='flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700'
							onClick={() => setIsCreateModalOpen(true)}>
							<Plus className='w-4 h-4' />
							<span>Nuevo consejo</span>
						</button>
					</div>
				</div>

				<div className='p-6'>
					<div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
						<div className='flex-1 max-w-md'>
							<div className='relative'>
								<Search className='absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
								<input
									placeholder='Buscar por nombre, cargo, área...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
								/>
							</div>
						</div>
						<div className='flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200'>
							<span className='font-medium text-slate-700'>{filteredConsejos.length}</span>
							<span className='ml-1 text-slate-500'>consejos</span>
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
									Consejero
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Cargo
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Área
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
							{filteredConsejos.length === 0 && (
								<tr>
									<td colSpan={6} className='py-16 text-center'>
										<div className='flex flex-col items-center space-y-3'>
											<div className='p-3 rounded-full bg-slate-100'>
												<Search className='w-6 h-6 text-slate-400' />
											</div>
											<div>
												<p className='font-medium text-slate-700'>No se encontraron consejos</p>
												<p className='mt-1 text-sm text-slate-500'>Intenta con otros términos de búsqueda</p>
											</div>
										</div>
									</td>
								</tr>
							)}
							{filteredConsejos.map((c) => (
								<tr key={c.consejoMuniId} className='transition-colors hover:bg-slate-50'>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm font-medium text-slate-900'>{c.fechaCreacion}</div>
									</td>
									<td className='px-6 py-4'>
										<div className='flex items-center space-x-3'>
											<div className='flex-shrink-0'>
												{c.direccionImagen ? (
													<img
														src={c.direccionImagen}
														alt={`${c.nombre} ${c.apellido}`}
														className='object-cover w-10 h-10 rounded-full'
													/>
												) : (
													<div className='flex items-center justify-center w-10 h-10 text-sm font-medium text-slate-600 bg-slate-200 rounded-full'>
														{c.nombre.charAt(0)}
														{c.apellido.charAt(0)}
													</div>
												)}
											</div>
											<div>
												<p className='text-sm font-medium text-slate-900'>
													{c.nombre} {c.apellido}
												</p>
											</div>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200'>
											{c.cargo}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200'>
											{c.area}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='w-12 h-12 overflow-hidden rounded-lg bg-slate-100'>
											{c.direccionImagen ? (
												<img
													src={c.direccionImagen}
													alt={`${c.nombre} ${c.apellido}`}
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
												title='Ver consejo'>
												<Eye className='w-4 h-4' />
											</button>
											<button
												onClick={async () => {
													const consejo = await getConsejoById(c.consejoMuniId!);
													if (consejo) {
														setSelectedConsejo(consejo);
														setIsTeamModalOpen(true);
													}
												}}
												className='flex items-center px-2 py-1 space-x-1 text-xs transition-colors rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100'
												title='Gestionar miembros'>
												<Users className='w-3 h-3' />
												<span>Miembros ({c.equipos?.length || 0})</span>
											</button>
											<button
												className='p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
												title='Editar consejo'>
												<Edit className='w-4 h-4' />
											</button>
											<button
												onClick={() => {
													setConsejoToDelete(c);
													setIsDeleteModalOpen(true);
												}}
												className='p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50'
												title='Eliminar consejo'>
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
			<CreateConsejoModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSave={() => fetchConsejos()}
			/>

			<TeamModal
				isOpen={isTeamModalOpen}
				onClose={() => setIsTeamModalOpen(false)}
				initialMembers={selectedConsejo?.equipos || []}
				onSave={async (members) => {
					if (!selectedConsejo) return;

					const results = await Promise.all(
						members.map((m) =>
							registrarMiembroEquipo(selectedConsejo.consejoMuniId!, {
								nombre: m.nombre,
								apellido: m.apellido,
							})
						)
					);

					const exitosos = results.filter((r) => r).length;
					console.log(`Se registraron ${exitosos} miembros de ${members.length}`);

					await fetchConsejosLista(); // <-- Aquí también
					setIsTeamModalOpen(false);
				}}
			/>

			<ConfirmModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDeleteConfirm}
				title='Eliminar Consejo'
				message='¿Estás seguro de que deseas eliminar este consejo? Esta acción no se puede deshacer.'
				confirmText='Eliminar'
				cancelText='Cancelar'
			/>
		</div>
	);
}
