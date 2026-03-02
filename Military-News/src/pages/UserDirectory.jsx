import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Shield, Mail, Medal } from 'lucide-react';

const UserDirectory = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    return (
        <div className="flex flex-col h-full text-military-300 gap-6">
            <h1 className="text-4xl font-stencil uppercase text-center text-military-100">Personnel Directory</h1>

            {loading ? (
                <div className="flex flex-1 items-center justify-center p-10 border-2 border-dashed border-military-600 rounded-sm bg-military-box">
                    <p className="font-mono uppercase tracking-widest text-blue-400 animate-pulse">
                        DECRYPTING AGENT PROFILES...
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="card-military flex flex-col group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-military-700/50 flex items-center justify-center border border-military-500 text-military-100 group-hover:bg-military-500 transition-colors">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-military-100 font-stencil tracking-wider group-hover:text-yellow-400">{user.name}</h3>
                                    <div className="flex items-center gap-1 text-xs text-military-400 font-mono">
                                        <Medal size={12} /> <span className="uppercase">{user.role}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-military-600 border-dashed pt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail size={14} className="text-military-500" />
                                    <span className="font-mono text-military-300 group-hover:text-military-100 transition-colors">{user.email}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDirectory;
