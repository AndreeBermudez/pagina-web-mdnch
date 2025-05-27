import { motion } from 'framer-motion';
import { Home, Building2, ClipboardList } from 'lucide-react';

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.1 },
	transition: { duration: 0.5 },
};

export default function LicenciaEdificacion() {
	return (
		<motion.div className='container mx-auto px-4 py-8 max-w-5xl' initial='initial' animate='animate'>
			{/* Introducción */}
			<motion.div className='bg-white rounded-lg p-6 mb-12 border-l-4 border-blue-500' variants={fadeInUp}>
				<div className='flex items-center gap-3 mb-4'>
					<Home className='w-6 h-6 text-blue-600' />
					<h3 className='text-xl font-semibold text-gray-800'>Licencia de Edificación</h3>
				</div>
				<p className='text-gray-600'>
					Si quieres construir, ampliar, remodelar o demoler tu casa o local, debes pedir una licencia de
					edificación a la municipalidad de tu distrito.
				</p>
			</motion.div>

			{/* Tipos de Edificaciones */}
			<div className='mb-12'>
				<motion.h2 className='text-2xl font-bold text-gray-800 mb-6' variants={fadeInUp}>
					Tipos de Edificaciones - Modalidad A
				</motion.h2>

				<motion.div className='bg-white rounded-lg p-6 border-l-4 border-blue-500' variants={fadeInUp}>
					<div className='flex items-center gap-3 mb-4'>
						<Building2 className='w-6 h-6 text-blue-600' />
						<h3 className='font-bold text-gray-800'>Obras incluidas</h3>
					</div>
					<ul className='space-y-4 text-gray-600'>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>Construcción nueva de vivienda unifamiliar de hasta 120 m2.</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>Ampliación de vivienda con licencia de edificación de hasta 200 m2.</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>Ampliaciones y remodelaciones consideradas obras menores de menos de 30 m2.</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>Remodelaciones sin modificaciones estructurales ni aumento de área construida.</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>Cerco perimétrico de 20 metros lineales o más.</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>
								Demolición total de edificaciones de menos de 3 pisos, que no cuenten con semisótanos ni sótanos.
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<span>•</span>
							<span>Obras de carácter militar, policial y establecimientos penitenciarios.</span>
						</li>
					</ul>
				</motion.div>
			</div>

			{/* Vigencia */}
			<motion.div className='bg-white rounded-lg p-6 border-l-4 border-green-500' variants={fadeInUp}>
				<div className='flex items-center gap-3 mb-4'>
					<ClipboardList className='w-6 h-6 text-green-600' />
					<h3 className='font-bold text-gray-800'>Vigencia</h3>
				</div>
				<div className='space-y-4 text-gray-600'>
					<p>
						En esta modalidad, el cargo de ingreso del expediente es la licencia de edificación. Este documento
						tiene una vigencia de 36 meses, contados a partir de la fecha de emisión, con una única prórroga de 12
						meses adicionales.
					</p>
					<p className='text-sm text-gray-500 italic'>
						La prórroga debes solicitarla 30 días antes del vencimiento de la vigencia original.
					</p>
				</div>
			</motion.div>
		</motion.div>
	);
}
