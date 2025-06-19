import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { COLORES_CATEGORIAS, MESES } from './constants';
import type { DiaCalendario } from './types';

interface CalendarioGridProps {
	mesActual: number;
	anioActual: number;
	diasCalendario: DiaCalendario[];
	cambiarMes: (delta: number) => void;
	seleccionarEvento: (id: string) => void;
	esFechaHoy: (fecha: Date) => boolean;
	diaSeleccionado?: Date | null;
	onDiaClick?: (fecha: Date) => void;
}

const CalendarioGrid = ({
	mesActual,
	anioActual,
	diasCalendario,
	cambiarMes,
	seleccionarEvento,
	esFechaHoy,
	diaSeleccionado,
	onDiaClick,
}: CalendarioGridProps) => {
	return (
		<div className='w-full max-w-full overflow-hidden '>
			<div className='flex justify-between items-center p-2 sm:p-4 border-b border-blue-100 bg-gradient-to-r from-blue-100 to-cyan-100'>
				<button
					className='bg-transparent text-blue-700 font-medium flex items-center p-1 sm:p-2 rounded transition-colors hover:bg-white/50'
					onClick={() => cambiarMes(-1)}>
					<HiChevronLeft className='w-4 h-4 mr-1' />
					<span className='hidden sm:inline'>{MESES[mesActual === 0 ? 11 : mesActual - 1].toUpperCase()}</span>
				</button>
				<h2 className='text-lg sm:text-2xl font-bold uppercase bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
					{MESES[mesActual].toUpperCase()} {anioActual}
				</h2>
				<button
					className='bg-transparent text-blue-700 font-medium flex items-center p-1 sm:p-2 rounded transition-colors hover:bg-white/50'
					onClick={() => cambiarMes(1)}>
					<span className='hidden sm:inline'>{MESES[mesActual === 11 ? 0 : mesActual + 1].toUpperCase()}</span>
					<HiChevronRight className='w-4 h-4 ml-1' />
				</button>
			</div>

			{/* Días de la semana */}
			<div className='grid grid-cols-7 bg-blue-800 text-white text-xs sm:text-base'>
				{['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'].map((dia) => (
					<div key={dia} className='p-1 sm:p-3 text-center font-medium'>
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
					const esSeleccionado =
						diaSeleccionado && dia.fecha.toDateString() === diaSeleccionado.toDateString() && dia.esMesActual;
					let claseBase =
						'p-0.5 sm:p-2 border-b border-gray-200 border-r border-gray-200 min-h-[50px] sm:min-h-[100px] relative transition-all duration-200';
					if (!dia.esMesActual) claseBase += ' text-gray-400 bg-gray-50';
					if (esFinde && dia.esMesActual) claseBase += ' bg-blue-50';
					if (hoy) claseBase += ' bg-cyan-50 border-cyan-200';
					if (tieneEventos && dia.esMesActual) claseBase += ' cursor-pointer';
					if (esSeleccionado) {
						claseBase +=
							' bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-700 border-2 shadow-lg transform scale-105 z-10';
					}

					return (
						<div
							key={idx}
							className={claseBase}
							onClick={() => {
								if (dia.esMesActual) {
									onDiaClick?.(dia.fecha);
									if (tieneEventos) {
										seleccionarEvento(dia.eventos[0].id);
									}
								}
							}}>
							<div
								className={`flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 rounded-full mb-1 mx-auto text-sm sm:text-base transition-all duration-300 ${
									hoy
										? 'bg-blue-600 text-white font-bold shadow-md'
										: esSeleccionado
										? 'bg-white text-blue-600 font-bold shadow-md'
										: 'bg-transparent'
								}`}>
								{dia.fecha.getDate()}
							</div>
							{tieneEventos && dia.esMesActual && (
								<>
									<div
										className={`text-[10px] sm:text-xs p-0.5 sm:p-1 rounded inline-block max-w-[70px] sm:max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
											esSeleccionado
												? 'bg-white/20 text-white border border-white/30'
												: (COLORES_CATEGORIAS[dia.eventos[0].categoria] || COLORES_CATEGORIAS.default).clase
										}`}
										onClick={(e) => {
											e.stopPropagation();
											seleccionarEvento(dia.eventos[0].id);
										}}>
										{dia.eventos[0].titulo}
									</div>
									{dia.eventos.length > 1 && (
										<div
											className={`text-[10px] sm:text-xs text-center font-medium ${
												esSeleccionado ? 'text-white/90' : 'text-blue-500'
											}`}>
											+{dia.eventos.length - 1} más
										</div>
									)}
									<div className='absolute bottom-0.5 sm:bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5 sm:gap-1'>
										{dia.eventos.slice(0, 3).map((ev) => {
											const colorCat = COLORES_CATEGORIAS[ev.categoria] || COLORES_CATEGORIAS.default;
											return (
												<div
													key={ev.id}
													className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
														esSeleccionado ? 'bg-white/80' : colorCat.dot
													}`}
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
