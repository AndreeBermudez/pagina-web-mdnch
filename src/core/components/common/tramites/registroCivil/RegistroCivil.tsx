import React from 'react';
import { MoveRight } from 'lucide-react';

interface ActivityCard {
    title: string;
    requirements: string[];
}

const activities: ActivityCard[] = [
    {
        title: "Inscripción Ordinaria de Nacimiento",
        requirements: [
            "Certificado de Nacimiento expedido por el Hospital o Centro de salud",
            "Mostrar el Documento de Identidad de los padres",
            "Partida de matrimonio, en el caso de que los padres sean casados",
            "En el caso de extranjeros presentar el carnet de extranjería o pasaporte"
        ]
    },
    {
        title: "Inscripción Extraordinaria de Nacimiento de Menor de Edad",
        requirements: [
            "Certificado de Nacimiento expedido por el Hospital o Centro de salud o constancia de nacimiento",
            "Copia de DNI de los solicitantes y de los testigos, de ser el caso autenticada por el fedatario",
            "Declaración del solicitante indicando que el menor no ha sido inscrito",
            "Partida de matrimonio de los padres, en el caso de ser casados",
            "En el caso de ser extranjeros presentar el carnet de extranjería o pasaporte",
            "En caso de contar con los documentos indicados en el numeral 1. Presentar partida de bautismo, Certificado de matricula escolar con la mención de grados cursados o declaración suscrita por dos personas en presencia del Registrador"
        ]
    },
    {
        title: "Inscripción Extraordinaria de Nacimiento de Mayor de Edad",
        requirements: [
            "Formato de declaración jurada de no inscripción para procedimiento de inscripción de inscripción extemporánea de nacimiento",
            "Certificado de nacimiento expedido por el Hospital, centro de salud, o Constancia de Nacimiento, o partida de Bautismo, o Constancia de estudios o de trabajo, o certificado de antecedentes policiales u homologación de huella dactilar efectuada por la PNP o declaración jurada suscrita por dos personas en presencia del registrador",
            "Copia de DNI delos padres y de los testigos, de ser el caso",
            "Cuando corresponda, según la persona que efectúa la solicitud:",
            "a) Curador: Resolución Judicial de interdicción del mayor de edad y de designación del curador",
            "b) Padres: Identificarse con el DNI, Autorización firmada por el mayor a reconocer ante el registro"
        ]
    },
    {
        title: "Inscripción de nacimiento con presunto progenitor",
        requirements: [
            "Certificado del nacido vivo, Partida de Bautismo, o ficha de matricula de estudios",
            "Presencia de la madre y copia del DNI de la madre autenticada por el fedatario",
            "Declaración jurada de ser padre o madre biológica del hijo, en el caso de que no figure el nombre del solicitante en la partida del nacimiento, o cuando exista errores en el nombre consignado en la partida de nacimiento",
            "Partida de matrimonio de los padres, en el caso de ser casados",
            "Certificado de inscripción emitido por RENIEC del presunto progenitor",
            "Formato de declaración jurada del presunto progenitor"
        ]
    },
    {
        title: "Celebración de Matrimonio Civil Ordinario de Menores y Mayores de edad",
        requirements: [
            "Formulario del pliego matrimonial",
            "Partidas de nacimiento en original con no mas de 30 días de antigüedad de ambos contrayentes",
            "Copia de DNI de los contrayentes, con la constancia de la ultima votación (legalizados notarialmente)",
            "Declaración Jurada de los contrayentes confirmando su estado civil de soltero con firma legalizada ante notario",
            "Certificado de domicilio de ambos contrayentes. Al menos uno de los contrayentes debe residir en la jurisdicción de la Md de Ciudad Nueva ( por notaria, juez de paz o municipalidad de la jurisdicción)",
            "Certificado Medico y Constancia de consejería ETS y SIDA de ambos (expedido en fecha de no mayor de 30 días)",
            "Copia de DNI de 02 testigos mayores de edad (legalizados notarialmente)",
            "Constancia de la publicación del edicto matrimonial, o de la dispensa de la publicación"
        ]
    }
];

export default function RegistroCivil() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Sección de Información General */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <p className="text-gray-600 mb-4">
                            La Oficina de Registro Civil de acuerdo al MOF (Manual de Organización y Funciones) y 
                            Organigrama de la Municipalidad, orgánicamente depende de Secretaria General de la 
                            Municipalidad Distrital de Nuevo Chimbote.
                        </p>
                    </div>

                    {/* Misión y Visión */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">Misión</h3>
                            <p className="text-gray-700">
                                Promocionar la importancia de Hechos Vitales y Funciones del Equipo Funcional de 
                                Registro Civil.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">Visión</h3>
                            <p className="text-gray-700">
                                Prestar servicios de acto Registrales de Calidad y eficacia en los Hechos Vitales de 
                                Nacimiento, Matrimonio, Defunción, Rectificaciones y Otros.
                            </p>
                        </div>
                    </div>

                    {/* Objetivos */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Objetivos</h3>
                        
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4">
                            <h4 className="font-bold text-gray-700 mb-2">General</h4>
                            <p className="text-gray-600">
                                Cumplir los Lineamientos Establecidos por el Reniec Documentos de Gestión de la 
                                Municipalidad Distrital de Ciudad Nueva.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h4 className="font-bold text-gray-700 mb-2">Específicos</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Registrar los Hechos Vitales y otorgar las actas correspondientes.</li>
                                <li>Celebrar Matrimonios Civiles, Individuales y Colectivos por el Alcalde conforme disposiciones emanadas del Reniec.</li>
                                <li>Expedir constancias o Certificado de Nacimiento, Matrimonios, defunciones, Viudez, Soltería, Disolución Matrimonial y constancia no Inscripción.</li>
                                <li>Orientación y Absolución de Consultas referente a identidad y funciones propias del Equipo Funcional de Registro Civil.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Actividades */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Actividades y Requisitos</h2>
                
                {activities.map((activity, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-blue-800 px-6 py-4">
                            <h3 className="text-xl font-bold text-white">{activity.title}</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                {activity.requirements.map((req, i) => (
                                    <div key={i} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                                        </div>
                                        <p className="text-gray-600">{req}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <a 
                    href="#contacto" 
                    className="inline-flex items-center gap-2 bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <span>Contáctanos para más información</span>
                    <MoveRight className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
}
