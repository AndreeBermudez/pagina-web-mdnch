import DirectorioCards from '../../core/components/common/nosotros/directorio/DirectorioCards';
import { funcionarios } from '../../core/components/common/nosotros/directorio/funcionarios';
import { Footer } from '../../core/layout/footer/Footer';
import { NavbarSection } from '../../core/layout/navbar/NavbarSection';

export const DirectorioPage = () => {
	return (
		<>
			<NavbarSection />
			
				<div className="container mx-auto px-15">
					<div className="text-center mt-20 mb-10">
						<h1 className="text-4xl font-bold text-gray-800">Directorio Funcionarios</h1>
						<div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
					</div>
					<DirectorioCards funcionarios={funcionarios} cardsPerPage={6} />
				</div>
			
			<Footer />
		</>
	);
};
