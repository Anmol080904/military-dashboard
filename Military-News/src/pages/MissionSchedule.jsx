import React, { useState, useEffect } from 'react';
import { Map, Clock, Target, Loader } from 'lucide-react';
import axios from 'axios';

const MissionSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await axios.get('https://military-dashboard-backend.onrender.com/missions');
                setSchedules(response.data);
            } catch (error) {
                console.error("Failed to fetch missions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMissions();
    }, []);

    return (
        <div className="flex flex-col h-full text-military-300 gap-6">
            <div className="flex justify-between items-end border-b-2 border-military-600 pb-2">
                <h1 className="text-4xl font-stencil uppercase">Mission Schedule</h1>
                <div className="flex items-center gap-2 text-military-400 font-mono text-sm">
                    <Map size={18} />
                    <span>STRATEGIC OVERVIEW</span>
                </div>
            </div>

            {loading ? (
                <div className="flex-1 flex justify-center items-center">
                    <Loader className="animate-spin text-military-400" size={48} />
                </div>
            ) : (
                <div className="space-y-4">
                    {schedules.map((mission, index) => (
                        <div key={mission.id || index} className="card-military flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                            <div className="flex flex-col gap-1 w-full md:w-auto">
                                <div className="flex items-center gap-2 mb-1">
                                    <Target size={18} className="text-red-500" />
                                    <h3 className="text-lg font-bold text-military-100 font-stencil tracking-wider">{mission.name}</h3>
                                </div>
                                <p className="text-xs text-military-400 font-mono">OP IDENTIFIER: <span className="text-yellow-400">{mission.mission_id || mission.id}</span></p>
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
            )}
        </div>
    );
};

export default MissionSchedule;
