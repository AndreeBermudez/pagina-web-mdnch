import { Award, Target, Users } from 'lucide-react';
import { useEffect } from 'react';
import { WaveDivider } from '../../../../ui/WaveDivider';
import { useAlcaldeBannerQuery } from '../../../../../../features/administrador/alcaldeBanner-admin/hooks/useAlcaldeBannerQuery';

export const AlcaldeSection = () => {
	const { alcaldesBanner, refetch } = useAlcaldeBannerQuery();

	useEffect(() => {
		refetch();
	}, [refetch]);

	const alcaldeBanner = alcaldesBanner.length > 0 ? alcaldesBanner[0] : null;
	const alcaldeNombre = alcaldeBanner ? `${alcaldeBanner.nombre} ${alcaldeBanner.apellido}` : '';
	const alcaldeTitulo = alcaldeBanner?.tituloBannerPage;
	const alcaldeDescripcion = alcaldeBanner?.descripcionBannerPage;
	const alcaldeImagen = alcaldeBanner?.direccionImagen; 

	return (
		<>
			<section className='relative w-full overflow-hidden bg-[#0a2158] px-4 sm:px-6 lg:px-8'>
				{/* Sección principal */}
				<div className='container-municipalidad scroll-section'>
					<div className='grid items-center grid-cols-1 gap-8 lg:grid-cols-2 md:gap-12'>
						<div className='order-2 mt-8 space-y-6 md:space-y-8 lg:order-1 lg:mt-0'>
							<div className='space-y-4'>
								<h2 className='text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl'>
									{alcaldeTitulo}
								</h2>
							</div>

							<p className='text-lg text-white/80'>
								{alcaldeDescripcion}
							</p>

							<div className='grid gap-4 pt-4 md:grid-cols-2'>
								<div className='flex items-center gap-3 p-4 transition-all duration-300 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15'>
									<Target className='w-8 h-8 text-yellow-400' />
									<span className='font-medium text-white'>Desarrollo Sostenible</span>
								</div>
								<div className='flex items-center gap-3 p-4 transition-all duration-300 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15'>
									<Users className='w-8 h-8 text-yellow-400' />
									<span className='font-medium text-white'>Bienestar Social</span>
								</div>
							</div>

						{/* Botón para ver más información */}
						<div className='text-center'>
							<a
								href='../nosotros/alcalde'
								className='inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl hover:scale-105 transform'>
								
								<span>Conocer Más</span>
							</a>
						</div>
					</div>						<div className='relative flex items-center justify-center order-1 h-full lg:order-2'>
							{/* Paralelogramo con animación infinita */}
							<div
								className='absolute w-[120%] h-[120%] bg-blue-700/20 z-0 animate-float'
								style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}></div>

							<div className='relative z-10 w-full max-w-md mx-auto lg:max-w-full'>
								<div className='absolute -top-4 md:-top-6 lg:-top-10 -left-4 md:-left-6 lg:-left-10 bg-yellow-400 text-blue-900 font-bold py-1 md:py-2 px-2 md:px-4 rounded-lg shadow-lg rotate-[-5deg] badge-animate z-10'>
									<div className='flex items-center gap-1 md:gap-2'>
										<Award className='w-4 h-4 md:h-5 md:w-5' />
										<span className='text-sm md:text-base'>Comprometido</span>
									</div>
								</div>
								<div className='relative overflow-hidden border-2 shadow-xl rounded-xl md:rounded-2xl md:border-4 border-white/20 md:shadow-2xl'>
									<img
										src={alcaldeImagen}
										alt='Foto - Alcalde Distrital de Nuevo Chimbote'
										className='alcalde-image object-cover w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]'
									/>
								</div>
								<div className='absolute w-4/5 px-4 py-2 transition-all duration-300 transform -translate-x-1/2 bg-white border-l-4 border-blue-700 rounded-lg shadow-lg -bottom-4 md:-bottom-6 left-1/2 md:py-3 md:px-6 md:shadow-xl hover:shadow-2xl'>
									<h3 className='text-base font-bold text-blue-900 md:text-lg'>{alcaldeNombre}</h3>
									<p className='text-xs font-semibold text-blue-700 md:text-sm'>
										Alcalde Distrital de Nuevo Chimbote
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<WaveDivider baseColor='#0a2158' midColor='#204394' topColor='#466dc7' bgColor='bg-gray-100' height='h-24' />
		</>
	);
};
