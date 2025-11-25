// Configuración de permisos por rol
// Aquí defines qué módulos puede acceder cada rol

export type UserRole = 'ADMINISTRADOR' | 'IMAGEN' | 'ALCALDIA';

// Define los módulos disponibles (usando las rutas del sidebar)
export const MODULES = {
  // Contenido
  SLIDER: '/admin/contenido/slider',
  SERVICIOS: '/admin/contenido/servicios',
  NOTICIAS: '/admin/contenido/noticias',
  EVENTOS: '/admin/contenido/eventos',
  DESTINO_TURISTICO: '/admin/contenido/destino-turistico',
  DEFENSA_CIVIL: '/admin/contenido/defensa-civil',
  AGENDA: '/admin/contenido/agenda',
  ALCALDE_BANNER: '/admin/contenido/alcalde-banner',
  ALCALDE_PAGE: '/admin/contenido/alcalde-page',
  TURISMO: '/admin/contenido/Turismo',
  FUNCIONARIOS: '/admin/contenido/funcionarios',
  CONSEJO_MUNICIPAL: '/admin/contenido/consejo-municipal',
  ORGANIGRAMA: '/admin/contenido/organigrama',
  POPUP_INICIO: '/admin/contenido/popup-admin',
  NUMERO_EMERGENCIA: '/admin/contenido/numero-emergencia',
  
  // Documentos
  PDU: '/admin/documentos/pdu',
  PRESUPUESTO: '/admin/documentos/presupuesto',
  TRANSPARENCIA: '/admin/documentos/transparencia',
  CONTROL_INTERNO: '/admin/documentos/control-interno',
  CONVOCATORIA_CAS: '/admin/documentos/convocatoria-cas',
  NOMBRAMIENTO: '/admin/documentos/nombramientos',
  
  // Configuración
  USUARIOS: '/admin/configuracion/usuarios',
  ROLES: '/admin/configuracion/roles',
} as const;

// Configuración de permisos: Define qué módulos puede ver cada rol
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  // ADMINISTRADOR tiene acceso a TODOS los módulos
  ADMINISTRADOR: Object.values(MODULES),
  
  // IMAGEN solo tiene acceso a Noticias
  // 👇 PUEDES AGREGAR MÁS MÓDULOS AQUÍ SI NECESITAS HABILITARLOS
  IMAGEN: [
    MODULES.NOTICIAS,
    // MODULES.EVENTOS, // Descomenta para habilitar Eventos
    // MODULES.SLIDER, // Descomenta para habilitar Slider
  ],
  
  // ALCALDIA solo tiene acceso a Agenda
  // 👇 PUEDES AGREGAR MÁS MÓDULOS AQUÍ SI NECESITAS HABILITARLOS
  ALCALDIA: [
    MODULES.AGENDA,
    // MODULES.EVENTOS, // Descomenta para habilitar Eventos
    // MODULES.FUNCIONARIOS, // Descomenta para habilitar Funcionarios
  ],
};

/**
 * Verifica si un usuario con cierto rol tiene permiso para acceder a un módulo
 * @param userRole - Rol del usuario
 * @param modulePath - Ruta del módulo a verificar
 * @returns true si tiene permiso, false si no
 */
export const hasPermission = (userRole: string | null, modulePath: string): boolean => {
  if (!userRole) return false;
  
  // Si el rol no está en la configuración, denegar acceso
  if (!(userRole in ROLE_PERMISSIONS)) return false;
  
  const permissions = ROLE_PERMISSIONS[userRole as UserRole];
  return permissions.includes(modulePath);
};

/**
 * Verifica si un usuario con cierto rol puede acceder a una sección completa
 * @param userRole - Rol del usuario
 * @param sectionName - Nombre de la sección (ej: 'Contenido', 'Documentos', 'Configuración')
 * @returns true si tiene al menos un permiso en esa sección
 */
export const hasAnySectionPermission = (userRole: string | null, subMenuItems: { link: string }[]): boolean => {
  if (!userRole) return false;
  
  return subMenuItems.some(item => hasPermission(userRole, item.link));
};

/**
 * Filtra los items del menú según los permisos del usuario
 * @param userRole - Rol del usuario
 * @param menuItems - Items completos del menú
 * @returns Items del menú filtrados según permisos
 */
export const filterMenuByPermissions = (userRole: string | null, menuItems: any[]): any[] => {
  if (!userRole) return [];
  
  return menuItems
    .map(menuItem => {
      // Si el item tiene submenú, filtrarlo
      if (menuItem.subMenu) {
        const filteredSubMenu = menuItem.subMenu.filter((subItem: any) => 
          hasPermission(userRole, subItem.link)
        );
        
        // Si no quedan items en el submenú después del filtro, no mostrar la sección completa
        if (filteredSubMenu.length === 0) {
          return null;
        }
        
        return {
          ...menuItem,
          subMenu: filteredSubMenu,
        };
      }
      
      return menuItem;
    })
    .filter(item => item !== null);
};
