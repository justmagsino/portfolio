import { useState } from "react";
import { Mail, Phone, MapPin, FileText, Check } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
    const [copied, setCopied] = useState<{ phone: boolean; address: boolean; email: boolean }>({
        phone: false,
        address: false,
        email: false,
    });

    const handleCopy = async (key: "phone" | "address" | "email", text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const el = document.createElement("textarea");
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
        }
        setCopied((prev) => ({ ...prev, [key]: true }));
        setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
    };

    return (
        <section id="contact" className="relative py-24 px-4 overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-3"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                        Let&apos;s <span className="text-primary italic">Connect</span>
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Interested in working together? Feel free to reach out!
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-visible"
                >
                    {/* Gmail — copies to clipboard */}
                    <div className="relative">
                        <span
                            className={`absolute -top-8 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-lg whitespace-nowrap transition-all duration-300 ${
                                copied.email ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0 pointer-events-none"
                            }`}
                        >
                            Copied!
                        </span>
                        <button
                            onClick={() => handleCopy("email", "justmagsino6@gmail.com")}
                            className="flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer group text-center w-full shadow-sm hover:shadow-primary/5"
                            title="Click to copy email"
                        >
                            {copied.email ? (
                                <Check className="w-6 h-6 text-green-500 transition-all duration-200" />
                            ) : (
                                <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                            )}
                            <span className="text-sm text-foreground/80 font-medium">justmagsino6@gmail.com</span>
                        </button>
                    </div>

                    {/* Phone — copies to clipboard */}
                    <div className="relative">
                        <span
                            className={`absolute -top-8 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-lg whitespace-nowrap transition-all duration-300 ${
                                copied.phone ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0 pointer-events-none"
                            }`}
                        >
                            Copied!
                        </span>
                        <button
                            onClick={() => handleCopy("phone", "+639813775595")}
                            className="flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer group text-center w-full shadow-sm hover:shadow-primary/5"
                            title="Click to copy number"
                        >
                            {copied.phone ? (
                                <Check className="w-6 h-6 text-green-500 transition-all duration-200" />
                            ) : (
                                <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                            )}
                            <span className="text-sm text-foreground/80 font-medium">+63 981 377 5595</span>
                        </button>
                    </div>

                    {/* Location — copies to clipboard */}
                    <div className="relative">
                        <span
                            className={`absolute -top-8 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-lg whitespace-nowrap transition-all duration-300 ${
                                copied.address ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0 pointer-events-none"
                            }`}
                        >
                            Copied!
                        </span>
                        <button
                            onClick={() => handleCopy("address", "Binangonan Rizal, PH")}
                            className="flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer group text-center w-full shadow-sm hover:shadow-primary/5"
                            title="Click to copy address"
                        >
                            {copied.address ? (
                                <Check className="w-6 h-6 text-green-500 transition-all duration-200" />
                            ) : (
                                <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                            )}
                            <span className="text-sm text-foreground/80 font-medium">Binangonan Rizal, PH</span>
                        </button>
                    </div>
                </motion.div>

                {/* View Resume button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ 
                        duration: 0.6, 
                        delay: 0.4, 
                        type: "spring",
                        bounce: 0.4
                    }}
                >
                    <a
                        href="/Magsino Resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20"
                    >
                        <FileText className="w-4 h-4" />
                        View Resume
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
