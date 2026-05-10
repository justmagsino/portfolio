import { Skill } from "@/models/portfolio";

interface SkillsProps {
    skills: Skill[];
}

const iconMap: Record<string, React.ReactNode> = {
    "HTML5": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4zm13.2 5H8.8l.2 2h8l-.6 6.5L12 18l-4.4-1.5-.3-3.2h2l.2 1.7L12 16l2.5-.8.3-2.7H7.7L7.2 8h9.3l-.3-1.5L12 6l-4 .5-.2-2h8.8l-.4 3.5z" />
        </svg>
    ),
    "CSS3": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4zm13.5 4.5l-.3 3H9.2l.2 2.2h7.6l-.9 5.3L12 19l-4.1-1-.3-2.8h2l.1 1.4 2.3.5 2.3-.5.3-2.7H8.8l-.6-7.4H16l-.1-1.4z" />
        </svg>
    ),
    "JavaScript": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="2" opacity="0.2" />
            <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="4.5" y="16.5" fontSize="9.5" fontWeight="bold" fill="currentColor">JS</text>
        </svg>
    ),
    "TypeScript": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="2" opacity="0.2" />
            <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="4" y="16.5" fontSize="9" fontWeight="bold" fill="currentColor">TS</text>
        </svg>
    ),
    "React": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <ellipse cx="12" cy="12" rx="10" ry="3.5" />
            <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
        </svg>
    ),
    "Laravel": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M23.354 5.672L12.56 0.125a.853.853 0 0 0-.756 0L1.01 5.672a.854.854 0 0 0-.41.756v11.144a.853.853 0 0 0 .41.756l10.794 5.547a.853.853 0 0 0 .756 0l10.794-5.547a.853.853 0 0 0 .41-.756V6.428a.854.854 0 0 0-.41-.756zM12.182 2.2l8.84 4.542-3.414 1.755-8.84-4.542L12.182 2.2zm-8.84 5.3l3.414-1.755 8.84 4.542-3.414 1.755-8.84-4.542zm0 1.71l8.84 4.542v9.084l-8.84-4.542V9.21zm10.55 13.626v-9.084l8.84-4.542v9.084l-8.84 4.542z"/>
        </svg>
    ),
    "Python": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M12 2C9.346 2 7.2 4.146 7.2 6.8v1.333H12v1.333H5.867c-1.472 0-2.667 1.195-2.667 2.667s1.195 2.667 2.667 2.667h1.333v-1.333c0-2.21 1.79-4 4-4h.267c2.21 0 4 1.79 4 4v1.333h.533c1.472 0 2.667-1.195 2.667-2.667s-1.195-2.667-2.667-2.667H17.2V6.8c0-2.654-2.146-4.8-4.8-4.8H12zm-.4 2.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm.4 9.6v1.333h-1.333c-2.21 0-4 1.79-4 4s1.79 4 4 4h.8c2.21 0 4-1.79 4-4V20h5.333c1.472 0 2.667-1.195 2.667-2.667s-1.195-2.667-2.667-2.667H17.2v1.333c0 2.21-1.79 4-4 4h-.8c-2.21 0-4-1.79-4-4V14h4.4zm.4 5.2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" />
        </svg>
    ),
    "MySQL": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M12 3C8.5 3 6 4.3 6 6v12c0 1.7 2.5 3 6 3s6-1.3 6-3V6c0-1.7-2.5-3-6-3zm0 2c2.8 0 4 .9 4 1s-1.2 1-4 1-4-.9-4-1 1.2-1 4-1zm4 13c0 .1-1.2 1-4 1s-4-.9-4-1V8.8C9.2 9.5 10.6 10 12 10s2.8-.5 4-1.2V18z" />
        </svg>
    ),
    "Git": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M21.7 11.3l-9-9a1 1 0 00-1.4 0l-2 2 2.5 2.5a1.2 1.2 0 011.5 1.5l2.4 2.4a1.2 1.2 0 11-1 1l-2.2-2.2v5.8a1.2 1.2 0 11-1.5 0V9.4a1.2 1.2 0 01-.6-1.9L8 5a1 1 0 00-1.4 0l-4.3 4.3a1 1 0 000 1.4l9 9a1 1 0 001.4 0l9-9a1 1 0 000-1.4z" />
        </svg>
    ),
    "Flutter": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M14.5 2L5 11.5l3 3 3-3L21 21h-6l-3.5-3.5-3.5 3.5H2l8-8-3-3L14.5 2z" />
        </svg>
    ),
    "Java": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M8.5 18s-1.5.9 1 1.2c3 .4 4.6.3 8-.3 0 0 .9.5 2.1 1-7.4 3.2-16.8-.2-11.1-1.9zm-.9-2.8s-1.7 1.2.9 1.5c3.2.4 5.7.4 10-.6 0 0 .6.6 1.6.9-8.9 2.6-18.7.2-12.5-1.8z" />
            <path d="M14.5 11.8s2 1.6-1.9 2c-6.7.8-9.6-.3-9.6-.3s-.9-1 .5-2.5c2-2 8-3.1 8.1-7 .1-1.9-1.2-3.4-1.2-3.4s3.3-.6 5 2.5c.7 1.4.4 3-.4 4.2-1.3 1.8-2.5 3.4.5 4.5z" />
            <path d="M15 20.5s1.1.9-.2 1.6c-2.2 1.1-8.5 1.4-10.3.1-1.3-.9.6-2.2.6-2.2s-.7 1.4 4.8 1.8c5.1.4 7.1-1.3 5.1-1.3z" />
        </svg>
    ),
    "PHP": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
            <text x="5.5" y="15.5" fontSize="8" fontWeight="bold" fill="currentColor">PHP</text>
        </svg>
    ),
    "n8n": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="5" cy="12" r="2.5" />
            <circle cx="19" cy="6" r="2.5" />
            <circle cx="19" cy="18" r="2.5" />
            <path d="M7.5 12h9M16.5 6L7.5 12M16.5 18L7.5 12" />
        </svg>
    ),
    "Tailwind": (
        <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
            <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.667 1.715 1.215C13.29 10.48 14.21 11.43 16.5 11.43c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.667-1.715-1.215C15.21 6.95 14.29 6 12 6zM7.5 11.43c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.667 1.715 1.215C8.79 15.91 9.71 16.86 12 16.86c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.667-1.715-1.215C10.71 12.38 9.79 11.43 7.5 11.43z" />
        </svg>
    ),
};

export function Skills({ skills }: SkillsProps) {
    return (
        <section id="skills" className="py-24 px-4">
            <div className="max-w-5xl mx-auto space-y-14">
                {/* Header */}
                <div className="text-center space-y-3">
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest">Expertise</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                        Technical <span className="text-primary italic">Skills</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                        As a BSIT graduate, I bring a detail-oriented mindset and strong eagerness to grow in the tech industry.
                    </p>
                </div>

                {/* Single flat icon grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border/50 bg-card/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-default hover:-translate-y-1"
                        >
                            <div className="text-primary/70 group-hover:text-primary transition-colors">
                                {iconMap[skill.name] ?? (
                                    <span className="flex items-center justify-center w-9 h-9 text-xs font-bold">
                                        {skill.name.slice(0, 2).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground font-medium text-center leading-tight transition-colors">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
