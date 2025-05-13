import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { navLinks } from './navLinks';

export interface NavbarProps {
  isHomePage: boolean;
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar = ({
  isHomePage, 
  scrolled,
  mobileMenuOpen,
  setMobileMenuOpen
}: NavbarProps) => {

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isHomePage && !scrolled ? "py-4 bg-transparent top-7" : "py-2 bg-white shadow-md top-0"
  }`;

  const textClasses = isHomePage && !scrolled ? "text-white" : "text-blue-900";
  const subtextClasses = isHomePage && !scrolled ? "text-blue-100" : "text-blue-700";

  return (
    <>
      {/* Navbar */}
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className={`font-bold text-base ${textClasses}`}>Municipalidad Distrital</span>
              <span className={`font-semibold text-sm ${subtextClasses}`}>Nuevo Chimbote</span>
            </div>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                <Link  to={link.href} className={`font-medium text-sm ${textClasses} hover:opacity-80 flex items-center gap-1`}>
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={16} />}
                </Link>
                
                {link.hasDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-2">
                      {link.dropdownItems?.map((item, idx) => (
                        <Link key={idx} to={item.href} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link to="/contact" className="ml-2 bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Contáctanos
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button 
            className={`md:hidden p-2 rounded ${textClasses}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </>
  );
};