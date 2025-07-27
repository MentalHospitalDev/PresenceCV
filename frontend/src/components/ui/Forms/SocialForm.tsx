import React, { useState } from "react";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    Code,
    Github,
    Loader2,
    ChevronDown,
    ChevronUp,
    User,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Globe,
} from "lucide-react";
import Image from "next/image";
import { useResumeGen } from "@/hooks/useResumeGen";
import { SocialProfiles, PersonalProfile } from "@/types/user";
import { TwitterX } from "@/components/icons/icons";
import { FadeIn } from "@/components/ui/FadeIn";

interface FormData {
    github: string;
    leetcode: string;
    bootdev: string;
    personal: PersonalProfile;
    format: "docx" | "pdf";
}

export default function SocialForm() {
    const [formData, setFormData] = useState<FormData>({
        github: "",
        leetcode: "",
        bootdev: "",
        personal: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            github: "",
            twitter: "",
            website: "",
        },
        format: "pdf",
    });

    const [isPersonalExpanded, setIsPersonalExpanded] = useState(false);
    const { isLoading, error, success, generateResume, resetState } = useResumeGen();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error || success) {
            resetState();
        }

        const { name, value } = e.target;

        if (name.startsWith("personal.")) {
            const personalField = name.replace("personal.", "") as keyof PersonalProfile;
            setFormData((prev) => ({
                ...prev,
                personal: {
                    ...prev.personal,
                    [personalField]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const hasPersonalData = Object.values(formData.personal).some((value) => value?.trim());

        const profiles: SocialProfiles = {
            github_user: formData.github || undefined,
            leetcode_user: formData.leetcode || undefined,
            bootdev_user: formData.bootdev || undefined,
            personal_profile: hasPersonalData ? formData.personal : undefined,
            format: formData.format,
        };

        await generateResume(profiles);
    };

    const togglePersonalSection = () => {
        setIsPersonalExpanded(!isPersonalExpanded);
    };

    return (
        <FadeIn
            as="div"
            direction="up"
            distance={40}
            duration={0.5}
            delay={0.5}
            className="max-w-2xl mx-auto bg-mirage-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-mirage-700/70 shadow-2xl shadow-mirage-600/20 ring-1 ring-mirage-600/30 ring-offset-2 ring-offset-transparent">
            <h2 className="text-2xl font-bold mb-6 text-white">Enter Your Social Profiles</h2>

            {success && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-700/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-green-100 font-medium">Resume generated successfully!</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-100">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
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
                </div>

                <div className="border-t border-mirage-700 pt-6">
                    <button
                        type="button"
                        onClick={togglePersonalSection}
                        className="w-full flex items-center justify-between p-4 bg-mirage-800/30 border border-mirage-700/50 rounded-xl hover:bg-mirage-800/50 transition-all duration-200 group"
                    >
                        <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-mirage-400" />
                            <span className="text-white font-medium">Personal Information</span>
                            <span className="text-mirage-400 text-sm">(Optional)</span>
                        </div>
                        {isPersonalExpanded ? (
                            <ChevronUp className="w-5 h-5 text-mirage-400 group-hover:text-white transition-colors" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-mirage-400 group-hover:text-white transition-colors" />
                        )}
                    </button>

                    {isPersonalExpanded && (
                        <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                                    <input
                                        type="text"
                                        name="personal.first_name"
                                        value={formData.personal.first_name}
                                        onChange={handleInputChange}
                                        placeholder="First Name"
                                        className="w-full pl-12 pr-4 py-3 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                                    />
                                </div>

                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                                    <input
                                        type="text"
                                        name="personal.last_name"
                                        value={formData.personal.last_name}
                                        onChange={handleInputChange}
                                        placeholder="Last Name"
                                        className="w-full pl-12 pr-4 py-3 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                                <input
                                    type="email"
                                    name="personal.email"
                                    value={formData.personal.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                                    <input
                                        type="tel"
                                        name="personal.phone"
                                        value={formData.personal.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        className="w-full pl-12 pr-4 py-3 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                                    />
                                </div>

                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                                    <input
                                        type="text"
                                        name="personal.location"
                                        value={formData.personal.location}
                                        onChange={handleInputChange}
                                        placeholder="Location"
                                        className="w-full pl-12 pr-4 py-3 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                                <input
                                    type="text"
                                    name="personal.linkedin"
                                    value={formData.personal.linkedin}
                                    onChange={handleInputChange}
                                    placeholder="LinkedIn Profile URL"
                                    className="w-full pl-12 pr-4 py-3 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group">
                                    <TwitterX className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                                    <input
                                        type="text"
                                        name="personal.twitter"
                                        value={formData.personal.twitter}
                                        onChange={handleInputChange}
                                        placeholder="Twitter/X Handle"
                                        className="w-full pl-12 pr-4 py-3 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                                    />
                                </div>

                                <div className="relative group">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-mirage-400 w-5 h-5 transition-transform duration-200 group-focus-within:-rotate-12" />
                                    <input
                                        type="url"
                                        name="personal.website"
                                        value={formData.personal.website}
                                        onChange={handleInputChange}
                                        placeholder="Personal Website"
                                        className="w-full pl-12 pr-4 py-3 bg-mirage-800/50 border border-mirage-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-mirage-400 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
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
        </FadeIn>
    );
}
