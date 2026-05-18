import { ITripPointRepository } from "../../../domain/repositories/ITripPointRepository";
import { ITripRepository } from "../../../domain/repositories/ITripRepository";
import { HttpStatus } from "../../../shared/constants/HttpStatus";
import { Messages } from "../../../shared/constants/Messages";
import { AppError } from "../../../shared/errors/AppError";
import { IDeleteTrip } from "../../interface/use-cases/IDeleteTrip";

export class DeleteTrip implements IDeleteTrip{
    constructor(
        private _tripRepository:ITripRepository,
        private _tripPointRepository:ITripPointRepository
    ){}

    async execute(tripId: string): Promise<void> {
        const trip=await this._tripRepository.getTripById(tripId);
        if(!trip){
            throw new AppError(Messages.Trip.NOT_FOUND,HttpStatus.NOT_FOUND)
        }
        await this._tripPointRepository.deleteTripPointsByTripId(tripId);
        await this._tripRepository.deleteTrip(tripId)
    }

}