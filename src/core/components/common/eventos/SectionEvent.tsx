import { CalendarEvent } from './CalendarEvent';
import { EventHeader } from './EventHeader';
import cityImage from '../../../../assets/imagen-plaza.webp';

export const SectionEvent = () => {
	return (
		<section className='bg-gradient-to-b from-[#3c6fe5] to-[#0a2158] py-16'>
			<div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-100 shadow-2xl rounded-2xl py-4'>
				<EventHeader />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<CalendarEvent
						category='Medio Ambiente'
						date='02'
						month='abril'
						title='Taller de Reciclaje y Medio Ambiente'
						time='4:00 pm - 7:00 pm'
						location='Auditorio Municipal'
						image={cityImage}
					/>
					<CalendarEvent
						category='Comunidad'
						date='09'
						month='abril'
						title='Jornada de Limpieza Comunitaria'
						time='8:00 am - 12:00 pm'
						location='Bellamar'
						image={cityImage}
					/>
					<CalendarEvent
						category='Economía'
						date='08'
						month='abril'
						title='Feria de Emprendedores Locales'
						time='10:00 am - 6:00 pm'
						location='Plaza Mayor'
						image={cityImage}
					/>
				</div>
			</div>
		</section>
	);
};
