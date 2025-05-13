import type { LucideIcon } from 'lucide-react';
import { MoveRight, UserCircle, Bell, Building, FileText, Trash2 } from 'lucide-react';

interface Props {
	title: string;
	description: string;
	icon: keyof typeof icons;
	color?: string;
	bgLightColor?: string;
	gradientColor?: {
		from: string;
		to: string;
	};
	tag?: string;
}

const icons = {
	userCircle: UserCircle,
	bell: Bell,
	building: Building,
	document: FileText,
	trash: Trash2,
};

export const CardService = ({
	title,
	description,
	icon,
	color = '#1e3a8a',
	bgLightColor = 'white',
	gradientColor,
	tag = 'Servicios',
}: Props) => {
	const IconComponent: LucideIcon = icons[icon] || UserCircle;

	const gradientStyle = gradientColor
		? { background: `linear-gradient(to right, ${gradientColor.from}, ${gradientColor.to})` }
		: { backgroundColor: color };

	return (
		<div className='flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full'>
			{/* Parte Principal */}
			<div style={{ backgroundColor: bgLightColor }} className='flex-grow'>
				<div className='flex flex-col p-6 space-y-4'>
					<div className='flex justify-between items-center'>
						<span
							style={{ backgroundColor: color }}
							className='py-1.5 px-4 rounded-full text-white text-xs font-medium'>
							{tag}
						</span>
						<IconComponent size={24} strokeWidth={2} color={color} />
					</div>
					<h2 className='text-xl uppercase font-bold tracking-wide'>{title}</h2>
					<p className='text-gray-600 text-base'>{description}</p>
				</div>
			</div>
			{/* Parte secundaria */}
			<div style={gradientStyle} className='p-4'>
				<div className='flex items-center text-white group cursor-pointer pt-3'>
					<span className='text-base font-medium'>Acceder</span>
					<MoveRight
						size={18}
						strokeWidth={2}
						className='ml-2 group-hover:translate-x-1 transition-transform duration-300'
					/>
				</div>
			</div>
		</div>
	);
};
