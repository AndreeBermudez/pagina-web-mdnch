import { useForm } from 'react-hook-form';
import { FormInput, FormLabel } from '../../../../core/components/common/form';
import { useConvocatoriaMutations } from '../hooks/useConvocatoriaMutations';
import type { ConvocatoriaPayload } from '../services/types';

interface ConvocatoriaFormValues {
  codigo: string;
  convocatoria: string;
  area: string;
  vacantes: number;
}

interface ConvocatoriaFormProps {
  handleModal: () => void;
  convocatoriaEditable?: {
    id: number;
    codigo: string;
    convocatoria: string;
    area: string;
    vacantes: number;
  } | null;
}

export const ConvocatoriaForm = ({ handleModal, convocatoriaEditable }: ConvocatoriaFormProps) => {
  const isEditing = Boolean(convocatoriaEditable);

  const { crearConvocatoria, actualizarConvocatoria } = useConvocatoriaMutations();

  const { register, handleSubmit, reset } = useForm<ConvocatoriaFormValues>({
    defaultValues: {
      codigo: convocatoriaEditable?.codigo ?? '',
      convocatoria: convocatoriaEditable?.convocatoria ?? '',
      area: convocatoriaEditable?.area ?? '',
      vacantes: convocatoriaEditable?.vacantes ?? 1,
    },
  });

  const onSubmit = async (data: ConvocatoriaFormValues) => {
    try {
      if (isEditing && convocatoriaEditable) {
        await actualizarConvocatoria.mutateAsync({
          id: convocatoriaEditable.id,
          data: {
            codigo: data.codigo,
            convocatoria: data.convocatoria,
            area: data.area,
            vacantes: data.vacantes
          }
        });
      } else {
        await crearConvocatoria.mutateAsync(data as ConvocatoriaPayload);
        reset();
      }
      handleModal();
    } catch (error) {
      console.error('Error al guardar la convocatoria:', error);
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
                  placeholder='Ej: CAS-001-2025'
                />
              </div>
              <div>
                <FormLabel label='Convocatoria' required />
                <FormInput
                  {...register('convocatoria', { required: true })}
                  placeholder='Nombre de la convocatoria'
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
              {isEditing ? 'Actualizar' : 'Crear'} convocatoria
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
