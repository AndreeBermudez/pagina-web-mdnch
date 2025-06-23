import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import FuncionarioModal from './FuncionarioModal';
import ConfirmModal from './ConfirmModal';
import {
  getFuncionarios,
  deleteFuncionario,
} from '../../../../../../core/services/EndPointFuncionario';

interface Funcionario {
  id: number;
  nombre: string;
  apellido: string;
  cargo: string;
  contacto: string;
  direccionImagen?: string;
  fechaCreacion?: string;
}

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
      setFuncionarios((prev) => prev.filter((f) => f.id !== funcionarioToDelete));
    } else {
      window.alert('No se pudo eliminar, revisa la consola.');
    }
    setFuncionarioToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex bg-gray-50 h-full">
      <div className="flex-1 flex flex-col">
        <main>
          <div className="bg-white shadow-sm rounded-lg border border-gray-300">
            <div className="border-b p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Lista de Funcionarios</h2>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Agregar Funcionario
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
                  {funcionarios.length} funcionarios encontrados
                </span>
              </div>
            </div>

            <div>
              <div
                className="overflow-y-auto overflow-x-auto"
                style={{ maxHeight: '420px', border: '1px solid #f3f4f6' }}
              >
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50">
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
                  <tbody className="bg-white divide-y divide-gray-200">
                    {funcionarios.map((f) => (
                      <tr key={f.id}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm">{f.fechaCreacion}</div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm">{f.nombre}</div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm">{f.apellido}</div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm">{f.cargo}</div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm">{f.contacto}</div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            {f.direccionImagen ? (
                              <img
                                src={f.direccionImagen}
                                alt={`${f.nombre} ${f.apellido}`}
                                className="w-10 h-10 object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-gray-600 text-xs">
                                NA
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedFuncionario(f);
                                setIsEditModalOpen(true);
                              }}
                              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-1 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(f.id)}
                              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-red-500 cursor-pointer p-1 text-sm text-gray-700 hover:bg-red-300"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-white" />
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
            modalType="add"
            onSuccess={() => {
              setIsAddModalOpen(false);
              loadFuncionarios();
            }}
          />

          <FuncionarioModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            modalType="edit"
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
            title="Eliminar Funcionario"
            message="¿Estás seguro de que deseas eliminar este funcionario? Esta acción no se puede deshacer."
            confirmText="Eliminar"
            cancelText="Cancelar"
          />
        </main>
      </div>
    </div>
  );
}
