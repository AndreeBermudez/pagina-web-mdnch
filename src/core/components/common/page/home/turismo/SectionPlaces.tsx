import { CalendarClock, MapPin, MoveRight, Target } from 'lucide-react';
import { CardCollapse } from './CardCollapse';
import cityImage from '../../../../../../assets/imagen-plaza.webp';

export const SectionPlaces = () => {
	return (
		<section className='py-16 bg-gray-100'>
			<div className='container-municipalidad'>
				<div>
					<div className='mb-16'>
						<div className='flex items-center gap-2 mb-3'>
							<div className='w-10 h-1 bg-blue-600 rounded-full'></div>
							<span className='font-medium text-blue-600'>DESTINO TURÍSTICO</span>
						</div>
						<h2 className='mb-6 text-3xl font-bold text-blue-900 md:text-4xl'>Bienvenido a Nuevo Chimbote</h2>
						<div className='grid items-center grid-cols-1 gap-8 md:grid-cols-2'>							<div className='relative overflow-hidden shadow-xl rounded-xl'>
								
								<div className='absolute px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full bottom-4 right-4'>
									Ciudad moderna
								</div>
							</div>
							<div className='space-y-6'>
								<p className='leading-relaxed text-gray-600'>
									Nuevo Chimbote es una joven ciudad peruana que combina modernidad, naturaleza y cultura en
									perfecta armonía. Ubicada en la costa norte del Perú, se distingue por sus amplias avenidas,
									espacios verdes y una creciente infraestructura urbana diseñada para el bienestar de sus
									habitantes.
								</p>
								<div className='grid grid-cols-2 gap-4'>
									<div className='flex items-start gap-2'>
										<div className='p-2 mt-1 bg-blue-100 rounded-lg'>
											<MapPin className='w-5 h-5 text-blue-600' />
										</div>
										<div>
											<h3 className='font-semibold text-blue-900'>Ubicación privilegiada</h3>
											<p className='text-sm text-gray-500'>Entre el océano Pacífico y el valle del río Santa</p>
										</div>
									</div>
									<div className='flex items-start gap-2'>
										<div className='p-2 mt-1 bg-blue-100 rounded-lg'>
											<CalendarClock className='w-5 h-5 text-blue-600' />
										</div>
										<div>
											<h3 className='font-semibold text-blue-900'>Ciudad joven</h3>
											<p className='text-sm text-gray-500'>Fundada en 1994, con proyección y dinamismo</p>
										</div>
									</div>
								</div>
								<a
									href='/turismo'
									className='inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors'>
									Descubrir más
									<MoveRight className='w-4 h-4' />
								</a>
							</div>
						</div>
					</div>
					<div className='mb-10 text-center'>
						<h2 className='mb-3 text-2xl font-bold text-blue-900 md:text-3xl'>Lugares de interés</h2>
						<p className='max-w-2xl mx-auto text-gray-600'>
							Descubre los principales atractivos turísticos y recreativos de nuestra ciudad
						</p>
					</div>
					<article className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
						<CardCollapse
							title='Plaza Mayor'
							description='Espacio emblemático en el corazón de la ciudad, rodeado de edificios históricos y con hermosas áreas verdes para el disfrute de residentes y visitantes.'
							Icon={Target}
							imageSrc={cityImage}
							altText='Plaza Mayor de Nuevo Chimbote'
						/>
						<CardCollapse
							title='Teatro Municipal'
							description='Centro cultural que alberga los principales eventos artísticos de la ciudad, con una arquitectura moderna y excelente acústica para disfrutar de espectáculos de primer nivel.'
							Icon={Target}
							imageSrc={cityImage}
							altText='Teatro Municipal de Nuevo Chimbote'
						/>
						<CardCollapse
							title='Polideportivo'
							description='Complejo deportivo con instalaciones de primer nivel para la práctica de diversas disciplinas, sede de importantes competencias y punto de encuentro para deportistas locales.'
							Icon={Target}
							imageSrc={cityImage}
							altText='Polideportivo de Nuevo Chimbote'
						/>
						<CardCollapse
							title='Catedral de Nuevo Chimbote'
							description='Imponente obra arquitectónica religiosa que representa la fe de los chimbotanos, con hermosos vitrales y un diseño que combina lo tradicional con lo contemporáneo.'
							Icon={Target}
							imageSrc={cityImage}
							altText='Catedral de Nuevo Chimbote'
						/>
						<CardCollapse
							title='Malecón Grau'
							description='Paseo costero con una impresionante vista al océano Pacífico, ideal para caminatas al atardecer y disfrutar de la gastronomía local en sus diversos restaurantes.'
							Icon={Target}
							imageSrc={cityImage}
							altText='Malecón Grau de Nuevo Chimbote'
						/>
					</article>
				</div>
			</div>
		</section>
	);
};
