import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ReturnToTopProps {
    showAfter?: number;
    className?: string;
}

export const ReturnToTop = ({ showAfter = 300, className = '' }: ReturnToTopProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            setScrollProgress(scrollPercent);
            setIsVisible(scrollTop > showAfter);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [showAfter]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`fixed bottom-8 right-2 z-50 ${className}`}>
            <button
                onClick={scrollToTop}
                className='relative bg-yellow-500 text-gray-900 p-4 rounded-full hover:bg-blue-700 hover:text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group'
                aria-label='Volver arriba'>
                
                <div 
                    className='absolute inset-0 rounded-full border-2 border-blue-300'
                    style={{
                        background: `conic-gradient(#3b82f6 ${scrollProgress * 3.6}deg, transparent 0deg)`
                    }}
                />
                <ArrowUp className='w-5 h-5 relative z-10 group-hover:animate-bounce' />
            </button>
        </div>
    );
};