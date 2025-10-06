import { Building, FileText, MinusCircleIcon, PlusCircleIcon, Users, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useConvocatoriasPublicas } from '../../../../../hooks/useConvocatoriasPublicas';
import type { ConvocatoriaPublica } from '../../../../../services/convocatoria/obtenerConvocatoriasPublicas';
import { ExpandedRowConvocatoria } from './ExpandedRowConvocatoria';

export const TableConvocatoria = () => {
	const [expandedRows, setExpandedRows] = useState<string[]>([]);
	const { data: convocatorias, isLoading, error } = useConvocatoriasPublicas();
	const year = new Date().getFullYear();

	const toggleRow = (codigo: string) => {
		setExpandedRows((prev) =>
			prev.includes(codigo) ? prev.filter((rowCode) => rowCode !== codigo) : [...prev, codigo]
		);
	};

	// Loading state
	if (isLoading) {
		return (
			<div className='bg-white shadow-sm rounded-lg border border-gray-200'>
				<div className='px-6 py-4 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900'>Convocatorias CAS {year}</h3>
					<p className='text-sm text-gray-500 mt-1'>Cargando convocatorias...</p>
				</div>
				<div className='flex items-center justify-center py-12'>
					<Loader2 className='w-8 h-8 animate-spin text-blue-600' />
					<span className='ml-3 text-gray-600'>Cargando convocatorias...</span>
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className='bg-white shadow-sm rounded-lg border border-gray-200'>
				<div className='px-6 py-4 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900'>Convocatorias CAS 2025</h3>
					<p className='text-sm text-red-500 mt-1'>Error al cargar convocatorias</p>
				</div>
				<div className='flex items-center justify-center py-12'>
					<AlertCircle className='w-8 h-8 text-red-500' />
					<span className='ml-3 text-gray-600'>No se pudieron cargar las convocatorias</span>
				</div>
			</div>
		);
	}

	// No data state
	if (!convocatorias || convocatorias.length === 0) {
		return (
			<div className='bg-white shadow-sm rounded-lg border border-gray-200'>
				<div className='px-6 py-4 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900'>Convocatorias CAS 2025</h3>
					<p className='text-sm text-gray-500 mt-1'>No hay convocatorias disponibles</p>
				</div>
				<div className='flex items-center justify-center py-12'>
					<FileText className='w-8 h-8 text-gray-400' />
					<span className='ml-3 text-gray-600'>No hay convocatorias publicadas</span>
				</div>
			</div>
		);
	}

	// Filter only active convocatorias
	const convocatoriasActivas = convocatorias.filter((conv: ConvocatoriaPublica) => conv.estado);

	return (
		<div className='bg-white shadow-sm rounded-lg border border-gray-200'>
			<div className='px-6 py-4 border-b border-gray-200'>
				<h3 className='text-lg font-semibold text-gray-900'>Convocatorias CAS 2025</h3>
				<p className='text-sm text-gray-500 mt-1'>{convocatoriasActivas.length} Convocatorias</p>
			</div>

			<div className='overflow-x-auto rounded-2xl'>
				<table className='min-w-full'>
					<thead className='bg-gray-50 border-b border-gray-200'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Código
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Convocatoria
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Área
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Vacantes
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Acción
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
					{convocatoriasActivas.map((convocatoria: ConvocatoriaPublica, index: number) => {
						const { codigo, convocatoria: puesto, area, vacantes } = convocatoria;
						const isExpanded = expandedRows.includes(codigo);							return (
								<>
									<tr
										key={codigo}
										className={`transition-all duration-200 ${
											isExpanded
												? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
												: `hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-25' : 'bg-white'}`
										}`}>
										<td
											className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
												isExpanded ? 'text-blue-900' : 'text-gray-900'
											}`}>
											<div className='flex items-center gap-2'>
												<span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold'>
													{codigo}
												</span>
											</div>
										</td>
										<td
											className={`px-6 py-4 text-sm ${
												isExpanded ? 'text-blue-900 font-medium' : 'text-gray-900'
											}`}>
											<div className='flex items-start gap-2'>
												<FileText className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
												<span className='line-clamp-2'>{puesto}</span>
											</div>
										</td>
										<td className='px-6 py-4 text-sm text-gray-600'>
											<div className='flex items-start gap-2'>
												<Building className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
												<span className='line-clamp-2'>{area}</span>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
											<div className='flex items-center gap-2'>
												<Users className='w-4 h-4 text-gray-400' />
												<span className='font-semibold'>{vacantes}</span>
												<span className='text-gray-500 text-xs'>{vacantes === 1 ? 'vacante' : 'vacantes'}</span>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm'>
											<button
												onClick={() => toggleRow(codigo)}
												className={`font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-1 rounded-lg ${
													isExpanded
														? 'text-blue-700 bg-blue-100 hover:bg-blue-200'
														: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
												}`}>
												{isExpanded ? <MinusCircleIcon size={18} /> : <PlusCircleIcon size={18} />}
												{isExpanded ? 'Contraer' : 'Ver documentos'}
											</button>
										</td>
									</tr>

									{/* Filas expandidas */}
									{isExpanded && <ExpandedRowConvocatoria convocatoria={convocatoria} />}
								</>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
