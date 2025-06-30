import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLayout } from '../layout/AdminLayout';
import { LazyWrapper } from './components/LazyWrapper';
import { PrivateGuard } from './guard/PrivateGuard';

//* Home - Lazy loading
const HomePage = lazy(() => import('../../pages/HomePage').then((module) => ({ default: module.HomePage })));

//* Nosotros - Lazy loading
const AgendaPage = lazy(() =>
	import('../../pages/nosotros/AgendaPage').then((module) => ({ default: module.AgendaPage }))
);
const AlcaldePage = lazy(() =>
	import('../../pages/nosotros/AlcaldePage').then((module) => ({ default: module.AlcaldePage }))
);
const ConsejoMunicipalPage = lazy(() => import('../../pages/nosotros/ConsejoMunicipalPage'));
const DirectorioPage = lazy(() =>
	import('../../pages/nosotros/DirectorioPage').then((module) => ({ default: module.DirectorioPage }))
);
const MapaPage = lazy(() => import('../../pages/nosotros/MapaPage'));
const OrganigramaPage = lazy(() => import('../../pages/nosotros/OrganigramaPage'));

//* Servicios - Lazy loading
const BibliotecaPage = lazy(() => import('../../pages/servicios/BibliotecaPage'));
const LibroReclamacionesPage = lazy(() => import('../../pages/servicios/LibroReclamacionesPage'));
const PresupuestoParticipativoPage = lazy(() => import('../../pages/servicios/PresupuestoParticipativoPage'));

//* Trámites - Lazy loading
const ControlInternoPage = lazy(() => import('../../pages/tramites/ControlInternoPage'));
const ConvocatoriaPage = lazy(() => import('../../pages/tramites/ConvocatoriaPage'));
const DefensaCivilPage = lazy(() => import('../../pages/tramites/DefensaCivilPage'));
const DenunciaCorrupcionPage = lazy(() => import('../../pages/tramites/DenunciaCorrupcionPage'));
const LicenciaEdificacionPage = lazy(() => import('../../pages/tramites/LicenciaEdificacionPage'));
const LicenciaFuncionamientoPage = lazy(() => import('../../pages/tramites/LicenciaFuncionamientoPage'));
const RegistroCivilPage = lazy(() => import('../../pages/tramites/RegistroCivilPage'));
const TransparenciaPage = lazy(() => import('../../pages/tramites/TransparenciaPage'));

//* Tu Distrito - Lazy loading
const EscudoBanderaPage = lazy(() => import('../../pages/tuDistrito/EscudoBanderaPage'));
const HimnoPage = lazy(() => import('../../pages/tuDistrito/HimnoPage'));
const MisionVisionPage = lazy(() => import('../../pages/tuDistrito/MisionVisionPage'));
const PDUPage = lazy(() => import('../../pages/tuDistrito/PDUPage'));
const ReseñaHistoricaPage = lazy(() => import('../../pages/tuDistrito/ReseñaHistoricaPage'));
const TurismoPage = lazy(() => import('../../pages/tuDistrito/TurismoPage'));

//* Admin - Lazy loading
const FuncionariosAdmin = lazy(
	() => import('../../features/administrador/funcionarios-admin/pages/FuncionariosAdmin')
);
const ConsejoAdmin = lazy(() => import('../../features/administrador/consejo-admin/pages/ConsejosAdmin'));
const NoticiasAdmin = lazy(() =>
	import('../../features/administrador/noticias-admin/pages/NoticiasAdmin').then((module) => ({
		default: module.NoticiasAdmin,
	}))
);
const OrganigramaAdmin = lazy(
	() => import('../../features/administrador/organigrama-admin/pages/OrganigramaAdmin')
);
const AlcaldePageAdmin = lazy(() => import('../../features/administrador/alcalde-admin/pages/AlcaldePageAdmin'));

export const routes = [
	// Ruta principal
	{
		path: '/',
		element: (
			<LazyWrapper>
				<HomePage />
			</LazyWrapper>
		),
	},
	{
		path: '/inicio',
		element: (
			<LazyWrapper>
				<HomePage />
			</LazyWrapper>
		),
	},

	// Nosotros
	{
		path: '/nosotros',
		element: <Outlet />,
		children: [
			{
				path: 'calendar',
				element: (
					<LazyWrapper>
						<AgendaPage />
					</LazyWrapper>
				),
			},
			{
				path: 'directorio',
				element: (
					<LazyWrapper>
						<DirectorioPage />
					</LazyWrapper>
				),
			},
			{
				path: 'alcalde',
				element: (
					<LazyWrapper>
						<AlcaldePage />
					</LazyWrapper>
				),
			},
			{
				path: 'consejoMunicipal',
				element: (
					<LazyWrapper>
						<ConsejoMunicipalPage />
					</LazyWrapper>
				),
			},
			{
				path: 'organigrama',
				element: (
					<LazyWrapper>
						<OrganigramaPage />
					</LazyWrapper>
				),
			},
			{
				path: 'mapa',
				element: (
					<LazyWrapper>
						<MapaPage />
					</LazyWrapper>
				),
			},
		],
	},

	// Tu Distrito
	{
		path: '/tudistrito',
		element: <Outlet />,
		children: [
			{
				path: 'turismo',
				element: (
					<LazyWrapper>
						<TurismoPage />
					</LazyWrapper>
				),
			},
			{
				path: 'pdu',
				element: (
					<LazyWrapper>
						<PDUPage />
					</LazyWrapper>
				),
			},
			{
				path: 'misionVision',
				element: (
					<LazyWrapper>
						<MisionVisionPage />
					</LazyWrapper>
				),
			},
			{
				path: 'reseñaHistorica',
				element: (
					<LazyWrapper>
						<ReseñaHistoricaPage />
					</LazyWrapper>
				),
			},
			{
				path: 'himno',
				element: (
					<LazyWrapper>
						<HimnoPage />
					</LazyWrapper>
				),
			},
			{
				path: 'escudo',
				element: (
					<LazyWrapper>
						<EscudoBanderaPage />
					</LazyWrapper>
				),
			},
		],
	},

	// Servicios
	{
		path: '/servicios',
		element: <Outlet />,
		children: [
			{
				path: 'reclamaciones',
				element: (
					<LazyWrapper>
						<LibroReclamacionesPage />
					</LazyWrapper>
				),
			},
			{
				path: 'presupuesto',
				element: (
					<LazyWrapper>
						<PresupuestoParticipativoPage />
					</LazyWrapper>
				),
			},
			{
				path: 'biblioteca',
				element: (
					<LazyWrapper>
						<BibliotecaPage />
					</LazyWrapper>
				),
			},
		],
	},

	// Trámites
	{
		path: '/tramites',
		element: <Outlet />,
		children: [
			{
				path: 'defensa-civil',
				element: (
					<LazyWrapper>
						<DefensaCivilPage />
					</LazyWrapper>
				),
			},
			{
				path: 'transparencia',
				element: (
					<LazyWrapper>
						<TransparenciaPage />
					</LazyWrapper>
				),
			},
			{
				path: 'control-interno',
				element: (
					<LazyWrapper>
						<ControlInternoPage />
					</LazyWrapper>
				),
			},
			{
				path: 'registro-civil',
				element: (
					<LazyWrapper>
						<RegistroCivilPage />
					</LazyWrapper>
				),
			},
			{
				path: 'licencia-funcionamiento',
				element: (
					<LazyWrapper>
						<LicenciaFuncionamientoPage />
					</LazyWrapper>
				),
			},
			{
				path: 'licencia-edificacion',
				element: (
					<LazyWrapper>
						<LicenciaEdificacionPage />
					</LazyWrapper>
				),
			},
			{
				path: 'convocatorias',
				element: (
					<LazyWrapper>
						<ConvocatoriaPage />
					</LazyWrapper>
				),
			},
			{
				path: 'denuncia',
				element: (
					<LazyWrapper>
						<DenunciaCorrupcionPage />
					</LazyWrapper>
				),
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
				path: 'contenido/funcionarios',
				element: (
					<LazyWrapper>
						<FuncionariosAdmin />
					</LazyWrapper>
				),
			},
			{
				path: 'contenido/consejo-municipal',
				element: (
					<LazyWrapper>
						<ConsejoAdmin />
					</LazyWrapper>
				),
			},
			{
				path: 'contenido/noticias',
				element: (
					<LazyWrapper>
						<NoticiasAdmin />
					</LazyWrapper>
				),
			},
			{
				path: 'contenido/organigrama',
				element: (
					<LazyWrapper>
						<OrganigramaAdmin />
					</LazyWrapper>
				),
			},
			{
				path: 'contenido/alcalde-page',
				element: (
					<LazyWrapper>
						<AlcaldePageAdmin />
					</LazyWrapper>
				),
			},
			{
				path: 'contenido/agenda',
				element: <p>Administrar agenda</p>,
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
