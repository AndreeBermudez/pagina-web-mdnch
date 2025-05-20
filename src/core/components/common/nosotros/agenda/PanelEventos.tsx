import React from 'react';
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-2 w-10 h-10 text-blue-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M2 12V2h10v10H2z"></path>
          <path d="M12 22V12h10v10H12z"></path>
          <path d="M2 22V12h10v10H2z"></path>
          <path d="M12 2h4v4"></path>
          <path d="M22 12V2H12"></path>
        </svg>
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
