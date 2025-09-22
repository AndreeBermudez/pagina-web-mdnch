import { Search } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface MonthOption {
  value: number;
  label: string;
}

interface NoticiaFiltersProps {
  searchTerm: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
  selectedMonth: string;
  onMonthChange: Dispatch<SetStateAction<string>>;
  selectedYear: string;
  onYearChange: Dispatch<SetStateAction<string>>;
  months: MonthOption[];
  years: number[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: Dispatch<SetStateAction<string>>;
}

export const NoticiaFilters = ({
  searchTerm,
  onSearchChange,
  selectedMonth,
  onMonthChange,
  selectedYear,
  onYearChange,
  months,
  years,
  categories,
  selectedCategory,
  onCategoryChange,
}: NoticiaFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={selectedMonth}
            onChange={(event) => onMonthChange(event.target.value)}
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
            onChange={(event) => onYearChange(event.target.value)}
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

      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide relative">
          <div className="flex gap-2 pb-2">
            {categories.map((categoria) => (
              <button
                key={categoria}
                onClick={() => onCategoryChange(categoria)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
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

        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent pointer-events-none" />
      </div>
    </div>
  );
};
