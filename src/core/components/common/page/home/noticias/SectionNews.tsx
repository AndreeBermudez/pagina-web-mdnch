import { MainNews } from './MainNews';
import { NewsCard } from './NewsCard';
import { TriangleDivider } from './TriangleDivider';
import cityImage from '../../../../../../assets/imagen-plaza.webp';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useNoticiasQuery } from '../../../../../../features/administrador/noticias-admin/hooks/useNoticiasQuery';

export const SectionNews = () => {
	const { noticias, refetch } = useNoticiasQuery();
	const recentNoticias = useMemo(() => {
		if (!noticias) return [];
		const parseDate = (value?: string | null) => {
			if (!value) return -Infinity;
			const parsedTime = new Date(value).getTime();
			return Number.isNaN(parsedTime) ? -Infinity : parsedTime;
		};
		return [...noticias]
			.sort((a, b) => parseDate(b.fechaCreacion) - parseDate(a.fechaCreacion))
			.slice(0, 4);
	}, [noticias]);


	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<>
			<section className='relative bg-gradient-to-b from-gray-50 to-gray-100'>
				<div className='container-municipalidad'>
					<div className='w-full'>
						<div>
							<div className='flex items-center justify-between mb-8'>
								<h2 className="text-2xl font-bold text-blue-900 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:h-1 after:w-16 after:bg-blue-600 after:rounded-full">
									Noticias Recientes
								</h2>
							<Link to='/tudistrito/noticias' className='text-sm text-blue-600 hover:underline'>
								Ver todas
							</Link>
							</div>

							<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
								{recentNoticias.map((noticia) => (
									<NewsCard
										key={noticia.noticiaId}
										category={noticia.categoria}
										title={noticia.titulo}
										resumen={noticia.resumen}
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

