import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
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
                className="text-center z-10 w-full max-w-5xl"
            >
                <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4">
                    INITIATE
                </h2>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-16" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                    {/* Email Card Interface */}
                    <Magnetic strength={0.1} threshold={0.5}>
                        <a href="mailto:hardikbhardwaz@gmail.com" className="group block pointer-events-auto outline-none w-full">
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative h-full border border-cyan-500/20 bg-black/40 backdrop-blur-xl p-8 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] -translate-y-full group-hover:translate-y-[150vw] transition-transform duration-[1.5s] ease-linear repeat-infinite opacity-0 group-hover:opacity-100" />

                                <div className="flex items-center gap-3 text-cyan-500 mb-2">
                                    <Mail className="w-5 h-5" />
                                    <span className="text-xs tracking-[0.3em] font-bold">SECURE COMMS</span>
                                </div>
                                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight sm:tracking-widest text-white/90 group-hover:text-white transition-colors whitespace-nowrap">
                                    HARDIKBHARDWAZ@GMAIL.COM
                                </span>
                            </motion.div>
                        </a>
                    </Magnetic>

                    {/* Phone Card Interface */}
                    <Magnetic strength={0.1} threshold={0.5}>
                        <a href="tel:+917880064889" className="group block pointer-events-auto outline-none w-full">
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative h-full border border-purple-500/20 bg-black/40 backdrop-blur-xl p-8 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-purple-400/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-400 shadow-[0_0_10px_#a855f7] -translate-y-full group-hover:translate-y-[150vw] transition-transform duration-[1.5s] ease-linear repeat-infinite opacity-0 group-hover:opacity-100" />

                                <div className="flex items-center gap-3 text-purple-500 mb-2">
                                    <Phone className="w-5 h-5" />
                                    <span className="text-xs tracking-[0.3em] font-bold">DIRECT LINK</span>
                                </div>
                                <span className="text-xl sm:text-2xl md:text-3xl font-medium tracking-[0.2em] text-white/90 group-hover:text-white transition-colors whitespace-nowrap">
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
