export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    images?: string[];
    tags: string[];
    githubUrl: string;
    liveUrl: string;
    projectType?: string;
}

export interface Skill {
    name: string;
    category: "Frontend" | "Backend" | "DevOps" | "Database";
    icon: string;
}

export interface PortfolioData {
    projects: Project[];
    skills: Skill[];
}
