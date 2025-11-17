import { useState } from "react";
import { X, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SurveyBannerProps {
    surveyUrl: string;
}

export const SurveyBanner = ({ surveyUrl }: SurveyBannerProps) => {
    const [visible, setVisible] = useState(true);
    const { t } = useTranslation("survey");

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            className="
                fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
                w-[92%] max-w-md
                animate-fade-in-up
            "
        >
            <div
                className="
                    relative overflow-hidden
                    rounded-2xl border border-black/10 
                    shadow-xl shadow-gray-900/10
                    bg-white/80 backdrop-blur-lg 
                    p-5
                "
            >
                {/* Botón cerrar */}
                <button
                    onClick={handleClose}
                    className="
                        absolute top-3 right-3 
                        p-1.5 rounded-full 
                        hover:bg-black/10 transition
                        text-black
                    "
                >
                    <X size={18} />
                </button>

                <div className="flex items-start gap-3">
                    {/* Ícono */}
                    <div className="
                        w-12 h-12 rounded-xl 
                        bg-yellow-400/20 border border-yellow-500/20
                        flex items-center justify-center
                        text-yellow-600
                    ">
                        <MessageSquare size={24} />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                        <p className="text-black font-semibold text-sm">
                            {t("question")}
                        </p>
                        <p className="text-gray-700 text-xs mt-1 leading-snug">
                            {t("description")}
                        </p>

                        <a
                            href={surveyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-block mt-3
                                bg-black text-white 
                                px-4 py-2 rounded-lg text-xs
                                hover:bg-gray-800 transition
                                shadow-md shadow-black/10
                            "
                        >
                            {t("cta")}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
