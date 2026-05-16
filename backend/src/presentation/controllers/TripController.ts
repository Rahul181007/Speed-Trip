import { NextFunction, Request, Response } from "express";
import { IDeleteTrip } from "../../application/interface/use-cases/IDeleteTrip";
import { IGetTripDetails } from "../../application/interface/use-cases/IGetTripDetails";
import { IGetUserTrips } from "../../application/interface/use-cases/IGetUserTrips";
import { IUploadTrip } from "../../application/interface/use-cases/IUploadTrip";
import { AppError } from "../../shared/errors/AppError";
import { Messages } from "../../shared/constants/Messages";
import { HttpStatus } from "../../shared/constants/HttpStatus";

export class TripController {
    constructor(
        private _uploadTripUseCase: IUploadTrip,
        private _getUserTripUseCase: IGetUserTrips,
        private _getTripDetailsUseCase: IGetTripDetails,
        private _deleteTripUseCase: IDeleteTrip
    ) { }

    uploadTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            const file = req.file;
            if (!file) {
                throw new AppError(Messages.Trip.CSV_FILE_REQUIRED, HttpStatus.BAD_REQUEST)
            }
            const userId = req.user?.userId;
            if (!userId) {
                throw new AppError(Messages.AUTH.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
            }
            const trip = await this._uploadTripUseCase.execute({
                userId,
                tripName: req.body.tripName,
                fileName: file.originalname,
                filePath: file.path
            })

            res.status(HttpStatus.CREATED).json({
                success: true,
                message: Messages.Trip.TRIP_UPLOADED_SUCCESSFULLY,
                data: trip
            })
        } catch (error: unknown) {
            next(error)
        }
    }

    getUserTrips = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new AppError(Messages.AUTH.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
            }
            const trips = await this._getUserTripUseCase.execute(userId);
            res.status(HttpStatus.OK).json({
                success: true,
                data: trips
            })
        } catch (error) {
            next(error)
        }
    }

    getTripDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { tripId } = req.params;

            if (!tripId || Array.isArray(tripId)) {

                throw new AppError(
                    Messages.Trip.INVALID_TRIP_ID,
                    HttpStatus.BAD_REQUEST
                );
            }
            const tripDetails = await this._getTripDetailsUseCase.execute(tripId);
            res.status(HttpStatus.OK).json({
                success: true,
                data: tripDetails
            })
        } catch (error: unknown) {
            next(error)
        }
    }

    deleteTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { tripId } = req.params;

            if (!tripId || Array.isArray(tripId)) {

                throw new AppError(
                    Messages.Trip.INVALID_TRIP_ID,
                    HttpStatus.BAD_REQUEST
                );
            }
            await this._deleteTripUseCase.execute(tripId);
            res.status(HttpStatus.OK).json({
                success: true,
                message: Messages.Trip.TRIP_DELETED_SUCCESSFULLY
            })
        } catch (error: unknown) {
            next(error)
        }
    }
}