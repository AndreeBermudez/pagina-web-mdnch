import { ExternalLink, FileText, AlertCircle } from 'lucide-react';
import type { ConvocatoriaData } from './data-convocatoria';

interface ExpandedRowConvocatoriaProps {
    convocatoria: ConvocatoriaData;
}

export const ExpandedRowConvocatoria = ({ convocatoria }: ExpandedRowConvocatoriaProps) => {
    const {
        bases,
        anexos,
        postulacion,
        comunicados,
        evaluacionCurricular,
        absolucionReclamos,
        evaluacionEntrevista,
        resultadosFinales
    } = convocatoria;

    const documentos = [
        { label: 'Bases', link: bases, tipo: 'documento' },
        { label: 'Anexos', link: anexos, tipo: 'documento' },
        { label: 'Postulación', link: postulacion, tipo: 'formulario' },
        { label: 'Evaluación Curricular', link: evaluacionCurricular, tipo: 'resultado' },
        { label: 'Absolución de Reclamos', link: absolucionReclamos, tipo: 'resultado' },
        { label: 'Evaluación de Entrevista', link: evaluacionEntrevista, tipo: 'resultado' },
        { label: 'Resultados Finales', link: resultadosFinales, tipo: 'resultado' }
    ];

    const getDocumentIcon = (tipo: string) => {
        switch (tipo) {
            case 'formulario':
                return '📝';
            case 'resultado':
                return '📊';
            default:
                return '📄';
        }
    };

    const getStatusColor = (link: string | null) => {
        if (!link) return 'bg-gray-100 text-gray-500 border-gray-200';
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

                    {/* Grid de documentos principales */}
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6'>
                        {documentos.slice(0, 3).map((doc, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 ${getStatusColor(doc.link)}`}>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <span className='text-2xl'>{getDocumentIcon(doc.tipo)}</span>
                                        <div>
                                            <h4 className='font-medium text-sm'>{doc.label}</h4>
                                            <p className='text-xs opacity-75'>
                                                {doc.tipo === 'formulario' ? 'Enlace externo' : 'Documento PDF'}
                                            </p>
                                        </div>
                                    </div>
                                    {doc.link ? (
                                        <a
                                            href={doc.link}
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

                    {/* Comunicados */}
                    {comunicados.length > 0 && (
                        <div className='mb-6'>
                            <h4 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                                📢 Comunicados
                            </h4>
                            <div className='grid gap-2 sm:grid-cols-2'>
                                {comunicados.map((comunicado, index) => (
                                    <a
                                        key={index}
                                        href={comunicado}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors'>
                                        <span>⚠️</span>
                                        <span className='text-sm font-medium text-yellow-800'>
                                            Comunicado {index + 1}
                                        </span>
                                        <ExternalLink className='w-4 h-4 text-yellow-600 ml-auto' />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Proceso de evaluación */}
                    <div>
                        <h4 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                            🎯 Proceso de Evaluación
                        </h4>
                        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                            {documentos.slice(3).map((doc, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg border transition-all duration-200 ${
                                        doc.link 
                                            ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm' 
                                            : 'bg-gray-50 border-gray-100'
                                    }`}>
                                    <div className='flex items-center justify-between mb-2'>
                                        <span className='text-lg'>{getDocumentIcon(doc.tipo)}</span>
                                        {doc.link ? (
                                            <a
                                                href={doc.link}
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
                                        {doc.label}
                                    </h5>
                                    <p className='text-xs text-gray-500 mt-1'>
                                        {doc.link ? 'Disponible' : 'Pendiente'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};