import React from 'react';

export default function Mapa() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-8 p-6 mb-20 bg-white rounded-lg shadow">
      
      {/* Sección de Mapa */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-blue-500 inline-block">Nuevo Chimbote</h2>
        <img
          src="/mapa_nvo.png"
          alt="Mapa de Nuevo Chimbote"
          className="rounded-lg border w-full h-auto"
        />
        <p className="text-sm text-gray-500 mt-2">Datos del mapa ©2024</p>
      </div>

      {/* Sección de Información */}
      <div className="w-full lg:w-[320px] bg-gray-50 p-6 rounded-lg shadow mt-10">
        <h3 className="text-xl font-bold mb-4">Sobre Nuevo Chimbote</h3>
        <p className="text-sm text-gray-700 mb-4">
          Nuevo Chimbote es un distrito peruano ubicado en la provincia del Santa,
          departamento de Áncash. Fue creado el 27 de mayo de 1994 mediante Ley N° 26318.
        </p>
        <ul className="text-sm text-gray-800 space-y-2">
          <li><strong>Superficie:</strong> 389.73 km²</li>
          <li><strong>Altitud:</strong> 12 m s. n. m.</li>
          <li><strong>Población:</strong> 151,127 hab.</li>
          <li><strong>Fundación:</strong> 27 de mayo de 1994</li>
        </ul>
        <a href="https://www.distrito.pe/distrito-nuevo-chimbote.html" className="text-orange-600 text-sm font-medium mt-4 inline-block">
          Más información →
        </a>
      </div>
    </div>
  );
}
