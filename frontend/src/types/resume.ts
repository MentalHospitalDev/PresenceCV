export interface PersonalInfo {
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

export interface ResumeGenReq {
    github_user?: string;
    leetcode_user?: string;
    bootdev_user?: string;
    summarize?: boolean;
    personal?: PersonalInfo;
}

export interface ResumeGenRsp {
    status: string;
    message: string;
    docx_filename: string;
    resume_id: string;
}
