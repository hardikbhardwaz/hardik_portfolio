import React from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText';

const experiences = [
    {
        id: "rs-enterprises",
        company: "R.S. Enterprises",
        role: "Digital Marketing Manager",
        date: "Aug 2024 - Present", // Fixed date to make sense (Aug 2024, not 2025)
        responsibilities: [
            "Re-engineered website performance and developed 5 B2B conversion-focused landing ecosystems.",
            "Scaled lead acquisition to 300+ qualified B2B inquiries monthly via Meta Ads (₹20K budget).",
            "Designed and deployed WhatsApp API automation workflows to improve response time and conversion tracking.",
            "Built high-volume AI-driven content systems (100+ monthly assets) integrating generative video, graphics, and storytelling frameworks.",
            "Played a direct role in increasing machine sales and strengthening competitive brand positioning."
        ]
    },
    {
        id: "freelancing",
        company: "Freelancing",
        role: "Digital Marketing Specialist",
        date: "Sept 2024 - Aug 2025",
        responsibilities: [
            "Delivered growth-focused digital strategies to 20+ clients across Education, Law, and E-commerce sectors.",
            "Built scalable WordPress ecosystems and conversion-driven marketing funnels.",
            "Integrated AI-driven content creation and automation frameworks to enhance client acquisition and brand growth."
        ]
    },
    {
        id: "idps",
        company: "IDPS Kakinada",
        role: "Digital Media Incharge & IT Admin",
        date: "June 2022 - Sept 2024",
        responsibilities: [
            "Established digital infrastructure from ground zero, scaling social media to 1,000+ organic followers.",
            "Increased admissions by 40% through structured paid and organic marketing campaigns.",
            "Managed ₹10K/month performance campaigns and redesigned website to optimize enquiry generation."
        ]
    },
    {
        id: "hbd",
        company: "HBD Financial Services",
        role: "Marketing Coordinator",
        date: "June 2019 - March 2021",
        responsibilities: [
            "Generated 4-5 daily leads through tele-calling and marketing efforts.",
            "Closed 50+ credit cards monthly and 1-2 loans daily.",
            "Achieved 120% targets; awarded Top Performer (3 times)."
        ]
    }
];

const ExperienceCard = ({ exp, index }) => {
    // Alternating layout for desktop: even index on left, odd on right
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            {/* Center Timeline Node */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-black border-2 border-cyan-400 rounded-full transform md:-translate-x-1/2 z-20 shadow-[0_0_15px_rgba(0,255,208,0.8)] flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"
                />
            </div>

            {/* Empty space for the opposite side on desktop */}
            <div className="hidden md:block w-5/12"></div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
            >
                <div className="relative p-6 md:p-8 border border-white/10 bg-black/40 backdrop-blur-xl group hover:border-cyan-500/50 transition-colors duration-500 overflow-hidden"
                    style={{
                        clipPath: isEven
                            ? 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
                            : 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                    }}
                >
                    {/* Hover Glow Effect */}
                    <div className={`absolute top-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-[50px] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isEven ? 'right-0' : 'left-0'}`}></div>

                    <div className={`flex flex-col ${isEven ? 'md:items-end' : 'items-start'} gap-2 mb-6 relative z-10`}>
                        <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300">
                            {exp.role}
                        </h3>
                        <div className={`flex flex-wrap gap-3 ${isEven ? 'md:justify-end' : 'justify-start'} items-center`}>
                            <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase">{exp.company}</span>
                            <span className="text-white/40 text-xs tracking-widest hidden md:inline">•</span>
                            <span className="text-white/60 font-mono text-xs tracking-wider">{exp.date}</span>
                        </div>
                    </div>

                    <ul className={`flex flex-col gap-3 relative z-10 ${isEven ? 'md:items-end' : 'items-start'}`}>
                        {exp.responsibilities.map((req, i) => (
                            <li key={i} className={`text-sm md:text-base text-white/70 leading-relaxed flex items-start gap-3 max-w-[95%] ${isEven ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                <span className="text-cyan-500 mt-1 text-xs select-none">❯</span>
                                <span>{req}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Decorative Bottom Line */}
                    <div className={`absolute bottom-0 h-0.5 bg-gradient-to-r ${isEven ? 'from-transparent to-cyan-500 right-0' : 'from-cyan-500 to-transparent left-0'} w-0 group-hover:w-full transition-all duration-700 ease-out`}></div>
                </div>
            </motion.div>
        </div>
    );
};

const WorkExperience = () => {
    return (
        <section id="experience" className="relative cursor-default py-24 md:py-32 w-full flex flex-col items-center overflow-hidden">

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-24 md:mb-40 z-10 relative">
                <KineticText
                    text="01.5 — CHRONOLOGY"
                    className="text-sm md:text-xl tracking-[0.4em] font-bold text-cyan-400 opacity-80 mb-6"
                />
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                    PROFESSIONAL <br />
                    <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>HISTORY</span>
                </h2>
                <p className="text-white/50 tracking-widest text-xs md:text-sm max-w-xl mx-auto uppercase">
                    Documenting the intersection of performance marketing and system architecture.
                </p>
            </div>

            {/* Timeline Container */}
            <div className="relative w-full max-w-6xl mx-auto px-6 md:px-12 z-10">

                {/* Center Line (Mobile: Left, Desktop: Center) */}
                <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent transform md:-translate-x-1/2"></div>

                {/* Vertical Data Stream effect inside line */}
                <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-[22px] md:left-[calc(50%-1.5px)] w-[3px] h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent transform md:-translate-x-1/2 blur-[2px]"
                />

                {/* Experience Nodes */}
                <div className="relative flex flex-col items-center w-full">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} />
                    ))}
                </div>

            </div>

        </section>
    );
};

export default WorkExperience;
