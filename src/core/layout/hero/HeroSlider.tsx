import { slides } from './slides';
import cityImage from '../../../assets/imagen-plaza.webp';

interface HeroSliderProps {
	activeSlide: number;
}

export const HeroSlider = ({ activeSlide }: HeroSliderProps) => {
	return (
		<div id='hero-slider' className='flex items-center w-full'>
			<div id='slides-container' className='w-full'>
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`flex items-center w-full ${index === activeSlide ? 'block' : 'hidden'}`}
						data-slide={index}>
						{/* Texto */}
						<div className='flex flex-col items-start justify-center space-y-6 px-4'>
							<h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight animation-slide-bottom'>
								{slide.title} <span className='text-yellow-400'>{slide.highlight}</span> {slide.subtitle}
							</h1>
							<p className='text-white/90 text-base md:text-lg max-w-md animation-slide-bottom-delayed'>
								{slide.description}
							</p>
						</div>

						{/* Imágenes */}
						<div className='flex items-center justify-center w-full py-10 pl-5'>
							<div className='rounded-2xl border border-blue-950/50 overflow-hidden animation-slide-right'>
								<img src={cityImage} alt={`Slide ${index + 1}`} className='object-cover rounded-2xl' />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
