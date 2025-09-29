import { useMemo, useState } from 'react';
import { AlertTriangle, FileText, Link as LinkIcon, Presentation, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import { configurarDocumentosConvocatoria } from '../services/configurarDocumentosConvocatoria';
import { Button } from '../../../../core/components/ui/Button';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { ConfigurarForm } from './ConfigurarForm';

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
};

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
        titulo: 'Postulacion',
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
        titulo: 'Evaluacion Curricular',
        descripcion: 'Disponible',
        habilitado: false,
      },
      {
        id: 'absolucion-reclamos',
        tipo: 'evaluacion',
        titulo: 'Absolucion de Reclamos',
        descripcion: 'Disponible',
        habilitado: false,
      },
      {
        id: 'entrevista',
        tipo: 'evaluacion',
        titulo: 'Evaluacion de Entrevista',
        descripcion: 'Disponible',
        habilitado: false,
      },
      {
        id: 'resultados-finales',
        tipo: 'evaluacion',
        titulo: 'Resultados Finales',
        descripcion: 'Disponible',
        habilitado: false,
      },
    ],
  },
];

const SwitchControl = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => {
  return (
    <button
      type='button'
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1 text-sm font-medium border rounded-full transition-colors ${
        enabled ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-slate-200 text-slate-500 bg-slate-50'
      }`}
    >
      {enabled ? 'Habilitado' : 'Deshabilitado'}
      <span className='inline-flex items-center justify-center w-10 h-5 rounded-full border border-current bg-white'>
        {enabled ? <ToggleRight className='w-3 h-3' /> : <ToggleLeft className='w-3 h-3' />}
      </span>
    </button>
  );
};

interface GrupoDocumentosProps {
  grupo: DocumentoGrupo;
  onToggleItem: (id: string) => void;
  onConfigure: (item: DocumentoItem) => void;
}

const GrupoDocumentos = ({ grupo, onToggleItem, onConfigure }: GrupoDocumentosProps) => {
  const IconoGrupo = iconMap[grupo.icono];

  return (
    <section className='p-6 space-y-4 border rounded-2xl border-slate-200 bg-white shadow-sm'>
      <header className='flex items-center gap-3 text-blue-900'>
        <IconoGrupo className='w-6 h-6' />
        <h3 className='text-lg font-semibold'>{grupo.titulo}</h3>
      </header>

      <div className='space-y-3'>
        {grupo.items.map((item) => {
          const IconoItem = iconMap[item.tipo];
          const isEnabled = item.habilitado;

          return (
            <article key={item.id} className='flex items-center justify-between px-4 py-3 border rounded-xl border-slate-200 bg-slate-50'>
              <div className='flex items-center gap-3'>
                <IconoItem className={`w-5 h-5 ${isEnabled ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <p className='text-sm font-semibold text-slate-900'>{item.titulo}</p>
                  <p className='text-xs text-slate-500'>{item.descripcion}</p>
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
                  <Settings className='w-4 h-4' />
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

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const documentosParaGuardar = grupos.flatMap(grupo =>
        grupo.items.map(item => ({
          tipo: mapTipoDocumento(item.tipo, item.id),
          habilitado: item.habilitado,
          titulo: item.titulo,
          descripcion: item.descripcion,
          url: item.url || null,
          orden: grupo.items.findIndex(i => i.id === item.id)
        }))
      );

      await configurarDocumentosConvocatoria(convocatoriaId, documentosParaGuardar);
      alert('Cambios guardados correctamente');
      handleClose();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Error al guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const mapTipoDocumento = (tipo: string, itemId: string): "BASES" | "ANEXOS" | "COMUNICADO1" | "COMUNICADO2" | "EVAL_CURRICULAR" | "EVAL_ENTREVISTA" | "ABSOLUCION_RECLAMOS" | "RESULTADOS_FINALES" => {
    switch (tipo) {
      case 'documento':
        if (itemId === 'bases') return 'BASES';
        if (itemId === 'anexos') return 'ANEXOS';
        return 'BASES';
      case 'comunicado':
        if (itemId === 'comunicado-1') return 'COMUNICADO1';
        if (itemId === 'comunicado-2') return 'COMUNICADO2';
        return 'COMUNICADO1';
      case 'evaluacion':
        if (itemId === 'evaluacion-curricular') return 'EVAL_CURRICULAR';
        if (itemId === 'absolucion-reclamos') return 'ABSOLUCION_RECLAMOS';
        if (itemId === 'entrevista') return 'EVAL_ENTREVISTA';
        if (itemId === 'resultados-finales') return 'RESULTADOS_FINALES';
        return 'EVAL_CURRICULAR';
      default:
        return 'BASES';
    }
  };

  const handleToggle = async (grupoId: string, itemId: string) => {
    const grupo = grupos.find(g => g.id === grupoId);
    const item = grupo?.items.find(i => i.id === itemId);
    
    if (!item) return;

    const nuevoEstado = !item.habilitado;

    try {
      // Actualizar en la base de datos
      // El ID ya es un número válido

      const payload = [{
        tipo: mapTipoDocumento(item.tipo, itemId),
        habilitado: nuevoEstado,
        titulo: item.titulo,
        descripcion: item.descripcion,
        url: item.url || null,
        orden: grupo?.items.findIndex(i => i.id === itemId) ?? 0
      }];

      console.log('Enviando al backend:', {
        convocatoriaId,
        payload
      });

      await configurarDocumentosConvocatoria(
        convocatoriaId,
        payload
      );

      // Actualizar estado local
      setGrupos(current =>
        current.map(grupo =>
          grupo.id === grupoId
            ? {
                ...grupo,
                items: grupo.items.map(item =>
                  item.id === itemId ? { ...item, habilitado: nuevoEstado } : item
                ),
              }
            : grupo
        )
      );
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const handleConfigure = (grupoId: string, item: DocumentoItem) => {
    setConfiguracionAbierta({ grupoId, item });
  };

  const handleSaveConfig = (updatedItem: any) => {
    if (!configuracionAbierta) return;

    // Ensure updatedItem has all DocumentoItem properties
    const itemToSave: DocumentoItem = {
      id: updatedItem.id,
      tipo: updatedItem.tipo ?? (configuracionAbierta.item.tipo),
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
        <Button variant='primary' onClick={handleSaveAll}>
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
              categoria: grupos.find(g => g.id === configuracionAbierta.grupoId)?.icono ?? 'documento',
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
    </div>
  );
};





