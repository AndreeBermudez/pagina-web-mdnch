import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface TeamMember {
  id?: number;
  nombre: string;
  apellido: string;
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (members: TeamMember[]) => void;
  initialMembers?: TeamMember[];
}

export default function TeamModal({ isOpen, onClose, onSave, initialMembers = [] }: TeamModalProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMember, setNewMember] = useState<TeamMember>({ nombre: '', apellido: '' });
  
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
      setMembers([...members, { ...newMember, id: Date.now() }]);
      setNewMember({ nombre: '', apellido: '' });
      setIsAddingNew(false);
    }
  };
  
  const handleDeleteMember = (id?: number) => {
    if (id) {
      setMembers(members.filter(member => member.id !== id));
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">Equipo de Miembros</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Miembros: {members.length}</p>
            <button 
              onClick={handleAddMember}
              className="flex items-center border px-2 py-1 rounded hover:bg-gray-100" >
              <Plus className="w-4 h-4 mr-1 text-green-600"/> Agregar Miembro
            </button>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {/* Miembros existentes */}
            {members.map((member, index) => (
              <div key={member.id || index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <strong>Miembro {index + 1}</strong>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-50">Editar</button>
                    <button 
                      onClick={() => handleDeleteMember(member.id)}
                      className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <p>{member.nombre}</p> <p>{member.apellido}</p>
                </div>
              </div>
            ))}
            
            {/* Nuevo miembro */}
            {isAddingNew && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <strong>Nuevo Miembro</strong>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveNewMember} 
                      className="px-2 py-1 border rounded text-green-600 hover:bg-green-50"
                    >
                      Guardar
                    </button>
                    <button 
                      onClick={handleCancelNewMember}
                      className="px-2 py-1 border rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-600">Nombre</label>
                    <input 
                      type="text" 
                      className="border p-2 rounded" 
                      value={newMember.nombre}
                      onChange={(e) => setNewMember({...newMember, nombre: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-600">Apellido</label>
                    <input 
                      type="text" 
                      className="border p-2 rounded" 
                      value={newMember.apellido}
                      onChange={(e) => setNewMember({...newMember, apellido: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end space-x-2 border-t">
          <button 
            onClick={() => onSave && onSave(members)} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar Equipo
          </button>
          <button onClick={onClose} className="px-4 py-2 border rounded">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
