import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { NoticiaModal } from './NoticiaModal';
import { useState } from 'react';
import { useNoticias } from './useNoticias';
import type { NoticiaResponse } from '../../../../../services/noticias/noticia.interface';

export const NoticiasAdmin = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [noticiaEdit, setNoticiaEdit] = useState<NoticiaResponse | null>(null);
	const { loading, error, deleteNoticia, updateNoticia, createNoticia, filteredNoticias,searchTerm, setSearchTerm } = useNoticias();
	const handleAddNoticia = () => {
		setNoticiaEdit(null);
		setIsModalOpen(true);
	};
	const handleEdit = (noticia: NoticiaResponse) => {
		setNoticiaEdit(noticia);
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setNoticiaEdit(null);
	};
	const handleDelete = (noticiaId: number) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
			deleteNoticia(noticiaId);
		}
	};

	return (
		<div className='bg-white shadow-sm rounded-lg border border-gray-300'>
			<div className='border-b p-3'>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-medium'>Noticias</h2>
					<button
						className='inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700'
						onClick={handleAddNoticia}>
						<Plus className='w-3.5 h-3.5 mr-1.5' />
						Agregar noticia
					</button>
				</div>
				<div className='flex items-center gap-3 mt-3'>
					<div className='relative flex-1 max-w-sm'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5' />
						<input
							placeholder='Buscar funcionarios...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='flex h-8 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800'>
						{filteredNoticias.length} noticias encontradas
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
						{loading && (
							<tr>
								<td colSpan={6} className='text-center py-4'>
									Cargando noticias...
								</td>
							</tr>
						)}
						{error && (
							<tr>
								<td colSpan={6} className='text-center py-4 text-red-600'>
									Error al cargar las noticias: {error}
								</td>
							</tr>
						)}
						{!loading && filteredNoticias.map((noticia) => (
							<tr key={noticia.noticiaId}>
								<td className='px-4 py-2 whitespace-normal'>
									<div className='flex items-center justify-start'>{noticia.fechaManual}</div>
								</td>
								<td className='px-4 py-2 whitespace-normal'>
									<div className='flex items-center justify-start'>{noticia.titulo}</div>
								</td>
								<td className='px-4 py-2 whitespace-normal'>
									<div className='flex items-center justify-start'>{noticia.categoria}</div>
								</td>
								<td className='px-4 py-2 whitespace-normal'>
									<div className='flex items-center justify-start'>{noticia.descripcion}</div>
								</td>
								<td className='px-4 py-2 whitespace-normal'>
									<div className='flex items-center justify-center'>
										<img src={noticia.direccionImagen} alt={noticia.titulo} className='w-10 h-10 object-cover' />
									</div>
								</td>
								<td className='px-4 py-2 whitespace-nowrap text-right text-sm font-medium'>
									<div className='flex items-center justify-center gap-2'>
										<button
											className='inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-1 text-sm text-gray-700 hover:bg-gray-50'
											onClick={() => handleEdit(noticia)}>
											<Edit className='w-3.5 h-3.5' />
										</button>
										<button
											className='inline-flex items-center justify-center rounded-md border border-gray-300 bg-red-500 cursor-pointer p-1 text-sm text-gray-700 hover:bg-red-300'
											onClick={() => handleDelete(noticia.noticiaId ? noticia.noticiaId : 0)}>
											<Trash2 className='w-3.5 h-3.5 text-white' />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isModalOpen && (
				<NoticiaModal
					isOpen={isModalOpen}
					handleModal={handleCloseModal}
					noticiaEditable={noticiaEdit}
					createNoticia={createNoticia}
					updateNoticia={updateNoticia}
				/>
			)}
		</div>
	);
};
