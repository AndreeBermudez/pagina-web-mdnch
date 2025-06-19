import { Figma, FilePenLine, FilePlus2, Settings, type LucideIcon } from 'lucide-react';

export interface MenuItem {
	titulo: string;
	link: string;
	icon: LucideIcon;
	isActive: boolean;
}

export const menuItems = [
	{
		titulo: 'Agenda',
		link: '/admin/contenido',
		icon: FilePenLine,
		isActive: false,
	},
	{
		titulo: 'Funcionarios',
		link: '/admin/funcionarios',
		icon: FilePenLine,
		isActive: false,
	},
	{
		titulo: 'Documentos de Gestión',
		link: '/admin/docs',
		icon: FilePlus2,
		isActive: false,
	},
	{
		titulo: 'Fronted',
		link: '/admin/frontend',
		icon: Figma,
		isActive: false,
	},
		{
		titulo: 'Configuración',
		link: '/admin/configuracion',
		icon: Settings,
		isActive: false,
	},
];