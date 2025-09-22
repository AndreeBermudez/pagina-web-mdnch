import { useForm } from 'react-hook-form';
import { FormInput, FormLabel } from '../../../../core/components/common/form';

interface ConvocatoriaFormValues {
  convocatoria: string;
  area: string;
  vacantes: number;
}

interface ConvocatoriaFormProps {
  handleModal: () => void;
  convocatoriaEditable?: {
    id: number;
    convocatoria: string;
    area: string;
    vacantes: number;
  } | null;
}

export const ConvocatoriaForm = ({ handleModal, convocatoriaEditable }: ConvocatoriaFormProps) => {
  const isEditing = Boolean(convocatoriaEditable);

  const { register, handleSubmit, reset } = useForm<ConvocatoriaFormValues>({
    defaultValues: {
      convocatoria: convocatoriaEditable?.convocatoria ?? '',
      area: convocatoriaEditable?.area ?? '',
      vacantes: convocatoriaEditable?.vacantes ?? 1,
    },
  });

  const onSubmit = (data: ConvocatoriaFormValues) => {
    console.log(isEditing ? 'Actualizar convocatoria' : 'Crear convocatoria', data);
    if (!isEditing) {
      reset();
    }
    handleModal();
  };

  return (
    <div className='flex flex-col h-[calc(95vh-theme(spacing.28))]'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full'>
        <div className='flex-1 overflow-y-auto'>
          <div className='p-6 space-y-6'>
            <div className='space-y-4'>
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
