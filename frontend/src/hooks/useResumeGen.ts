import { useState } from "react";
import { validateProfiles, extractUsername, downloadFile } from "@/utils/validation";
import { SocialProfiles, PersonalProfile } from "@/types/user";
import { ApiError, apiService } from "@/services/api";

interface UseResumeGenRet {
    isLoading: boolean;
    error: string | null;
    success: boolean;
    generateResume: (profiles: SocialProfiles) => Promise<void>;
    resetState: () => void;
}

export const useResumeGen = (): UseResumeGenRet => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const generateResume = async (profiles: SocialProfiles) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const validation = validateProfiles(profiles);
            if (!validation.isValid) {
                const firstError = Object.values(validation.errors)[0];
                throw new Error(firstError);
            }

            let personalInfo = null;
            if (profiles.personal_profile) {
                const filteredPersonal = Object.fromEntries(
                    Object.entries(profiles.personal_profile).filter(([_, value]) => value?.trim()),
                );

                if (Object.keys(filteredPersonal).length > 0) {
                    personalInfo = filteredPersonal;
                }
            }

            const requestData = {
                github_user: extractUsername(profiles.github_user!, "github"),
                leetcode_user: profiles.leetcode_user ? extractUsername(profiles.leetcode_user, "leetcode") : undefined,
                bootdev_user: profiles.bootdev_user ? extractUsername(profiles.bootdev_user, "bootdev") : undefined,
                summarize: false,
                personal: personalInfo,
                format: profiles.format || "docx",
            };

            const cleanedData = Object.fromEntries(
                Object.entries(requestData).filter(([_, value]) => value !== undefined),
            );

            // Expecting the API to return a file blob directly
            const { blob, filename } = await apiService.generateResume(cleanedData);
            downloadFile(blob, filename);

            setSuccess(true);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(`${err.message}`);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        setIsLoading(false);
        setError(null);
        setSuccess(false);
    };

    return {
        isLoading,
        error,
        success,
        generateResume,
        resetState,
    };
};
