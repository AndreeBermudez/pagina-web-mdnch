import { CardService } from './CardService';

export const ServiceSection = () => {
	return (
		<section className='bg-gray-100'>
			<div className='container-municipalidad'>
				<div className='flex flex-col'>
					<div className='mb-6 text-center'>
						<h1 className='text-2xl font-bold text-center text-blue-900 md:text-3xl'>SERVICIOS MUNICIPALES</h1>
						<div className='w-24 h-1 mx-auto mt-2 bg-blue-500'></div>
					</div>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{/* Primera fila */}
						<div className='lg:col-span-2'>
							<CardService
								title='DEMUNA'
								description='Defensoría Municipal del Niño y Adolescente. Brindamos protección y promoción de los derechos de niños, niñas y adolescentes en nuestra comunidad.'
								icon='userCircle'
								color='#0e7490'
								bgLightColor='#e0f2fe'
								gradientColor={{ from: '#0e7490', to: '#22d3ee' }}
								tag='Servicios'
							/>
						</div>
						<div className='lg:col-span-1'>
							<CardService
								title='Tributos Municipales'
								description='Paga tus impuestos y arbitrios municipales'
								icon='bell'
								color='#1e3a8a'
								bgLightColor='#dbeafe'
								gradientColor={{ from: '#1e3a8a', to: '#3b82f6' }}
								tag='Servicios'
							/>
						</div>
						{/* Segunda fila */}
						<div className='lg:col-span-1'>
							<CardService
								title='SIGA MEF'
								description='Sistema Integrado de Gestión Administrativa'
								icon='document' // Using 'document' icon from available options
								color='#172554'
								bgLightColor='#dbeafe'
								gradientColor={{ from: '#172554', to: '#1e40af' }}
								tag='Servicios'
							/>
						</div>
						<div className='lg:col-span-1'>
							<CardService
								title='CIAM'
								description='Centro Integral de Atención al Adulto Mayor'
								icon='building'
								color='#854d0e'
								bgLightColor='#fef9c3'
								gradientColor={{ from: '#854d0e', to: '#eab308' }}
								tag='Servicios'
							/>
						</div>
						<div className='lg:col-span-1'>
							<CardService
								title='Limpieza Pública'
								description='Servicios de limpieza y mantenimiento urbano'
								icon='trash'
								color='#166534'
								bgLightColor='#dcfce7'
								gradientColor={{ from: '#166534', to: '#22c55e' }}
								tag='Servicios'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
