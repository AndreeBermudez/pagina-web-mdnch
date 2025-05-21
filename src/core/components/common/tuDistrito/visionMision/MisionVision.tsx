import { Target, Eye } from 'lucide-react';

export default function MisionVision() {
	return (
		<div className='bg-white'>
			<div className='max-w-7xl mx-auto'>
				{/* Contenedor de tarjetas */}
				<div className='grid md:grid-cols-2 gap-10 pb-20'>
					{/* Tarjeta de Misión */}
					<div className='bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100'>
						<div className='flex items-center mb-6'>
							<div className='bg-yellow-100 p-3 rounded-full mr-4'>
								<Target className='h-8 w-8 text-yellow-600' />
							</div>
							<h2 className='text-2xl font-bold text-gray-800'>MISIÓN</h2>
						</div>
						<p className='text-gray-700 leading-relaxed'>
							Somos una entidad pública, encargada de planificar, administrar, promover y conducir al desarrollo
							socio económico del Distrito de Nuevo Chimbote, a fin de contribuir a mejorar los estándares de
							calidad de vida de todos sus habitantes, fortaleciendo lazos de participación ciudadana en búsqueda
							de satisfacer las necesidades colectivas de la población.
						</p>
					</div>

					{/* Tarjeta de Visión */}
					<div className='bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100'>
						<div className='flex items-center mb-6'>
							<div className='bg-blue-100 p-3 rounded-full mr-4'>
								<Eye className='h-8 w-8 text-blue-600' />
							</div>
							<h2 className='text-2xl font-bold text-gray-800'>VISIÓN</h2>
						</div>
						<p className='text-gray-700 leading-relaxed'>
							Ser una entidad líder a la vanguardia de la modernidad y tecnología, trabajando con eficiencia,
							competitividad y transparencia, capaz de construir un mejor futuro del Distrito de Nuevo Chimbote,
							propiciando el desarrollo socio económico integral de la mano con la participación ciudadana.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
