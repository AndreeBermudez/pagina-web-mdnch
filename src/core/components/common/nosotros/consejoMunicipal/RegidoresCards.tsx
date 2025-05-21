import React from "react";

interface Regidor {
  id: number;
  numero: number;
  cargo: string;
  nombre: string;
  foto: string;
  comisiones: {
    nombre: string;
    cargo: string;
  }[];
  equipo: {
    nombre: string;
    cargo: string;
  }[];
}

interface RegidoresCardsProps {
  regidores: Regidor[];
}

export default function RegidoresCards({ regidores }: RegidoresCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20 mb-20">
      {regidores.map((r) => (
        <div key={r.id} className="regidor-card relative group perspective w-full h-96 overflow-hidden shadow border-gray-100 rounded-lg">
          {/* Frente */}
          <div className="card-front absolute inset-0 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
            <div className="card-image relative h-2/3 bg-gray-200 overflow-hidden">
              <img src={r.foto} alt={r.nombre} className="w-full h-full object-cover" />
              <div className="card-number absolute top-4 right-4 bg-yellow-400 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
                {r.numero}
              </div>
            </div>
            <div className="card-content h-1/3 bg-white p-4 flex flex-col justify-center">
              <h3 className="card-title text-lg font-bold">{r.cargo}</h3>
              <p className="card-name text-gray-600 truncate">{r.nombre}</p>
              <p className="card-commission text-yellow-700 text-sm mt-1 truncate">
                {r.comisiones.length > 0
                  ? r.comisiones[0].nombre
                  : 'Sin comisión asignada'}
              </p>
            </div>
          </div>

          {/* Reverso */}
          <div className="card-back absolute inset-0 bg-gray-100/25 text-white p-6 flex flex-col rounded-2xl opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
          
            {/* Nombre y cargo */}
            <h3 className="text-xl font-bold mb-1 text-center leading-tight text-black">{r.nombre}</h3>
            <div className="flex justify-center">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
                {r.cargo} 
              </span>
            </div>
            {/* Comisiones */}
            <div className="flex items-center gap-2 mb-1 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6M9 11h6M9 15h6" />
              </svg>
              <h4 className="font-bold text-base text-blue-500 ">Comisiones:</h4>
            </div>
            {r.comisiones.length > 0 && (
              <div className="bg-blue-100 border-blue-500 rounded-lg px-3 py-2 ">
                <div className="font-medium text-black ">{r.comisiones[0].nombre}</div>
                {r.comisiones[0].cargo && (
                  <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                    {r.comisiones[0].cargo}
                  </span>
                )}
              </div>
            )}
            {/* Equipo de trabajo */}
            <div className="flex items-center gap-2 mb-1 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600"  fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h4 className="font-bold text-base text-blue-600">Equipo de trabajo:</h4>
            </div>
            <div className="flex flex-col gap-2">
              {r.equipo.map((m, i) => (
                <div key={i} className="flex items-center bg-gray-200/40 rounded-lg border border-blue-200 px-3 py-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                         viewBox="0 0 24 24" stroke="blue" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium text-black">{m.nombre}</span>
               
                  <span className="ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
