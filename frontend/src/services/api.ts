import { ResumeGenReq, ResumeGenRsp } from "@/types/resume";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

class ApiService {
    async generateResume(data: ResumeGenReq): Promise<{ blob: Blob; filename: string }> {
        console.log("TEST: Generating resume with data:", data);
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            let errorMessage = "Something went wrong";
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch {
                errorMessage = "Failed to parse error response";
            }
            throw new ApiError(errorMessage, "API_ERROR", response.status);
        }

        return { blob: await response.blob(), filename: "generated_resume.docx" };
    }
}

export const apiService = new ApiService();

export class ApiError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number,
    ) {
        super(message);
        this.name = "ApiError";
    }
}
