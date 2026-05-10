import { Mail, Phone, MapPin, FileText } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="relative py-24 px-4 overflow-hidden">
            
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">

                {/* Header */}
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Let&apos;s <span className="text-primary italic">Connect</span>
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Interested in working together? Feel free to reach out!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                        className="flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                        <Mail className="w-6 h-6 text-primary" />
                        <span className="text-sm text-foreground/80 font-medium">justmagsino6@gmail.com</span>
                    </div>

                    <div
                        className="flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                        <Phone className="w-6 h-6 text-primary" />
                        <span className="text-sm text-foreground/80 font-medium">+63 981 377 5595</span>
                    </div>

                    <div
                        className="flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                        <MapPin className="w-6 h-6 text-primary" />
                        <span className="text-sm text-foreground/80 font-medium">Binangonan Rizal, PH</span>
                    </div>
                </div>

                {/* View Resume button */}
                <div>
                    <a
                        href="/Magsino Resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20"
                    >
                        <FileText className="w-4 h-4" />
                        View Resume
                    </a>
                </div>
            </div>
        </section>
    );
}
