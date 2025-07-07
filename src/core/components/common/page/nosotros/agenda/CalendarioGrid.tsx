import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const MESES = [
	"enero", "febrero", "marzo", "abril", "mayo", "junio",
	"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

interface DiaCalendario {
	fecha: Date;
	esMesActual: boolean;
}

interface CalendarioGridProps {
	mesActual: number;
	anioActual: number;
	diasCalendario: DiaCalendario[];
	cambiarMes: (delta: number) => void;
	esFechaHoy: (fecha: Date) => boolean;
	diaSeleccionado?: Date | null;
	onDiaClick?: (fecha: Date) => void;
}

const CalendarioGrid = ({
	mesActual,
	anioActual,
	diasCalendario,
	cambiarMes,
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
					const esSeleccionado =
						diaSeleccionado && dia.fecha.toDateString() === diaSeleccionado.toDateString() && dia.esMesActual;
					
					let claseBase =
						'p-0.5 sm:p-2 border-b border-gray-200 border-r border-gray-200 min-h-[50px] sm:min-h-[100px] relative transition-all duration-200 cursor-pointer hover:bg-blue-50';
					
					if (!dia.esMesActual) claseBase += ' text-gray-400 bg-gray-50';
					if (esFinde && dia.esMesActual) claseBase += ' bg-blue-50';
					if (hoy) claseBase += ' bg-cyan-50 border-cyan-200';
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
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CalendarioGrid;
