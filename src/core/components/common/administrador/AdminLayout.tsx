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
		<div className='flex'>
			<Sidebar />
			<main className='flex flex-col w-full bg-gray-50'>
				<header className='bg-white h-[76px] border-0 border-b-1 border-gray-300'>
					<div className='flex items-center justify-between px-6 py-4'>
						<div className='w-10'>
							<button
								className='p-2 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100 md:hidden lg:block'
								onClick={handleMenuClick}>
								<Menu className='w-6 h-6 text-gray-600' />
							</button>
						</div>
						<div className='flex items-center space-x-3'>
							<span className='text-sm text-gray-600'>Salir</span>
							<div
								className='flex items-center justify-center p-2 text-white bg-blue-600 rounded-full'
								onClick={logout}>
								<LogOutIcon size={20} />
							</div>
						</div>
					</div>
				</header>
				<section className='flex-1 mx-6 my-6 overflow-x-auto sm:mx-9'>
					<div className='flex flex-col w-full gap-5 bg-white rounded-lg shadow-md'>
						<Outlet />
					</div>
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
