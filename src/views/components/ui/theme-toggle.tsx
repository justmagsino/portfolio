"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Cloud } from "lucide-react";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`relative flex items-center w-16 h-8 rounded-full transition-colors duration-500 overflow-hidden border ${
                isDark 
                    ? "bg-[#224f6d] border-[#cad4d8]" 
                    : "bg-[#9cd6ef] border-[#65c0e7]"
            }`}
            style={{ padding: "0 4px" }}
        >
            {/* Stars background for dark mode */}
            <motion.div
                initial={false}
                animate={{ opacity: isDark ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
            >
                <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_2px_#fff]" />
                <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full shadow-[0_0_2px_#fff]" />
                <div className="absolute top-1 left-8 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_2px_#fff]" />
                <div className="absolute top-5 left-3 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_2px_#fff]" />
            </motion.div>

            {/* Clouds background for light mode */}
            <motion.div
                initial={false}
                animate={{ opacity: isDark ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <Cloud className="absolute top-1 right-2 w-4 h-4 text-white opacity-80" fill="white" />
                <Cloud className="absolute top-3 right-6 w-3 h-3 text-white opacity-60" fill="white" />
            </motion.div>

            {/* The sliding toggle handle (Sun/Moon) */}
            <motion.div
                initial={false}
                animate={{
                    x: isDark ? 32 : 0,
                    rotate: isDark ? -360 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-md`}
                style={{
                    backgroundColor: isDark ? "#CAD9DD" : "#F9C941", // Moon color vs Sun color
                }}
            >
                {/* Crater details for Moon */}
                {isDark && (
                    <>
                        <div className="absolute top-1.5 left-1 w-1 h-1 bg-[#A2B5BF] rounded-full opacity-60" />
                        <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-[#A2B5BF] rounded-full opacity-60" />
                        <div className="absolute top-1.5 right-1 w-0.5 h-0.5 bg-[#A2B5BF] rounded-full opacity-60" />
                    </>
                )}
            </motion.div>
        </button>
    );
}
