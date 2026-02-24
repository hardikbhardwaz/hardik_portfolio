import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KineticText from './KineticText';

// Mockup Data for the Deep Archive
const archiveData = {
    "Video Editing": [
        { id: 101, title: "Cyberpunk Action Reel", format: "16:9", type: "video" },
        { id: 102, title: "Minimalist Product Promo", format: "9:16", type: "video" },
        { id: 103, title: "Tech Documentary Cut", format: "16:9", type: "video" },
        { id: 104, title: "Social Media Loop", format: "1:1", type: "video" },
        { id: 105, title: "Music Video Edit", format: "21:9", type: "video" },
    ],
    "Graphic Design": [
        { id: 201, title: "Brutalist Poster Series", format: "3:4", type: "image" },
        { id: 202, title: "Tech Brand Identity", format: "16:9", type: "image" },
        { id: 203, title: "App UI Typography", format: "9:16", type: "image" },
        { id: 204, title: "Neon Cyber Logo", format: "1:1", type: "image" },
    ],
    "Web Development": [
        { id: 301, title: "Awwwards Nominee Site", format: "16:9", type: "code" },
        { id: 302, title: "WebGL Shader Experiment", format: "1:1", type: "code" },
        { id: 303, title: "React Native App Dashboard", format: "9:16", type: "code" },
    ],
    "Digital Marketing": [
        { id: 401, title: "Global Ad Campaign ROAS", format: "16:9", type: "chart" },
        { id: 402, title: "SEO Growth Trajectory", format: "3:4", type: "chart" }
    ],
    "AI & Automation": [
        { id: 501, title: "Neural Net Training Visualizer", format: "16:9", type: "video" }
    ],
    "AI Video & Graphics": [
        { id: 601, title: "Midjourney Concept Art", format: "3:4", type: "image" }
    ]
};

// Map categories to descriptions
const categoryDescriptions = {
    "Video Editing": "High-impact kinetic editing, utilizing aggressive temporal remapping, precision cuts, and cinematic color grading across Premiere and DaVinci.",
    "Graphic Design": "Unforgiving aesthetic direction. I forge brand identities that cut through the noise using striking typography and high-contrast brutalist design.",
    "Web Development": "Bleeding-edge reactive architecture. Building highly interactive 3D WebGL experiences and robust full-stack applications.",
    "Digital Marketing": "Algorithmic domination. Data-driven growth frameworks designed to maximize engagement and conversion velocity.",
    "AI & Automation": "Intelligent system architecture. Leveraging large language models and autonomous agents to eliminate manual latency.",
    "AI Video & Graphics": "Synthetic media generation. Directing neural networks to render impossible visuals and cinematic latent-space animations."
};

const AdvancedGallery = ({ category, onClose }) => {
    const [items, setItems] = useState([]);
    const [description, setDescription] = useState("");

    // Lock body scroll when overlay is open to prevent background mapping
    useEffect(() => {
        if (category) {
            document.body.style.overflow = 'hidden';
            setItems(archiveData[category] || archiveData["Graphic Design"]);
            setDescription(categoryDescriptions[category] || "Exploring the vast archives of digital creation.");
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto'; // Cleanup
        };
    }, [category]);

    // Handle ESC key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!category) return null;

    // A helper to generate random placeholder gradient backgrounds
    const getRandomGradient = (id) => {
        const hues = [180, 200, 280, 320, 10];
        const h1 = hues[id % hues.length];
        const h2 = hues[(id + 1) % hues.length];
        return `linear-gradient(135deg, hsl(${h1}, 80%, 10%), hsl(${h2}, 80%, 20%))`;
    };

    return (
        <AnimatePresence>
            <motion.div
                data-lenis-prevent="true"
                initial={{ y: "100%", opacity: 0.5 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0.5 }}
                transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.8 }}
                className="fixed inset-0 z-[10000] bg-black text-white overflow-y-auto overflow-x-hidden flex flex-col terminal-scrollbar"
                style={{
                    // Subtle underlying grid texture
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            >
                {/* Fixed Top Header */}
                <header className="sticky top-0 w-full z-50 flex justify-between items-center p-4 md:p-8 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20">
                    <div className="flex flex-col">
                        <span className="text-[8px] md:text-[10px] tracking-widest text-cyan-400 font-mono mb-1">
                            DEEP ARCHIVE / {category.toUpperCase()}
                        </span>
                        <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none">
                            {category}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="group relative px-4 py-2 md:px-6 md:py-3 border border-white/20 rounded-full overflow-hidden hover:border-cyan-400 transition-colors"
                    >
                        <span className="relative z-10 text-[10px] font-mono tracking-widest font-bold group-hover:text-black transition-colors">
                            [ RETURN ]
                        </span>
                        {/* Fill animation */}
                        <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                    </button>
                </header>

                {/* Hero Introduction Content */}
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
                    <div className="max-w-3xl">
                        <KineticText text={category.toUpperCase()} className="text-4xl md:text-7xl font-black tracking-tighter mb-6" />
                        <p className="text-sm md:text-lg text-white/70 leading-relaxed font-mono">
                            {description}
                        </p>
                    </div>

                    {/* Advanced Masonry/Bento Grid Layout */}
                    <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                        {items.map((item, index) => {
                            // Determine span based on index/format to create a "Bento Box" irregular grid
                            let colSpan = "col-span-1 md:col-span-12"; // Default fallback
                            let rowSpan = "row-span-1";

                            if (item.format === "16:9") {
                                colSpan = index % 3 === 0 ? "col-span-1 md:col-span-12" : "col-span-1 md:col-span-8";
                            } else if (item.format === "9:16" || item.format === "3:4") {
                                colSpan = "col-span-1 md:col-span-4";
                                rowSpan = "row-span-1 md:row-span-2"; // Tall items
                            } else if (item.format === "1:1") {
                                colSpan = "col-span-1 md:col-span-4";
                            } else if (item.format === "21:9") {
                                colSpan = "col-span-1 md:col-span-12";
                            }

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`group relative rounded-2xl overflow-hidden border border-white/10 ${colSpan} ${rowSpan}`}
                                >
                                    {/* Placeholder Img/Gradient */}
                                    <div
                                        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                        style={{ background: getRandomGradient(item.id) }}
                                    >
                                        {/* Stylized Noise Overlay */}
                                        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
                                    </div>

                                    {/* Content Payload - Appears on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-cyan-400 mb-2">
                                                ID_ARCHIVE_{item.id} // {item.type}
                                            </div>
                                            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                                                {item.title}
                                            </h3>

                                            <button className="mt-6 px-6 py-2 border border-cyan-400/50 rounded-full text-[10px] font-mono tracking-widest hover:bg-cyan-400 hover:text-black transition-colors backdrop-blur-md">
                                                LOAD ASSET {'>'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Always-visible subtle title for non-hover states */}
                                    <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
                                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter opacity-50 mix-blend-overlay">
                                            {item.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer padding */}
                <div className="h-32 w-full border-t border-white/10 mt-24 flex items-center justify-center bg-black">
                    <span className="font-mono text-[10px] tracking-widest opacity-30">[ END OF REGISTRY ]</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdvancedGallery;
