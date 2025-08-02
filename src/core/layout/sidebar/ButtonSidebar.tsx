import type { LucideIcon } from 'lucide-react';
import type { ButtonLogoutProps } from './ButtonAdmin';
import { cn } from '../../utils/cn';

interface ButtonSidebarProps extends ButtonLogoutProps {
	titulo: string;
	Icon: LucideIcon;
	isCollapsed: boolean;
	isActive: boolean;
	onClick: () => void;
	className?: string;
}

export const ButtonSidebar = ({ titulo, Icon, isCollapsed, isActive, onClick, className }: ButtonSidebarProps) => {
	return (
		<button
			className={cn(
				'relative ml-2 flex items-center gap-2 w-11/12 px-4 py-3 font-medium text-sm transition-colors cursor-pointer text-white/80 hover:bg-item-sidebar',
				isActive && 'bg-item-sidebar border-r-4 border-blue-600',
				className
			)}
			onClick={onClick}>
				<div className='absolute w-[1px] h-full bg-white/80 left-0' />
				<Icon size={18} className={`flex-shrink-0 md:ml-0 ${isCollapsed ? 'ml-0' : 'ml-2'}`} />
				<span className={`${isCollapsed ? 'lg:hidden' : 'lg:block'} md:hidden`}>{titulo}</span>
		</button>
	);
};
