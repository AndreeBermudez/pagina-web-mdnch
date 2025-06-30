import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import FuncionarioModal from '../components/FuncionarioModal';
import ConfirmModal from '../components/ConfirmModal';
import { getFuncionarios, deleteFuncionario, type Funcionario } from '../../../../core/services/funcionarios';


export default function FuncionariosAdmin() {
	const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
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
		<div className='flex h-full bg-gray-50'>
			<div className='flex flex-col flex-1'>
				<main>
					<div className='bg-white border border-gray-300 rounded-lg shadow-sm'>
						<div className='p-3 border-b'>
							<div className='flex items-center justify-between'>
								<h2 className='text-lg font-medium'>Lista de Funcionarios</h2>
								<button
									onClick={() => setIsAddModalOpen(true)}
									className='inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700'>
									<Plus className='w-3.5 h-3.5 mr-1.5' />
									Agregar Funcionario
								</button>
							</div>
							<div className='flex items-center gap-3 mt-3'>
								<div className='relative flex-1 max-w-sm'>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5' />
									<input
										placeholder='Buscar funcionarios...'
										className='flex h-8 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
								<span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800'>
									{funcionarios.length} funcionarios encontrados
								</span>
							</div>
						</div>

						<div>
							<div
								className='overflow-x-auto overflow-y-auto'
								style={{ maxHeight: '420px', border: '1px solid #f3f4f6' }}>
								<table className='min-w-full divide-y divide-gray-200 table-fixed'>
									<thead className='bg-gray-50'>
										<tr>
											<th>Fecha</th>
											<th>Nombre</th>
											<th>Apellido</th>
											<th>Cargo</th>
											<th>Contacto</th>
											<th>Imagen</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody className='bg-white divide-y divide-gray-200'>
										{funcionarios.map((f) => (
											<tr key={f.funcionarioId}>
												<td className='px-4 py-2 whitespace-nowrap'>
													<div className='text-sm'>{f.fechaCreacion}</div>
												</td>
												<td className='px-4 py-2 whitespace-nowrap'>
													<div className='text-sm'>{f.nombre}</div>
												</td>
												<td className='px-4 py-2 whitespace-nowrap'>
													<div className='text-sm'>{f.apellido}</div>
												</td>
												<td className='px-4 py-2 whitespace-nowrap'>
													<div className='text-sm'>{f.cargo}</div>
												</td>
												<td className='px-4 py-2 whitespace-nowrap'>
													<div className='text-sm'>{f.contacto}</div>
												</td>
												<td className='px-4 py-2 whitespace-nowrap'>
													<div className='flex items-center justify-center'>
														{f.direccionImagen ? (
															<img
																src={f.direccionImagen}
																alt={`${f.nombre} ${f.apellido}`}
																className='object-cover w-10 h-10'
															/>
														) : (
															<div className='flex items-center justify-center w-10 h-10 text-xs text-gray-600 bg-gray-200'>
																NA
															</div>
														)}
													</div>
												</td>
												<td className='px-4 py-2 text-sm font-medium text-right whitespace-nowrap'>
													<div className='flex items-center justify-end gap-2'>
														<button
															onClick={() => {
																setSelectedFuncionario(f);
																setIsEditModalOpen(true);
															}}
															className='inline-flex items-center justify-center p-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
															<Edit className='w-3.5 h-3.5' />
														</button>
														<button
															onClick={() => handleDeleteClick(f.funcionarioId)}
															className='inline-flex items-center justify-center p-1 text-sm text-gray-700 bg-red-500 border border-gray-300 rounded-md cursor-pointer hover:bg-red-300'>
															<Trash2 className='w-3.5 h-3.5 text-white' />
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>

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
				</main>
			</div>
		</div>
	);
}
