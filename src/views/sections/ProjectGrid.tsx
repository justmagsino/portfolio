"use client"

import { useState, useRef, useEffect } from "react"
import { Project } from "@/models/portfolio"
import { ProjectModal } from "@/views/components/ui/project-modal"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"
import { MarqueeText } from "@/components/ui/marquee-text"

interface ProjectGridProps {
    projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    const [selected, setSelected] = useState<Project | null>(null)
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    return (
        <>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                {projects.map((project, index) => {
                    const isHovered = hoveredId === project.id;
                    return (
                        <motion.div
                            key={project.id}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: 10 },
                                show: { opacity: 1, scale: 1, y: 0, rotateX: 0 }
                            }}
                            transition={{ 
                                duration: 0.7, 
                                ease: [0.21, 1.11, 0.81, 0.99]
                            }}
                            viewport={{ once: false, margin: "-50px" }}
                            className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
                            onClick={() => setSelected(project)}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Image Container */}
                            <div className="relative h-64 w-full overflow-hidden bg-muted/30 dark:bg-black/40">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    quality={75}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain p-4 transition-all duration-700 group-hover:scale-110"
                                    priority={index === 0}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Info */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <MarqueeText className="w-full" isHovered={isHovered} speed={1.2}>
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </MarqueeText>
                                    </div>
                                    {project.projectType && (
                                        <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest whitespace-nowrap">
                                            {project.projectType}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="w-full">
                                    <MarqueeText className="w-full" speed={1.5} isHovered={isHovered}>
                                        <div className="flex gap-2">
                                            {project.tags.map((tag) => (
                                                <span 
                                                    key={tag}
                                                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-foreground/5 border border-border text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </MarqueeText>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </>
    )
}
