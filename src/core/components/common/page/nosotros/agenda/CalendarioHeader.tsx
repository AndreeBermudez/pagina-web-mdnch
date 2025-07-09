import { HiCalendar, HiSearch } from 'react-icons/hi';

const MESES = [
	"enero", "febrero", "marzo", "abril", "mayo", "junio",
	"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

interface CalendarioHeaderProps {
	mesActual: number;
	anioActual: number;
	rangoAnios: number[];
	onChangeMes: (mes: number) => void;
	onChangeAnio: (anio: number) => void;
	busqueda: string;
	onChangeBusqueda: (busqueda: string) => void;
}

const CalendarioHeader = ({
	mesActual,
	anioActual,
	rangoAnios,
	onChangeMes,
	onChangeAnio,
	busqueda,
	onChangeBusqueda,
}: CalendarioHeaderProps) => {
	return (
		<div className='p-6 border-b border-blue-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4'>
			<div className='flex items-center gap-3'>
				<div className='flex items-center border border-blue-200 rounded-full px-4 py-1 bg-blue-50 hover:bg-blue-100'>
					<HiCalendar className='w-5 h-5 text-blue-500 mr-2' />
					<select
						value={mesActual}
						onChange={(e) => onChangeMes(Number(e.target.value))}
						className='bg-transparent outline-none text-blue-700 font-medium p-1'>
						{MESES.map((mes, i) => (
							<option key={mes} value={i}>
								{mes}
							</option>
						))}
					</select>
				</div>
				<div className='flex items-center border border-blue-200 rounded-full px-4 py-1 bg-blue-50 hover:bg-blue-100'>
					<select
						value={anioActual}
						onChange={(e) => onChangeAnio(Number(e.target.value))}
						className='bg-transparent outline-none text-blue-700 font-medium p-1'>
						{rangoAnios.map((anio) => (
							<option key={anio} value={anio}>
								{anio}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className='relative w-full sm:w-auto'>
				<HiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4' />
				<input
					type='text'
					placeholder='Buscar eventos...'
					value={busqueda}
					onChange={(e) => onChangeBusqueda(e.target.value)}
					className='pl-10 pr-3 py-2 w-full sm:w-72 border border-blue-200 rounded-full outline-none focus:border-blue-400'
				/>
			</div>
		</div>
	);
};

export default CalendarioHeader;
