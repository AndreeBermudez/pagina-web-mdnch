import React from 'react';
import { TurismoPage } from '../../core/components/common/tuDistrito/turismo';
import { NavbarSection } from '../../core/layout/navbar/NavbarSection';
import { Footer } from '../../core/layout/footer/Footer';

export default function TurismoPageContainer() {
	return (
		<div className='bg-gray-100 min-h-screen flex flex-col'>
			<NavbarSection />
			<TurismoPage />
			<Footer />
		</div>
	);
}
