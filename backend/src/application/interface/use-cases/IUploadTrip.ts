import { TripListResponseDTO } from "../../dto/trip/TripListResponseDTO";
import { UploadTripDTO } from "../../dto/trip/UploadTripDTO";

export interface IUploadTrip{
    execute(data:UploadTripDTO):Promise<TripListResponseDTO>
}