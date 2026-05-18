import { IDeleteTrip } from "../application/interface/use-cases/IDeleteTrip";
import { IGetTripDetails } from "../application/interface/use-cases/IGetTripDetails";
import { IGetUserTrips } from "../application/interface/use-cases/IGetUserTrips";
import { IUploadTrip } from "../application/interface/use-cases/IUploadTrip";
import { DeleteTrip } from "../application/use-cases/trip/DeleteTrip";
import { GetTripDetails } from "../application/use-cases/trip/GetTripDetails";
import { GetUserTrips } from "../application/use-cases/trip/GetUserTrips";
import { UploadTrip } from "../application/use-cases/trip/UploadTrip";
import { MongoTripPointRepository } from "../infrastructure/database/repositories/MongoTripPointRepository";
import { MongoTripRepository } from "../infrastructure/database/repositories/MongoTripRepository";
import { TripController } from "../presentation/controllers/TripController";

const tripRepository=new MongoTripRepository();
const tripPointRepository=new MongoTripPointRepository();

const uploadTripUseCase:IUploadTrip=new UploadTrip(tripRepository,tripPointRepository);
const getUserTripsUseCase:IGetUserTrips=new GetUserTrips(tripRepository);
const getTripDetailsUseCase:IGetTripDetails=new GetTripDetails(tripRepository,tripPointRepository);
const deleteTripUsecase:IDeleteTrip=new DeleteTrip(tripRepository,tripPointRepository);

export const tripController=new TripController(
    uploadTripUseCase,
    getUserTripsUseCase,
    getTripDetailsUseCase,
    deleteTripUsecase
)