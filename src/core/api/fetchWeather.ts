const API_KEY = 'c9e4b8966f672cb3b116dfab9e58f053';

export interface WeatherData {
    temp: number;
    icon: string;
    description: string;
    country: string;
    iconUrl: string;
    error: boolean;
    errorMessage: string;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=es`);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                temp: 0,
                icon: '',
                description: '',
                country: '',
                iconUrl: '',
                error: true,
                errorMessage: errorData.message || 'Error al obtener datos del clima',
            };
        }

        const data = await response.json();

        return {
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            country: data.sys.country,
            iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            error: false,
            errorMessage: '',
        };
    } catch (e) {
        const error = e as Error
        return {
            temp: 0,
            icon: '',
            description: '',
            country: '',
            iconUrl: '',
            error: true,
            errorMessage: error.message || 'Error desconocido',
        };
    }
};
