import React from 'react';
import { Shield, Github, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-military-950 border-t border-military-800 text-military-400 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="flex flex-col items-center md:items-start gap-1">
                        <div className="flex items-center gap-2">
                            <Shield size={16} className="text-military-500" />
                            <span className="text-lg font-bold tracking-widest text-military-300 font-stencil uppercase">
                                MILITARY<span className="text-military-500">NEWS</span>
                            </span>
                        </div>
                        <p className="text-xs font-mono tracking-tighter opacity-70">
                            CLASSIFIED INFORMATION - EYES ONLY
                        </p>
                        <p className="text-xs font-mono opacity-50">
                            EST. {currentYear} • AUTHORIZED ACCESS REQUIRED
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-military-600">
                            SECURE CONNECTION ESTABLISHED <Heart size={10} className="text-red-900 fill-red-900 animate-pulse" />
                        </div>
                    </div>

                    <div className="flex gap-6 text-xs font-mono uppercase text-military-500">
                        <a href="#" className="hover:text-military-200 transition-colors">Protocol 7A</a>
                        <a href="#" className="hover:text-military-200 transition-colors">S.O.P.</a>
                        <a href="#" className="hover:text-military-200 transition-colors">Command</a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
