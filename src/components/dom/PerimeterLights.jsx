import React from 'react';

const PerimeterLights = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden mix-blend-screen">
            {/* Left AI Perimeter Core */}
            <div className="absolute left-0 top-0 w-2 md:w-4 h-full">
                {/* Physical Glass Tube */}
                <div className="absolute inset-x-0 h-full bg-gradient-to-r from-white/10 to-transparent border-r border-cyan-500/30" />
                {/* Plasma Energy that moves up and down */}
                <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_50px_10px_rgba(34,211,238,0.8)] opacity-70 animate-[scanVertical_8s_ease-in-out_infinite_alternate]" />
                {/* Ambient Core Glow */}
                <div className="absolute inset-0 bg-cyan-500/10 blur-xl" />
            </div>

            {/* Right AI Perimeter Core */}
            <div className="absolute right-0 top-0 w-2 md:w-4 h-full">
                {/* Physical Glass Tube */}
                <div className="absolute inset-x-0 h-full bg-gradient-to-l from-white/10 to-transparent border-l border-purple-500/30" />
                {/* Plasma Energy that moves down and up (counter to the left side) */}
                <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent via-purple-400 to-transparent shadow-[0_0_50px_10px_rgba(168,85,247,0.8)] opacity-70 animate-[scanVertical_7s_ease-in-out_infinite_alternate_reverse]" />
                {/* Ambient Core Glow */}
                <div className="absolute inset-0 bg-purple-500/10 blur-xl" />
            </div>

            {/* Technical Bracket Accents (Top/Bottom corners) */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-purple-500/40" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-purple-500/40" />
        </div>
    );
};

export default PerimeterLights;
