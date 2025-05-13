import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { Navbar } from './Navbar';
import { PreNavbar } from './PreNavbar';

export const NavbarSection = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isHomePage = location.pathname === "/" || location.pathname === "" || location.pathname === "/inicio";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className='container h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center z-10'>
      <PreNavbar isHomePage={isHomePage} scrolled={scrolled} />
      <Navbar 
        isHomePage={isHomePage} 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </nav>
  );
};