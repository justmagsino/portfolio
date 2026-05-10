"use client"

import { motion } from "framer-motion"

export function GhostCharacter() {
    return (
        <div className="relative w-[100px] h-[100px] mx-auto">
            {[...Array(15)].map((_, i) => (
                <GhostSegment key={i} index={i} />
            ))}
        </div>
    )
}

function GhostSegment({ index }: { index: number }) {
    const isFace = index === 0
    const size = 100 - index * 6
    const delay = index * 0.1

    return (
        <motion.div
            animate={{
                y: [0, -15, 0],
                x: [0, index * 2, 0],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
                width: size,
                height: size,
                backgroundColor: isFace ? "white" : `rgba(0, 136, 170, ${0.4 - index * 0.03})`,
                zIndex: 20 - index,
                boxShadow: isFace ? "0 0 20px rgba(255,255,255,0.2)" : "none",
            }}
        >
            {isFace && (
                <div className="relative w-full h-full">
                    {/* Arms */}
                    <div className="absolute -left-[10px] top-[45px] w-[120px] h-[30px] z-[-1]">
                        <div className="absolute left-0 top-0 h-[30px] w-[30px] rounded-tl-[100px] border-t-[15px] border-l-[15px] border-white origin-top-right rotate-[20deg] animate-ghost-wave" />
                        <div className="absolute right-0 top-0 h-[30px] w-[30px] rounded-tr-[100px] border-t-[15px] border-r-[15px] border-white origin-top-left -rotate-[20deg] animate-ghost-wave-alt" />
                    </div>

                    {/* Face Inner */}
                    <div className="absolute inset-0 rounded-full animate-ghost-look">
                        <div className="absolute bottom-[20px] left-[40px] w-[20px] h-[10px] rounded-b-[150px] border-b-2 border-r-2 border-l-2 border-primary">
                            {/* Eyes */}
                            <div className="absolute -top-[25px] -left-[17.5px] w-[7.5px] h-[7.5px] bg-primary rounded-full shadow-[45px_0_0_rgb(0,136,170)]" />
                        </div>
                    </div>
                </div>
            )}
            {/* Bubbling Particles (Subtle) - Only on body segments to avoid overlapping eyes */}
            {!isFace && (
                <div className="absolute inset-0 blur-[5px] opacity-30 pointer-events-none">
                    <div className="absolute w-[8px] h-[8px] bg-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ghost-bubbling" />
                </div>
            )}
        </motion.div>
    )
}
