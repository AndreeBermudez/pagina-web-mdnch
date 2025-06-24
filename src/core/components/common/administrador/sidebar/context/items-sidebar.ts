import { Calendar, Figma, FilePenLine, FilePlus2, Settings, type LucideIcon } from 'lucide-react';

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
		titulo: 'Consejo Municipal',
		link: '/admin/consejoMunicipal',
		icon: FilePlus2,
		isActive: false,
	},
	{
		titulo: 'Noticias',
		link: '/admin/noticias',
		icon: Calendar,
		isActive: false,
	},
	{
		titulo: 'Organigrama',
		link: '/admin/organigrama',
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