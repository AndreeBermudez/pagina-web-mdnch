import React from 'react';
import type { DiaCalendario } from './types';
import { MESES, COLORES_CATEGORIAS } from './constants';

interface CalendarioGridProps {
	mesActual: number;
	anioActual: number;
	diasCalendario: DiaCalendario[];
	cambiarMes: (delta: number) => void;
	seleccionarEvento: (id: string) => void;
	esFechaHoy: (fecha: Date) => boolean;
}

const CalendarioGrid: React.FC<CalendarioGridProps> = ({
	mesActual,
	anioActual,
	diasCalendario,
	cambiarMes,
	seleccionarEvento,
	esFechaHoy,
}) => {
	return (
		<div>
			<div className='flex justify-between items-center p-4 border-b border-blue-100 bg-gradient-to-r from-blue-100 to-cyan-100'>
				<button
					className='bg-transparent text-blue-700 font-medium flex items-center p-2 rounded transition-colors hover:bg-white/50'
					onClick={() => cambiarMes(-1)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='mr-1'
						viewBox='0 0 24 24'>
						<polyline points='15 18 9 12 15 6'></polyline>
					</svg>
					<span>{MESES[mesActual === 0 ? 11 : mesActual - 1].toUpperCase()}</span>
				</button>
				<h2 className='text-2xl font-bold uppercase bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
					{MESES[mesActual].toUpperCase()} {anioActual}
				</h2>
				<button
					className='bg-transparent text-blue-700 font-medium flex items-center p-2 rounded transition-colors hover:bg-white/50'
					onClick={() => cambiarMes(1)}>
					<span>{MESES[mesActual === 11 ? 0 : mesActual + 1].toUpperCase()}</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='ml-1'
						viewBox='0 0 24 24'>
						<polyline points='9 18 15 12 9 6'></polyline>
					</svg>
				</button>
			</div>

			{/* Días de la semana */}
			<div className='grid grid-cols-7 bg-blue-800 text-white'>
				{['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'].map((dia) => (
					<div key={dia} className='p-3 text-center font-medium'>
						{dia}
					</div>
				))}
			</div>

			{/* Grid de días */}
			<div className='grid grid-cols-7'>
				{diasCalendario.map((dia, idx) => {
					const hoy = esFechaHoy(dia.fecha);
					const esFinde = dia.fecha.getDay() === 0 || dia.fecha.getDay() === 6;
					const tieneEventos = dia.eventos.length > 0;
					let claseBase =
						'p-2 border-b border-gray-200 border-r border-gray-200 min-h-[100px] relative transition-all duration-200';
					if (!dia.esMesActual) claseBase += ' text-gray-400 bg-gray-50';
					if (esFinde && dia.esMesActual) claseBase += ' bg-blue-50';
					if (hoy) claseBase += ' bg-cyan-50 border-cyan-200';
					if (tieneEventos && dia.esMesActual) claseBase += ' cursor-pointer';

					return (
						<div
							key={idx}
							className={claseBase}
							onClick={() => {
								if (tieneEventos && dia.esMesActual) {
									seleccionarEvento(dia.eventos[0].id);
								}
							}}>
							<div
								className={`flex justify-center items-center w-8 h-8 rounded-full mb-1 mx-auto ${
									hoy ? 'bg-blue-600 text-white font-bold' : 'bg-transparent'
								}`}>
								{dia.fecha.getDate()}
							</div>
							{tieneEventos && dia.esMesActual && (
								<>
									<div
										className={`text-xs p-1 rounded inline-block max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis ${
											(COLORES_CATEGORIAS[dia.eventos[0].categoria] || COLORES_CATEGORIAS.default).clase
										}`}
										onClick={(e) => {
											e.stopPropagation();
											seleccionarEvento(dia.eventos[0].id);
										}}>
										{dia.eventos[0].titulo}
									</div>
									{dia.eventos.length > 1 && (
										<div className='text-xs text-blue-500 text-center font-medium'>
											+{dia.eventos.length - 1} más
										</div>
									)}
									<div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1'>
										{dia.eventos.slice(0, 3).map((ev) => {
											const colorCat = COLORES_CATEGORIAS[ev.categoria] || COLORES_CATEGORIAS.default;
											return (
												<div
													key={ev.id}
													className={`w-2 h-2 rounded-full ${colorCat.dot}`}
													title={ev.titulo}></div>
											);
										})}
									</div>
								</>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CalendarioGrid;
