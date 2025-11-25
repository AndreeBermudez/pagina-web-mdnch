import type { NombramientoPayload } from './types';

export const buildNombramientoFormData = (payload: NombramientoPayload): FormData => {
  const fd = new FormData();

  fd.append('codigo', payload.codigo);
  fd.append('nombramiento', payload.nombramiento);
  fd.append('area', payload.area);
  fd.append('vacantes', String(payload.vacantes));

  if (payload.postulacion) fd.append('postulacion', payload.postulacion);

  if (payload.documentos && payload.documentos.length > 0) {
    payload.documentos.forEach((doc, index) => {
      fd.append(doc.tipo, doc.archivo);
    });
  }

  return fd;
};
