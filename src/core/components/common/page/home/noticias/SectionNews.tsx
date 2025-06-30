import { MainNews } from './MainNews';
import { NewsCard } from './NewsCard';
import { TriangleDivider } from './TriangleDivider';
import cityImage from '../../../../../../assets/imagen-plaza.webp';
import { useEffect } from 'react';
import { useNoticiasHome } from '../../../../../../features/administrador/noticias-admin/hooks/useNoticiasHome';

export const SectionNews = () => {
	const { noticias, loading, error, refreshNoticias } = useNoticiasHome();

	useEffect(() => {
		refreshNoticias();
	}, [refreshNoticias]);

	return (
		<>
			<section className='relative bg-gradient-to-b from-gray-50 to-gray-100'>
				<div className='container-municipalidad'>
					<div className=''>
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
								{noticias.map((noticia) => (
									<NewsCard
										key={noticia.noticiaId}
										category={noticia.categoria}
										title={noticia.titulo}
										description={noticia.descripcion}
										date={noticia.fechaManual}
										image={noticia.direccionImagen || cityImage}
									/>
								))}
								{/* <NewsCard
									category='Educación'
									title='Talleres gratuitos de empleabilidad para jóvenes'
									description='La municipalidad lanzó una serie de talleres gratuitos para jóvenes entre 18 y 25 años, enfocados en habilidades...'
									date='09 de abril de 2025'
									image={cityImage}
								/>
								<NewsCard
									category='Medio Ambiente'
									title='Municipalidad inaugura nuevo parque ecológico'
									description='La municipalidad ha inaugurado un nuevo parque ecológico en el centro de la ciudad, con áreas verdes,...'
									date='02 de abril de 2025'
									image={cityImage}
								/>
								<NewsCard
									category='Medio Ambiente'
									title='Programa de reciclaje comunitario muestra resultados positivos'
									description='El programa de reciclaje implementado hace seis meses ha logrado reducir en un 30% los residuos enviados al...'
									date='01 de abril de 2025'
									image={cityImage}
								/>
								<NewsCard
									category='Medio Ambiente'
									title='Programa de reciclaje comunitario muestra resultados positivos'
									description='El programa de reciclaje implementado hace seis meses ha logrado reducir en un 30% los residuos enviados al...'
									date='01 de abril de 2025'
									image={cityImage}
								/> */}
							</div>
						</div>
					</div>
				</div>
			</section>
			<TriangleDivider color='#f3f4f6' bgColor='#3c6fe5' height='h-20' />
		</>
	);
};
