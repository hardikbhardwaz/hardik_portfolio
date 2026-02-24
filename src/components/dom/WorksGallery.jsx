import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const projects = [
    { id: 1, title: "Promotional Brand Anthem", category: "Video Editing", tech: "Adobe Premiere Pro, After Effects", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { id: 2, title: "Social Media Identity", category: "Graphic Design", tech: "Adobe Photoshop, Canva", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { id: 3, title: "E-Commerce Storefront", category: "Web Development", tech: "Shopify, Elementor", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { id: 4, title: "AI-Generated Podcast", category: "Video Editing", tech: "SORA, Kling AI", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { id: 5, title: "Corporate Branding", category: "Graphic Design", tech: "Adobe Photoshop, Branding Creatives", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { id: 6, title: "High-Converting Landing Page", category: "Web Development", tech: "WordPress, HTML, CSS", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" }
];

const categories = ["Video Editing", "Graphic Design", "Web Development"];

const ProjectCard = ({ project, onOpenAdvanced }) => {
    const cardRef = useRef(null);
    const videoRef = useRef(null);

    // Track the scroll progress of THIS exact card relative to the window viewport
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Translate the inner background image inversely to the scroll to create physical "depth"
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset video on mouse leave
        }
    };

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onOpenAdvanced && onOpenAdvanced(project.category)}
            className="group relative h-72 md:h-80 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl overflow-hidden pointer-events-auto cursor-pointer flex flex-col justify-end p-5 md:p-8 shadow-2xl"
        >
            {/* The Parallax Container - Scaled up so we have room to move it Without showing empty space */}
            <motion.div
                className="absolute -inset-8 z-0 pointer-events-none"
                style={{ y: parallaxY }}
            >
                {/* Hardware Accelerated Background Video - AutoPlays only on Hover via Ref */}
                {project.video && (
                    <video
                        ref={videoRef}
                        src={project.video}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] mix-blend-screen"
                    />
                )}

                {/* Futuristic Image Placeholder (Scanning gradient) */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 via-black/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-white/5 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 12px)' }}
                />
            </motion.div>

            {/* Hover Scanline Overlay */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/80 -translate-y-full group-hover:translate-y-[8000%] transition-transform duration-1000 ease-linear z-20 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            {/* Content Payload */}
            <div className="relative z-30 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2 leading-none drop-shadow-lg">{project.title}</h3>
                <p className="text-xs tracking-[0.2em] uppercase font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pb-2 border-b border-cyan-500/30">
                    {project.tech}
                </p>
            </div>
        </motion.div>
    );
};

const WorksGallery = ({ onOpenAdvanced }) => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    // Filter projects based on the active tab
    const filteredProjects = projects.filter(project => project.category === activeCategory);

    return (
        <div className="w-full mt-12 flex flex-col items-center text-left">

            {/* Interactive Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-10">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`relative px-3 md:px-6 py-2 text-[10px] md:text-sm tracking-[0.2em] font-medium uppercase transition-all duration-300 pointer-events-auto ${activeCategory === category ? "text-cyan-300" : "text-white/50 hover:text-white/80"
                            }`}
                    >
                        {category}
                        {/* Glowing active indicator line */}
                        {activeCategory === category && (
                            <motion.div
                                layoutId="activeCategoryLine"
                                className="absolute left-0 bottom-0 w-full h-[1px] bg-cyan-400"
                                style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)' }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Dynamic Gallery Grid */}
            <motion.div layout className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-0 pb-32 border-b border-white/10 relative z-20">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} onOpenAdvanced={onOpenAdvanced} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default WorksGallery;
