import { Users } from 'lucide-react';

type DemographicDataProps = {
	data: {
		year: string;
		population: string;
		percentage: string;
	}[];
};

export default function DemographicData({ data }: DemographicDataProps) {
	return (
		<div className='bg-white rounded-xl shadow-md p-6 border border-blue-100'>
			<h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
				<Users className='w-5 h-5 mr-2 text-blue-500' />
				Datos Demográficos
			</h3>
			<div className='space-y-3'>
				{data.map((item, index) => (
					<div key={index}>
						<div className='flex justify-between items-center'>
							<span className='text-gray-600'>{item.year}</span>
							<span className='font-medium'>{item.population}</span>
						</div>
						<div className='w-full bg-gray-200 h-2 rounded-full'>
							<div className='bg-blue-400 h-2 rounded-full' style={{ width: item.percentage }}></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
