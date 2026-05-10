"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface IntroContextType {
    showIntro: boolean
    setShowIntro: (show: boolean) => void
}

const IntroContext = createContext<IntroContextType | undefined>(undefined)

export function IntroProvider({ children }: { children: React.ReactNode }) {
    const [showIntro, setShowIntro] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        // Check if intro was already seen in this session
        const hasSeenIntro = sessionStorage.getItem("hasSeenIntro")
        if (!hasSeenIntro) {
            setShowIntro(true)
        }
        setIsInitialized(true)
    }, [])

    const handleSetShowIntro = (show: boolean) => {
        if (!show) {
            sessionStorage.setItem("hasSeenIntro", "true")
        } else {
            sessionStorage.removeItem("hasSeenIntro")
        }
        setShowIntro(show)
    }

    // Prevent flash of content or intro
    if (!isInitialized) return <div className="bg-background min-h-screen" />

    return (
        <IntroContext.Provider value={{ showIntro, setShowIntro: handleSetShowIntro }}>
            {children}
        </IntroContext.Provider>
    )
}

export function useIntro() {
    const context = useContext(IntroContext)
    if (context === undefined) {
        throw new Error("useIntro must be used within an IntroProvider")
    }
    return context
}
