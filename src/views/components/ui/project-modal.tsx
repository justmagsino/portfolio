"use client";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Project } from "@/models/portfolio";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [current, setCurrent] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const images = project?.images ?? (project ? [project.image] : []);

    const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

    useEffect(() => { 
        setCurrent(0); 
        setFullscreen(false); 
    }, [project]);

    useEffect(() => {
        if (!project) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") { if (fullscreen) setFullscreen(false); else onClose(); }
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [project, onClose, prev, next, fullscreen]);

    useEffect(() => {
        document.body.style.overflow = project ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [project]);

    if (!project) return null;

    /* ── FULLSCREEN VIEWER ── */
    if (fullscreen) {
        return (
            <div
                className="fixed inset-0 z-[200] flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
                onClick={() => setFullscreen(false)}
            >
                <button
                    onClick={() => setFullscreen(false)}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 border border-white/20 hover:border-white/40 text-white transition-all"
                >
                    <X className="w-6 h-6" />
                </button>

                {images.length > 1 && (
                    <>
                        <button onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-black/60 border border-white/20 hover:bg-black/90 text-white transition-all z-10">
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-black/60 border border-white/20 hover:bg-black/90 text-white transition-all z-10">
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </>
                )}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={images[current]}
                    alt={`${project.title} screenshot ${current + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 12 }}
                    draggable={false}
                />

                {/* Dot indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                        {images.map((_, i) => (
                            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                                className="rounded-full transition-all"
                                style={{ width: i === current ? 24 : 10, height: 10, backgroundColor: i === current ? "#38bdf8" : "rgba(255,255,255,0.35)" }}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    /* ── MODAL ── */
    return (
        <div
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
            style={{ 
                backgroundColor: "rgba(0,0,0,0.8)", 
                backdropFilter: typeof window !== 'undefined' && window.innerWidth < 768 ? "none" : "blur(12px)" 
            }}
            onClick={onClose}
        >
            <div
                className="relative bg-card border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col w-full animate-in fade-in zoom-in duration-300"
                style={{ maxWidth: 720, height: "85vh", maxHeight: 900, overscrollBehavior: "contain" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button (Fixed) */}
                <button onClick={onClose}
                    className="absolute top-5 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/70 hover:scale-110 active:scale-95 transition-all shadow-xl">
                    <X className="w-5 h-5" />
                </button>

                {/* Single Scrollable Area */}
                <div className="overflow-y-auto flex-1 scrollbar-none sm:scrollbar-thin">
                    
                    {/* ── IMAGE SECTION ── */}
                    <div
                        className="relative shrink-0 cursor-zoom-in p-8 bg-muted/10 dark:bg-black/20 flex items-center justify-center min-h-[300px] sm:min-h-[420px]"
                        onClick={() => setFullscreen(true)}
                        title="Click to expand"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={images[current]}
                            alt={`${project.title} screenshot ${current + 1}`}
                            className="relative z-[1] drop-shadow-2xl"
                            style={{ width: "100%", height: "auto", maxHeight: "50vh", objectFit: "contain", display: "block", borderRadius: 16 }}
                            draggable={false}
                        />

                        {/* Fullscreen hint */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/70 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                            <Maximize2 className="w-3 h-3" /> Click to expand
                        </div>

                        {/* Prev/Next Navigation */}
                        {images.length > 1 && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); prev(); }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/80 text-white transition-all shadow-lg active:scale-90">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); next(); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/80 text-white transition-all shadow-lg active:scale-90">
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, i) => (
                                        <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                                            className="rounded-full transition-all"
                                            style={{ width: i === current ? 24 : 8, height: 8, backgroundColor: i === current ? "#38bdf8" : "rgba(255,255,255,0.25)" }}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* ── CONTENT SECTION ── */}
                    <div className="p-8 sm:p-12 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
                                {project.title}
                            </h2>
                            <div className="h-1 w-20 bg-primary rounded-full" />
                        </div>

                        <div className="space-y-6">
                            <p className="text-muted-foreground text-lg leading-relaxed text-justify">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2.5">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-border/50 text-muted-foreground bg-foreground/5 transition-colors hover:border-primary/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Thumbnail strip */}
                        {images.length > 1 && (
                            <div className="pt-4 space-y-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 font-black">Screenshots</p>
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-2 px-2">
                                    {images.map((src, i) => (
                                        <button key={i} onClick={() => setCurrent(i)}
                                            className="relative shrink-0 rounded-2xl overflow-hidden bg-muted/20 border-2 transition-all duration-300"
                                            style={{
                                                width: 140, height: 80,
                                                borderColor: i === current ? "hsl(var(--primary))" : "transparent",
                                                opacity: i === current ? 1 : 0.6,
                                                transform: i === current ? "scale(1.05)" : "scale(1)"
                                            }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={src} alt={`Screenshot ${i + 1}`}
                                                className="w-full h-full object-cover"
                                                draggable={false} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

