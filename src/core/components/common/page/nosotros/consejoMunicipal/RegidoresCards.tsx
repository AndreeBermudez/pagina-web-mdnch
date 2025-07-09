import { useEffect, useState } from 'react';
import { FileText, User, Users } from 'lucide-react';
import { getAllConsejos } from '../../../../../services/consejo/getAllConsejos'; 

interface Regidor {
	id: number;
	numero: number;
	cargo: string;
	nombre: string;
	foto: string;
	comisiones: {
		nombre: string;
		cargo: string;
	}[];
	equipo: {
		nombre: string;
		cargo: string;
	}[];
}

export default function RegidoresCards() {
	const [regidores, setRegidores] = useState<Regidor[]>([]);

	useEffect(() => {
		const fetchRegidores = async () => {
			const consejos = await getAllConsejos();

			const formateados: Regidor[] = consejos.map((c: any, i: number) => ({
				id: c.consejoMuniId,
				numero: i + 1,
				cargo: c.cargo,
				nombre: `${c.nombre} ${c.apellido}`,
				foto: c.direccionImagen || '/placeholder.jpg',
				comisiones: [
					{
						nombre: c.area || 'Sin comisión asignada',
						cargo: c.cargo || 'Presidente',
					},
				],
				equipo: (c.equipos || []).map((e: any) => ({
					nombre: `${e.nombre} ${e.apellido}`,
					cargo: 'Miembro',
				})),
			}));

			setRegidores(formateados);
		};

		fetchRegidores();
	}, []);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:px-20 mb-20'>
			{regidores.map((r) => (
				<div
					key={r.id}
					className='regidor-card relative group perspective w-full h-96 overflow-hidden shadow border-gray-100 rounded-lg'>
					{/* Frente */}
					<div className='card-front absolute inset-0 transition-opacity duration-500 ease-in-out group-hover:opacity-0'>
						<div className='card-image relative h-2/3 bg-gray-200 overflow-hidden'>
							<img src={r.foto} alt={r.nombre} className='w-full h-full object-cover' />
							<div className='card-number absolute top-4 right-4 bg-blue-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center'>
								{r.numero}
							</div>
						</div>
						<div className='card-content h-1/3 bg-white p-4 flex flex-col justify-center'>
							<h3 className='card-title text-lg font-bold'>{r.cargo}</h3>
							<p className='card-name text-gray-600 truncate'>{r.nombre}</p>
							<p className='card-commission text-blue-700 text-sm font-semibold mt-1 truncate'>
								{r.comisiones.length > 0 ? r.comisiones[0].nombre : 'Sin comisión asignada'}
							</p>
						</div>
					</div>

					{/* Reverso */}
					<div className='card-back absolute inset-0 bg-white border-2 border-blue-500 text-gray-800 p-4 flex flex-col rounded-lg opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 shadow-xl'>
						{/* Header */}
						<div className='text-center pb-3 border-b border-gray-200'>
							<h3 className='text-lg font-bold text-gray-900 mb-1'>{r.nombre}</h3>
							<span className='bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium'>{r.cargo}</span>
						</div>

						{/* Content grid */}
						<div className='flex-1 py-3 space-y-3'>
							{/* Comisión */}
							{r.comisiones.length > 0 && (
								<div>
									<div className='flex items-center gap-1 mb-1'>
										<FileText className='w-3 h-3 text-blue-500' />
										<span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Comisión</span>
									</div>
									<div className='bg-blue-50 border border-blue-200 rounded-md p-2'>
										<div className='text-sm font-medium text-gray-800'>{r.comisiones[0].nombre}</div>
										{r.comisiones[0].cargo && (
											<div className='text-xs text-blue-600 font-semibold mt-0.5'>{r.comisiones[0].cargo}</div>
										)}
									</div>
								</div>
							)}

							{/* Equipo */}
							<div className='flex-1'>
								<div className='flex items-center justify-between mb-1'>
									<div className='flex items-center gap-1'>
										<Users className='w-3 h-3 text-blue-500' />
										<span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Equipo</span>
									</div>
									<span className='bg-gray-100 text-gray-600 text-xs font-bold px-1.5 py-0.5 rounded'>
										{r.equipo.length}
									</span>
								</div>

								<div className='space-y-1 max-h-24 overflow-y-auto'>
									{r.equipo.length === 0 ? (
										<div className='text-xs text-slate-500 italic px-2 py-1 bg-slate-50 border border-slate-200 rounded'>
											Este consejo no tiene un equipo asignado.
										</div>
									) : (
										<>
											{r.equipo.slice(0, 3).map((m, i) => (
												<div key={i} className='flex items-center bg-gray-50 rounded px-2 py-1'>
													<div className='w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2'>
														<User className='w-2.5 h-2.5 text-blue-500' />
													</div>
													<div className='flex-1 min-w-0'>
														<div className='text-xs font-medium text-gray-800 truncate'>{m.nombre}</div>
													</div>
												</div>
											))}

											{r.equipo.length > 3 && (
												<div className='text-center'>
													<span className='text-xs text-gray-500'>+{r.equipo.length - 3} más</span>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>

						{/* Footer */}
						<div className='pt-2 border-t border-gray-200'>
							<div className='w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full'></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
