import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Download, FileText } from 'lucide-react';
import Magnetic from './Magnetic';

const Contact = () => {
    return (
        <div id="contact" className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden mt-32">

            {/* High-Tech Background Accents */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyan-500/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/10 border-dashed animate-[spin_20s_linear_infinite]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center z-10 w-full max-w-6xl"
            >
                <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4">
                    INITIATE
                </h2>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-16" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">

                    {/* Email Card Interface */}
                    <Magnetic strength={0.1} threshold={0.5}>
                        <a href="mailto:hardikbhardwaz@gmail.com" className="group block pointer-events-auto outline-none w-full h-full">
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full h-full border border-cyan-500/20 bg-black/40 backdrop-blur-xl px-4 py-8 lg:p-8 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] -translate-y-full group-hover:translate-y-[150vw] transition-transform duration-[1.5s] ease-linear repeat-infinite opacity-0 group-hover:opacity-100" />

                                <div className="flex items-center gap-3 text-cyan-500 mb-2">
                                    <Mail className="w-5 h-5" />
                                    <span className="text-[10px] md:text-[8px] lg:text-[10px] tracking-[0.3em] font-bold">SECURE COMMS</span>
                                </div>
                                <span className="text-[11px] sm:text-sm md:text-[9px] lg:text-[11px] xl:text-sm font-medium tracking-[0.1em] text-white/90 group-hover:text-white transition-colors w-full text-center truncate">
                                    HARDIKBHARDWAZ@GMAIL.COM
                                </span>
                            </motion.div>
                        </a>
                    </Magnetic>

                    {/* Resume / Dossier Download Interface */}
                    <Magnetic strength={0.15} threshold={0.5}>
                        <a href="/Hardik_Resume.pdf" download="Hardik_Resume.pdf" className="group block pointer-events-auto outline-none w-full h-full">
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-full h-full border border-green-500/30 bg-black/60 backdrop-blur-2xl px-4 py-8 lg:p-8 overflow-hidden flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-green-400/80 hover:shadow-[0_0_50px_rgba(74,222,128,0.2)]"
                                style={{
                                    clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Aggressive Tech Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-green-400 shadow-[0_0_15px_#4ade80] -translate-y-full group-hover:translate-y-[150vw] transition-transform duration-[1.2s] ease-linear repeat-infinite opacity-0 group-hover:opacity-100" />

                                {/* Corner Accents */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/50 m-2 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/50 m-2 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex flex-col items-center gap-3 text-green-500 mb-2 relative z-10 w-full">
                                    <div className="relative">
                                        <FileText className="w-6 h-6 lg:w-8 lg:h-8 group-hover:opacity-0 transition-opacity duration-300 absolute inset-0" />
                                        <Download className="w-6 h-6 lg:w-8 lg:h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-1" />
                                    </div>
                                    <span className="text-[9px] md:text-[8px] lg:text-[10px] tracking-[0.3em] font-bold uppercase drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] text-center w-full truncate">
                                        EXTRACT DOSSIER
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-1 w-full">
                                    <span className="text-base sm:text-lg md:text-sm lg:text-base xl:text-lg font-black tracking-widest text-white/90 group-hover:text-white transition-colors uppercase text-center w-full truncate">
                                        RESUME.PDF
                                    </span>
                                    {/* Simulated "Decryption" Text on Hover */}
                                    <span className="text-[7px] md:text-[6px] lg:text-[8px] font-mono text-green-500/0 group-hover:text-green-400/80 transition-colors duration-300 delay-100 tracking-widest uppercase h-4 text-center w-full truncate">
                                        [ AUTHORIZED DOWNLOAD ]
                                    </span>
                                </div>
                            </motion.div>
                        </a>
                    </Magnetic>

                    {/* Phone Card Interface */}
                    <Magnetic strength={0.1} threshold={0.5}>
                        <a href="tel:+917880064889" className="group block pointer-events-auto outline-none w-full h-full">
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full h-full border border-purple-500/20 bg-black/40 backdrop-blur-xl px-4 py-8 lg:p-8 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-purple-400/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-400 shadow-[0_0_10px_#a855f7] -translate-y-full group-hover:translate-y-[150vw] transition-transform duration-[1.5s] ease-linear repeat-infinite opacity-0 group-hover:opacity-100" />

                                <div className="flex items-center gap-3 text-purple-500 mb-2">
                                    <Phone className="w-5 h-5" />
                                    <span className="text-[10px] md:text-[8px] lg:text-[10px] tracking-[0.3em] font-bold">DIRECT LINK</span>
                                </div>
                                <span className="text-sm sm:text-base md:text-[11px] lg:text-sm xl:text-lg font-medium tracking-[0.1em] text-white/90 group-hover:text-white transition-colors w-full text-center truncate">
                                    +91 7880064889
                                </span>
                            </motion.div>
                        </a>
                    </Magnetic>

                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
