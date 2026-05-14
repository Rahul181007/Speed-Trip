import { useAuthStore } from "../../../app/store/authStore";
import { getMe, refreshAccessToken } from "../api/authApi"

export const initializeAuth= async()=>{
    try {
        const refreshResponse=await refreshAccessToken();
        const accessToken=refreshResponse.accessToken;
        const meResponse=await getMe(accessToken);

        useAuthStore.getState()
        .setAuth(
            meResponse.user,
            accessToken
        );
    } catch{
        console.log("User not authenticated")
    }finally{
        useAuthStore.getState().setInitializing(false)
    }
}