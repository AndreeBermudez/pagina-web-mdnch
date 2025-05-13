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
      className={`bg-transparent text-white py-1 px-4 fixed w-full z-50 top-0 transition-transform duration-300 ${
        scrolled ? '-translate-y-full' : ''
      }`}
    >
      <div className="container mx-auto flex justify-end gap-4 text-sm mt-1">
        <a href="https://webmail.muninuevochimbote.gob.pe/" className="flex items-center gap-1 hover:text-blue-200">
          <Mail size={18} />
          Web Email
        </a>
        <span className="text-gray-400">|</span>
        <a href="https://facilita.gob.pe/t/4220" className="flex items-center gap-1 hover:text-blue-200">
          <Book size={18} />
          Mesa de Partes
        </a>
        <span className="text-gray-400">|</span>
        <a href="https://www.transparencia.gob.pe/" className="flex items-center gap-1 hover:text-blue-200">
          <img className="h-6 w-6" src={logopte} alt="Transparencia" />
          Portal de Transparencia
        </a>
      </div>
    </div>
  );
};