import { Shield, ChevronRight, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import FaultyTerminal from "./FaultyTerminal";

import "./FaultyTerminal.css";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-military-950 text-military-50 font-mono relative overflow-hidden">
      {/* Faulty Terminal Background */}
      <div className="absolute inset-0 z-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#003311" // Deep, low-brightness green
          brightness={0.6} // Reduced overall intensity
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation
        />
      </div>

      {/* Top Bar - Fully Transparent with subtle blur */}
      <div className="w-full bg-transparent border-b border-military-800/40 p-4 z-10 flex justify-between items-center relative backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-military-800/30 p-2 rounded-sm border border-military-500/30 backdrop-blur-sm">
            <Shield size={24} className="text-military-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-stencil tracking-widest text-military-100/90 leading-none">
              MILITARY HQ
            </h1>
            <p className="text-[10px] text-military-500 font-mono tracking-widest uppercase mt-1">
              Strategic Command Interface V4
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative pointer-events-none">
        <div className="max-w-3xl w-full flex flex-col items-center justify-center text-center space-y-10 relative pointer-events-auto">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-stencil text-military-100/80 drop-shadow-[0_0_15px_rgba(132,152,73,0.1)] tracking-tight">
              ACCESS REQUIRED
            </h2>
            <p className="max-w-xl mx-auto text-military-400 font-mono text-sm md:text-base border border-military-800/50 bg-military-950/40 p-4 leading-relaxed backdrop-blur-lg shadow-xl">
              YOU ARE ATTEMPTING TO ACCESS A CLASSIFIED NETWORK. UNAUTHORIZED
              ACCESS IS STRICTLY PROHIBITED.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
            <Link to="/login" className="group relative w-64">
              <div className="absolute inset-0 bg-military-500 blur-md opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <button className="relative w-full py-4 bg-military-800/80 hover:bg-military-700/90 text-military-50 font-bold border-2 border-military-400/40 transition-all font-stencil tracking-widest uppercase flex items-center justify-center gap-2 group-hover:scale-105">
                <KeyRound size={20} className="text-military-300" />
                ENTER SYSTEM
              </button>
            </Link>

            <div className="text-military-600 font-mono text-sm hidden sm:block">
              OR
            </div>

            {/* ENLIST NOW - UPDATED: Translucent & Blurred */}
            <Link to="/register" className="group relative w-64">
              <button className="relative w-full py-4 bg-military-900/20 hover:bg-military-800/40 text-military-300 font-bold border-2 border-military-700/40 transition-all font-stencil tracking-widest uppercase flex items-center justify-center gap-2 group-hover:border-military-500/60 group-hover:text-military-100 group-hover:scale-105 backdrop-blur-md">
                ENLIST NOW
                <ChevronRight
                  size={20}
                  className="text-military-500 group-hover:text-military-300 transition-colors"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer - Transparent */}
      <div className="w-full bg-transparent border-t border-military-800/40 p-4 z-10 text-center flex flex-col sm:flex-row justify-between items-center gap-2 relative backdrop-blur-md">
        <p className="text-[10px] text-military-600 font-mono uppercase tracking-widest">
          SYSTEM SECURED BY DEPLOYED ENCRYPTION • CLASS V
        </p>
        <div className="flex gap-4 opacity-50">
          <div className="w-2 h-2 rounded-full bg-green-900 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-military-800"></div>
          <div className="w-2 h-2 rounded-full bg-military-900"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
