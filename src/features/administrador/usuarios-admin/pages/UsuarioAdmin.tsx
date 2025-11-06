import { Plus, Search, AlertCircle, Users, Shield } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useUsuariosQuery } from '../hooks/useUsuariosQuery';
import { CrearUsuarioModal } from '../components/CrearUsuarioModal';

export default function UsuarioAdmin() {
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { usuarios, isLoading, error } = useUsuariosQuery();

	// Filtrar usuarios por término de búsqueda
	const filteredData = useMemo(() => {
		if (!searchTerm.trim()) return usuarios;

		const searchLower = searchTerm.toLowerCase();
		return usuarios.filter(
			(usuario) =>
				usuario.nombres.toLowerCase().includes(searchLower) ||
				usuario.apellidos.toLowerCase().includes(searchLower) ||
				usuario.username.toLowerCase().includes(searchLower) ||
				usuario.rol.toLowerCase().includes(searchLower)
		);
	}, [usuarios, searchTerm]);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);



	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="bg-white border shadow-sm rounded-xl border-slate-200">
				<div className="p-6 border-b border-slate-200">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="p-2 rounded-lg bg-blue-50">
								<Users className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-slate-900">Gestión de Usuarios</h1>
								<p className="mt-1 text-slate-600">
									Administra los usuarios del sistema
								</p>
							</div>
						</div>
						<button
							className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
							onClick={openModal}
						>
							<Plus className="w-4 h-4" />
							<span>Nuevo Usuario</span>
						</button>
					</div>
				</div>

				<div className="p-6">
					<div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
						<div className="flex-1 max-w-md">
							<div className="relative">
								<Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
								<input
									placeholder="Buscar por nombre, usuario, rol..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								/>
							</div>
						</div>
						<div className="flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200">
							<span className="font-medium text-slate-700">{filteredData.length}</span>
							<span className="ml-1 text-slate-500">
								{filteredData.length === 1 ? 'usuario' : 'usuarios'}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="border-b bg-slate-50 border-slate-200">
							<tr>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-center uppercase text-slate-600">
									#
								</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-center uppercase text-slate-600">
									Nombres
								</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-center uppercase text-slate-600">
									Apellidos
								</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-center uppercase text-slate-600">
									Usuario
								</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-center uppercase text-slate-600">
									Rol
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-200">
							{isLoading && (
								<tr>
									<td colSpan={5} className="py-16 text-center">
										<div className="flex flex-col items-center space-y-3">
											<div className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
											<p className="text-slate-600">Cargando usuarios...</p>
										</div>
									</td>
								</tr>
							)}
							{error && (
								<tr>
									<td colSpan={5} className="py-16 text-center">
										<div className="flex flex-col items-center space-y-3">
											<div className="p-3 rounded-full bg-red-50">
												<AlertCircle className="w-6 h-6 text-red-600" />
											</div>
											<div>
												<p className="font-medium text-red-900">
													Error al cargar los usuarios
												</p>
												<p className="mt-1 text-sm text-red-600">
													No se pudieron obtener los usuarios del sistema
												</p>
											</div>
										</div>
									</td>
								</tr>
							)}
							{!isLoading && !error && filteredData.length === 0 && (
								<tr>
									<td colSpan={5} className="py-16 text-center">
										<div className="flex flex-col items-center space-y-3">
											<div className="p-3 rounded-full bg-slate-100">
												<Search className="w-6 h-6 text-slate-400" />
											</div>
											<div>
												<p className="font-medium text-slate-700">
													No se encontraron usuarios
												</p>
												<p className="mt-1 text-sm text-slate-500">
													Intenta con otros términos de búsqueda
												</p>
											</div>
										</div>
									</td>
								</tr>
							)}
							{!isLoading &&
								!error &&
								filteredData.map((usuario) => (
									<tr key={usuario.id} className="transition-colors hover:bg-slate-50">
										<td className="px-6 py-4 text-center whitespace-nowrap">
											<span className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
												{usuario.id}
											</span>
										</td>
										<td className="px-6 py-4 text-center">
											<span className="text-sm font-medium text-slate-900">
												{usuario.nombres}
											</span>
										</td>
										<td className="px-6 py-4 text-center">
											<span className="text-sm font-medium text-slate-900">
												{usuario.apellidos}
											</span>
										</td>
										<td className="px-6 py-4 text-center">
											<span className="text-sm text-slate-600">{usuario.username}</span>
										</td>
										<td className="px-6 py-4 text-center whitespace-nowrap">
											<span
												className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
													usuario.rol === 'ADMINISTRADOR'
														? 'bg-purple-100 text-purple-700'
														: usuario.rol === 'IMAGEN'
														? 'bg-blue-100 text-blue-700'
														: 'bg-emerald-100 text-emerald-700'
												}`}
											>
												<Shield className="w-3 h-3 mr-1" />
												{usuario.rol}
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal */}
			<CrearUsuarioModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
}
