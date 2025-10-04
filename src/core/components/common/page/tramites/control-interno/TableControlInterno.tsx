import { Printer, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { obtenerControles, type Control } from '../../../../../../features/administrador/controlInterno-admin/service';

export const TableControlInterno = () => {
	const [controles, setControles] = useState<Control[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		fetchControles();
	}, []);

	const fetchControles = async () => {
		setLoading(true);
		setError('');
		try {
			const data = await obtenerControles();
			if (data && Array.isArray(data)) {
				setControles(data);
			} else {
				setControles([]);
				setError('No se pudieron cargar los controles internos');
			}
		} catch (err) {
			setError('Error al cargar los controles internos');
			setControles([]);
			console.error('Error al cargar controles:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-white shadow-sm rounded-lg border border-gray-200'>
      
			<div className='px-6 py-4 border-b border-gray-200'>
				<h3 className='text-lg font-semibold text-gray-900'>Control Interno</h3>
				<p className='text-sm text-gray-500 mt-1'>
					{loading ? 'Cargando...' : `${controles.length} Items`}
				</p>
			</div>

			<div className='overflow-hidden rounded-2xl'>
				<table className='min-w-full'>
					<thead className='bg-gray-50 border-b border-gray-200'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>#</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Título
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Documento
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{loading && (
							<tr>
								<td colSpan={3} className='px-6 py-12 text-center'>
									<div className='flex flex-col items-center space-y-2'>
										<div className='w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent animate-spin'></div>
										<p className='text-sm text-gray-500'>Cargando controles internos...</p>
									</div>
								</td>
							</tr>
						)}
						
						{error && (
							<tr>
								<td colSpan={3} className='px-6 py-12 text-center'>
									<div className='flex flex-col items-center space-y-2'>
										<AlertCircle className='w-8 h-8 text-red-500' />
										<p className='text-sm text-red-600 font-medium'>Error al cargar controles</p>
										<p className='text-xs text-red-500'>{error}</p>
									</div>
								</td>
							</tr>
						)}
						
						{!loading && !error && controles.length === 0 && (
							<tr>
								<td colSpan={3} className='px-6 py-12 text-center'>
									<p className='text-sm text-gray-500'>No hay controles internos disponibles</p>
								</td>
							</tr>
						)}
						
						{!loading && !error && controles.map((control, index) => (
							<tr
								key={control.controlInternoId}
								className={`hover:bg-gray-50 transition-colors duration-150 ${
									index % 2 === 1 ? 'bg-gray-25' : 'bg-white'
								}`}>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'>
									#{control.controlInternoId}
								</td>
								<td className='px-6 py-4 text-sm text-gray-900'>
									{control.titulo}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm'>
									{control.rutaPdf ? (
										<a
											href={control.rutaPdf}
											target='_blank'
											rel='noopener noreferrer'
											className='text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-150 flex items-center space-x-1'>
											<Printer className='w-4 h-4' />
											<span>Ver PDF</span>
										</a>
									) : (
										<span className='text-gray-400 text-xs'>Sin documento</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
