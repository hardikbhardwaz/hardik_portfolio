import React from 'react';

const Overlay = ({ activePage }) => {
    return (
        <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-8 lg:p-12 overflow-hidden">

            {/* Top Bar */}
            <header className="flex justify-between items-start w-full">
                {/* Top Left Portfolio Title */}
                <div
                    className="pointer-events-auto text-[#f4f4f4] text-xs font-bold tracking-[0.3em] opacity-90"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                >
                    PORTFOLIO
                </div>

                {/* Active theory styled top-right pill button */}
                <div
                    className="pointer-events-auto border border-white/20 rounded-[2rem] px-6 py-2 flex items-center gap-6 text-[10px] tracking-widest text-[#ececec] uppercase hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-md"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                >
                    <span>WORK</span>
                    <div className="w-8 h-[1px] bg-white/50"></div>
                    <span>CONTACT</span>
                </div>
            </header>

            {/* Middle Left Navigation (The 'What are you looking for?' menu) */}
            {!activePage && (
                <main className="w-full h-full flex flex-col justify-center items-start mt-[-10vh]">
                    <div
                        className="pointer-events-auto text-[#f4f4f4] text-xs uppercase flex flex-col gap-4 font-medium"
                        style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em" }}
                    >
                        <h3 className="mb-4 text-[10px] tracking-widest opacity-80">WHAT ARE YOU LOOKING FOR?</h3>

                        <nav className="flex flex-col gap-6 opacity-60">
                            <a href="#" className="hover:opacity-100 hover:text-[#00ffcc] transition-all transform hover:translate-x-2">{"->"} DIGITAL MARKETING</a>
                            <a href="#" className="hover:opacity-100 hover:text-[#ff00ff] transition-all transform hover:translate-x-2">{"->"} GRAPHIC DESIGN</a>
                            <a href="#" className="hover:opacity-100 hover:text-[#00ffff] transition-all transform hover:translate-x-2">{"->"} VIDEO EDITING</a>
                            <a href="#" className="hover:opacity-100 hover:text-[#ff00ff] transition-all transform hover:translate-x-2">{"->"} WEB DEVELOPMENT</a>
                            <a href="#" className="hover:opacity-100 hover:text-[#00ffcc] transition-all transform hover:translate-x-2">{"->"} AI VIDEO & GRAPHICS</a>
                            <a href="#" className="hover:opacity-100 hover:text-[#ff00ff] transition-all transform hover:translate-x-2">{"->"} AI & AUTOMATION</a>
                        </nav>

                        <button className="mt-8 border border-white/20 rounded-[2rem] px-6 py-3 md:px-8 text-[9px] md:text-[10px] tracking-widest text-center hover:bg-white/10 hover:border-white/40 transition-all w-fit backdrop-blur-md">
                            ASK ME ANYTHING...
                        </button>
                    </div>
                </main>
            )}

            {/* Bottom Bar aesthetics */}
            <footer className="flex justify-between items-end w-full relative">
                <div className="text-[9px] tracking-[0.3em] font-mono opacity-30">
                    V 2.0.0
                </div>

                {/* SCROLL DOWN INDICATOR in the absolute center bottom */}
                {!activePage && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-2 opacity-50 animate-pulse">
                        <span className="text-[10px] tracking-[0.2em] font-mono">SCROLL DOWN</span>
                        <div className="w-[1px] h-8 bg-white/50"></div>
                    </div>
                )}

                <div className="text-[9px] tracking-[0.3em] font-mono opacity-30">
                    [ IGNITE ACTIVE ]
                </div>
            </footer>
        </div>
    );
};

export default Overlay;
