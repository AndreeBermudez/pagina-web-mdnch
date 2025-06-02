import React from 'react';
import { HiViewGrid } from 'react-icons/hi';
import EventoCard from './EventoCard';
import EventoDetalle from './EventoDetalle';
import { type Evento } from './types';

interface PanelEventosProps {
  eventoSeleccionado: Evento | null;
  eventosFiltrados: Evento[];
  seleccionarEvento: (id: string) => void;
  mesActual: number;
}

const PanelEventos: React.FC<PanelEventosProps> = ({
  eventoSeleccionado,
  eventosFiltrados,
  seleccionarEvento,
}) => {
  if (eventoSeleccionado) {
    return <EventoDetalle evento={eventoSeleccionado} />;
  }

  if (eventosFiltrados.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8 bg-blue-50 rounded">
        <HiViewGrid className="mx-auto mb-2 w-10 h-10 text-blue-300" />
        <p>No hay eventos para mostrar</p>
        <p className="text-sm">¡Añade nuevos eventos para verlos aquí!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {eventosFiltrados.map((evento, index) => (
        <EventoCard 
          key={evento.id}
          evento={evento}
          index={index}
          onSelect={seleccionarEvento}
        />
      ))}
    </div>
  );
};

export default PanelEventos;
