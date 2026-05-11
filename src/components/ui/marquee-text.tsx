"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MarqueeTextProps {
    children: React.ReactNode
    className?: string
    speed?: number
    isHovered?: boolean
}

export const MarqueeText = ({ children, className, speed = 1.5, isHovered = false }: MarqueeTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current && contentRef.current) {
                setShouldAnimate(contentRef.current.scrollWidth > containerRef.current.clientWidth);
            }
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [children]);

    const scrollAmount = -(contentRef.current?.scrollWidth || 0) + (containerRef.current?.clientWidth || 0);

    return (
        <div ref={containerRef} className={cn("relative overflow-hidden w-full", className)}>
            <motion.div
                ref={contentRef}
                className="whitespace-nowrap inline-block will-change-transform"
                animate={shouldAnimate ? (
                    isMobile ? {
                        x: [0, scrollAmount, 0],
                        transition: {
                            x: {
                                repeat: Infinity,
                                duration: speed * 3,
                                ease: "linear",
                                repeatDelay: 1,
                            },
                        },
                    } : {
                        x: isHovered ? scrollAmount : 0
                    }
                ) : { x: 0 }}
                transition={isMobile ? undefined : {
                    duration: speed,
                    ease: "linear",
                }}
                style={{ translateZ: 0 }}
            >
                {children}
            </motion.div>
        </div>
    );
};
