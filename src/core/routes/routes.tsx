import { Outlet } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { AgendaPage } from '../../pages/nosotros/AgendaPage';
import { PrivateGuard } from './guard/PrivateGuard';
import { AlcaldePage } from '../../pages/nosotros/AlcaldePage';
import { DirectorioPage } from '../../pages/nosotros/DirectorioPage';
import ConsejoMunicipalPage from '../../pages/nosotros/ConsejoMunicipalPage';
import OrganigramaPage from '../../pages/nosotros/OrganigramaPage';
import MapaPage from '../../pages/nosotros/MapaPage';
import TurismoPage from '../../pages/tuDistrito/TurismoPage';
import MisionVisionPage from '../../pages/tuDistrito/MisionVisionPage';
import ReseñaHistorica from '../../pages/tuDistrito/ReseñaHistoricaPage';
import HimnoPage from '../../pages/tuDistrito/HimnoPage';
import EscudoBanderaPage from '../../pages/tuDistrito/EscudoBanderaPage';
import PDUPage from '../../pages/tuDistrito/PDUPage';
import LibroReclamacionesPage from '../../pages/servicios/LibroReclamacionesPage';
import PresupuestoParticipativo from '../../pages/servicios/PresupuestoParticipativoPage';
import Biblioteca from '../../pages/servicios/BibliotecaPage';
export const routes = [
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
				element: <DirectorioPage />,
			},
			{
				path: 'alcalde',
				element: <AlcaldePage />,
			},
			{
				path: 'consejoMunicipal',
				element: <ConsejoMunicipalPage />,
			},
			{
				path: 'organigrama',
				element: <OrganigramaPage />,
			},
			{
				path: 'mapa',
				element: <MapaPage />,
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
				element: <TurismoPage />,
			},
			{
				path: 'pdu',
				element: <PDUPage/>,
			},
			{
				path: 'misionVision',
				element: <MisionVisionPage/>,
			},
			{
				path: 'reseñaHistorica',
				element: <ReseñaHistorica/>,
			},
			{
				path: 'himno',
				element: <HimnoPage />,
			},			{
				path: 'escudo',
				element: <EscudoBanderaPage />,
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
				path: 'reclamaciones',
				element: <LibroReclamacionesPage />,
			},
			
			{
				path: 'presupuesto',
				element: <PresupuestoParticipativo/>,
			},
			{
				path: 'biblioteca',
				element: <Biblioteca/>,
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
