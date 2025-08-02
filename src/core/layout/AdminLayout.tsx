import { LogOutIcon, Menu } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { SidebarProvider, useSidebarContext } from './sidebar/context/SidebarContext';

const AdminLayoutContent: React.FC = () => {
	const { handleMenuClick } = useSidebarContext();
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('user');
		navigate('/login');
	};

	return (
		<div className='flex h-screen overflow-hidden font-inter'>
			<Sidebar />
			<main className='sticky flex flex-col w-full overflow-auto'>
				<header className='bg-white border-0 border-gray-300 h-14 border-b-1'>
					<div className='flex items-center justify-between h-full px-6 py-2'>
						<div className='w-10'>
							<button
								className='p-2 transition-colors rounded-lg hover:bg-gray-100 md:hidden lg:block'
								onClick={handleMenuClick}>
								<Menu className='w-5 text-gray-600' />
							</button>
						</div>
						<div className='flex items-center space-x-3'>
							<div
								className='flex items-center justify-center px-4 py-2 space-x-4 text-gray-600 rounded-lg hover:bg-gray-100'
								onClick={logout}>
								<span className='text-sm text-gray-600'>Salir</span>
								<LogOutIcon size={20} />
							</div>
						</div>
					</div>
				</header>
				<section className='flex-1 mx-6 my-6'>
					<Outlet />
				</section>
			</main>
		</div>
	);
};

export const AdminLayout: React.FC = () => {
	return (
		<SidebarProvider>
			<AdminLayoutContent />
		</SidebarProvider>
	);
};
