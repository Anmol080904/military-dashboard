import React from 'react';
import { Map, Clock, Target } from 'lucide-react';

const MissionSchedule = () => {
    const schedules = [
        { id: "OP-MEGHDOOT", name: "Operation Meghdoot Sec", date: "2026-03-01 0400H", status: "PENDING", target: "Siachen Sector" },
        { id: "OP-VIJAY", name: "High Altitude Recon", date: "2026-03-03 2345H", status: "PLANNING", target: "Kargil Heights" },
        { id: "OP-SURYA", name: "Border Domination", date: "2026-03-08 1400H", status: "AWAITING CLEARANCE", target: "LoC Alpha" },
    ];

    return (
        <div className="flex flex-col h-full text-military-300 gap-6">
            <div className="flex justify-between items-end border-b-2 border-military-600 pb-2">
                <h1 className="text-4xl font-stencil uppercase">Mission Schedule</h1>
                <div className="flex items-center gap-2 text-military-400 font-mono text-sm">
                    <Map size={18} />
                    <span>STRATEGIC OVERVIEW</span>
                </div>
            </div>

            <div className="space-y-4">
                {schedules.map((mission) => (
                    <div key={mission.id} className="card-military flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="flex flex-col gap-1 w-full md:w-auto">
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={18} className="text-red-500" />
                                <h3 className="text-lg font-bold text-military-100 font-stencil tracking-wider">{mission.name}</h3>
                            </div>
                            <p className="text-xs text-military-400 font-mono">OP IDENTIFIER: <span className="text-yellow-400">{mission.id}</span></p>
                            <p className="text-xs text-military-400 font-mono flex items-center gap-1 mt-1">
                                <Clock size={12} />
                                DEPLOYMENT: {mission.date}
                            </p>
                        </div>

                        <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-military-600 border-dashed pt-3 md:pt-0 md:pl-4 flex flex-col gap-2">
                            <div>
                                <p className="text-xs font-mono text-military-500">TARGET VECTOR</p>
                                <p className="font-bold text-military-100 uppercase">{mission.target}</p>
                            </div>
                            <div>
                                <p className="text-xs font-mono text-military-500">STATUS</p>
                                <p className="font-bold text-military-300 uppercase tracking-widest bg-military-800 px-2 py-1 inline-block border border-military-600">
                                    {mission.status}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MissionSchedule;
