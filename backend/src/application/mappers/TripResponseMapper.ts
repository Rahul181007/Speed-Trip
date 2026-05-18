import { Trip } from "../../domain/entities/Trip";
import { TripListResponseDTO } from "../dto/trip/TripListResponseDTO";

export class TripResponseMapper{
    static toTripListResponseDTO(trip:Trip):TripListResponseDTO{
        return {
            id:trip.id,
            tripName:trip.tripName,
            createdAt:trip.createdAt,
        }
    }
}