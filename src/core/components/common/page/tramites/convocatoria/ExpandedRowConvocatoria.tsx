import { ExternalLink, FileText, AlertCircle } from 'lucide-react';
import type { ConvocatoriaPublica } from '../../../../../services/convocatoria/obtenerConvocatoriasPublicas';

interface ExpandedRowConvocatoriaProps {
    convocatoria: ConvocatoriaPublica;
}

export const ExpandedRowConvocatoria = ({ convocatoria }: ExpandedRowConvocatoriaProps) => {
    const { documentos } = convocatoria;

    // Filter documents by enabled status and organize by category
    const documentosHabilitados = documentos.filter(doc => doc.habilitado);
    
    const getDocumentosByCategoria = (categoria: string) => {
        return documentosHabilitados.filter(doc => doc.categoria === categoria);
    };

    const documentosBase = getDocumentosByCategoria('documento');
    const enlaces = getDocumentosByCategoria('enlace'); // Aquí está la postulación
    const comunicadosData = getDocumentosByCategoria('comunicado');
    const evaluaciones = getDocumentosByCategoria('evaluacion');

    // Si no hay documentos habilitados, mostrar mensaje informativo
    if (documentosHabilitados.length === 0) {
        return (
            <tr>
                <td colSpan={5} className='px-6 py-6 border-l-4 border-blue-500 bg-gradient-to-b from-blue-25 to-blue-50'>
                    <div className='max-w-full'>
                        {/* Header de la sección expandida */}
                        <div className='mb-4 pb-4 border-b-2 border-blue-200'>
                            <h3 className='text-base font-semibold text-gray-800 flex items-center gap-3'>
                                <div className='bg-blue-500 text-white p-2 rounded-lg'>
                                    <FileText className='w-5 h-5' />
                                </div>
                                Documentos y enlaces disponibles
                                <div className='flex-1 h-px bg-blue-200'></div>
                            </h3>
                        </div>
                        
                        {/* Mensaje de convocatoria en preparación */}
                        <div className='flex flex-col items-center justify-center py-8'>
                            <div className='bg-yellow-100 border border-yellow-300 rounded-full p-4 mb-4'>
                                <AlertCircle className='w-8 h-8 text-yellow-600' />
                            </div>
                            <h4 className='text-lg font-semibold text-gray-800 mb-2'>Convocatoria en Preparación</h4>
                            <p className='text-gray-600 text-center max-w-md'>
                                Los documentos de esta convocatoria están siendo preparados y serán publicados próximamente.
                            </p>
                            <div className='mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                                🔄 En proceso de actualización
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    const getDocumentIcon = (categoria: string) => {
        switch (categoria) {
            case 'enlace':
                return '📝';
            case 'evaluacion':
                return '📊';
            case 'comunicado':
                return '�';
            default:
                return '📄';
        }
    };

    const getStatusColor = (url: string | null) => {
        if (!url) return 'bg-gray-100 text-gray-500 border-gray-200';
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
    };

    return (
        <tr>
            <td colSpan={5} className='px-6 py-6 border-l-4 border-blue-500 bg-gradient-to-b from-blue-25 to-blue-50'>
                <div className='max-w-full'>
                    {/* Header de la sección expandida */}
                    <div className='mb-6 pb-4 border-b-2 border-blue-200'>
                        <h3 className='text-base font-semibold text-gray-800 flex items-center gap-3'>
                            <div className='bg-blue-500 text-white p-2 rounded-lg'>
                                <FileText className='w-5 h-5' />
                            </div>
                            Documentos y enlaces disponibles
                            <div className='flex-1 h-px bg-blue-200'></div>
                        </h3>
                    </div>

                    {/* Grid de documentos principales y enlaces */}
                    {(documentosBase.length > 0 || enlaces.length > 0) && (
                        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6'>
                            {/* Documentos principales (Bases, Anexos) */}
                            {documentosBase.map((doc) => (
                                <div
                                    key={doc.tipo}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${getStatusColor(doc.url)}`}>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <span className='text-2xl'>{getDocumentIcon(doc.categoria)}</span>
                                            <div>
                                                <h4 className='font-medium text-sm'>{doc.titulo}</h4>
                                                <p className='text-xs opacity-75'>Documento PDF</p>
                                            </div>
                                        </div>
                                        {doc.url ? (
                                            <a
                                                href={doc.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                                                <ExternalLink className='w-4 h-4' />
                                            </a>
                                        ) : (
                                            <div className='p-2 bg-gray-200 rounded-lg'>
                                                <AlertCircle className='w-4 h-4 text-gray-400' />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {/* Enlaces (Postulación) */}
                            {enlaces.map((doc) => (
                                <div
                                    key={doc.tipo}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${getStatusColor(doc.url)}`}>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <span className='text-2xl'>{getDocumentIcon(doc.categoria)}</span>
                                            <div>
                                                <h4 className='font-medium text-sm'>{doc.titulo}</h4>
                                                <p className='text-xs opacity-75'>Enlace externo</p>
                                            </div>
                                        </div>
                                        {doc.url ? (
                                            <a
                                                href={doc.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                                                <ExternalLink className='w-4 h-4' />
                                            </a>
                                        ) : (
                                            <div className='p-2 bg-gray-200 rounded-lg'>
                                                <AlertCircle className='w-4 h-4 text-gray-400' />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Comunicados */}
                    {comunicadosData.length > 0 && (
                        <div className='mb-6'>
                            <h4 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                                📢 Comunicados
                            </h4>
                            <div className='grid gap-2 sm:grid-cols-2'>
                                {comunicadosData.map((comunicado) => (
                                    <a
                                        key={comunicado.tipo}
                                        href={comunicado.url || '#'}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors'>
                                        <span>⚠️</span>
                                        <span className='text-sm font-medium text-yellow-800'>
                                            {comunicado.titulo}
                                        </span>
                                        <ExternalLink className='w-4 h-4 text-yellow-600 ml-auto' />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Proceso de evaluación */}
                    {evaluaciones.length > 0 && (
                        <div>
                            <h4 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                                🎯 Proceso de Evaluación
                            </h4>
                            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                                {evaluaciones.map((doc) => (
                                    <div
                                        key={doc.tipo}
                                        className={`p-3 rounded-lg border transition-all duration-200 ${
                                            doc.url 
                                                ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm' 
                                                : 'bg-gray-50 border-gray-100'
                                        }`}>
                                        <div className='flex items-center justify-between mb-2'>
                                            <span className='text-lg'>{getDocumentIcon(doc.categoria)}</span>
                                            {doc.url ? (
                                                <a
                                                    href={doc.url}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='p-2 text-white hover:bg-blue-600 bg-blue-800 rounded-full transition-colors'>
                                                    <ExternalLink className='w-3 h-3' />
                                                </a>
                                            ) : (
                                                <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                                            )}
                                        </div>
                                        <h5 className='text-xs font-medium text-gray-700 leading-tight'>
                                            {doc.titulo}
                                        </h5>
                                        <p className='text-xs text-gray-500 mt-1'>
                                            {doc.url ? 'Disponible' : 'Pendiente'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};