
import React from 'react';
import AlcaldeImage from '../../../../../../assets/walterSoto.jpg';
import { FileSearch, Calendar, Target, Award, Users } from 'lucide-react';

const AlcaldeInfo: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 ">
      <div className="container relative px-4 pt-10 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8 md:pt-16 lg:pt-10">
        <div className="relative">
          <div className="bg-[#0a2158] rounded-lg shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
              <div className="relative h-full lg:col-span-5">
                <img
                  src={AlcaldeImage}
                  alt="Alcalde Walter Jesús Soto Campos"
                  className="object-cover object-center w-full h-full lg:rounded-l-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2158]/40 to-transparent lg:bg-none" />
                <div className="absolute bottom-4 left-6 bg-yellow-500 text-[#0a2158] px-4 py-2 rounded-lg font-bold">
                  Periodo 2023 - 2026
                </div>
              </div>
              <div className="relative p-8 lg:col-span-7 md:p-10">
                <div className="pb-4 mb-6 border-b border-slate-600">
                  <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                    WALTER JESÚS SOTO CAMPOS
                  </h2>
                  <span className="text-amber-400 relative pl-4 before:absolute before:content-['-'] before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 text-lg font-semibold">
                    Alcalde Distrital de Nuevo Chimbote
                  </span>
                </div>
                <p className="mb-8 text-base leading-relaxed text-slate-300 md:text-lg">
                  Walter Jesús Soto Campos es el actual alcalde distrital de Nuevo Chimbote, comprometido con el desarrollo
                  y bienestar de su comunidad. Su gestión se enfoca en promover proyectos de infraestructura, educación y
                  seguridad ciudadana para mejorar la calidad de vida de los habitantes del distrito.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-[#071b4d] p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">120+</div>
                    <div className="text-sm text-slate-300">Obras ejecutadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">30M</div>
                    <div className="text-sm text-slate-300">Presupuesto gestionado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">85%</div>
                    <div className="text-sm text-slate-300">Aprobación ciudadana</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">24/7</div>
                    <div className="text-sm text-slate-300">Atención ciudadana</div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <button className="py-3 px-6 bg-yellow-500 text-[#0a2158] rounded-lg font-bold shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-2">
                    <FileSearch className="w-5 h-5" />
                    Plan de gobierno
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-colors border-2 border-white rounded-lg shadow-md hover:bg-white/10">
                    <Calendar className="w-5 h-5" />
                    Agenda del alcalde
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute hidden border-2 border-yellow-500 -top-4 -left-4 -right-4 -bottom-4 rounded-xl -z-10 lg:block" />
        </div>
        <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-3">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 mr-3" />
              <h4 className="text-xl font-bold text-[#0a2158]">Experiencia</h4>
            </div>
            <p className="text-slate-600">Más de 15 años de experiencia en gestión pública y liderazgo comunitario.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 mr-3" />
              <h4 className="text-xl font-bold text-[#0a2158]">Reconocimientos</h4>
            </div>
            <p className="text-slate-600">Premiado por su transparencia y efectividad en la gestión municipal.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md">
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
