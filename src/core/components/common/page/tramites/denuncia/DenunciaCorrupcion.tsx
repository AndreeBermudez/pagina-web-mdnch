import { Phone, Shield, AlertTriangle } from 'lucide-react';

export default function DenunciaCorrupcionPage() {
	return (
		<section className='py-12 px-4 '>
			<div className='max-w-4xl mx-auto'>
				<div className='bg-white rounded-2xl border-2 border-blue-200 shadow-lg p-8'>
					<div className='text-center space-y-6'>
						{/* Header with icon */}
						<div className='flex justify-center items-center gap-3 mb-6'>
							<Shield className='h-8 w-8 text-blue-600' />
							<AlertTriangle className='h-8 w-8 text-red-500' />
						</div>

						{/* Main title */}
						<h2 className='text-2xl md:text-3xl font-bold text-gray-900 leading-tight'>
							DENUNCIA CONTRA LA CORRUPCIÓN
						</h2>

						{/* Subtitle */}
						<p className='text-lg text-gray-700 max-w-2xl mx-auto'>
							Tu denuncia es importante para mantener la transparencia en nuestra municipalidad
						</p>

						{/* Phone number section */}
						<div className='bg-blue-50 rounded-lg p-6 border border-blue-200'>
							<p className='text-xl font-semibold text-gray-800 mb-4'>LLAMANDO AL</p>
							<div className='flex justify-center items-center gap-3'>
								<Phone className='h-6 w-6 text-blue-600' />
								<a
									href='tel:970385757'
									className='text-3xl md:text-4xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200'>
									970 385 757
								</a>
							</div>
						</div>

						{/* Call to action button */}
						<a
							href='tel:970385757'
							className='inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded transition-colors duration-200'>
							<Phone className='mr-2 h-5 w-5' />
							Llamar Ahora
						</a>

						{/* Additional information */}
						<div className='mt-8 pt-6 border-t border-gray-200'>
							<p className='text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed'>
								Las denuncias son confidenciales y anónimas. Contribuye a construir una ciudad más transparente y
								justa. Horario de atención: Lunes a Viernes de 8:00 AM a 6:00 PM
							</p>
						</div>

						{/* Municipal logo */}
						<div className='flex justify-center mt-6'>
							<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
								<Shield className='h-8 w-8 text-blue-600' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
