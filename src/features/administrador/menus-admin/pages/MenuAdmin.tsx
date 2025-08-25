import { Menu, Plus } from 'lucide-react';
import { MenuItem } from '../components/MenuItem';
import type { MenuResponse } from '../schemas/menu.schema';

const menuItem: MenuResponse = {
	id: 1,
	nombre: 'Inicio',
	path: 'inicio',
	paginaId: null,
	padreId: null,
	orden: 1,
	estado: true,
	responsable: 'Admin',
	fechaCreacion: '2025-08-01',
	fechaModificacion: '2025-08-01',
	hijos: [
		{
			id: 1,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
		{
			id: 2,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
        {
			id: 2,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
        {
			id: 2,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
        {
			id: 2,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
        {
			id: 2,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
        {
			id: 2,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
        {
			id: 2,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
        {
			id: 2,
			nombre: 'Inicio',
			path: 'inicio',
			paginaId: null,
			padreId: null,
			orden: 1,
			estado: true,
			responsable: 'Admin',
			fechaCreacion: '2025-08-01',
			fechaModificacion: '2025-08-01',
		},
        
	],
};

const menuItem2: MenuResponse = {
	id: 1,
	nombre: 'Inicio',
	path: 'inicio',
	paginaId: null,
	padreId: null,
	orden: 1,
	estado: true,
	responsable: 'Admin',
	fechaCreacion: '2025-08-01',
	fechaModificacion: '2025-08-01',
};

const MenuAdmin = () => {
	return (
		<div className='px-2 space-y-6 '>
			{/* Header */}
			<div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-3'>
						<div className='p-2 rounded-lg bg-blue-50'>
							<Menu className='w-6 h-6 text-blue-700' />
						</div>
						<div>
							<h1 className='text-xl font-bold text-slate-900'>Gestión de Menus</h1>
							<p className='text-slate-600'>Configura el menu de la página principal</p>
						</div>
					</div>
					<button
						className='flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800'
						onClick={() => {}}>
						<Plus className='w-4 h-4' />
						<span className='hidden md:block'>Agregar Menú</span>
					</button>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center w-full gap-2 p-2 bg-gray-100 rounded-lg'>
				<MenuItem menu={menuItem} />
				<MenuItem menu={menuItem} />
				<MenuItem menu={menuItem} />
				<MenuItem menu={menuItem} />
				<MenuItem menu={menuItem2} />
			</div>
		</div>
	);
};
export default MenuAdmin;
