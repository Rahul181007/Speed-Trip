import { ITripPointRepository } from "../../../domain/repositories/ITripPointRepository";
import { ITripRepository } from "../../../domain/repositories/ITripRepository";
import { HttpStatus } from "../../../shared/constants/HttpStatus";
import { Messages } from "../../../shared/constants/Messages";
import { AppError } from "../../../shared/errors/AppError";
import { TripListResponseDTO } from "../../dto/trip/TripListResponseDTO";
import { UploadTripDTO } from "../../dto/trip/UploadTripDTO";
import { IUploadTrip } from "../../interface/use-cases/IUploadTrip";
import { TripDTOMapper } from "../../mappers/TripDTOMapper";
import { TripResponseMapper } from "../../mappers/TripResponseMapper";
import { processTripCSV } from "../../services/trip/processTripCSV";

export class UploadTrip implements IUploadTrip{
    constructor(
        private _tripRepository:ITripRepository,
        private _tripPointRepository:ITripPointRepository
    ){}

    async execute(data: UploadTripDTO): Promise<TripListResponseDTO> {
        if(!data.filePath){
            throw new AppError(Messages.Trip.CSV_FILE_REQUIRED,HttpStatus.BAD_REQUEST)
        }
        if(!data.tripName.trim()){
            throw new AppError(Messages.Trip.TRIP_NAME_REQUIRES,HttpStatus.BAD_REQUEST);
        }
        const processedTrip=await processTripCSV(data.filePath);
       
        if(processedTrip.tripPoints.length===0){
            throw new AppError(Messages.Trip.NO_CSV_DATA,HttpStatus.BAD_REQUEST);
        }

        const totalDuration=(processedTrip.endTime.getTime()-processedTrip.startTime.getTime())/(1000*60);

        const trip=TripDTOMapper.toEntity(
            data,
            {
                startTime:processedTrip.startTime,
                endTime:processedTrip.endTime,
                totalDistance:processedTrip.totalDistance,
                totalDuration,
                totalIdleDuration:processedTrip.totalIdleDuration,
                totalStoppageDuration:processedTrip.totalStoppageDuration,
                overspeedDuration:processedTrip.overspeedDuration
            
            }
        )
       
        const createdTrip=await this._tripRepository.createTrip(trip);
        const tripPoints=processedTrip.tripPoints.map((tripPoint)=>{
            tripPoint.tripId=createdTrip.id
             return tripPoint
        })
        await this._tripPointRepository.createTripPoints(tripPoints);
        return TripResponseMapper.toTripListResponseDTO(createdTrip)

    }
}  