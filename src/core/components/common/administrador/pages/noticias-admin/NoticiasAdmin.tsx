import { Edit, Plus, Search, Trash2 } from 'lucide-react';

export const NoticiasAdmin = () => {
	return (
		<div className='bg-white shadow-sm rounded-lg border border-gray-300'>
			<div className='border-b p-3'>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-medium'>Noticias</h2>
					<button className='inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700'>
						<Plus className='w-3.5 h-3.5 mr-1.5' />
						Agregar noticia
					</button>
				</div>
				<div className='flex items-center gap-3 mt-3'>
					<div className='relative flex-1 max-w-sm'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5' />
						<input
							placeholder='Buscar funcionarios...'
							className='flex h-8 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800'>
						1 noticia encontrada
					</span>
				</div>
			</div>

			<div className='overflow-y-auto overflow-x-auto' style={{ maxHeight: '420px', border: '1px solid #f3f4f6' }}>
				<table className='min-w-full divide-y divide-gray-200 table-fixed'>
					<thead className='bg-gray-50'>
						<tr>
							<th>Fecha</th>
              <th>Titulo</th>
              <th>Categoria</th>
              <th>Descripcion</th>
							<th>Imagen</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						<tr>
							<td className='px-4 py-2 whitespace-nowrap'>
								<div className='flex items-center justify-center'>2025-06-23</div>
							</td>
              <td className='px-4 py-2 whitespace-nowrap'>
                <div className='flex items-center justify-center'>Título de la noticia</div>  
              </td>
              <td className='px-4 py-2 whitespace-nowrap'>
                <div className='flex items-center justify-center'>Categoría</div>
              </td>
              <td className='px-4 py-2 whitespace-nowrap'>
                <div className='flex items-center justify-center'>Descripción breve de la noticia</div>
              </td>
							<td className='px-4 py-2 whitespace-nowrap'>
								<div className='flex items-center justify-center'>
									<img src='/placeholder.svg' alt='Juan Pérez' className='w-10 h-10 object-cover' />
								</div>
							</td>
							<td className='px-4 py-2 whitespace-nowrap text-right text-sm font-medium'>
								<div className='flex items-center justify-center gap-2'>
									<button className='inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-1 text-sm text-gray-700 hover:bg-gray-50'>
										<Edit className='w-3.5 h-3.5' />
									</button>
									<button className='inline-flex items-center justify-center rounded-md border border-gray-300 bg-red-500 cursor-pointer p-1 text-sm text-gray-700 hover:bg-red-300'>
										<Trash2 className='w-3.5 h-3.5 text-white' />
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};
