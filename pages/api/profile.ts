
import axios from "axios";
import { recruit } from "./apiurls";


export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ApiClient = axios.create({
  baseURL: apiUrl,
});


// jobs/matchprofile/[id]

  export const CreateResume = async (formData: FormData,jobId:string) => {
      const res = await ApiClient.post(`${recruit}/profile/create/${jobId}`, formData, {
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



  //take interview

  export const GetIntervieScheduledProfiles = async () =>{
    const res = await ApiClient.get(`${recruit}/scheduled-interviews/`)
    return res.data  
  }

  export const CreateAssessmetReport = async (formData: FormData,recruitId:string) => {
    const res = await ApiClient.post(`${recruit}/profile/generate-assessment-report/${recruitId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };


  // Assement Report 
  
  export const GetAssementReportAssignedProfiles = async () =>{
    const res = await ApiClient.get(`${recruit}/assessment-report/`)
    return res.data  
  }



  