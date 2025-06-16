import type { LucideIcon } from 'lucide-react';
import type { ButtonLogoutProps } from './ButtonAdmin';
import { cn } from '../../../../utils/cn';

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
				'flex items-center gap-2 w-full px-6 py-3 font-medium text-sm transition-colors cursor-pointer',
				isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50',
				className
			)}
			onClick={onClick}>
			<Icon size={18} />
			<span className={`${isCollapsed ? 'lg:hidden' : 'lg:block'} md:hidden`}>{titulo}</span>
		</button>
	);
};
