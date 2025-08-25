
import { useState, useEffect, useCallback } from 'react';
import NoticiaModal from './NoticiaModal';


interface NoticiaItem {
  id: number;
  imagen: string;
  categoria: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar?: string;
}

export default function Noticia() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedMonth, setSelectedMonth] = useState('todos');
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedNoticia, setSelectedNoticia] = useState<NoticiaItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Declarar todasLasNoticias antes de usarla
  const todasLasNoticias: NoticiaItem[] = [
    {
      id: 1,
      imagen: "/public/antiguoDistrito.jpg",
      categoria: "Educación",
      titulo: "Talleres de Verano 2024",
      descripcion: "La Municipalidad Distrital de Nuevo Chimbote inicia el ciclo Verano 2024 con talleres gratuitos para toda la familia.",
      fecha: "14/8/2024",
      lugar: "Centro Cultural Municipal"
    },
    {
      id: 2,
      imagen: "/public/catedral.jpg",
      categoria: "Obras Públicas",
      titulo: "Renovación de la Plaza Mayor",
      descripcion: "Se inician los trabajos de renovación de la Plaza Mayor del distrito, mejorando la infraestructura y áreas verdes.",
      fecha: "12/8/2024",
      lugar: "Plaza Mayor"
    },
    {
      id: 3,
      imagen: "/public/antiguoDistrito.jpg",
      categoria: "Deportes",
      titulo: "Campeonato Distrital de Fútbol",
      descripcion: "Gran inauguración del Campeonato Distrital de Fútbol 2024 con la participación de 20 equipos locales.",
      fecha: "10/8/2024",
      lugar: "Estadio Municipal"
    },
    {
      id: 4,
      imagen: "/public/antiguoDistrito.jpg",
      categoria: "Deportes",
      titulo: "Campeonato Distrital de Fútbol",
      descripcion: "Gran inauguración del Campeonato Distrital de Fútbol 2024 con la participación de 20 equipos locales.",
      fecha: "10/8/2024",
      lugar: "Estadio Municipal"
    },
    {
      id: 5,
      imagen: "/public/antiguoDistrito.jpg",
      categoria: "Deportes",
      titulo: "Campeonato Distrital de Fútbol",
      descripcion: "Gran inauguración del Campeonato Distrital de Fútbol 2024 con la participación de 20 equipos locales.",
      fecha: "10/8/2024",
      lugar: "Estadio Municipal"
    },
    {
      id: 6,
      imagen: "/public/antiguoDistrito.jpg",
      categoria: "Deportes",
      titulo: "Campeonato Distrital de Fútbol",
      descripcion: "Gran inauguración del Campeonato Distrital de Fútbol 2024 con la participación de 20 equipos locales.",
      fecha: "10/8/2024",
      lugar: "Estadio Municipal"
    },
    {
      id: 7,
      imagen: "/public/antiguoDistrito.jpg",
      categoria: "Deportes",
      titulo: "Campeonato Distrital de Fútbol",
      descripcion: "Gran inauguración del Campeonato Distrital de Fútbol 2024 con la participación de 20 equipos locales.",
      fecha: "10/8/2024",
      lugar: "Estadio Municipal"
    }
  ];

  // Obtener años y meses únicos de las noticias
  const dates = todasLasNoticias.map(noticia => {
    const [dia, mes, año] = noticia.fecha.split('/');
    return { mes: parseInt(mes), año: parseInt(año) };
  });

  const years = Array.from(new Set(dates.map(d => d.año))).sort((a, b) => b - a);
  const months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  const categorias = [
    'todas',
    'Obras Públicas',
    'Institucional',
    'Educación',
    'Cultura',
    'Deportes',
    'Salud',
    'Seguridad'
  ];

  const noticiasDestacadas: NoticiaItem[] = [
    {
      id: 1,
      imagen: "/public/antiguoDistrito.jpg",
      categoria: "Obras Públicas",
      titulo: "Empezó Mantenimiento del Parque de la Urb. Casuarinas II Etapa",
      descripcion: "En 60 días los vecinos de la urb. Casuarinas II etapa disfrutarán de una zona de recreación familiar completamente renovada.",
      fecha: "7/8/2024",
      lugar: "Urb. Casuarinas II"
    },
    {
      id: 2,
      imagen: "/public/Daniel.jpg",
      categoria: "Institucional",
      titulo: "Feliz Cumpleaños Alcalde Walter Jesús Soto Campos",
      descripcion: "En este día tan especial, miramos un recorrido lleno de éxito y excelencia, un año lleno de éxitos y prosperidad que han contribuido al bienestar de todos los neochimbotanos.",
      fecha: "9/8/2024",
      lugar: "Municipalidad"
    },
    {
      id: 3,
      imagen: "/public/catedral.jpg",
      categoria: "Educación",
      titulo: "Talleres de Verano 2024",
      descripcion: "La Municipalidad Distrital de Nuevo Chimbote inicia el ciclo Verano 2024 con talleres gratuitos para toda la familia.",
      fecha: "14/8/2024",
      lugar: "Centro Cultural Municipal"
    },
    {
      id: 4,
      imagen: "/public/catedral.jpg",
      categoria: "Educación",
      titulo: "Talleres de Verano 2024",
      descripcion: "La Municipalidad Distrital de Nuevo Chimbote inicia el ciclo Verano 2024 con talleres gratuitos para toda la familia.",
      fecha: "14/8/2024",
      lugar: "Centro Cultural Municipal"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((current) => 
          current === noticiasDestacadas.length - 1 ? 0 : current + 1
        );
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [noticiasDestacadas.length]);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const filteredNoticias = todasLasNoticias.filter((noticia) => {
    const matchesSearch = noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         noticia.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || noticia.categoria === selectedCategory;
    
    // Filtrado por fecha
    const [dia, mes, año] = noticia.fecha.split('/').map(Number);
    const matchesMonth = selectedMonth === 'todos' || mes === Number(selectedMonth);
    const matchesYear = selectedYear === 'todos' || año === Number(selectedYear);
    
    return matchesSearch && matchesCategory && matchesMonth && matchesYear;
  });

  const totalPages = Math.ceil(filteredNoticias.length / itemsPerPage);
  const paginatedNoticias = filteredNoticias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedMonth, selectedYear]);

  return (
    <div className="container mx-auto px-4  space-y-12">
      {/* Carrusel de Noticias Destacadas */}
      <div className="relative h-[500px] rounded-xl overflow-hidden">
        {noticiasDestacadas.map((noticia, index) => (
          <div
            key={noticia.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: index === activeSlide ? 1 : 0 }}
          >
            <img 
              src={noticia.imagen} 
              alt={noticia.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  {noticia.categoria}
                </span>
                <h2 className="text-4xl font-bold mt-4 mb-2">
                  {noticia.titulo}
                </h2>
                <p className="text-lg mb-4">
                  {noticia.descripcion}
                </p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedNoticia(noticia)}
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                  >
                    Leer más
                  </button>
                  <span className="text-sm">
                    {noticia.fecha} • {noticia.lugar}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Controles del carrusel */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          {noticiasDestacadas.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full  ${
                index === activeSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Sección Todas las Noticias */}
      <div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Todas las Noticias</h3>
          
          {/* Filtros */}
          <div className="space-y-4">
            {/* Barra superior: buscador y filtros de fecha */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Filtros de fecha */}
              <div className="flex gap-2 items-center">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="todos">Todos los meses</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="todos">Todos los años</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Categorías con scroll horizontal */}
            <div className="relative">
              <div className="overflow-x-auto scrollbar-hide relative">
                <div className="flex gap-2 pb-2">
                  {categorias.map((categoria) => (
                    <button
                      key={categoria}
                      onClick={() => setSelectedCategory(categoria)}
                      className={`px-4 py-2 rounded-full text-sm font-medium  whitespace-nowrap ${
                        selectedCategory === categoria
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Indicadores de scroll */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-transparent pointer-events-none"></div>
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNoticias.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No se encontraron noticias que coincidan con tu búsqueda
            </div>
          ) : (
            <>
              {paginatedNoticias.map((noticia) => (
              <div key={noticia.id} className="rounded-lg overflow-hidden shadow-lg flex flex-col h-[500px] bg-transparent">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={noticia.imagen} 
                    alt={noticia.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div>
                    <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {noticia.categoria}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mt-3 mb-1 line-clamp-2 min-h-[3rem]">
                    {noticia.titulo}
                  </h4>
                  <p className="text-gray-600 mb-3 flex-grow line-clamp-3">
                    {noticia.descripcion}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => setSelectedNoticia(noticia)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Leer más
                    </button>
                    <span className="text-sm text-gray-500">
                      {noticia.fecha}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Paginación */}
            {totalPages > 1 && (
              <div className="col-span-full flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Anterior
                </button>
                
                {/* Números de página */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-green-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
          )}
        </div>
      </div>

      {/* Modal de Noticia */}
      <NoticiaModal 
        noticia={selectedNoticia}
        onClose={() => setSelectedNoticia(null)}
      />
    </div>  
  );
}