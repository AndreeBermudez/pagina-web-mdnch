import React from 'react';
import { type Evento } from './types';

interface EventoDetalleProps {
  evento: Evento;
}

const EventoDetalle: React.FC<EventoDetalleProps> = ({ evento }) => {
  const fechaEvento = new Date(evento.fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fechaEvento.toLocaleDateString("es-ES", opciones);

  return (
    <div className="border border-blue-200 rounded shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/70 to-transparent z-10"></div>
        <img
          src={evento.imagen}
          alt={evento.titulo}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {evento.destacado && (
          <div className="absolute top-3 right-3 z-20 bg-cyan-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block mr-1"
            >
              <path d="M2 12V2h10v10H2z"></path>
              <path d="M12 22V12h10v10H12z"></path>
              <path d="M2 22V12h10v10H2z"></path>
              <path d="M12 2h4v4"></path>
              <path d="M22 12V2H12"></path>
            </svg>
            Destacado
          </div>
        )}
        {evento.categoria && (
          <div className="absolute top-3 left-3 z-20 bg-white/90 text-blue-800 px-2 py-1 rounded-full text-sm font-medium shadow flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            {evento.categoria}
          </div>
        )}
        <div className="absolute bottom-4 left-4 z-20">
          <h1 className="text-3xl font-bold text-white drop-shadow">
            {evento.titulo}
          </h1>
          {evento.organizador && (
            <div className="flex items-center text-white/90 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block mr-1"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Organizado por: <span>{evento.organizador}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6 bg-blue-50 p-4 rounded">
          <div className="flex items-center text-blue-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2 text-blue-600"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{fechaFormateada}</span>
          </div>
          <div className="flex items-center text-blue-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2 text-blue-600"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>
              {evento.horaInicio} - {evento.horaFin}
            </span>
          </div>
          <div className="flex items-center text-blue-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2 text-blue-600"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{evento.ubicacion}</span>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Descripción del evento
          </h2>
          <p className="text-gray-700">{evento.descripcion}</p>
          {evento.descripcionCompleta && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded">
              <p
                dangerouslySetInnerHTML={{
                  __html: evento.descripcionCompleta.replace(/\n/g, "<br>")
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4">
        <button
          className="w-full inline-flex items-center justify-center py-2 px-4 rounded font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700"
          onClick={() => (window.location.href = `/eventos/${evento.id}`)}
        >
          Ver detalles completos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EventoDetalle;
