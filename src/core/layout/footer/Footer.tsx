import { ArrowUpRight, Clock, Facebook, Instagram, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/logo.webp';

export const Footer = () => {
	const { t } = useTranslation('footer');

	const normasDocumentos = t('norms', { returnObjects: true }) as string[];

	return (
		<footer className="w-full bg-gray-900 text-gray-300 relative pt-16 pb-4" aria-labelledby="footer-title">
			{/* Logo flotante */}
			<div className="absolute left-1/2 transform -translate-x-1/2 -top-12">
				<div className="w-24 h-24 bg-gray-900 rounded-full p-2 border-4 border-gray-900 flex items-center justify-center">
					<img
						src={logo}
						alt={t('logoAlt')}
						width={80}
						height={80}
						className="object-contain"
					/>
				</div>
			</div>

			{/* Nombre */}
			<div className="flex flex-col items-center mb-10 px-4 text-center">
				<h2 id="footer-title" className="text-xl md:text-2xl font-bold text-white">
					{t('entityName')}
				</h2>
				<div className="h-1 w-20 bg-blue-700 mt-3 mb-2" aria-hidden="true" />
			</div>

			<div className="h-px bg-gray-700 mb-10" aria-hidden="true" />

			<div className="container mx-auto px-4 lg:px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
					{/* Contacto */}
					<div className="flex flex-col" aria-labelledby="contact-title">
						<h3 id="contact-title" className="text-xl font-bold text-white mb-6 pb-2 border-b border-blue-700 inline-block">
							{t('contact.title')}
						</h3>

						<div className="space-y-4">
							<div className="flex items-start">
								<Clock className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
								<div>
									<h4 className="font-bold text-white text-sm">{t('contact.hoursLabel')}</h4>
									<p>{t('contact.hoursValue')}</p>
								</div>
							</div>

							<div className="flex items-start">
								<MapPin className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
								<div>
									<h4 className="font-bold text-white text-sm">{t('contact.addressLabel')}</h4>
									<p>{t('contact.addressLine1')}</p>
									<p className="mt-1">{t('contact.addressLine2')}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Emergencias */}
					<div className="flex flex-col" aria-labelledby="emergency-title">
						<h3 id="emergency-title" className="text-xl font-bold text-white mb-6 pb-2 border-b border-blue-700 inline-block">
							{t('emergency.title')}
						</h3>

						<div className="space-y-4">
							<div className="p-3 bg-gray-800 rounded-lg">
								<h4 className="font-bold text-white text-sm mb-1">{t('emergency.serenazgo')}</h4>
								<p className="flex items-center">
									<Phone className="w-4 h-4 text-yellow-500 mr-2" aria-hidden="true" />
									{t('emergency.serenazgoPhone')}
								</p>
							</div>

							<div className="p-3 bg-gray-800 rounded-lg">
								<h4 className="font-bold text-white text-sm mb-1">{t('emergency.policia')}</h4>
								<p className="flex items-center">
									<Phone className="w-4 h-4 text-yellow-500 mr-2" aria-hidden="true" />
									{t('emergency.policiaPhone')}
								</p>
							</div>

							<div className="p-3 bg-gray-800 rounded-lg">
								<h4 className="font-bold text-white text-sm mb-1">{t('emergency.bomberos')}</h4>
								<p className="flex items-center">
									<Phone className="w-4 h-4 text-yellow-500 mr-2" aria-hidden="true" />
									{t('emergency.bomberosPhone')}
								</p>
							</div>
						</div>
					</div>

					{/* Normas y documentos */}
					<div className="flex flex-col" aria-labelledby="norms-title">
						<h3 id="norms-title" className="text-xl font-bold text-white mb-6 pb-2 border-b border-blue-700 inline-block">
							{t('normsTitle')}
						</h3>

						<ul className="space-y-3 mb-8">
							{normasDocumentos.map((item, idx) => (
								<li key={idx}>
									<a href="#" className="flex items-center group hover:text-white transition-colors duration-200">
										<span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 group-hover:w-3 transition-all duration-200" aria-hidden="true" />
										{item}
										<ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
									</a>
								</li>
							))}
						</ul>

						<div>
							<h4 className="font-bold text-white mb-4">{t('followUs')}</h4>
							<div className="flex gap-3">
								<a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300">
									<Facebook className="w-5 h-5" aria-hidden="true" />
								</a>
								<a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 transition-colors duration-300">
									<Instagram className="w-5 h-5" aria-hidden="true" />
								</a>
								<a href="#" aria-label="YouTube" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300">
									<Youtube className="w-5 h-5" aria-hidden="true" />
								</a>
								<a href="#" aria-label="Twitter/X" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 transition-colors duration-300">
									<Twitter className="w-5 h-5" aria-hidden="true" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="h-px bg-gray-700 my-8" aria-hidden="true" />

			<div className="container mx-auto px-4 lg:px-6 flex flex-col md:flex-row justify-between items-center">
				<p className="text-sm mb-4 md:mb-0">{t('copyright')}</p>
				<div className="flex items-center">
					<p className="text-sm mr-4">{t('builtWithLove')}</p>
				</div>
			</div>
		</footer>
	);
};
