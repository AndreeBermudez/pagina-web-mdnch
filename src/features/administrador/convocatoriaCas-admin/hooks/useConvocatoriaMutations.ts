import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearConvocatoria } from '../services/crearConvocatoria';
import { actualizarConvocatoria } from '../services/actualizarConvocatoria';
import { configurarDocumentosConvocatoria } from '../services/configurarDocumentosConvocatoria';
import { eliminarConvocatoria } from '../services/eliminarConvocatoria';
import type {
  ConvocatoriaDocumentosConfigPayload,
  ConvocatoriaId,
  ConvocatoriaPayload,
  ConvocatoriaUpdatePayload,
} from '../services/types';

type ConfigurarDocumentosInput = ConvocatoriaDocumentosConfigPayload | FormData;

enum QueryKeys {
  LIST = 'convocatorias',
  DETAIL = 'convocatoria',
}

export const useConvocatoriaMutations = () => {
  const queryClient = useQueryClient();

  const refreshList = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST] });
  };

  const refreshDetail = (id?: ConvocatoriaId) => {
    if (id) {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL, id] });
    }
  };

  const createMutation = useMutation({
    mutationFn: (data: ConvocatoriaPayload) => crearConvocatoria(data),
    onSuccess: () => {
      refreshList();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: ConvocatoriaId; data: ConvocatoriaUpdatePayload }) =>
      actualizarConvocatoria(id, data),
    onSuccess: (_response, variables) => {
      refreshList();
      refreshDetail(variables?.id);
    },
  });

  const configurarDocumentosMutation = useMutation({
    mutationFn: ({ id, data }: { id: ConvocatoriaId; data: ConfigurarDocumentosInput }) =>
      configurarDocumentosConvocatoria(id, data),
    onSuccess: (_response, variables) => {
      refreshList();
      refreshDetail(variables?.id);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: ConvocatoriaId) => eliminarConvocatoria(id),
    onSuccess: (_result, id) => {
      refreshList();
      if (id) {
        queryClient.removeQueries({ queryKey: [QueryKeys.DETAIL, id], exact: true });
      }
    },
  });

  return {
    crearConvocatoria: createMutation,
    actualizarConvocatoria: updateMutation,
    configurarDocumentos: configurarDocumentosMutation,
    eliminarConvocatoria: deleteMutation,
  };
};
