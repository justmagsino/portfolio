"use client"

import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShootingStars } from "@/views/components/ui/shooting-stars";
import { AnimatedClouds } from "@/views/components/ui/animated-clouds";

export function Hero() {
    return (
        <section id="home" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
            {/* Background Effects - only visible in dark mode */}
            <div className="dark:block hidden">
                <ShootingStars />
            </div>

            {/* Background Effects - only visible in light mode */}
            <div className="dark:hidden block absolute inset-0 z-0 overflow-hidden">
                <AnimatedClouds />
            </div>
            
            {/* Radial mask so centre is transparent and edges fade to bg */}
            <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none hidden dark:block" />

            {/* Hero content */}
            <div className="relative z-30 text-center space-y-6 px-4 max-w-4xl">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest">
                    Full Stack Developer
                </p>
                <h1 
                    className={cn("text-3xl md:text-6xl font-bold tracking-tight text-foreground leading-tight transition-all duration-700 break-words")}
                    style={{ textShadow: "0 0 20px rgba(0, 210, 255, 0.3), 0 0 40px rgba(0, 210, 255, 0.1)" }}
                >
                    Justine Leonard V. Magsino
                </h1>
                <p className="max-w-xl mx-auto text-base md:text-lg text-muted-foreground">
                    I&apos;m a full-stack developer focused on building modern, fast, and clean
                    digital experiences. I integrate AI tools, automate workflows, and
                    ensure everything runs smoothly through QA and debugging.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <button
                        onClick={() =>
                            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 group shadow-lg shadow-primary/20"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={() =>
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground/5 text-foreground font-semibold rounded-xl border border-border hover:border-primary/40 hover:bg-primary/10 backdrop-blur-sm active:scale-95 transition-all duration-200 group"
                    >
                        <MessageCircle className="w-4 h-4 text-primary" />
                        Contact
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-primary rounded-full" />
                </div>
            </div>
        </section>
    );
}
