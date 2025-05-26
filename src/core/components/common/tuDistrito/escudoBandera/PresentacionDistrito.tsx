import React from 'react';
import { info } from './info';

export default function PresentacionDistrito() {
  const { escudoUrl, banderaUrl, title, description } = info[0];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Cards de Escudo y Bandera */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Card Escudo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transform transition-transform hover:scale-105">
          <div className="w-56 h-56 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={escudoUrl}
              alt="Escudo de Nuevo Chimbote"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-gray-800">Escudo</h3>
        </div>

        {/* Card Bandera */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transform transition-transform hover:scale-105">
          <div className="w-56 h-56 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={banderaUrl}
              alt="Bandera de Nuevo Chimbote"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-gray-800">Bandera</h3>
        </div>
      </div>

      {/* Card de Título y Descripción */}
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {title}
        </h2>
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-gray-600 text-lg leading-relaxed text-justify">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
