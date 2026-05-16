import { TripPoint } from "../../domain/entities/TripPoint";
import { ITripPointDocument } from "../database/models/TripPointModel";

export class TripPointMapper{
    static toDomain(tripPoint:ITripPointDocument):TripPoint{
        return new TripPoint(
            tripPoint._id.toString(),
            tripPoint.tripId.toString(),
            tripPoint.latitude,
            tripPoint.longitude,
            tripPoint.timestamp,
            tripPoint.speed,
            tripPoint.isIdle,
            tripPoint.isStopped,
            tripPoint.isOverSpeed,
            tripPoint.createdAt,
            tripPoint.updatedAt
        )
    }
}