import axios from "axios";
import { useAuthStore } from "../app/store/authStore";


const api=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    withCredentials:true
})
api.interceptors.request.use((config)=>{
const accessToken=useAuthStore.getState().accessToken;
if(accessToken){
    config.headers.Authorization= `Bearer ${accessToken}`;
}
return config
})

export default api