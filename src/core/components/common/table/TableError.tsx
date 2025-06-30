export const TableError = ({ message }: { message: string }) => (
    <tr>
        <td colSpan={100} className="py-12">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 text-red-300 mb-4 flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <p className="text-red-500 text-lg font-medium">Error al cargar los datos</p>
                <p className="text-gray-400 text-sm mt-1">{message}</p>
            </div>
        </td>
    </tr>
);