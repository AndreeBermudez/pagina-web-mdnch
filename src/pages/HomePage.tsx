import { ServiceSection } from '../core/components/common/servicios/ServiceSection';
import { SectionEvent } from '../core/components/common/eventos/SectionEvent';
import { SectionNews } from '../core/components/common/noticias/SectionNews';
import { SectionPlaces } from '../core/components/common/turismo/SectionPlaces';
import { AlcaldeSection } from '../core/components/common/alcalde/AlcaldeSection';
import { HeroSection } from '../core/layout/hero/HeroSection';
import { NavbarSection } from '../core/layout/navbar/NavbarSection';
import { Footer } from '../core/layout/footer/Footer';

export const HomePage = () => {
	return (
		<body className='bg-gray-100'>
			<NavbarSection />
			<HeroSection />
			<ServiceSection />
			<SectionNews />
			<SectionEvent />
			<AlcaldeSection />
			<SectionPlaces />
			<Footer />
		</body>
	);
};
