
import React from 'react';
import AlcaldeImage from '../../../../../assets/walterSoto.jpg';
import { FileSearch, Calendar, Target, Award, Users } from 'lucide-react';

const AlcaldeInfo: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen pt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 lg:pt-20 pb-12 relative">
        <div className="relative mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2158] inline-block relative">
            Conoce a Nuestro Alcalde
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-yellow-500" />
          </h1>
        </div>
        <div className="relative">
          <div className="bg-[#0a2158] rounded-lg shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 h-full relative">
                <img
                  src={AlcaldeImage}
                  alt="Alcalde Walter Jesús Soto Campos"
                  className="w-full h-full object-cover object-center lg:rounded-l-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2158]/40 to-transparent lg:bg-none" />
                <div className="absolute bottom-4 left-6 bg-yellow-500 text-[#0a2158] px-4 py-2 rounded-lg font-bold">
                  Periodo 2023 - 2026
                </div>
              </div>
              <div className="lg:col-span-7 p-8 md:p-10 relative">
                <div className="border-b border-slate-600 pb-4 mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    WALTER JESÚS SOTO CAMPOS
                  </h2>
                  <span className="text-amber-400 relative pl-4 before:absolute before:content-['-'] before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 text-lg font-semibold">
                    Alcalde Distrital de Nuevo Chimbote
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg mb-8">
                  Walter Jesús Soto Campos es el actual alcalde distrital de Nuevo Chimbote, comprometido con el desarrollo
                  y bienestar de su comunidad. Su gestión se enfoca en promover proyectos de infraestructura, educación y
                  seguridad ciudadana para mejorar la calidad de vida de los habitantes del distrito.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-[#071b4d] p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-2xl">120+</div>
                    <div className="text-slate-300 text-sm">Obras ejecutadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-2xl">30M</div>
                    <div className="text-slate-300 text-sm">Presupuesto gestionado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-2xl">85%</div>
                    <div className="text-slate-300 text-sm">Aprobación ciudadana</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-2xl">24/7</div>
                    <div className="text-slate-300 text-sm">Atención ciudadana</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <button className="py-3 px-6 bg-yellow-500 text-[#0a2158] rounded-lg font-bold shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-2">
                    <FileSearch className="w-5 h-5" />
                    Plan de gobierno
                  </button>
                  <button className="py-3 px-6 border-2 border-white text-white rounded-lg font-bold shadow-md hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Agenda del alcalde
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-yellow-500 rounded-xl -z-10 hidden lg:block" />
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 mr-3" />
              <h4 className="text-xl font-bold text-[#0a2158]">Experiencia</h4>
            </div>
            <p className="text-slate-600">Más de 15 años de experiencia en gestión pública y liderazgo comunitario.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 mr-3" />
              <h4 className="text-xl font-bold text-[#0a2158]">Reconocimientos</h4>
            </div>
            <p className="text-slate-600">Premiado por su transparencia y efectividad en la gestión municipal.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 mr-3" />
              <h4 className="text-xl font-bold text-[#0a2158]">Compromiso</h4>
            </div>
            <p className="text-slate-600">Dedicado a mejorar la calidad de vida y promover el desarrollo sostenible en Nuevo Chimbote.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlcaldeInfo;
