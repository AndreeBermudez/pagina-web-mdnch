import { AlcaldeSection } from '../core/components/common/page/home/alcalde/AlcaldeSection';
import { SectionEvent } from '../core/components/common/page/home/eventos/SectionEvent';
import { SectionNews } from '../core/components/common/page/home/noticias/SectionNews';
import { ServiceSection } from '../core/components/common/page/home/servicios/ServiceSection';
import { SectionPlaces } from '../core/components/common/page/home/turismo/SectionPlaces';
import { SocialButtons } from '../core/components/ui/SocialButtons';
import { Weather } from '../core/components/ui/Weather';
import { Footer } from '../core/layout/footer/Footer';
import { HeroSection } from '../core/layout/hero/HeroSection';
import { NavbarSection } from '../core/layout/navbar/NavbarSection';

export const HomePage = () => {
	return (
		<body className='bg-gray-100'>
			<Weather />
			<SocialButtons />
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
