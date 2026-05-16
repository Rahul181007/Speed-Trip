import { Trip } from "../../domain/entities/Trip";
import { TripPoint } from "../../domain/entities/TripPoint";
import { TripDetailsResponseDTO } from "../dto/trip/TripDetailsResponseDTO";
import { TripSegmentResponseDTO } from "../dto/trip/TripSegmentResponseDTO";

export class TripDetailsReposneMapper{
   static toResponse(
    trip:Trip,
    tripPoints:TripPoint[],
    segements:TripSegmentResponseDTO[]
   ):TripDetailsResponseDTO{
    return {
        id:trip.id,
        tripName:trip.tripName,
        startTime:trip.startTime,
        endTime:trip.endTime,
        totalDistance:trip.totalDistance,
        totalDuration:trip.totalDuration,
        totalIdleDuration:trip.totalIdleDuration,
        totalStoppageDuration:trip.totalStoppageDuration,
        overspeedDuration:trip.overspeedDuration,
        tripPoints,
        segements
    }
   }
}