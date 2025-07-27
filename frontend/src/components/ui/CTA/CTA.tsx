import React from "react";
import { Linkedin } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function CTA() {
    return (
        <section id="cta" className="py-20 px-6 relative">
            <div className="max-w-4xl mx-auto">
                <FadeIn
                    as="div"
                    direction="up"
                    distance={32}
                    duration={0.5}
                    delay={0.5}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl font-bold mb-4 text-white">Helping you kickstart your career</h2>
                    <p className="text-lg text-mirage-300">Turn your dev activity into a professional resume</p>
                </FadeIn>

                <div className="relative backdrop-blur-sm p-24 rounded-2xl border border-mirage-800/50 transition-all text-center duration-150 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-mirage-800/10 to-transparent" />

                    <Linkedin className="absolute text-white/5 w-32 md:w-64 h-64 -top-10 -right-10 transform rotate-12 pointer-events-none z-10" />

                    <Linkedin className="absolute text-white/5 w-16 md:w-32 h-32 top-10 left-10 transform -rotate-45 pointer-events-none z-10" />

                    <div className="relative z-20">
                        <FadeIn
                            as="p"
                            direction="up"
                            distance={24}
                            duration={0.5}
                            delay={0.5}
                            className="font-light text-lg text-gray-400"
                        >
                            Let&#39;s face it
                        </FadeIn>
                        <FadeIn
                            as="p"
                            direction="up"
                            distance={32}
                            duration={0.5}
                            delay={1.3}
                            className="font-semibold text-4xl mb-2"
                        >
                            It&#39;s time to
                        </FadeIn>
                        <FadeIn
                            as="p"
                            direction="up"
                            distance={32}
                            duration={0.5}
                            delay={2.3}
                            className="font-black text-5xl"
                        >
                            get a job
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
