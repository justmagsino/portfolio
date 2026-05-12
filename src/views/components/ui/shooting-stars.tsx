"use client"

import React, { useEffect, useState } from "react"

export const ShootingStars = () => {
    const [stars, setStars] = useState<{ id: number, style: React.CSSProperties }[]>([])

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 6 : 30;
        
        setStars(Array.from({ length: count }).map((_, i) => {
            const tailLength = Math.floor(Math.random() * (750 - 500 + 1) + 500) / 100
            const topOffset = Math.floor(Math.random() * 10000) / 100
            const fallDuration = Math.floor(Math.random() * (22000 - 14000 + 1) + 14000) / 1000
            const fallDelay = (Math.random() * 20 - 10)
            const startX = Math.floor(Math.random() * (250 - 150 + 1) + 150)

            return {
                id: i,
                style: {
                    "--star-tail-length": `${tailLength}em`,
                    "--top-offset": `${topOffset}vh`,
                    "--fall-duration": `${fallDuration}s`,
                    "--fall-delay": `${fallDelay}s`,
                    "--start-x": `${startX}em`,
                } as React.CSSProperties,
            }
        }))
    }, [])


    return (
        <div className="shooting-stars-container absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden" style={{ contain: "strict" }}>
            <div className="stars absolute top-0 left-0 w-full h-[120%] -rotate-[45deg]">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="star"
                        style={star.style}
                    />
                ))}
            </div>
        </div>
    )
}
