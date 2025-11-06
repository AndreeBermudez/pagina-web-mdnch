import { useCallback, useEffect, useMemo, useState } from 'react';
import NoticiaModal from './NoticiaModal';
import { NoticiaFilters } from './NoticiaFilters';
import { useNoticiasQuery } from '../../../../../../features/administrador/noticias-admin/hooks/useNoticiasQuery';
import { formatDate } from '../../../../../utils/formatDate';

interface NoticiaItem {
  id: number;
  imagen: string;
  categoria: string;
  titulo: string;
  descripcion: string;
  resumen: string;
  fecha: string;
  fechaTimestamp: number;
  lugar: string;
}

const MONTHS = [
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
  { value: 12, label: 'Diciembre' },
];

const stripHtml = (value?: string | null) => {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
};

const formatDisplayDate = (fechaManual?: string | null, fechaCreacion?: string | null) => {
  if (fechaManual) {
    const trimmed = fechaManual.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return formatDate(trimmed);
    }
    return trimmed;
  }
  if (!fechaCreacion) return '';
  const date = new Date(fechaCreacion);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const getTimestamp = (fechaManual?: string | null, fechaCreacion?: string | null) => {
  if (fechaCreacion) {
    const timestamp = new Date(fechaCreacion).getTime();
    if (!Number.isNaN(timestamp)) return timestamp;
  }
  if (fechaManual) {
    const timestamp = new Date(`${fechaManual}T00:00:00`).getTime();
    if (!Number.isNaN(timestamp)) return timestamp;
  }
  return -Infinity;
};

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

  const { noticias, isLoading, error, refetch } = useNoticiasQuery();

  const normalizedNoticias = useMemo<NoticiaItem[]>(() => {
    if (!noticias) return [];

    return noticias
      .map((noticia) => {
        const descripcionLimpia = stripHtml(noticia.descripcion);
        const resumen = noticia.resumen?.trim() || descripcionLimpia;
        const fechaTimestamp = getTimestamp(noticia.fechaManual, noticia.fechaCreacion);

        return {
          id: noticia.noticiaId,
          imagen: noticia.direccionImagen || '/placeholder.svg',
          categoria: noticia.categoria,
          titulo: noticia.titulo,
          descripcion: descripcionLimpia,
          resumen,
          fecha: formatDisplayDate(noticia.fechaManual, noticia.fechaCreacion),
          fechaTimestamp,
          lugar: noticia.lugar,
        };
      })
      .sort((a, b) => b.fechaTimestamp - a.fechaTimestamp);
  }, [noticias]);

  const highlightedNoticias = useMemo(
    () => normalizedNoticias.slice(0, 4),
    [normalizedNoticias]
  );

  const categorias = useMemo(() => {
    const unique = new Set<string>();
    normalizedNoticias.forEach((noticia) => {
      if (noticia.categoria) unique.add(noticia.categoria);
    });
    return ['todas', ...Array.from(unique)];
  }, [normalizedNoticias]);

  const years = useMemo(() => {
    const unique = new Set<number>();
    normalizedNoticias.forEach((noticia) => {
      if (!Number.isFinite(noticia.fechaTimestamp)) return;
      const date = new Date(noticia.fechaTimestamp);
      if (!Number.isNaN(date.getTime())) unique.add(date.getFullYear());
    });
    return Array.from(unique).sort((a, b) => b - a);
  }, [normalizedNoticias]);

  const filteredNoticias = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return normalizedNoticias.filter((noticia) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [noticia.titulo, noticia.resumen, noticia.descripcion]
          .some((field) => field.toLowerCase().includes(normalizedSearch));

      const matchesCategory = selectedCategory === 'todas' || noticia.categoria === selectedCategory;

      const date = Number.isFinite(noticia.fechaTimestamp)
        ? new Date(noticia.fechaTimestamp)
        : null;

      const matchesMonth =
        selectedMonth === 'todos' ||
        (date && date.getMonth() + 1 === Number(selectedMonth));

      const matchesYear =
        selectedYear === 'todos' ||
        (date && date.getFullYear() === Number(selectedYear));

      return matchesSearch && matchesCategory && matchesMonth && matchesYear;
    });
  }, [normalizedNoticias, searchTerm, selectedCategory, selectedMonth, selectedYear]);

  const totalPages = useMemo(
    () => Math.ceil(filteredNoticias.length / itemsPerPage),
    [filteredNoticias.length]
  );

  const paginatedNoticias = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNoticias.slice(start, start + itemsPerPage);
  }, [filteredNoticias, currentPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (highlightedNoticias.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((current) =>
          current === highlightedNoticias.length - 1 ? 0 : current + 1
        );
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [highlightedNoticias.length]);

  useEffect(() => {
    if (activeSlide >= highlightedNoticias.length) {
      setActiveSlide(0);
    }
  }, [activeSlide, highlightedNoticias.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedMonth, selectedYear, normalizedNoticias.length]);

  const goToSlide = useCallback((index: number) => {
    if (index === activeSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsTransitioning(false);
    }, 500);
  }, [activeSlide]);

  return (
    <div className="container mx-auto px-4 space-y-12">
      <div className="relative h-[500px] rounded-xl overflow-hidden">
        {highlightedNoticias.length === 0 ? (
          <div className="flex h-full items-center justify-center bg-slate-100 text-slate-500">
            {isLoading ? 'Cargando noticias...' : error ? 'No se pudieron cargar las noticias' : 'No hay noticias disponibles'}
          </div>
        ) : (
          highlightedNoticias.map((noticia, index) => (
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
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {noticia.categoria}
                  </span>
                  <h2 className="text-4xl font-bold mt-4 mb-2">
                    {noticia.titulo}
                  </h2>
                  <p className="text-lg mb-4">
                    {noticia.resumen}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedNoticia(noticia)}
                      className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
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
          ))
        )}

        {highlightedNoticias.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            {highlightedNoticias.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === activeSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Todas las Noticias</h3>

          <NoticiaFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            months={MONTHS}
            years={years}
            categories={categorias}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Cargando noticias...
            </div>
          ) : filteredNoticias.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No se encontraron noticias que coincidan con tu búsqueda
            </div>
          ) : (
            <>
              {paginatedNoticias.map((noticia) => (
                <div key={noticia.id} className="rounded-lg overflow-hidden shadow-lg flex flex-col h-[500px] bg-white">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div>
                      <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {noticia.categoria}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mt-3 mb-1 line-clamp-2 min-h-[3rem]">
                      {noticia.titulo}
                    </h4>
                    <p className="text-gray-600 mb-3 flex-grow line-clamp-3">
                      {noticia.resumen}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedNoticia(noticia)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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

              {totalPages > 1 && (
                <div className="col-span-full flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Anterior
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <NoticiaModal
        noticia={selectedNoticia}
        onClose={() => setSelectedNoticia(null)}
      />
    </div>
  );
}
