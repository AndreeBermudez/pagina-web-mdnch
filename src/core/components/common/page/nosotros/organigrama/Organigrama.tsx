import { useEffect, useState } from 'react';
import { listaOrganigramas } from '../../../../../services/organigrama/listaOrganigramas';
import type { Organigrama } from '../../../../../services/organigrama/organigrama.interface';

export default function Organigrama() {
	const [organigramaUrl, setOrganigramaUrl] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const data: Organigrama[] = await listaOrganigramas();
			if (data.length > 0) {
				const ultimo = data[data.length - 1];
				setOrganigramaUrl(ultimo.direccionImagen);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='container mx-auto px-2 md:px-4 py-2 md:py-4 flex justify-center'>
			{organigramaUrl ? (
				<img
					src={organigramaUrl}
					alt='Organigrama Municipal'
					className='w-full h-auto shadow-lg rounded object-contain hover:scale-105 transition-transform duration-300 cursor-zoom-in'
				/>
			) : (
				<p className='text-gray-500'>No se ha subido un organigrama aún.</p>
			)}
		</div>
	);
}
