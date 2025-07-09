import { useEffect } from "react";
import { Edit, Plus, Search, Trash2, Eye, FileText } from "lucide-react";
import { useState } from "react";
import ModalAgregar from "../components/ModalAgregar";
import { obtenerAgendas } from "../../../../core/services/agenda/obtenerAgenda";
import type { AgendaPayload } from "../../../../core/services/agenda/agenda.interface";
import { eliminarAgenda } from "../../../../core/services/agenda/eliminarAgenda";
import ConfirmModal from "../components/ConfirmModal";

export default function AgendaAdmin() {
	const [agendaAEliminar, setAgendaAEliminar] = useState<AgendaPayload | null>(null);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [agendaEnEdicion, setAgendaEnEdicion] = useState<AgendaPayload | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [agendas, setAgendas] = useState<AgendaPayload[]>([]);
	const filteredData = agendas.filter(item =>
		item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
	);
	useEffect(() => {

		fetchAgendas();
	}, []);

	const fetchAgendas = async () => {
		setLoading(true);
		const data = await obtenerAgendas();
		setAgendas(data);
		setLoading(false);
	};


	// Abrir modal
	const handleAdd = () => {
		setIsModalOpen(true);
	};

	
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="bg-white border shadow-sm rounded-xl border-slate-200">
				<div className="p-6 border-b border-slate-200">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="p-2 rounded-lg bg-blue-50">
								<FileText className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-slate-900">Gestión de Agenda</h1>
								<p className="mt-1 text-slate-600">Administra los elementos del sistema municipal</p>
							</div>
						</div>
						<button
							className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
							onClick={handleAdd}
						>
							<Plus className="w-4 h-4" />
							<span>Nuevo elemento</span>
						</button>
					</div>
				</div>

				<div className="p-6">
					<div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
						<div className="flex-1 max-w-md">
							<div className="relative">
								<Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
								<input
									placeholder="Buscar por título, categoría..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								/>
							</div>
						</div>
						<div className="flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200">
							<span className="font-medium text-slate-700">{filteredData.length}</span>
							<span className="ml-1 text-slate-500">elementos</span>
						</div>
					</div>
				</div>
			</div>

			{/* Tabla */}
			<div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="border-b bg-slate-50 border-slate-200">
							<tr>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Fecha</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Titulo</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Dirección</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Categoría</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Fecha</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Hora Inicio</th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Hora Fin </th>
								<th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Acciones</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-200">
							{!loading &&
								!error &&
								filteredData.map((item) => (
									<tr key={item.agendaId} className="transition-colors hover:bg-slate-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-slate-900">
												{item.fechaCreacion}
											</div>
										</td>
										<td className="px-6 py-4">
											<p className="text-sm font-medium text-slate-900 line-clamp-2">{item.titulo}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap"><h1>{item.direccion}</h1></td>
										<td className="px-6 py-4">
											<p className="text-sm font-medium text-slate-900 line-clamp-2">{item.categoria}</p>
										</td>
										<td className="px-6 py-4 text-sm text-slate-600">{item.fecha}</td>
										<td className="px-6 py-4 text-sm text-slate-500">{item.horaInicio}</td>
										<td className="px-6 py-4 text-sm text-slate-500">{item.horaFin}</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center space-x-1">
												<button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Ver">
													<Eye className="w-4 h-4" />
												</button>
												<button
													className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
													title="Editar"
													onClick={() => {
														setAgendaEnEdicion(item);
														setIsModalOpen(true);
													}}
												>
													<Edit className="w-4 h-4" />
												</button>

												<button
													className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
													title="Eliminar"
													onClick={() => {
														setAgendaAEliminar(item);
														setIsConfirmModalOpen(true);
													}}
												>
													<Trash2 className="w-4 h-4" />
												</button>

											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal para agregar nuevo elemento */}
			<ModalAgregar
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setAgendaEnEdicion(null); // limpiamos para la próxima vez
				}}
				onSuccess={fetchAgendas}
				initialData={agendaEnEdicion}
			/>

			<ConfirmModal
				isOpen={isConfirmModalOpen}
				onClose={() => {
					setIsConfirmModalOpen(false);
					setAgendaAEliminar(null);
				}}
				onConfirm={async () => {
					if (agendaAEliminar?.agendaId) {
						const success = await eliminarAgenda(agendaAEliminar.agendaId);
						if (success) {
							await fetchAgendas(); // recargar la lista
						}
					}
				}}
				title="¿Eliminar elemento?"
				message={`¿Estás seguro de que deseas eliminar "${agendaAEliminar?.titulo}"? Esta acción no se puede deshacer.`}
				confirmText="Eliminar"
			/>

		</div>
	);
}
