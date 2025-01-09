import { Api } from "@mui/icons-material";
import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ApiClient = axios.create({
  baseURL: apiUrl,
});


export const CreateResume = async (formData: FormData) => {
    const res = await ApiClient.post("api/profile/create/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };
  
  export const GetRelavanentProfile = async () =>{
    const res = await ApiClient.get('api/job/find_profile/')
  
    return res.data  
  }

  export const GetProfileById = async (id:string)=>{
    const res = await ApiClient.get(`profile/${id}/`)
    return res.data
  }