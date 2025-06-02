import { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Funcionario } from './types';

interface DirectorioCardsProps {
	funcionarios: Funcionario[];
	cardsPerPage: number;
}

export default function DirectorioCards({ funcionarios, cardsPerPage }: DirectorioCardsProps) {
	const [currentPage, setCurrentPage] = useState(0);
	const totalPages = Math.ceil(funcionarios.length / cardsPerPage);
	const startIndex = currentPage * cardsPerPage;
	const visibleFuncionarios = funcionarios.slice(startIndex, startIndex + cardsPerPage);

	const nextPage = () => {
		setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
	};

	const prevPage = () => {
		setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
	};

	return (

		<div className='space-y-8 py-0  md:px-20 mb-15'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{visibleFuncionarios.map((funcionario) => (
					<div key={funcionario.id} className='group perspective'>
						<div className='relative h-[300px] w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
							{/* Frente de la tarjeta con efecto de fondo */}
							<div
								className='
                  absolute inset-0
                  [backface-visibility:hidden]
                  rounded-lg shadow-lg overflow-hidden
                  flex flex-col items-center justify-center p-6
                  bg-gradient-to-b from-blue-200 to-blue bg-no-repeat bg-center
                  [background-image:radial-gradient(circle_10px_at_30%_20%,rgba(210, 20, 20, 0.6),transparent_70%),radial-gradient(#f71818_1px,transparent_5px)]
                  bg-[size:100%_100%,20px_20px]
                '>
								{/* Círculo decorativo superior derecho (opcional) */}
								<div className='absolute top-4 right-4 w-6 h-6 bg-yellow-200 rounded-full shadow' />

								{/* Contenedor para la foto con el círculo alrededor */}
								<div className='relative w-32 h-32 flex items-center justify-center mb-4'>
									{/* Círculo blanco que simula un anillo alrededor de la imagen */}
									<div className='absolute w-35 h-35 rounded-full bg-white ' />
									<img
										src={funcionario.imagen}
										alt={funcionario.nombre}
										className='relative w-32 h-32 object-cover rounded-full'
									/>
								</div>

								<h3 className='text-xl font-semibold text-center text-gray-800'>{funcionario.nombre}</h3>
								<p className='text-sm text-gray-500 text-center mt-2 rounded-lg p-1'>{funcionario.cargo}</p>
								<div className='w-24 h-2 rounded-lg bg-blue-800 mx-auto'></div>
							</div>

							{/* Reverso de la tarjeta mejorado */}
							<div
								className='
                  absolute inset-0
                  [transform:rotateY(180deg)]
                  [backface-visibility:hidden]
                  bg-gradient-to-br from-blue-600 to-blue-800
                  rounded-2xl shadow-xl
                  p-8
                  flex flex-col justify-between
                  text-white
                '>
								{/* Nombre */}
								<h3 className='text-2xl font-bold mb-4 text-center'>{funcionario.nombre}</h3>

								{/* Detalles */}
								<div className='space-y-4'>
									<div>
										<p className='text-xs uppercase tracking-widest text-blue-200'>Cargo</p>
										<p className='text-lg font-medium'>{funcionario.cargo}</p>
									</div>
									<div>
										<p className='text-xs uppercase tracking-widest text-blue-200'>Contacto</p>
										<div className='flex items-center mt-1 space-x-2'>
											<Mail className='w-5 h-5 text-blue-200' />
											<a href={`mailto:${funcionario.correo}`} className='text-sm break-all hover:underline'>
												{funcionario.correo}
											</a>
										</div>
									</div>
								</div>
								{/* Puntito decorativo */}
								<div className='absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full shadow-inner'></div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Controles de paginación */}
			{totalPages > 1 && (
				<div className='flex justify-center items-center gap-4 mt-8'>
					<button
						onClick={prevPage}
						disabled={currentPage === 0}
						className='h-10 w-10 rounded-full flex items-center justify-center border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
						aria-label='Anterior'>
						<ArrowLeft />
					</button>

					<span className='text-sm text-gray-600'>
						Página {currentPage + 1} de {totalPages}
					</span>

					<button
						onClick={nextPage}
						disabled={currentPage === totalPages - 1}
						className='h-10 w-10 rounded-full flex items-center justify-center border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
						aria-label='Siguiente'>
						<ArrowRight />
					</button>
				</div>
			)}
		</div>

	);
}
