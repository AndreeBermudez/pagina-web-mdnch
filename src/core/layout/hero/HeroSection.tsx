import { useEffect, useRef, useState } from 'react';
import cityImage from '../../../assets/imagen-plaza.webp';
import { HeroSlider } from './HeroSlider';
import { Indicators } from './Indicators';
import { useSliderQuery } from '../../../features/administrador/slider-admin/hooks/useSliderQuery';

export const HeroSection = () => {
	const { sliders } = useSliderQuery();
	const [activeSlide, setActiveSlide] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	
	const goToSlide = (index: number) => {
		setActiveSlide(index);
	};

	useEffect(() => {
		if (!sliders || sliders.length === 0) return;
		const nextSlide = () => {
			setActiveSlide((current) => (current + 1) % sliders.length);
		};
		intervalRef.current = setInterval(nextSlide, 4000);
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [sliders]);

	return (
		<section className='w-full h-screen overflow-hidden'>
			{/* Imagen de fondo */}
			<div className='absolute inset-0 z-0'>
				<img src={cityImage} alt='Fondo Municipalidad' className='object-cover w-full h-full' />
			</div>

			{/* Overlay */}
			<div className='absolute inset-0 bg-[#0a2463]/90' />

			{/* Patrón */}
			<div
				aria-hidden='true'
				className="absolute inset-0 opacity-5 pointer-events-none bg-[url('src/assets/pattern.svg')]"></div>

			{/* Contenido */}
			<div className='container-municipalidad'>
				<HeroSlider activeSlide={activeSlide} sliders={sliders ? sliders : []} />
				<Indicators activeSlide={activeSlide} onClick={goToSlide} sliders={sliders ? sliders : []} />
			</div>
		</section>
	);
};
