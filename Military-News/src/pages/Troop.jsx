import React from 'react';
import { Shield, UserSearch } from 'lucide-react';

const Troop = () => {
    const roster = [
        { id: "PARA-01", name: "Vikram Singh", rank: "MAJOR", status: "ACTIVE DEPLOYMENT", specialty: "PARA SF" },
        { id: "GHATAK-02", name: "A. Sharma", rank: "CAPTAIN", status: "ON BASE", specialty: "GHATAK FORCE" },
        { id: "MARCOS-03", name: "K. Reddy", rank: "LIEUTENANT", status: "MIA", specialty: "MARINE COMMANDO" },
        { id: "GARUD-04", name: "R. Nair", rank: "SERGEANT", status: "ACTIVE DEPLOYMENT", specialty: "GARUD COMMANDO" },
    ];

    return (
        <div className="flex flex-col h-full text-military-300 gap-6">
            <div className="flex justify-between items-end border-b-2 border-military-600 pb-2">
                <h1 className="text-4xl font-stencil uppercase">Troop Roster</h1>
                <div className="flex items-center gap-2 text-military-400 font-mono text-sm">
                    <UserSearch size={18} />
                    <span>CLASSIFICATION: LEVEL 5</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roster.map(operative => (
                    <div key={operative.id} className="card-military flex flex-col group transition-transform hover:-translate-y-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-military-700/50 flex items-center justify-center border border-military-500 text-military-100 group-hover:bg-military-500 transition-colors">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-military-100 font-stencil tracking-wider group-hover:text-yellow-400">{operative.name}</h3>
                                <p className="text-xs text-military-400 font-mono">ID: {operative.id}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm border-t border-military-600 border-dashed pt-4">
                            <div>
                                <p className="text-xs font-mono text-military-500">RANK</p>
                                <p className="font-bold text-military-100 uppercase">{operative.rank}</p>
                            </div>
                            <div>
                                <p className="text-xs font-mono text-military-500">SPECIALTY</p>
                                <p className="font-bold text-military-100 uppercase">{operative.specialty}</p>
                            </div>
                            <div className="col-span-2 mt-2">
                                <p className="text-xs font-mono text-military-500">STATUS</p>
                                <p className={`font-bold uppercase font-mono tracking-widest ${operative.status === 'MIA' ? 'text-red-500 animate-pulse' :
                                    operative.status === 'ON BASE' ? 'text-military-300' : 'text-yellow-500'
                                    }`}>
                                    {operative.status}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Troop;
