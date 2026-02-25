import React, { useState, useEffect } from 'react';

const SystemStats = () => {
    // State to hold the rapidly changing "fake" performance metrics
    const [metrics, setMetrics] = useState({
        coords: '0x00A9F...00B',
        networkLoad: 12.4,
        gpuTemp: 64,
        memoryAlloc: '1,024MB',
        targetLock: 'ACQUIRING...'
    });

    useEffect(() => {
        // Interval to rapidly randomize the integers to simulate intense computation
        const interval = setInterval(() => {
            setMetrics({
                coords: `0x00${Math.floor(Math.random() * 999)}F...${Math.floor(Math.random() * 999)}B`,
                networkLoad: +(Math.random() * 80 + 10).toFixed(1), // Between 10.0 and 90.0
                gpuTemp: Math.floor(Math.random() * 10 + 60), // Between 60 and 70
                memoryAlloc: `${Math.floor(Math.random() * 4000 + 1000)}MB`,
                targetLock: Math.random() > 0.8 ? '*LOCKED*' : 'ACQUIRING...'
            });
        }, 150); // Updates very fast (every 150ms) to look hyper-technical

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-24 left-6 md:bottom-32 md:left-12 z-50 pointer-events-none mix-blend-difference hidden lg:flex flex-col gap-1 text-[9px] md:text-[10px] tracking-[0.2em] font-mono text-cyan-400 opacity-70">
            {/* Pulsing Header */}
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white font-bold opacity-90">SYS_MONITOR_V1.9</span>
            </div>

            {/* Readouts */}
            <div className="flex justify-between w-[180px] border-b border-cyan-500/20 pb-1">
                <span className="opacity-50">VRAM_ALLOC</span>
                <span>{metrics.memoryAlloc}</span>
            </div>

            <div className="flex justify-between w-[180px] border-b border-cyan-500/20 pb-1">
                <span className="opacity-50">NET_LOAD</span>
                <span className={metrics.networkLoad > 80 ? 'text-red-400' : ''}>{metrics.networkLoad}%</span>
            </div>

            <div className="flex justify-between w-[180px] border-b border-cyan-500/20 pb-1">
                <span className="opacity-50">CORE_TEMP</span>
                <span>{metrics.gpuTemp}°C</span>
            </div>

            <div className="flex justify-between w-[180px] pt-1">
                <span className="opacity-50">TARGET</span>
                <span className={metrics.targetLock === '*LOCKED*' ? 'text-green-400 font-bold' : ''}>
                    {metrics.targetLock}
                </span>
            </div>

            {/* Hexadecimal stream */}
            <div className="mt-2 text-purple-400 opacity-60">
                L_IDX: {metrics.coords}
            </div>
        </div>
    );
};

export default SystemStats;
