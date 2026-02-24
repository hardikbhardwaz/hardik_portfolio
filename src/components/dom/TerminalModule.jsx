import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

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
    const terminalRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [lines, setLines] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    // Track scroll specifically within THIS terminal section
    const { scrollYProgress } = useScroll({
        target: terminalRef,
        offset: ["start 82%", "start 35%"]
    });

    // Map scroll progress to the height of the water layer (0% to 100% to cover fully)
    const waterHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        if (!isInView) return;

        let currentLine = 0;
        let timeoutId;
        let isActive = true;
        setIsTyping(true);

        const typeLine = () => {
            if (!isActive) return;
            if (currentLine < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[currentLine]]);
                currentLine++;
                // Randomize typing speed for realism
                const delay = Math.random() * 300 + 100;
                timeoutId = setTimeout(typeLine, delay);
            } else {
                setIsTyping(false);
            }
        };

        // Start the typing sequence after a short delay
        timeoutId = setTimeout(typeLine, 500);

        return () => {
            isActive = false;
            clearTimeout(timeoutId);
        };
    }, [isInView]);

    return (
        <section ref={containerRef} id="terminal-module" className="w-full min-h-[80vh] flex items-center justify-center px-6 md:px-24 scroll-mt-32">
            <div id="terminal-box" ref={terminalRef} className="relative w-full max-w-5xl rounded-lg border border-cyan-500/30 bg-black/80 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)]">

                {/* --- DOM Water Fill Submersion Effect --- */}
                <motion.div
                    style={{ height: waterHeight }}
                    className="absolute bottom-0 left-0 w-full z-20 pointer-events-none flex flex-col justify-end"
                >
                    {/* Stylized Demon Slayer Wavy Top Edge */}
                    <div className="w-full overflow-hidden leading-none transform translate-y-[2px]">
                        <svg className="relative block w-[200%] h-[40px] md:h-[60px] -ml-[50%] animate-[wave_4s_linear_infinite]"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,104.28,103.87,112.55,155.8,110.15,212.79,107.54,267.44,79.54,321.39,56.44Z"
                                className="fill-cyan-500/30 backdrop-blur-md drop-shadow-[0_-5px_15px_rgba(0,255,255,0.8)]"></path>
                        </svg>
                    </div>
                    {/* Liquid Body (Fills from bottom) */}
                    <div className="w-full flex-grow bg-cyan-500/10 backdrop-blur-md border-t border-cyan-400/30">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 to-transparent mix-blend-overlay"></div>
                    </div>
                </motion.div>

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
                <div className="p-4 md:p-10 font-mono text-[8px] sm:text-[10px] md:text-sm lg:text-base leading-relaxed text-cyan-300 min-h-[300px] md:min-h-[400px] overflow-x-auto terminal-scrollbar w-full">
                    {lines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`mb-2 ${line?.startsWith('[SYS]') ? 'text-purple-400' : line?.startsWith('[AI]') ? 'text-green-400' : 'text-cyan-300'}`}
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
