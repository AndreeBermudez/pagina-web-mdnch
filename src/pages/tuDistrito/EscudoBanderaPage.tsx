
import PresentacionDistrito from '../../core/components/common/tuDistrito/escudoBandera/PresentacionDistrito';
import { Layout } from '../../core/layout/Layout';

export default function EscudoBanderaPage() {
    return (
        <Layout>
          <main className='bg-gradient-to-br from-slate-100 to-slate-200 min-h-[calc(100vh-4rem)]'>
                       	<div className='container mx-auto px-4 md:px-15 pt-10 md:pt-24 pb-25'>
                            <div className='text-center mb-10'>
                                <h1 className='text-4xl font-bold text-gray-800'>ESCUDO Y BANDERA</h1>
                                <div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
                            </div>
                            <PresentacionDistrito />
                        </div>
                    </main>
        </Layout>
    );
}
