import { SearchX } from 'lucide-react';

export const NoRecordsFound = () => (
    <tr>
        <td colSpan={100} className='py-12'>
            <div className='flex flex-col items-center justify-center text-center'>
                <SearchX className='w-16 h-16 text-gray-300 mb-4 stroke-[1.5]' />
                <p className='text-gray-500 text-lg font-medium'>No se encontraron registros</p>
                <p className='text-gray-400 text-sm mt-1'>Intenta con otros criterios de búsqueda</p>
            </div>
        </td>
    </tr>
);