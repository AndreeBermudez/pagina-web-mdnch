import { Plus, X, Edit, Trash2, Save, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { editarMiembroEquipo, type Equipo } from '../../../../core/services/consejo';

interface TeamModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave?: (members: Equipo[]) => void;
	initialMembers?: Equipo[];
}

export default function TeamModal({ isOpen, onClose, onSave, initialMembers = [] }: TeamModalProps) {
	const [members, setMembers] = useState<Equipo[]>(initialMembers);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [newMember, setNewMember] = useState<Equipo>({ nombre: '', apellido: '' });
	const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(null);
	const [editedMember, setEditedMember] = useState<Equipo>({ nombre: '', apellido: '' });

	useEffect(() => {
		setMembers(initialMembers);
	}, [initialMembers]);

	if (!isOpen) return null;

	const handleAddMember = () => {
		setIsAddingNew(true);
	};

	const handleCancelNewMember = () => {
		setIsAddingNew(false);
		setNewMember({ nombre: '', apellido: '' });
	};

	const handleSaveNewMember = () => {
		if (newMember.nombre && newMember.apellido) {
			setMembers([...members, { ...newMember, equipoId: Date.now() }]);
			setNewMember({ nombre: '', apellido: '' });
			setIsAddingNew(false);
		}
	};

	const handleDeleteMember = (id?: number) => {
		if (id) {
			setMembers(members.filter((member) => member.equipoId !== id));
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<div className='flex items-center space-x-3'>
						<div className='p-2 rounded-lg bg-blue-50'>
							<UserPlus className='w-5 h-5 text-blue-600' />
						</div>
						<div>
							<h3 className='text-xl font-semibold text-slate-900'>Gestión de Equipo</h3>
							<p className='text-sm text-slate-600'>Administra los miembros del consejo (máximo 2)</p>
						</div>
					</div>
					<button onClick={onClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				{/* Content - Scrollable */}
				<div className='flex-1 p-6 overflow-y-auto'>
					<div className='space-y-6'>
						{/* Header con contador y botón agregar */}
						<div className='flex items-center justify-between p-4 border rounded-lg bg-slate-50 border-slate-200'>
							<div className='flex items-center space-x-2'>
								<span className='text-sm font-medium text-slate-700'>Total de miembros:</span>
								<span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
									{members.length} / 2
								</span>
							</div>
							<button
								onClick={handleAddMember}
								disabled={members.length >= 2}
								className={`flex items-center px-3 py-1.5 space-x-2 text-sm rounded-lg transition-colors ${
									members.length >= 2
										? 'bg-slate-200 text-slate-500 cursor-not-allowed'
										: 'bg-blue-600 text-white hover:bg-blue-700'
								}`}>
								<Plus className='w-4 h-4' />
								<span>Agregar Miembro</span>
							</button>
						</div>

						{/* Lista de miembros */}
						<div className='space-y-4'>
							{members.map((member, index) => (
								<div
									key={member.equipoId || index}
									className='p-4 border rounded-lg bg-white border-slate-200 shadow-sm'>
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center space-x-3'>
											<div className='flex items-center justify-center w-8 h-8 text-sm font-medium text-blue-600 bg-blue-100 rounded-full'>
												{index + 1}
											</div>
											<h4 className='font-medium text-slate-900'>Miembro {index + 1}</h4>
										</div>
										<div className='flex items-center space-x-2'>
											{editingMemberIndex === index ? (
												<>
													<button
														onClick={async () => {
															const id = members[editingMemberIndex!].equipoId;
															console.log('ID que se está enviando:', id);

															if (id) {
																const ok = await editarMiembroEquipo(id, editedMember);
																if (ok) {
																	const updated = [...members];
																	updated[editingMemberIndex!] = { ...editedMember, equipoId: id };
																	setMembers(updated);
																	setEditingMemberIndex(null);
																} else {
																	alert('Error al actualizar miembro');
																}
															} else {
																console.warn('El miembro no tiene ID, no se puede editar.');
															}
														}}
														className='flex items-center px-2 py-1 space-x-1 text-xs text-emerald-600 transition-colors rounded-md bg-emerald-50 hover:bg-emerald-100'>
														<Save className='w-3 h-3' />
														<span>Guardar</span>
													</button>
													<button
														onClick={() => setEditingMemberIndex(null)}
														className='flex items-center px-2 py-1 space-x-1 text-xs transition-colors rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200'>
														<span>Cancelar</span>
													</button>
												</>
											) : (
												<>
													<button
														onClick={() => {
															setEditingMemberIndex(index);
															setEditedMember({ ...member });
														}}
														className='flex items-center px-2 py-1 space-x-1 text-xs text-blue-600 transition-colors rounded-md bg-blue-50 hover:bg-blue-100'>
														<Edit className='w-3 h-3' />
														<span>Editar</span>
													</button>
													<button
														onClick={() => handleDeleteMember(member.equipoId)}
														className='flex items-center px-2 py-1 space-x-1 text-xs text-red-600 transition-colors rounded-md bg-red-50 hover:bg-red-100'>
														<Trash2 className='w-3 h-3' />
														<span>Eliminar</span>
													</button>
												</>
											)}
										</div>
									</div>
									<div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
										{editingMemberIndex === index ? (
											<>
												<div>
													<label className='block mb-1 text-xs font-medium text-slate-700'>Nombre</label>
													<input
														className='w-full px-3 py-2 text-sm border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
														value={editedMember.nombre}
														onChange={(e) => setEditedMember({ ...editedMember, nombre: e.target.value })}
														placeholder='Ingrese el nombre'
													/>
												</div>
												<div>
													<label className='block mb-1 text-xs font-medium text-slate-700'>Apellido</label>
													<input
														className='w-full px-3 py-2 text-sm border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
														value={editedMember.apellido}
														onChange={(e) => setEditedMember({ ...editedMember, apellido: e.target.value })}
														placeholder='Ingrese el apellido'
													/>
												</div>
											</>
										) : (
											<>
												<div>
													<label className='block mb-1 text-xs font-medium text-slate-500'>Nombre</label>
													<p className='text-sm font-medium text-slate-900'>{member.nombre}</p>
												</div>
												<div>
													<label className='block mb-1 text-xs font-medium text-slate-500'>Apellido</label>
													<p className='text-sm font-medium text-slate-900'>{member.apellido}</p>
												</div>
											</>
										)}
									</div>
								</div>
							))}

							{/* Nuevo miembro */}
							{isAddingNew && (
								<div className='p-4 border-2 border-dashed rounded-lg border-blue-300 bg-blue-50'>
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center space-x-3'>
											<div className='flex items-center justify-center w-8 h-8 text-sm font-medium text-blue-600 bg-blue-200 rounded-full'>
												<Plus className='w-4 h-4' />
											</div>
											<h4 className='font-medium text-blue-900'>Nuevo Miembro</h4>
										</div>
										<div className='flex items-center space-x-2'>
											<button
												onClick={handleSaveNewMember}
												className='flex items-center px-2 py-1 space-x-1 text-xs text-emerald-600 transition-colors rounded-md bg-emerald-50 hover:bg-emerald-100'>
												<Save className='w-3 h-3' />
												<span>Guardar</span>
											</button>
											<button
												onClick={handleCancelNewMember}
												className='flex items-center px-2 py-1 space-x-1 text-xs transition-colors rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200'>
												<span>Cancelar</span>
											</button>
										</div>
									</div>
									<div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
										<div>
											<label className='block mb-1 text-xs font-medium text-slate-700'>
												Nombre <span className='text-red-500'>*</span>
											</label>
											<input
												type='text'
												className='w-full px-3 py-2 text-sm border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
												value={newMember.nombre}
												onChange={(e) => setNewMember({ ...newMember, nombre: e.target.value })}
												placeholder='Ingrese el nombre'
											/>
										</div>
										<div>
											<label className='block mb-1 text-xs font-medium text-slate-700'>
												Apellido <span className='text-red-500'>*</span>
											</label>
											<input
												type='text'
												className='w-full px-3 py-2 text-sm border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
												value={newMember.apellido}
												onChange={(e) => setNewMember({ ...newMember, apellido: e.target.value })}
												placeholder='Ingrese el apellido'
											/>
										</div>
									</div>
								</div>
							)}

							{/* Estado vacío */}
							{members.length === 0 && !isAddingNew && (
								<div className='py-12 text-center'>
									<div className='flex flex-col items-center space-y-3'>
										<div className='p-3 rounded-full bg-slate-100'>
											<UserPlus className='w-6 h-6 text-slate-400' />
										</div>
										<div>
											<p className='font-medium text-slate-700'>No hay miembros en el equipo</p>
											<p className='mt-1 text-sm text-slate-500'>Comienza agregando el primer miembro</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Footer - Fixed */}
				<div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
					<button
						onClick={onClose}
						className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
						Cerrar
					</button>
					<button
						onClick={() => onSave && onSave(members)}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'>
						Guardar Equipo
					</button>
				</div>
			</div>
		</div>
	);
}
