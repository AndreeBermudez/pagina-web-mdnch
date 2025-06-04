interface HymnSection {
    title: string;
    lines: string[];
}

export interface HymnData {
    title: string;
    audioSrc: string;
    sections: HymnSection[];
}

export const hymnData: HymnData = {
    title: 'Nuevo Chimbote',
    audioSrc: 'himnoNuevo.m4a',
    sections: [
        {
            title: 'CORO',
            lines: [
                'Con los pechos henchidos de orgullo',
                'Exclamemos con fuerza y vigor',
                '¡Somos hijos de Nuevo Chimbote,',
                'Tierra estoica de arena y sol!',
            ],
        },
        {
            title: 'ESTROFA I',
            lines: [
                'Ya vencimos la sed, las tinieblas,',
                'La tristeza y la desolación',
                'Hoy crecemos de cara al mañana,',
                'Somos fuente de superación',
                'Ciudad nueva, terruño sagrado',
                'El orgullo del viejo Chavín.',
            ],
        },
        {
            title: 'ESTROFA II',
            lines: [
                'Cual torrente tu pueblo progresa',
                'Con trabajo, esfuerzo y tesón',
                'El dorado, Atahualpa, Anconcillo',
                'Buenos Aires, muy hermosos son;',
                'Con tus hombres de brazos de acero,',
                'Forjaremos la superación.',
            ],
        },
        {
            title: 'ESTROFA III',
            lines: [
                'Los pantanos de Villa María son reservas de la humanidad,',
                'Sus mujeres son fuente de vida',
                'Tan hermosas como el mismo mar',
                'Y sus niños creando el futuro',
                'Ya avizoran el nuevo Perú.',
            ],
        },
    ],
};
