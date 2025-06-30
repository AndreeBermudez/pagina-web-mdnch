import { TurismoPage } from '../../core/components/common/page/tu-distrito/turismo';
import { Layout } from '../../core/layout/Layout';

export default function TurismoPageContainer() {
	return (
		<div className='bg-gray-100 min-h-screen flex flex-col'>
			<Layout>
				<TurismoPage />
			</Layout>
		</div>
	);
}
