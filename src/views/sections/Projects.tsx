"use client";
import { useState } from "react";
import { Project } from "@/models/portfolio";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
import { ProjectModal } from "@/views/components/ui/project-modal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectsProps {
    projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
    const [selected, setSelected] = useState<Project | null>(null);

    const cardItems: CardStackItem[] = projects.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageSrc: project.image,
        href: project.liveUrl,
        tags: project.tags,
        projectType: project.projectType,
        onClick: () => setSelected(project),
    }));

    return (
        <section id="projects" className="relative w-full overflow-hidden py-24 px-4">
            {/* Content */}
            <div className="relative max-w-7xl mx-auto w-full space-y-12">
                <div className="text-center space-y-4">
                    <h2 className={cn("text-3xl md:text-5xl font-bold text-foreground tracking-tight")}>
                        Featured <span className="text-primary italic">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A selection of my recent engineering work, focusing on performance,
                        usability, and clean code.
                    </p>
                </div>

                <div className="flex items-center justify-center w-full">
                    <CardStack
                        items={cardItems}
                        initialIndex={0}
                        autoAdvance
                        intervalMs={3000}
                        pauseOnHover
                        showDots
                    />
                </div>

                {/* View More Button */}
                <div className="flex justify-center pt-8">
                    <Link
                        href="/projects"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 active:scale-95 overflow-hidden"
                    >
                        <span className="relative z-10">View More Projects</span>
                        <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Modal */}
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
