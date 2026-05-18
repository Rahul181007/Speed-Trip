import api from "../../../lib/axios";
import type { TripDetails, TripListItem } from "../types/tripTypes";

export const getUserTrips=async():Promise<TripListItem[]>=>{
    const response=await api.get("/trips");
    return response.data.data
}
export const getTripDetails=async(tripId:string):Promise<TripDetails>=>{
    const response=await api.get(`/trips/${tripId}`);
    return response.data.data;
}

export const uploadTrip=async(formData:FormData):Promise<TripListItem>=>{
    const response=await api.post('/trips/upload',formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data.data
}

export const deleteTrip=async(tripId:string):Promise<void>=>{
    await api.delete(`/trips/${tripId}`)
}