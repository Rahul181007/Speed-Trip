import { ITripRepository } from "../../../domain/repositories/ITripRepository";
import { TripListResponseDTO } from "../../dto/trip/TripListResponseDTO";
import { IGetUserTrips } from "../../interface/use-cases/IGetUserTrips";
import { TripResponseMapper } from "../../mappers/TripResponseMapper";

export class GetUserTrips implements IGetUserTrips{
    constructor(
        private _tripRepository:ITripRepository
    ){}

    async execute(userId: string): Promise<TripListResponseDTO[]> {
        const trips=await this._tripRepository.getTripsByUserId(userId);
        return trips.map((trip)=>TripResponseMapper.toTripListResponseDTO(trip))
    }
}