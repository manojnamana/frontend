import axios from "axios";
import { recruit } from "./apiurls";

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
  const res =  await ApiClient.post(`${recruit}/jobs/create/`, data);
  return res.data
};

interface UpdateJobData {
  job_company_name: string;
  role: string;
  skills: string;
  location: string;
  project_experience: string;
  other_details?: string;
  job_description: string,
  evaluation_criteria: string,
  linkedin_saved:boolean,
  decrypted_id:string

}

export const updateJob = async (data:UpdateJobData)=>{
  const res =  await ApiClient.put(`${recruit}/jobs/update/${data.decrypted_id}/`, data);
  return res.data

}

export const GetJobsList = async () => {
  const res =  await ApiClient.get(`${recruit}/jobs/`);
  return res.data
};

export const GetJobsListById = async (id:string|null) => {
  const res =  await ApiClient.get(`${recruit}/jobs/${id}/`);
  return res.data
};




