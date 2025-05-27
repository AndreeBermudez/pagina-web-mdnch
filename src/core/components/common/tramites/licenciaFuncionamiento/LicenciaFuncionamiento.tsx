import { motion } from 'framer-motion';
import { FileText, Target, Building2, ClipboardCheck } from 'lucide-react';

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.1 },
	transition: { duration: 0.5, staggerChildren: 0.1 },
};

export default function LicenciaFuncionamiento() {
	return (
		<motion.div className='container mx-auto px-4 py-8 max-w-5xl' initial='initial' animate='animate'>
			{/* Requisitos Principales */}
			<div className='mb-12'>
				<motion.h2 className='text-2xl font-bold text-gray-800 mb-6' variants={fadeInUp}>
					Requisitos
				</motion.h2>

				<div className='grid md:grid-cols-3 gap-6'>
					{/* Requisitos Básicos */}
					<motion.div className='bg-white rounded-lg p-6 border-t-4 border-blue-500 shadow-sm' variants={fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<FileText className='w-6 h-6 text-blue-600' />
							<h3 className='text-xl font-semibold text-gray-800'>Requisitos Básicos</h3>
						</div>
						<ul className='space-y-2 text-gray-600'>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Número de RUC</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>
									Título profesional y estar habilitado por el colegio profesional correspondiente, en el caso de
									servicios relacionados con la salud.
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>Vigencia de poder, cuando se trate de personas jurídicas</span>
							</li>
							<li className='flex items-start gap-2'>
								<span>•</span>
								<span>De ser apoderado, carta poder simple firmada por el poderdante</span>
							</li>
						</ul>
					</motion.div>

					{/* Autorización Sectorial */}
					<motion.div
						className='bg-white rounded-lg p-6 border-t-4 border-green-500 shadow-sm'
						variants={fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<Building2 className='w-6 h-6 text-green-600' />
							<h3 className='text-xl font-semibold text-gray-800'>Autorización Sectorial</h3>
						</div>
						<p className='text-gray-600 mb-4'>
							Contar con autorización sectorial respectiva en los casos de actividades comerciales que la requieren
							previo al otorgamiento de la Licencia de Funcionamiento.
						</p>
						<p className='text-gray-600'>
							Como, por ejemplo, para los negocios de boticas o farmacias, se requiere Resolución de la DIRESA;
							para instituciones educativas, Resolución de DRE-UGEL.
						</p>
					</motion.div>

					{/* Patrimonio Cultural */}
					<motion.div
						className='bg-white rounded-lg p-6 border-t-4 border-amber-500 shadow-sm'
						variants={fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<Target className='w-6 h-6 text-amber-600' />
							<h3 className='text-xl font-semibold text-gray-800'>Patrimonio Cultural</h3>
						</div>
						<p className='text-gray-600'>
							Para inmuebles declarados Monumento del Patrimonio Cultural: Copia simple de la autorización expedida
							por el Ministerio de Cultura, conforme a la Ley 28296, Ley General del Patrimonio Cultural de la
							Nación, excepto en los casos en que el Ministerio de Cultura haya participado en las etapas de
							remodelación y monitoreo de ejecución de obras previas inmediatas a la solicitud de la licencia del
							local.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Proceso paso a paso */}
			<div>
				<motion.h2 className='text-2xl font-bold text-gray-800 mb-6' variants={fadeInUp}>
					Proceso paso a paso
				</motion.h2>

				<div className='space-y-6'>
					{/* Paso 1 */}
					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' variants={fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<ClipboardCheck className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>1. Diríjase a la municipalidad</h3>
						</div>
						<p className='text-gray-600'>
							Acérquese a la oficina de la Sub Gerencia de Comercio, Licencias y Promoción Empresarial, ubicado en
							Centro Cívico S/N, Nuevo Chimbote, de lunes a viernes de 8:00 am a 1:00 pm y de 2:00 pm a 4:30 pm y
							complete los formularios. Recuerde que el personal de comercio y defensa civil lo guiarán en este
							procedimiento.
						</p>
					</motion.div>

					{/* Paso 2 */}
					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' variants={fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<ClipboardCheck className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>2. Realiza el pago</h3>
						</div>
						<p className='text-gray-600 mb-4'>
							El costo será evaluado por la Subgerencia de Gestión del Riesgo de Desastres y Defensa Civil, en
							función a la matriz de nivel de riesgo, aprobado por Decreto Supremo N° 002-2018-PCM y su reglamento.
						</p>
						<div className='bg-gray-50 p-4 rounded-lg'>
							<h4 className='font-semibold text-gray-700 mb-2'>Costos según nivel de riesgo:</h4>
							<ul className='space-y-2'>
								<li className='flex justify-between text-gray-600'>
									<span>Riesgo Bajo</span>
									<span>S/. 215.6</span>
								</li>
								<li className='flex justify-between text-gray-600'>
									<span>Riesgo Medio</span>
									<span>S/. 384.1</span>
								</li>
								<li className='flex justify-between text-gray-600'>
									<span>Riesgo Alto</span>
									<span>S/. 778.5</span>
								</li>
								<li className='flex justify-between text-gray-600'>
									<span>Riesgo Muy Alto</span>
									<span>S/. 1370.1</span>
								</li>
							</ul>
							<p className='text-sm text-gray-500 mt-2 italic'>
								El monto incluye derecho de trámite de Licencia e ITSE
							</p>
						</div>
					</motion.div>

					{/* Paso 3 */}
					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' variants={fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<ClipboardCheck className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>3. Presenta tus documentos</h3>
						</div>
						<p className='text-gray-600'>
							Ingresa por mesa de partes los formatos de solicitud de licencia e inspección técnica de seguridad en
							edificaciones, constancia de pago. Posterior a ello, recibirás una hoja de trámite del cual podrás
							realizar seguimiento.
						</p>
					</motion.div>

					{/* Paso 4 */}
					<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' variants={fadeInUp}>
						<div className='flex items-center gap-3 mb-4'>
							<ClipboardCheck className='w-6 h-6 text-blue-600' />
							<h3 className='font-bold text-gray-800'>4. Obtén tu licencia</h3>
						</div>
						<p className='text-gray-600'>
							En un plazo de 2 días hábiles, regresa a la oficina de la Sub Gerencia de Comercio, dentro del
							horario de atención para recoger tu licencia.
						</p>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
