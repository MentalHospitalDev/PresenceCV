import React from "react";
import { Linkedin } from "lucide-react";

export default function CTA() {
    return (
        <section id="cta" className="py-20 px-6 relative">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4 text-white">Helping you kickstart your career</h2>
                    <p className="text-lg text-mirage-300">Turn your dev activity into a professional resume</p>
                </div>

                <div className="relative backdrop-blur-sm p-24 rounded-2xl border border-mirage-800/50 transition-all text-center duration-150 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-mirage-800/10 to-transparent" />

                    <Linkedin className="absolute text-white/5 w-32 md:w-64 h-64 -top-10 -right-10 transform rotate-12 pointer-events-none z-10" />

                    <Linkedin className="absolute text-white/5 w-16 md:w-32 h-32 top-10 left-10 transform -rotate-45 pointer-events-none z-10" />

                    <div className="relative z-20">
                        <p className="font-light text-lg text-gray-400">Let&#39;s face it</p>
                        <p className="font-semibold text-4xl mb-2">It&#39;s time to</p>
                        <p className="font-black text-5xl">get a job</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
