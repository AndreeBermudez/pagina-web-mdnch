import logoMunicipalidad from '../../../assets/logo.webp';
import { useEffect, useState } from 'react';

export const Loader = () => {
	const [fadeIn, setFadeIn] = useState(false);

	useEffect(() => {
		setFadeIn(true);
	}, []);

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-white to-gray-100'>
			<div
				className={`flex flex-col items-center transform transition-all duration-700 ease-in-out ${
					fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
				}`}>
				<div className='relative mb-6'>
					<div className='absolute rounded-full -inset-1 bg-blue-50 blur-md opacity-40'></div>
					<img src={logoMunicipalidad} alt='Logo Municipalidad' className='relative w-auto h-20 drop-shadow-lg' />
				</div>

				<div
					className='animate-spin rounded-full h-7 w-7 border-3 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent 
                        shadow-[0_0_10px_rgba(37,99,235,0.2)] animate-pulse-light'>
                </div>
			</div>
		</div>
	);
};
