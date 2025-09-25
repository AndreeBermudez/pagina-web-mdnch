import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormInput, FormLabel } from '../../../../core/components/common/form';
import { FormSelect } from '../../../../core/components/common/form/FormSelect';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useMenuCreate, useMenuUpdate } from '../hooks/useMenusMutation';
import {
	menuRequestSchema,
	menuUpdateSchema,
	type MenuRequest,
	type MenuResponse,
	type MenuUpdate,
} from '../schemas/menu.schema';
import { usePages } from '../../paginas-admin/hooks/usePagesQuery';
import { useMenusQuery } from '../hooks/useMenusQuery';

type ModalMenuProps = {
	handleModal: () => void;
	isOpen: boolean;
	menuEditable?: MenuResponse | null;
	menuPadre?: MenuResponse | null; // Para crear submenús
};

export const ModalMenu = ({ handleModal, isOpen, menuEditable, menuPadre }: ModalMenuProps) => {
	const isEditing = Boolean(menuEditable);
	const isCreatingSubmenu = Boolean(menuPadre);

	const { register, handleSubmit, reset, watch } = useForm<MenuRequest | MenuUpdate>({
		resolver: zodResolver(isEditing ? menuUpdateSchema : menuRequestSchema),
		defaultValues: {
			nombre: menuEditable?.nombre || '',
			orden: menuEditable?.orden || 1,
			path: menuEditable?.path || '',
			paginaId: menuEditable?.paginaId || null,
			padreId: menuEditable?.padreId || menuPadre?.id || null,
		},
	});

	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { mutate: crearMenu, isPending: isCreating } = useMenuCreate();
	const { mutate: actualizarMenu, isPending: isUpdating } = useMenuUpdate();
	const { data: paginas, isLoading: isLoadingPages, error: errorPages } = usePages();
	const { data: menus } = useMenusQuery();

	const watchPaginaId = watch('paginaId');
	const watchPath = watch('path');
	const watchPadreId = watch('padreId');

	const isSubmitting = isCreating || isUpdating;
	const isSubmenu = isCreatingSubmenu || Boolean(watchPadreId);

	function onSubmit(data: MenuRequest | MenuUpdate) {
		// Procesar datos antes de enviar
		const processedData = {
			...data,
			path: data.path || null,
			paginaId: data.paginaId || null,
			padreId: data.padreId || null,
		};

		if (isEditing && menuEditable) {
			actualizarMenu(
				{ id: menuEditable.id, menu: processedData },
				{
					onSuccess: () => {
						success('Menú actualizado exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar el menú'),
				}
			);
		} else {
			crearMenu(processedData as MenuRequest, {
				onSuccess: () => {
					reset();
					success('Menú creado exitosamente');
					handleModal();
				},
				onError: () => error('Error al crear el menú'),
			});
		}
	}

	if (!isOpen) return null;

	// Obtener menús principales para selector de padre
	const menusPrincipales = menus?.filter((menu) => !menu.padreId) || [];

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-2xl'>
				<div className='flex items-center justify-between px-6 py-4 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>
						{isEditing ? 'Editar Menú' : isCreatingSubmenu ? `Crear Submenú` : 'Crear Menú'}
					</h3>
					<button
						onClick={handleModal}
						className='p-2 transition-colors rounded-lg hover:bg-slate-100'
						disabled={isSubmitting}>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<div className='p-6 space-y-6'>
						{/* Información del contexto */}
						{isCreatingSubmenu && (
							<div className='p-3 bg-blue-50 border border-blue-200 rounded-lg'>
								<p className='text-sm text-blue-700'>
									<strong>Creando submenú de:</strong> {menuPadre?.nombre}
								</p>
							</div>
						)}

						{/* Campos básicos */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<FormLabel label='Nombre' required />
								<FormInput {...register('nombre')} placeholder='Ingrese el nombre del menú' />
							</div>
							<div>
								<FormLabel label='Orden' required />
								<FormInput type='number' {...register('orden')} placeholder='Ingrese el orden del menú' />
							</div>
						</div>

						{/* Selector de menú padre (solo si no estamos creando un submenú específico) */}
						{!isCreatingSubmenu && (
							<div>
								<FormLabel label='Menú Padre' />
								<FormSelect {...register('padreId')}>
									<option value=''>Es un menú principal</option>
									{menusPrincipales.map((menu) => (
										<option key={menu.id} value={menu.id}>
											{menu.nombre}
										</option>
									))}
								</FormSelect>
							</div>
						)}

						{/* Configuración de navegación */}
						<div className='space-y-4'>
							<h4 className='text-sm font-medium text-gray-700'>Configuración de Navegación</h4>

							{isSubmenu ? (
								// Para submenús: REQUIERE página
								<div>
									<FormLabel label='Página' required />
									<FormSelect {...register('paginaId')} disabled={isLoadingPages || !!errorPages}>
										<option value=''>Seleccione una página</option>
										{paginas?.map((pagina) => (
											<option key={pagina.id} value={pagina.id}>
												{pagina.titulo}
											</option>
										))}
									</FormSelect>
									{errorPages && <p className='mt-1 text-sm text-red-600'>Error al cargar páginas</p>}
								</div>
							) : (
								// Para menús principales: página O enlace O ninguno
								<div className='space-y-4'>
									<div>
										<FormLabel label='Página Asignada' />
										<FormSelect {...register('paginaId')} disabled={isLoadingPages || !!errorPages || !!watchPath}>
											<option value=''>Sin página específica</option>
											{paginas?.map((pagina) => (
												<option key={pagina.id} value={pagina.id}>
													{pagina.titulo}
												</option>
											))}
										</FormSelect>
										{errorPages && <p className='mt-1 text-sm text-red-600'>Error al cargar páginas</p>}
									</div>

									<div>
										<FormLabel label='Enlace Personalizado' />
										<FormInput
											{...register('path')}
											placeholder='/mi-enlace-personalizado'
											disabled={!!watchPaginaId}
										/>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className='px-6 py-4 border-t bg-slate-50 rounded-b-xl border-slate-200'>
						<div className='flex justify-end space-x-3 text-sm'>
							<button
								type='button'
								onClick={handleModal}
								disabled={isSubmitting}
								className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50 disabled:opacity-50'>
								Cancelar
							</button>
							<button
								type='submit'
								disabled={isSubmitting}
								className='px-4 py-2 text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800 disabled:opacity-50'>
								{isSubmitting
									? isEditing
										? 'Actualizando...'
										: 'Creando...'
									: isEditing
									? 'Actualizar'
									: 'Crear'}{' '}
								Menú
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
