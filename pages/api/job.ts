import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ApiClient = axios.create({
  baseURL: apiUrl,
});


interface CreateJobData {
  company_name: string;
  role: string;
  skills: string;
  location: string;
  project_experience: string;
  other_details?: string;
  linkedin_saved:boolean;
}

export const createJob = async (data: CreateJobData) => {
  const res =  await ApiClient.post("/api/jobs/create/", data);
  return res.data
};

interface UpdateJobData {
  company_name: string;
  role: string;
  skills: string;
  location: string;
  project_experience: string;
  other_details?: string;
  job_description: string,
  evaluation_criteria: string,
  linkedin_saved:boolean,
  encrypted_id:string

}

export const updateJob = async (data:UpdateJobData)=>{
  const res =  await ApiClient.put(`/api/jobs/update/${data.encrypted_id}`, data);
  return res.data

}

export const GetJobsList = async () => {
  const res =  await ApiClient.get("/api/jobs/");
  return res.data
};

export const GetJobsListById = async (id:string) => {
  const res =  await ApiClient.get(`/api/jobs/${id}`);
  return res.data
};




