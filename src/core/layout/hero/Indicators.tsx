import { slides } from "./slides"

interface IndicatorsProps {
    activeSlide: number;
    onClick: (index: number) => void;
  }

export const Indicators = ({ activeSlide, onClick }:IndicatorsProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
    {slides.map((_, index) => (
        <button
            key={index}
            data-index={index}
            className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer
                ${index === activeSlide ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"}
            `}
            aria-label={`Ir a diapositiva ${index + 1}`}
            onClick={() => onClick(index)}
        />
    ))}
</div>
  )
}