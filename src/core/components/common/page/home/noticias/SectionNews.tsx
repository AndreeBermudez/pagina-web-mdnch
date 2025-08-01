import { MainNews } from './MainNews';
import { NewsCard } from './NewsCard';
import { TriangleDivider } from './TriangleDivider';
import cityImage from '../../../../../../assets/imagen-plaza.webp';
import { useEffect } from 'react';
import { useNoticiasQuery } from '../../../../../../features/administrador/noticias-admin/hooks/useNoticiasQuery';

export const SectionNews = () => {
	const { noticias, refetch } = useNoticiasQuery();

	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<>
			<section className='relative bg-gradient-to-b from-gray-50 to-gray-100'>
				<div className='container-municipalidad'>
					<div className='w-full'>
						<div className='grid grid-cols-1 gap-8 mb-12 transition-transform duration-300 hover:scale-[1.01]'>
							<div className='overflow-hidden transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl'>
								<MainNews
									category='Infraestructura'
									title='Nuevo alumbrado público en zona residencial'
									description='La municipalidad ha instalado 200 nuevas luminarias LED en el barrio Las Flores, mejorando la seguridad vial y peatonal.'
									date='09 de abril de 2025'
									image={cityImage}
								/>
							</div>
						</div>
						<div>
							<div className='flex items-center justify-between mb-8'>
								<h2 className="text-2xl font-bold text-blue-900 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:h-1 after:w-16 after:bg-blue-600 after:rounded-full">
									Noticias Recientes
								</h2>
								<a href='#' className='text-sm text-blue-600 hover:underline'>
									Ver todas →
								</a>
							</div>

							<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
								{noticias?.map((noticia) => (
									<NewsCard
										key={noticia.noticiaId}
										category={noticia.categoria}
										title={noticia.titulo}
										description={noticia.descripcion}
										date={noticia.fechaManual}
										image={noticia.direccionImagen || cityImage}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
			<TriangleDivider color='#f3f4f6' bgColor='#3c6fe5' height='h-20' />
		</>
	);
};
