import { Accessibility, Plus, Minus, Circle, Sun, Moon, Eye, Book, Link, Pause, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './accessibility.css';

export const AccessibilityMenu = () => {
    const { t, i18n } = useTranslation();

    const [isExpanded, setIsExpanded] = useState(false);

    // Idioma
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('accessibility-lang') || i18n.language || 'es';
    });

    useEffect(() => {
        i18n.changeLanguage(lang);
        localStorage.setItem('accessibility-lang', lang);
        document.documentElement.lang = lang.startsWith('qu') ? 'qu' : 'es';
    }, [lang, i18n]);

    // Preferencias de accesibilidad
    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('accessibility-fontSize');
        return saved ? parseInt(saved) : 100;
    });

    const [contrast, setContrast] = useState<'normal' | 'high' | 'negative' | 'light'>(() => {
        const saved = localStorage.getItem('accessibility-contrast');
        return (saved as 'normal' | 'high' | 'negative' | 'light') || 'normal';
    });

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('accessibility-darkMode') === 'true');
    const [grayscale, setGrayscale] = useState(() => localStorage.getItem('accessibility-grayscale') === 'true');
    const [screenReader, setScreenReader] = useState(() => localStorage.getItem('accessibility-screenReader') === 'true');
    const [legibleFont, setLegibleFont] = useState(() => localStorage.getItem('accessibility-legibleFont') === 'true');
    const [underlineLinks, setUnderlineLinks] = useState(() => localStorage.getItem('accessibility-underlineLinks') === 'true');
    const [pauseAnimations, setPauseAnimations] = useState(() => localStorage.getItem('accessibility-pauseAnimations') === 'true');
    const [dyslexiaFont, setDyslexiaFont] = useState(() => localStorage.getItem('accessibility-dyslexiaFont') === 'true');
    const [bigCursor, setBigCursor] = useState(() => localStorage.getItem('accessibility-bigCursor') === 'true');

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem('accessibility-fontSize', fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        const body = document.body;
        body.classList.remove('high-contrast', 'negative-contrast', 'light-mode');
        if (contrast === 'high') body.classList.add('high-contrast');
        else if (contrast === 'negative') body.classList.add('negative-contrast');
        else if (contrast === 'light') body.classList.add('light-mode');
        localStorage.setItem('accessibility-contrast', contrast);
    }, [contrast]);

    useEffect(() => {
        const body = document.body;
        if (darkMode) body.classList.add('dark-mode');
        else body.classList.remove('dark-mode');
        localStorage.setItem('accessibility-darkMode', darkMode.toString());
    }, [darkMode]);

    useEffect(() => {
        if (dyslexiaFont) {
            document.body.style.fontFamily = 'OpenDyslexic, Comic Sans MS, Arial, sans-serif';
        } else if (!legibleFont) {
            document.body.style.fontFamily = '';
        }
        localStorage.setItem('accessibility-dyslexiaFont', dyslexiaFont.toString());
    }, [dyslexiaFont, legibleFont]);

    useEffect(() => {
        if (bigCursor) {
            document.body.style.cursor =
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'black\' stroke=\'white\' stroke-width=\'1\' d=\'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z\'/%3E%3C/svg%3E") 12 12, auto';
            const style = document.getElementById('accessibility-cursor-style');
            if (!style) {
                const newStyle = document.createElement('style');
                newStyle.id = 'accessibility-cursor-style';
                newStyle.innerHTML = `
          * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath fill='black' stroke='white' stroke-width='1' d='M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z'/%3E%3C/svg%3E") 12 12, auto !important; }
          a, button { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath fill='%234F46E5' stroke='white' stroke-width='1' d='M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 01-1.36-5.27l-2.33-2.33A8.002 8.002 0 0012 20c4.42 0 8-3.58 8-8 0-2.83-1.47-5.31-3.68-6.71l-2.33 2.33c1.92.84 3.26 2.74 3.26 4.94 0 2.97-2.41 5.38-5.38 5.38-2.2 0-4.1-1.34-4.94-3.26l2.33-2.33z'/%3E%3C/svg%3E") 12 12, pointer !important; }
        `;
                document.head.appendChild(newStyle);
            }
        } else {
            document.body.style.cursor = '';
            const style = document.getElementById('accessibility-cursor-style');
            if (style) style.remove();
        }
        localStorage.setItem('accessibility-bigCursor', bigCursor.toString());
    }, [bigCursor]);

    useEffect(() => {
        if (screenReader) {
            const addTabIndex = () => {
                const selectors = [
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'p', 'div[class*="text"]', 'section',
                    'article', 'nav', 'main', 'header', 'footer',
                    'li', 'span[class*="text"]', 'label',
                    'img', 'figure'
                ];
                selectors.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach((el) => {
                        const element = el as HTMLElement;
                        const hasContent = element.textContent?.trim() || element.getAttribute('alt') || element.getAttribute('aria-label');
                        const isInteractive = element.hasAttribute('tabindex') ||
                            ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
                        if (hasContent && !isInteractive && !element.getAttribute('data-accessibility-tabindex')) {
                            element.setAttribute('tabindex', '0');
                            element.setAttribute('data-accessibility-tabindex', 'true');
                        }
                    });
                });
            };

            addTabIndex();
            const observer = new MutationObserver(addTabIndex);
            observer.observe(document.body, { childList: true, subtree: true });

            const handleFocus = (e: FocusEvent) => {
                const target = e.target as HTMLElement;
                if (target && 'speechSynthesis' in window) {
                    let text = '';
                    if (target.tagName === 'IMG') {
                        text = target.getAttribute('alt') || (lang.startsWith('qu') ? 'Rikch’akuq mana qillqasqachu' : 'Imagen sin descripción');
                    } else if (target.tagName === 'A') {
                        text = (lang.startsWith('qu') ? 'T’inki: ' : 'Enlace: ') + (target.textContent?.trim() || target.getAttribute('aria-label') || (lang.startsWith('qu') ? 'T’inki' : 'Enlace'));
                    } else if (target.tagName === 'BUTTON') {
                        text = (lang.startsWith('qu') ? 'B’utun: ' : 'Botón: ') + (target.textContent?.trim() || target.getAttribute('aria-label') || (lang.startsWith('qu') ? 'B’utun' : 'Botón'));
                    } else if (target.tagName === 'INPUT') {
                        const inputType = target.getAttribute('type') || 'text';
                        const label = target.getAttribute('placeholder') || target.getAttribute('aria-label') || '';
                        text = (lang.startsWith('qu') ? 'Chimpu ' : 'Campo de ') + `${inputType}: ${label}`;
                    } else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName)) {
                        text = (lang.startsWith('qu') ? 'Umalliq: ' : 'Encabezado: ') + (target.textContent?.trim() || '');
                    } else {
                        text = target.textContent?.trim() ||
                            target.getAttribute('aria-label') ||
                            target.getAttribute('title') || '';
                    }
                    if (text && text.length > 0) {
                        const maxLength = 200;
                        if (text.length > maxLength) text = text.substring(0, maxLength) + (lang.startsWith('qu') ? ' ... qhapa pisiq qillqa' : ' ... texto largo');
                        const utterance = new SpeechSynthesisUtterance(text);
                        utterance.lang = lang.startsWith('qu') ? 'qu' : 'es-ES';
                        utterance.rate = 0.9;
                        utterance.volume = 1;
                        window.speechSynthesis.cancel();
                        window.speechSynthesis.speak(utterance);
                    }
                }
            };

            document.addEventListener('focusin', handleFocus);
            return () => {
                const elements = document.querySelectorAll('[data-accessibility-tabindex="true"]');
                elements.forEach(el => {
                    el.removeAttribute('tabindex');
                    el.removeAttribute('data-accessibility-tabindex');
                });
                observer.disconnect();
                document.removeEventListener('focusin', handleFocus);
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            };
        } else {
            const elements = document.querySelectorAll('[data-accessibility-tabindex="true"]');
            elements.forEach(el => {
                el.removeAttribute('tabindex');
                el.removeAttribute('data-accessibility-tabindex');
            });
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        }
        localStorage.setItem('accessibility-screenReader', screenReader.toString());
    }, [screenReader, lang]);

    useEffect(() => {
        document.documentElement.style.filter = grayscale ? 'grayscale(100%)' : 'none';
        localStorage.setItem('accessibility-grayscale', grayscale.toString());
    }, [grayscale]);

    useEffect(() => {
        if (legibleFont) document.body.style.fontFamily = 'Arial, Helvetica, sans-serif';
        else document.body.style.fontFamily = '';
        localStorage.setItem('accessibility-legibleFont', legibleFont.toString());
    }, [legibleFont]);

    useEffect(() => {
        const style = document.getElementById('accessibility-links-style');
        if (underlineLinks) {
            if (!style) {
                const newStyle = document.createElement('style');
                newStyle.id = 'accessibility-links-style';
                newStyle.innerHTML = 'a { text-decoration: underline !important; }';
                document.head.appendChild(newStyle);
            }
        } else {
            if (style) style.remove();
        }
        localStorage.setItem('accessibility-underlineLinks', underlineLinks.toString());
    }, [underlineLinks]);

    useEffect(() => {
        const style = document.getElementById('accessibility-animations-style');
        if (pauseAnimations) {
            if (!style) {
                const newStyle = document.createElement('style');
                newStyle.id = 'accessibility-animations-style';
                newStyle.innerHTML = '* { animation-play-state: paused !important; transition: none !important; }';
                document.head.appendChild(newStyle);
            }
        } else {
            if (style) style.remove();
        }
        localStorage.setItem('accessibility-pauseAnimations', pauseAnimations.toString());
    }, [pauseAnimations]);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const increaseFontSize = () => setFontSize(prev => Math.min(prev + 10, 150));
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 10, 80));

    const resetAll = () => {
        setFontSize(100);
        setContrast('normal');
        setDarkMode(false);
        setGrayscale(false);
        setLegibleFont(false);
        setUnderlineLinks(false);
        setPauseAnimations(false);
        setScreenReader(false);
        setDyslexiaFont(false);
        setBigCursor(false);

        const body = document.body;
        body.classList.remove('high-contrast', 'negative-contrast', 'light-mode', 'dark-mode');

        ['accessibility-links-style', 'accessibility-animations-style', 'accessibility-cursor-style']
            .forEach(id => document.getElementById(id)?.remove());

        [
            'accessibility-fontSize', 'accessibility-contrast', 'accessibility-darkMode', 'accessibility-grayscale',
            'accessibility-legibleFont', 'accessibility-underlineLinks', 'accessibility-pauseAnimations',
            'accessibility-screenReader', 'accessibility-dyslexiaFont', 'accessibility-bigCursor'
        ].forEach(key => localStorage.removeItem(key));
    };

    return (
        <div className='fixed top-48 right-2 z-[9999]' style={{ position: 'fixed' }}>
            <div className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-16'}`}>
                {/* Header */}
                <div className='flex items-center cursor-pointer bg-purple-600 hover:bg-purple-700 transition-colors' onClick={toggleExpand}>
                    <div className='flex items-center justify-center p-3'>
                        <div className='w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center'>
                            <Accessibility className='text-white' size={24} />
                        </div>
                    </div>
                    {isExpanded && (
                        <div className='px-2 py-1 flex-1'>
                            <p className='text-white font-bold text-sm'>{t('accessibility')}</p>
                        </div>
                    )}
                </div>

                {/* Menu */}
                {isExpanded && (
                    <div className='p-2 space-y-1 max-h-[320px] overflow-y-auto'>
                        {/* Idioma */}
                        <div className='pt-1'>
                            <div className='text-[11px] font-semibold text-gray-600 px-2 mb-1'>
                                {t('language')}
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <button
                                    onClick={() => setLang('es')}
                                    aria-pressed={lang.startsWith('es')}
                                    className={`w-full p-2 rounded-md border text-xs ${lang.startsWith('es') ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                                >
                                    {t('spanish')}
                                </button>
                                <button
                                    onClick={() => setLang('qu')}
                                    aria-pressed={lang.startsWith('qu')}
                                    className={`w-full p-2 rounded-md border text-xs ${lang.startsWith('qu') ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                                >
                                    {t('quechua')}
                                </button>
                            </div>
                        </div>

                        {/* Aumentar/Reducir texto */}
                        <button onClick={increaseFontSize} className='w-full flex items-center gap-2 p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-xs'>
                            <Plus size={16} />
                            <span className='font-medium'>{t('increase_text')}</span>
                        </button>

                        <button onClick={decreaseFontSize} className='w-full flex items-center gap-2 p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-xs'>
                            <Minus size={16} />
                            <span className='font-medium'>{t('decrease_text')}</span>
                        </button>

                        {/* Alto contraste */}
                        <button
                            onClick={() => setContrast(contrast === 'high' ? 'normal' : 'high')}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${contrast === 'high' ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <Circle size={16} className={contrast === 'high' ? 'fill-black' : ''} />
                            <span className='font-medium'>{t('high_contrast')}</span>
                        </button>

                        {/* Fondo claro */}
                        <button
                            onClick={() => setContrast(contrast === 'light' ? 'normal' : 'light')}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${contrast === 'light' ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <Sun size={16} />
                            <span className='font-medium'>{t('light_bg')}</span>
                        </button>

                        {/* Contraste negativo */}
                        <button
                            onClick={() => setContrast(contrast === 'negative' ? 'normal' : 'negative')}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${contrast === 'negative' ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <Circle size={16} className='fill-current' />
                            <span className='font-medium'>{t('negative_contrast')}</span>
                        </button>

                        {/* Modo oscuro */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${darkMode ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <Moon size={16} />
                            <span className='font-medium'>{t('dark_mode')}</span>
                        </button>

                        {/* Escala de grises */}
                        <button
                            onClick={() => setGrayscale(!grayscale)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${grayscale ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <Eye size={16} className={grayscale ? 'opacity-50' : ''} />
                            <span className='font-medium'>{t('grayscale')}</span>
                        </button>

                        {/* Fuente legible */}
                        <button
                            onClick={() => setLegibleFont(!legibleFont)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${legibleFont ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <Book size={16} />
                            <span className='font-medium'>{t('legible_font')}</span>
                        </button>

                        {/* Fuente dislexia */}
                        <button
                            onClick={() => setDyslexiaFont(!dyslexiaFont)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${dyslexiaFont ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            <span className='font-medium'>{t('dyslexia_font')}</span>
                        </button>

                        {/* Cursor grande */}
                        <button
                            onClick={() => setBigCursor(!bigCursor)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${bigCursor ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                            <span className='font-medium'>{t('big_cursor')}</span>
                        </button>

                        {/* Subrayar enlaces */}
                        <button
                            onClick={() => setUnderlineLinks(!underlineLinks)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${underlineLinks ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <Link size={16} />
                            <span className='font-medium'>{t('underline_links')}</span>
                        </button>

                        {/* Pausar animaciones */}
                        <button
                            onClick={() => setPauseAnimations(!pauseAnimations)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${pauseAnimations ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <Pause size={16} />
                            <span className='font-medium'>{t('pause_animations')}</span>
                        </button>

                        {/* Lectura con Tab */}
                        <button
                            onClick={() => setScreenReader(!screenReader)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${screenReader ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                            <span className='font-medium'>{t('tab_reader')}</span>
                        </button>

                        {/* Restablecer */}
                        <button
                            onClick={resetAll}
                            className='w-full flex items-center gap-2 p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors text-xs'
                        >
                            <RotateCcw size={16} />
                            <span className='font-medium'>{t('reset')}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
