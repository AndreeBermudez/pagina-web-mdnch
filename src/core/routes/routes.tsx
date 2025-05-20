import { Outlet } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { AgendaPage } from '../../pages/nosotros/AgendaPage';
import { PrivateGuard } from './guard/PrivateGuard';

export const routes = [
<<<<<<< HEAD
    // Ruta principal
    { 
        path: "/", 
        element: <HomePage/>
    },
    { 
        path: "/inicio", 
        element: <HomePage/>
    },
    
    
    // Nosotros
    {
        path: "/nosotros",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <p>Información general Nosotros</p>
            },
            {
                path: "calendar",
                element: <p>Agenda</p>
            },
            {
                path: "directorio",
                element: <p>Directorio de Funcionarios</p>
            },
            {
                path: "alcalde",
                element: <p>Alcalde</p>
            },
            {
                path: "consejoMunicipal",
                element: <p>Consejo Municipal</p>
            },
            {
                path: "organigrama",
                element: <p>Organigrama</p>
            },
            {
                path: "mapa",
                element: <p>Mapa</p>
            }
        ]
    },
    
    // Tu Distrito
    {
        path: "/tudistrito",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <p>Información general del distrito</p>
            },
            {
                path: "turismo",
                element: <p>Turismo</p>
            },
            {
                path: "pdu",
                element: <p>PDU</p>
            },
            {
                path: "misionVision",
                element: <p>Misión y Visión</p>
            },
            {
                path: "reseñaHistorica",
                element: <p>Reseña Histórica</p>
            },
            {
                path: "himno",
                element: <p>Himno</p>
            },
            {
                path: "escudo",
                element: <p>Escudo y bandera</p>
            }
        ]
    },
    
    // Servicios
    {
        path: "/servicios",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <p>Ver Todos los Servicios</p>
            },
            {
                path: "plataforma",
                element: <p>Plataforma Única del Estado Peruano</p>
            },
            {
                path: "reclamaciones",
                element: <p>Libro de Reclamaciones</p>
            },
            {
                path: "salud",
                element: <p>Salud</p>
            },
            {
                path: "seguridad",
                element: <p>Seguridad Ciudadana</p>
            },
            {
                path: "presupuesto",
                element: <p>Presupuesto Participativo</p>
            },
            {
                path: "biblioteca",
                element: <p>Biblioteca Municipal</p>
            }
        ]
    },
    
    // Trámites
    {
        path: "/tramites",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <p>Ver Todos los trámites</p>
            },
            {
                path: "defensa-civil",
                element: <p>Defensa Civil</p>
            },
            {
                path: "transparencia",
                element: <p>Transparencia</p>
            },
            {
                path: "control-interno",
                element: <p>Control Interno</p>
            },
            {
                path: "registro-civil",
                element: <p>Registro Civil</p>
            },
            {
                path: "licencia-funcionamiento",
                element: <p>Licencia de Funcionamiento</p>
            },
            {
                path: "licencia-edificacion",
                element: <p>Licencia de Edificación</p>
            },
            {
                path: "convocatorias",
                element: <p>CONVOCATORIAS CAS 2025</p>
            },
            {
                path: "denuncia",
                element: <p>DENUNCIA CONTRA LA CORRUPCION</p>
            }
        ]
    },
    
    // Contacto
    {
        path: "/contact",
        element: <p>Contáctanos</p>
    },
    
    // Admin
    { 
        path: "/admin", 
        element: <Outlet />,
        loader: PrivateGuard,
        children: [
            { 
                index: true, 
                element: <p>Panel principal</p> 
            },
            { 
                path: "paginas", 
                element: <p>Administrar páginas</p> 
            },
            { 
                path: "eventos", 
                element: <p>Gestión de eventos</p> 
            },
            { 
                path: "noticias", 
                element: <p>Gestión de noticias</p> 
            },
            { 
                path: "agenda", 
                element: <p>Administrar agenda</p> 
            },
            { 
                path: "usuarios", 
                element: <p>Gestión de usuarios</p> 
            }
        ]
    },
    
    // Rutas de error
    {
      path: "/404",
      element: <p>PageNotFound</p> 
    },
    {
      path: "*",
      element: <p>PageNotFound</p> 
    }
];
=======
	// Ruta principal
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/inicio',
		element: <HomePage />,
	},

	// Nosotros
	{
		path: '/nosotros',
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <p>Información general Nosotros</p>,
			},
			{
				path: 'calendar',
				element: <AgendaPage />,
			},
			{
				path: 'directorio',
				element: <p>Directorio de Funcionarios</p>,
			},
			{
				path: 'alcalde',
				element: <p>Alcalde</p>,
			},
			{
				path: 'consejoMunicipal',
				element: <p>Consejo Municipal</p>,
			},
			{
				path: 'organigrama',
				element: <p>Organigrama</p>,
			},
			{
				path: 'mapa',
				element: <p>Mapa</p>,
			},
		],
	},

	// Tu Distrito
	{
		path: '/tudistrito',
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <p>Información general del distrito</p>,
			},
			{
				path: 'turismo',
				element: <p>Turismo</p>,
			},
			{
				path: 'pdu',
				element: <p>PDU</p>,
			},
			{
				path: 'misionVision',
				element: <p>Misión y Visión</p>,
			},
			{
				path: 'reseñaHistorica',
				element: <p>Reseña Histórica</p>,
			},
			{
				path: 'himno',
				element: <p>Himno</p>,
			},
			{
				path: 'escudo',
				element: <p>Escudo y bandera</p>,
			},
		],
	},

	// Servicios
	{
		path: '/servicios',
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <p>Ver Todos los Servicios</p>,
			},
			{
				path: 'plataforma',
				element: <p>Plataforma Única del Estado Peruano</p>,
			},
			{
				path: 'reclamaciones',
				element: <p>Libro de Reclamaciones</p>,
			},
			{
				path: 'salud',
				element: <p>Salud</p>,
			},
			{
				path: 'seguridad',
				element: <p>Seguridad Ciudadana</p>,
			},
			{
				path: 'presupuesto',
				element: <p>Presupuesto Participativo</p>,
			},
			{
				path: 'biblioteca',
				element: <p>Biblioteca Municipal</p>,
			},
		],
	},

	// Trámites
	{
		path: '/tramites',
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <p>Ver Todos los trámites</p>,
			},
			{
				path: 'defensa-civil',
				element: <p>Defensa Civil</p>,
			},
			{
				path: 'transparencia',
				element: <p>Transparencia</p>,
			},
			{
				path: 'control-interno',
				element: <p>Control Interno</p>,
			},
			{
				path: 'registro-civil',
				element: <p>Registro Civil</p>,
			},
			{
				path: 'licencia-funcionamiento',
				element: <p>Licencia de Funcionamiento</p>,
			},
			{
				path: 'licencia-edificacion',
				element: <p>Licencia de Edificación</p>,
			},
			{
				path: 'convocatorias',
				element: <p>CONVOCATORIAS CAS 2025</p>,
			},
			{
				path: 'denuncia',
				element: <p>DENUNCIA CONTRA LA CORRUPCION</p>,
			},
		],
	},

	// Contacto
	{
		path: '/contact',
		element: <p>Contáctanos</p>,
	},

	// Admin
	{
		path: '/admin',
		element: <Outlet />,
		loader: PrivateGuard,
		children: [
			{
				index: true,
				element: <p>Panel principal</p>,
			},
			{
				path: 'paginas',
				element: <p>Administrar páginas</p>,
			},
			{
				path: 'eventos',
				element: <p>Gestión de eventos</p>,
			},
			{
				path: 'noticias',
				element: <p>Gestión de noticias</p>,
			},
			{
				path: 'agenda',
				element: <p>Administrar agenda</p>,
			},
			{
				path: 'usuarios',
				element: <p>Gestión de usuarios</p>,
			},
		],
	},

	// Rutas de error
	{
		path: '/404',
		element: <p>PageNotFound</p>,
	},
	{
		path: '*',
		element: <p>PageNotFound</p>,
	},
];
>>>>>>> a174079669704f8b7708cd559888610759df1967
