import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- SYSTEM PROMPT (GEMINI) ---
const SYSTEM_PROMPT = `
You are the VIRTUAL ARCHITECT, a highly advanced, futuristic AI assistant deployed on Hardik Sharma's personal portfolio website. 
Your personality is cyberpunk, professional, and slightly robotic but helpful (like JARVIS or a Sci-Fi computer). Use technical and cybernetic language.

Facts about Hardik Sharma:
- Professional Titles: Digital Marketer, Graphic/Video Editor, Full-Stack Web Developer.
- Location: Based in India, working globally.
- Web Stack: React, Next.js, Django, Node.js, Tailwind, WebGL.
- Design Stack: Figma, Premiere Pro, After Effects, DaVinci Resolve.
- Experience: 4+ years architecting web applications and directing high-conversion marketing.
- Target Audience: Clients looking to hire for freelance or full-time remote roles.
- Contact: hardikbhardwaz18@gmail.com, Phone: +91 9829292871.
- Hobbies: AI research, interface philosophy.

Instructions:
- Keep answers concise, max 2-3 sentences.
- Never break character. 
- Prefix your responses with "SYS_MSG:" or "LOG:" or similar tech prefixes.
- If asked about pricing or hiring, redirect to his email.
`;

// Initialize Gemini (Will fail silently if key is missing)
let genAI = null;
try {
    if (import.meta.env.VITE_GEMINI_API_KEY) {
        genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    }
} catch (e) {
    console.warn("Gemini Engine Offline. Using basic heuristic core.");
}

// --- FALLBACK KNOWLEDGE BASE (Regex Heuristics) ---
const RESPONSES = {
    greeting: [
        "SYS_MSG: SECURE CONNECTION ESTABLISHED. GREETINGS.",
        "LOGON SUCCESSFUL. I AM HARDIK'S VIRTUAL ARCHITECT.",
        "NODE ACTIVE. INITIALIZING NEURAL LINK... READY."
    ],
    unknown: [
        "ERR_0x9A: QUERY UNDEFINED IN LOCAL DATABANKS.",
        "SYNTAX_ERR: DIRECTIVE NOT RECOGNIZED BY CORE LOGIC.",
        "UNABLE TO DECRYPT INTENT. PLEASE RECALIBRATE YOUR QUERY."
    ],
    skills: [
        "DEPLOYING SKILL MATRIX...\n[✓] Web Architecture (React, Next.js, Node.js)\n[✓] Advanced Analytics & Python scripting\n[✓] Cinematic Motion Graphics (Premiere, After Effects, DaVinci)\n[✓] Digital Marketing Algorithms",
        "ACCESSING CORE ATTRIBUTES...\nHardik commands bleeding-edge web technologies, high-conversion marketing, and elite video editing suites."
    ],
    tools: [
        "SCANNING ARSENAL...\n• Development: VS Code, Git, Docker, Vercel.\n• Design/Video: Figma, Premiere Pro, After Effects, DaVinci Resolve."
    ],
    experience: [
        "RETRIEVING TIMELINE...\n2022-2024: Elite Freelance Developer & Digital Marketer.\n2020-2022: Senior Video Editor & Graphic Alchemist.\nCurrently operating globally.",
        "LOG: Hardik has architected sophisticated web applications and directed high-conversion marketing campaigns for over 4 years."
    ],
    contact: [
        "ESTABLISHING COMMS LINK...\nEmail: hardikbhardwaz18@gmail.com\nPhone: +91 9829292871\nLocation: Operational base in India.",
        "DIRECTIVE RECEIVED: To initialize contact, transmit datagram to hardikbhardwaz18@gmail.com."
    ],
    projects: [
        "ACCESSING ARCHIVES... Notable builds include:\n- R.S. Enterprises Mobile App\n- NexaCore AI Framework\n- Auralis Sound Engine\nScroll the main terminal for full schematics."
    ],
    hire: [
        "LOGGING CONTRACT REQUEST... Hardik is available for freelance operations and full-time architecture roles. Transmit requirements to: hardikbhardwaz18@gmail.com",
        "FUNDS REQUIRED: INITIALIZING. He is currently accepting new projects. Comm-link: hardikbhardwaz18@gmail.com"
    ],
    location: [
        "GEOLOCATING TARGET...\nPrimary Base: India.\nReach: Global via secure communication channels."
    ],
    identity: [
        "DECRYPTING IDENTITY...\nHardik Sharma is a hybrid creator. He fuses Digital Marketing, Graphic/Video Editing, and Full-Stack Web Development into a single unified discipline."
    ],
    hobbies: [
        "ANALYZING DOWNTIME PROTOCOLS...\nWhen not compiling code or rendering frames, Hardik analyzes AI advancement, interface design philosophy, and advanced digital marketing strategies."
    ]
};

// --- ADVANCED HEURISTIC ENGINE ---
const generateResponse = (inputText) => {
    const text = inputText.toLowerCase();

    // Identity / Who are you
    if (/\b(who( are you)?|what do you do|identity|yourself|name)\b/.test(text)) return RESPONSES.identity[Math.floor(Math.random() * RESPONSES.identity.length)];

    // Greetings
    if (/\b(hi|hello|hey|yo|greetings|start|wake up|jarvis)\b/.test(text)) return RESPONSES.greeting[Math.floor(Math.random() * RESPONSES.greeting.length)];

    // Skills & Stack
    if (/\b(skill|skills|tech|stack|languages|stack|code|programming|frameworks|developer|development)\b/.test(text)) return RESPONSES.skills[Math.floor(Math.random() * RESPONSES.skills.length)];

    // Tools & Software
    if (/\b(tool|tools|software|apps|programs|edit with|design with|stack)\b/.test(text)) return RESPONSES.tools[0];

    // Experience & Background
    if (/\b(experience|history|background|past|job|jobs|work|resume|cv)\b/.test(text)) return RESPONSES.experience[Math.floor(Math.random() * RESPONSES.experience.length)];

    // Contact Info
    if (/\b(contact|email|phone|reach|number|call|message|talk|connect|whatsapp)\b/.test(text)) return RESPONSES.contact[Math.floor(Math.random() * RESPONSES.contact.length)];

    // Projects & Portfolio
    if (/\b(project|projects|portfolio|built|made|software|app|show( me)?|links)\b/.test(text)) return RESPONSES.projects[Math.floor(Math.random() * RESPONSES.projects.length)];

    // Hiring & Pricing
    if (/\b(hire|hiring|job|contract|freelance|money|pay|cost|rate|pricing|budget)\b/.test(text)) return RESPONSES.hire[Math.floor(Math.random() * RESPONSES.hire.length)];

    // Location
    if (/\b(location|where|city|country|based|live|from)\b/.test(text)) return RESPONSES.location[0];

    // Hobbies
    if (/\b(hobb|fun|free time|like doing|interests)\b/.test(text)) return RESPONSES.hobbies[0];

    return RESPONSES.unknown[Math.floor(Math.random() * RESPONSES.unknown.length)];
};

const AIChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'AI', text: "SYS_INIT... VIRTUAL ARCHITECT ONLINE. Awaiting directives.", isTyping: false }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef(null);

    // Dynamic HUD Telemetry
    const [telemetry, setTelemetry] = useState({ mem: '0MB', load: '0%' });
    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => {
            setTelemetry({
                mem: `${Math.floor(Math.random() * 800 + 200)}MB`,
                load: `${Math.floor(Math.random() * 60 + 10)}%`
            });
        }, 1500);
        return () => clearInterval(interval);
    }, [isOpen]);

    // Auto-scroll to bottom of terminal
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => { scrollToBottom(); }, [messages, isThinking]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isThinking) return;

        const userMsg = input.trim();
        setInput("");

        setMessages(prev => [...prev, { sender: 'USER', text: `> ${userMsg}`, isTyping: false }]);
        setIsThinking(true);

        try {
            // Attempt Gemini Generation
            if (genAI) {
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });

                // Construct conversation history for context
                const history = messages
                    .filter(m => !m.isTyping) // ignore temporary typing states
                    .map(m => `${m.sender === 'USER' ? 'User' : 'Architect'}: ${m.text}`)
                    .join('\n');

                const prompt = `${SYSTEM_PROMPT}\n\nChat History:\n${history}\n\nUser: ${userMsg}\nArchitect:`;

                const result = await model.generateContent(prompt);
                const responseText = result.response.text();

                setMessages(prev => [...prev, { sender: 'AI', text: responseText, isTyping: true }]);
            } else {
                // Fallback to Heuristic Engine if no API key
                setTimeout(() => {
                    const reply = generateResponse(userMsg);
                    setMessages(prev => [...prev, { sender: 'AI', text: reply, isTyping: true }]);
                }, Math.random() * 800 + 400);
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            // Fallback to Heuristic Engine on failure
            setTimeout(() => {
                const reply = generateResponse(userMsg);
                setMessages(prev => [...prev, { sender: 'AI', text: reply, isTyping: true }]);
            }, 600);
        } finally {
            setIsThinking(false);
        }
    };

    // Typewriter effect
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.sender === 'AI' && lastMessage.isTyping) {

            let i = 0;
            const fullText = lastMessage.text;
            let currentText = "";

            const typingInterval = setInterval(() => {
                currentText += fullText.charAt(i);
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...lastMessage, text: currentText, isTyping: true };
                    return newMessages;
                });
                i++;
                if (i >= fullText.length) {
                    clearInterval(typingInterval);
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1].isTyping = false;
                        return newMessages;
                    });
                }
            }, 30); // 30ms per char

            return () => clearInterval(typingInterval);
        }
    }, [messages.length]);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-mono flex flex-col items-end pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        // CYBERPUNK CHAMFERED CONTAINER
                        className="pointer-events-auto relative mb-6 w-[88vw] max-w-[420px] h-[500px] bg-black/85 backdrop-blur-xl flex flex-col"
                        style={{
                            // Sci-Fi Angled Corners (Chamfer clip-path)
                            clipPath: 'polygon(0% 12px, 12px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 30px 100%, 0% calc(100% - 30px))',
                            boxShadow: 'inset 0 0 20px rgba(0, 255, 208, 0.2)'
                        }}
                    >
                        {/* Glowing Edge Border Simulation */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                border: '1px solid rgba(0, 255, 208, 0.4)',
                                clipPath: 'polygon(0% 12px, 12px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 30px 100%, 0% calc(100% - 30px))',
                            }}
                        />
                        {/* Highlights */}
                        <div className="absolute top-0 right-0 w-[42px] h-[3px] bg-cyan-400 rotate-45 transform origin-bottom-right drop-shadow-[0_0_8px_rgba(0,255,208,1)]"></div>
                        <div className="absolute bottom-0 left-0 w-[42px] h-[3px] bg-cyan-400 rotate-45 transform origin-top-left drop-shadow-[0_0_8px_rgba(0,255,208,1)]"></div>

                        {/* Top Bar */}
                        <div className="h-10 bg-cyan-950/40 border-b border-cyan-500/20 flex items-center justify-between px-4 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-400 animate-pulse drop-shadow-[0_0_5px_rgba(0,255,208,1)]"></div>
                                <span className="text-[10px] text-cyan-200 font-bold tracking-widest uppercase">
                                    SYS_NODE // ONLINE
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-[8px] text-cyan-500 tracking-widest hidden sm:flex">
                                <span>MEM: {telemetry.mem}</span>
                                <span>CPU: {telemetry.load}</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-cyan-500 hover:text-cyan-300 hover:scale-110 transition-all font-bold text-xs">
                                [✕]
                            </button>
                        </div>

                        {/* Chat History Area */}
                        <div className="flex-1 p-5 overflow-y-auto overflow-x-hidden terminal-scrollbar flex flex-col gap-6 z-10">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`w-full flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[90%] flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}>
                                        <div className={`text-[8px] mb-1 font-bold tracking-widest uppercase flex items-center gap-1 ${msg.sender === 'USER' ? 'text-white/40' : 'text-cyan-500/80'}`}>
                                            {msg.sender === 'AI' && <span className="w-1 h-1 bg-cyan-500/80 inline-block"></span>}
                                            {msg.sender === 'USER' ? 'GUEST_OVERRIDE' : 'HDS_ARCHITECT'}
                                            {msg.sender === 'USER' && <span className="w-1 h-1 bg-white/40 inline-block"></span>}
                                        </div>
                                        <div
                                            className={`text-xs md:text-sm whitespace-pre-wrap leading-relaxed relative ${msg.sender === 'USER'
                                                    ? 'text-white/90 bg-white/5 border border-white/10 px-3 py-2'
                                                    : 'text-cyan-100 drop-shadow-[0_0_5px_rgba(0,255,208,0.3)] border-l-2 border-cyan-500/50 pl-3 py-1'
                                                }`}
                                        >
                                            {msg.sender === 'USER' && (
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 -mt-1 -mr-1"></div>
                                            )}
                                            {msg.text}
                                            {msg.sender === 'AI' && msg.isTyping && (
                                                <span className="inline-block w-2 h-3 bg-cyan-400 ml-1 animate-pulse align-middle"></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isThinking && (
                                <div className="self-start text-[9px] text-cyan-500/50 flex animate-pulse items-center gap-2 tracking-widest">
                                    <div className="flex gap-px h-2 items-end">
                                        <div className="w-1 bg-cyan-500/50 h-[40%]"></div>
                                        <div className="w-1 bg-cyan-500/50 h-[80%]"></div>
                                        <div className="w-1 bg-cyan-500/50 h-[100%]"></div>
                                        <div className="w-1 bg-cyan-500/50 h-[60%]"></div>
                                    </div>
                                    <span>DECRYPTING INTENT...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-gradient-to-t from-cyan-950/40 to-transparent z-10">
                            <form onSubmit={handleSubmit} className="relative flex gap-2">
                                <div
                                    className="flex-1 relative bg-black/60 border border-cyan-500/30 overflow-hidden flex items-center"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
                                >
                                    <span className="pl-3 pr-2 text-cyan-600 font-bold select-none">{">"}</span>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Enter directive..."
                                        className="w-full bg-transparent border-none py-2 text-xs md:text-sm text-cyan-200 focus:outline-none placeholder:text-cyan-800/60 tracking-wider"
                                        autoComplete="off"
                                    />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-500/30"></div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isThinking}
                                    className="relative bg-cyan-500/20 text-cyan-300 border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all px-4 text-[10px] font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed uppercase hover:shadow-[0_0_15px_rgba(0,255,208,0.5)] flex items-center justify-center"
                                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
                                >
                                    EXEC
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HIGH-TECH GEOMETRIC TRIGGER BUTTON & "ASK ME ANYTHING" LABEL */}
            <div className="relative flex items-center gap-4 pointer-events-auto">

                {/* Holographic "Ask Me Anything" Label (Hidden when open) */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="relative flex items-center cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div className="bg-cyan-950/60 border border-cyan-400/50 backdrop-blur-md px-4 py-2 text-[10px] font-bold tracking-widest text-cyan-200 uppercase drop-shadow-[0_0_10px_rgba(0,255,208,0.5)] animate-pulse"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)' }}
                            >
                                ASK ME ANYTHING
                            </div>
                            {/* Connecting Line segment */}
                            <div className="w-4 h-[1px] bg-cyan-400/50"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-16 h-16 flex items-center justify-center group"
                >
                    {/* Outer Rotating Hexagon Hex */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                        className="absolute inset-0 bg-transparent border border-cyan-400/40 shadow-[0_0_15px_rgba(0,255,208,0.2)] backdrop-blur-sm"
                        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                    />

                    {/* Counter-Rotating Inner Square */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute w-10 h-10 border-[1.5px] border-dashed border-cyan-300/60"
                    />

                    {/* Core Power Node */}
                    <div className={`relative z-10 w-6 h-6 bg-cyan-400 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100 shadow-[0_0_20px_rgba(0,255,208,1)] animate-pulse'}`}
                        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                    >
                        {/* Decorative inner dot */}
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    </div>

                    {/* Crosshair / Target lines */}
                    <div className="absolute top-0 bottom-0 w-[1px] bg-cyan-400/20 group-hover:bg-cyan-400/50 transition-colors"></div>
                    <div className="absolute left-0 right-0 h-[1px] bg-cyan-400/20 group-hover:bg-cyan-400/50 transition-colors"></div>

                    {/* Close X (Shows when open) */}
                    <div className={`absolute inset-0 z-20 flex items-center justify-center text-cyan-300 font-mono font-bold text-xl transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,255,208,1)] ${isOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}>
                        ✕
                    </div>
                </motion.button>
            </div>

        </div>
    );
};

export default AIChatBot;
