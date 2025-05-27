import { FileText, AlertTriangle, MoveRight } from 'lucide-react';

export default function LibroReclamaciones() {
	return (
		<div className=''>
			
			{/* Main Content Section */}
			<section className=' px-4 '>
				<div className='container mx-auto max-w-6xl'>
					{/* Información del servicio */}
					<div className='bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
							{/* Qué puedes reclamar */}
							<div className='space-y-6'>
								<div className='flex items-center gap-4 mb-6'>
									<div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
										<AlertTriangle className='w-6 h-6 text-red-600' />
									</div>
									<h2 className='text-2xl font-bold text-gray-800 uppercase tracking-wide'>¿Qué Reclamar?</h2>
								</div>
								<p className='text-gray-600 leading-relaxed text-lg mb-4'>
									Presenta tus quejas y reclamos sobre los servicios municipales de Nuevo Chimbote:
								</p>
								<ul className='text-gray-600 space-y-2'>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
										<span>Limpieza pública y recojo de basura</span>
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
										<span>Obras públicas y mantenimiento de vías</span>
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
										<span>Trámites administrativos y atención al ciudadano</span>
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
										<span>Servicios de parques y jardines</span>
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
										<span>Licencias y permisos municipales</span>
									</li>
								</ul>
							</div>

							{/* Proceso oficial */}
							<div className='space-y-6'>
								<div className='flex items-center gap-4 mb-6'>
									<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
										<FileText className='w-6 h-6 text-blue-600' />
									</div>
									<h2 className='text-2xl font-bold text-gray-800 uppercase tracking-wide'>Proceso Oficial</h2>
								</div>
								<p className='text-gray-600 leading-relaxed text-lg'>
									Tu reclamo será registrado en la plataforma oficial del Estado Peruano (gob.pe),
									garantizando transparencia y seguimiento completo. La Municipalidad de Nuevo Chimbote se
									compromete a brindar una respuesta oportuna y efectiva a todas las solicitudes ciudadanas.
								</p>
								<div className='bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg'>
									<p className='text-blue-800 font-medium'>Plataforma oficial del gobierno peruano</p>
								</div>
							</div>
						</div>
					</div>

					{/* Call to Action */}
					<div className='bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center'>
						<div className='max-w-3xl mx-auto'>
							<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
								<FileText className='w-8 h-8 text-red-600' />
							</div>

							<h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>
								Presenta tu reclamo oficial
							</h3>

							<p className='text-lg text-gray-600 mb-8'>
								Ingrese en el siguiente enlace para acceder al formulario oficial del gobierno peruano y
								registrar su queja sobre los servicios municipales de Nuevo Chimbote.
							</p>

							<a
								href='https://reclamos.servicios.gob.pe/?institution_id=1311'
								target='_blank'
								rel='noopener noreferrer'
								className='group inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg'>
								<span>INGRESAR AQUÍ</span>
								<MoveRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
							</a>

							<div className='mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-500'>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span>Plataforma oficial gob.pe</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-green-500 rounded-full'></div>
									<span>Seguimiento garantizado</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-red-500 rounded-full'></div>
									<span>Respuesta oficial</span>
								</div>
							</div>

							<div className='mt-6 text-xs text-gray-400'>
								Al hacer clic serás redirigido a la plataforma oficial del Estado Peruano
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
