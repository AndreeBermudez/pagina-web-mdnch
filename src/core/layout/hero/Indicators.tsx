import type { Slider } from '../../../features/administrador/slider-admin/services/slider.interface';

interface IndicatorsProps {
	activeSlide: number;
	onClick: (index: number) => void;
	sliders: Slider[];
}

export const Indicators = ({ activeSlide, onClick, sliders }: IndicatorsProps) => {
	return (
		<div className='absolute flex space-x-2 -translate-x-1/2 bottom-8 left-1/2'>
			{sliders.map((_, index) => (
				<button
					key={index}
					data-index={index}
					className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer
                ${index === activeSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}
            `}
					aria-label={`Ir a diapositiva ${index + 1}`}
					onClick={() => onClick(index)}
				/>
			))}
		</div>
	);
};
