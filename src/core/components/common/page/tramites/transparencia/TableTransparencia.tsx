import { PlusCircleIcon, MinusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { ExpandedRow } from './ExpandedRow';
import { useTransparenciaPublica } from '../../../../../hooks/useTransparenciaPublica';

export const TableTransparencia = () => {
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const { transparencias, isLoading, error } = useTransparenciaPublica();

	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	if (isLoading) {
		return (
			<div className='bg-white shadow-sm rounded-lg border border-gray-200 p-8'>
				<div className='flex justify-center items-center'>
					<p className='text-gray-500'>Cargando información de transparencia...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-white shadow-sm rounded-lg border border-gray-200 p-8'>
				<div className='flex justify-center items-center'>
					<p className='text-red-500'>Error al cargar la información de transparencia</p>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white shadow-sm rounded-lg border border-gray-200'>
			<div className='px-6 py-4 border-b border-gray-200 text-center'>
				<h3 className='text-lg font-semibold text-gray-900'>Transparencia</h3>
				<p className='text-sm text-gray-500 mt-1'>{transparencias.length} Items</p>
			</div>

			<div className='overflow-hidden rounded-2xl'>
				<table className='min-w-full'>
					<thead className='bg-gray-50 border-b border-gray-200'>
						<tr>
							<th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>#</th>
							<th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Concepto
							</th>
							<th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Acción
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{transparencias.map((transparencia, index) => {
							const { transparenciaId, concepto, periodos } = transparencia;
							const isExpanded = expandedRows.includes(transparenciaId);

							// Agrupar períodos por año
							const periodosPorAño: Record<string, any[]> = {};
							periodos.forEach((periodo) => {
								if (!periodosPorAño[periodo.año]) {
									periodosPorAño[periodo.año] = [];
								}
								
								// Agregar trimestres que tienen archivos
								if (periodo.trimestre1) {
									periodosPorAño[periodo.año].push({ trimestre: 'I', link: periodo.trimestre1 });
								}
								if (periodo.trimestre2) {
									periodosPorAño[periodo.año].push({ trimestre: 'II', link: periodo.trimestre2 });
								}
								if (periodo.trimestre3) {
									periodosPorAño[periodo.año].push({ trimestre: 'III', link: periodo.trimestre3 });
								}
								if (periodo.trimestre4) {
									periodosPorAño[periodo.año].push({ trimestre: 'IV', link: periodo.trimestre4 });
								}
							});

							return (
								<>
									{/* Fila principal */}
									<tr
										key={transparenciaId}
										className={`transition-all duration-200 ${
											isExpanded
												? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
												: `hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-25' : 'bg-white'}`
										}`}>
										<td
											className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-center ${
												isExpanded ? 'text-blue-900' : 'text-gray-900'
											}`}>
											{transparenciaId}
										</td>
										<td
											className={`px-6 py-4 text-sm text-center ${
												isExpanded ? 'text-blue-900 font-medium' : 'text-gray-900'
											}`}>
											{concepto}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-center'>
											<button
												onClick={() => toggleRow(transparenciaId)}
												className={`font-medium transition-all duration-200 cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
													isExpanded
														? 'text-blue-700 bg-blue-100 hover:bg-blue-200'
														: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
												}`}>
												{isExpanded ? <MinusCircleIcon size={18} /> : <PlusCircleIcon size={18} />}
												{isExpanded ? 'Contraer' : 'Expandir'}
											</button>
										</td>
									</tr>

									{/* Filas expandidas */}
									{isExpanded && (
										<ExpandedRow 
											documentId={transparenciaId} 
											periodosPorAño={periodosPorAño}
										/>
									)}
								</>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
