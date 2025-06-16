import { ExternalLink, X } from 'lucide-react';

interface YearData {
	trimestre: string;
	link: string;
}

interface YearSectionProps {
	year: number;
	data: YearData[];
	documentId: number;
}

export const YearSection = ({ year, data, documentId }: YearSectionProps) => {
	if (data.length === 0) return null;

	// Colores según el año
	const yearColors = {
		2024: {
			badge: 'bg-emerald-600 text-white',
			container: 'bg-emerald-25 border-emerald-200',
			header: 'bg-gradient-to-r from-emerald-50 to-emerald-100',
			trimestre: 'bg-emerald-100 text-emerald-800',
			card: 'border-emerald-200 hover:border-emerald-300 hover:shadow-emerald-100',
			button: 'bg-emerald-600 hover:bg-emerald-700',
		},
		2023: {
			badge: 'bg-amber-600 text-white',
			container: 'bg-amber-25 border-amber-200',
			header: 'bg-gradient-to-r from-amber-50 to-amber-100',
			trimestre: 'bg-amber-100 text-amber-800',
			card: 'border-amber-200 hover:border-amber-300 hover:shadow-amber-100',
			button: 'bg-amber-600 hover:bg-amber-700',
		},
	};

	const colors = yearColors[year as keyof typeof yearColors] || yearColors[2024];

	return (
		<div className={`${colors.container} border-2 rounded-xl p-4 space-y-4`}>
			{/* Header del año */}
			<div className={`${colors.header} -m-4 mb-4 p-4 rounded-t-xl border-b border-gray-200`}>
				<div className='flex items-center gap-3'>
					<div className={`${colors.badge} px-3 py-1 rounded-full text-sm font-semibold shadow-sm`}>{year}</div>
					<h4 className='text-lg font-semibold text-gray-800'>Periodo {year}</h4>
					<div className='flex-1 h-px bg-gray-300'></div>
					<span className='text-xs text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 font-medium'>
						{data.length} documento{data.length !== 1 ? 's' : ''}
					</span>
				</div>
			</div>

			{/* Cards de trimestres */}
			<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
				{data.map((item) => (
					<div
						key={`${documentId}-${year}-${item.trimestre}`}
						className={`bg-white border-2 ${colors.card} rounded-xl p-4 transition-all duration-200 shadow-sm hover:shadow-md`}>
						<div className='flex items-start justify-between gap-3'>
							<div className='flex-1 min-w-0'>
								<div className='flex items-center gap-2 mb-3'>
									<span
										className={`inline-flex items-center px-3 py-1 ${colors.trimestre} text-xs font-semibold rounded-lg`}>
										{item.trimestre}
									</span>
									<span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md'>{year}</span>
								</div>
							</div>

							<div className='flex-shrink-0'>
								{item.link ? (
									<a
										href={item.link}
										target='_blank'
										rel='noopener noreferrer'
										className={`inline-flex items-center justify-center w-10 h-10 ${colors.button} text-white rounded-xl transition-all duration-200 group shadow-sm hover:shadow-md`}>
										<ExternalLink className='w-4 h-4 group-hover:scale-110 transition-transform' />
									</a>
								) : (
									<div className='inline-flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-400 rounded-xl border-2 border-gray-300'>
										<X className='w-4 h-4' />
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
