// ======================================
// 🌐 NAVBAR LINKS MULTI-IDIOMA
// Compatible con i18next ('header' namespace)
// Si no hay traducción, usa el label por defecto
// ======================================

export interface NavLink {
	href?: string;
	label: string;          // Texto por defecto (fallback)
	i18nKey?: string;       // Clave i18n opcional
	hasDropdown?: boolean;
	dropdownItems?: {
		href: string;
		label: string;
		i18nKey?: string;
	}[];
}

export const navLinks: NavLink[] = [
	{ href: '/', label: 'Inicio', i18nKey: 'nav.home' },

	// ==== NOSOTROS ====
	{
		label: 'Nosotros',
		i18nKey: 'nav.about',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/nosotros/calendar', label: 'Agenda', i18nKey: 'nav.agenda' },
			{ href: '/nosotros/directorio', label: 'Directorio de Funcionarios', i18nKey: 'nav.staffDirectory' },
			{ href: '/nosotros/alcalde', label: 'Alcalde', i18nKey: 'nav.mayor' },
			{ href: '/nosotros/consejoMunicipal', label: 'Consejo Municipal', i18nKey: 'nav.council' },
			{ href: '/nosotros/organigrama', label: 'Organigrama', i18nKey: 'nav.orgChart' },
			{ href: '/nosotros/mapa', label: 'Mapa', i18nKey: 'nav.map' }
		]
	},

	// ==== TU DISTRITO ====
	{
		label: 'Tu Distrito',
		i18nKey: 'nav.district',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/tudistrito/turismo', label: 'Turismo', i18nKey: 'nav.tourism' },
			{ href: '/tudistrito/pdu', label: 'PDU', i18nKey: 'nav.pdu' },
			{ href: '/tudistrito/misionVision', label: 'Misión y Visión', i18nKey: 'nav.missionVision' },
			{ href: '/tudistrito/reseñaHistorica', label: 'Reseña Histórica', i18nKey: 'nav.history' },
			{ href: '/tudistrito/himno', label: 'Himno', i18nKey: 'nav.anthem' },
			{ href: '/tudistrito/escudo', label: 'Escudo y bandera', i18nKey: 'nav.shieldFlag' },
			{ href: '/tudistrito/noticias', label: 'Noticias', i18nKey: 'nav.news' }
		]
	},

	// ==== SERVICIOS ====
	{
		label: 'Servicios',
		i18nKey: 'nav.services',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/servicios/reclamaciones', label: 'Libro de Reclamaciones', i18nKey: 'nav.claimsBook' },
			{ href: '/servicios/presupuesto', label: 'Presupuesto Participativo', i18nKey: 'nav.participatoryBudget' },
			{ href: '/servicios/biblioteca', label: 'Biblioteca Municipal', i18nKey: 'nav.library' }
		]
	},

	// ==== TRÁMITES ====
	{
		label: 'Trámites',
		i18nKey: 'nav.procedures',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/tramites/defensa-civil', label: 'Defensa Civil', i18nKey: 'nav.civilDefense' },
			{ href: '/tramites/registro-civil', label: 'Registro Civil', i18nKey: 'nav.civilRegistry' },
			{ href: '/tramites/licencia-funcionamiento', label: 'Licencia de Funcionamiento', i18nKey: 'nav.businessLicense' },
			{ href: '/tramites/licencia-edificacion', label: 'Licencia de Edificación', i18nKey: 'nav.buildingLicense' },
			{ href: '/tramites/convocatorias', label: 'CONVOCATORIAS CAS 2025', i18nKey: 'nav.casCalls' },
			{ href: '/tramites/denuncia', label: 'DENUNCIA CONTRA LA CORRUPCION', i18nKey: 'nav.antiCorruption' }
		]
	},

	// ==== PORTAL DE TRANSPARENCIA ====
	{
		label: 'Portal de Transparencia',
		i18nKey: 'nav.transparencyPortal',
		hasDropdown: true,
		dropdownItems: [
			{ href: '/tramites/transparencia', label: 'Contratacion de Bienes y Servicios', i18nKey: 'nav.procurement' },
			{ href: '/tramites/control-interno', label: 'Control Interno', i18nKey: 'nav.internalControl' }
		]
	}
];
