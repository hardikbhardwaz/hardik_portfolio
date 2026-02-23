import React from 'react';
import { motion } from 'framer-motion';

const skillsList = [
    {
        title: "SEO & Analytics",
        category: "Growth & Visibility",
        description: "Expertise in Google Analytics, Google Search Console, comprehensive On-Page SEO, and utilizing advanced SEO Tools to drive organic traffic.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Web Development",
        category: "Architecture & Conversion",
        description: "Building high-converting platforms using WordPress, Shopify, Elementor, HTML, and CSS. Specialized in Landing Page Creation & Optimization.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop"
    },
    {
        title: "Graphic Design",
        category: "Visual Identity",
        description: "Crafting premium branding creatives and social media designs leveraging Adobe Photoshop and Canva.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2671&auto=format&fit=crop"
    },
    {
        title: "Video Editing",
        category: "Cinematic Content",
        description: "Producing high-retention promotional and voice-over videos using Adobe Premiere Pro, After Effects, and Final Cut Pro.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "AI Video & Automation",
        category: "Next-Gen Generative AI",
        description: "Pioneering AI-based video and graphics creation leveraging ChatGPT, SORA, Gemini, VEO, and Kling AI.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        title: "Marketing Automation",
        category: "Scalable Systems",
        description: "Architecting automated lead follow-ups and WhatsApp API integrations to streamline communication and boost conversion rates.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
    }
];

const Gallery = () => {
    return (
        <section className="w-full flex-grow flex flex-col items-center justify-start gap-32 mt-[20vh] pb-[50vh]">
            <div className="text-center mb-8">
                <p className="text-[#00ffcc] tracking-[0.2em] uppercase text-xs font-semibold mb-4 drop-shadow-lg">Core Capabilities</p>
                <h3 className="text-white text-4xl md:text-5xl font-black drop-shadow-2xl">Technical Skills</h3>
            </div>

            <div className="flex flex-col gap-[40vh] w-full max-w-6xl px-4 pointer-events-auto">
                {skillsList.map((skillItem, i) => {
                    const isEven = i % 2 === 0;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }} // Triggers smoothly as it scrolls into view
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 w-full`}
                        >
                            <div className="w-full md:w-1/2 flex justify-center">
                                {/* The Glassmorphic Image Tile */}
                                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,204,0.1)] border border-white/20 group">
                                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                    <img
                                        src={skillItem.image}
                                        alt={skillItem.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Tech Borders */}
                                    <div className="absolute top-4 left-4 border-l-2 border-t-2 border-[#00ffcc] w-8 h-8 opacity-50 z-20" />
                                    <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-[#00ffcc] w-8 h-8 opacity-50 z-20" />
                                </div>
                            </div>

                            <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start text-left' : 'md:items-end text-right'}`}>
                                <p className="text-[#00ffcc] font-mono text-xs uppercase tracking-widest mb-1">{skillItem.category}</p>
                                <h4 className="text-white text-3xl font-bold mb-4">{skillItem.title}</h4>
                                <p className="text-white/60 leading-relaxed max-w-md">
                                    {skillItem.description}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    );
};

export default Gallery;
