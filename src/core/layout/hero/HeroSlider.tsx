import type { Slider } from '../../../features/administrador/slider-admin/services/slider.interface';

interface HeroSliderProps {
	activeSlide: number;
	sliders: Slider[];
}

export const HeroSlider = ({ activeSlide, sliders }: HeroSliderProps) => {
	return (
		<div className='flex items-center w-full'>
			<div className='w-full'>
				{sliders.map((slide, index) => (
					<div
						key={slide.bannerId}
						className={`flex flex-col md:flex-row w-full ${index === activeSlide ? 'block' : 'hidden'}`}
						data-slide={index}>
						{/* Texto */}
						<div className='flex flex-col items-center justify-start w-full py-10 mb-6 space-y-6 text-center md:w-2/5 md:items-start md:mb-0 md:text-left'>
							<h1 className='text-5xl font-bold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl animation-slide-bottom'>
								{slide.titulo[0]} <span className='text-yellow-400'>{slide.titulo[1]}</span> {slide.titulo[2]}
							</h1>
							<p className='max-w-md text-base text-white/90 md:text-lg animation-slide-bottom-delayed'>
								{slide.descripcion}
							</p>
						</div>

						{/* Imágenes */}
						<div className='items-center justify-center hidden w-full py-10 pl-0 md:w-3/5 md:flex md:pl-6'>
							<div className='overflow-hidden border rounded-lg border-blue-950/50 animation-slide-right'>
								<img
									src={slide.direccionImagen}
									alt={`Slide ${index + 1}`}
									className='object-cover w-full h-auto max-h-[400px]'
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
