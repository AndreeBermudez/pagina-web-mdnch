import { Book, Mail } from "lucide-react"
import logopte from '../../../assets/logo_ptewhite.png';

interface Props {
    isHomePage: boolean,
    scrolled: boolean
}

export const PreNavbar = ({isHomePage, scrolled}:Props) => {
  if (!isHomePage) return null;
  return (
    <div 
      className={`hidden bg-transparent text-white py-2 md:block fixed w-full z-50 top-0 transition-transform duration-300 ${
        scrolled ? '-translate-y-full' : ''
      }`}
    >
      <div className="container-navbar">
        <div className="w-full flex justify-end gap-4 text-sm mt-1 items-center">
          <a href="https://webmail.muninuevochimbote.gob.pe/" className="flex items-center gap-1 hover:text-blue-200">
            <Mail size={20} />
            <span className="hidden lg:flex ">Web Email</span>
          </a>
          <span className="text-gray-400">|</span>
          <a href="https://facilita.gob.pe/t/4220" className="flex items-center gap-1 hover:text-blue-200">
            <Book size={20} />
            <span className="hidden lg:flex ">Mesa de Partes</span>
          </a>
          <span className="text-gray-400">|</span>
          <a href="https://www.transparencia.gob.pe/" className="flex items-center gap-1 hover:text-blue-200">
            <img className="h-8 w-8" src={logopte} alt="Transparencia" />
            <span className="hidden lg:flex ">Portal de Transparencia</span>
          </a>
        </div>
      </div>
    </div>
  );
};