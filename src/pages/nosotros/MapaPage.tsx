import React from 'react';
import { MapaSection } from '../../core/components/common/nosotros/mapa';
import { Layout } from '../../core/layout/Layout';

export default function MapaPage() {
	return (
		<Layout>
			<div className='container mx-auto px-15'>
				<div className='text-center mt-20 mb-10'>
					<h1 className='text-4xl font-bold text-gray-800'>Mapa del Distrito</h1>
					<div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
				</div>
			</div>

			<MapaSection />
		</Layout>
	);
}
