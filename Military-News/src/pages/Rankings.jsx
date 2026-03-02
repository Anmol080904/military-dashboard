import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award } from 'lucide-react';

const Rankings = () => {
    const [commendations, setCommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommendations = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                
                setCommendations(response.data.slice(0, 18));
            } catch (error) {
                console.error("Error fetching commendations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommendations();
    }, []);

    return (
        <div className="flex flex-col h-full text-military-300 gap-6">
            <h1 className="text-4xl font-stencil uppercase text-center">Commendations List</h1>
            {loading ? (
                <div className="flex flex-1 items-center justify-center">
                    <p className="font-mono uppercase tracking-widest text-yellow-500 animate-pulse">
                        DECRYPTING COMMENDATION DATA...
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {commendations.map((user) => (
                        <div key={user.id} className="card-military flex flex-col justify-between group">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-military-100 group-hover:text-yellow-400 transition-colors">
                                        OP: {user.name}
                                    </h3>
                                    <p className="text-xs text-military-400 font-mono">CALLSIGN: {user.username}</p>
                                </div>
                                <Award className="text-yellow-500" size={28} />
                            </div>
                            <div className="text-sm border-t border-military-600 border-dashed pt-4 mt-2">
                                <p><span className="text-military-400">EMAIL:</span> {user.email}</p>
                                <p><span className="text-military-400">BASE:</span> {user.address.city}</p>
                                <div className="mt-3 flex gap-2">
                                    <span className="badge-classified">HONORED PRIORITY</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Rankings;
