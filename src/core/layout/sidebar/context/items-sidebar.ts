import {
    Users,
    FileText,
    Globe,
    Settings,
    Images,
    Wrench,
    Newspaper,
    Calendar,
    ClipboardList,
    User,
    UserCheck,
    Building2,
    Network,
    FileBarChart,
    DollarSign,
    Eye,
    Shield,
    Briefcase,
    Layout,
    Menu,
    UserCog,
    KeyRound,
    type LucideIcon,
} from 'lucide-react';

export interface MenuItem {
    titulo: string;
    icon: LucideIcon;
    isActive: boolean;
    subMenu?: SubMenuItem[];
}

export interface SubMenuItem {
    titulo: string;
    link: string;
    icon: LucideIcon;
    isActive: boolean;
}

export const menuItems: MenuItem[] = [
    {
        titulo: 'Contenido',
        icon: FileText,
        isActive: false,
        subMenu: [
            {
                titulo: 'Slider',
                link: '/admin/contenido/slider',
                icon: Images,
                isActive: false,
            },
            {
                titulo: 'Servicios',
                link: '/admin/contenido/servicios',
                icon: Wrench,
                isActive: false,
            },
            {
                titulo: 'Noticias',
                link: '/admin/contenido/noticias',
                icon: Newspaper,
                isActive: false,
            },
            {
                titulo: 'Eventos',
                link: '/admin/contenido/eventos',
                icon: Calendar,
                isActive: false,
            },
            {
                titulo: 'Agenda',
                link: '/admin/contenido/agenda',
                icon: ClipboardList,
                isActive: false,
            },
            {
                titulo: 'Alcalde Banner',
                link: '/admin/contenido/alcalde-banner',
                icon: User,
                isActive: false,
            },
            {
                titulo: 'Alcalde Page',
                link: '/admin/contenido/alcalde-page',
                icon: User,
                isActive: false,
            },
            {
                titulo: 'Funcionarios',
                link: '/admin/contenido/funcionarios',
                icon: UserCheck,
                isActive: false,
            },
            {
                titulo: 'Consejo Municipal',
                link: '/admin/contenido/consejo-municipal',
                icon: Users,
                isActive: false,
            },
            {
                titulo: 'Organigrama',
                link: '/admin/contenido/organigrama',
                icon: Network,
                isActive: false,
            },
        ],
    },
    {
        titulo: 'Documentos',
        icon: FileBarChart,
        isActive: false,
        subMenu: [
            {
                titulo: 'PDU',
                link: '/admin/documentos/pdu',
                icon: Building2,
                isActive: false,
            },
            {
                titulo: 'Presupuesto',
                link: '/admin/documentos/presupuesto',
                icon: DollarSign,
                isActive: false,
            },
            {
                titulo: 'Transparencia',
                link: '/admin/documentos/transparencia',
                icon: Eye,
                isActive: false,
            },
            {
                titulo: 'Control Interno',
                link: '/admin/documentos/control-interno',
                icon: Shield,
                isActive: false,
            },
            {
                titulo: 'Convocatoria CAS',
                link: '/admin/documentos/convocatoria-cas',
                icon: Briefcase,
                isActive: false,
            },
        ],
    },
    {
        titulo: 'Frontend',
        icon: Globe,
        isActive: false,
        subMenu: [
            {
                titulo: 'Paginas',
                link: '/admin/frontend/paginas',
                icon: Layout,
                isActive: false,
            },
            {
                titulo: 'Menu y Submenu',
                link: '/admin/frontend/menu',
                icon: Menu,
                isActive: false,
            },
        ],
    },
    {
        titulo: 'Configuración',
        icon: Settings,
        isActive: false,
        subMenu: [
            {
                titulo: 'Usuarios',
                link: '/admin/configuracion/usuarios',
                icon: UserCog,
                isActive: false,
            },
            {
                titulo: 'Roles',
                link: '/admin/configuracion/roles',
                icon: KeyRound,
                isActive: false,
            },
        ],
    },
];