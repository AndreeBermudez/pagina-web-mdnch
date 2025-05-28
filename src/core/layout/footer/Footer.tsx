import { ArrowUpRight, Clock, Facebook, Instagram, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import logo from '../../../assets/logo.webp';

export const Footer = () => {

	const normasDocumentos = ['Documentos De Gestión', 'Normas Y Documentos Legales', 'Informes Y Publicaciones'];

	return (
		<footer className='w-full bg-gray-900 text-gray-300 relative pt-16 pb-4'>
			{/* Logo flotante en la parte superior */}
			<div className='absolute left-1/2 transform -translate-x-1/2 -top-12'>
				<div className='w-24 h-24 bg-gray-900 rounded-full p-2 border-4 border-gray-900 flex items-center justify-center'>
					<img
						src={logo}
						alt='Logo Municipalidad de Nuevo Chimbote'
						width='80'
						height='80'
						className='object-contain'
					/>
				</div>
			</div>

			{/* Nombre en la parte superior */}
			<div className='flex flex-col items-center mb-10'>
				<h2 className='text-2xl font-bold text-white'>Municipalidad de Nuevo Chimbote</h2>
				<div className='h-1 w-20 bg-blue-700 mt-3 mb-2'></div>
				<p className='text-gray-400'>Trabajando por el desarrollo</p>
			</div>

			{/* Línea divisoria */}
			<div className='h-px bg-gray-700 mb-10'></div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
				{/* Contacto */}
				<div className='flex flex-col'>
					<h3 className='text-xl font-bold text-white mb-6 pb-2 border-b border-blue-700 inline-block'>
						Contacto
					</h3>

					<div className='space-y-4'>
						<div className='flex items-start'>
							<Clock className='w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0' />
							<div>
								<h4 className='font-bold text-white text-sm'>Horario de atención:</h4>
								<p>Lun - Vie: 08:30am - 05:15pm</p>
							</div>
						</div>

						<div className='flex items-start'>
							<MapPin className='w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0' />
							<div>
								<h4 className='font-bold text-white text-sm'>Dirección:</h4>
								<p>Centro Cívico S/N - Nuevo Chimbote</p>
								<p className='mt-1'>Jr. Enrique Palacios 343</p>
							</div>
						</div>

						<div className='flex items-start'>
							<Phone className='w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0' />
							<div>
								<h4 className='font-bold text-white text-sm'>Teléfono:</h4>
								<p>043-313000</p>
								<p>043-321331</p>
							</div>
						</div>
					</div>
				</div>

				{/* Emergencias */}
				<div className='flex flex-col'>
					<h3 className='text-xl font-bold text-white mb-6 pb-2 border-b border-blue-700 inline-block'>
						Emergencias
					</h3>

					<div className='space-y-4'>
						<div className='p-3 bg-gray-800 rounded-lg'>
							<h4 className='font-bold text-white text-sm mb-1'>Serenazgo</h4>
							<p className='flex items-center'>
								<Phone className='w-4 h-4 text-yellow-500 mr-2' />
								(043) 635544
							</p>
							<p className='flex items-center'>
								<Phone className='w-4 h-4 text-yellow-500 mr-2' />
								914782543
							</p>
							<p className='flex items-center'>
								<Phone className='w-4 h-4 text-yellow-500 mr-2' />
								914782677
							</p>
						</div>

						<div className='p-3 bg-gray-800 rounded-lg'>
							<h4 className='font-bold text-white text-sm mb-1'>Policía Chimbote</h4>
							<p className='flex items-center'>
								<Phone className='w-4 h-4 text-yellow-500 mr-2' />
								(043) 323380
							</p>
						</div>

						<div className='p-3 bg-gray-800 rounded-lg'>
							<h4 className='font-bold text-white text-sm mb-1'>Bomberos Chimbote</h4>
							<p className='flex items-center'>
								<Phone className='w-4 h-4 text-yellow-500 mr-2' />
								(043) 341569
							</p>
						</div>

						<div className='p-3 bg-gray-800 rounded-lg'>
							<h4 className='font-bold text-white text-sm mb-1'>Emergencia de Seguridad</h4>
							<p className='flex items-center'>
								<Phone className='w-4 h-4 text-yellow-500 mr-2' />
								+51 932321527 (WhatsApp)
							</p>
						</div>
					</div>
				</div>

		
				{/* Normas y documentos */}
				<div className='flex flex-col'>
					<h3 className='text-xl font-bold text-white mb-6 pb-2 border-b border-blue-700 inline-block'>
						Normas y documentos
					</h3>

					<ul className='space-y-3 mb-8'>
						{normasDocumentos.map((item, index) => (
							<li key={index}>
								<a href='#' className='flex items-center group hover:text-white transition-colors duration-200'>
									<span className='w-2 h-2 bg-yellow-500 rounded-full mr-3 group-hover:w-3 transition-all duration-200'></span>
									{item}
									<ArrowUpRight className='w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
								</a>
							</li>
						))}
					</ul>

					<div>
						<h4 className='font-bold text-white mb-4'>SÍGUENOS EN:</h4>
						<div className='flex gap-3'>
							<a
								href='#'
								className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300'>
								<Facebook className='w-5 h-5' />
							</a>
							<a
								href='#'
								className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 transition-colors duration-300'>
								<Instagram className='w-5 h-5' />
							</a>
							<a
								href='#'
								className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300'>
								<Youtube className='w-5 h-5' />
							</a>
							<a
								href='#'
								className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 transition-colors duration-300'>
								<Twitter className='w-5 h-5' />
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Línea divisoria */}
			<div className='h-px bg-gray-700 my-8'></div>

			{/* Copyright */}
			<div className='flex flex-col md:flex-row justify-between items-center'>
				<p className='text-sm mb-4 md:mb-0'>© Copyright 2025 - GAMBARU | Todos los derechos reservados.</p>

				<div className='flex items-center'>
					<p className='text-sm mr-4'>Desarrollado con ❤️ para los ciudadanos</p>
				</div>
			</div>
		</footer>
	);
};
