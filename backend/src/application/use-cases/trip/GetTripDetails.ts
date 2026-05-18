import { ITripPointRepository } from "../../../domain/repositories/ITripPointRepository";
import { ITripRepository } from "../../../domain/repositories/ITripRepository";
import { HttpStatus } from "../../../shared/constants/HttpStatus";
import { Messages } from "../../../shared/constants/Messages";
import { AppError } from "../../../shared/errors/AppError";
import { TripDetailsResponseDTO } from "../../dto/trip/TripDetailsResponseDTO";
import { IGetTripDetails } from "../../interface/use-cases/IGetTripDetails";
import { TripDetailsReposneMapper } from "../../mappers/TripDetailsResponseMapper";
import { generateTripSegments } from "../../services/trip/generateTripSegments";

export class GetTripDetails implements IGetTripDetails {
    constructor(
        private _tripRepository: ITripRepository,
        private _tripPointRepository: ITripPointRepository
    ) { }

    async execute(tripId: string): Promise<TripDetailsResponseDTO> {
        const trip = await this._tripRepository.getTripById(tripId);
        if (!trip) {
            throw new AppError(Messages.Trip.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const tripPoints = await this._tripPointRepository.getTripPointByTripId(tripId);

        if (tripPoints.length === 0) {
            throw new AppError(Messages.Trip.NO_TRIP_POINTS, HttpStatus.NOT_FOUND);
        }
        const segments = generateTripSegments(tripPoints);
        return TripDetailsReposneMapper.toResponse(trip, tripPoints, segments)
    }
}