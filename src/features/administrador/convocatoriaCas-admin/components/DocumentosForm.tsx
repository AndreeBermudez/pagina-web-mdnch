import { useMemo, useState } from 'react';
import { AlertTriangle, FileText, Link as LinkIcon, Presentation, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../../../../core/components/ui/Button';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { ConfigurarForm } from './ConfigurarForm';

interface DocumentoItem {
  id: string;
  tipo: 'documento' | 'enlace' | 'comunicado' | 'evaluacion';
  titulo: string;
  descripcion: string;
  habilitado: boolean;
  url?: string;
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
        habilitado: true,
        url: 'https://ejemplo.com/bases.pdf',
      },
      {
        id: 'anexos',
        tipo: 'documento',
        titulo: 'Anexos',
        descripcion: 'Documento PDF',
        habilitado: false,
        url: 'https://ejemplo.com/anexos.pdf',
      },
      {
        id: 'postulacion',
        tipo: 'enlace',
        titulo: 'Postulacion',
        descripcion: 'Enlace externo',
        habilitado: true,
        url: 'https://ejemplo.com/postulacion',
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
        habilitado: true,
      },
      {
        id: 'comunicado-2',
        tipo: 'comunicado',
        titulo: 'Comunicado 2',
        descripcion: 'Documento PDF',
        habilitado: true,
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
        habilitado: true,
      },
      {
        id: 'absolucion-reclamos',
        tipo: 'evaluacion',
        titulo: 'Absolucion de Reclamos',
        descripcion: 'Disponible',
        habilitado: true,
      },
      {
        id: 'entrevista',
        tipo: 'evaluacion',
        titulo: 'Evaluacion de Entrevista',
        descripcion: 'Disponible',
        habilitado: true,
      },
      {
        id: 'resultados-finales',
        tipo: 'evaluacion',
        titulo: 'Resultados Finales',
        descripcion: 'Disponible',
        habilitado: true,
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

export const DocumentosForm = ({ codigoConvocatoria, nombreConvocatoria, area, handleClose }: DocumentosFormProps) => {
  const [grupos, setGrupos] = useState(initialDocumentos);
  const [configuracionAbierta, setConfiguracionAbierta] = useState<{ grupoId: string; item: DocumentoItem } | null>(null);

  const handleToggle = (grupoId: string, itemId: string) => {
    setGrupos((current) =>
      current.map((grupo) =>
        grupo.id === grupoId
          ? {
              ...grupo,
              items: grupo.items.map((item) =>
                item.id === itemId ? { ...item, habilitado: !item.habilitado } : item
              ),
            }
          : grupo
      )
    );
  };

  const handleConfigure = (grupoId: string, item: DocumentoItem) => {
    setConfiguracionAbierta({ grupoId, item });
  };

  const handleSaveConfig = (updatedItem: DocumentoItem) => {
    if (!configuracionAbierta) return;

    setGrupos((current) =>
      current.map((grupo) =>
        grupo.id === configuracionAbierta.grupoId
          ? {
              ...grupo,
              items: grupo.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
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
        <Button>
          Guardar cambios
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
            item={configuracionAbierta.item}
            onClose={() => setConfiguracionAbierta(null)}
            onSave={handleSaveConfig}
          />
        </Modal>
      )}
    </div>
  );
};





