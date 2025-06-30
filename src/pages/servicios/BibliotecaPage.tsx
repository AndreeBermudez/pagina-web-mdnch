import Biblioteca from '../../core/components/common/page/servicios/biblioteca/Biblioteca';
import { Layout } from '../../core/layout/Layout';

export default function BibliotecaPage() {
	return (
		<Layout>
			<main className='bg-gradient-to-br from-slate-100 to-slate-200 min-h-[calc(100vh-4rem)]'>
				<div className='container mx-auto px-15 pt-24 pb-12'>
					<div className='text-center mb-10'>
						<h1 className='text-4xl font-bold text-gray-800'>BIBLIOTECA</h1>
						<div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
					</div>
					<Biblioteca />
				</div>
			</main>
		</Layout>
	);
}
