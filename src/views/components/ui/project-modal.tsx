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

    useEffect(() => { setCurrent(0); setFullscreen(false); }, [project]);

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
                className="fixed inset-0 z-[60] flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
                onClick={() => setFullscreen(false)}
            >
                <button
                    onClick={() => setFullscreen(false)}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 border border-white/20 hover:border-white/40 text-white transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                {images.length > 1 && (
                    <>
                        <button onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 border border-white/20 hover:bg-black/90 text-white transition-all z-10">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 border border-white/20 hover:bg-black/90 text-white transition-all z-10">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={images[current]}
                    alt={`${project.title} screenshot ${current + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{ maxWidth: "85vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 12 }}
                    draggable={false}
                />

                {/* Dot indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, i) => (
                            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                                className="rounded-full transition-all"
                                style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? "#38bdf8" : "rgba(255,255,255,0.35)" }}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
        >
            <div
                className="relative bg-[#0e1628] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                style={{ width: "100%", maxWidth: 680, maxHeight: "90vh", display: "flex", flexDirection: "column" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button onClick={onClose}
                    className="absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all">
                    <X className="w-4 h-4" />
                </button>

                {/* ── IMAGE (click to fullscreen) ── */}
                <div
                    className="relative shrink-0 cursor-zoom-in p-6"
                    style={{ height: 320, backgroundColor: "#000" }}
                    onClick={() => setFullscreen(true)}
                    title="Click to fullscreen"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={images[current]}
                        alt={`${project.title} screenshot ${current + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", backgroundColor: "#000" }}
                        draggable={false}
                    />

                    {/* Fullscreen hint */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/50 text-white/50 text-xs">
                        <Maximize2 className="w-3 h-3" /> Click to expand
                    </div>

                    {/* Bottom gradient */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
                        style={{ background: "linear-gradient(to top, rgba(14,22,40,1), transparent)" }} />

                    {/* Prev/Next */}
                    {images.length > 1 && (
                        <>
                            <button onClick={(e) => { e.stopPropagation(); prev(); }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:bg-black/90 text-white transition-all">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); next(); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:bg-black/90 text-white transition-all">
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {images.map((_, i) => (
                                    <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                                        className="rounded-full transition-all"
                                        style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? "#38bdf8" : "rgba(255,255,255,0.35)" }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* ── SCROLLABLE CONTENT ── */}
                <div style={{ overflowY: "auto", flex: 1 }}>
                    <div className="p-6 space-y-5">
                        {/* Title */}
                        <h2 className="text-xl font-bold text-white">{project.title}</h2>

                        {/* Description */}
                        <p className="text-white/60 text-sm leading-relaxed text-justify">{project.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-white/60"
                                    style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Thumbnail strip */}
                        {images.length > 1 && (
                            <div>
                                <p className="text-xs uppercase tracking-widest text-white/30 mb-3 font-semibold">Screenshots</p>
                                <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
                                    {images.map((src, i) => (
                                        <button key={i} onClick={() => setCurrent(i)}
                                            style={{
                                                flexShrink: 0, width: 96, height: 64, borderRadius: 8, overflow: "hidden",
                                                border: `2px solid ${i === current ? "#38bdf8" : "rgba(255,255,255,0.12)"}`,
                                                padding: 0, cursor: "pointer", transition: "border-color 0.2s", backgroundColor: "#000"
                                            }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={src} alt={`Screenshot ${i + 1}`}
                                                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
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
