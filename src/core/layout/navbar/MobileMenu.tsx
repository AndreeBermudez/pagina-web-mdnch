import { BookOpen, Mail, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../assets/logo.webp';
import { navLinks } from './navLinks';

export interface MobileProps {
	isOpen: boolean;
	onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileProps) => {
	const [openGroup, setOpenGroup] = useState<string | null>(null);

	return (
		<div className='md:hidden'>
			{/* Botón hamburguesa */}
			<button onClick={onClose} className='text-white p-2 focus:outline-none'>
				<Menu size={28} />
			</button>

			{/* Panel móvil de ancho completo */}
			<div
				className={`fixed inset-0 bg-blue-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}>
				{/* Header */}
				<div className='bg-blue-900 p-4 flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<img src={logo} alt='Logo' className='w-8 h-8' />
						<div className='flex flex-col'>
							<span className='text-white font-bold'>Municipalidad Distrital</span>
							<span className='text-blue-200 text-sm'>Nuevo Chimbote</span>
						</div>
					</div>
					<button onClick={onClose} className='text-white'>
						<X size={24} />
					</button>
				</div>

				{/* Top Links */}
				<div className='bg-blue-800 p-4 space-y-2'>
					<a href='https://webmail.muninuevochimbote.gob.pe/' className='flex items-center gap-3 text-white'>
						<Mail size={18} /> Web Email
					</a>
					<a href='https://facilita.gob.pe/t/4220' className='flex items-center gap-3 text-white'>
						<BookOpen size={18} /> Mesa de Partes
					</a>
					<a href='https://www.transparencia.gob.pe/' className='flex items-center gap-3 text-white'>
						<Search size={18} /> Portal de Transparencia
					</a>
				</div>

				<hr className='border-white/30 mx-4' />

				{/* Navegación Principal */}
				<nav className='p-4 space-y-2 text-white'>
					{navLinks.map((link) => (
						<div key={link.label}>
							{' '}
							{!link.hasDropdown && link.href ? (
								<a href={link.href} onClick={onClose} className='block py-2 font-semibold hover:text-blue-300'>
									{link.label}
								</a>
							) : (
								<>
									<button
										onClick={() => setOpenGroup((prev) => (prev === link.label ? null : link.label))}
										className='w-full flex justify-between items-center py-2 font-semibold hover:text-blue-300'>
										{link.label}
										<span>{openGroup === link.label ? '−' : '+'}</span>
									</button>
									{openGroup === link.label && (
										<div className='pl-4 mt-1 space-y-1'>
											{link.dropdownItems?.map((item) => (
												<a
													key={item.label}
													href={item.href}
													onClick={onClose}
													className='block text-sm hover:text-blue-300 py-1'>
													{item.label}
												</a>
											))}
										</div>
									)}
								</>
							)}
						</div>
					))}
				</nav>
			</div>
		</div>
	);
};
