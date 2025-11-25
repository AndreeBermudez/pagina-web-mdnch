import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearNombramiento } from '../services/crearNombramiento';
import { actualizarNombramiento } from '../services/actualizarNombramiento';
import { configurarDocumentosNombramiento } from '../services/configurarDocumentosNombramiento';
import { eliminarNombramiento } from '../services/eliminarNombramiento';
import type {
  NombramientoDocumentosConfigPayload,
  NombramientoId,
  NombramientoPayload,
  NombramientoUpdatePayload,
} from '../services/types';

type ConfigurarDocumentosInput = NombramientoDocumentosConfigPayload | FormData;

enum QueryKeys {
  LIST = 'nombramientos',
  DETAIL = 'nombramiento',
}

export const useNombramientoMutations = () => {
  const queryClient = useQueryClient();

  const refreshList = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST] });
  };

  const refreshDetail = (id?: NombramientoId) => {
    if (id) {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL, id] });
    }
  };

  const createMutation = useMutation({
    mutationFn: (data: NombramientoPayload) => crearNombramiento(data),
    onSuccess: () => {
      refreshList();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: NombramientoId; data: NombramientoUpdatePayload }) =>
      actualizarNombramiento(id, data),
    onSuccess: (_response, variables) => {
      refreshList();
      refreshDetail(variables?.id);
    },
  });

  const configurarDocumentosMutation = useMutation({
    mutationFn: ({ id, data }: { id: NombramientoId; data: ConfigurarDocumentosInput }) =>
      configurarDocumentosNombramiento(id, data),
    onSuccess: (_response, variables) => {
      refreshList();
      refreshDetail(variables?.id);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: NombramientoId) => eliminarNombramiento(id),
    onSuccess: (_result, id) => {
      refreshList();
      if (id) {
        queryClient.removeQueries({ queryKey: [QueryKeys.DETAIL, id], exact: true });
      }
    },
  });

  return {
    crearNombramiento: createMutation,
    actualizarNombramiento: updateMutation,
    configurarDocumentos: configurarDocumentosMutation,
    eliminarNombramiento: deleteMutation,
  };
};
