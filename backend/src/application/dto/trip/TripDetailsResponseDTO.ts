import { TripPoint } from "../../../domain/entities/TripPoint";
import { TripSegmentResponseDTO } from "./TripSegmentResponseDTO";

export interface TripDetailsResponseDTO{
    id:string;
    tripName:string;
    startTime:Date;
    endTime:Date;
    totalDistance:number;
    totalDuration:number;
    totalIdleDuration:number;
    totalStoppageDuration:number;
    overspeedDuration:number;
    tripPoints:TripPoint[];
    segements:TripSegmentResponseDTO[];
}