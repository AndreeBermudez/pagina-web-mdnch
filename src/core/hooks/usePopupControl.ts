import { useState, useEffect } from 'react';

const POPUP_STORAGE_KEY = 'popup_shown';

export const usePopupControl = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
   
        const wasShown = sessionStorage.getItem(POPUP_STORAGE_KEY);

        
        if (!wasShown) {
          
            const timer = setTimeout(() => {
            
                setIsPopupOpen(true);
            }, 2000); 
            
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsPopupOpen(false);
       
        sessionStorage.setItem(POPUP_STORAGE_KEY, 'true');
    };

    return {
        isPopupOpen,
        closePopup
    };
};