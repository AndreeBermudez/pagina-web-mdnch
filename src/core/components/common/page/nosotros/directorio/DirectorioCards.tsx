// src/components/DirectorioCards.tsx
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';
import { useFuncionarioQuery } from '../../../../../../features/administrador/funcionarios-admin/hooks/useFuncionarioQuery';
import { Loader } from '../../../../ui/Loader';

interface DirectorioCardsProps {
	cardsPerPage: number;
}

export default function DirectorioCards({ cardsPerPage }: DirectorioCardsProps) {
	const { funcionarios = [], isLoading } = useFuncionarioQuery();
	const [currentPage, setCurrentPage] = useState(0);

	const totalPages = Math.ceil(funcionarios.length / cardsPerPage);
	const startIndex = currentPage * cardsPerPage;
	const visibleFuncionarios = funcionarios.slice(startIndex, startIndex + cardsPerPage);

	const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
	const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

	if (isLoading) {
		return (
			<div className='flex flex-col items-center justify-center space-y-4'>
				<Loader />
				<div className='mt-4 text-center text-gray-500'>Cargando funcionarios...</div>
			</div>
		);
	}

	return (
		<div className='py-0 space-y-8 md:px-20 mb-15'>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{visibleFuncionarios.map((funcionario) => (
					<div key={funcionario.funcionarioId} className='group perspective'>
						<div className='relative h-[300px] w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
							{/* Frente */}
							<div className='absolute inset-0 [backface-visibility:hidden] rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-200 to-blue bg-no-repeat bg-center [background-image:radial-gradient(circle_10px_at_30%_20%,rgba(210,20,20,0.6),transparent_70%),radial-gradient(#f71818_1px,transparent_5px)] bg-[size:100%_100%,20px_20px]'>
								<div className='absolute w-6 h-6 bg-yellow-200 rounded-full shadow top-4 right-4' />
								<div className='relative flex items-center justify-center w-32 h-32 mb-4'>
									<div className='absolute bg-white rounded-full w-35 h-35' />
									{funcionario.direccionImagen ? (
										<img
											src={funcionario.direccionImagen}
											alt={funcionario.nombre}
											className='relative object-cover w-32 h-32 rounded-full'
										/>
									) : (
										<div className='relative flex items-center justify-center w-32 h-32 text-gray-600 bg-gray-200 rounded-full'>
											NA
										</div>
									)}
								</div>
								<h3 className='text-xl font-semibold text-center text-gray-800'>{funcionario.nombre}</h3>
								<p className='p-1 mt-2 text-sm text-center text-gray-500 rounded-lg'>{funcionario.cargo}</p>
								<div className='w-24 h-2 mx-auto bg-blue-800 rounded-lg' />
							</div>

							{/* Reverso */}
							<div className='absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 flex flex-col justify-between text-white'>
								<h3 className='mb-4 text-2xl font-bold text-center'>{funcionario.nombre}</h3>
								<div className='space-y-4'>
									<div>
										<p className='text-xs tracking-widest text-blue-200 uppercase'>Cargo</p>
										<p className='text-lg font-medium'>{funcionario.cargo}</p>
									</div>
									<div>
										<p className='text-xs tracking-widest text-blue-200 uppercase'>Contacto</p>
										<div className='flex items-center mt-1 space-x-2'>
											<Mail className='w-5 h-5 text-blue-200' />
											<a href={`mailto:${funcionario.contacto}`} className='text-sm break-all hover:underline'>
												{funcionario.contacto}
											</a>
										</div>
									</div>
								</div>
								<div className='absolute w-4 h-4 bg-yellow-400 rounded-full shadow-inner top-4 right-4' />
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Paginación */}
			{totalPages > 1 && (
				<div className='flex items-center justify-center gap-4 mt-8'>
					<button
						onClick={prevPage}
						disabled={currentPage === 0}
						className='flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
						aria-label='Anterior'>
						<ArrowLeft />
					</button>
					<span className='text-sm text-gray-600'>
						Página {currentPage + 1} de {totalPages}
					</span>
					<button
						onClick={nextPage}
						disabled={currentPage === totalPages - 1}
						className='flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
						aria-label='Siguiente'>
						<ArrowRight />
					</button>
				</div>
			)}
		</div>
	);
}
