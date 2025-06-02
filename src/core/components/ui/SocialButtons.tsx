import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';

const SocialButton = ({ href, className, children, title }: { href: string; className: string; children: React.ReactNode; title: string }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${className} animate-bounce-slow shadow-lg rounded-r-lg`}
            aria-label={title}
            title={title}
        >
            {children}
        </a>
    );
};

export const SocialButtons = () => {    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
            <div className="flex flex-col gap-2">
                {/* Facebook */}                
                <SocialButton
                    href="https://web.facebook.com/muninuevochimboteoficial/?locale=es_LA&_rdc=1&_rdr#"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 transition-all duration-300 hover:translate-x-2 [animation-delay:-0.3s]"
                    title="Síguenos en Facebook"
                >
                    <FaFacebook size={24} />
                </SocialButton>

                {/* YouTube */}
                <SocialButton
                    href="https://www.youtube.com/@municipalidaddenuevochimbo9068"
                    className="bg-red-600 hover:bg-red-700 text-white p-3 transition-all duration-300 hover:translate-x-2 [animation-delay:-0.2s]"
                    title="Síguenos en YouTube"
                >
                    <FaYoutube size={24} />
                </SocialButton>

                {/* Instagram */}
                <SocialButton
                    href="https://www.instagram.com/muni_nuevochimbote/"
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white p-3 transition-all duration-300 hover:translate-x-2 [animation-delay:-0.1s]"
                    title="Síguenos en Instagram"
                >
                    <FaInstagram size={24} />
                </SocialButton>
            </div>
        </div>
    );
};
