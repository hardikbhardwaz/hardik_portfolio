import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DriveButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Google Drive Master Link provided by user Phase 45
    const DRIVE_LINK = "https://drive.google.com/drive/folders/1KM6vicM4uj3BpC3dVwRlLxagabjra9KK?usp=sharing";

    useEffect(() => {
        // Delay the appearance of the global CTA so it doesn't crowd the initial Hero boot sequence
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="fixed bottom-6 left-6 md:bottom-12 md:left-12 z-[9900] group pointer-events-auto"
                >
                    <a
                        href={DRIVE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 bg-black/60 backdrop-blur-xl border border-blue-500/30 rounded-full overflow-hidden hover:border-blue-400 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    >
                        {/* Hover Pulse Background */}
                        <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>

                        {/* Google Drive Icon SVG */}
                        <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10 text-white group-hover:text-blue-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.71 3.5L1.15 15l3.43 6l6.55-11.5M9.73 15L16.3 3.5h-6.86L2.87 15M22.85 15l-3.43-6H6.3l3.42 6" />
                        </svg>

                        {/* CTA Typography */}
                        <span className="relative z-10 flex flex-col items-start translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                            <span className="text-[10px] md:text-[12px] font-black tracking-widest text-white uppercase block leading-none mb-1">
                                Secure Drive
                            </span>
                            <span className="text-[8px] md:text-[9px] font-mono tracking-[0.2em] text-blue-400 uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                                View Full Archive
                            </span>
                        </span>

                        {/* Animated Tech Scanner Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 blur-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></div>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DriveButton;
