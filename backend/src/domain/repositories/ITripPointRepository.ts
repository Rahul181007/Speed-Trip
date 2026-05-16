import { TripPoint } from "../entities/TripPoint";

export interface ITripPointRepository{
    createTripPoints(tripPoints:TripPoint[]):Promise<TripPoint[]>;
    getTripPointByTripId(tripId:string):Promise<TripPoint[]>
    deleteTripPointsByTripId(tripId: string): Promise<void>;
}