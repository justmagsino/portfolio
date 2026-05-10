"use client"

import { getPortfolioData } from "@/controllers/portfolioController";
import { ProjectGrid } from "../../views/sections/ProjectGrid";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
    const { projects } = getPortfolioData();

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Back Button */}
                <div className="flex justify-start">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group font-bold text-sm uppercase tracking-widest cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        Back
                    </Link>
                </div>

                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-foreground">
                        All <span className="text-primary italic">Projects</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        A complete showcase of my web development work, from experimental tools to full-scale applications.
                    </p>
                </div>

                <ProjectGrid projects={projects} />
            </div>
        </main>
    );
}
