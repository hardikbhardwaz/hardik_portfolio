import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
    {
        title: "SEO & Analytics",
        tools: ["Google Analytics", "Google Search Console", "On-Page SEO", "SEO Tools"]
    },
    {
        title: "Web Development",
        tools: ["WordPress", "Shopify", "Elementor", "HTML", "CSS", "Landing Page Creation & Optimization"]
    },
    {
        title: "Graphic Design",
        tools: ["Adobe Photoshop", "Canva", "Branding Creatives", "Social Media Design"]
    },
    {
        title: "Video Editing & Production",
        tools: ["Adobe Premiere Pro", "After Effects", "Final Cut Pro", "Promotional Videos", "Voice-over Videos"]
    },
    {
        title: "AI Video & Creative Automation",
        tools: ["ChatGPT", "SORA", "Gemini", "VEO", "Kling AI", "AI-based Video Generation", "AI Graphics Creation"]
    },
    {
        title: "Marketing Automation",
        tools: ["WhatsApp API Integration", "Automated Lead Follow-ups"]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 50, damping: 15 }
    }
};

const Skills = () => {
    return (
        <div className="w-full mt-24 pb-24">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {skillsData.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden pointer-events-auto"
                    >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* High-tech border scanning line */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                        <h3 className="text-xl font-bold tracking-widest mb-4 text-white/90 group-hover:text-cyan-300 transition-colors">
                            {skill.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 relative z-10">
                            {skill.tools.map((tool, i) => (
                                <span
                                    key={i}
                                    className="text-[10px] md:text-xs tracking-wider px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-all duration-300"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Skills;
