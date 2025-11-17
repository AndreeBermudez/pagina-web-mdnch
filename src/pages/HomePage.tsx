import { AlcaldeSection } from '../core/components/common/page/home/alcalde/AlcaldeSection';

import { SectionNews } from '../core/components/common/page/home/noticias/SectionNews';
import { ServiceSection } from '../core/components/common/page/home/servicios/ServiceSection';
import { SectionPlaces } from '../core/components/common/page/home/turismo/SectionPlaces';
import { SocialButtons } from '../core/components/ui/SocialButtons';
import { Weather } from '../core/components/ui/Weather';
import { AccessibilityMenu } from '../core/components/ui/Accessibility';
import { Footer } from '../core/layout/footer/Footer';
import { HeroSection } from '../core/layout/hero/HeroSection';
import { NavbarSection } from '../core/layout/navbar/NavbarSection';
import EmergencyPopup from '../core/components/common/EmergencyPopup';
import { usePopupControl } from '../core/hooks/usePopupControl';
import { SurveyBanner } from '../core/components/ui/SurveyBanner'; // Banner de encuesta

export const HomePage = () => {
	const { isPopupOpen, closePopup } = usePopupControl();
	
	console.log('HomePage - isPopupOpen:', isPopupOpen);

	return (
		<body className='bg-gray-100'>
			<Weather />
			<AccessibilityMenu />
			<SocialButtons />
			<NavbarSection />
			<HeroSection />
			<ServiceSection />
			<SectionNews />
			<AlcaldeSection />
			<SectionPlaces />
			<Footer />
			
			{/* Popup de emergencia */}
			<EmergencyPopup 
				isOpen={isPopupOpen} 
				onClose={closePopup}
			/>
			{/* Banner de encuesta */}
			<SurveyBanner surveyUrl="https://satisfaccion.servicios.gob.pe/encuestas/wmz3h0" />
		</body>
	);
};
