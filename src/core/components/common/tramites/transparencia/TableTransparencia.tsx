import { PlusCircleIcon, MinusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { transparenciaData } from './data-transparencia';
import { ExpandedRow } from './ExpandedRow';

export const TableTransparencia = () => {
	const [expandedRows, setExpandedRows] = useState<number[]>([]);

	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	return (
		<div className='bg-white shadow-sm rounded-lg border border-gray-200'>
			<div className='px-6 py-4 border-b border-gray-200'>
				<h3 className='text-lg font-semibold text-gray-900'>Transparencia</h3>
				<p className='text-sm text-gray-500 mt-1'>{transparenciaData.length} Items</p>
			</div>

			<div className='overflow-hidden rounded-2xl'>
				<table className='min-w-full'>
					<thead className='bg-gray-50 border-b border-gray-200'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>#</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Concepto
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Acción
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{transparenciaData.map((documentTransparencia, index) => {
							const { id, concepto, informacion } = documentTransparencia;
							const datos2023 = informacion[2023] || [];
							const datos2024 = informacion[2024] || [];
							const isExpanded = expandedRows.includes(id);

							return (
								<>
									{/* Fila principal */}
									<tr
										key={id}
										className={`transition-all duration-200 ${
											isExpanded
												? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
												: `hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-25' : 'bg-white'}`
										}`}>
										<td
											className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
												isExpanded ? 'text-blue-900' : 'text-gray-900'
											}`}>
											{id}
										</td>
										<td
											className={`px-6 py-4 text-sm ${
												isExpanded ? 'text-blue-900 font-medium' : 'text-gray-900'
											}`}>
											{concepto}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm'>
											<button
												onClick={() => toggleRow(id)}
												className={`font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-1 rounded-lg ${
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
									{isExpanded && <ExpandedRow documentId={id} datos2023={datos2023} datos2024={datos2024} />}
								</>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
