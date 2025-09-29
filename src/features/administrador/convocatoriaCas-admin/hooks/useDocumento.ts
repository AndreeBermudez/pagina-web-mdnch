import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { DocumentoUI } from '../types/documento.types';
import { configurarDocumentosConvocatoria } from '../services/configurarDocumentosConvocatoria';
import { mapUIToTipo } from '../types/documento.types';

interface UseDocumentoReturn {
  archivo: File | null;
  archivoNombre: string;
  errors: { archivo?: string };
  setArchivo: (file: File | null) => void;
  handleArchivoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  guardarDocumento: (documento: DocumentoUI, convocatoriaId: number | string) => Promise<void>;
}

export const useDocumento = (documento: DocumentoUI): UseDocumentoReturn => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [archivoNombre, setArchivoNombre] = useState(documento.archivoNombre ?? documento.url ?? '');
  const [errors, setErrors] = useState<{ archivo?: string }>({});

  const queryClient = useQueryClient();

  const validateArchivo = (file: File): string | undefined => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      return 'Solo se permiten archivos PDF o DOC/DOCX';
    }

    if (file.size > 10 * 1024 * 1024) {
      return 'El archivo no debe superar los 10MB';
    }

    return undefined;
  };

  const handleArchivoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    
    if (!file) {
      setArchivo(null);
      setErrors({});
      return;
    }

    const error = validateArchivo(file);
    if (error) {
      setErrors({ archivo: error });
      return;
    }

    setArchivo(file);
    setArchivoNombre(file.name);
    setErrors({});
  };

  const guardarDocumento = async (documento: DocumentoUI, convocatoriaId: number | string) => {
    const idNumerico = typeof convocatoriaId === 'string' ? parseInt(convocatoriaId, 10) : convocatoriaId;
    
    if (isNaN(idNumerico)) {
      throw new Error('ID de convocatoria inválido');
    }

    if (archivo) {
      const formData = new FormData();
      formData.append('file', archivo);
      
      // Configurar el documento
      await configurarDocumentosConvocatoria(idNumerico, [{
        tipo: mapUIToTipo(documento.titulo),
        titulo: documento.titulo,
        descripcion: documento.descripcion,
        habilitado: documento.habilitado,
        orden: documento.orden
      }]);

      // Invalidar queries para refrescar datos
      queryClient.invalidateQueries({ queryKey: ['convocatorias', convocatoriaId] });
    }
  };

  return {
    archivo,
    archivoNombre,
    errors,
    setArchivo,
    handleArchivoChange,
    guardarDocumento
  };
};