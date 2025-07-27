import React, { useState } from "react";
import { ArrowRight, Code, Github, Linkedin } from "lucide-react";

export default function SocialForm() {
    // TODO: use react-hook-form laterr
    const [formData, setFormData] = useState({
        github: "",
        leetcode: "",
        linkedin: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // TODO: add trimming/splitting logic for URLs

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // TODO: add later
    };

    return (
        <div className="max-w-2xl mx-auto bg-mirage-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-mirage-700/70 shadow-2xl shadow-mirage-600/20 ring-1 ring-mirage-600/30 ring-offset-2 ring-offset-transparent">
            <h2 className="text-2xl font-bold mb-6 text-white">Enter Your Social Profiles</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                    <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="GitHub username or URL"
                        className="w-full pl-12 pr-4 py-4 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                    />
                </div>

                <div className="relative group">
                    <Code className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                    <input
                        type="text"
                        name="leetcode"
                        value={formData.leetcode}
                        onChange={handleInputChange}
                        placeholder="LeetCode username or URL (optional)"
                        className="w-full pl-12 pr-4 py-4 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                    />
                </div>

                <div className="relative group">
                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                    <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="LinkedIn profile URL (optional)"
                        className="w-full pl-12 pr-4 py-4 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full group relative bg-mirage-700 hover:bg-mirage-600 text-white px-10 py-4 rounded-xl text-lg font-semibold border border-mirage-600 overflow-hidden transition-all duration-300"
                >
                    <span className="absolute inset-0 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative flex items-center justify-center space-x-3 transition-colors duration-300">
                        <span>Generate My Resume</span>
                        <ArrowRight className="w-5 h-5" />
                    </span>
                </button>
            </form>
        </div>
    );
}
