import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { Search } from 'lucide-react';
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
	const [filtroAnio, setFiltroAnio] = useState('');

	// Filtrar presupuestos por año
	const presupuestosFiltrados = presupuestos.filter((presupuesto) => {
		if (!filtroAnio) return true;
		const fechaPresupuesto = new Date(presupuesto.fechaCreacion);
		const anioPresupuesto = fechaPresupuesto.getFullYear().toString();
		return anioPresupuesto.includes(filtroAnio);
	});

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
			{/* Filtro por año */}
			<section className='px-4 py-8 '>
				<div className='container mx-auto max-w-6xl'>
					<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
						<div className='flex-1 max-w-md'>
							<label htmlFor='filtro-anio' className='block text-sm font-medium text-gray-700 mb-2'>
								Filtrar por año
							</label>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
								<input
									id='filtro-anio'
									type='text'
									placeholder='Ej: 2024, 2025...'
									value={filtroAnio}
									onChange={(e) => setFiltroAnio(e.target.value)}
									className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
								/>
							</div>
						</div>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<span className='font-medium'>{presupuestosFiltrados.length}</span>
							<span>documento{presupuestosFiltrados.length !== 1 ? 's' : ''} encontrado{presupuestosFiltrados.length !== 1 ? 's' : ''}</span>
						</div>
					</div>
				</div>
			</section>

			{/* Documents Grid */}
			<section className=' px-4'>
				<div className='container mx-auto max-w-6xl'>
					{presupuestosFiltrados.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-20'>
							<div className='text-lg text-gray-600 mb-2'>No se encontraron documentos para el año "{filtroAnio}"</div>
							<button
								onClick={() => setFiltroAnio('')}
								className='text-blue-600 hover:text-blue-700 underline text-sm'>
								Limpiar filtro
							</button>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{presupuestosFiltrados.map((documento) => {
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
					)}
				</div>
			</section>
		</div>
	);
};

export default PresupuestoParticipativo;
