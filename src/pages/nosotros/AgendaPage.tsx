import CalendarSection from '../../core/components/common/nosotros/agenda/CalendarSection';
import { Footer } from '../../core/layout/footer/Footer';
import { NavbarSection } from '../../core/layout/navbar/NavbarSection';

export const AgendaPage = () => {
	return (
		<>
			<NavbarSection />
			<CalendarSection />
			<Footer />
		</>
	);
};
