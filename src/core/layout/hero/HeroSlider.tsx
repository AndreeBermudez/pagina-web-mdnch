import { slides } from './slides';
import cityImage from '../../../assets/imagen-plaza.webp';

interface HeroSliderProps {
	activeSlide: number;
}

export const HeroSlider = ({ activeSlide }: HeroSliderProps) => {
	return (
		<div className='flex items-center w-full'>
			<div className='w-full'>
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`flex flex-col md:flex-row w-full ${
							index === activeSlide ? 'block' : 'hidden'
						}`}
						data-slide={index}>
						{/* Texto */}
						<div className='w-full md:w-2/5 flex flex-col items-center md:items-start justify-start space-y-6 py-10 mb-6 md:mb-0 text-center md:text-left'>
							<h1 className='text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight animation-slide-bottom'>
								{slide.title} <span className='text-yellow-400'>{slide.highlight}</span> {slide.subtitle}
							</h1>
							<p className='text-white/90 text-base md:text-lg max-w-md animation-slide-bottom-delayed'>
								{slide.description}
							</p>
						</div>

						{/* Imágenes */}
						<div className='w-full hidden md:w-3/5 md:flex items-center justify-center py-10 pl-0 md:pl-6'>
							<div className='rounded-lg border border-blue-950/50 overflow-hidden animation-slide-right'>
								<img src={cityImage} alt={`Slide ${index + 1}`} className='object-cover w-full h-auto' />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
