import api from "../../../lib/axios";
import type { LoginFormData, LoginResponse, RegisterFormData } from "../types/authTypes";

export const registerUser=async(
    data:RegisterFormData
)=>{
    const response=await api.post("/auth/register",data);
    return response.data
}

export const loginUser=async(
    data:LoginFormData
):Promise<LoginResponse>=>{
    const response=await api.post("/auth/login",data)
    return response.data
}

export const logoutUser=async()=>{
    const response=await api.post("/auth/logout");
    return response.data
}

export const refreshAccessToken=async()=>{
    const response=await api.post("/auth/refresh-token");
    return response.data
}

export const getMe=async(accessToken:string)=>{
    const response=await api.get("/auth/me",{
        headers:{
            Authorization:`Bearer ${accessToken}`,
        }
    })
    return response.data
}