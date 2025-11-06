import Biblioteca from '../../core/components/common/page/servicios/biblioteca/Biblioteca';
import { Layout } from '../../core/layout/Layout';

export default function BibliotecaPage() {
	return (
		<Layout>
			<main className='bg-gradient-to-br from-slate-100 to-slate-200 min-h-[calc(100vh-4rem)]'>
				<div className='container mx-auto '>
					<Biblioteca />
				</div>
			</main>
		</Layout>
	);
}
