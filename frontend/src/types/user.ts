export interface SocialProfiles {
    github_user?: string;
    leetcode_user?: string;
    bootdev_user?: string;
    personal_profile?: PersonalProfile;
    format?: "docx" | "pdf";
}

export interface PersonalProfile {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
}
