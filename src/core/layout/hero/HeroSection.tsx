import { useEffect, useState, useRef } from 'react';
import { HeroSlider } from './HeroSlider';
import { Indicators } from './Indicators';
import { Weather } from '../../../core/components/ui/Weather'; // Asumiendo que ya tienes un componente Weather en React
import { slides } from './slides';
import cityImage from '../../../assets/imagen-plaza.webp';

export const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full h-screen overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cityImage} 
          alt="Fondo Municipalidad" 
          className="object-cover w-full h-full" 
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a2463]/90" />
      
      {/* Patrón */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5 pointer-events-none bg-[url('src/assets/pattern.svg')]"
      ></div>
      
      {/* Contenido */}
      <div className="container-municipalidad">
        <div className="absolute top-28 right-8">
          <Weather />
        </div>
        <HeroSlider activeSlide={activeSlide} />
        <Indicators activeSlide={activeSlide} onClick={goToSlide} />
      </div>
    </section>
  );
};