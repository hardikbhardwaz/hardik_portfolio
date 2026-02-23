import React from 'react';

const TextMarquee = ({ text }) => {
    return (
        <div className="relative w-full max-w-[100vw] overflow-hidden py-4 flex items-center bg-cyan-900/10 border-y border-cyan-500/20 backdrop-blur-sm mt-[6vh]">
            <div className="animate-marquee whitespace-nowrap flex items-center">
                <span className="text-[10px] md:text-sm tracking-[0.4em] font-medium text-cyan-200 mx-4 opacity-90">
                    {text} <span className="mx-8 text-cyan-500">+++</span>
                </span>
                <span className="text-[10px] md:text-sm tracking-[0.4em] font-medium text-cyan-200 mx-4 opacity-90">
                    {text} <span className="mx-8 text-cyan-500">+++</span>
                </span>
                <span className="text-[10px] md:text-sm tracking-[0.4em] font-medium text-cyan-200 mx-4 opacity-90">
                    {text} <span className="mx-8 text-cyan-500">+++</span>
                </span>
                <span className="text-[10px] md:text-sm tracking-[0.4em] font-medium text-cyan-200 mx-4 opacity-90">
                    {text} <span className="mx-8 text-cyan-500">+++</span>
                </span>
            </div>
        </div>
    );
};

export default TextMarquee;
