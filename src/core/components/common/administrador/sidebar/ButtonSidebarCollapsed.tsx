import { ChevronLeft, type LucideIcon } from 'lucide-react';
import type { ButtonLogoutProps } from './ButtonAdmin';
import { Link } from 'react-router-dom';
import { ButtonSidebar } from './ButtonSidebar';
import type { MenuItem } from './context/items-sidebar';

interface ButtonSidebarCollapsedProps extends ButtonLogoutProps {
	titulo: string;
	Icon: LucideIcon;
	isCollapsed: boolean;
	isDropdown?: boolean;
	isActive: boolean;
	items: MenuItem[];
	toggleButtonSidebar: () => void;
	onClick: () => void;
}

export const ButtonSidebarCollapsed = ({
	titulo,
	Icon,
	isCollapsed,
	isDropdown,
	isActive,
	onClick,
	toggleButtonSidebar,
	items,
}: ButtonSidebarCollapsedProps) => {
	return (
		<div>
			<button
				className={`flex items-center justify-between gap-2 w-full px-6 py-3 font-medium text-sm transition-colors cursor-pointer
					 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
				onClick={onClick}>
				<div className='flex items-center gap-2 w-full'>
					<Icon size={18} />
					<span className={`${isCollapsed ? 'lg:hidden' : 'lg:block'} md:hidden`}>{titulo}</span>
				</div>
				<div className={isCollapsed ? 'hidden' : 'flex items-center'}>
					<ChevronLeft
						size={18}
						className={`transition-all duration-200 ${isDropdown ? '-rotate-90' : 'rotate-0'}`}
					/>
				</div>
			</button>
			<div
				className={`transform transition-all duration-300 ease-in-out origin-top ${
					isDropdown ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'
				}`}>
				{items.map((links) => (
					<Link to={links.link} key={links.link}>
						<ButtonSidebar
							titulo={links.titulo}
							Icon={links.icon}
							isCollapsed={isCollapsed}
							onClick={toggleButtonSidebar}
							isActive={location.pathname === links.link}
							className={'bg-gray-100 pl-8 pr-6'}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};
