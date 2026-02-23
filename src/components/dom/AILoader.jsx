import React, { useEffect, useState, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const AILoader = () => {
    // Hooks natively into the WebGL loading loop to detect heavy HDR/Mesh mounts
    const { active, progress, item } = useProgress();
    const [show, setShow] = useState(true);
    const audioPlayed = useRef(false);

    const playAudioAndDismiss = () => {
        if (audioPlayed.current) return;
        audioPlayed.current = true;

        try {
            // Procedural Web Audio API sound (Cinematic AI Power Up)
            // Browsers may mute this if the user hasn't interacted with the page, 
            // but the try/catch ensures the loader still disappears.
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                if (ctx.state === 'suspended') {
                    ctx.resume();
                }

                // Sub-bass sweep
                const subOsc = ctx.createOscillator();
                const subGain = ctx.createGain();
                subOsc.type = 'sine';
                subOsc.frequency.setValueAtTime(40, ctx.currentTime);
                subOsc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 1.5);

                subGain.gain.setValueAtTime(0, ctx.currentTime);
                subGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.1);
                subGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

                subOsc.connect(subGain);
                subGain.connect(ctx.destination);

                // High-tech digital ping/sweep
                const pingOsc = ctx.createOscillator();
                const pingGain = ctx.createGain();
                pingOsc.type = 'square';
                pingOsc.frequency.setValueAtTime(800, ctx.currentTime);
                pingOsc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.5);

                pingGain.gain.setValueAtTime(0, ctx.currentTime);
                pingGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05); // Low volume
                pingGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);

                // Add a slight filter to the ping
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(1000, ctx.currentTime);
                filter.frequency.linearRampToValueAtTime(4000, ctx.currentTime + 0.5);

                pingOsc.connect(filter);
                filter.connect(pingGain);
                pingGain.connect(ctx.destination);

                subOsc.start();
                pingOsc.start();
                subOsc.stop(ctx.currentTime + 2);
                pingOsc.stop(ctx.currentTime + 1.5);
            }
        } catch (error) {
            console.warn("Web Audio API Autoplay Blocked. Silencing error:", error);
        } finally {
            // Guarantee Dismissal of the loader
            setShow(false);
        }
    };

    // Wait for progress to hit near-100%, or if the loader goes inactive
    useEffect(() => {
        if (progress >= 99 || (!active && progress > 0)) {
            const timeout = setTimeout(() => {
                playAudioAndDismiss();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [progress, active]);

    // Absolute Failsafe: Never trap the user forever. 
    // Auto-dismiss the loader natively after 6 seconds regardless of WebGL state.
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            playAudioAndDismiss();
        }, 6000);
        return () => clearTimeout(safetyTimer);
    }, []);

    // Generates a rapidly ticking cyber-log aesthetic purely for visual flair
    const [sysLogs, setSysLogs] = useState([]);
    useEffect(() => {
        if (!show) return;
        const interval = setInterval(() => {
            const hex = Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0').toUpperCase();
            setSysLogs(prev => {
                const newLogs = [...prev, `0x${hex} VRAM_ALLOC_OK`];
                return newLogs.slice(-5);
            });
        }, 150);
        return () => clearInterval(interval);
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#000000] text-cyan-400 font-mono overflow-hidden"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}></div>

                    {/* Central Radar */}
                    <div className="relative flex items-center justify-center mb-16">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            className="absolute w-56 h-56 rounded-full border border-dashed border-cyan-500/20"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute w-40 h-40 rounded-full border-t-2 border-b-2 border-cyan-400 opacity-60"
                        />

                        {/* Raw Progress Output */}
                        <div className="text-6xl font-black tracking-tighter mix-blend-screen drop-shadow-[0_0_15px_rgba(0,255,208,0.6)] z-10">
                            {progress < 99 ? progress.toFixed(0) : 100}<span className="text-3xl opacity-50">%</span>
                        </div>
                    </div>

                    {/* Linear Progress Bar */}
                    <div className="w-64 md:w-96 h-[2px] bg-white/5 rounded-full overflow-hidden relative mb-6">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,208,0.8)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress < 99 ? progress : 100}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                    </div>

                    {/* Text Core */}
                    <div className="flex flex-col items-center gap-2">
                        <motion.p
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-xs md:text-sm tracking-[0.4em] font-semibold text-white/90"
                        >
                            {progress < 99 ? "CALIBRATING LIQUID SINGULARITY..." : "SYSTEM OVERRIDE ACCEPTED"}
                        </motion.p>
                        <p className="text-[9px] text-cyan-500/40 tracking-widest uppercase truncate max-w-xs md:max-w-md text-center mt-2 h-4">
                            {item ? `MOUNTING_ASSET: ${item.split('/').pop()}` : "ALLOCATING GPU SHADER BUFFERS..."}
                        </p>
                    </div>

                    {/* SysLogs */}
                    <div className="absolute bottom-6 left-6 flex flex-col gap-[2px] text-[9px] text-cyan-600/40 pointer-events-none text-left">
                        {sysLogs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {log}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AILoader;
