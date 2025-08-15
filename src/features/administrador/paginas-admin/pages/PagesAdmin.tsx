import { FilePlus2, Monitor } from 'lucide-react';
import { CardPage } from '../components/CardPage';
import exampleImage from '../../../../assets/imagen-plaza.webp';
import { useModal } from '../../../../core/hooks/useModal';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { FormPage } from '../components/FormPage';

const PagesAdmin = () => {
	const { isModalOpen, handleModal } = useModal();
	return (
		<div className='px-2 space-y-6 '>
			<div className='flex flex-col gap-6'>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-3'>
						<div className='p-2 rounded-lg bg-blue-50'>
							<Monitor className='w-6 h-6 text-blue-700' />
						</div>
						<div>
							<h1 className='text-xl font-bold text-slate-900'>Páginas</h1>
							<p className='text-slate-600'>Gestiona y visualiza las páginas creadas.</p>
						</div>
					</div>

					<button
						className='flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800'
						onClick={handleModal}>
						<FilePlus2 className='w-4 h-4' />
						<span className='hidden md:block'>Nueva Página</span>
					</button>
				</div>
				{/* Contenido de Paginas */}
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
					<CardPage
						title='Noticia'
						path='/inicio'
						date='2025-08-14'
						image={exampleImage}
						menus={['inicio', 'nosotros']}
						onEdit={() => {}}
					/>
				</div>
			</div>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleModal} title={'Nueva Pagina'}>
					<FormPage handleModal={handleModal} />
				</Modal>
			)}
		</div>
	);
};

export default PagesAdmin;
