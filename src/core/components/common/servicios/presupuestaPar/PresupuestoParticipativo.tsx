import { FiExternalLink } from 'react-icons/fi';
import { documentos } from './documentosPresupuesto';
import { getColorClasses } from './colorUtils';

const PresupuestoParticipativo = () => {
	return (
		<div>
			{/* Documents Grid */}
			<section className=' px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{documentos.map((documento) => {
							const colorClasses = getColorClasses(documento.color);
							return (
								<div
									key={documento.id}
									className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${colorClasses.border}`}>									<div className='p-6 flex flex-col h-full'>
										{/* Header con badge y fecha */}
										<div className='flex items-start justify-between mb-4'>
											<span
												className={`px-3 py-1 rounded-md text-sm font-medium ${colorClasses.badge}`}>
												{documento.tipo}
											</span>
											<span className='text-sm text-gray-500'>{documento.fecha}</span>
										</div>

										{/* Título del documento */}
										<h3 className='text-lg font-bold text-gray-800 mb-4 leading-tight flex-grow'>
											{documento.nombre}
										</h3>

										{/* Botón de descarga */}
										<a
											href={documento.enlace}
											target='_blank'
											rel='noopener noreferrer'
											className='w-full inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200 mt-auto'>
											<span>Descargar</span>
											<FiExternalLink className='w-4 h-4' />
										</a>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
};

export default PresupuestoParticipativo;
