import React, { useEffect, useState } from 'react';
import { useTurismoQuery } from '../../../../../../features/administrador/turismo-admin/hooks/useTurismoQuery';

export default function TurismoPage() {
	const [showAll, setShowAll] = useState(false);
	const { turismo, isLoading, refetch } = useTurismoQuery();

	useEffect(() => {
		refetch();
	}, [refetch]);

	// Muestra solo los primeros 3 o todos según el estado
	const displayedLugares = showAll ? turismo : turismo.slice(0, 3);

	return (
		<div className='flex min-h-screen flex-col'>
			{/* Hero Section */}
			<section className='relative h-[70vh] w-full'>
				<img src='/catedral.jpg' alt='imagen ejemplo' className='object-cover w-full h-full' />
				<div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50'>
					<h1 className='mb-4 text-4xl font-bold sm:text-5xl md:text-6xl'>Descubre Nuevo Chimbote</h1>
					<p className='mb-6 max-w-2xl px-4 text-lg sm:text-xl'>
						Conoce los rincones más bonitos de Nuevo Chimbote que no puedes perderte cuando vengas de visita.
					</p>
					<div className='flex flex-wrap justify-center gap-4'>
						<a href='https://maps.app.goo.gl/a6GcRUiQsp1ytC4n6'>
							<button className='cursor-pointer px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-md text-white text-lg'>
								¿Cómo llegar?
							</button>
						</a>
					</div>
				</div>
			</section>

			{/* Información Rápida */}
			<section className='bg-blue-50 py-8'>
				<div className='container mx-auto grid grid-cols-2 gap-3 justify-items-center px-4 md:grid-cols-4'>
					<div className='flex items-center gap-2 text-blue-600'>
						<span className='text-xl'>📍</span>
						<span>Centro histórico accesible</span>
					</div>
					<div className='flex items-center gap-2 text-blue-600'>
						<span className='text-xl'>📅</span>
						<span>Mejor época: Primavera-Otoño</span>
					</div>
					<div className='flex items-center gap-2 text-blue-600'>
						<span className='text-xl'>☀️</span>
						<span>Clima templado</span>
					</div>
					<div className='flex items-center gap-2 text-blue-600'>
						<span className='text-xl'>ℹ️</span>
						<span>Idioma: Español</span>
					</div>
				</div>
			</section>

			{/* Lugares Destacados */}
			<section className='py-16'>
				<div className='container mx-auto px-4'>
					<h2 className='mb-2 text-center text-3xl font-bold'>Lugares Turísticos Destacados</h2>
					<p className='mb-12 text-center text-gray-600'>
						Explora los sitios más emblemáticos que no puedes dejar de visitar
					</p>

					{isLoading ? (
						<div className="flex justify-center items-center py-10">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
						</div>
					) : (
						<>
							<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
								{displayedLugares.map((lugar) => (
									<div key={lugar.turismoId} className='overflow-hidden rounded-lg shadow-lg'>
										<img
											src={lugar.direccionImagen}
											alt={lugar.titulo}
											className='object-cover w-full h-64 transition-transform hover:scale-105'
										/>
										<div className='p-6'>
											<h3 className='mb-2 text-xl font-bold'>{lugar.titulo}</h3>
											<p className='mb-4 text-gray-600'>{lugar.descripcion}</p>
											<div className='flex justify-between items-center text-sm text-gray-500'>
												<span className='flex items-center gap-1'>📍 {lugar.lugar}</span>
												<a href={lugar.ubicacion} className='font-medium text-blue-600 hover:underline'>
													Quiero ir !
												</a>
											</div>
										</div>
									</div>
								))}
							</div>

							{turismo.length > 3 && (
								<div className='mt-10 text-center'>
									<button
										onClick={() => setShowAll((prev) => !prev)}
										className='px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-md text-white text-lg cursor-pointer'>
										{showAll ? 'Ver menos lugares' : 'Ver todos los lugares'}
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</section>
		</div>
	);
}
