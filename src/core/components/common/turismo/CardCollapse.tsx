import { type LucideIcon, MoveRight } from 'lucide-react';

interface CardCollapseProps {
	title: string;
	description: string;
	Icon?: LucideIcon;
	imageSrc: string;
	altText?: string;
}

export const CardCollapse = ({
	title,
	description,
	Icon,
	imageSrc,
	altText = 'Imagen descriptiva',
}: CardCollapseProps) => {
	return (
		<article className='relative shadow-lg h-80 w-full overflow-hidden group'>
			<div className='absolute inset-0'>
				<img src={imageSrc} alt={altText} className='w-full h-full object-cover' />
			</div>
			<div className='absolute inset-0 bg-black/40 group-hover:bg-white/95 transition-all duration-400 ease-in-out'></div>
			<div className='absolute inset-0 flex flex-col justify-center items-center p-6 transition-all duration-400 ease-in-out'>
				<div className='flex flex-col items-center gap-3 transform translate-y-10 group-hover:translate-y-0 transition-all duration-400 ease-in-out'>
					{Icon && <Icon className='w-10 h-10 text-white group-hover:text-blue-900 transition-all duration-400' />}
					<h2 className='text-xl text-center font-bold text-white group-hover:text-blue-900 transition-all duration-400'>
						{title}
					</h2>
					<p className='text-center max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 text-blue-700 overflow-hidden transition-all duration-400 ease-in-out'>
						{description}
					</p>
					<div className='mt-2 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out'>
						<a
							href='#'
							className='inline-flex items-center text-blue-900 border border-blue-900 px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-900 hover:text-white transition-colors duration-400'>
							Leer mas <MoveRight className='w-4 h-4 ml-2' />
						</a>
					</div>
				</div>
			</div>
		</article>
	);
};
