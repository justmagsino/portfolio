"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useIntro } from "@/context/IntroContext"
import { usePathname } from "next/navigation"

import Link from "next/link"

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const { setShowIntro } = useIntro()
    const pathname = usePathname()
    const isHomePage = pathname === "/"
    const isProjectsPage = pathname === "/projects"

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
            
            if (isHomePage) {
                if (window.scrollY < 100) {
                    setActiveSection("home")
                }
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isHomePage])

    useEffect(() => {
        if (isProjectsPage) {
            setActiveSection("projects")
            return
        }

        if (!isHomePage) return

        const observerOptions = {
            root: null,
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            });
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        const sections = ["projects", "skills", "contact"]
        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [isHomePage, isProjectsPage])

    const navLinks = [
        { name: "Home", href: "#", id: "home" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Skills", href: "#skills", id: "skills" },
        { name: "Contact", href: "#contact", id: "contact" },
        { name: "Resume", href: "/Magsino Resume.pdf", isExternal: true, id: "resume" },
    ]

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] w-full px-8 py-5 transition-all duration-300 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md",
                scrolled ? "py-4 bg-background/95 border-primary/20 shadow-lg shadow-primary/5" : ""
            )}
        >
            {/* Left side: LEON Logo -> Landing Screen */}
            <div className="flex items-center">
                <button 
                    onClick={() => {
                        if (isHomePage) {
                            setShowIntro(true)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        } else {
                            window.location.href = "/"
                        }
                    }}
                    className="text-3xl font-black uppercase tracking-tighter text-white hover:text-primary transition-colors cursor-pointer"
                >
                    LEON
                </button>
            </div>

            {/* Center: Nav Links */}
            <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 gap-10">
                {navLinks.map((link) => {
                    const isActive = activeSection === link.id
                    const href = link.isExternal ? link.href : (isHomePage ? link.href : "/" + link.href)
                    
                    return (
                        <Link
                            key={link.name}
                            href={href}
                            target={link.isExternal ? "_blank" : undefined}
                            rel={link.isExternal ? "noreferrer" : undefined}
                            className={cn(
                                "text-base font-bold transition-all duration-300 tracking-wide uppercase relative group",
                                isActive ? "text-primary" : "text-neutral-400 hover:text-white"
                            )}
                            onClick={(e) => {
                                if (link.isExternal) return;

                                if (link.name === "Home") {
                                    if (isHomePage) {
                                        e.preventDefault()
                                        window.scrollTo({ top: 0, behavior: "smooth" })
                                        setActiveSection("home")
                                    }
                                    return
                                }

                                if (link.href.startsWith("#") && isHomePage) {
                                    e.preventDefault()
                                    const id = link.href.substring(1)
                                    if (id) {
                                        const el = document.getElementById(id)
                                        if (el) {
                                            const offset = 80
                                            const bodyRect = document.body.getBoundingClientRect().top
                                            const elementRect = el.getBoundingClientRect().top
                                            const elementPosition = elementRect - bodyRect
                                            const offsetPosition = elementPosition - offset
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: "smooth"
                                            })
                                        }
                                    } else {
                                        window.scrollTo({ top: 0, behavior: "smooth" })
                                    }
                                }
                            }}
                        >
                            {link.name}
                            {/* Underline effect */}
                            <span className={cn(
                                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                                isActive ? "w-full" : "w-0 group-hover:w-full opacity-50"
                            )} />
                        </Link>
                    )
                })}
            </div>

            {/* Right side: Empty for balance */}
            <div className="hidden md:block w-[100px]"></div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button className="text-white p-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </nav>
    )
}
