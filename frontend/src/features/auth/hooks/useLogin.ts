import { useState } from "react"
import type { LoginSchemaType } from "../validations/authSchema";
import { loginService } from "../services/authService";
import { useAuthStore } from "../../../app/store/authStore";


const useLogin = () => {
const [loading,setLoading]=useState(false);
const [error,setError]=useState("")
const setAuth=useAuthStore((state)=>state.setAuth)

const login=async(data:LoginSchemaType)=>{
    try {
        setLoading(true);
        setError("");
        const response=await loginService(data);
        setAuth(
            response.data.user,
            response.data.accessToken
        )
        return response
    } catch (error:unknown) {
        setError(error instanceof Error?error.message:"Login failed");
        throw error
    }finally{
        setLoading(false)
    }
}

return {
    login,
    loading,
    error
}
}

export default useLogin
