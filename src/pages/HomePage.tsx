import { ServiceSection } from '../core/components/common/home/servicios/ServiceSection';
import { SectionEvent } from '../core/components/common/home/eventos/SectionEvent';
import { SectionNews } from '../core/components/common/home/noticias/SectionNews';
import { SectionPlaces } from '../core/components/common/home/turismo/SectionPlaces';
import { AlcaldeSection } from '../core/components/common/home/alcalde/AlcaldeSection';
import { HeroSection } from '../core/layout/hero/HeroSection';

import { Layout } from '../core/layout/Layout';

export const HomePage = () => {
	return (
		<Layout>
			<div className='bg-gray-100'>
				
				<HeroSection />
				<ServiceSection />
				<SectionNews />
				<SectionEvent />
				<AlcaldeSection />
				<SectionPlaces />
				
			</div>
		</Layout>
	);
};
