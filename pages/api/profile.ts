
import axios from "axios";
import { recruit } from "./apiurls";


export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ApiClient = axios.create({
  baseURL: apiUrl,
});


export const CreateResume = async (formData: FormData) => {
    const res = await ApiClient.post(`${recruit}/profile/create/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };
  
  export const GetRelavanentProfile = async () =>{
    const res = await ApiClient.get(`${recruit}/job/find_profile/`)
    return res.data  
  }

  export const GetProfileById = async (id:string)=>{
    const res = await ApiClient.get(`${recruit}/profile/resume/${id}/`)
    return res.data
  }

  interface RecruitData {
    JobId:String,
    ProfileId:String,
    interviewTime:String,
  }

  export const UpdateInterViewDateTime = async (data:RecruitData) => {
    const res =  await ApiClient.put(`${recruit}/${data.JobId}/${data.ProfileId}`,data.interviewTime);
    return res.data
  };