import { Download, Phone, Shield, CheckCircle, Clock, Heart, Backpack } from 'lucide-react';

export default function PlanFamiliarEmergencia() {
	return (
		<div className='container-municipalidad'>
			<div className='space-y-8'>
				<div className='bg-white rounded-2xl shadow-lg p-8'>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						<div>							
							<h2 className='text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left'>
							¿Qué debe contener tu mochila de emergencia?
						    </h2>
							<p className='text-gray-600 mb-8'>
								Prepara una mochila por cada miembro de la familia con suministros para al menos 72 horas.
							</p>

							<div className='grid sm:grid-cols-2 gap-6'>
								<div className='p-6 bg-blue-50 rounded-xl border border-blue-100'>
									<h4 className='font-semibold text-gray-800 mb-4'>Básicos</h4>
									<div className='space-y-3'>
										<div className='flex items-center'>
											<div className='p-1.5 bg-blue-100 rounded-full mr-3'>
												<CheckCircle className='w-4 h-4 text-blue-800' />
											</div>
											Agua (4 litros por persona)
										</div>
										<div className='flex items-center'>
											<div className='p-1.5 bg-blue-100 rounded-full mr-3'>
												<CheckCircle className='w-4 h-4 text-blue-800' />
											</div>
											Alimentos no perecibles
										</div>
										<div className='flex items-center'>
											<div className='p-1.5 bg-blue-100 rounded-full mr-3'>
												<CheckCircle className='w-4 h-4 text-blue-800' />
											</div>
											Linterna y pilas
										</div>
										<div className='flex items-center'>
											<div className='p-1.5 bg-blue-100 rounded-full mr-3'>
												<CheckCircle className='w-4 h-4 text-blue-800' />
											</div>
											Radio portátil
										</div>
									</div>
								</div>

								<div className='p-6 bg-blue-50 rounded-xl border border-blue-100'>
									<h4 className='font-semibold text-gray-800 mb-4'>Documentos</h4>
									<div className='space-y-3'>
										<div className='flex items-center'>
											<div className='p-1.5 bg-blue-100 rounded-full mr-3'>
												<CheckCircle className='w-4 h-4 text-blue-800' />
											</div>
											Copias de DNI
										</div>
										<div className='flex items-center'>
											<div className='p-1.5 bg-blue-100 rounded-full mr-3'>
												<CheckCircle className='w-4 h-4 text-blue-800' />
											</div>
											Medicamentos
										</div>
										<div className='flex items-center'>
											<div className='p-1.5 bg-blue-100 rounded-full mr-3'>
												<CheckCircle className='w-4 h-4 text-blue-800' />
											</div>
											Dinero en efectivo
										</div>
										<div className='flex items-center'>
											<div className='p-1.5 bg-blue-100 rounded-full mr-3'>
												<CheckCircle className='w-4 h-4 text-blue-800' />
											</div>
											Lista de contactos
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='relative'>
							<div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8 text-center'>
								<div className='w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-6'>
									<Backpack className='w-12 h-12 text-white' />
								</div>
								<h3 className='text-2xl font-bold text-gray-800 mb-4'>Mochila Lista para Emergencias</h3>
								<p className='text-gray-600 mb-6'>Revisa y actualiza el contenido cada 6 meses</p>
								<div className='flex items-center justify-center text-sm text-gray-500'>
									<Clock className='w-4 h-4 mr-2' />
									Última revisión: Mayo 2024
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Números de Emergencia */}
				<div className='bg-blue-800 rounded-2xl shadow-lg p-8'>
					<h3 className='text-3xl font-bold text-white text-center mb-8'>
						Números de Emergencia - Nuevo Chimbote
					</h3>
					<div className='grid sm:grid-cols-3 gap-6'>
						<div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center'>
							<div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Phone className='w-8 h-8 text-white' />
							</div>
							<div className='text-white font-bold text-2xl mb-1'>(043) 635544</div>
							<div className='text-blue-100'>Serenazgo</div>
						</div>
						<div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center'>
							<div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Heart className='w-8 h-8 text-white' />
							</div>
							<div className='text-white font-bold text-2xl mb-1'>116</div>
							<div className='text-blue-100'>SAMU - Salud</div>
						</div>
						<div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center'>
							<div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Shield className='w-8 h-8 text-white' />
							</div>
							<div className='text-white font-bold text-2xl mb-1'>(043) 341569</div>
							<div className='text-blue-100'>Bomberos</div>
						</div>
					</div>
				</div>

				{/* Call to Action Final */}
				<div className='bg-white rounded-2xl shadow-lg p-8 text-center'>
					<h3 className='text-3xl font-bold text-gray-800 mb-4'>Descarga tu Plan Familiar de Emergencia</h3>
					<p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
						Protege a tu familia con información actualizada y específica para Nuevo Chimbote 2024
					</p>
					<a
						href='/planFamiliar/PLANFAMILIAR.pdf'
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center bg-blue-800 hover:bg-blue-700 text-white font-bold px-8 py-4 text-lg rounded-md transition-colors'>
						<Download className='w-6 h-6 mr-3' />
						Descargar Plan Familiar PDF
					</a>
					<p className='text-gray-500 text-sm mt-4'>Documento gratuito • Actualizado 2024 • Fácil de imprimir</p>
				</div>
			</div>
		</div>
	);
}
