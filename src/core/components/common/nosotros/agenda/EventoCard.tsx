import React from 'react';
import { HiClock } from 'react-icons/hi';
import { type Evento } from './types';
import { MESES, COLORES_CATEGORIAS } from './constants';

interface EventoCardProps {
  evento: Evento;
  index: number;
  onSelect: (id: string) => void;
}

const EventoCard: React.FC<EventoCardProps> = ({ evento, index, onSelect }) => {
  const fechaEvento = new Date(evento.fecha);
  const mesAbrev = MESES[fechaEvento.getMonth()].slice(0, 3);
  const colorCat = COLORES_CATEGORIAS[evento.categoria] || COLORES_CATEGORIAS.default;
  
  return (
    <div
      className="border border-blue-100 rounded overflow-hidden cursor-pointer transition-all mb-4 hover:shadow-lg hover:scale-105"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onSelect(evento.id)}
    >
      <div className="flex">
        <div className={`w-2 ${colorCat.dot}`}></div>
        <div className="flex gap-3 p-3">
          <div className="flex-shrink-0 p-2 flex flex-col items-center justify-center h-14 w-14 rounded border border-blue-200 bg-blue-50">
            <span className="text-xs text-blue-400 uppercase">
              {mesAbrev.toUpperCase()}
            </span>
            <span className="text-xl font-bold text-blue-700">
              {fechaEvento.getDate()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              {evento.titulo}
            </h4>
            {evento.categoria && (
              <span className={`${colorCat.clase} text-xs px-2 py-0.5 rounded-full inline-block mt-1`}>
                {evento.categoria}
              </span>
            )}
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <HiClock className="w-3 h-3 mr-1" />
              {evento.horaInicio} - {evento.horaFin}
            </div>
            <div className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {evento.ubicacion}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventoCard;
