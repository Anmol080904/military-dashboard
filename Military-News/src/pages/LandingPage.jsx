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
          tint="#00FF41"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={1}
        />
      </div>

      {/* Top Bar */}
      <div className="w-full bg-military-900 border-b border-military-700 p-4 z-10 flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <div className="bg-military-800 p-2 rounded-sm border border-military-500">
            <Shield size={24} className="text-military-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-stencil tracking-widest text-military-100 leading-none">
              MILITARY HQ
            </h1>
            <p className="text-[10px] text-military-400 font-mono tracking-widest uppercase mt-1">
              Strategic Command Interface V4
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {/* Added pointer-events-none here so mouse movements pass through the empty space */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-military-800 rounded-full opacity-20 animate-spin-slow pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-military-700 border-dashed rounded-full opacity-30 animate-spin-slow-reverse pointer-events-none"></div>

        {/* Added pointer-events-auto here so the text and buttons remain clickable and selectable */}
        <div className="max-w-3xl w-full flex flex-col items-center justify-center text-center space-y-10 relative pointer-events-auto">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-stencil text-military-100 drop-shadow-[0_0_15px_rgba(132,152,73,0.3)] tracking-tight">
              ACCESS REQUIRED
            </h2>
            <p className="max-w-xl mx-auto text-military-300 font-mono text-sm md:text-base border border-military-700 bg-military-900/50 p-4 leading-relaxed backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              YOU ARE ATTEMPTING TO ACCESS A CLASSIFIED NETWORK. UNAUTHORIZED
              ACCESS IS STRICTLY PROHIBITED AND MONITORED. ENTER CREDENTIALS OR
              REGISTER YOUR UNIT TO PROCEED.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
            <Link to="/login" className="group relative w-64">
              <div className="absolute inset-0 bg-military-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
              <button className="relative w-full py-4 bg-military-700 hover:bg-military-600 text-military-50 font-bold border-2 border-military-400 transition-all font-stencil tracking-widest uppercase flex items-center justify-center gap-2 group-hover:scale-105">
                <KeyRound size={20} className="text-military-200" />
                ENTER SYSTEM
              </button>
            </Link>

            <div className="text-military-500 font-mono text-sm hidden sm:block">
              OR
            </div>

            <Link to="/register" className="group relative w-64">
              <button className="relative w-full py-4 bg-transparent hover:bg-military-800 text-military-200 font-bold border-2 border-military-600 transition-all font-stencil tracking-widest uppercase flex items-center justify-center gap-2 group-hover:border-military-400 group-hover:text-military-50 group-hover:scale-105">
                ENLIST NOW
                <ChevronRight
                  size={20}
                  className="text-military-400 group-hover:text-military-200 transition-colors"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-military-950 border-t border-military-800 p-4 z-10 text-center flex flex-col sm:flex-row justify-between items-center gap-2 relative">
        <p className="text-[10px] text-military-500 font-mono uppercase tracking-widest">
          SYSTEM SECURED BY DEPLOYED ENCRYPTION • CLASS V
        </p>
        <div className="flex gap-4">
          <div
            className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
            title="System Status: Nominal"
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-military-400"
            title="Uplink Secure"
          ></div>
          <div className="w-2 h-2 rounded-full bg-military-600"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
