import React, { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle, Code, Download, Github, Linkedin, Loader2 } from "lucide-react";
import Image from "next/image";
import { useResumeGen } from "@/hooks/useResumeGen";
import { SocialProfiles } from "@/types/user";

interface FormData {
    github: string;
    leetcode: string;
    bootdev: string;
}

export default function SocialForm() {
    const [formData, setFormData] = useState<FormData>({
        github: "",
        leetcode: "",
        bootdev: "",
    });

    const { isLoading, isDownloading, error, success, resumeData, generateResume, downloadResume, resetState } =
        useResumeGen();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error || success) {
            resetState();
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convert form data to SocialProfiles format
        const profiles: SocialProfiles = {
            github_user: formData.github || undefined,
            leetcode_user: formData.leetcode || undefined,
            bootdev_user: formData.bootdev || undefined,
        };

        await generateResume(profiles);
    };

    const handleDownload = async () => {
        await downloadResume();
    };

    return (
        <div className="max-w-2xl mx-auto bg-mirage-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-mirage-700/70 shadow-2xl shadow-mirage-600/20 ring-1 ring-mirage-600/30 ring-offset-2 ring-offset-transparent">
            <h2 className="text-2xl font-bold mb-6 text-white">Enter Your Social Profiles</h2>

            {success && resumeData && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-700/50 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-green-100 font-medium">Resume generated successfully!</p>
                    </div>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Downloading...</span>
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                <span>Download Resume</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-100">{error}</p>
                </div>
            )}

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
                    <Image
                        src="/bootdev-mirage-400.svg"
                        alt="Boot.dev Logo"
                        width={20}
                        height={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12"
                    />

                    <input
                        type="text"
                        name="bootdev"
                        value={formData.bootdev}
                        onChange={handleInputChange}
                        placeholder="Boot.dev username or URL (optional)"
                        className="w-full pl-12 pr-4 py-4 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full group relative bg-mirage-700 hover:bg-mirage-600 text-white px-10 py-4 rounded-xl text-lg font-semibold border border-mirage-600 overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="absolute inset-0 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative flex items-center justify-center space-x-3 transition-colors duration-300">
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Generating Resume...</span>
                            </>
                        ) : (
                            <>
                                <span>Generate My Resume</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </span>
                </button>
            </form>
        </div>
    );
}
