"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface IntroContextType {
    showIntro: boolean
    setShowIntro: (show: boolean) => void
}

const IntroContext = createContext<IntroContextType | undefined>(undefined)

export function IntroProvider({ children }: { children: React.ReactNode }) {
    const [showIntro, setShowIntro] = useState(true)

    return (
        <IntroContext.Provider value={{ showIntro, setShowIntro }}>
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
