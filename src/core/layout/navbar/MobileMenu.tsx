// src/core/components/common/navbar/MobileMenu.tsx
import { BookOpen, Mail, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../assets/logo.webp';
import { navLinks } from './navLinks';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface MobileProps {
	isOpen: boolean;
	onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileProps) => {
	const [openGroup, setOpenGroup] = useState<string | null>(null);
	const { t } = useTranslation('header');

	// traduce con fallback al label en caso no haya i18nKey
	const tr = (i18nKey: string | undefined, fallback: string) =>
		i18nKey ? t(i18nKey) : fallback;

	return (
		<div className="md:hidden">
			{/* Botón hamburguesa (el que abre desde barra) */}
			<button
				onClick={onClose}
				className="text-white p-2 focus:outline-none"
				aria-label={t('mobile.toggleMenu')}
			>
				<Menu size={28} />
			</button>

			{/* Panel móvil */}
			<div
				className={`fixed inset-0 bg-blue-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
				role="dialog"
				aria-modal="true"
			>
				{/* Header */}
				<div className="bg-blue-900 p-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Link to="/" replace>
							<img src={logo} alt={t('brand.logoAlt')} className="w-8 h-auto" />
						</Link>
						<div className="flex flex-col">
							<span className="text-white font-bold">{t('brand.line1')}</span>
							<span className="text-blue-200 text-sm">{t('brand.line2')}</span>
						</div>
					</div>
					<button onClick={onClose} className="text-white" aria-label={t('mobile.closeMenu')}>
						<X size={24} />
					</button>
				</div>

				{/* Top Links */}
				<div className="bg-blue-800 p-4 space-y-2">
					<a href="https://webmail.muninuevochimbote.gob.pe/" className="flex items-center gap-3 text-white">
						<Mail size={18} /> {t('mobile.webmail')}
					</a>
					<a href="https://facilita.gob.pe/t/4220" className="flex items-center gap-3 text-white">
						<BookOpen size={18} /> {t('mobile.mesaPartes')}
					</a>
					<a
						href="https://www.transparencia.gob.pe/"
						className="flex items-center gap-3 text-white"
					>
						<Search size={18} /> {t('mobile.pte')}
					</a>
				</div>

				<hr className="border-white/30 mx-4" />

				{/* Navegación */}
				<nav className="p-4 space-y-2 text-white">
					{navLinks.map((link) => {
						const linkKey = link.i18nKey ?? `link:${link.label}`;
						const label = tr(link.i18nKey, link.label);

						return (
							<div key={linkKey}>
								{!link.hasDropdown && link.href ? (
									<Link
										to={link.href}
										onClick={onClose}
										className="block py-2 font-semibold hover:text-blue-300"
									>
										{label}
									</Link>
								) : (
									<>
										<button
											onClick={() => setOpenGroup((prev) => (prev === linkKey ? null : linkKey))}
											className="w-full flex justify-between items-center py-2 font-semibold hover:text-blue-300"
											aria-expanded={openGroup === linkKey}
										>
											{label}
											<span>{openGroup === linkKey ? '−' : '+'}</span>
										</button>
										{openGroup === linkKey && (
											<div className="pl-4 mt-1 space-y-1">
												{link.dropdownItems?.map((item) => {
													const itemKey = item.i18nKey ?? `item:${item.label}:${item.href}`;
													return (
														<Link
															key={itemKey}
															to={item.href}
															onClick={onClose}
															className="block text-sm hover:text-blue-300 py-1"
														>
															{tr(item.i18nKey, item.label)}
														</Link>
													);
												})}
											</div>
										)}
									</>
								)}
							</div>
						);
					})}
				</nav>
			</div>
		</div>
	);
};
