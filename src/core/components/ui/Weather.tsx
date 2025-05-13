import { useState, useEffect } from 'react';
import { fetchWeather, type WeatherData } from '../../../core/api/fetchWeather';
import { Cloud } from 'lucide-react';

interface WeatherProps {
    city?: string;
}

export const Weather = ({ city = 'chimbote'}: WeatherProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData>({
        temp: 0,
        icon: '',
        description: '',
        country: '',
        iconUrl: '',
        error: false,
        errorMessage: ''
    });
    const [isExpanded, setIsExpanded] = useState(false);
    
    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeather(city);
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather:', error);
                setWeatherData(prev => ({...prev, error: true}));
            }
        };
        getWeather();
    }, [city]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    const { temp, description, country, error } = weatherData;
    
    return (
        <div 
            className={`text-white bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-lg shadow-blue-950/20 backdrop-blur-md border border-white/10 cursor-pointer transition-all duration-300 ease-in-out ${isExpanded ? 'w-48' : 'w-16'}`}
            onClick={toggleExpand}
        >
            <div className="flex items-center">
                <div className="flex items-center justify-center p-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center">
                        <Cloud/>
                    </div>
                </div>
                
                {isExpanded && (
                    <div className="px-3 py-2 flex-1">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold">{temp} °C</span>
                            <span className="ml-2 text-xs bg-blue-500 px-1.5 py-0.5 rounded font-medium">
                                {error ? "??" : country}
                            </span>
                        </div>
                        <p className="text-xs uppercase font-medium text-white/80">
                            {error ? "desconocido" : description}
                        </p>
                        <p className="text-xs font-medium capitalize">{city}</p>
                    </div>
                )}
            </div>
        </div>
    );
};