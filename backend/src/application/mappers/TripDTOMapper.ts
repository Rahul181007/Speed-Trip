import { Trip }from "../../domain/entities/Trip";
import { UploadTripDTO }from "../dto/trip/UploadTripDTO";

interface TripAnalyticsData {
    startTime: Date;
    endTime: Date;
    totalDistance: number;
    totalDuration: number;
    totalIdleDuration: number;
    totalStoppageDuration: number;
    overspeedDuration: number;
}

export class TripDTOMapper {

    static toEntity(data: UploadTripDTO,analytics: TripAnalyticsData): Trip {
        return new Trip(
            "",
            data.userId,
            data.tripName,
            data.fileName,
            data.filePath,
            analytics.startTime,
            analytics.endTime,
            analytics.totalDistance,
            analytics.totalDuration,
            analytics.totalIdleDuration,
            analytics.totalStoppageDuration,
            analytics.overspeedDuration,
            new Date(),
            new Date()
        );
    }
}