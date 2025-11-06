import { File } from 'lucide-react';
import { YearSection } from './YearSection';

interface YearData {
	trimestre: string;
	link: string;
}

interface ExpandedRowProps {
	documentId: number;
	periodosPorAño: Record<string, YearData[]>;
}

export const ExpandedRow = ({ documentId, periodosPorAño }: ExpandedRowProps) => {
	// Obtener los años ordenados de mayor a menor
	const años = Object.keys(periodosPorAño).sort((a, b) => parseInt(b) - parseInt(a));
	const totalDocumentos = años.reduce((acc, año) => acc + periodosPorAño[año].length, 0);
	const hasData = años.length > 0;

	return (
		<tr>
			<td colSpan={3} className='px-6 py-6 border-l-4 border-blue-500 bg-gradient-to-b from-blue-25 to-blue-50'>
				<div className='max-w-full'>
					{/* Header de la sección expandida */}
					<div className='mb-6 pb-4 border-b-2 border-blue-200'>
						<h3 className='text-base font-semibold text-gray-800 flex items-center gap-3'>
							<div className='bg-blue-500 text-white p-2 rounded-lg'>
								<File />
							</div>
							Documentos disponibles por periodo
							<div className='flex-1 h-px bg-blue-200'></div>
							<span className='text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium'>
								{totalDocumentos} total
							</span>
						</h3>
					</div>

					{hasData ? (
						<div className={`grid gap-8 ${años.length > 1 ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
							{años.map((año) => (
								<YearSection 
									key={año}
									year={parseInt(año)} 
									data={periodosPorAño[año]} 
									documentId={documentId} 
								/>
							))}
						</div>
					) : (
						<div className='text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300'>
							<File className='mx-auto h-12 w-12 text-gray-400' />
							<h3 className='text-lg font-medium text-gray-900 mb-2'>No hay documentos disponibles</h3>
							<p className='text-sm text-gray-500'>
								No se encontraron documentos para este concepto en ningún periodo.
							</p>
						</div>
					)}
				</div>
			</td>
		</tr>
	);
};
