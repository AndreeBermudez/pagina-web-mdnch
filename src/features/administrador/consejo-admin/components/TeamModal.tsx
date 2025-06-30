import { Plus } from 'lucide-react';
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
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50'>
			<div className='w-full max-w-lg bg-white rounded-lg shadow-lg'>
				<div className='flex items-center justify-between px-6 py-4 border-b'>
					<h3 className='text-xl font-semibold'>Equipo de Miembros</h3>
					<button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
						×
					</button>
				</div>
				<div className='p-6 space-y-4'>
					<div className='flex items-center justify-between'>
						<p className='text-gray-600'>Miembros: {members.length}</p>
						<button
							onClick={handleAddMember}
							disabled={members.length >= 2}
							className={`flex items-center border px-2 py-1 rounded ${
								members.length >= 2 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-gray-100'
							}`}>
							<Plus className='w-4 h-4 mr-1 text-green-600' /> Agregar Miembro
						</button>
					</div>
					<div className='space-y-3 overflow-y-auto max-h-72'>
						{/* Miembros existentes */}
						{members.map((member, index) => (
							<div key={member.equipoId || index} className='p-4 border rounded-lg bg-gray-50'>
								<div className='flex justify-between mb-2'>
									<strong>Miembro {index + 1}</strong>
									<div className='flex gap-2'>
										{editingMemberIndex === index ? (
											<>
												<button
													onClick={async () => {
														const id = members[editingMemberIndex!].equipoId;
														console.log('ID que se está enviando:', id); // 👈 Agrega aquí

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
													className='px-2 py-1 text-green-600 border rounded hover:bg-green-50'>
													Guardar Cambios
												</button>

												<button
													onClick={() => setEditingMemberIndex(null)}
													className='px-2 py-1 text-gray-600 border rounded hover:bg-gray-100'>
													Cancelar
												</button>
											</>
										) : (
											<>
												<button
													onClick={() => {
														setEditingMemberIndex(index);
														setEditedMember({ ...member });
													}}
													className='px-2 py-1 text-blue-600 border rounded hover:bg-blue-50'>
													Editar
												</button>
												<button
													onClick={() => handleDeleteMember(member.equipoId)}
													className='px-2 py-1 text-red-600 border rounded hover:bg-red-50'>
													Eliminar
												</button>
											</>
										)}
									</div>
								</div>
								<div className='grid grid-cols-2 gap-3'>
									{editingMemberIndex === index ? (
										<>
											<input
												className='p-2 border rounded'
												value={editedMember.nombre}
												onChange={(e) => setEditedMember({ ...editedMember, nombre: e.target.value })}
											/>
											<input
												className='p-2 border rounded'
												value={editedMember.apellido}
												onChange={(e) => setEditedMember({ ...editedMember, apellido: e.target.value })}
											/>
										</>
									) : (
										<>
											<p>{member.nombre}</p>
											<p>{member.apellido}</p>
										</>
									)}
								</div>
							</div>
						))}

						{/* Nuevo miembro */}
						{isAddingNew && (
							<div className='p-4 border rounded-lg bg-gray-50'>
								<div className='flex justify-between mb-2'>
									<strong>Nuevo Miembro</strong>
									<div className='flex gap-2'>
										<button
											onClick={handleSaveNewMember}
											className='px-2 py-1 text-green-600 border rounded hover:bg-green-50'>
											Guardar
										</button>
										<button onClick={handleCancelNewMember} className='px-2 py-1 border rounded'>
											Cancelar
										</button>
									</div>
								</div>
								<div className='grid grid-cols-2 gap-3'>
									<div className='flex flex-col'>
										<label className='text-xs text-gray-600'>Nombre</label>
										<input
											type='text'
											className='p-2 border rounded'
											value={newMember.nombre}
											onChange={(e) => setNewMember({ ...newMember, nombre: e.target.value })}
										/>
									</div>
									<div className='flex flex-col'>
										<label className='text-xs text-gray-600'>Apellido</label>
										<input
											type='text'
											className='p-2 border rounded'
											value={newMember.apellido}
											onChange={(e) => setNewMember({ ...newMember, apellido: e.target.value })}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className='flex justify-end px-6 py-4 space-x-2 border-t'>
					<button
						onClick={() => onSave && onSave(members)}
						className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700'>
						Guardar Equipo
					</button>
					<button onClick={onClose} className='px-4 py-2 border rounded'>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	);
}
