import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const bootSequence = [
    "[SYS] INITIALIZING CORE OVERLOAD SECURE PROTOCOL v9.0.4",
    "[SYS] MEMORY ALLOCATION: 4096TB RESERVED",
    "[SYS] BYPASSING MAINFRAME ENCRYPTION... SUCCESS",
    "[AI]  LOADING NEURAL NETWORK GEOMETRY...",
    "[AI]  SYNCING WITH USER CORTEX DIRECTORY",
    "--------------------------------------------------",
    "USER_DATA_STREAM: HARDIK_SHARMA_MASTER_FILE",
    "ROLE: DIGITAL MARKETING & GRAPHIC/VIDEO EXPERT",
    "STATUS: ONLINE AND READY TO DEPLOY CASCADING ASSETS",
    "--------------------------------------------------",
    "[SYS] TERMINAL ROOT ACCESS GRANTED",
    "root@portfolio:~# executing high-performance rendering pipeline...",
    "root@portfolio:~# "
];

const TerminalModule = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [lines, setLines] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!isInView) return;

        let currentLine = 0;
        setIsTyping(true);

        const typeLine = () => {
            if (currentLine < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[currentLine]]);
                currentLine++;
                // Randomize typing speed for realism (faster for some lines, slower for others)
                const delay = Math.random() * 300 + 100;
                setTimeout(typeLine, delay);
            } else {
                setIsTyping(false);
            }
        };

        // Start the typing sequence after a short delay
        setTimeout(typeLine, 500);
    }, [isInView]);

    return (
        <section ref={containerRef} className="w-full min-h-[80vh] flex items-center justify-center px-6 md:px-24 scroll-mt-32">
            <div className="w-full max-w-5xl rounded-lg border border-cyan-500/30 bg-black/80 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)]">

                {/* Terminal Header Bar */}
                <div className="w-full h-8 bg-gradient-to-r from-cyan-900/50 to-transparent border-b border-cyan-500/30 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] tracking-widest text-cyan-400/70 font-mono ml-4">
                        ROOT@HARDIK-PORTFOLIO-MAINFRAME:~
                    </span>
                </div>

                {/* Terminal Window Content */}
                <div className="p-6 md:p-10 font-mono text-xs md:text-sm lg:text-base leading-relaxed text-cyan-300 min-h-[400px]">
                    {lines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`mb-2 ${line.startsWith('[SYS]') ? 'text-purple-400' : line.startsWith('[AI]') ? 'text-green-400' : 'text-cyan-300'}`}
                        >
                            {line}
                        </motion.div>
                    ))}

                    {/* Blinking Cursor */}
                    {isTyping && (
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2.5 h-4 md:h-5 bg-cyan-400 ml-1 translate-y-1"
                        />
                    )}
                    {!isTyping && lines.length === bootSequence.length && (
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2.5 h-4 md:h-5 bg-cyan-400 ml-1 translate-y-1"
                        />
                    )}
                </div>

                {/* Cyberpunk Scanline overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_100%)] bg-[length:100%_4px] opacity-20" />
            </div>
        </section>
    );
};

export default TerminalModule;
