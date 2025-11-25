import type { DocumentoUI } from '../types/documento.types';

interface ValidationError {
  field: string;
  message: string;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; 
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export const validateDocumento = (documento: DocumentoUI): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!documento.titulo) {
    errors.push({
      field: 'titulo',
      message: 'El título es requerido'
    });
  }

  if (documento.habilitado && documento.categoria !== 'enlace') {
    if (!documento.url && !documento.archivo) {
      errors.push({
        field: 'archivo',
        message: 'Debe subir un archivo cuando el documento está habilitado'
      });
    }
  }

  return errors;
};

export const validateFile = (file: File): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (file.size > MAX_FILE_SIZE) {
    errors.push({
      field: 'archivo',
      message: 'El archivo no debe superar los 10MB'
    });
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    errors.push({
      field: 'archivo',
      message: 'Solo se permiten archivos PDF o DOC/DOCX'
    });
  }

  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
    errors.push({
      field: 'archivo',
      message: 'Solo se permiten archivos PDF o DOC/DOCX'
    });
  }

  return errors;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
