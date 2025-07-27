import { useState } from "react";
import { ResumeGenRsp } from "@/types/resume";
import { validateProfiles, extractUsername, downloadFile } from "@/utils/validation";
import { ApiError, apiService } from "@/services/api";
import { SocialProfiles } from "@/types/user";

interface UseResumeGenRet {
    isLoading: boolean;
    isDownloading: boolean;
    error: string | null;
    success: boolean;
    resumeData: ResumeGenRsp | null;
    generateResume: (profiles: SocialProfiles) => Promise<void>;
    downloadResume: () => Promise<void>;
    resetState: () => void;
}

export const useResumeGen = (): UseResumeGenRet => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [resumeData, setResumeData] = useState<ResumeGenRsp | null>(null);

    const generateResume = async (profiles: SocialProfiles) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        setResumeData(null);

        try {
            const validation = validateProfiles(profiles);
            if (!validation.isValid) {
                const firstError = Object.values(validation.errors)[0];
                throw new Error(firstError);
            }

            const requestData = {
                github_user: extractUsername(profiles.github_user!, "github"),
                leetcode_user: profiles.leetcode_user ? extractUsername(profiles.leetcode_user, "leetcode") : undefined,
                bootdev_user: profiles.bootdev_user ? extractUsername(profiles.bootdev_user, "bootdev") : undefined,
                summarize: false,
            };

            const cleanedData = Object.fromEntries(
                Object.entries(requestData).filter(([_, value]) => value !== undefined),
            );

            const response = await apiService.generateResume(cleanedData);

            if (response.status === "success") {
                setSuccess(true);
                setResumeData(response);
            } else {
                throw new Error(response.message || "Failed to generate resume");
            }
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

    const downloadResume = async () => {
        if (!resumeData?.resume_id) {
            setError("No resume available for download");
            return;
        }

        setIsDownloading(true);
        setError(null);

        try {
            const blob = await apiService.downloadResume(resumeData.resume_id);
            downloadFile(blob, resumeData.docx_filename);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(`Download failed: ${err.message}`);
            } else if (err instanceof Error) {
                setError(`Download failed: ${err.message}`);
            } else {
                setError("Download failed: An unexpected error occurred");
            }
        } finally {
            setIsDownloading(false);
        }
    };

    const resetState = () => {
        setIsLoading(false);
        setIsDownloading(false);
        setError(null);
        setSuccess(false);
        setResumeData(null);
    };

    return {
        isLoading,
        isDownloading,
        error,
        success,
        resumeData,
        generateResume,
        downloadResume,
        resetState,
    };
};
