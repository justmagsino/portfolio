"use client"

import { motion } from "framer-motion";

import { getPortfolioData } from "@/controllers/portfolioController";
import { ProjectGrid } from "../../views/sections/ProjectGrid";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
    const { projects } = getPortfolioData();

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-start"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group font-bold text-sm uppercase tracking-widest cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        Back
                    </Link>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-foreground">
                        All <span className="text-primary italic">Projects</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        A complete showcase of my web development work, from experimental tools to full-scale applications.
                    </p>
                </motion.div>

                <ProjectGrid projects={projects} />
            </div>
        </main>
    );
}
