"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export const PageLoader = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true)
        const timeout = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timeout)
    }, [pathname, searchParams])

    if (!loading) return null

    return (
        <div className="fixed top-0 left-0 right-0 z-[200] h-1">
            <div className="h-full bg-primary shadow-[0_0_10px_rgba(0,136,170,1)] animate-progress-fast" />
        </div>
    )
}
