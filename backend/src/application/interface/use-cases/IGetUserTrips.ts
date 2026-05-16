import { TripListResponseDTO } from "../../dto/trip/TripListResponseDTO";

export interface IGetUserTrips{
    execute(userId:string):Promise<TripListResponseDTO[]>
}