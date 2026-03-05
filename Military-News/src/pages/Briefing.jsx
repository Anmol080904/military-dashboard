import React from 'react';
import { Map, Flag } from 'lucide-react';

const Briefing = () => {
    return (
        <div className="flex flex-col h-full text-military-300 gap-6">
            <div className="flex justify-center mb-2">
                <Flag className="text-military-400" size={48} />
            </div>
            <h1 className="text-4xl font-stencil uppercase text-center text-military-100">Tactical Briefing</h1>

            <div className="bg-military-900 border border-military-600 p-6 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-military-900 via-military-500 to-military-900"></div>

                <h2 className="text-xl font-bold font-mono text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Map size={24} /> Operation Thunderbolt
                </h2>

                <p className="font-mono text-sm leading-relaxed mb-4">
                    COMMAND DIRECTIVE 09-Alfa. All units are hereby ordered to maintain heightened alert status. Wait for the signal from command center.
                </p>
                <div className="bg-military-950 p-4 border border-military-700">
                    <p className="font-mono text-xs text-red-500">OBJECTIVE: SECURE SECTOR 7</p>
                    <p className="font-mono text-xs text-military-400 mt-2">ESTIMATED LAUNCH: T-MINUS 12:00:00</p>
                </div>
            </div>
        </div>
    );
};

export default Briefing;
