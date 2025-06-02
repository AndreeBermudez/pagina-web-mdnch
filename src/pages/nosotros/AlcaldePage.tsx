import AlcaldeInfo from '../../core/components/common/nosotros/alcalde/AlcaldeInfo';

import { Layout } from '../../core/layout/Layout';

export const AlcaldePage = () => {
	return (
		<Layout>
			<main className='bg-gradient-to-br from-slate-100 to-slate-200 min-h-[calc(100vh-4rem)]'>
				<div className='container mx-auto px-15 pt-24 pb-25'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold text-gray-800'>NUESTRO ALCALDE</h1>
						<div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
					</div>
					<AlcaldeInfo />
				</div>
			</main>
		</Layout>
	);
};
