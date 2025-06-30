import OrganigramaSection from '../../core/components/common/page/nosotros/organigrama/Organigrama';
import { Layout } from '../../core/layout/Layout';

export default function OrganigramaPage() {
	return (
		<Layout>
			<main className='bg-gradient-to-br from-slate-100 to-slate-200 min-h-[calc(100vh-4rem)]'>
				<div className='container mx-auto px-10 md:px-15 pt-10 md:pt-24 md:pb-25'>
					<div className='text-center mb-10'>
						<h1 className='text-4xl font-bold text-gray-800'>ORGANIGRAMA</h1>
						<div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
					</div>
					<OrganigramaSection />
				</div>
			</main>
		</Layout>
	);
}
