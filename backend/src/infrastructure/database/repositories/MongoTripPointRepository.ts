import { TripPoint } from "../../../domain/entities/TripPoint";
import { ITripPointRepository } from "../../../domain/repositories/ITripPointRepository";
import { TripPointMapper } from "../../mappers/TripPointMapper";
import { TripPointModel } from "../models/TripPointModel";


export class MongoTripPointRepository implements ITripPointRepository {
    async createTripPoints(
        tripPoints: TripPoint[]
    ): Promise<TripPoint[]> {

        const createdTripPoints =
            await TripPointModel.insertMany(

                tripPoints.map(
                    (tripPoint) => ({

                        tripId:
                            tripPoint.tripId,

                        latitude:
                            tripPoint.latitude,

                        longitude:
                            tripPoint.longitude,

                        timestamp:
                            tripPoint.timestamp,

                        speed:
                            tripPoint.speed,

                        isIdle:
                            tripPoint.isIdle,

                        isStopped:
                            tripPoint.isStopped,

                        isOverspeed:
                            tripPoint.isOverspeed,
                    })
                )
            );

        return createdTripPoints.map(
            (tripPoint) =>
                new TripPoint(

                    tripPoint._id.toString(),

                    tripPoint.tripId.toString(),

                    tripPoint.latitude,

                    tripPoint.longitude,

                    tripPoint.timestamp,

                    tripPoint.speed,

                    tripPoint.isIdle,

                    tripPoint.isStopped,

                    tripPoint.isOverspeed,

                    tripPoint.createdAt,

                    tripPoint.updatedAt
                )
        );
    }

    async getTripPointByTripId(tripId: string): Promise<TripPoint[]> {
        const tripPoints = await TripPointModel.find({
            tripId
        }).sort({ timestamp: 1 })
        return tripPoints.map(TripPointMapper.toDomain)
    }

    async deleteTripPointsByTripId(tripId: string): Promise<void> {
        await TripPointModel.deleteMany({tripId})
    }
}