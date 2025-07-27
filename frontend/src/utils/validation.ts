import { SocialProfiles } from "@/types/user";

export const extractUsername = (input: string, platform: "github" | "leetcode" | "bootdev" | "linkedin"): string => {
    const trimmed = input.trim();
    if (!trimmed) return "";

    // cases: https://github.com/taiga74164, github.com/taiga74164, @taiga74164, taiga74164
    // cases: https://leetcode.com/taiga74164, leetcode.com/taiga74164, taiga74164
    // cases: https://www.boot.dev/u/taiga74164, boot.dev/u/taiga74164, @taiga74164, taiga74164
    // cases: https://linkedin.com/in/joaquin74164, linkedin.com/in/joaquin74164
    switch (platform) {
        case "github": {
            const match = trimmed.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\s]+)/);
            if (match) return match[1];
            return trimmed.replace(/^@/, "");
        }

        case "leetcode": {
            const match = trimmed.match(/(?:https?:\/\/)?(?:www\.)?leetcode\.com\/([^\/\s]+)/);
            if (match) return match[1];
            return trimmed;
        }

        case "bootdev": {
            const match = trimmed.match(/(?:https?:\/\/)?(?:www\.)?boot\.dev\/u\/([^\/\s]+)/);
            if (match) return match[1];
            return trimmed.replace(/^@/, "");
        }

        case "linkedin": {
            const match = trimmed.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([^\/\s]+)/);
            if (match) return match[1];
            return trimmed;
        }

        default:
            return trimmed;
    }
};

export const validateProfiles = (profiles: SocialProfiles) => {
    const errors: Record<string, string> = {};

    if (!profiles.github_user?.trim()) {
        errors.github = "GitHub profile is required";
    } else {
        const username = extractUsername(profiles.github_user, "github");
        if (username.length < 1 || username.length > 39) {
            errors.github = "Invalid GitHub username";
        }
    }

    if (profiles.leetcode_user?.trim()) {
        const username = extractUsername(profiles.leetcode_user, "leetcode");
        if (username.length < 1) {
            errors.leetcode = "Invalid LeetCode username";
        }
    }

    if (profiles.bootdev_user?.trim()) {
        const username = extractUsername(profiles.bootdev_user, "bootdev");
        if (username.length < 1) {
            errors.bootdev = "Invalid Boot.dev username";
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
