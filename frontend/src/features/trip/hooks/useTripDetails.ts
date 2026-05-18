import { useCallback, useEffect, useState } from "react"
import type { TripDetails } from "../types/tripTypes"
import { getTripDetailsService } from "../services/tripService";


const useTripDetails = (tripId:string) => {
    const[trip,setTrip]=useState<TripDetails|null>(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const fetchTripDetails=useCallback(async ()=>{
        try {
            setLoading(true);
            setError("");
            const response=await getTripDetailsService(tripId);
            setTrip(response)
        } catch (error:unknown) {
            setError(error instanceof Error?error.message:"failed to fetch trip")
        }finally{
            setLoading(false)
        }
    },[tripId])

    useEffect(()=>{
        const loadTrip=async()=>{
            await fetchTripDetails()
        }
        loadTrip()
    },[fetchTripDetails])
  return {
    trip,
    loading,
    error,
    fetchTripDetails
  }
}

export default useTripDetails
