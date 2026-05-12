"use client"

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getPortfolioData } from "@/controllers/portfolioController";
import { LandingScreen } from "@/views/components/ui/landing-screen";
import { useIntro } from "@/context/IntroContext";

const Hero = dynamic(() => import("@/views/sections/Hero").then(m => m.Hero), { ssr: true });
const Projects = dynamic(() => import("@/views/sections/Projects").then(m => m.Projects), { ssr: false });
const Skills = dynamic(() => import("@/views/sections/Skills").then(m => m.Skills), { ssr: false });
const Contact = dynamic(() => import("@/views/sections/Contact").then(m => m.Contact), { ssr: false });

export default function Home() {
    const { projects, skills } = getPortfolioData();
    const { showIntro, setShowIntro } = useIntro();

    return (
        <>
            <LandingScreen onComplete={() => setShowIntro(false)} />

            <main className={`min-h-screen transition-opacity duration-1000 ${showIntro ? "opacity-0 h-screen overflow-hidden" : "opacity-100"}`}>
                <Hero />
                <Projects projects={projects} />
                <Skills />
                <Contact />

                <footer className="py-8 px-4 border-t border-border/30 text-center text-muted-foreground/50 text-xs">
                    <p>© {new Date().getFullYear()} Justine Leonard V. Magsino.</p>
                </footer>
            </main>
        </>
    );
}
