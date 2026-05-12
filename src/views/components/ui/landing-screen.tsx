"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { useIntro } from "@/context/IntroContext"
import { useTheme } from "@/context/ThemeContext"
import { NeonCursor } from "./neon-cursor"
import { GhostCharacter } from "./ghost-character"
import { ThemeToggle } from "./theme-toggle"
import { ShootingStars } from "@/views/components/ui/shooting-stars"
import { AnimatedClouds } from "@/views/components/ui/animated-clouds"

interface LandingScreenProps {
    onComplete: () => void
}

export function LandingScreen({ onComplete }: LandingScreenProps) {
    const { showIntro, setShowIntro } = useIntro()
    const { theme, toggleTheme } = useTheme()

    const handleStart = () => {
        setShowIntro(false)
        onComplete()
    }

    return (
        <AnimatePresence>
            {showIntro && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.93, 0.035, 0.35, 0.815] }
                    }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden touch-none"
                >
                    {/* Theme Toggle */}
                    <div className="absolute top-5 right-6 z-30">
                        <ThemeToggle />
                    </div>
                    {/* Background Effects */}
                    <div className="absolute inset-0 z-0 hidden dark:block">
                        <ShootingStars />
                    </div>
                    <div className="absolute inset-0 z-0 dark:hidden block">
                        <AnimatedClouds />
                    </div>


                    {/* Background Circles (Inspired by user request) */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 0.05,
                                    transition: { delay: i * 0.1, duration: 1.5, ease: "easeOut" }
                                }}
                                className="absolute rounded-full border border-primary/5 shadow-[0_0_50px_rgba(0,136,170,0.02)]"
                                style={{
                                    width: `${(i + 1) * 25}vw`,
                                    height: `${(i + 1) * 25}vw`,
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative z-20 text-center space-y-8 px-6 max-w-4xl">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
                            className="flex flex-col items-center gap-4"
                        >
                            {/* Ghost Character Mascot */}
                            <GhostCharacter />

                            <div className="space-y-4">
                                <h2 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-[0.15em] text-foreground">
                                    Justine Leonard V. Magsino
                                </h2>
                                <div className="h-0.5 w-16 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(0,136,170,0.6)]" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                        >
                            <button
                                onClick={handleStart}
                                className="group relative inline-flex items-center gap-3 px-12 py-5 bg-transparent border-2 border-primary text-primary font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 active:scale-95 shadow-[0_0_20px_rgba(0,136,170,0.2)] hover:shadow-[0_0_40px_rgba(0,136,170,0.4)]"
                            >
                                <span className="relative z-10">View Portfolio</span>
                                <ArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Subtle Gradient Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,170,0.03)_0%,transparent_70%)] pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
