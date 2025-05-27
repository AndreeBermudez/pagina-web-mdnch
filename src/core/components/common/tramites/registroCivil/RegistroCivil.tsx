import React from 'react';
import { Target, Award, Baby, Users, UserPlus, UserCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegistroCivil() {
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.1 },
		transition: { duration: 0.5 },
	};

	return (
		<div className='container mx-auto px-4 py-8 max-w-5xl'>
			{/* Misión y Visión */}
			<div className='grid md:grid-cols-2 gap-6 mb-12'>
				{/* Misión */}
				<motion.div className='bg-white rounded-lg p-6 border-t-4 border-yellow-500 shadow-sm' {...fadeInUp}>
					<div className='flex items-center gap-3 mb-4'>
						<Target className='w-6 h-6 text-yellow-600' />
						<h3 className='text-xl font-semibold text-gray-800'>Misión</h3>
					</div>
					<p className='text-gray-600'>
						Promocionar la importancia de los Hechos Vitales y las funciones del Equipo Funcional de Registro
						Civil.
					</p>
				</motion.div>

				{/* Visión */}
				<motion.div className='bg-white rounded-lg p-6 border-t-4 border-yellow-500 shadow-sm' {...fadeInUp}>
					<div className='flex items-center gap-3 mb-4'>
						<Award className='w-6 h-6 text-yellow-600' />
						<h3 className='text-xl font-semibold text-gray-800'>Visión</h3>
					</div>
					<p className='text-gray-600'>
						Prestar servicios registrales con calidad y eficacia en los Hechos Vitales de nacimiento, matrimonio,
						defunción, rectificaciones y otros.
					</p>
				</motion.div>
			</div>

			{/* Objetivos */}
			<div className='mb-12'>
				<motion.h2 className='text-2xl font-bold text-gray-800 mb-6' {...fadeInUp}>
					Objetivos
				</motion.h2>

				{/* Objetivo General */}
				<motion.div className='bg-white rounded-lg p-6 mb-6 border-l-4 border-blue-500' {...fadeInUp}>
					<h3 className='font-bold text-gray-800 mb-3'>Objetivo General</h3>
					<p className='text-gray-600'>
						Cumplir los lineamientos establecidos por RENIEC y los documentos de gestión de la Municipalidad
						Distrital de Ciudad Nueva.
					</p>
				</motion.div>

				{/* Objetivos Específicos */}
				<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' {...fadeInUp}>
					<h3 className='font-bold text-gray-800 mb-3'>Objetivos Específicos</h3>
					<ul className='space-y-2 text-gray-600'>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>Registrar los hechos vitales y otorgar las actas correspondientes.</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>
								Celebrar matrimonios civiles individuales y colectivos, conforme a las disposiciones de RENIEC.
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>
								Expedir constancias o certificados de nacimiento, matrimonio, defunción, viudez, soltería,
								disolución matrimonial y constancia de no inscripción.
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>
								Brindar orientación y atención de consultas sobre identidad y funciones propias del Registro Civil.
							</span>
						</li>
					</ul>
				</motion.div>
			</div>

			{/* Servicios y Actividades */}
			<div>
				<motion.h2 className='text-2xl font-bold text-gray-800 mb-6' {...fadeInUp}>
					Servicios y Actividades
				</motion.h2>
				<div className='space-y-6'>
					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' {...fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<Baby className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>1. Inscripción Ordinaria de Nacimiento</h3>
						</div>
						<ul className='space-y-2 text-gray-600'>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Certificado de nacimiento expedido por hospital o centro de salud</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>DNI de los padres</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Partida de matrimonio (si los padres son casados)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Carné de extranjería o pasaporte (si aplica)</span>
							</li>
						</ul>
					</motion.div>

					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' {...fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<Users className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>
								2. Inscripción Extraordinaria de Nacimiento de Menor de Edad
							</h3>
						</div>
						<ul className='space-y-2 text-gray-600'>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Certificado o constancia de nacimiento</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Copia de DNI de solicitantes y testigos (autenticados por fedatario)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Declaración indicando que el menor no ha sido inscrito</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Partida de matrimonio de los padres (si aplica)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Carné de extranjería o pasaporte (si aplica)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>
									En caso de no contar con los documentos anteriores: presentar partida de bautismo, certificado de
									matrícula escolar o declaración de dos personas ante el registrador
								</span>
							</li>
						</ul>
					</motion.div>

					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' {...fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<UserPlus className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>
								3. Inscripción Extraordinaria de Nacimiento de Mayor de Edad
							</h3>
						</div>
						<ul className='space-y-2 text-gray-600'>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Formato de declaración jurada de no inscripción</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>
									Documentos que acrediten el nacimiento (certificado médico, partida de bautismo, constancia de
									estudios o trabajo, antecedentes policiales, homologación de huella PNP o declaración jurada)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Copia de DNI de los padres y testigos (si aplica)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Para curadores: Resolución judicial de interdicción y designación</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Para padres: DNI y autorización firmada por el mayor a reconocer</span>
							</li>
						</ul>
					</motion.div>

					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' {...fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<UserCheck className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>4. Inscripción de Nacimiento con Presunto Progenitor</h3>
						</div>
						<ul className='space-y-2 text-gray-600'>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Certificado de nacido vivo, partida de bautismo o ficha de matrícula</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Presencia y DNI autenticado de la madre</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Declaración jurada del progenitor</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Partida de matrimonio (si aplica)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Certificado de inscripción RENIEC del presunto progenitor</span>
							</li>
						</ul>
					</motion.div>

					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' {...fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<Heart className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>5. Matrimonio Civil Ordinario</h3>
						</div>
						<ul className='space-y-2 text-gray-600'>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Formulario de pliego matrimonial</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Partidas de nacimiento (no más de 30 días de antigüedad)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Copia de DNI con constancia de votación (legalizada notarialmente)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Declaración jurada de soltería (firma legalizada)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Certificado de domicilio (uno de los contrayentes debe vivir en Ciudad Nueva)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Certificado médico y consejería ETS/SIDA (vigencia máxima 30 días)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Copia de DNI de dos testigos mayores de edad (legalizados)</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Constancia de publicación del edicto matrimonial o dispensa de publicación</span>
							</li>
						</ul>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
