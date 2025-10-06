import { FiExternalLink } from 'react-icons/fi';
import { usePresupuestoQuery } from '../../../../../hooks/usePresupuestoQuery';
import { getColorClasses } from './colorUtils';

const getColorByType = (tipo: string): string => {
	const tipoLower = tipo.toLowerCase();
	if (tipoLower.includes('ordenanza')) return 'blue';
	if (tipoLower.includes('reglamento')) return 'green';
	if (tipoLower.includes('decreto')) return 'orange';
	if (tipoLower.includes('convocatoria')) return 'blue';
	if (tipoLower.includes('formulario') || tipoLower.includes('registro')) return 'green';
	if (tipoLower.includes('guía') || tipoLower.includes('criterios')) return 'orange';
	return 'gray';
};

const formatDate = (dateString: string): string => {
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-ES', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	} catch {
		return dateString;
	}
};

const PresupuestoParticipativo = () => {
	const { data: presupuestos = [], isLoading, error } = usePresupuestoQuery();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<div className="text-lg text-gray-600">Cargando documentos...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center py-20">
				<div className="text-lg text-red-600">Error al cargar los documentos</div>
			</div>
		);
	}

	if (presupuestos.length === 0) {
		return (
			<div className="flex justify-center items-center py-20">
				<div className="text-lg text-gray-600">No hay documentos disponibles</div>
			</div>
		);
	}

	return (
		<div>
			{/* Documents Grid */}
			<section className=' px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{presupuestos.map((documento) => {
							const color = getColorByType(documento.tipo);
							const colorClasses = getColorClasses(color);
							return (
								<div
									key={documento.presupuestoId}
									className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${colorClasses.border}`}>
									<div className='p-6 flex flex-col h-full'>
										{/* Header con badge y fecha */}
										<div className='flex items-start justify-between mb-4'>
											<span
												className={`px-3 py-1 rounded-md text-sm font-medium ${colorClasses.badge}`}>
												{documento.tipo}
											</span>
											<span className='text-sm text-gray-500'>
												{formatDate(documento.fechaCreacion)}
											</span>
										</div>

										{/* Título del documento */}
										<h3 className='text-lg font-bold text-gray-800 mb-4 leading-tight flex-grow'>
											{documento.titulo}
										</h3>

										{/* Botón de descarga */}
										<a
											href={`${documento.linkDocumento}`}
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
