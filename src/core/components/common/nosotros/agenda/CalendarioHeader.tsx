import React from 'react';
import { MESES } from './constants';

interface CalendarioHeaderProps {
  mesActual: number;
  anioActual: number;
  rangoAnios: number[];
  onChangeMes: (mes: number) => void;
  onChangeAnio: (anio: number) => void;
  busqueda: string;
  onChangeBusqueda: (busqueda: string) => void;
}

const CalendarioHeader: React.FC<CalendarioHeaderProps> = ({
  mesActual,
  anioActual,
  rangoAnios,
  onChangeMes,
  onChangeAnio,
  busqueda,
  onChangeBusqueda
}) => {
  return (
    <div className="p-6 border-b border-blue-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-blue-200 rounded-full px-4 py-1 bg-blue-50 hover:bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500 mr-2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <select
            value={mesActual}
            onChange={(e) => onChangeMes(Number(e.target.value))}
            className="bg-transparent outline-none text-blue-700 font-medium p-1"
          >
            {MESES.map((mes, i) => (
              <option key={mes} value={i}>
                {mes}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center border border-blue-200 rounded-full px-4 py-1 bg-blue-50 hover:bg-blue-100">
          <select
            value={anioActual}
            onChange={(e) => onChangeAnio(Number(e.target.value))}
            className="bg-transparent outline-none text-blue-700 font-medium p-1"
          >
            {rangoAnios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative w-full sm:w-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={busqueda}
          onChange={(e) => onChangeBusqueda(e.target.value)}
          className="pl-10 pr-3 py-2 w-full sm:w-72 border border-blue-200 rounded-full outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
};

export default CalendarioHeader;
