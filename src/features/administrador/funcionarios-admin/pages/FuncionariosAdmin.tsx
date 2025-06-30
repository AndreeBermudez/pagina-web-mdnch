import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Users } from 'lucide-react';
import FuncionarioModal from '../components/FuncionarioModal';
import ConfirmModal from '../components/ConfirmModal';
import { getFuncionarios, deleteFuncionario, type Funcionario } from '../../../../core/services/funcionarios';

export default function FuncionariosAdmin() {
	const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [funcionarioToDelete, setFuncionarioToDelete] = useState<number | null>(null);

	const loadFuncionarios = async () => {
		const data = await getFuncionarios();
		setFuncionarios(data);
	};

	useEffect(() => {
		loadFuncionarios();
	}, []);

	// Filtrar funcionarios por término de búsqueda
	const filteredFuncionarios = funcionarios.filter(
		(funcionario) =>
			funcionario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
			funcionario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
			funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
			funcionario.contacto.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDeleteClick = (id: number) => {
		setFuncionarioToDelete(id);
		setIsDeleteModalOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (funcionarioToDelete === null) return;

		const ok = await deleteFuncionario(funcionarioToDelete);
		if (ok) {
			setFuncionarios((prev) => prev.filter((f) => f.funcionarioId !== funcionarioToDelete));
		} else {
			window.alert('No se pudo eliminar, revisa la consola.');
		}
		setFuncionarioToDelete(null);
		setIsDeleteModalOpen(false);
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
								<h1 className='text-2xl font-bold text-slate-900'>Gestión de Funcionarios</h1>
								<p className='mt-1 text-slate-600'>Administra la información de los funcionarios municipales</p>
							</div>
						</div>
						<button
							className='flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700'
							onClick={() => setIsAddModalOpen(true)}>
							<Plus className='w-4 h-4' />
							<span>Nuevo funcionario</span>
						</button>
					</div>
				</div>

				<div className='p-6'>
					<div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
						<div className='flex-1 max-w-md'>
							<div className='relative'>
								<Search className='absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
								<input
									placeholder='Buscar por nombre, apellido, cargo...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
								/>
							</div>
						</div>
						<div className='flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200'>
							<span className='font-medium text-slate-700'>{filteredFuncionarios.length}</span>
							<span className='ml-1 text-slate-500'>funcionarios</span>
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
									Funcionario
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Cargo
								</th>
								<th className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
									Contacto
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
							{filteredFuncionarios.length === 0 && (
								<tr>
									<td colSpan={6} className='py-16 text-center'>
										<div className='flex flex-col items-center space-y-3'>
											<div className='p-3 rounded-full bg-slate-100'>
												<Search className='w-6 h-6 text-slate-400' />
											</div>
											<div>
												<p className='font-medium text-slate-700'>No se encontraron funcionarios</p>
												<p className='mt-1 text-sm text-slate-500'>Intenta con otros términos de búsqueda</p>
											</div>
										</div>
									</td>
								</tr>
							)}
							{filteredFuncionarios.map((f) => (
								<tr key={f.funcionarioId} className='transition-colors hover:bg-slate-50'>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm font-medium text-slate-900'>{f.fechaCreacion}</div>
									</td>
									<td className='px-6 py-4'>
										<div className='flex items-center space-x-3'>
											<div className='flex-shrink-0'>
												{f.direccionImagen ? (
													<img
														src={f.direccionImagen}
														alt={`${f.nombre} ${f.apellido}`}
														className='object-cover w-10 h-10 rounded-full'
													/>
												) : (
													<div className='flex items-center justify-center w-10 h-10 text-sm font-medium text-slate-600 bg-slate-200 rounded-full'>
														{f.nombre.charAt(0)}
														{f.apellido.charAt(0)}
													</div>
												)}
											</div>
											<div>
												<p className='text-sm font-medium text-slate-900'>
													{f.nombre} {f.apellido}
												</p>
											</div>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200'>
											{f.cargo}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-slate-600'>{f.contacto}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='w-12 h-12 overflow-hidden rounded-lg bg-slate-100'>
											{f.direccionImagen ? (
												<img
													src={f.direccionImagen}
													alt={`${f.nombre} ${f.apellido}`}
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
												title='Ver funcionario'>
												<Eye className='w-4 h-4' />
											</button>
											<button
												className='p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
												onClick={() => {
													setSelectedFuncionario(f);
													setIsEditModalOpen(true);
												}}
												title='Editar funcionario'>
												<Edit className='w-4 h-4' />
											</button>
											<button
												className='p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50'
												onClick={() => handleDeleteClick(f.funcionarioId)}
												title='Eliminar funcionario'>
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
			<FuncionarioModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				modalType='add'
				onSuccess={() => {
					setIsAddModalOpen(false);
					loadFuncionarios();
				}}
			/>

			<FuncionarioModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				modalType='edit'
				initialData={selectedFuncionario}
				initialPreviewImage={selectedFuncionario?.direccionImagen ?? null}
				onSuccess={() => {
					setIsEditModalOpen(false);
					loadFuncionarios();
				}}
			/>

			<ConfirmModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDeleteConfirm}
				title='Eliminar Funcionario'
				message='¿Estás seguro de que deseas eliminar este funcionario? Esta acción no se puede deshacer.'
				confirmText='Eliminar'
				cancelText='Cancelar'
			/>
		</div>
	);
}
