import React from 'react';
import PlanDesarrolloUrbano from '../../core/components/common/tuDistrito/pdu/PlanDesarrolloUrbano';
import { Layout } from '../../core/layout/Layout';
export default function PDUPage() {
  return (
     <Layout>
     <div className='container mx-auto px-15'>
                <div className='text-center mt-20 mb-10'>
                    <h1 className='text-4xl font-bold text-gray-800'>PLAN DE DESARROLLO URBANO</h1>
                    <div className='w-24 h-1 bg-blue-500 mx-auto mt-4'></div>
                </div>
            </div>
            <div className='bg-gradient-to-br from-slate-100 to-slate-200 py-10'>
                <PlanDesarrolloUrbano />
            </div>
    </Layout>
  );
}
