import logoMunicipalidad from '../../../assets/logo.webp';
import { ButtonAdmin } from './ButtonAdmin';
import { ButtonSidebarCollapsed } from './ButtonSidebarCollapsed';
import { useSidebarContext } from './context/SidebarContext';
import { menuItems } from './context/items-sidebar';

export const Sidebar: React.FC = () => {
	const {
		isCollapsed,
		isMobileMenuOpen,
		isMobile,
		setIsMobileMenuOpen,
		toggleButtonSidebar,
		toggleDropdown,
		isDropdownOpen,
	} = useSidebarContext();
	return (
		<>
			<div
				className={`
                md:flex md:flex-col justify-between h-screen bg-white transition-all duration-300 ease-in-out w-20 
              ${isMobileMenuOpen && isMobile ? 'z-40 fixed top-0 left-0 w-60' : 'hidden'} 
              ${isCollapsed ? 'lg:w-20' : 'lg:w-60'}`}>
				<section className='flex flex-col items-center'>
					<div className='flex items-center mb-4 border-0 border-b-1 border-gray-300 px-6 py-3 h-[76px]'>
						<img src={logoMunicipalidad} alt='Logo Municipalidad' className='w-10 h-10' />
						<span
							className={`ml-2 font-bold text-[15px] text-blue-600 md:hidden lg:block ${
								isCollapsed && 'lg:hidden'
							}`}>
							Municipalidad de Nuevo Chimbote
						</span>
					</div>
					<div className='flex flex-col w-full'>
						{menuItems.map((item) => (
							<ButtonSidebarCollapsed
								key={item.titulo}
								titulo={item.titulo}
								Icon={item.icon}
								isCollapsed={isCollapsed}
								isDropdown={isDropdownOpen(item.titulo)}
								items={item.subMenu ? item.subMenu : []}
								onClick={() => toggleDropdown(item.titulo)}
								toggleButtonSidebar={toggleButtonSidebar}
							/>
						))}
					</div>
				</section>
				<section className={`flex flex-col items-center gap-4 p-4 mb-3`}>
					<ButtonAdmin isCollapsed={isCollapsed} />
				</section>
			</div>
			{isMobileMenuOpen && (
				<div
					className='fixed inset-0 z-30 w-screen h-screen md:hidden bg-black/50'
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}
		</>
	);
};
