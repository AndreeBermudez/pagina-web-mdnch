import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { navLinks } from './navLinks';

export interface NavbarProps {
	isHomePage: boolean;
	scrolled: boolean;
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar = ({ isHomePage, scrolled, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) => {
	const navbarClasses = `fixed left-0 right-0 z-50 transition-all duration-300 ${
		isHomePage && !scrolled ? 'py-4 bg-transparent top-0 md:top-7' : 'py-2 bg-white shadow-md top-0'
	}`;

	const textClasses = isHomePage && !scrolled ? 'text-white' : 'text-blue-900';
	const subtextClasses = isHomePage && !scrolled ? 'text-blue-100' : 'text-blue-700';

	return (
		<>
			{/* Navbar */}
			<nav className={navbarClasses}>
				<div className='container-navbar'>
					<div className='w-full flex justify-between items-center'>
						{/* Logo */}
						<div className='flex items-center gap-3'>
							<img src={logo} alt='Logo' className='h-14 lg:h-12 w-auto' />
							<div className='hidden lg:flex lg:flex-col '>
								<span className={`font-bold text-base ${textClasses}`}>Municipalidad Distrital</span>
								<span className={`font-semibold text-sm ${subtextClasses}`}>Nuevo Chimbote</span>
							</div>
						</div>
						{/* Navegación desktop */}
						<div className='hidden md:flex items-center gap-6'>
							{navLinks.map((link, index) => (
								<div key={index} className='relative group'>
									<Link
										to={link.href}
										className={`${textClasses} relative font-medium text-sm flex items-center gap-1 pb-1`}>
										<span
											className={`after:absolute after:content-[''] after:w-0 after:h-0.5 after:bg-amber-400 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300`}>
											{link.label}
										</span>
										{link.hasDropdown && <ChevronDown size={16} />}
									</Link>

									{link.hasDropdown && (
										<div className='absolute left-0 top-full mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
											<div className='py-2'>
												{link.dropdownItems?.map((item, idx) => (
													<Link
														key={idx}
														to={item.href}
														className='block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100'>
														{item.label}
													</Link>
												))}
											</div>
										</div>
									)}
								</div>
							))}
							<Link
								to='/contact'
								className='ml-2 bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium'>
								Contáctanos
							</Link>
						</div>
						{/* Botón menú móvil */}
						<button
							className={`md:hidden p-2 rounded ${textClasses}`}
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
							{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};
