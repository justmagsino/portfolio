"use client"
 
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useIntro } from "@/context/IntroContext"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Menu } from "lucide-react"

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const { setShowIntro } = useIntro()
    const pathname = usePathname()
    const router = useRouter()
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

        const sections = ["home", "projects", "skills", "contact"]
        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [isHomePage, isProjectsPage])

    const navLinks: { name: string; href: string; id: string; isExternal?: boolean }[] = [
        { name: "Home", href: "#", id: "home" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Skills", href: "#skills", id: "skills" },
        { name: "Contact", href: "#contact", id: "contact" },
    ]

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleNavClick = (link: any, e: React.MouseEvent) => {
        if (link.isExternal) return;

        setIsOpen(false);

        // If already on projects page and clicking Projects, just scroll top
        if (isProjectsPage && link.id === "projects") {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

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
    }

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 h-[70px] z-[100] transition-all duration-300 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md",
                    scrolled ? "bg-background/95 border-primary/20 shadow-xl" : ""
                )}
            >
            {/* Left side: Logo */}
            <div className="flex items-center px-8">
                <button 
                    onClick={() => {
                        if (isHomePage) {
                            setShowIntro(true)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        } else {
                            router.push("/")
                        }
                    }}
                    className="text-2xl font-black uppercase tracking-tighter text-white hover:text-primary transition-colors cursor-pointer"
                >
                    LEON
                </button>
            </div>

            {/* Center: Nav Links (Desktop) */}
            <div className="hidden md:flex flex-1 h-full items-center justify-center relative">
                {navLinks.map((link) => {
                    const isActive = activeSection === link.id
                    const href = link.isExternal ? link.href : (isHomePage ? link.href : "/#projects")
                    
                    let finalHref = href
                    if (!isHomePage && !link.isExternal) {
                        if (link.id === "home") finalHref = "/"
                        else if (link.id === "projects") finalHref = "/projects"
                        else finalHref = `/#${link.id}`
                    }

                    return (
                        <Link
                            key={link.name}
                            href={finalHref}
                            target={link.isExternal ? "_blank" : undefined}
                            rel={link.isExternal ? "noreferrer" : undefined}
                            className={cn(
                                "flex-1 h-full flex items-center justify-center text-sm font-bold transition-all duration-300 tracking-widest uppercase relative",
                                isActive ? "text-primary" : "text-white/60 hover:text-white"
                            )}
                            onClick={(e) => handleNavClick(link, e)}
                        >
                            {link.name}
                            {isActive && (
                                <motion.span 
                                    layoutId="nav-slider"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary z-20 shadow-[0_0_10px_rgba(0,136,170,0.5)]"
                                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                />
                            )}
                        </Link>
                    )
                })}
            </div>

            {/* Right side: Balance spacer */}
            <div className="hidden md:block w-[120px]"></div>

            {/* Mobile menu button */}
            <div className="md:hidden px-6">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-white hover:text-primary transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>
        </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[90] bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => {
                                const isActive = activeSection === link.id
                                const href = link.isExternal ? link.href : (isHomePage ? link.href : "/#projects")
                                
                                let finalHref = href
                                if (!isHomePage && !link.isExternal) {
                                    if (link.id === "home") finalHref = "/"
                                    else if (link.id === "projects") finalHref = "/projects"
                                    else finalHref = `/#${link.id}`
                                }

                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={finalHref}
                                            target={link.isExternal ? "_blank" : undefined}
                                            rel={link.isExternal ? "noreferrer" : undefined}
                                            className={cn(
                                                "text-3xl font-black uppercase tracking-widest transition-colors",
                                                isActive ? "text-primary" : "text-white/60 hover:text-primary"
                                            )}
                                            onClick={(e) => handleNavClick(link, e)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
