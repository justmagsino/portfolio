"use client"

import { useState } from "react";
import { Hero } from "@/views/sections/Hero";
import { Projects } from "@/views/sections/Projects";
import { Skills } from "@/views/sections/Skills";
import { Contact } from "@/views/sections/Contact";
import { getPortfolioData } from "@/controllers/portfolioController";
import { LandingScreen } from "@/views/components/ui/landing-screen";
import { useIntro } from "@/context/IntroContext";

export default function Home() {
    const { projects, skills } = getPortfolioData();
    const { showIntro, setShowIntro } = useIntro();

    return (
        <>
            <LandingScreen onComplete={() => setShowIntro(false)} />
            
            <main className={`min-h-screen transition-opacity duration-1000 ${showIntro ? "opacity-0 h-screen overflow-hidden" : "opacity-100"}`}>
                <Hero />
                <Projects projects={projects} />
                <Skills skills={skills} />
                <Contact />

                <footer className="py-8 px-4 border-t border-border/30 text-center text-muted-foreground/50 text-xs">
                    <p>© {new Date().getFullYear()} Justine Leonard V. Magsino. All rights reserved.</p>
                </footer>
            </main>
        </>
    );
}
