import { useForm } from 'react-hook-form';
import { FormInput, FormLabel } from '../../../../core/components/common/form';
import { useNombramientoMutations } from '../hooks/useNombramientoMutations';
import type { NombramientoPayload } from '../services/types';

interface NombramientoFormValues {
  codigo: string;
  nombramiento: string;
  area: string;
  vacantes: number;
}

interface NombramientoFormProps {
  handleModal: () => void;
  nombramientoEditable?: {
    id: number;
    codigo: string;
    nombramiento: string;
    area: string;
    vacantes: number;
  } | null;
}

export const NombramientoForm = ({ handleModal, nombramientoEditable }: NombramientoFormProps) => {
  const isEditing = Boolean(nombramientoEditable);

  const { crearNombramiento, actualizarNombramiento } = useNombramientoMutations();

  const { register, handleSubmit, reset } = useForm<NombramientoFormValues>({
    defaultValues: {
      codigo: nombramientoEditable?.codigo ?? '',
      nombramiento: nombramientoEditable?.nombramiento ?? '',
      area: nombramientoEditable?.area ?? '',
      vacantes: nombramientoEditable?.vacantes ?? 1,
    },
  });

  const onSubmit = async (data: NombramientoFormValues) => {
    try {
      if (isEditing && nombramientoEditable) {
        await actualizarNombramiento.mutateAsync({
          id: nombramientoEditable.id,
          data: {
            codigo: data.codigo,
            nombramiento: data.nombramiento,
            area: data.area,
            vacantes: data.vacantes
          }
        });
      } else {
        await crearNombramiento.mutateAsync(data as NombramientoPayload);
        reset();
      }
      handleModal();
    } catch (error) {
      console.error('Error al guardar el nombramiento:', error);
    }
  };

  return (
    <div className='flex flex-col h-[calc(95vh-theme(spacing.28))]'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full'>
        <div className='flex-1 overflow-y-auto'>
          <div className='p-6 space-y-6'>
            <div className='space-y-4'>
              <div>
                <FormLabel label='Código' required />
                <FormInput
                  {...register('codigo', { required: true })}
                  placeholder='Ej: NOM-001-2025'
                />
              </div>
              <div>
                <FormLabel label='Nombramiento' required />
                <FormInput
                  {...register('nombramiento', { required: true })}
                  placeholder='Nombre del nombramiento'
                />
              </div>
              <div>
                <FormLabel label='Área' required />
                <FormInput {...register('area', { required: true })} placeholder='Área responsable' />
              </div>
              <div>
                <FormLabel label='N° de vacantes' required />
                <FormInput
                  type='number'
                  min={1}
                  {...register('vacantes', { valueAsNumber: true, min: 1 })}
                  placeholder='Número de vacantes'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 p-6 border-t rounded-b-xl bg-slate-50 border-slate-200'>
          <div className='flex justify-end space-x-3 text-sm'>
            <button
              type='button'
              onClick={handleModal}
              className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800'
            >
              {isEditing ? 'Actualizar' : 'Crear'} nombramiento
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
