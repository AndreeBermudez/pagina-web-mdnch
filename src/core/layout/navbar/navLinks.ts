interface NavLink {
	href: string;
	label: string;
	hasDropdown?: boolean;
	dropdownItems?: {
		href: string;
		label: string;
	}[];
}

export const navLinks: NavLink[] = [
	{ href: '/', label: 'Inicio' },
	{ href: '/publicaciones', label: 'Publicaciones' },
	{
		href: '/nosotros',
		label: 'Nosotros',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/nosotros/calendar', label: 'Agenda' },
			{ href: '/nosotros/directorio', label: 'Directorio de Funcionarios' },
			{ href: '/nosotros/alcalde', label: 'Alcalde' },
			{ href: '/nosotros/consejoMunicipal', label: 'Consejo Municipal' },
			{ href: '/nosotros/organigrama', label: 'Organigrama' },
			{ href: '/nosotros/mapa', label: 'Mapa' },
		],
	},
	{
		href: '/tudistrito',
		label: 'Tu Distrito',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/tudistrito/turismo', label: 'Turismo' },
			{ href: '/tudistrito/pdu', label: 'PDU' },
			{ href: '/tudistrito/misionVision', label: 'Misión y Visión' },
			{ href: '/tudistrito/reseñaHistorica', label: 'Reseña Histórica' },
			{ href: '/tudistrito/himno', label: 'Himno' },
			{ href: '/tudistrito/escudo', label: 'Escudo y bandera' },
		],
	},
	{
		href: '/servicios',
		label: 'Servicios',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/servicios/plataforma', label: 'Plataforma Única del Estado Peruano' },
			{ href: '/servicios/reclamaciones', label: 'Libro de Reclamaciones' },
			{ href: '/servicios/salud', label: 'Salud' },
			{ href: '/servicios/seguridad', label: 'Seguridad Ciudadana' },
			{ href: '/servicios/presupuesto', label: 'Presupuesto Participativo' },
			{ href: '/servicios/biblioteca', label: 'Biblioteca Municipal' },
			{ href: '/servicios', label: 'Ver Todos los Servicios' },
		],
	},
	{
		href: '/tramites',
		label: 'Trámites',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/tramites/defensa-civil', label: 'Defensa Civil' },
			{ href: '/tramites/transparencia', label: 'Transparencia' },
			{ href: '/tramites/control-interno', label: 'Control Interno' },
			{ href: '/tramites/registro-civil', label: 'Registro Civil' },
			{ href: '/tramites/licencia-funcionamiento', label: 'Licencia de Funcionamiento' },
			{ href: '/tramites/licencia-edificacion', label: 'Licencia de Edificación' },
			{ href: '/tramites/convocatorias', label: 'CONVOCATORIAS CAS 2025' },
			{ href: '/tramites/denuncia', label: 'DENUNCIA CONTRA LA CORRUPCION' },
			{ href: '/tramites', label: 'Ver Todos los trámites' },
		],
	},
];
