import { Footer } from './footer/Footer';
import { NavbarSection } from './navbar/NavbarSection';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<NavbarSection />
			{children}
			<Footer />
		</>
	);
};
