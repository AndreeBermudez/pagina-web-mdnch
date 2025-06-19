import { Outlet } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { AgendaPage } from '../../pages/nosotros/AgendaPage';
import { AlcaldePage } from '../../pages/nosotros/AlcaldePage';
import ConsejoMunicipalPage from '../../pages/nosotros/ConsejoMunicipalPage';
import { DirectorioPage } from '../../pages/nosotros/DirectorioPage';
import MapaPage from '../../pages/nosotros/MapaPage';
import OrganigramaPage from '../../pages/nosotros/OrganigramaPage';
import Biblioteca from '../../pages/servicios/BibliotecaPage';
import LibroReclamacionesPage from '../../pages/servicios/LibroReclamacionesPage';
import PresupuestoParticipativo from '../../pages/servicios/PresupuestoParticipativoPage';
import ControlInternoPage from '../../pages/tramites/ControlInternoPage';
import ConvocatoriaPage from '../../pages/tramites/ConvocatoriaPage';
import DefensaCivilPage from '../../pages/tramites/DefensaCivilPage';
import DenunciaCorrupcionPage from '../../pages/tramites/DenunciaCorrupcionPage';
import LicenciaEdificacionPage from '../../pages/tramites/LicenciaEdificacionPage';
import LicenciaFuncionamientoPage from '../../pages/tramites/LicenciaFuncionamientoPage';
import RegistroCivilPage from '../../pages/tramites/RegistroCivilPage';
import TransparenciaPage from '../../pages/tramites/TransparenciaPage';
import EscudoBanderaPage from '../../pages/tuDistrito/EscudoBanderaPage';
import HimnoPage from '../../pages/tuDistrito/HimnoPage';
import MisionVisionPage from '../../pages/tuDistrito/MisionVisionPage';
import PDUPage from '../../pages/tuDistrito/PDUPage';
import ReseñaHistorica from '../../pages/tuDistrito/ReseñaHistoricaPage';
import TurismoPage from '../../pages/tuDistrito/TurismoPage';
import { AdminLayout } from '../components/common/administrador/AdminLayout';
import { PrivateGuard } from './guard/PrivateGuard';
import FuncionariosAdmin from '../components/common/administrador/Page/FuncioariosAd/FuncionariosAdmin';

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
		element: <AdminLayout />,
		loader: PrivateGuard,
		children: [
			{
				index: true,
				element: <p>Panel principal</p>,
			},
			{
				path: 'funcionarios',
				element: <FuncionariosAdmin/>,
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
