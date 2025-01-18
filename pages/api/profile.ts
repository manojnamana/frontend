
import axios from "axios";
import { recruit } from "./apiurls";


export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ApiClient = axios.create({
  baseURL: apiUrl,
});


// jobs/matchprofile/[id]

  export const CreateResume = async (formData: FormData,jobId:string) => {
      const res = await ApiClient.post(`${recruit}/profile/create/${jobId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    };

  
  export const GetRelavanentProfile = async (jobId:string) =>{
    const res = await ApiClient.get(`${recruit}/jobs/profiles/${jobId}`)
    return res.data  
  }

  export const GetProfileById = async (id:string)=>{
    const res = await ApiClient.get(`${recruit}/profile/resume/${id}/`)
    return res.data
  }

  interface RecruitData {
    recruitID:String,
    interview_time:String,

  }

  export const UpdateInterViewDateTime = async (data:RecruitData) => {
    const res =  await ApiClient.put(`${recruit}/interview_schedule/${data.recruitID}/`,{interview_time:data.interview_time});
    return res.data
  };



  //take interview
  export const GetIntervieScheduledProfiles = async () =>{
    const res = await ApiClient.get(`${recruit}/interview_candidates/`)
    return res.data  
  }



  // getInterViewQuestions
  export const GetIntervieQues = async (recruitId:string) =>{
    const res = await ApiClient.get(`${recruit}/interview_questions/${recruitId}/`)
    return res.data  
  }

   // UpdateInterViewQuestions
  export const UpdateInterViewQuestions = async (recruitId:string) =>{
    const res = await ApiClient.put(`${recruit}/generate_interview_questions/${recruitId}/`,{recruit_id:recruitId})
    return res.data

  }


  // UpdateAssessmentReport
  export const UpdateAssessmentReport = async (formData: FormData,recruitId:string) => {
    const res = await ApiClient.put(`${recruit}/generate_transcript/${recruitId}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };


  // Assement Report 
  
  export const GetAssementReportAssignedProfiles = async () =>{
    const res = await ApiClient.get(`${recruit}/interview_feedback/`)
    return res.data  
  }



  