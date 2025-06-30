import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { FiTrash2 } from 'react-icons/fi';
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
	const [selectedConsejo, setSelectedConsejo] = useState<Consejo | null>(null);
	const [consejoToDelete, setConsejoToDelete] = useState<Consejo | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	useEffect(() => {
		fetchConsejosLista(); // esta sí trae miembros
	}, []);

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
		<div>
			{/* Tabla de Consejos */}
			<div className='bg-white border border-gray-200 rounded-lg shadow-sm'>
				<div className='p-3 border-b'>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-2xl font-medium'>Lista de Consejos</h2>
						<button
							onClick={() => setIsCreateModalOpen(true)}
							className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'>
							<Plus className='w-4 h-4 mr-2' /> Agregar Consejo
						</button>
					</div>
					<div className='flex items-center gap-3 mt-3'>
						<div className='relative flex-1 max-w-sm'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5' />
							<input
								placeholder='Buscar consejos...'
								className='flex h-8 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800'>
							{consejos.length} consejo{consejos.length !== 1 && 's'} encontrado{consejos.length !== 1 && 's'}
						</span>
					</div>
				</div>

				<div className='border border-gray-200 rounded-lg'>
					<table className='w-full'>
						<thead className='bg-gray-50'>
							<tr>
								<th>Fecha</th>
								<th>Nombre</th>
								<th>Apellido</th>
								<th>Cargo</th>
								<th>Area</th>
								<th>Imagen</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{consejos.map((c) => (
								<tr key={c.consejoMuniId} className='border-b hover:bg-gray-50'>
									<td className='px-4 py-2'>{c.fechaCreacion}</td>
									<td className='px-4 py-2 font-medium'>{c.nombre}</td>
									<td className='px-4 py-2'>{c.apellido}</td>
									<td className='px-4 py-2'>{c.cargo}</td>
									<td className='px-4 py-2'>{c.area}</td>
									<td className='px-4 py-2'>
										<div className='flex items-center justify-center'>
											{c.direccionImagen ? (
												<img
													src={c.direccionImagen}
													alt={`${c.nombre} ${c.apellido}`}
													className='object-cover w-10 h-10'
												/>
											) : (
												<div className='flex items-center justify-center w-10 h-10 text-xs text-gray-600 bg-gray-200'>
													NA
												</div>
											)}
										</div>
									</td>
									<td className='px-6 py-4'>
										<div className='flex gap-3'>
												<div className='flex gap-3'>
													{/* Botón Miembros */}
													<button
														onClick={async () => {
															const consejo = await getConsejoById(c.consejoMuniId!);
															if (consejo) {
																setSelectedConsejo(consejo);
																setIsTeamModalOpen(true);
															}
														}}
														className='px-3 py-1.5 hover:bg-blue-50 border border-blue-200 rounded-md text-blue-600 text-sm flex items-center'>
														<span>Miembros {c.equipos?.length || 0}</span>
													</button>
													<button
														onClick={() => {
															setConsejoToDelete(c);
															setIsDeleteModalOpen(true);
														}}
														className='p-1.5 hover:bg-red-50 rounded-md text-red-600'>
														<FiTrash2 className='w-5 h-5' />
													</button>
												</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

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
