import React, { useState } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import Terminal from 'react-console-emulator';

const Logs = () => {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    const logs = [
        { id: "LOG-992", timestamp: "02-10-2026 04:30:00", author: "COMMANDER Vikram", body: "Recon squad Alpha reported multiple undocumented hostile contacts near Sector 4. Withdrawing for artillery bombardment." },
        { id: "LOG-991", timestamp: "02-09-2026 18:15:00", author: "LIEUTENANT Mohan", body: "Supply drop intercepted. Rations depleted. Requesting immediate extraction at coordinates 34.22, -118.42." },
        { id: "LOG-990", timestamp: "02-08-2026 09:00:00", author: "GENERAL Ajit", body: "Operation Iron Shield was a success. Enemy stronghold secured. No casualties reported. Medals pending." },
    ];

    return (
        <div className="flex flex-col h-full text-military-300 gap-6">
            <div className="flex justify-between items-end border-b-2 border-military-600 pb-2">
                <h1 className="text-4xl font-stencil uppercase">Mission Logs</h1>
                <div
                    className="flex items-center gap-2 text-military-400 font-mono text-sm cursor-pointer hover:text-military-200 transition-colors"
                    onClick={() => setIsTerminalOpen(true)}
                >
                    <TerminalIcon size={18} />
                    <span>SYSTEM TERMINAL</span>
                </div>
            </div>

            <div className="bg-military-layout border border-military-600 p-4 rounded-sm font-mono text-sm space-y-6 overflow-y-auto max-h-[70vh] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                {logs.map((log) => (
                    <div key={log.id} className="border-l-4 border-military-500 pl-4 relative group">
                        <div className="absolute w-2 h-2 bg-military-300 -left-[11px] top-1 group-hover:bg-yellow-400 transition-colors"></div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 text-military-400 text-xs">
                            <span className="bg-military-800 px-2 py-0.5 border border-military-700">{log.id}</span>
                            <span>{log.timestamp}</span>
                            <span className="text-military-100 font-bold tracking-widest">{log.author}</span>
                        </div>
                        <p className="text-military-50 leading-relaxed font-mono">
                            {`> ${log.body}`}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-military-700 text-xs font-mono text-military-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                TERMINAL CONNECTION SECURE. AWAITING INPUT...
            </div>

            {isTerminalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-black border border-military-400 w-full max-w-4xl h-[70vh] flex flex-col font-mono shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                        <div className="flex justify-between items-center bg-military-900 border-b border-military-500 p-2 text-military-300 text-sm">
                            <div className="flex items-center gap-2">
                                <TerminalIcon size={16} />
                                <span>SECURE SHELL - MILITARY OS v4.2.1</span>
                            </div>
                            <button
                                onClick={() => setIsTerminalOpen(false)}
                                className="hover:text-red-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 w-full h-full relative" style={{ display: 'flex' }}>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <Terminal
                                    // FIXED: Commands now use the { description, fn } structure
                                    commands={{
                                        connect: {
                                            description: 'Establish secure connection',
                                            fn: () => 'Connection to military mainframe established...'
                                        },
                                        ping: {
                                            description: 'Ping the remote server',
                                            fn: () => 'PONG'
                                        },
                                        status: {
                                            description: 'Check system status',
                                            fn: () => 'All systems nominal.'
                                        }
                                    }}
                                    welcomeMessage={'Welcome to Military OS v4.2.1. Type "help" for a list of commands.'}
                                    promptLabel={'OPERATIVE@HQ:~$'}
                                    autoFocus
                                    style={{ 
                                        height: '100%', 
                                        background: 'black',
                                        borderRadius: '0px'
                                    }}
                                    contentStyle={{ color: '#4ade80' }} // Tactical Green
                                    inputStyle={{ color: '#4ade80' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logs;