import { useEffect, useState } from 'react';
import ModalAgregar from './modals/ModalAgregar';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { obtenerAlcaldes, eliminarAlcalde } from '../../../../../services/EndPointAlcaldePage';
import type { Alcalde } from '../../../../../services/EndPointAlcaldePage';
import ConfirmModal from './modals/ConfirmModal';
export default function AlcaldePageAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alcaldes, setAlcaldes] = useState<Alcalde[]>([]);
  const [alcaldeEnEdicion, setAlcaldeEnEdicion] = useState<Alcalde | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [alcaldeAEliminar, setAlcaldeAEliminar] = useState<Alcalde | null>(null);
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
    const data = await obtenerAlcaldes();
    setAlcaldes(data);
  };
  const confirmarEliminacion = async () => {
    if (!alcaldeAEliminar) return;

    const success = await eliminarAlcalde(alcaldeAEliminar.alcaldeId);
    if (success) {
      await cargarAlcaldes();
    } else {
      alert("Error al eliminar el alcalde.");
    }
    setAlcaldeAEliminar(null);
  };
  useEffect(() => {
    cargarAlcaldes();
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-300">
      {/* Cabecera */}
      <div className="border-b p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Alcalde Page</h2>
          <button
            onClick={openModal}
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Agregar Alcalde
          </button>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
            <input
              placeholder="Buscar funcionarios..."
              className="flex h-8 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
            {alcaldes.length} funcionarios encontrados
          </span>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-auto" style={{ maxHeight: '420px', maxWidth: '1220px' }}>
        <table className="w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Fecha</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Nombre</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Apellido</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Descripción</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Obras</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Presupuesto</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Aprobación</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Periodo</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Experiencia</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Reconocimiento</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Compromiso</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Imagen</th>
              <th className="px-4 py-4 text-xs font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alcaldes.map((a) => (
              <tr key={a.alcaldeId} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{a.fechaCreacion}</td>
                <td className="px-4 py-3 text-sm">{a.nombre}</td>
                <td className="px-4 py-3 text-sm">{a.apellido}</td>
                <td className="px-4 py-3 text-sm truncate">{a.descripcion}</td>
                <td className="px-4 py-3 text-sm">{a.numeroObras}</td>
                <td className="px-4 py-3 text-sm">{a.presupuesto}</td>
                <td className="px-4 py-3 text-sm">{a.aprobacionCiudadana}</td>
                <td className="px-4 py-3 text-sm">{a.periodo}</td>

                <td className="px-4 py-3 text-sm truncate">{a.experiencia}</td>
                <td className="px-4 py-3 text-sm truncate">{a.reconocimientos}</td>
                <td className="px-4 py-3 text-sm truncate">{a.compromiso}</td>
                <td className="px-4 py-3 text-sm text-center">
                  <img
                    src={a.direccionImagen || "/placeholder.svg"}
                    alt={a.nombre}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openEditarModal(a)}
                      className="rounded-md border bg-white p-1 hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>

                    <button
                      onClick={() => openEliminarModal(a)}
                      className="rounded-md border bg-red-500 p-1 hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar al alcalde "${alcaldeAEliminar?.nombre} ${alcaldeAEliminar?.apellido}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}
