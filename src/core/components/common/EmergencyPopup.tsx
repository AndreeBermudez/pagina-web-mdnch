import { X } from 'lucide-react';
import { usePopupActivo } from '../../hooks/usePopupActivo';

interface EmergencyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyPopup({ isOpen, onClose }: EmergencyPopupProps) {
  const { data: popupActivo, isLoading, error } = usePopupActivo();

  
  if (!isOpen) return null;
 
  if (isLoading) return null;
  
  const imagenPopup = popupActivo?.direccionImagen || "/POPUP-PRUEBA.png";
  const tituloPopup = popupActivo?.titulo || "Popup de Emergencia";
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-transparent">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-700 cursor-pointer" />
        </button>
        
        {/* Imagen del popup */}
        <div className="relative">
          <img 
            src={imagenPopup}
            alt={tituloPopup}
            className="w-full h-auto rounded-sm shadow-2xl"
            onError={(e) => {
              // Si la imagen falla al cargar, ocultar el popup
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              
            }}
          />
        </div>
      </div>
    </div>
  );
}