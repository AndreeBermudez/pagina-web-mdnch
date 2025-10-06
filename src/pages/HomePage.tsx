import { useState, useEffect } from 'react';
import { AlcaldeSection } from '../core/components/common/page/home/alcalde/AlcaldeSection';

import { SectionNews } from '../core/components/common/page/home/noticias/SectionNews';
import { ServiceSection } from '../core/components/common/page/home/servicios/ServiceSection';
import { SectionPlaces } from '../core/components/common/page/home/turismo/SectionPlaces';
import { SocialButtons } from '../core/components/ui/SocialButtons';
import { Weather } from '../core/components/ui/Weather';
import { Footer } from '../core/layout/footer/Footer';
import { HeroSection } from '../core/layout/hero/HeroSection';
import { NavbarSection } from '../core/layout/navbar/NavbarSection';
import EmergencyPopup from '../core/components/common/EmergencyPopup';

export const HomePage = () => {
	const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);

	useEffect(() => {
		// Mostrar el popup solo si es la primera visita en esta sesión
		const hasSeenPopup = sessionStorage.getItem('emergencyPopupSeen');
		if (!hasSeenPopup) {
			// Mostrar el popup después de un pequeño delay para mejor UX
			const timer = setTimeout(() => {
				setShowEmergencyPopup(true);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, []);

	const handleClosePopup = () => {
		setShowEmergencyPopup(false);
		// Marcar que ya se vio el popup en esta sesión
		sessionStorage.setItem('emergencyPopupSeen', 'true');
	};

	return (
		<body className='bg-gray-100'>
			<Weather />
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
				isOpen={showEmergencyPopup} 
				onClose={handleClosePopup}
			/>
		</body>
	);
};
