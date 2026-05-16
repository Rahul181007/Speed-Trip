import { Trip } from "../entities/Trip";

export interface ITripRepository{
    createTrip(trip:Trip):Promise<Trip>;
    getTripsByUserId(userId:string):Promise<Trip[]>;
    getTripById(tripId:string):Promise<Trip|null>;
    deleteTrip(tripId:string):Promise<void>;
}