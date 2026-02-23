import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillDetail = ({ activePage, setActivePage }) => {
    // If no active page is selected, don't render anything
    if (!activePage) return null;

    return (
        <AnimatePresence>
            {activePage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-start bg-black/80 backdrop-blur-2xl overflow-y-auto p-8 md:p-16"
                >
                    {/* Header bar with Back Button */}
                    <header className="w-full flex justify-between items-center mb-16 max-w-6xl mx-auto">
                        <h2 className="text-3xl font-black text-white">{activePage} Portfolio</h2>

                        <button
                            onClick={() => setActivePage(null)}
                            className="group flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-all text-white font-medium"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span>
                            Back to 3D Space
                        </button>
                    </header>

                    {/* Placeholder content grid - To be populated by User */}
                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="aspect-video bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-8 group hover:border-[#00ffcc] transition-colors cursor-pointer">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">{activePage} Project {item}</h3>
                                    <p className="text-white/60 text-sm">Example thumbnail or embedded video frame goes here.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SkillDetail;
