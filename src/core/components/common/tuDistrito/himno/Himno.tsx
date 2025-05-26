import React from 'react';
import { hymnData } from './hymnData';
import { HymnSection } from './HymnSection';

const Himno: React.FC = () => {
    return (
        <div className="min-h-screen mb-20">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-4xl font-bold text-center mb-6">
                    {hymnData.title}
                </h1>
                <audio 
                    controls 
                    src={hymnData.audioSrc} 
                    className="w-full mb-8"
                />
                {hymnData.sections.map((section, index) => (
                    <HymnSection 
                        key={index}
                        title={section.title}
                        lines={section.lines}
                    />
                ))}
            </div>
        </div>
    );
};

export default Himno;
