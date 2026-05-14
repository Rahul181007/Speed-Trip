import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../api/authApi";
import type { LoginFormData, RegisterFormData } from "../types/authTypes";

export const loginService=async(data:LoginFormData)=>{
    return await loginUser(data);
}
export const registerService=async(
    data:RegisterFormData
)=>{
    return await registerUser(data)
}

export const logoutService=async()=>{
    return await logoutUser()
}

export const refreshTokenService=async()=>{
    return await refreshAccessToken()
}