import AlcaldeInfo from '../../core/components/common/nosotros/alcalde/AlcaldeInfo';
import { Footer } from '../../core/layout/footer/Footer';
import { NavbarSection } from '../../core/layout/navbar/NavbarSection';

export const AlcaldePage = () => {
	return (
		<>
			<NavbarSection />
			<AlcaldeInfo />
			<Footer />
		</>
	);
};
