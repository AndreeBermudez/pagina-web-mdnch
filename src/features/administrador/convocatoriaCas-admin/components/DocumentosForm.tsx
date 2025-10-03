import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, FileText, Link as LinkIcon, Presentation, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import { configurarDocumentosConvocatoria } from '../services/configurarDocumentosConvocatoria';
import { obtenerDocumentosConvocatoria } from '../services/obtenerDocumentosConvocatoria';
import { Button } from '../../../../core/components/ui/Button';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { ConfigurarForm } from './ConfigurarForm';
import ConfirmModal from './ConfirmModal';
import type { DocumentoTipo } from '../types/documento.types';

interface DocumentoItem {
  id: string;
  tipo: 'documento' | 'enlace' | 'comunicado' | 'evaluacion';
  titulo: string;
  descripcion: string;
  habilitado: boolean;
  url?: string | null;
  archivo?: File | null;
  archivoNombre?: string;
}


interface DocumentoGrupo {
  id: string;
  titulo: string;
  icono: 'documento' | 'enlace' | 'comunicado' | 'evaluacion';
  items: DocumentoItem[];
}

interface DocumentosFormProps {
  convocatoriaId: number;
  codigoConvocatoria: string;
  nombreConvocatoria: string;
  area: string;
  handleClose: () => void;
}

const iconMap = {
  documento: FileText,
  enlace: LinkIcon,
  comunicado: AlertTriangle,
  evaluacion: Presentation,
} as const;

const initialDocumentos: DocumentoGrupo[] = [
  {
    id: 'documentos-enlaces',
    titulo: 'Documentos y Enlaces',
    icono: 'documento',
    items: [
      {
        id: 'bases',
        tipo: 'documento',
        titulo: 'Bases',
        descripcion: 'Documento PDF',
        habilitado: false,
        url: null,
      },
      {
        id: 'anexos',
        tipo: 'documento',
        titulo: 'Anexos',
        descripcion: 'Documento PDF',
        habilitado: false,
        url: null,
      },
      {
        id: 'postulacion',
        tipo: 'enlace',
        titulo: 'Postulación',
        descripcion: 'Enlace externo',
        habilitado: false,
        url: null,
      },
    ],
  },
  {
    id: 'comunicados',
    titulo: 'Comunicados',
    icono: 'comunicado',
    items: [
      {
        id: 'comunicado-1',
        tipo: 'comunicado',
        titulo: 'Comunicado 1',
        descripcion: 'Documento PDF',
        habilitado: false,
      },
      {
        id: 'comunicado-2',
        tipo: 'comunicado',
        titulo: 'Comunicado 2',
        descripcion: 'Documento PDF',
        habilitado: false,
      },
    ],
  },
  {
    id: 'evaluacion',
    titulo: 'Proceso de Evaluacion',
    icono: 'evaluacion',
    items: [
      {
        id: 'evaluacion-curricular',
        tipo: 'evaluacion',
        titulo: 'Evaluación Curricular',
        descripcion: 'Documento PDF',
        habilitado: false,
      },
      {
        id: 'absolucion-reclamos',
        tipo: 'evaluacion',
        titulo: 'Absolución de Reclamos',
        descripcion: 'Documento PDF',
        habilitado: false,
      },
      {
        id: 'entrevista',
        tipo: 'evaluacion',
        titulo: 'Evaluación de Entrevista',
        descripcion: 'Documento PDF',
        habilitado: false,
      },
      {
        id: 'resultados-finales',
        tipo: 'evaluacion',
        titulo: 'Resultados Finales',
        descripcion: 'Documento PDF',
        habilitado: false,
      },
    ],
  },
];

type DocumentoPayloadItem = {
  tipo: DocumentoTipo;
  habilitado: boolean;
  url: string | null;
};

export const mapTipoDocumento = (tipo: DocumentoItem['tipo'], itemId: string): DocumentoTipo => {
  switch (tipo) {
    case 'documento':
      if (itemId === 'bases') return 'BASES';
      if (itemId === 'anexos') return 'ANEXOS';
      throw new Error('Tipo de documento desconocido para item ' + itemId);
    case 'enlace':
      if (itemId === 'postulacion') return 'POSTULACION';
      throw new Error('Tipo de enlace desconocido para item ' + itemId);
    case 'comunicado':
      if (itemId === 'comunicado-1') return 'COMUNICADO1';
      if (itemId === 'comunicado-2') return 'COMUNICADO2';
      throw new Error('Comunicado desconocido para item ' + itemId);
    case 'evaluacion':
      if (itemId === 'evaluacion-curricular') return 'EVAL_CURRICULAR';
      if (itemId === 'absolucion-reclamos') return 'ABSOLUCION_RECLAMOS';
      if (itemId === 'entrevista') return 'EVAL_ENTREVISTA';
      if (itemId === 'resultados-finales') return 'RESULTADOS_FINALES';
      throw new Error('Etapa de evaluacion desconocida para item ' + itemId);
    default:
      throw new Error('Tipo de item no reconocido: ' + tipo);
  }
};

const buildDocumentosPayload = (gruposFuente: DocumentoGrupo[]): DocumentoPayloadItem[] =>
  gruposFuente.flatMap(grupo =>
    grupo.items.reduce<DocumentoPayloadItem[]>((acc, item) => {
      const tipoDocumento = mapTipoDocumento(item.tipo, item.id);

      acc.push({
        tipo: tipoDocumento,
        habilitado: item.habilitado,
        url: item.url ?? null,
      });

      return acc;
    }, [])
  )

const cloneGruposState = (gruposFuente: DocumentoGrupo[]): DocumentoGrupo[] =>
  gruposFuente.map(grupo => ({
    ...grupo,
    items: grupo.items.map(item => ({ ...item })),
  }));

type RemoteDocumento = {
  tipo: string;
  habilitado: boolean;
  url: string | null;
};


const extractFileNameFromUrl = (url: string): string => {
  try {
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    // Remover timestamp si existe (formato: timestamp_filename)
    const cleanFileName = fileName.includes('_') ? fileName.split('_').slice(1).join('_') : fileName;
    return decodeURIComponent(cleanFileName);
  } catch {
    return '';
  }
};

const mapRemoteDocumentosToState = (remote: RemoteDocumento[]): DocumentoGrupo[] =>
  initialDocumentos.map(grupo => ({
    ...grupo,
    items: grupo.items.map(item => {
      const docType = mapTipoDocumento(item.tipo, item.id);
      const remoteDoc = remote.find(doc => doc.tipo === docType);
      const remoteUrl = remoteDoc ? remoteDoc.url ?? null : item.url ?? null;
      return {
        ...item,
        habilitado: remoteDoc ? Boolean(remoteDoc.habilitado) : item.habilitado,
        url: remoteUrl,
        archivoNombre: remoteUrl ? extractFileNameFromUrl(remoteUrl) : undefined,
      };
    }),
  }));

const SwitchControl = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => {
  const ToggleIcon = enabled ? ToggleRight : ToggleLeft;
  
  return (
    <button
      type='button'
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1 text-sm font-medium border rounded-full transition-colors ${enabled ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-slate-200 text-slate-500 bg-slate-50'
        }`}
    >
      {enabled ? 'Habilitado' : 'Deshabilitado'}
      <span className='inline-flex items-center justify-center w-10 h-5 rounded-full border border-current bg-white'>
        {ToggleIcon && <ToggleIcon className='w-3 h-3' />}
      </span>
    </button>
  );
};

interface GrupoDocumentosProps {
  grupo: DocumentoGrupo;
  onToggleItem: (id: string) => void;
  onConfigure: (item: DocumentoItem) => void;
}

export const GrupoDocumentos = ({ grupo, onToggleItem, onConfigure }: GrupoDocumentosProps) => {
  
  if (!grupo || !grupo.items) {
    console.error('GrupoDocumentos: grupo inválido', grupo);
    return null;
  }

  const IconoGrupo = iconMap[grupo.icono] || FileText;

  return (
    <section className='p-6 space-y-4 border rounded-2xl border-slate-200 bg-white shadow-sm'>
      <header className='flex items-center gap-3 text-blue-900'>
        {IconoGrupo && <IconoGrupo className='w-6 h-6' />}
        <h3 className='text-lg font-semibold'>{grupo.titulo || 'Sin título'}</h3>
      </header>

      <div className='space-y-3'>
        {grupo.items.map((item) => {
          if (!item || !item.id) {
            console.error('GrupoDocumentos: item inválido', item);
            return null;
          }

          const IconoItem = iconMap[item.tipo] || FileText;
          const isEnabled = item.habilitado;

          return (
            <article key={item.id} className='flex items-center justify-between px-4 py-3 border rounded-xl border-slate-200 bg-slate-50'>
              <div className='flex items-center gap-3'>
                {IconoItem && <IconoItem className={`w-5 h-5 ${isEnabled ? 'text-emerald-600' : 'text-slate-400'}`} />}
                <div>
                  <p className='text-sm font-semibold text-slate-900'>{item.titulo || 'Sin título'}</p>
                  <p className='text-xs text-slate-500'>{item.descripcion || 'Sin descripción'}</p>
                  {item.archivoNombre && (
                    <p className='text-xs text-blue-600 mt-1'>📄 {item.archivoNombre}</p>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <SwitchControl enabled={isEnabled} onToggle={() => onToggleItem(item.id)} />
                <button
                  type='button'
                  onClick={() => onConfigure(item)}
                  className='inline-flex items-center justify-center w-9 h-9 border border-slate-200 rounded-lg bg-white text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors'
                  title='Configurar documento'
                >
                  {Settings && <Settings className='w-4 h-4' />}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export const DocumentosForm = ({ convocatoriaId, codigoConvocatoria, nombreConvocatoria, area, handleClose }: DocumentosFormProps) => {
  const [grupos, setGrupos] = useState(initialDocumentos);
  const [configuracionAbierta, setConfiguracionAbierta] = useState<{ grupoId: string; item: DocumentoItem } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState({ title: '', message: '', type: 'success' as 'success' | 'error' | 'info' });

  useEffect(() => {
    let activo = true;

    const loadDocumentos = async () => {
      try {
        const documentos = await obtenerDocumentosConvocatoria(convocatoriaId);
        if (!activo) {
          return;
        }

        const remoteDocumentos = documentos.map(doc => ({
          tipo: doc.tipo,
          habilitado: Boolean(doc.habilitado),
          url: doc.url ?? null,
        }));

        setGrupos(mapRemoteDocumentosToState(remoteDocumentos));
      } catch (error) {
        console.error('Error al obtener documentos de la convocatoria:', error);
      }
    };

    loadDocumentos();

    return () => {
      activo = false;
    };
  }, [convocatoriaId]);
  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const documentosParaGuardar = buildDocumentosPayload(grupos);

      const response = await configurarDocumentosConvocatoria(convocatoriaId, documentosParaGuardar);

      if (response?.documentos) {
        const remoteDocumentos = response.documentos.map(doc => ({
          tipo: doc.tipo,
          habilitado: Boolean(doc.habilitado),
          url: doc.url ?? null,
        }));
        setGrupos(mapRemoteDocumentosToState(remoteDocumentos));
      }

      setResultMessage({
        title: 'Documentos Actualizados',
        message: 'Los cambios se han guardado correctamente en la base de datos.',
        type: 'success'
      });
      setShowResultModal(true);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      setResultMessage({
        title: 'Error al Guardar',
        message: 'No se pudieron guardar los cambios. Por favor, inténtalo de nuevo.',
        type: 'error'
      });
      setShowResultModal(true);
    } finally {
      setIsSaving(false);
    }
  };
  const handleToggle = async (grupoId: string, itemId: string) => {
    const grupo = grupos.find(g => g.id === grupoId);
    const itemActual = grupo?.items.find(i => i.id === itemId);

    if (!itemActual) {
      return;
    }

    const previousState = cloneGruposState(grupos);

    const updatedGrupos = grupos.map(grupoItem =>
      grupoItem.id === grupoId
        ? {
          ...grupoItem,
          items: grupoItem.items.map(item =>
            item.id === itemId ? { ...item, habilitado: !item.habilitado } : item
          ),
        }
        : grupoItem,
    );

    setGrupos(updatedGrupos);

    try {
      const payload = buildDocumentosPayload(updatedGrupos);

      if (!payload.length) {
        console.warn('No hay documentos compatibles para actualizar.');
        setGrupos(previousState);
        return;
      }

      const response = await configurarDocumentosConvocatoria(convocatoriaId, payload);

      if (response?.documentos) {
        const remoteDocumentos = response.documentos.map(doc => ({
          tipo: doc.tipo,
          habilitado: Boolean(doc.habilitado),
          url: doc.url ?? null,
        }));
        setGrupos(mapRemoteDocumentosToState(remoteDocumentos));
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      setGrupos(previousState);
    }
  };
  const handleConfigure = (grupoId: string, item: DocumentoItem) => {
    setConfiguracionAbierta({ grupoId, item });
  };

  const handleSaveConfig = (updatedItem: any) => {
    if (!configuracionAbierta) return;

    const itemToSave: DocumentoItem = {
      id: updatedItem.id,
      tipo: configuracionAbierta.item.tipo, 
      titulo: updatedItem.titulo,
      descripcion: updatedItem.descripcion,
      habilitado: updatedItem.habilitado,
      url: updatedItem.url,
      archivo: updatedItem.archivo ?? null,
      archivoNombre: updatedItem.archivoNombre,
    };

    setGrupos((current) =>
      current.map((grupo) =>
        grupo.id === configuracionAbierta.grupoId
          ? {
            ...grupo,
            items: grupo.items.map((item) => (item.id === itemToSave.id ? itemToSave : item)),
          }
          : grupo
      )
    );
    setConfiguracionAbierta(null);
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
    if (resultMessage.type === 'success') {
      handleClose();
    }
  };

  const gruposOrdenados = useMemo(() => grupos, [grupos]);

  return (
    <div className='flex flex-col h-[calc(95vh-theme(spacing.28))]'>
      <div className='flex-1 overflow-y-auto'>
        <div className='p-6 space-y-6'>
          <header className='space-y-2'>
            <div className='flex items-center gap-3'>
              <span className='inline-flex items-center justify-center h-8 px-4 text-sm font-semibold tracking-wide text-blue-700 uppercase bg-blue-100 rounded-full whitespace-nowrap shadow-sm'>
                {codigoConvocatoria}
              </span>
              <div>
                <h2 className='text-xl font-bold text-slate-900'>{nombreConvocatoria}</h2>
                <p className='text-sm text-slate-500 uppercase'>{area}</p>
              </div>
            </div>
            <h3 className='pt-4 text-2xl font-bold text-blue-900'>Panel de Administracion</h3>
          </header>

          <div className='space-y-4'>
            {gruposOrdenados.map((grupo) => (
              <GrupoDocumentos
                key={grupo.id}
                grupo={grupo}
                onToggleItem={(itemId) => handleToggle(grupo.id, itemId)}
                onConfigure={(item) => handleConfigure(grupo.id, item)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='sticky bottom-0 flex justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
        <Button variant='outline' onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant='primary' onClick={handleSaveAll} disabled={isSaving}>
          Guardar Cambios
        </Button>
      </div>

      {configuracionAbierta && (
        <Modal
          isOpen
          onClose={() => setConfiguracionAbierta(null)}
          title={`Configurar: ${configuracionAbierta.item.titulo}`}
          size='lg'
        >
          <ConfigurarForm
            item={{
              ...configuracionAbierta.item,
              tipo: mapTipoDocumento(configuracionAbierta.item.tipo, configuracionAbierta.item.id), // Convertir para ConfigurarForm
              categoria: configuracionAbierta.item.tipo, // Usar el tipo del item ('enlace', 'documento', etc.)
              orden: grupos
                .find(g => g.id === configuracionAbierta.grupoId)
                ?.items.findIndex(i => i.id === configuracionAbierta.item.id) ?? 0,
              url: configuracionAbierta.item.url ?? null,
            }}
            convocatoriaId={convocatoriaId}
            onClose={() => setConfiguracionAbierta(null)}
            onSave={handleSaveConfig}
          />
        </Modal>
      )}

      <ConfirmModal
        isOpen={showResultModal}
        onClose={handleResultModalClose}
        onConfirm={handleResultModalClose}
        title={resultMessage.title}
        message={resultMessage.message}
        confirmText="Aceptar"
        cancelText=""
        type={resultMessage.type}
      />
    </div>
  );
};



