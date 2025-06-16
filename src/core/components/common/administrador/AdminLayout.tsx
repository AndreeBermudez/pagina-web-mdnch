import { LogOutIcon, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loader } from './loader/Loader';
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

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	if (isLoading) return <Loader />;

	return (
		<div className='flex'>
			<Sidebar />
			<main className='flex flex-col w-full bg-gray-50'>
				<header className='bg-white h-[76px] border-0 border-b-1 border-gray-300'>
					<div className='flex items-center justify-between px-6 py-4'>
						<div className='w-10'>
							<button
								className='p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors md:hidden lg:block'
								onClick={handleMenuClick}>
								<Menu className='h-6 w-6 text-gray-600' />
							</button>
						</div>
						<div className='flex items-center space-x-3'>
							<span className='text-sm text-gray-600'>Salir</span>
							<div
								className='rounded-full bg-blue-600 p-2 text-white flex items-center justify-center'
								onClick={logout}>
								<LogOutIcon size={20} />
							</div>
						</div>
					</div>
				</header>
				<section className='flex-1 my-6 mx-6 sm:mx-9 overflow-x-auto'>
					<div className='w-full bg-white rounded-lg shadow-md flex flex-col gap-5'>
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
