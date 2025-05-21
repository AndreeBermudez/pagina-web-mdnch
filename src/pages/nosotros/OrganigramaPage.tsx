import React from 'react';
import { OrganigramaSection } from '../../core/components/common/nosotros/organigrama';
import { Layout } from '../../core/layout/Layout';

export default function OrganigramaPage() {
	return (
		<Layout>
			<div className='container mx-auto px-15'>
				<div className='text-center mt-20 mb-10'>
					<h1 className='text-4xl font-bold text-gray-800'>Organigrama Municipal</h1>
					<div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
				</div>
			</div>

			<OrganigramaSection />
		</Layout>
	);
}
