import { CardService } from './CardService';
import { useServiciosUsuarioQuery } from '../../../../../../core/hooks/useServiciosUsuarioQuery';

// Configuración de colores y iconos para mantener el diseño
const serviceStyles = [
	{
		icon: 'userCircle' as const,
		color: '#0e7490',
		bgLightColor: '#e0f2fe',
		gradientColor: { from: '#0e7490', to: '#22d3ee' },
		colSpan: 'lg:col-span-2',
	},
	{
		icon: 'bell' as const,
		color: '#1e3a8a',
		bgLightColor: '#dbeafe',
		gradientColor: { from: '#1e3a8a', to: '#3b82f6' },
		colSpan: 'lg:col-span-1',
	},
	{
		icon: 'document' as const,
		color: '#172554',
		bgLightColor: '#dbeafe',
		gradientColor: { from: '#172554', to: '#1e40af' },
		colSpan: 'lg:col-span-1',
	},
	{
		icon: 'building' as const,
		color: '#854d0e',
		bgLightColor: '#fef9c3',
		gradientColor: { from: '#854d0e', to: '#eab308' },
		colSpan: 'lg:col-span-1',
	},
	{
		icon: 'trash' as const,
		color: '#166534',
		bgLightColor: '#dcfce7',
		gradientColor: { from: '#166534', to: '#22c55e' },
		colSpan: 'lg:col-span-1',
	},
];

export const ServiceSection = () => {
	const { data: servicios = [], isLoading, error } = useServiciosUsuarioQuery();
	if (isLoading) {
		return (
			<section className='bg-gray-100'>
				<div className='container-municipalidad'>
					<div className='flex flex-col'>
						<div className='mb-6 text-center'>
							<h1 className='text-2xl font-bold text-center text-blue-900 md:text-3xl'>SERVICIOS MUNICIPALES</h1>
							<div className='w-24 h-1 mx-auto mt-2 bg-blue-500'></div>
						</div>
						<div className='flex justify-center items-center py-20'>
							<div className='text-lg text-gray-600'>Cargando servicios...</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className='bg-gray-100'>
				<div className='container-municipalidad'>
					<div className='flex flex-col'>
						<div className='mb-6 text-center'>
							<h1 className='text-2xl font-bold text-center text-blue-900 md:text-3xl'>SERVICIOS MUNICIPALES</h1>
							<div className='w-24 h-1 mx-auto mt-2 bg-blue-500'></div>
						</div>
						<div className='flex justify-center items-center py-20'>
							<div className='text-lg text-red-600'>Error al cargar los servicios</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	if (servicios.length === 0) {
		return (
			<section className='bg-gray-100'>
				<div className='container-municipalidad'>
					<div className='flex flex-col'>
						<div className='mb-6 text-center'>
							<h1 className='text-2xl font-bold text-center text-blue-900 md:text-3xl'>SERVICIOS MUNICIPALES</h1>
							<div className='w-24 h-1 mx-auto mt-2 bg-blue-500'></div>
						</div>
						<div className='flex justify-center items-center py-20'>
							<div className='text-lg text-gray-600'>No hay servicios disponibles</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='bg-gray-100'>
			<div className='container-municipalidad'>
				<div className='flex flex-col'>
					<div className='mb-6 text-center'>
						<h1 className='text-2xl font-bold text-center text-blue-900 md:text-3xl'>SERVICIOS MUNICIPALES</h1>
						<div className='w-24 h-1 mx-auto mt-2 bg-blue-500'></div>
					</div>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{servicios.map((servicio, index) => {
							// Usar el estilo correspondiente al índice, o el último si hay más servicios que estilos
							const style = serviceStyles[index % serviceStyles.length];
							
							return (
								<div key={servicio.serviciosMuniId} className={style.colSpan}>
									<CardService
										title={servicio.titulo}
										description={servicio.descripcion}
										link={servicio.link}
										icon={style.icon}
										color={style.color}
										bgLightColor={style.bgLightColor}
										gradientColor={style.gradientColor}
										tag='Servicios'
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
