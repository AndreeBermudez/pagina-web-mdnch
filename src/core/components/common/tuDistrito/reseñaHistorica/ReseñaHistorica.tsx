import { Anchor } from 'lucide-react';
import Timeline from './Timeline';
import DemographicData from './DemographicData';
import ContentSection from './ContentSection';
import HistoricalItems from './HistoricalItems';

// Datos para los componentes
const timelineItems = [
	{ year: 'Pre-1958', event: 'Asentamientos nativos de origen Mochica' },
	{ year: '1958', event: 'Primeros pobladores en la urbanización Buenos Aires' },
	{ year: '1960', event: 'Invasiones en la margen izquierda del río Lacramarca' },
	{ year: '1970', event: 'Gran sismo que destruyó la ciudad de Chimbote' },
	{ year: '1974', event: "Aprobación del 'Plan Director de la Municipalidad del Santa'" },
	{ year: 'Actualidad', event: 'Más de 200.000 habitantes' },
];

const demographicData = [
	{ year: '1945', population: '4.000 habitantes', percentage: '2%' },
	{ year: '1970', population: '170.000 habitantes', percentage: '85%' },
	{ year: 'Actualidad', population: '+200.000 habitantes', percentage: '100%' },
];

const historicalItems = [
	{
		year: '1958',
		description:
			'Fecha en que se asientan los primeros pobladores en la zona que hoy ocupa la urbanización Buenos Aires, capital del distrito de Nuevo Chimbote.',
		icon: 'pin' as const,
	},
	{
		year: '1960',
		description:
			'En la margen izquierda del río Lacramarca se producen invasiones y en estos terrenos eriazos donde se instalan los asentamientos humanos de Villa María, Villa María Baja, 1° de Mayo y 3 de Octubre.',
		icon: 'building' as const,
	},
];

export default function ReseñaHistorica() {
	return (
		<div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
			{/* Hero Section full-width */}
			<div className='relative w-full overflow-hidden  h-[70vh]'>
				<img src='historia.jpg' alt='Reseña histórica' className='object-cover w-full h-full' />
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end'>
					<div className='max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2'>Reseña Histórica</h1>
						<div className='h-1 w-24 bg-blue-400 rounded-full mb-4'></div>
						<p className='text-white/90 max-w-2xl text-sm sm:text-base'>
							Descubre la fascinante historia del Distrito de Nuevo Chimbote, desde sus orígenes hasta convertirse
							en una ciudad con más de 200.000 habitantes y un futuro prometedor.
						</p>
					</div>
				</div>
			</div>

			{/* Timeline and Content */}
			<div className='max-w-6xl mx-auto px-4 py-12 mb-25 sm:px-6 lg:px-8'>
				<div className='grid md:grid-cols-3 gap-8'>
					{/* Sidebar with timeline */}
					<div className='md:col-span-1 space-y-6'>
						<Timeline items={timelineItems} />
						<DemographicData data={demographicData} />
					</div>

					{/* Main content */}
					<div className='md:col-span-2 space-y-8'>
						<ContentSection title='Orígenes y Crecimiento'>
							<p>
								El Distrito de Nuevo Chimbote cuenta en la actualidad con más de 200.000 habitantes, el crecimiento
								que ha experimentado se debe a numerosos factores, pero sin duda, uno de ellos es el crecimiento
								económico, que hacen de ella una ciudad con un futuro aún más prometedor.
							</p>
							<div className='flex items-start mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400'>
								<Anchor className='w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0' />
								<p className='text-sm m-0'>
									Según indican algunos hallazgos arqueológicos encontrados, la riqueza marina existente así como
									las características de las Bahías: El Ferrol y Samanco, motivó el asentamiento de comunidades
									nativas, entre otros de origen Mochica; poniendo en evidencia que la pesca, era una actividad
									económica importante en el territorio actual de Chimbote y Nuevo Chimbote.
								</p>
							</div>
						</ContentSection>

						<ContentSection title='Desarrollo Urbano'>
							<p>
								La historia del distrito está asociada a su proceso de origen y crecimiento urbano, y este proceso
								está condicionado a la ubicación geográfica de la ciudad de Nuevo Chimbote, al sismo de 1970 y al
								desarrollo de la ciudad de Chimbote; y la evolución de esta última está determinada por las
								tendencias del crecimiento de su industria Pesquera y Siderúrgica.
							</p>

							<HistoricalItems items={historicalItems} />

							<p>
								En los 70, luego del gran sismo de mayo que destruyó la ciudad de Chimbote y colapso su
								infraestructura básica: agua, desagüe, red eléctrica y red vial, la comisión CRYRZA elabora el
								"Plan Director de la Municipalidad del Santa" aprobado en 1974, estudio en el que se plantea como
								área de expansión urbana la zona sur de la ciudad de Chimbote.
							</p>
						</ContentSection>
					</div>
				</div>
			</div>
		</div>
	);
}
