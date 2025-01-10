import axios from "axios";
import { accounts } from "./apiurls";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ApiClient = axios.create({
  baseURL: apiUrl,
});


export const Login = async (email: string, password: string) => {
    const res =  await ApiClient.post(`${accounts}/login/`, { email, password });
    return res.data
  };