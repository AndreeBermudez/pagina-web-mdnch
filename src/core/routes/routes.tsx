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

//* Publicaciones - Lazy loading
const NoticiasPage = lazy(() => import('../../pages/publicaciones/NoticiasPage'));
const EventosPage = lazy(() => import('../../pages/publicaciones/EventosPage'));

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
const SliderAdmin = lazy(() => import('../../features/administrador/slider-admin/pages/SliderAdmin'));
const FuncionariosAdmin = lazy(
	() => import('../../features/administrador/funcionarios-admin/pages/FuncionariosAdmin')
);
const ConsejoAdmin = lazy(() => import('../../features/administrador/consejo-admin/pages/ConsejosAdmin'));
const NoticiasAdmin = lazy(() => import('../../features/administrador/noticias-admin/pages/NoticiasAdmin'));
const EventosAdmin = lazy(() => import('../../features/administrador/eventos-admin/pages/EventosAdmin'))
const OrganigramaAdmin = lazy(
	() => import('../../features/administrador/organigrama-admin/pages/OrganigramaAdmin')
);
const AlcaldePageAdmin = lazy(() => import('../../features/administrador/alcalde-admin/pages/AlcaldePageAdmin'));
const CreatePaginaAdmin = lazy(() =>
	import('../../features/administrador/paginas-admin/pages/CreatePaginaAdmin').then((module) => ({
		default: module.CreatePaginaAdmin,
	}))
);
const AgendaPageAdmin = lazy(() => import('../../features/administrador/agenda-admin/pages/AgendaAdmin'));
const PduAdmin = lazy(() => import ('../../features/administrador/pdu-admin/pages/PduAdmin'));
const TurismoAdmin = lazy(() => import('../../features/administrador/turismo-admin/pages/TurismoAdmin'));
const PresupuestoAdmin = lazy(() => import('../../features/administrador/presupuesto-admin/pages/PresupuestoAdmin'));

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

	//Publicaciones
	{
		path: '/publicaciones',
		element: <Outlet />,
		children: [
			{
				path: 'noticias',
				element: (
					<LazyWrapper>
						<NoticiasPage />
					</LazyWrapper>
				),
			},
			{
				path: 'eventos',
				element: (
					<LazyWrapper>
						<EventosPage />
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
		element: (
			<div className='flex items-center justify-center min-h-screen p-6 bg-slate-50'>
				<div className='w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl'>
					<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full'>
						<svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
							/>
						</svg>
					</div>
					<h1 className='mb-2 text-2xl font-bold text-slate-900'>Contáctanos</h1>
					<p className='mb-4 text-slate-600'>Esta página está en desarrollo</p>
					<p className='text-sm text-slate-500'>Próximamente tendrás acceso a nuestros canales de contacto</p>
				</div>
			</div>
		),
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
			},{
				path: 'contenido/turismo',
				element: (
					<LazyWrapper>
						<TurismoAdmin />
					</LazyWrapper>
				),
			},
			{
				path: 'contenido/agenda',
				element: (
					<LazyWrapper>
						<AgendaPageAdmin />
					</LazyWrapper>
				),
			},{
				path: 'documentos/pdu',
				element: (
					<LazyWrapper>
						<PduAdmin />
					</LazyWrapper>
				),
			},{
				path: 'documentos/presupuesto',
				element: (
					<LazyWrapper>
						<PresupuestoAdmin />
					</LazyWrapper>
				),
			},
			// Rutas adicionales que faltan del sidebar
			{
				path: 'contenido/slider',
				element: (
					<LazyWrapper>
						<SliderAdmin />
					</LazyWrapper>
				),
			},
			{
				path: 'contenido/servicios',
				element: (
					<div className='space-y-6'>
						<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center space-x-3'>
									<div className='p-2 rounded-lg bg-blue-50'>
										<svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									</div>
									<div>
										<h1 className='text-2xl font-bold text-slate-900'>Gestión de Servicios</h1>
										<p className='mt-1 text-slate-600'>Administra los servicios municipales</p>
									</div>
								</div>
							</div>
							<div className='p-6 text-center'>
								<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100'>
									<svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
										/>
									</svg>
								</div>
								<h3 className='mb-2 text-lg font-medium text-slate-900'>Módulo en Desarrollo</h3>
								<p className='text-slate-500'>El módulo de gestión de servicios estará disponible próximamente</p>
							</div>
						</div>
					</div>
				),
			},
			{
				path: 'contenido/eventos',
				element: (
					<LazyWrapper>
						<EventosAdmin />
					</LazyWrapper>	
				),
			},
			{
				path: 'contenido/alcalde-banner',
				element: (
					<div className='space-y-6'>
						<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center space-x-3'>
									<div className='p-2 rounded-lg bg-blue-50'>
										<svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
											/>
										</svg>
									</div>
									<div>
										<h1 className='text-2xl font-bold text-slate-900'>Gestión de Banner Alcalde</h1>
										<p className='mt-1 text-slate-600'>Administra el banner principal del alcalde</p>
									</div>
								</div>
							</div>
							<div className='p-6 text-center'>
								<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100'>
									<svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
										/>
									</svg>
								</div>
								<h3 className='mb-2 text-lg font-medium text-slate-900'>Módulo en Desarrollo</h3>
								<p className='text-slate-500'>
									El módulo de gestión de banner del alcalde estará disponible próximamente
								</p>
							</div>
						</div>
					</div>
				),
			},

			{
				path: 'documentos/transparencia',
				element: (
					<div className='space-y-6'>
						<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center space-x-3'>
									<div className='p-2 rounded-lg bg-blue-50'>
										<svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
											/>
										</svg>
									</div>
									<div>
										<h1 className='text-2xl font-bold text-slate-900'>Gestión de Transparencia</h1>
										<p className='mt-1 text-slate-600'>Administra los documentos de transparencia municipal</p>
									</div>
								</div>
							</div>
							<div className='p-6 text-center'>
								<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100'>
									<svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
										/>
									</svg>
								</div>
								<h3 className='mb-2 text-lg font-medium text-slate-900'>Módulo en Desarrollo</h3>
								<p className='text-slate-500'>
									El módulo de gestión de transparencia estará disponible próximamente
								</p>
							</div>
						</div>
					</div>
				),
			},
			{
				path: 'documentos/control-interno',
				element: (
					<div className='space-y-6'>
						<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center space-x-3'>
									<div className='p-2 rounded-lg bg-blue-50'>
										<svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 2.3-.59 4.35-1.73 6.06-3.29l-2.12-2.12A8.964 8.964 0 0112 17.5c-1.657 0-3.157-.672-4.243-1.757S6 13.157 6 11.5s.671-3.157 1.757-4.243S10.343 6 12 6s3.157.672 4.243 1.757S17.5 9.843 17.5 11.5'
											/>
										</svg>
									</div>
									<div>
										<h1 className='text-2xl font-bold text-slate-900'>Gestión de Control Interno</h1>
										<p className='mt-1 text-slate-600'>Administra los documentos de control interno municipal</p>
									</div>
								</div>
							</div>
							<div className='p-6 text-center'>
								<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100'>
									<svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
										/>
									</svg>
								</div>
								<h3 className='mb-2 text-lg font-medium text-slate-900'>Módulo en Desarrollo</h3>
								<p className='text-slate-500'>
									El módulo de gestión de control interno estará disponible próximamente
								</p>
							</div>
						</div>
					</div>
				),
			},
			{
				path: 'documentos/convocatoria-cas',
				element: (
					<div className='space-y-6'>
						<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center space-x-3'>
									<div className='p-2 rounded-lg bg-blue-50'>
										<svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8'
											/>
										</svg>
									</div>
									<div>
										<h1 className='text-2xl font-bold text-slate-900'>Gestión de Convocatoria CAS</h1>
										<p className='mt-1 text-slate-600'>
											Administra las convocatorias de Contratación Administrativa de Servicios
										</p>
									</div>
								</div>
							</div>
							<div className='p-6 text-center'>
								<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100'>
									<svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
										/>
									</svg>
								</div>
								<h3 className='mb-2 text-lg font-medium text-slate-900'>Módulo en Desarrollo</h3>
								<p className='text-slate-500'>
									El módulo de gestión de convocatoria CAS estará disponible próximamente
								</p>
							</div>
						</div>
					</div>
				),
			},
			// Rutas de Frontend
			{
				path: 'frontend/paginas',
				element: (
					<LazyWrapper>
						<CreatePaginaAdmin />
					</LazyWrapper>
				),
			},
			{
				path: 'frontend/menu',
				element: (
					<div className='space-y-6'>
						<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center space-x-3'>
									<div className='p-2 rounded-lg bg-blue-50'>
										<svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M4 6h16M4 12h16M4 18h16'
											/>
										</svg>
									</div>
									<div>
										<h1 className='text-2xl font-bold text-slate-900'>Gestión de Menú y Submenú</h1>
										<p className='mt-1 text-slate-600'>Administra la navegación del sitio web</p>
									</div>
								</div>
							</div>
							<div className='p-6 text-center'>
								<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100'>
									<svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
										/>
									</svg>
								</div>
								<h3 className='mb-2 text-lg font-medium text-slate-900'>Módulo en Desarrollo</h3>
								<p className='text-slate-500'>
									El módulo de gestión de menú y submenú estará disponible próximamente
								</p>
							</div>
						</div>
					</div>
				),
			},
			// Rutas de Configuración
			{
				path: 'configuracion/usuarios',
				element: (
					<div className='space-y-6'>
						<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center space-x-3'>
									<div className='p-2 rounded-lg bg-blue-50'>
										<svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
											/>
										</svg>
									</div>
									<div>
										<h1 className='text-2xl font-bold text-slate-900'>Gestión de Usuarios</h1>
										<p className='mt-1 text-slate-600'>Administra los usuarios del sistema</p>
									</div>
								</div>
							</div>
							<div className='p-6 text-center'>
								<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100'>
									<svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
										/>
									</svg>
								</div>
								<h3 className='mb-2 text-lg font-medium text-slate-900'>Módulo en Desarrollo</h3>
								<p className='text-slate-500'>El módulo de gestión de usuarios estará disponible próximamente</p>
							</div>
						</div>
					</div>
				),
			},
			{
				path: 'configuracion/roles',
				element: (
					<div className='space-y-6'>
						<div className='bg-white border shadow-sm rounded-xl border-slate-200'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center space-x-3'>
									<div className='p-2 rounded-lg bg-blue-50'>
										<svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
											/>
										</svg>
									</div>
									<div>
										<h1 className='text-2xl font-bold text-slate-900'>Gestión de Roles</h1>
										<p className='mt-1 text-slate-600'>Administra los roles y permisos del sistema</p>
									</div>
								</div>
							</div>
							<div className='p-6 text-center'>
								<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100'>
									<svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
										/>
									</svg>
								</div>
								<h3 className='mb-2 text-lg font-medium text-slate-900'>Módulo en Desarrollo</h3>
								<p className='text-slate-500'>El módulo de gestión de roles estará disponible próximamente</p>
							</div>
						</div>
					</div>
				),
			},
		],
	},

	// Rutas de error
	{
		path: '/404',
		element: (
			<div className='flex items-center justify-center min-h-screen p-6 bg-slate-50'>
				<div className='w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl'>
					<div className='flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full'>
						<svg className='w-10 h-10 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
							/>
						</svg>
					</div>
					<h1 className='mb-2 text-4xl font-bold text-slate-900'>404</h1>
					<h2 className='mb-4 text-xl font-semibold text-slate-700'>Página no encontrada</h2>
					<p className='mb-6 text-slate-600'>La página que buscas no existe o ha sido movida</p>
					<a
						href='/'
						className='inline-flex items-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'>
						<svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
						</svg>
						Volver al inicio
					</a>
				</div>
			</div>
		),
	},
	{
		path: '*',
		element: (
			<div className='flex items-center justify-center min-h-screen p-6 bg-slate-50'>
				<div className='w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl'>
					<div className='flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full'>
						<svg className='w-10 h-10 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
							/>
						</svg>
					</div>
					<h1 className='mb-2 text-4xl font-bold text-slate-900'>404</h1>
					<h2 className='mb-4 text-xl font-semibold text-slate-700'>Página no encontrada</h2>
					<p className='mb-6 text-slate-600'>La página que buscas no existe o ha sido movida</p>
					<a
						href='/'
						className='inline-flex items-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'>
						<svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
						</svg>
						Volver al inicio
					</a>
				</div>
			</div>
		),
	},
];
