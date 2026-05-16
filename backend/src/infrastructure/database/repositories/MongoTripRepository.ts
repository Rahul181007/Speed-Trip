import { Trip } from "../../../domain/entities/Trip";
import { ITripRepository } from "../../../domain/repositories/ITripRepository";
import { TripMapper } from "../../mappers/TripMapper";
import { TripModel } from "../models/TripModel";

export class MongoTripRepository implements ITripRepository{
    async createTrip(trip: Trip): Promise<Trip> {
        const createTrip=await TripModel.create({
            userId:trip.userId,
            tripName:trip.tripName,
            fileName:trip.fileName,
            filePath:trip.filePath,
            startTime:trip.startTime,
            endTime:trip.endTime,
            totalDistance:trip.totalDistance,
            totalDuration:trip.totalDuration,
            totalIdleDuration:trip.totalIdleDuration,
            totalStoppageDuration:trip.totalStoppageDuration,
            overspeedDuration:trip.overspeedDuration
        })
        return TripMapper.toDomain(createTrip)
    }
    async getTripsByUserId(userId: string): Promise<Trip[]> {
        const trips=await TripModel.find({userId}).sort({createdAt:-1});
        return trips.map(TripMapper.toDomain)
    }
    async getTripById(tripId: string): Promise<Trip | null> {
        const trip=await TripModel.findById(tripId);
        if(!trip) return null;
        return TripMapper.toDomain(trip)
    }
    async deleteTrip(tripId: string): Promise<void> {
        await TripModel.findByIdAndDelete(tripId)
    }
}