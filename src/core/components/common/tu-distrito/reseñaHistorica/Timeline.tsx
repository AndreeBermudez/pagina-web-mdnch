import { Clock } from 'lucide-react';

type TimelineItem = {
	year: string;
	event: string;
};

type TimelineProps = {
	items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
	return (
		<div className='bg-white rounded-xl shadow-md p-6 border border-blue-100'>
			<h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
				<Clock className='w-5 h-5 mr-2 text-blue-500' />
				Línea de Tiempo
			</h3>
			<div className='space-y-4'>
				{items.map((item, index) => (
					<div key={index} className='flex'>
						<div className='mr-4 flex flex-col items-center'>
							<div className='w-3 h-3 bg-blue-500 rounded-full'></div>
							{index < items.length - 1 && <div className='w-0.5 h-full bg-blue-200'></div>}
						</div>
						<div>
							<span className='text-blue-600 font-medium block'>{item.year}</span>
							<span className='text-gray-600 text-sm'>{item.event}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
