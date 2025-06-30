import { Printer } from 'lucide-react';
import { requirementsData } from './data-contol-interno';

export const TableControlInterno = () => {
	return (
		<div className='bg-white shadow-sm rounded-lg border border-gray-200'>
      
			<div className='px-6 py-4 border-b border-gray-200'>
				<h3 className='text-lg font-semibold text-gray-900'>Control Interno</h3>
				<p className='text-sm text-gray-500 mt-1'>{requirementsData.length} Items</p>
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
								Documento
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{requirementsData.map((requeriment, index) => {
							const { id, concepto, link } = requeriment;
							return (
								<tr
									key={id}
									className={`hover:bg-gray-50 transition-colors duration-150 ${
										index % 2 === 1 ? 'bg-gray-25' : 'bg-white'
									}`}>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'>{id}</td>
									<td className='px-6 py-4 text-sm text-gray-900'>{concepto}</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm'>
										<a
											href={link}
											target='_blank'
											rel='noopener noreferrer'
											className='text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-150'>
											<Printer />
										</a>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
