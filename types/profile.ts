export interface RecruitmentProfile {
  id: string;
  job_id: string;
  profile_id: string;
  status: string;
  questions: string | null;
  transcript: string | null;
  interview_feedback: string | null;
  matching_percentage: string;
  interview_time: string;
  interview_link: string | null;
}

export interface Profile {
  encrypted_profile_id: string;
  resume_id: string;
  job_id: string;
  name: string;
  mobile: string;
  email: string;
  role: string;
  resume_text: string;
  status: string;
  percentage_matching: string;
  interviewTime: string;
  actionTaken: string;
  takeInterview:string;
  assessmentReport:string;
  recruitment_profiles: RecruitmentProfile[];
}
