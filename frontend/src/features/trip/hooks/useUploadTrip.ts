import { useState } from "react"
import type { TripListItem } from "../types/tripTypes";
import { uploadTripService } from "../services/tripService";


const useUploadTrip = () => {
    const [loading,setLoadng]=useState(false);
    const [error,setError]=useState("");
    const uploadTrip=async(formData:FormData):Promise<TripListItem>=>{
        try {
            setLoadng(true);
            setError("");
            const response=await uploadTripService(formData);
            return response;
        } catch (error:unknown) {
            setError(error instanceof Error?error.message:"failed to upload trip");
            throw error;
        }finally{
            setLoadng(false)
        }
    }
  return {
    uploadTrip,
    loading,
    error

  }
}

export default useUploadTrip
