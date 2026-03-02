import React from 'react';

const CurrentStatus = () => {
    return (
        <div className="space-y-6">
            <header className="border-b-2 border-military-600 pb-4 mb-6 relative">
                <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-military-500 to-transparent"></div>
                <h1 className="text-3xl font-bold text-military-100 font-stencil tracking-widest uppercase">
                    Strategic Command
                    <span className="block text-sm text-military-400 font-mono mt-2 normal-case tracking-normal">
                        Global Threat Level Assessment
                    </span>
                </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-military-800 border-2 border-military-600 rounded-sm overflow-hidden flex flex-col items-center justify-center p-8 h-64 shadow-lg relative">
                    <div className="absolute top-2 right-2 flex gap-1">
                        <span className="w-1.5 h-1.5 bg-military-500 rounded-full animate-ping"></span>
                        <span className="w-1.5 h-1.5 bg-military-500 rounded-full"></span>
                    </div>

                    <h2 className="text-military-400 font-mono text-sm uppercase tracking-widest mb-4">Current Readiness State</h2>

                    <div className="text-6xl font-stencil text-red-500 font-bold tracking-widest mb-2 animate-pulse">
                        DEFCON 3
                    </div>

                    <p className="text-military-300 font-mono text-xs text-center mt-4 uppercase max-w-xs border-t border-military-700 pt-4">
                        Increase in force readiness above normal readiness. Air Force ready to mobilize in 15 mins.
                    </p>
                </div>

                <div className="bg-military-800 border-2 border-military-600 rounded-sm p-6 shadow-lg h-64 overflow-y-auto custom-scrollbar">
                    <h2 className="text-military-100 font-stencil text-xl uppercase tracking-wider mb-4 border-b border-military-700 pb-2">Active Directives</h2>

                    <ul className="space-y-3 font-mono text-sm">
                        <li className="flex items-start gap-3 text-military-300">
                            <span className="text-red-500 mt-1">[{'>'}]</span>
                            <span>Immediate deployment of 3rd Infantry to Sector 7G.</span>
                        </li>
                        <li className="flex items-start gap-3 text-military-300">
                            <span className="text-yellow-500 mt-1">[{'>'}]</span>
                            <span>Maintain radio silence on channels 4-9 until further notice.</span>
                        </li>
                        <li className="flex items-start gap-3 text-military-300">
                            <span className="text-military-500 mt-1">[{'>'}]</span>
                            <span>Routine supply run Scheduled for O-Eighty-Hundred hours.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-military-800 border-2 border-military-600 rounded-sm p-6 shadow-lg mt-6">
                <h2 className="text-military-100 font-stencil text-xl uppercase tracking-wider mb-4 border-b border-military-700 pb-2">Intelligence Briefing</h2>
                <p className="font-mono text-sm text-military-300 leading-relaxed">
                    Global satellite surveillance indicates increased movement in contested regions.
                    All personnel are advised to review updated engagement protocols. Reconnaissance
                    drones returning with visual data; awaiting decryption by cipher division.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-military-700 pt-4">
                    <span className="text-xs font-mono text-military-500">LAST UPDATED: 0800 HOURS PST</span>
                    <button className="bg-military-700 hover:bg-military-600 text-military-100 font-mono text-xs px-4 py-2 uppercase tracking-widest border border-military-500 transition-colors">
                        Acknowledge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CurrentStatus;
