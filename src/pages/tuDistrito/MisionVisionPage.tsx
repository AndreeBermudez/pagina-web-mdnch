import MisionVision from '../../core/components/common/tuDistrito/visionMision/MisionVision';
import { Layout } from '../../core/layout/Layout';
export default function MisionVisionPage() {
	return (
		<Layout>
			<div className='container mx-auto px-15'>
				<div className='text-center mt-20 mb-10'>
					<h1 className='text-4xl font-bold text-gray-800'>Mision y Vision</h1>
					<div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
				</div>
			</div>
			<MisionVision />
		</Layout>
	);
}
