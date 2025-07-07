import { useEffect, useState } from 'react';
import { HiViewGrid } from 'react-icons/hi';
import CalendarioGrid from './CalendarioGrid';
import CalendarioHeader from './CalendarioHeader';

interface DiaCalendario {
	fecha: Date;
	esMesActual: boolean;
}

const CalendarSection = () => {
	const [mesActual, setMesActual] = useState<number>(new Date().getMonth()); // 0..11
	const [anioActual, setAnioActual] = useState<number>(new Date().getFullYear());
	const [busqueda, setBusqueda] = useState<string>('');
	const [rangoAnios, setRangoAnios] = useState<number[]>([]);
	const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);

	const handleDiaClick = (fecha: Date) => {
		setDiaSeleccionado(fecha);
	};

	useEffect(() => {
		const anioBase = new Date().getFullYear();
		const arr: number[] = [];
		for (let i = anioBase - 5; i <= anioBase + 5; i++) {
			arr.push(i);
		}
		setRangoAnios(arr);
	}, []);

	const cambiarMes = (delta: number): void => {
		let nuevoMes = mesActual + delta;
		let nuevoAnio = anioActual;
		if (nuevoMes < 0) {
			nuevoMes = 11;
			nuevoAnio--;
		} else if (nuevoMes > 11) {
			nuevoMes = 0;
			nuevoAnio++;
		}
		setMesActual(nuevoMes);
		setAnioActual(nuevoAnio);
	};

	const obtenerDiasDelCalendario = (): DiaCalendario[] => {
		const dias: DiaCalendario[] = [];
		const primerDiaMes = new Date(anioActual, mesActual, 1);
		const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0);
		let inicioDia = primerDiaMes.getDay() - 1;
		if (inicioDia === -1) inicioDia = 6;
		const totalDiasMes = ultimoDiaMes.getDate();

		// Días del mes anterior
		for (let i = 0; i < inicioDia; i++) {
			const fecha = new Date(anioActual, mesActual, -inicioDia + i + 1);
			dias.push({
				fecha,
				esMesActual: false,
			});
		}
		// Días del mes actual
		for (let dia = 1; dia <= totalDiasMes; dia++) {
			const fecha = new Date(anioActual, mesActual, dia);
			dias.push({
				fecha,
				esMesActual: true,
			});
		}
		// Rellenar los días restantes del mes siguiente hasta completar 42 celdas
		const diasRestantes = 42 - dias.length;
		for (let i = 1; i <= diasRestantes; i++) {
			const fecha = new Date(anioActual, mesActual + 1, i);
			dias.push({
				fecha,
				esMesActual: false,
			});
		}
		return dias;
	};

	const esFechaHoy = (fecha: Date): boolean => {
		const hoy = new Date();
		return (
			fecha.getDate() === hoy.getDate() &&
			fecha.getMonth() === hoy.getMonth() &&
			fecha.getFullYear() === hoy.getFullYear()
		);
	};

	const diasCalendario = obtenerDiasDelCalendario();

	return (
		<div className='max-w-[1200px] mx-auto '>
			<div className='bg-gradient-to-br from-white to-blue-50 rounded-lg shadow border border-blue-100 overflow-hidden'>
				{/* Cabecera */}
				<CalendarioHeader
					mesActual={mesActual}
					anioActual={anioActual}
					rangoAnios={rangoAnios}
					onChangeMes={setMesActual}
					onChangeAnio={setAnioActual}
					busqueda={busqueda}
					onChangeBusqueda={setBusqueda}
				/>

				{/* Grid principal: calendario y panel */}
				<div className='grid grid-cols-1 md:grid-cols-[1fr_450px]'>
					<CalendarioGrid
						mesActual={mesActual}
						anioActual={anioActual}
						diasCalendario={diasCalendario}
						cambiarMes={cambiarMes}
						esFechaHoy={esFechaHoy}
						diaSeleccionado={diaSeleccionado}
						onDiaClick={handleDiaClick}
					/>

					{/* Panel de calendario */}
					<div className='border-l border-blue-100 p-4 bg-white max-h-[720px] overflow-y-auto'>
						<div className='flex items-center gap-2 mb-4'>
							<HiViewGrid className='w-5 h-5 text-blue-500' />
							<h3 className='text-lg font-bold uppercase bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
								Agenda para {new Date(0, mesActual).toLocaleString('es', { month: 'long' })}
							</h3>
						</div>
						<div className='text-center text-gray-500 p-8'>
							<p>Calendario disponible</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarSection;
