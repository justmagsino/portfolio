import { motion } from "framer-motion";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";
import { 
    Code2, 
    Database, 
    Layers, 
    Smartphone, 
    Cpu, 
    Globe, 
    Terminal, 
    Workflow, 
    Palette,
    Braces,
    Coffee,
    Search,
    Github
} from "lucide-react";

const techStack: TimelineItem[] = [
    {
        id: 1,
        title: "Frontend Development",
        date: "Main Stack",
        content: "Building responsive and interactive user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.",
        category: "Frontend",
        icon: Globe,
        relatedIds: [2, 3, 4],
        status: "completed",
        energy: 95,
    },
    {
        id: 2,
        title: "React / Next.js",
        date: "Expertise",
        content: "Deep experience with React 19, Next.js App Router, and state management libraries.",
        category: "Frontend",
        icon: Code2,
        relatedIds: [1, 4],
        status: "completed",
        energy: 90,
    },
    {
        id: 3,
        title: "TypeScript / JS",
        date: "Core Language",
        content: "Strong foundation in typed JavaScript for building scalable and maintainable applications.",
        category: "Frontend",
        icon: Braces,
        relatedIds: [1, 2],
        status: "completed",
        energy: 88,
    },
    {
        id: 4,
        title: "Tailwind CSS",
        date: "Styling",
        content: "Crafting beautiful, performant UI components with a utility-first approach.",
        category: "Design",
        icon: Palette,
        relatedIds: [1, 2],
        status: "completed",
        energy: 92,
    },
    {
        id: 5,
        title: "Backend Development",
        date: "Full Stack",
        content: "Developing robust server-side logic and APIs using Laravel, PHP, and Python.",
        category: "Backend",
        icon: Database,
        relatedIds: [6, 7],
        status: "completed",
        energy: 85,
    },
    {
        id: 6,
        title: "Laravel / PHP",
        date: "Primary Backend",
        content: "Building enterprise-grade applications with Laravel's elegant ecosystem.",
        category: "Backend",
        icon: Layers,
        relatedIds: [5, 7],
        status: "completed",
        energy: 80,
    },
    {
        id: 7,
        title: "Python / AI",
        date: "Automation",
        content: "Integrating AI tools and automating complex workflows with Python and n8n.",
        category: "Backend",
        icon: Cpu,
        relatedIds: [5, 6, 9],
        status: "completed",
        energy: 75,
    },
    {
        id: 8,
        title: "Mobile (Flutter)",
        date: "Cross-Platform",
        content: "Building beautiful native applications for iOS and Android using a single codebase.",
        category: "Mobile",
        icon: Smartphone,
        relatedIds: [1, 5],
        status: "in-progress",
        energy: 70,
    },
    {
        id: 9,
        title: "n8n / Automation",
        date: "Workflow",
        content: "Connecting services and automating business processes without writing manual glue code.",
        category: "Tools",
        icon: Workflow,
        relatedIds: [7, 10],
        status: "in-progress",
        energy: 60,
    },
    {
        id: 10,
        title: "Git / DevOps",
        date: "Tools",
        content: "Version control and CI/CD pipelines to ensure code quality and deployment efficiency.",
        category: "Tools",
        icon: Github,
        relatedIds: [9],
        status: "completed",
        energy: 85,
    }
];

export function Skills() {
    return (
        <section id="skills" className="relative py-24 px-4 overflow-hidden min-h-[500px] md:min-h-[600px]">
            <div className="relative z-10 max-w-6xl mx-auto space-y-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-3"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                        Tech <span className="text-primary italic">Stack</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                        Explore the technologies I use to build complete digital experiences. Click on a node to see more details.
                    </p>
                </motion.div>

                {/* Orbital Timeline */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ 
                        duration: 1, 
                        delay: 0.2, 
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 50
                    }}
                    className="w-full"
                >
                    <RadialOrbitalTimeline timelineData={techStack} />
                </motion.div>
            </div>
        </section>
    );
}
