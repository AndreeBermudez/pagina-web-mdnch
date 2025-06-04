import { Outlet } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { AgendaPage } from '../../pages/nosotros/AgendaPage';
import { PrivateGuard } from './guard/PrivateGuard';
import { AlcaldePage } from '../../pages/nosotros/AlcaldePage';
import RegistroCivilPage from '../../pages/tramites/RegistroCivilPage';
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
import DenunciaCorrupcionPage from '../../pages/tramites/DenunciaCorrupcionPage';
import LibroReclamacionesPage from '../../pages/servicios/LibroReclamacionesPage';
import PresupuestoParticipativo from '../../pages/servicios/PresupuestoParticipativoPage';
import Biblioteca from '../../pages/servicios/BibliotecaPage';
import DefensaCivilPage from '../../pages/tramites/DefensaCivilPage';
import LicenciaFuncionamientoPage from '../../pages/tramites/LicenciaFuncionamientoPage';
import LicenciaEdificacionPage from '../../pages/tramites/LicenciaEdificacionPage';
import ControlInternoPage from '../../pages/tramites/ControlInternoPage';
import TransparenciaPage from '../../pages/tramites/TransparenciaPage';
import ConvocatoriaPage from '../../pages/tramites/ConvocatoriaPage';

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
				element: <PDUPage />,
			},
			{
				path: 'misionVision',
				element: <MisionVisionPage />,
			},
			{
				path: 'reseñaHistorica',
				element: <ReseñaHistorica />,
			},
			{
				path: 'himno',
				element: <HimnoPage />,
			},
			{
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
				element: <PresupuestoParticipativo />,
			},
			{
				path: 'biblioteca',
				element: <Biblioteca />,
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
			{ path: 'defensa-civil', element: <DefensaCivilPage /> },
			{
				path: 'transparencia',
				element: <TransparenciaPage />,
			},
			{
				path: 'control-interno',
				element: <ControlInternoPage />,
			},
			{
				path: 'registro-civil',
				element: <RegistroCivilPage />,
			},
			{
				path: 'licencia-funcionamiento',
				element: <LicenciaFuncionamientoPage />,
			},
			{
				path: 'licencia-edificacion',
				element: <LicenciaEdificacionPage />,
			},
			{
				path: 'convocatorias',
				element: <ConvocatoriaPage />,
			},
			{
				path: 'denuncia',
				element: <DenunciaCorrupcionPage />,
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
