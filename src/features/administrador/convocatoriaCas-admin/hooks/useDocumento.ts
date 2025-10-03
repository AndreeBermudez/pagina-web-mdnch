import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { configurarDocumentosConvocatoria } from '../services/configurarDocumentosConvocatoria';
import { actualizarConvocatoria } from '../services/actualizarConvocatoria';
import { obtenerDocumentosConvocatoria } from '../services/obtenerDocumentosConvocatoria';
import type { DocumentoTipo, DocumentoUI } from '../types/documento.types';
import { mapUIToTipo } from '../types/documento.types';
import type { ConvocatoriaUpdatePayload } from '../services/types';

interface UseDocumentoReturn {
  archivo: File | null;
  archivoNombre: string;
  errors: { archivo?: string };
  setArchivo: (file: File | null) => void;
  setArchivoNombre: (name: string) => void;
  handleArchivoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  guardarDocumento: (documento: DocumentoUI, convocatoriaId: number | string) => Promise<string | null | void>;
}

const mapTipoToFormField = (tipo: DocumentoTipo): keyof ConvocatoriaUpdatePayload => {
  switch (tipo) {
    case 'BASES': return 'bases';
    case 'ANEXOS': return 'anexos';
    case 'COMUNICADO1': return 'comunicado1';
    case 'COMUNICADO2': return 'comunicado2';
    case 'EVAL_CURRICULAR': return 'evaluacionCurricular';
    case 'EVAL_ENTREVISTA': return 'evaluacionEntrevista';
    case 'ABSOLUCION_RECLAMOS': return 'absolucionReclamos';
    case 'RESULTADOS_FINALES': return 'resultadosFinales';
    case 'POSTULACION': return 'postulacion';
    default: throw new Error(`Tipo de documento no soportado: ${tipo}`);
  }
};

const extractFileNameFromUrl = (url: string): string => {
  try {
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const cleanFileName = fileName.includes('_') ? fileName.split('_').slice(1).join('_') : fileName;
    return decodeURIComponent(cleanFileName);
  } catch {
    return url;
  }
};

export const useDocumento = (documento: DocumentoUI): UseDocumentoReturn => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [archivoNombre, setArchivoNombre] = useState(
    documento.archivoNombre ?? 
    (documento.url ? extractFileNameFromUrl(documento.url) : '')
  );
  const [errors, setErrors] = useState<{ archivo?: string }>({});

  const queryClient = useQueryClient();

  const validateArchivo = (file: File): string | undefined => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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

  const guardarDocumento = async (documentoUI: DocumentoUI, convocatoriaId: number | string) => {
    const idNumerico = typeof convocatoriaId === 'string' ? parseInt(convocatoriaId, 10) : convocatoriaId;

    if (Number.isNaN(idNumerico)) {
      throw new Error('ID de convocatoria invalido');
    }

    const tipoDocumento = mapUIToTipo(documentoUI.titulo);

    if (archivo || (tipoDocumento === 'POSTULACION' && documentoUI.url)) {
      const formField = mapTipoToFormField(tipoDocumento);
      const updatePayload: ConvocatoriaUpdatePayload = {};

      if (tipoDocumento === 'POSTULACION') {
      
        (updatePayload as any)[formField] = documentoUI.url || '';
      } else {
       
        (updatePayload as any)[formField] = archivo;
      }

      const response = await actualizarConvocatoria(idNumerico, updatePayload);
      
      queryClient.invalidateQueries({ queryKey: ['convocatorias', convocatoriaId] });
      
      const documentoActualizado = response.documentos?.find(doc => doc.tipo === tipoDocumento);
  
      if (documentoActualizado?.url && archivo) {
        setArchivoNombre(archivo.name);
      }
      
      return documentoActualizado?.url ?? null;
    }
    
    const documentosActuales = await obtenerDocumentosConvocatoria(idNumerico);

    const payload = documentosActuales.map(doc => ({
      tipo: doc.tipo as DocumentoTipo,
      habilitado: Boolean(doc.habilitado),
      url: doc.url ?? null,
    }));

    const updatedDocumento = {
      tipo: tipoDocumento,
      habilitado: documentoUI.habilitado,
      url: documentoUI.url ?? null,
    };

    const existingIndex = payload.findIndex(doc => doc.tipo === tipoDocumento);
    if (existingIndex >= 0) {
      payload[existingIndex] = updatedDocumento;
    } else {
      payload.push(updatedDocumento);
    }

    const response = await configurarDocumentosConvocatoria(
      idNumerico,
      payload,
    );

    queryClient.invalidateQueries({ queryKey: ['convocatorias', convocatoriaId] });

    const documentoActualizado = response.documentos?.find(doc => doc.tipo === tipoDocumento);
    return documentoActualizado?.url ?? null;
  };

  return {
    archivo,
    archivoNombre,
    errors,
    setArchivo,
    setArchivoNombre,
    handleArchivoChange,
    guardarDocumento,
  };
};

