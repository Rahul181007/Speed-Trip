import { Trip } from "../../domain/entities/Trip";
import { ITripDocument } from "../database/models/TripModel";

export class TripMapper{
    static toDomain(trip:ITripDocument):Trip{
        return new Trip(
            trip._id.toString(),
            trip.userId.toString(),
            trip.tripName,
            trip.fileName,
            trip.filePath,
            trip.startTime,
            trip.endTime,
            trip.totalDistance,
            trip.totalDuration,
            trip.totalIdleDuration,
            trip.totalStoppageDuration,
            trip.overspeedDuration,
            trip.createdAt,
            trip.updatedAt
        )
    }
}