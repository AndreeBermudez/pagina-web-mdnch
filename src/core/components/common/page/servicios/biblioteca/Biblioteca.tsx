export default function Biblioteca() {
    return (

        <div className='flex min-h-screen flex-col py-20'>
            {/* Hero Section */}
            <section className='relative h-[60vh] w-full'>
                <img src='/catedral.jpg' alt='imagen ejemplo' className='object-cover w-full h-full' />
                <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50'>
                    <h1 className='mb-4 text-4xl font-bold sm:text-5xl md:text-6xl'>Biblioteca Municipal</h1>
                    <p className='mb-4 max-w-2xl px-4 text-lg sm:text-xl'>
                        Conoce nuestra hermosa y moderna biblioteca municipal.
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        <a href='https://maps.app.goo.gl/yQ25B6U5oE7y5kes5'>
                            <button className='cursor-pointer px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-md text-white text-lg'>
                                ¿Cómo llegar?
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Information Sections */}
            <section className='py-12 px-4 bg-gray-50'>
                <div className='container mx-auto max-w-6xl'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Sobre Nosotros */}
                        <div className='bg-white rounded-lg shadow-md p-8'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Sobre Nosotros</h2>
                            <div className='space-y-4 text-gray-700'>
                                <p>
                                    La <span className='text-blue-600 font-medium'>Biblioteca Municipal de Nuevo Chimbote</span> es un espacio dedicado a la promoción de la lectura y el acceso a la información. Contamos con una amplia colección de libros, revistas y recursos digitales para toda la comunidad.
                                </p>
                                <p>
                                    Nuestro objetivo es ser un centro cultural que fomente el aprendizaje, la investigación y el desarrollo intelectual de todos nuestros usuarios.
                                </p>
                            </div>
                        </div>

                        {/* Horarios de Atención */}
                        <div className='bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600'>
                            <div className='flex items-center gap-2 mb-6'>
                                <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                <h2 className='text-2xl font-bold text-gray-800'>Horarios de Atención</h2>
                            </div>
                            <div className='space-y-3'>
                                <div className='flex justify-between items-center py-2 border-b border-gray-200'>
                                    <span className='font-medium text-gray-700'>Lunes a Viernes</span>
                                    <span className='text-blue-600 font-semibold'>8:00 AM - 6:00 PM</span>
                                </div>
                                <div className='flex justify-between items-center py-2 border-b border-gray-200'>
                                    <span className='font-medium text-gray-700'>Sábado</span>
                                    <span className='text-blue-600 font-semibold'>9:00 AM - 4:00 PM</span>
                                </div>
                                <div className='flex justify-between items-center py-2'>
                                    <span className='font-medium text-gray-700'>Domingo</span>
                                    <span className='text-red-600 font-semibold'>Cerrado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Información de Contacto y Mapa */}
            <section className='py-7 '>
                <div className='container mx-auto max-w-6xl'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Información de Contacto</h2>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Contact Details */}
                        <div className='bg-white rounded-lg shadow-md p-8'>
                            <div className='space-y-6'>
                                {/* Dirección */}
                                <div className='flex items-start gap-4'>
                                    <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-gray-800 mb-1'>Dirección</h3>
                                        <p className='text-gray-600'>Jirón Miguel Grau 350</p>
                                        <p className='text-gray-600'>Nuevo Chimbote, Perú</p>
                                    </div>
                                </div>

                                {/* Teléfono */}
                                <div className='flex items-start gap-4'>
                                    <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-gray-800 mb-1'>Teléfono</h3>
                                        <a href='tel:+51943328900' className='text-blue-600 hover:text-blue-700 hover:underline'>
                                            (51) 43 328-900
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className='flex items-start gap-4'>
                                    <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-gray-800 mb-1'>Email</h3>
                                        <a href='mailto:biblioteca@nuevochimbote.gob.pe' className='text-blue-600 hover:text-blue-700 hover:underline'>
                                            biblioteca@nuevochimbote.gob.pe
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps */}
                        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                            <div className='relative h-full min-h-[400px]'>
                               
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15757.079021102983!2d-78.5284495!3d-9.13009035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ab858dd42885bd%3A0x98cf8b8bbfe636cd!2sCentro%20Cultural%20de%20Nuevo%20Chimbote!5e0!3m2!1ses-419!2spe!4v1761944188302!5m2!1ses-419!2spe" 
                                className='absolute inset-0 w-full h-full border-0'
                                allowFullScreen
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'>
                                     title='Ubicación Biblioteca Municipal de Nuevo Chimbote'
                                </iframe>
                                <a
                                    href='https://maps.app.goo.gl/yQ25B6U5oE7y5kes5'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow text-blue-600 font-medium text-sm flex items-center gap-2 z-10'>
                                    Ampliar el mapa
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}