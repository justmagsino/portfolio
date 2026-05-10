"use client"

import { useState } from "react"
import { Project } from "@/models/portfolio"
import { ProjectModal } from "@/views/components/ui/project-modal"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectGridProps {
    projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    const [selected, setSelected] = useState<Project | null>(null)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="group relative bg-card/20 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
                        onClick={() => setSelected(project)}
                        whileHover="hovered"
                    >
                        {/* Image Container */}
                        <div className="relative h-64 w-full overflow-hidden bg-black/40">
                            {/* Background Blur */}
                            <Image
                                src={project.image}
                                alt=""
                                fill
                                className="object-cover blur-2xl opacity-40 scale-110"
                                draggable={false}
                            />
                            {/* Main Image */}
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                                priority={index <= 2}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Info */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 overflow-hidden">
                                    <motion.div
                                        variants={{
                                            hovered: { x: "-20%" }
                                        }}
                                        transition={{ duration: 3, ease: "linear" }}
                                    >
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors whitespace-nowrap">
                                            {project.title}
                                        </h3>
                                    </motion.div>
                                </div>
                                {project.projectType && (
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest whitespace-nowrap">
                                        {project.projectType}
                                    </span>
                                )}
                            </div>
                            
                            <div className="overflow-hidden -mr-6 pr-6">
                                <motion.div 
                                    className="flex flex-nowrap gap-2 pb-1"
                                    variants={{
                                        hovered: { x: "-30%" }
                                    }}
                                    transition={{ duration: 3, ease: "linear" }}
                                >
                                    {project.tags.map((tag) => (
                                        <span 
                                            key={tag}
                                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10 text-neutral-400 group-hover:text-neutral-300 transition-colors whitespace-nowrap"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </>
    )
}
