import { Award, Target, Users } from 'lucide-react';
import { WaveDivider } from '../../../ui/WaveDivider'; 
import alcaldeImage from '../../../../../assets/walter_soto.avif';

export const AlcaldeSection = () => {
	return (
		<>
			<section className='relative w-full overflow-hidden bg-[#0a2158] px-4 sm:px-6 lg:px-8'>
				{/* Sección principal */}
				<div className='container mx-auto max-w-7xl py-16 md:py-24 scroll-section'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center'>
						<div className='space-y-6 md:space-y-8 order-2 lg:order-1 mt-8 lg:mt-0'>
							<div className='space-y-4'>
								<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
									Comprometidos con el{' '}
									<span className='text-yellow-400 inline-block relative'>
										desarrollo
										<svg
											className='absolute -bottom-2 left-0 w-full'
											viewBox='0 0 100 10'
											preserveAspectRatio='none'>
											<path d='M0,5 Q50,10 100,5' stroke='currentColor' fill='none'></path>
										</svg>
									</span>{' '}
									y bienestar de nuestra comunidad
								</h2>
							</div>

							<p className='text-white/80 text-lg'>
								Nuestra visión es convertir nuestro distrito en un modelo de desarrollo sostenible, donde cada
								familia pueda prosperar en un entorno seguro, limpio y con oportunidades para todos.
							</p>

							<div className='grid md:grid-cols-2 gap-4 pt-4'>
								<div className='flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300'>
									<Target className='text-yellow-400 h-8 w-8' />
									<span className='text-white font-medium'>Desarrollo Sostenible</span>
								</div>
								<a
									href='/alcalde'
									className='flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300'>
									<Users className='text-yellow-400 h-8 w-8' />
									<span className='text-white font-medium'>Bienestar Social</span>
								</a>
							</div>
						</div>

						<div className='relative h-full flex justify-center items-center order-1 lg:order-2'>
							{/* Paralelogramo con animación infinita */}
							<div
								className='absolute w-[120%] h-[120%] bg-blue-700/20 z-0 animate-float'
								style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}></div>

							<div className='relative z-10 mx-auto w-full max-w-md lg:max-w-full'>
								<div className='absolute -top-4 md:-top-6 lg:-top-10 -left-4 md:-left-6 lg:-left-10 bg-yellow-400 text-blue-900 font-bold py-1 md:py-2 px-2 md:px-4 rounded-lg shadow-lg rotate-[-5deg] badge-animate z-10'>
									<div className='flex items-center gap-1 md:gap-2'>
										<Award className='h-4 w-4 md:h-5 md:w-5' />
										<span className='text-sm md:text-base'>Comprometido</span>
									</div>
								</div>
								<div className='relative overflow-hidden rounded-xl md:rounded-2xl border-2 md:border-4 border-white/20 shadow-xl md:shadow-2xl'>
									<img
										src={alcaldeImage}
										alt='Walter Soto Reyna - Alcalde Distrital de Nuevo Chimbote'
										className='alcalde-image object-cover w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]'
									/>
								</div>
								<div className='absolute -bottom-4 md:-bottom-6 left-1/2 transform -translate-x-1/2 bg-white border-l-4 border-blue-700 py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 w-4/5'>
									<h3 className='text-blue-900 font-bold text-base md:text-lg'>Walter Soto Reyna</h3>
									<p className='text-blue-700 font-semibold text-xs md:text-sm'>
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
