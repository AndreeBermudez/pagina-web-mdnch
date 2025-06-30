import { Layout } from '../../core/layout/Layout';
import RegistroCivil from '../../core/components/common/page/tramites/registroCivil/RegistroCivil';

export default function RegistroCivilPage() {
	return (
		<Layout>
			<main className='bg-gradient-to-br from-slate-100 to-slate-200 min-h-[calc(100vh-4rem)]'>
				<div className='container mx-auto px-4 md:px-15 pt-12 md:pt-24 pb-25'>
					<div className='text-center pb:mb-10'>
						<h1 className='text-4xl font-bold text-gray-800'>REGISTRO CIVIL</h1>
						<div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
					</div>
					<RegistroCivil />
				</div>
			</main>
		</Layout>
	);
}
